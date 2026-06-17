import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// Helper: get a Supabase client for server-side operations.
// Prefers admin client (bypasses RLS) but falls back to public client
// when SUPABASE_SERVICE_ROLE_KEY is not set (e.g. on first Vercel deploy).
async function getServerClient() {
  if (process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.SUPABASE_URL) {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    return supabaseAdmin;
  }
  const { createClient } = await import("@supabase/supabase-js");
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    console.error("[Supabase] Missing SUPABASE_URL or SUPABASE_PUBLISHABLE_KEY");
    throw new Error("Supabase not configured. Set environment variables in Vercel.");
  }
  return createClient(url, key);
}

// ---------- Public reads ----------

export const listSiteImages = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const sb = await getServerClient();
    const { data, error } = await sb.from("site_images").select("key,url,alt,caption").order("key");
    if (error) { console.error("[listSiteImages]", error.message); return []; }
    return data ?? [];
  } catch (e) {
    console.error("[listSiteImages] failed:", e);
    return [];
  }
});

export const listPublishedTours = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const sb = await getServerClient();
    const { data, error } = await sb
      .from("tour_packages")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });
    if (error) { console.error("[listPublishedTours]", error.message); return []; }
    return data ?? [];
  } catch (e) {
    console.error("[listPublishedTours] failed:", e);
    return [];
  }
});

export const getTourBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => z.object({ slug: z.string().min(1).max(120) }).parse(d))
  .handler(async ({ data }) => {
    try {
      const sb = await getServerClient();
      const { data: row, error } = await sb
        .from("tour_packages")
        .select("*")
        .eq("slug", data.slug)
        .eq("published", true)
        .maybeSingle();
      if (error) { console.error("[getTourBySlug]", error.message); return null; }
      return row;
    } catch (e) {
      console.error("[getTourBySlug] failed:", e);
      return null;
    }
  });

// ---------- Contact form (public submission) ----------

const ContactInput = z.object({
  name: z.string().trim().min(1).max(150),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().max(200).optional().nullable(),
  message: z.string().trim().min(1).max(4000),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => ContactInput.parse(d))
  .handler(async ({ data }) => {
    const sb = await getServerClient();
    const { data: row, error } = await sb
      .from("contact_messages")
      .insert({ name: data.name, email: data.email, subject: data.subject ?? null, message: data.message })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { ok: true, id: row.id };
  });

// ---------- Admin reads/writes ----------

async function requireAdminClient(context: { userId: string }) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("user_roles")
    .select("id")
    .eq("user_id", context.userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) {
    console.error("Admin role check failed", error);
    throw new Error("Unable to verify admin access.");
  }
  if (!data) throw new Error("Forbidden");
  return supabaseAdmin;
}

export const listContactMessages = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const supabaseAdmin = await requireAdminClient(context);
    const { data, error } = await supabaseAdmin.from("contact_messages").select("*").order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const listAllTours = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const supabaseAdmin = await requireAdminClient(context);
    const { data, error } = await supabaseAdmin.from("tour_packages").select("*").order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

const ContactStatusUpdate = z.object({
  id: z.string().uuid(),
  status: z.enum(["new", "read", "archived"]),
});

export const updateContactStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => ContactStatusUpdate.parse(d))
  .handler(async ({ data, context }) => {
    const supabaseAdmin = await requireAdminClient(context);
    const { error } = await supabaseAdmin.from("contact_messages").update({ status: data.status }).eq("id", data.id);
    if (error) throw new Error("Unable to update message status.");
    return { ok: true };
  });

const TourUpsert = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1).max(120).regex(/^[a-z0-9-]+$/),
  title: z.string().min(1).max(200),
  destination: z.string().min(1).max(100),
  duration_days: z.number().int().min(1).max(60),
  price_pkr: z.number().int().min(0).max(10_000_000),
  summary: z.string().max(500).nullable().optional(),
  description: z.string().max(5000).nullable().optional(),
  hero_image: z.string().max(500).nullable().optional(),
  itinerary: z.array(z.object({ day: z.number(), title: z.string(), details: z.string() })).max(60).default([]),
  inclusions: z.array(z.string().max(200)).max(40).default([]),
  exclusions: z.array(z.string().max(200)).max(40).default([]),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  sort_order: z.number().int().min(0).max(1000).default(0),
});

export const upsertTour = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => TourUpsert.parse(d))
  .handler(async ({ data, context }) => {
    const supabaseAdmin = await requireAdminClient(context);
    const { error } = await supabaseAdmin.from("tour_packages").upsert(data, { onConflict: "slug" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteTour = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const supabaseAdmin = await requireAdminClient(context);
    const { error } = await supabaseAdmin.from("tour_packages").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const ImageUpsert = z.object({
  key: z.string().min(1).max(80).regex(/^[a-z0-9-]+$/),
  url: z.string().min(1).max(1000),
  alt: z.string().max(300).nullable().optional(),
  caption: z.string().max(500).nullable().optional(),
});

export const upsertSiteImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => ImageUpsert.parse(d))
  .handler(async ({ data, context }) => {
    const supabaseAdmin = await requireAdminClient(context);
    const { error } = await supabaseAdmin.from("site_images").upsert(data, { onConflict: "key" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

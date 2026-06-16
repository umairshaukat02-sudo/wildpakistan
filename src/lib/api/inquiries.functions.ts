import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { computePricing } from "@/lib/pricing";

const InquiryInput = z.object({
  customer_name: z.string().trim().min(1).max(200),
  customer_email: z.string().trim().email().max(255),
  customer_phone: z.string().trim().max(50).optional().nullable(),
  destination: z.string().min(1).max(100),
  duration_days: z.number().int().min(1).max(60),
  departure_date: z.string().optional().nullable(),
  return_date: z.string().optional().nullable(),
  pickup_location: z.string().max(100).optional().nullable(),
  transport: z.string().max(60).optional().nullable(),
  room_type: z.string().max(60).optional().nullable(),
  hotel_category: z.string().max(60).optional().nullable(),
  meals: z.string().max(60).optional().nullable(),
  activities: z.array(z.string().max(60)).max(20).default([]),
  adults: z.number().int().min(1).max(50),
  children: z.number().int().min(0).max(50),
  additional_requirements: z.string().max(2000).optional().nullable(),
});

async function requireAdminClient(userId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("user_roles")
    .select("id")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) {
    console.error("Admin role check failed", error);
    throw new Error("Unable to verify admin access.");
  }
  if (!data) throw new Error("Forbidden");
  return supabaseAdmin;
}

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InquiryInput.parse(data))
  .handler(async ({ data }) => {
    // Recompute pricing server-side — never trust client-supplied costs.
    const priced = computePricing({
      duration_days: data.duration_days,
      adults: data.adults,
      children: data.children,
      transport: data.transport,
      hotel_category: data.hotel_category,
      meals: data.meals,
      activities: data.activities,
    });
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("inquiries")
      .insert({
        ...data,
        ...priced,
        status: "pending",
        admin_notes: null,
      })
      .select("id, inquiry_code, grand_total")
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const listMyInquiries = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const listAllInquiries = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const supabaseAdmin = await requireAdminClient(context.userId);
    const { data, error } = await supabaseAdmin
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

const StatusUpdate = z.object({
  id: z.string().uuid(),
  status: z.enum(["pending", "approved", "rejected", "in_review"]),
  admin_notes: z.string().max(2000).optional().nullable(),
});

export const updateInquiryStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => StatusUpdate.parse(data))
  .handler(async ({ data, context }) => {
    const supabaseAdmin = await requireAdminClient(context.userId);
    const { error } = await supabaseAdmin
      .from("inquiries")
      .update({ status: data.status, admin_notes: data.admin_notes, updated_at: new Date().toISOString() })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    try {
      await requireAdminClient(context.userId);
      return { isAdmin: true };
    } catch (error) {
      if (error instanceof Error && error.message === "Forbidden") return { isAdmin: false };
      throw error;
    }
  });

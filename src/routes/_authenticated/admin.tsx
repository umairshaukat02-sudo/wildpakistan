import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  listAllInquiries,
  updateInquiryStatus,
  checkIsAdmin,
} from "@/lib/api/inquiries.functions";
import {
  listContactMessages,
  updateContactStatus,
  listAllTours,
  upsertTour,
  deleteTour,
  listSiteImages,
  upsertSiteImage,
} from "@/lib/api/cms.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — WILD Pakistan" }] }),
  component: Admin,
});

type Tab = "inquiries" | "contacts" | "tours" | "images";

function Admin() {
  const adminCheck = useServerFn(checkIsAdmin);
  const adminQ = useQuery({ queryKey: ["is-admin"], queryFn: () => adminCheck(), retry: 1 });
  const [tab, setTab] = useState<Tab>("inquiries");

  if (adminQ.isLoading) return <div className="pt-40 text-center text-muted-foreground">Checking access…</div>;
  if (adminQ.isError) {
    return (
      <div className="pt-40 pb-32 text-center px-6">
        <h1 className="font-display text-4xl">Admin check failed</h1>
        <p className="text-muted-foreground mt-3">Refresh the page or sign in again.</p>
        <button onClick={() => adminQ.refetch()} className="mt-6 rounded-full bg-accent px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-accent-foreground">Try again</button>
      </div>
    );
  }
  if (!adminQ.data?.isAdmin) {
    return (
      <div className="pt-40 pb-32 text-center px-6">
        <h1 className="font-display text-4xl">Admin access required</h1>
        <p className="text-muted-foreground mt-3">Ask the WILD team to grant your account admin role.</p>
        <Link to="/dashboard" className="mt-6 inline-block underline">← Back to dashboard</Link>
      </div>
    );
  }

  const tabs: Array<{ id: Tab; label: string }> = [
    { id: "inquiries", label: "Inquiries" },
    { id: "contacts", label: "Contact Messages" },
    { id: "tours", label: "Tour Packages" },
    { id: "images", label: "Site Images" },
  ];

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="mx-auto max-w-7xl">
        <span className="font-mono text-[10px] text-accent uppercase tracking-[0.3em] block mb-2">Admin</span>
        <h1 className="font-display text-4xl md:text-5xl mb-8">Dashboard</h1>
        <div className="flex flex-wrap gap-2 border-b border-border mb-8">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition border-b-2 -mb-px ${
                tab === t.id ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        {tab === "inquiries" && <InquiriesTab />}
        {tab === "contacts" && <ContactsTab />}
        {tab === "tours" && <ToursTab />}
        {tab === "images" && <ImagesTab />}
      </div>
    </div>
  );
}

function InquiriesTab() {
  const list = useServerFn(listAllInquiries);
  const update = useServerFn(updateInquiryStatus);
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["all-inquiries"], queryFn: () => list(), refetchInterval: 10_000, retry: 1 });
  const setStatus = async (id: string, status: "pending" | "approved" | "rejected" | "in_review") => {
    try {
      await update({ data: { id, status } });
      toast.success("Updated");
      qc.invalidateQueries({ queryKey: ["all-inquiries"] });
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  };
  return (
    <div className="bg-background border border-border rounded-md overflow-x-auto">
      {q.isLoading && <div className="p-8 text-center text-muted-foreground">Loading inquiries…</div>}
      {q.isError && <AdminError message="Could not load inquiries." onRetry={() => q.refetch()} />}
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr className="text-left text-[10px] uppercase tracking-widest text-muted-foreground">
            <th className="p-3">Code</th><th className="p-3">Customer</th><th className="p-3">Destination</th><th className="p-3">Days</th><th className="p-3">Total</th><th className="p-3">Status</th><th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {q.data?.map((i) => (
            <tr key={i.id} className="border-t border-border">
              <td className="p-3 font-mono text-xs text-accent">{i.inquiry_code}</td>
              <td className="p-3">{i.customer_name}<br /><span className="text-xs text-muted-foreground">{i.customer_email}</span></td>
              <td className="p-3">{i.destination}</td>
              <td className="p-3">{i.duration_days}</td>
              <td className="p-3">PKR {Number(i.grand_total).toLocaleString()}</td>
              <td className="p-3"><span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded bg-muted">{i.status}</span></td>
              <td className="p-3">
                <div className="flex gap-1">
                  <button onClick={() => setStatus(i.id, "approved")} className="px-2 py-1 text-[10px] rounded bg-accent text-accent-foreground">Approve</button>
                  <button onClick={() => setStatus(i.id, "rejected")} className="px-2 py-1 text-[10px] rounded bg-destructive text-destructive-foreground">Reject</button>
                </div>
              </td>
            </tr>
          ))}
          {q.data && q.data.length === 0 && <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">No inquiries yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function ContactsTab() {
  const list = useServerFn(listContactMessages);
  const update = useServerFn(updateContactStatus);
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["admin-contacts"], queryFn: () => list(), refetchInterval: 10_000, retry: 1 });
  const setStatus = async (id: string, status: "new" | "read" | "archived") => {
    try {
      await update({ data: { id, status } });
      toast.success("Message updated");
      qc.invalidateQueries({ queryKey: ["admin-contacts"] });
    } catch (e) { toast.error(e instanceof Error ? e.message : "Failed"); }
  };
  return (
    <div className="bg-background border border-border rounded-md overflow-x-auto">
      {q.isLoading && <div className="p-8 text-center text-muted-foreground">Loading messages…</div>}
      {q.isError && <AdminError message="Could not load messages." onRetry={() => q.refetch()} />}
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr className="text-left text-[10px] uppercase tracking-widest text-muted-foreground">
            <th className="p-3">When</th><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Subject</th><th className="p-3">Message</th><th className="p-3">Status</th><th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {q.data?.map((m) => (
            <tr key={m.id} className="border-t border-border align-top">
              <td className="p-3 whitespace-nowrap text-xs text-muted-foreground">{new Date(m.created_at).toLocaleString()}</td>
              <td className="p-3">{m.name}</td>
              <td className="p-3"><a href={`mailto:${m.email}`} className="text-accent underline">{m.email}</a></td>
              <td className="p-3">{m.subject ?? "—"}</td>
              <td className="p-3 max-w-md whitespace-pre-wrap">{m.message}</td>
              <td className="p-3"><span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded bg-muted">{m.status}</span></td>
              <td className="p-3"><button onClick={() => setStatus(m.id, m.status === "archived" ? "new" : "archived")} className="px-2 py-1 text-[10px] rounded bg-muted">{m.status === "archived" ? "Restore" : "Archive"}</button></td>
            </tr>
          ))}
          {q.data && q.data.length === 0 && <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">No messages yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function ToursTab() {
  const list = useServerFn(listAllTours);
  const save = useServerFn(upsertTour);
  const remove = useServerFn(deleteTour);
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["admin-tours"], queryFn: () => list(), retry: 1 });

  const togglePublish = async (t: any) => {
    try {
      await save({ data: { ...sanitizeTour(t), published: !t.published } });
      toast.success(t.published ? "Unpublished" : "Published");
      qc.invalidateQueries({ queryKey: ["admin-tours"] });
      qc.invalidateQueries({ queryKey: ["published-tours"] });
    } catch (e) { toast.error(e instanceof Error ? e.message : "Failed"); }
  };

  const editPrice = async (t: any) => {
    const v = prompt(`New price (PKR) for ${t.title}:`, String(t.price_pkr));
    if (!v) return;
    const n = parseInt(v, 10);
    if (Number.isNaN(n) || n < 0) { toast.error("Invalid price"); return; }
    try {
      await save({ data: { ...sanitizeTour(t), price_pkr: n } });
      toast.success("Price updated");
      qc.invalidateQueries({ queryKey: ["admin-tours"] });
      qc.invalidateQueries({ queryKey: ["published-tours"] });
    } catch (e) { toast.error(e instanceof Error ? e.message : "Failed"); }
  };

  const editImage = async (t: any) => {
    const v = prompt(`Hero image URL for ${t.title}:`, t.hero_image ?? "");
    if (v === null) return;
    try {
      await save({ data: { ...sanitizeTour(t), hero_image: v || null } });
      toast.success("Image updated");
      qc.invalidateQueries({ queryKey: ["admin-tours"] });
      qc.invalidateQueries({ queryKey: ["published-tours"] });
    } catch (e) { toast.error(e instanceof Error ? e.message : "Failed"); }
  };

  const del = async (t: any) => {
    if (!confirm(`Delete tour "${t.title}"? This cannot be undone.`)) return;
    try {
      await remove({ data: { id: t.id } });
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["admin-tours"] });
      qc.invalidateQueries({ queryKey: ["published-tours"] });
    } catch (e) { toast.error(e instanceof Error ? e.message : "Failed"); }
  };

  return (
    <div className="bg-background border border-border rounded-md overflow-x-auto">
      {q.isLoading && <div className="p-8 text-center text-muted-foreground">Loading tours…</div>}
      {q.isError && <AdminError message="Could not load tours." onRetry={() => q.refetch()} />}
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr className="text-left text-[10px] uppercase tracking-widest text-muted-foreground">
            <th className="p-3">Title</th><th className="p-3">Slug</th><th className="p-3">Days</th><th className="p-3">Price</th><th className="p-3">Status</th><th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {q.data?.map((t) => (
            <tr key={t.id} className="border-t border-border">
              <td className="p-3 font-medium">{t.title}</td>
              <td className="p-3 font-mono text-xs">{t.slug}</td>
              <td className="p-3">{t.duration_days}</td>
              <td className="p-3">PKR {t.price_pkr.toLocaleString()}</td>
              <td className="p-3"><span className={`font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded ${t.published ? "bg-accent/15 text-accent" : "bg-muted text-muted-foreground"}`}>{t.published ? "live" : "draft"}</span></td>
              <td className="p-3">
                <div className="flex gap-1 flex-wrap">
                  <button onClick={() => editPrice(t)} className="px-2 py-1 text-[10px] rounded bg-muted">Price</button>
                  <button onClick={() => editImage(t)} className="px-2 py-1 text-[10px] rounded bg-muted">Image</button>
                  <button onClick={() => togglePublish(t)} className="px-2 py-1 text-[10px] rounded bg-foreground text-background">{t.published ? "Unpublish" : "Publish"}</button>
                  <button onClick={() => del(t)} className="px-2 py-1 text-[10px] rounded bg-destructive text-destructive-foreground">Delete</button>
                </div>
              </td>
            </tr>
          ))}
          {q.data && q.data.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No tours yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function sanitizeTour(t: any) {
  return {
    id: t.id,
    slug: t.slug,
    title: t.title,
    destination: t.destination,
    duration_days: t.duration_days,
    price_pkr: t.price_pkr,
    summary: t.summary,
    description: t.description,
    hero_image: t.hero_image,
    itinerary: t.itinerary ?? [],
    inclusions: t.inclusions ?? [],
    exclusions: t.exclusions ?? [],
    featured: !!t.featured,
    published: !!t.published,
    sort_order: t.sort_order ?? 0,
  };
}

function ImagesTab() {
  const list = useServerFn(listSiteImages);
  const save = useServerFn(upsertSiteImage);
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["admin-images"], queryFn: () => list(), retry: 1 });

  const editUrl = async (img: { key: string; url: string; alt: string | null }) => {
    const v = prompt(`New image URL for "${img.key}":`, img.url);
    if (!v) return;
    try {
      await save({ data: { key: img.key, url: v, alt: img.alt } });
      toast.success("Image updated");
      qc.invalidateQueries({ queryKey: ["admin-images"] });
      qc.invalidateQueries({ queryKey: ["site-images"] });
    } catch (e) { toast.error(e instanceof Error ? e.message : "Failed"); }
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">Edit any image URL — supports relative paths like <code className="font-mono">/images/hero.jpg</code> or full URLs from a CDN.</p>
      {q.isLoading && <div className="p-8 text-center text-muted-foreground">Loading images…</div>}
      {q.isError && <AdminError message="Could not load images." onRetry={() => q.refetch()} />}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {q.data?.map((img) => (
          <div key={img.key} className="border border-border rounded-md overflow-hidden bg-background">
            <div className="aspect-[4/3] bg-muted overflow-hidden">
              <img src={img.url} alt={img.alt ?? img.key} className="size-full object-cover" loading="lazy" />
            </div>
            <div className="p-3 space-y-2">
              <div className="font-mono text-[10px] uppercase tracking-widest text-accent">{img.key}</div>
              <div className="text-xs text-muted-foreground break-all line-clamp-2">{img.url}</div>
              <button onClick={() => editUrl(img)} className="w-full px-3 py-2 text-[10px] font-bold uppercase tracking-widest rounded bg-foreground text-background">Change URL</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="m-4 rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm">
      <p>{message}</p>
      <button onClick={onRetry} className="mt-3 rounded-full bg-foreground px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-background">Retry</button>
    </div>
  );
}

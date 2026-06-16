import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listMyInquiries, checkIsAdmin } from "@/lib/api/inquiries.functions";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — WILD Pakistan" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const list = useServerFn(listMyInquiries);
  const adminCheck = useServerFn(checkIsAdmin);
  const inquiriesQ = useQuery({ queryKey: ["my-inquiries"], queryFn: () => list() });
  const adminQ = useQuery({ queryKey: ["is-admin"], queryFn: () => adminCheck() });

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap justify-between items-end gap-4 mb-10">
          <div>
            <span className="font-mono text-[10px] text-accent uppercase tracking-[0.3em] block mb-2">Account</span>
            <h1 className="font-display text-4xl md:text-5xl">Welcome, {user.email}</h1>
          </div>
          <div className="flex gap-3">
            {adminQ.data?.isAdmin && (
              <Link to="/admin" className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-5 py-2.5 text-xs font-bold uppercase tracking-widest">
                <ShieldCheck size={14} /> Admin
              </Link>
            )}
            <button onClick={signOut} className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs font-bold uppercase tracking-widest">
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>

        <h2 className="font-display text-2xl mb-5">Your inquiries</h2>
        {inquiriesQ.isLoading && <p className="text-muted-foreground">Loading…</p>}
        {inquiriesQ.data && inquiriesQ.data.length === 0 && (
          <div className="bg-background border border-border rounded-md p-8 text-center">
            <p className="text-muted-foreground mb-4">No inquiries yet.</p>
            <Link to="/customize" className="inline-flex rounded-full bg-accent text-accent-foreground px-5 py-2.5 text-xs font-bold uppercase tracking-widest">Plan your first trip</Link>
          </div>
        )}
        <div className="space-y-4">
          {inquiriesQ.data?.map((i) => (
            <div key={i.id} className="bg-background border border-border rounded-md p-5 flex flex-wrap justify-between gap-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-accent">{i.inquiry_code} · {i.status}</div>
                <div className="font-display text-xl mt-1">{i.destination} — {i.duration_days} days</div>
                <div className="text-xs text-muted-foreground mt-1">{new Date(i.created_at).toLocaleDateString()}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Estimate</div>
                <div className="font-display text-2xl">PKR {Number(i.grand_total).toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

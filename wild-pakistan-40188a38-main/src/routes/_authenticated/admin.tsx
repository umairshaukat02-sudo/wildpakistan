import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listAllInquiries, updateInquiryStatus, checkIsAdmin } from "@/lib/api/inquiries.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — WILD Pakistan" }] }),
  component: Admin,
});

function Admin() {
  const list = useServerFn(listAllInquiries);
  const update = useServerFn(updateInquiryStatus);
  const adminCheck = useServerFn(checkIsAdmin);
  const qc = useQueryClient();
  const adminQ = useQuery({ queryKey: ["is-admin"], queryFn: () => adminCheck() });
  const q = useQuery({ queryKey: ["all-inquiries"], queryFn: () => list(), enabled: adminQ.data?.isAdmin === true });

  if (adminQ.isLoading) return <div className="pt-40 text-center text-muted-foreground">Checking access…</div>;
  if (!adminQ.data?.isAdmin) {
    return (
      <div className="pt-40 pb-32 text-center px-6">
        <h1 className="font-display text-4xl">Admin access required</h1>
        <p className="text-muted-foreground mt-3">Ask the WILD team to grant your account admin role.</p>
        <Link to="/dashboard" className="mt-6 inline-block underline">← Back to dashboard</Link>
      </div>
    );
  }

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
    <div className="pt-32 pb-24 px-6">
      <div className="mx-auto max-w-7xl">
        <span className="font-mono text-[10px] text-accent uppercase tracking-[0.3em] block mb-2">Admin</span>
        <h1 className="font-display text-4xl md:text-5xl mb-10">Inquiry management</h1>
        <div className="bg-background border border-border rounded-md overflow-x-auto">
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
      </div>
    </div>
  );
}

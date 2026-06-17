import { g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime, r as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { r as listMyInquiries, t as checkIsAdmin } from "./inquiries.functions-Bbi5o8-P.mjs";
import { t as supabase } from "./client-B_T8LLyF.mjs";
import { n as ShieldCheck, u as LogOut } from "../_libs/lucide-react.mjs";
import { t as Route } from "./dashboard-CKvxaYrs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-B-BSKsjU.js
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const { user } = Route.useRouteContext();
	const navigate = useNavigate();
	const list = useServerFn(listMyInquiries);
	const adminCheck = useServerFn(checkIsAdmin);
	const inquiriesQ = useQuery({
		queryKey: ["my-inquiries"],
		queryFn: () => list()
	});
	const adminQ = useQuery({
		queryKey: ["is-admin"],
		queryFn: () => adminCheck()
	});
	const signOut = async () => {
		await supabase.auth.signOut();
		navigate({ to: "/" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pt-32 pb-24 px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap justify-between items-end gap-4 mb-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[10px] text-accent uppercase tracking-[0.3em] block mb-2",
						children: "Account"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "font-display text-4xl md:text-5xl",
						children: ["Welcome, ", user.email]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3",
						children: [adminQ.data?.isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin",
							className: "inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-5 py-2.5 text-xs font-bold uppercase tracking-widest",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), " Admin"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: signOut,
							className: "inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs font-bold uppercase tracking-widest",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 14 }), " Sign Out"]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl mb-5",
					children: "Your inquiries"
				}),
				inquiriesQ.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Loading…"
				}),
				inquiriesQ.data && inquiriesQ.data.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-background border border-border rounded-md p-8 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground mb-4",
						children: "No inquiries yet."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/customize",
						className: "inline-flex rounded-full bg-accent text-accent-foreground px-5 py-2.5 text-xs font-bold uppercase tracking-widest",
						children: "Plan your first trip"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: inquiriesQ.data?.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-background border border-border rounded-md p-5 flex flex-wrap justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-mono text-[10px] uppercase tracking-widest text-accent",
								children: [
									i.inquiry_code,
									" · ",
									i.status
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-display text-xl mt-1",
								children: [
									i.destination,
									" — ",
									i.duration_days,
									" days"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground mt-1",
								children: new Date(i.created_at).toLocaleDateString()
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] uppercase tracking-widest text-muted-foreground",
								children: "Estimate"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-display text-2xl",
								children: ["PKR ", Number(i.grand_total).toLocaleString()]
							})]
						})]
					}, i.id))
				})
			]
		})
	});
}
//#endregion
export { Dashboard as component };

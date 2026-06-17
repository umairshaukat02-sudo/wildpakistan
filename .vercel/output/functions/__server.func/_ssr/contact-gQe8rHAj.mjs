import { o as __toESM } from "../_runtime.mjs";
import { a as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { s as submitContact } from "./cms.functions-DmxgqS96.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Phone, c as MapPin, f as Linkedin, l as Mail, p as Instagram } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-gQe8rHAj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	const [sending, setSending] = (0, import_react.useState)(false);
	const send = useServerFn(submitContact);
	const onSubmit = async (e) => {
		e.preventDefault();
		const form = e.currentTarget;
		const fd = new FormData(form);
		const payload = {
			name: String(fd.get("name") ?? "").trim(),
			email: String(fd.get("email") ?? "").trim(),
			subject: String(fd.get("subject") ?? "").trim() || null,
			message: String(fd.get("message") ?? "").trim()
		};
		if (!payload.name || !payload.email || !payload.message) {
			toast.error("Please fill name, email, and message.");
			return;
		}
		setSending(true);
		try {
			await send({ data: payload });
			toast.success("Message received — we'll be in touch.");
			form.reset();
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Failed to send";
			toast.error(msg);
		} finally {
			setSending(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pt-32 pb-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[10px] text-accent uppercase tracking-[0.3em] block mb-4",
						children: "Contact"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-5xl md:text-6xl mb-6 text-balance",
						children: "Let's plan something wild."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground text-lg",
						children: "Reach out by phone, email, or use the form. We respond within a day."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-10 space-y-5 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
									className: "text-accent shrink-0",
									size: 18
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold",
									children: "Phone"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "tel:+923125611476",
									className: "text-muted-foreground hover:text-accent",
									children: "0312-5611476"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
									className: "text-accent shrink-0",
									size: 18
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "mailto:tripsbywild@gmail.com",
									className: "text-muted-foreground hover:text-accent",
									children: "tripsbywild@gmail.com"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
									className: "text-accent shrink-0",
									size: 18
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold",
									children: "Based in"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Islamabad, Pakistan"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, {
									className: "text-accent shrink-0",
									size: 18
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "https://www.instagram.com/wild.pk",
									target: "_blank",
									rel: "noreferrer",
									className: "hover:text-accent",
									children: "@wild.pk"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, {
									className: "text-accent shrink-0",
									size: 18
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "https://www.linkedin.com/company/wild-pk/",
									target: "_blank",
									rel: "noreferrer",
									className: "hover:text-accent",
									children: "wild-pk"
								})]
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "bg-background rounded-md border border-border p-8 space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid sm:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "name",
								label: "Name",
								required: true,
								maxLength: 150
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "email",
								type: "email",
								label: "Email",
								required: true,
								maxLength: 255
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "subject",
							label: "Subject",
							maxLength: 200
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-[10px] uppercase tracking-widest text-muted-foreground mb-2",
								children: "Message *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								name: "message",
								rows: 5,
								required: true,
								maxLength: 4e3,
								className: "w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							disabled: sending,
							className: "inline-flex rounded-full bg-foreground text-background px-7 py-3 text-xs font-bold uppercase tracking-widest disabled:opacity-50",
							children: sending ? "Sending…" : "Send message"
						})
					]
				})
			})]
		})
	});
}
function Input({ label, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "block text-[10px] uppercase tracking-widest text-muted-foreground mb-2",
			children: [label, props.required ? " *" : ""]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			...props,
			className: "w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm"
		})]
	});
}
//#endregion
export { ContactPage as component };

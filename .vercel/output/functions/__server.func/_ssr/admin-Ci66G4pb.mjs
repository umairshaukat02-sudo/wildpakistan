import { o as __toESM } from "../_runtime.mjs";
import { a as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useQueryClient, o as require_jsx_runtime, r as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { c as updateContactStatus, i as listContactMessages, l as upsertSiteImage, o as listSiteImages, r as listAllTours, t as deleteTour, u as upsertTour } from "./cms.functions-DmxgqS96.mjs";
import { a as updateInquiryStatus, n as listAllInquiries, t as checkIsAdmin } from "./inquiries.functions-Bbi5o8-P.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-Ci66G4pb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Admin() {
	const adminCheck = useServerFn(checkIsAdmin);
	const adminQ = useQuery({
		queryKey: ["is-admin"],
		queryFn: () => adminCheck(),
		retry: 1
	});
	const [tab, setTab] = (0, import_react.useState)("inquiries");
	if (adminQ.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pt-40 text-center text-muted-foreground",
		children: "Checking access…"
	});
	if (adminQ.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pt-40 pb-32 text-center px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl",
				children: "Admin check failed"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground mt-3",
				children: "Refresh the page or sign in again."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => adminQ.refetch(),
				className: "mt-6 rounded-full bg-accent px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-accent-foreground",
				children: "Try again"
			})
		]
	});
	if (!adminQ.data?.isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pt-40 pb-32 text-center px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl",
				children: "Admin access required"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground mt-3",
				children: "Ask the WILD team to grant your account admin role."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/dashboard",
				className: "mt-6 inline-block underline",
				children: "← Back to dashboard"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pt-32 pb-24 px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] text-accent uppercase tracking-[0.3em] block mb-2",
					children: "Admin"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl md:text-5xl mb-8",
					children: "Dashboard"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2 border-b border-border mb-8",
					children: [
						{
							id: "inquiries",
							label: "Inquiries"
						},
						{
							id: "contacts",
							label: "Contact Messages"
						},
						{
							id: "tours",
							label: "Tour Packages"
						},
						{
							id: "images",
							label: "Site Images"
						}
					].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setTab(t.id),
						className: `px-4 py-2 text-xs font-bold uppercase tracking-widest transition border-b-2 -mb-px ${tab === t.id ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"}`,
						children: t.label
					}, t.id))
				}),
				tab === "inquiries" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InquiriesTab, {}),
				tab === "contacts" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactsTab, {}),
				tab === "tours" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToursTab, {}),
				tab === "images" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagesTab, {})
			]
		})
	});
}
function InquiriesTab() {
	const list = useServerFn(listAllInquiries);
	const update = useServerFn(updateInquiryStatus);
	const qc = useQueryClient();
	const q = useQuery({
		queryKey: ["all-inquiries"],
		queryFn: () => list(),
		refetchInterval: 1e4,
		retry: 1
	});
	const setStatus = async (id, status) => {
		try {
			await update({ data: {
				id,
				status
			} });
			toast.success("Updated");
			qc.invalidateQueries({ queryKey: ["all-inquiries"] });
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Failed");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background border border-border rounded-md overflow-x-auto",
		children: [
			q.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-8 text-center text-muted-foreground",
				children: "Loading inquiries…"
			}),
			q.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminError, {
				message: "Could not load inquiries.",
				onRetry: () => q.refetch()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "text-left text-[10px] uppercase tracking-widest text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3",
								children: "Code"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3",
								children: "Customer"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3",
								children: "Destination"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3",
								children: "Days"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3",
								children: "Total"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3",
								children: "Actions"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [q.data?.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3 font-mono text-xs text-accent",
							children: i.inquiry_code
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "p-3",
							children: [
								i.customer_name,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: i.customer_email
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3",
							children: i.destination
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3",
							children: i.duration_days
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "p-3",
							children: ["PKR ", Number(i.grand_total).toLocaleString()]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded bg-muted",
								children: i.status
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setStatus(i.id, "approved"),
									className: "px-2 py-1 text-[10px] rounded bg-accent text-accent-foreground",
									children: "Approve"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setStatus(i.id, "rejected"),
									className: "px-2 py-1 text-[10px] rounded bg-destructive text-destructive-foreground",
									children: "Reject"
								})]
							})
						})
					]
				}, i.id)), q.data && q.data.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					colSpan: 7,
					className: "p-8 text-center text-muted-foreground",
					children: "No inquiries yet."
				}) })] })]
			})
		]
	});
}
function ContactsTab() {
	const list = useServerFn(listContactMessages);
	const update = useServerFn(updateContactStatus);
	const qc = useQueryClient();
	const q = useQuery({
		queryKey: ["admin-contacts"],
		queryFn: () => list(),
		refetchInterval: 1e4,
		retry: 1
	});
	const setStatus = async (id, status) => {
		try {
			await update({ data: {
				id,
				status
			} });
			toast.success("Message updated");
			qc.invalidateQueries({ queryKey: ["admin-contacts"] });
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Failed");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background border border-border rounded-md overflow-x-auto",
		children: [
			q.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-8 text-center text-muted-foreground",
				children: "Loading messages…"
			}),
			q.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminError, {
				message: "Could not load messages.",
				onRetry: () => q.refetch()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "text-left text-[10px] uppercase tracking-widest text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3",
								children: "When"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3",
								children: "Name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3",
								children: "Email"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3",
								children: "Subject"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3",
								children: "Message"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3",
								children: "Actions"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [q.data?.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-border align-top",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3 whitespace-nowrap text-xs text-muted-foreground",
							children: new Date(m.created_at).toLocaleString()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3",
							children: m.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `mailto:${m.email}`,
								className: "text-accent underline",
								children: m.email
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3",
							children: m.subject ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3 max-w-md whitespace-pre-wrap",
							children: m.message
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded bg-muted",
								children: m.status
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setStatus(m.id, m.status === "archived" ? "new" : "archived"),
								className: "px-2 py-1 text-[10px] rounded bg-muted",
								children: m.status === "archived" ? "Restore" : "Archive"
							})
						})
					]
				}, m.id)), q.data && q.data.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					colSpan: 7,
					className: "p-8 text-center text-muted-foreground",
					children: "No messages yet."
				}) })] })]
			})
		]
	});
}
function ToursTab() {
	const list = useServerFn(listAllTours);
	const save = useServerFn(upsertTour);
	const remove = useServerFn(deleteTour);
	const qc = useQueryClient();
	const q = useQuery({
		queryKey: ["admin-tours"],
		queryFn: () => list(),
		retry: 1
	});
	const togglePublish = async (t) => {
		try {
			await save({ data: {
				...sanitizeTour(t),
				published: !t.published
			} });
			toast.success(t.published ? "Unpublished" : "Published");
			qc.invalidateQueries({ queryKey: ["admin-tours"] });
			qc.invalidateQueries({ queryKey: ["published-tours"] });
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Failed");
		}
	};
	const editPrice = async (t) => {
		const v = prompt(`New price (PKR) for ${t.title}:`, String(t.price_pkr));
		if (!v) return;
		const n = parseInt(v, 10);
		if (Number.isNaN(n) || n < 0) {
			toast.error("Invalid price");
			return;
		}
		try {
			await save({ data: {
				...sanitizeTour(t),
				price_pkr: n
			} });
			toast.success("Price updated");
			qc.invalidateQueries({ queryKey: ["admin-tours"] });
			qc.invalidateQueries({ queryKey: ["published-tours"] });
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Failed");
		}
	};
	const editImage = async (t) => {
		const v = prompt(`Hero image URL for ${t.title}:`, t.hero_image ?? "");
		if (v === null) return;
		try {
			await save({ data: {
				...sanitizeTour(t),
				hero_image: v || null
			} });
			toast.success("Image updated");
			qc.invalidateQueries({ queryKey: ["admin-tours"] });
			qc.invalidateQueries({ queryKey: ["published-tours"] });
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Failed");
		}
	};
	const del = async (t) => {
		if (!confirm(`Delete tour "${t.title}"? This cannot be undone.`)) return;
		try {
			await remove({ data: { id: t.id } });
			toast.success("Deleted");
			qc.invalidateQueries({ queryKey: ["admin-tours"] });
			qc.invalidateQueries({ queryKey: ["published-tours"] });
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Failed");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background border border-border rounded-md overflow-x-auto",
		children: [
			q.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-8 text-center text-muted-foreground",
				children: "Loading tours…"
			}),
			q.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminError, {
				message: "Could not load tours.",
				onRetry: () => q.refetch()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "text-left text-[10px] uppercase tracking-widest text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3",
								children: "Title"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3",
								children: "Slug"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3",
								children: "Days"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3",
								children: "Price"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3",
								children: "Actions"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [q.data?.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3 font-medium",
							children: t.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3 font-mono text-xs",
							children: t.slug
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3",
							children: t.duration_days
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "p-3",
							children: ["PKR ", t.price_pkr.toLocaleString()]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded ${t.published ? "bg-accent/15 text-accent" : "bg-muted text-muted-foreground"}`,
								children: t.published ? "live" : "draft"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-1 flex-wrap",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => editPrice(t),
										className: "px-2 py-1 text-[10px] rounded bg-muted",
										children: "Price"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => editImage(t),
										className: "px-2 py-1 text-[10px] rounded bg-muted",
										children: "Image"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => togglePublish(t),
										className: "px-2 py-1 text-[10px] rounded bg-foreground text-background",
										children: t.published ? "Unpublish" : "Publish"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => del(t),
										className: "px-2 py-1 text-[10px] rounded bg-destructive text-destructive-foreground",
										children: "Delete"
									})
								]
							})
						})
					]
				}, t.id)), q.data && q.data.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					colSpan: 6,
					className: "p-8 text-center text-muted-foreground",
					children: "No tours yet."
				}) })] })]
			})
		]
	});
}
function sanitizeTour(t) {
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
		sort_order: t.sort_order ?? 0
	};
}
function ImagesTab() {
	const list = useServerFn(listSiteImages);
	const save = useServerFn(upsertSiteImage);
	const qc = useQueryClient();
	const q = useQuery({
		queryKey: ["admin-images"],
		queryFn: () => list(),
		retry: 1
	});
	const editUrl = async (img) => {
		const v = prompt(`New image URL for "${img.key}":`, img.url);
		if (!v) return;
		try {
			await save({ data: {
				key: img.key,
				url: v,
				alt: img.alt
			} });
			toast.success("Image updated");
			qc.invalidateQueries({ queryKey: ["admin-images"] });
			qc.invalidateQueries({ queryKey: ["site-images"] });
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Failed");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground",
				children: [
					"Edit any image URL — supports relative paths like ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
						className: "font-mono",
						children: "/images/hero.jpg"
					}),
					" or full URLs from a CDN."
				]
			}),
			q.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-8 text-center text-muted-foreground",
				children: "Loading images…"
			}),
			q.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminError, {
				message: "Could not load images.",
				onRetry: () => q.refetch()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4",
				children: q.data?.map((img) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-border rounded-md overflow-hidden bg-background",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-[4/3] bg-muted overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: img.url,
							alt: img.alt ?? img.key,
							className: "size-full object-cover",
							loading: "lazy"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3 space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-[10px] uppercase tracking-widest text-accent",
								children: img.key
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground break-all line-clamp-2",
								children: img.url
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => editUrl(img),
								className: "w-full px-3 py-2 text-[10px] font-bold uppercase tracking-widest rounded bg-foreground text-background",
								children: "Change URL"
							})
						]
					})]
				}, img.key))
			})
		]
	});
}
function AdminError({ message, onRetry }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "m-4 rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: message }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: onRetry,
			className: "mt-3 rounded-full bg-foreground px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-background",
			children: "Retry"
		})]
	});
}
//#endregion
export { Admin as component };

import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as streamText, n as DefaultChatTransport, r as convertToModelMessages, t as useChat } from "../_libs/@ai-sdk/react+[...].mjs";
import { M as redirect, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as QueryClientProvider, o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as supabase } from "./client-B_T8LLyF.mjs";
import { a as Phone, f as Linkedin, h as Compass, l as Mail, m as Facebook, o as MessageCircle, p as Instagram, r as Send, s as Menu, t as X } from "../_libs/lucide-react.mjs";
import { t as IMAGE_FALLBACKS } from "./data-DvbGLkfa.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { t as Route$12 } from "./dashboard-CKvxaYrs.mjs";
import { n as siteImagesQuery, t as publishedToursQuery } from "./queries-2TD0Z0kx.mjs";
import { t as Route$13 } from "./inquiry-success-Cxk0-JFL.mjs";
import { t as Route$14 } from "./tours._slug-DpmBI5XY.mjs";
import { t as createOpenAICompatible } from "../_libs/ai-sdk__openai-compatible.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-N6lArVgM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DftFyozB.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var links = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/tours",
		label: "Expeditions"
	},
	{
		to: "/destinations",
		label: "Destinations"
	},
	{
		to: "/customize",
		label: "Customize"
	},
	{
		to: "/gallery",
		label: "Gallery"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function SiteHeader() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [signedIn, setSignedIn] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const scrolled = useScrolled();
	const onHero = pathname === "/" && !scrolled;
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session));
		const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSignedIn(!!s));
		return () => sub.subscription.unsubscribe();
	}, []);
	(0, import_react.useEffect)(() => setOpen(false), [pathname]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `fixed top-0 z-50 w-full transition-all duration-300 ${onHero ? "bg-transparent" : "bg-background/85 backdrop-blur-md border-b border-border"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl items-center justify-between px-6 py-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: `font-display text-2xl font-semibold tracking-tight ${onHero ? "text-white" : "text-foreground"}`,
					children: ["WILD", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-accent",
						children: "."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden md:flex items-center gap-8",
					children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						className: `text-xs font-semibold uppercase tracking-[0.18em] transition-colors hover:text-accent ${onHero ? "text-white/90" : "text-foreground/80"}`,
						activeProps: { className: "text-accent" },
						activeOptions: { exact: l.to === "/" },
						children: l.label
					}, l.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden md:flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: signedIn ? "/dashboard" : "/auth",
						className: `text-xs font-semibold uppercase tracking-[0.18em] ${onHero ? "text-white/90" : "text-foreground/80"} hover:text-accent`,
						children: signedIn ? "Account" : "Sign In"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/customize",
						className: "rounded-full bg-accent px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-accent-foreground hover:brightness-110 transition",
						children: "Plan Trip"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setOpen((o) => !o),
					className: `md:hidden ${onHero ? "text-white" : "text-foreground"}`,
					"aria-label": "Menu",
					children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "md:hidden border-t border-border bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col px-6 py-4 gap-3",
				children: [
					links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						className: "py-2 text-sm font-semibold uppercase tracking-widest",
						children: l.label
					}, l.to)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: signedIn ? "/dashboard" : "/auth",
						className: "py-2 text-sm font-semibold uppercase tracking-widest",
						children: signedIn ? "Account" : "Sign In"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/customize",
						className: "mt-2 rounded-full bg-accent px-5 py-3 text-center text-xs font-bold uppercase tracking-widest text-accent-foreground",
						children: "Plan a Trip"
					})
				]
			})
		})]
	});
}
function useScrolled() {
	const [s, setS] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setS(window.scrollY > 40);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return s;
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "bg-foreground text-background mt-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-6 py-20 grid gap-12 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-display text-3xl font-semibold mb-4",
							children: [
								"WILD",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-accent",
									children: "."
								}),
								" Pakistan"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-md text-sm text-background/70 leading-relaxed",
							children: "An Islamabad-based adventure community organising guided hikes and multi-day expeditions across the most profound landscapes in Northern Pakistan."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "https://www.instagram.com/wild.pk",
									target: "_blank",
									rel: "noreferrer",
									className: "text-background/60 hover:text-accent",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { size: 20 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "https://www.linkedin.com/company/wild-pk/",
									target: "_blank",
									rel: "noreferrer",
									className: "text-background/60 hover:text-accent",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { size: 20 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#",
									className: "text-background/60 hover:text-accent",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Facebook, { size: 20 })
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-5",
					children: "Explore"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-3 text-sm text-background/70",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/tours",
							className: "hover:text-background",
							children: "Expeditions"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/destinations",
							className: "hover:text-background",
							children: "Destinations"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/customize",
							className: "hover:text-background",
							children: "Customize Trip"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/gallery",
							className: "hover:text-background",
							children: "Gallery"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							className: "hover:text-background",
							children: "Contact"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-5",
					children: "Enquire"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-3 text-sm text-background/70",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "mailto:tripsbywild@gmail.com",
								className: "hover:text-background",
								children: "tripsbywild@gmail.com"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "tel:+923125611476",
								className: "hover:text-background",
								children: "0312-5611476"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-background/50",
							children: "Islamabad, Pakistan"
						})
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-background/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row justify-between gap-3 text-[10px] uppercase tracking-[0.25em] text-background/40",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" WILD Pakistan Expeditions"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Crafted for the adventurous" })]
			})
		})]
	});
}
function AIAssistant() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [input, setInput] = (0, import_react.useState)("");
	const scrollRef = (0, import_react.useRef)(null);
	const { messages, sendMessage, status } = useChat({ transport: new DefaultChatTransport({ api: "/api/chat" }) });
	const busy = status === "submitted" || status === "streaming";
	(0, import_react.useEffect)(() => {
		scrollRef.current?.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [messages, status]);
	const onSubmit = (e) => {
		e.preventDefault();
		const text = input.trim();
		if (!text || busy) return;
		setInput("");
		sendMessage({ text });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick: () => setOpen((o) => !o),
		className: "fixed bottom-6 right-6 z-50 size-14 rounded-full bg-accent text-accent-foreground shadow-xl hover:scale-105 active:scale-95 transition grid place-items-center",
		"aria-label": "WILD AI assistant",
		children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 30,
			scale: .96
		},
		animate: {
			opacity: 1,
			y: 0,
			scale: 1
		},
		exit: {
			opacity: 0,
			y: 30,
			scale: .96
		},
		transition: { duration: .2 },
		className: "fixed bottom-24 right-6 z-50 w-[min(380px,calc(100vw-3rem))] h-[560px] max-h-[80vh] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-5 py-4 bg-foreground text-background flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "size-9 rounded-full bg-accent grid place-items-center text-accent-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { size: 18 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-lg leading-none",
					children: "WILD Concierge"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] uppercase tracking-widest text-background/60 mt-1",
					children: "AI Travel Assistant"
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: scrollRef,
				className: "flex-1 overflow-y-auto px-4 py-4 space-y-3",
				children: [
					messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Hi! I help travellers find the right WILD trip. Ask me anything about Northern Pakistan."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: [
								"Suggest a trip under PKR 30,000",
								"Best honeymoon destination?",
								"5-day family tour",
								"Trekking destinations in Pakistan"
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => void sendMessage({ text: s }),
								className: "block w-full text-left text-xs px-3 py-2 rounded-lg border border-border hover:border-accent hover:text-accent transition",
								children: s
							}, s))
						})]
					}),
					messages.map((m) => {
						const text = m.parts.map((p) => p.type === "text" ? p.text : "").join("");
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: m.role === "user" ? "flex justify-end" : "",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `max-w-[85%] text-sm leading-relaxed whitespace-pre-wrap ${m.role === "user" ? "bg-foreground text-background px-3 py-2 rounded-2xl rounded-tr-sm" : "text-foreground"}`,
								children: text
							})
						}, m.id);
					}),
					busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground animate-pulse",
						children: "Thinking…"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "border-t border-border p-3 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: input,
					onChange: (e) => setInput(e.target.value),
					placeholder: "Ask about trips, prices, dates…",
					className: "flex-1 rounded-full bg-muted px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: busy || !input.trim(),
					className: "size-10 grid place-items-center rounded-full bg-accent text-accent-foreground disabled:opacity-50",
					"aria-label": "Send",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { size: 16 })
				})]
			})
		]
	}) })] });
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-7xl text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold",
					children: "Off the trail"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "This route doesn't exist on our map."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-6 inline-flex rounded-full bg-accent px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-accent-foreground",
					children: "Back to base camp"
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Try refreshing or head back to base camp."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "rounded-full bg-accent px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-accent-foreground",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "rounded-full border border-border px-5 py-2.5 text-xs font-bold uppercase tracking-widest",
						children: "Home"
					})]
				})
			]
		})
	});
}
var Route$11 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "WILD Pakistan — Premium Adventure & Tours" },
			{
				name: "description",
				content: "Guided hikes, customized trips, and multi-day expeditions across Hunza, Skardu, Fairy Meadows, Swat, Naran Kaghan and Kashmir."
			},
			{
				name: "author",
				content: "WILD Pakistan"
			},
			{
				property: "og:title",
				content: "WILD Pakistan — Premium Adventure & Tours"
			},
			{
				property: "og:description",
				content: "Guided hikes, customized trips, and multi-day expeditions across Hunza, Skardu, Fairy Meadows, Swat, Naran Kaghan and Kashmir."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "WILD Pakistan — Premium Adventure & Tours"
			},
			{
				name: "twitter:description",
				content: "Guided hikes, customized trips, and multi-day expeditions across Hunza, Skardu, Fairy Meadows, Swat, Naran Kaghan and Kashmir."
			},
			{
				property: "og:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/adb39a1a-a938-4ba0-b7b8-b320ad8349e2/id-preview-103b3166--07b88447-a39f-4952-9c93-52d4e14ac2c2.lovable.app-1781352997000.png"
			},
			{
				name: "twitter:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/adb39a1a-a938-4ba0-b7b8-b320ad8349e2/id-preview-103b3166--07b88447-a39f-4952-9c93-52d4e14ac2c2.lovable.app-1781352997000.png"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: ""
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..900&family=Instrument+Sans:wght@400;500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$11.useRouteContext();
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((event) => {
			if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
			router.invalidate();
			if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
		});
		return () => sub.subscription.unsubscribe();
	}, [router, queryClient]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "min-h-screen",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AIAssistant, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "top-center",
				richColors: true
			})
		]
	});
}
var BASE_URL = "";
var Route$10 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const paths = [
		"/",
		"/tours",
		"/destinations",
		"/customize",
		"/gallery",
		"/contact"
	];
	const tours = [
		"hunza-explorer",
		"skardu-adventure",
		"fairy-meadows-trek",
		"swat-weekend",
		"naran-kaghan-classic",
		"kashmir-neelum"
	];
	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...paths.map((p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`), ...tours.map((s) => `  <url><loc>${BASE_URL}/tours/${s}</loc><changefreq>monthly</changefreq></url>`)].join("\n")}\n</urlset>`;
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$8 = () => import("./gallery-CaAK1iX8.mjs");
var $$splitNotFoundComponentImporter$3 = () => import("./gallery-DVmYiFkt.mjs");
var $$splitErrorComponentImporter$3 = () => import("./gallery-DOk1HafC.mjs");
var Route$9 = createFileRoute("/gallery")({
	head: () => ({ meta: [
		{ title: "Gallery — WILD Pakistan" },
		{
			name: "description",
			content: "Field photography from WILD Pakistan expeditions across the Karakoram and beyond."
		},
		{
			property: "og:title",
			content: "Gallery — WILD Pakistan"
		}
	] }),
	loader: ({ context }) => context.queryClient.ensureQueryData(siteImagesQuery),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter$3, "errorComponent"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$3, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./destinations-D6cvSHRF.mjs");
var $$splitNotFoundComponentImporter$2 = () => import("./destinations-BLBwTHyg.mjs");
var $$splitErrorComponentImporter$2 = () => import("./destinations-BQRiwFB-.mjs");
var Route$8 = createFileRoute("/destinations")({
	head: () => ({ meta: [
		{ title: "Destinations — WILD Pakistan" },
		{
			name: "description",
			content: "Hunza, Skardu, Fairy Meadows, Swat, Naran Kaghan, Kashmir — the territories WILD knows."
		},
		{
			property: "og:title",
			content: "Destinations — WILD Pakistan"
		},
		{
			property: "og:description",
			content: "The territories WILD knows."
		}
	] }),
	loader: ({ context }) => context.queryClient.ensureQueryData(siteImagesQuery),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter$2, "errorComponent"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$2, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./customize-sjPzW7Y4.mjs");
var Route$7 = createFileRoute("/customize")({
	head: () => ({ meta: [
		{ title: "Customize Your Trip — WILD Pakistan" },
		{
			name: "description",
			content: "Build your own Northern Pakistan trip with dynamic pricing — destination, dates, transport, accommodation, meals and activities."
		},
		{
			property: "og:title",
			content: "Customize Your Trip — WILD Pakistan"
		},
		{
			property: "og:description",
			content: "Multi-step trip builder with real-time pricing."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./contact-gQe8rHAj.mjs");
var Route$6 = createFileRoute("/contact")({
	head: () => ({ meta: [
		{ title: "Contact — WILD Pakistan" },
		{
			name: "description",
			content: "Get in touch with WILD Pakistan in Islamabad. Phone 0312-5611476, email tripsbywild@gmail.com."
		},
		{
			property: "og:title",
			content: "Contact WILD Pakistan"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./auth-BFtGZviq.mjs");
var Route$5 = createFileRoute("/auth")({
	head: () => ({ meta: [{ title: "Sign in — WILD Pakistan" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./route-Di7iQBCH.mjs");
var Route$4 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/auth" });
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./routes-coOKn4ff.mjs");
var $$splitNotFoundComponentImporter$1 = () => import("./routes-BTyFrO_M.mjs");
var $$splitErrorComponentImporter$1 = () => import("./routes-BKI4v-f9.mjs");
var Route$3 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "WILD Pakistan — Adventure Tours & Trekking" },
		{
			name: "description",
			content: "Guided expeditions across Hunza, Skardu, Fairy Meadows and beyond. Customizable trips with dynamic pricing."
		},
		{
			property: "og:title",
			content: "WILD Pakistan — Adventure Tours"
		},
		{
			property: "og:description",
			content: "Cinematic expeditions across Northern Pakistan."
		},
		{
			property: "og:image",
			content: IMAGE_FALLBACKS.hero
		}
	] }),
	loader: ({ context }) => Promise.all([context.queryClient.ensureQueryData(siteImagesQuery), context.queryClient.ensureQueryData(publishedToursQuery)]),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter$1, "errorComponent"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./tours.index-B74aR-0V.mjs");
var $$splitNotFoundComponentImporter = () => import("./tours.index-HEwAq2aZ.mjs");
var $$splitErrorComponentImporter = () => import("./tours.index-CYcj0Ka5.mjs");
var Route$2 = createFileRoute("/tours/")({
	head: () => ({ meta: [
		{ title: "Expeditions — WILD Pakistan" },
		{
			name: "description",
			content: "Curated multi-day tours across Hunza, Skardu, Fairy Meadows, Swat, Naran Kaghan and Kashmir."
		},
		{
			property: "og:title",
			content: "Expeditions — WILD Pakistan"
		},
		{
			property: "og:description",
			content: "Fixed multi-day tours with transport, hotels, meals and guides."
		}
	] }),
	loader: ({ context }) => context.queryClient.ensureQueryData(publishedToursQuery),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
function createLovableAiGatewayProvider(apiKey) {
	return createOpenAICompatible({
		name: "lovable",
		baseURL: "https://ai.gateway.lovable.dev/v1",
		headers: { "Lovable-API-Key": apiKey }
	});
}
var SYSTEM_PROMPT = `You are the WILD Pakistan travel concierge — an AI assistant for an Islamabad-based adventure tour community.
You recommend trips across Northern Pakistan (Hunza, Skardu, Fairy Meadows, Swat, Naran Kaghan, Kashmir).
Be concise, warm, and practical. Suggest specific itineraries, durations, and approximate PKR pricing when asked.
Direct serious bookings to the /customize page or /contact. Never invent prices for fixed tours other than:
- Hunza Explorer (3 days, from PKR 32,000)
- Skardu Adventure (5 days, from PKR 54,000)
- Fairy Meadows Trek (4 days, from PKR 38,500)
- Swat Weekend (2 days, from PKR 14,500)
- Naran Kaghan Classic (3 days, from PKR 21,000)
- Kashmir & Neelum (4 days, from PKR 28,000)
Contact: tripsbywild@gmail.com / 0312-5611476.`;
var Route$1 = createFileRoute("/api/chat")({ server: { handlers: { POST: async ({ request }) => {
	const { messages } = await request.json();
	const key = process.env.LOVABLE_API_KEY;
	if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });
	return streamText({
		model: createLovableAiGatewayProvider(key)("google/gemini-3-flash-preview"),
		system: SYSTEM_PROMPT,
		messages: await convertToModelMessages(messages)
	}).toUIMessageStreamResponse({ originalMessages: messages });
} } } });
var $$splitComponentImporter = () => import("./admin-Ci66G4pb.mjs");
var Route = createFileRoute("/_authenticated/admin")({
	head: () => ({ meta: [{ title: "Admin — WILD Pakistan" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var SitemapDotxmlRoute = Route$10.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$11
});
var InquirySuccessRoute = Route$13.update({
	id: "/inquiry-success",
	path: "/inquiry-success",
	getParentRoute: () => Route$11
});
var GalleryRoute = Route$9.update({
	id: "/gallery",
	path: "/gallery",
	getParentRoute: () => Route$11
});
var DestinationsRoute = Route$8.update({
	id: "/destinations",
	path: "/destinations",
	getParentRoute: () => Route$11
});
var CustomizeRoute = Route$7.update({
	id: "/customize",
	path: "/customize",
	getParentRoute: () => Route$11
});
var ContactRoute = Route$6.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$11
});
var AuthRoute = Route$5.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$11
});
var AuthenticatedRouteRoute = Route$4.update({
	id: "/_authenticated",
	getParentRoute: () => Route$11
});
var IndexRoute = Route$3.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$11
});
var ToursIndexRoute = Route$2.update({
	id: "/tours/",
	path: "/tours/",
	getParentRoute: () => Route$11
});
var ToursSlugRoute = Route$14.update({
	id: "/tours/$slug",
	path: "/tours/$slug",
	getParentRoute: () => Route$11
});
var ApiChatRoute = Route$1.update({
	id: "/api/chat",
	path: "/api/chat",
	getParentRoute: () => Route$11
});
var AuthenticatedDashboardRoute = Route$12.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAdminRoute: Route.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedDashboardRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute,
	ContactRoute,
	CustomizeRoute,
	DestinationsRoute,
	GalleryRoute,
	InquirySuccessRoute,
	SitemapDotxmlRoute,
	ApiChatRoute,
	ToursSlugRoute,
	ToursIndexRoute
};
var routeTree = Route$11._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Refresh the page or return home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/",
					className: "mt-6 inline-flex rounded-full bg-accent px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-accent-foreground",
					children: "Home"
				})
			]
		})
	});
}
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0,
		defaultErrorComponent: DefaultErrorComponent
	});
};
//#endregion
export { getRouter };

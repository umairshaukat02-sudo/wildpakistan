import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useSuspenseQuery, o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Check, i as Quote, v as ArrowRight } from "../_libs/lucide-react.mjs";
import { a as testimonials, i as stats, n as destinations, r as imageUrl } from "./data-DvbGLkfa.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { n as siteImagesQuery, t as publishedToursQuery } from "./queries-2TD0Z0kx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-coOKn4ff.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { data: images } = useSuspenseQuery(siteImagesQuery);
	const { data: tours } = useSuspenseQuery(publishedToursQuery);
	const hero = imageUrl("hero", images);
	const community = imageUrl("community", images);
	const featured = tours.filter((t) => t.featured).slice(0, 3);
	const showTours = featured.length > 0 ? featured : tours.slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative h-screen min-h-[680px] w-full overflow-hidden bg-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: hero,
					alt: "Karakoram mountains at golden hour",
					className: "absolute inset-0 size-full object-cover opacity-80",
					width: 1920,
					height: 1080
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative h-full flex flex-col justify-end pb-24 px-6 md:px-16 max-w-7xl mx-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 30
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .9,
							ease: [
								.2,
								.8,
								.2,
								1
							]
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] text-accent uppercase tracking-[0.4em] mb-6 block",
								children: "Islamabad · Hunza · Skardu"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-5xl md:text-7xl lg:text-[8rem] text-white leading-[0.9] tracking-tight max-w-5xl text-balance",
								children: "The earned silence of the Karakoram."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 max-w-xl text-white/80 text-base md:text-lg",
								children: "Guided expeditions, custom itineraries, and a community of travellers who take Pakistan's North seriously."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-10 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/tours",
									className: "inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-accent-foreground hover:brightness-110 transition",
									children: ["Explore Expeditions ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 14 })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/customize",
									className: "inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white ring-1 ring-white/20 hover:bg-white/20 transition",
									children: "Customize Trip"
								})]
							})
						]
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-foreground text-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 divide-x divide-background/10 border-y border-background/10",
				children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-6 py-10 flex flex-col items-center text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[10px] uppercase tracking-[0.3em] text-background/50 mb-3",
						children: s.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-4xl md:text-5xl",
						children: s.value
					})]
				}, s.label))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-6 py-28 grid lg:grid-cols-12 gap-12 items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] text-accent uppercase tracking-[0.3em] mb-4 block",
					children: "About WILD"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl md:text-5xl text-balance",
					children: "A community that takes the mountain seriously."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-6 lg:col-start-7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg leading-relaxed text-foreground/80",
					children: "WILD is an Islamabad-based adventure and tourism community organising guided hikes and multi-day expeditions across some of Pakistan's most scenic destinations. We focus on safe, affordable, and well-organised travel — building a community of adventure lovers, students, and young professionals who want to see the North done right."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid sm:grid-cols-2 gap-5",
					children: [
						"Experienced trip management",
						"Affordable, well-planned trips",
						"Safe and guided experiences",
						"A real travel community"
					].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-0.5 size-5 rounded-full bg-accent/15 grid place-items-center text-accent shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
								size: 12,
								strokeWidth: 3
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium",
							children: c
						})]
					}, c))
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "bg-background py-24 overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-6 mb-12 flex flex-wrap items-end justify-between gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] text-accent uppercase tracking-[0.3em] mb-4 block",
					children: "01 · Territories"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl md:text-5xl max-w-xl text-balance",
					children: "Territories of the North"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/destinations",
					className: "text-xs font-bold uppercase tracking-[0.18em] border-b border-accent text-accent pb-1",
					children: "View all destinations"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-6 overflow-x-auto px-6 no-scrollbar snap-x",
				children: destinations.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/destinations",
					hash: d.slug,
					className: "group flex-shrink-0 w-[300px] snap-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-[4/5] overflow-hidden rounded-md mb-4 bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: imageUrl(d.imageKey, images),
							alt: d.name,
							loading: "lazy",
							className: "size-full object-cover transition-transform duration-700 group-hover:scale-105"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl",
							children: d.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1",
							children: d.tagline
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 font-mono text-[10px] uppercase tracking-widest border border-border bg-muted px-2 py-1",
							children: d.elevation
						})]
					})]
				}, d.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-muted/40 py-28",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-6 mb-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] text-accent uppercase tracking-[0.3em] mb-4 block",
							children: "02 · The Collections"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-4xl md:text-5xl",
							children: "Curated Expeditions"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground mt-3 max-w-md",
							children: "Proven routes for the curious traveller."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/tours",
						className: "text-xs font-bold uppercase tracking-[0.18em] border-b border-accent text-accent pb-1",
						children: "View all expeditions"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid md:grid-cols-3 gap-8",
					children: showTours.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/tours/$slug",
						params: { slug: t.slug },
						className: "group",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative aspect-[3/4] overflow-hidden rounded-md mb-5 bg-muted",
								children: [t.hero_image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: t.hero_image,
									alt: t.title,
									loading: "lazy",
									className: "size-full object-cover transition-transform duration-700 group-hover:scale-105"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute top-4 left-4 flex gap-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded-full bg-background/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest",
										children: [t.duration_days, " Days"]
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-2xl group-hover:text-accent transition-colors",
								children: t.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground mt-2 line-clamp-2",
								children: t.summary
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex justify-between items-center border-t border-border pt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
									children: "Starting from"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-display text-xl",
									children: ["PKR ", t.price_pkr.toLocaleString()]
								})]
							})
						]
					}, t.slug))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-6 py-28 grid lg:grid-cols-12 gap-12 items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-6 order-2 lg:order-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[10px] text-accent uppercase tracking-[0.3em] mb-4 block",
						children: "03 · Trip Architect"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-4xl md:text-5xl text-balance",
						children: "Design your own path."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-foreground/70 text-lg leading-relaxed max-w-xl",
						children: "Pick a destination, choose your pace, transport, and accommodation. Our pricing rail updates in real-time as you build the trip."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/customize",
						className: "mt-8 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3.5 text-xs font-bold uppercase tracking-[0.18em] hover:bg-accent transition",
						children: ["Start Customising ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 14 })]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-6 order-1 lg:order-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "aspect-[5/4] overflow-hidden rounded-md",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: community,
						alt: "WILD community on the ridge",
						loading: "lazy",
						className: "size-full object-cover"
					})
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-foreground text-background py-28",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[10px] text-accent uppercase tracking-[0.3em] mb-4 block",
						children: "04 · Field Reports"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-4xl md:text-5xl mb-16 text-balance max-w-3xl",
						children: "From travellers who walked the ridges with us."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid md:grid-cols-3 gap-8",
						children: testimonials.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-l border-background/20 pl-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, {
									className: "text-accent mb-4",
									size: 28
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-background/90 text-base leading-relaxed",
									children: t.quote
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "size-10 rounded-full bg-accent/30 grid place-items-center font-display text-sm",
										children: t.initial
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm font-semibold",
										children: t.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase tracking-widest text-background/50",
										children: t.role
									})] })]
								})
							]
						}, t.name))
					})
				]
			})
		})
	] });
}
//#endregion
export { Home as component };

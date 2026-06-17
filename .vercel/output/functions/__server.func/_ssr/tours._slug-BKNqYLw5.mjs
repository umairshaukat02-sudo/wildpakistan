import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useSuspenseQuery, o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Check, t as X, v as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as destinations } from "./data-DvbGLkfa.mjs";
import { r as tourBySlugQuery } from "./queries-2TD0Z0kx.mjs";
import { t as Route } from "./tours._slug-DpmBI5XY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tours._slug-BKNqYLw5.js
var import_jsx_runtime = require_jsx_runtime();
function TourDetail() {
	const { slug } = Route.useParams();
	const { data: tour } = useSuspenseQuery(tourBySlugQuery(slug));
	if (!tour) return null;
	const dest = destinations.find((d) => d.slug === tour.destination);
	const itin = tour.itinerary ?? [];
	const inclusions = tour.inclusions ?? [];
	const exclusions = tour.exclusions ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-[60vh] min-h-[400px] overflow-hidden",
		children: [
			tour.hero_image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: tour.hero_image,
				alt: tour.title,
				className: "absolute inset-0 size-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 flex items-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl w-full px-6 pb-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] text-accent uppercase tracking-[0.3em] block mb-3",
							children: dest?.region ?? tour.destination
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-5xl md:text-7xl text-white max-w-4xl text-balance",
							children: tour.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white",
								children: [tour.duration_days, " Days"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent-foreground",
								children: ["From PKR ", tour.price_pkr.toLocaleString()]
							})]
						})
					]
				})
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-12 gap-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "lg:col-span-8 space-y-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl mb-4",
						children: "Overview"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-foreground/80 text-lg leading-relaxed",
						children: tour.summary
					}),
					tour.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-foreground/70 mt-4 leading-relaxed",
						children: tour.description
					})
				] }),
				itin.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl mb-6",
					children: "Itinerary"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "space-y-5",
					children: itin.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "border-l-2 border-accent pl-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-[10px] uppercase tracking-[0.3em] text-accent",
								children: ["Day ", d.day]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl mt-1",
								children: d.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground mt-1",
								children: d.details
							})
						]
					}, d.day))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid md:grid-cols-2 gap-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl mb-4",
						children: "Included"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: inclusions.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
								size: 16,
								className: "text-accent shrink-0 mt-0.5"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: i })]
						}, i))
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl mb-4",
						children: "Excluded"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: exclusions.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
								size: 16,
								className: "text-muted-foreground shrink-0 mt-0.5"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: i })]
						}, i))
					})] })]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "lg:col-span-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:sticky lg:top-28 bg-foreground text-background p-8 rounded-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[10px] uppercase tracking-[0.3em] text-accent",
						children: "Book this tour"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "font-display text-3xl mt-2 mb-1",
						children: ["PKR ", tour.price_pkr.toLocaleString()]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-background/60 text-xs uppercase tracking-widest",
						children: "per person, from"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/customize",
						className: "mt-6 w-full inline-flex justify-center items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-accent-foreground",
						children: ["Book / Customize ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 14 })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						className: "mt-3 w-full inline-flex justify-center rounded-full border border-background/20 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-background hover:bg-background/10",
						children: "Ask a question"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 pt-6 border-t border-background/10 space-y-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-background/60",
									children: "Duration"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [tour.duration_days, " days"] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-background/60",
									children: "Destination"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: dest?.name ?? tour.destination })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-background/60",
									children: "Group"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Small" })]
							})
						]
					})
				]
			})
		})]
	})] });
}
//#endregion
export { TourDetail as component };

import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useSuspenseQuery, o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as publishedToursQuery } from "./queries-2TD0Z0kx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tours.index-B74aR-0V.js
var import_jsx_runtime = require_jsx_runtime();
function ToursIndex() {
	const { data: tours } = useSuspenseQuery(publishedToursQuery);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pt-32 pb-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] text-accent uppercase tracking-[0.3em] block mb-4",
					children: "Expeditions"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-5xl md:text-6xl mb-3 text-balance",
					children: "Curated multi-day tours."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground max-w-xl text-lg",
					children: "Pre-designed routes through Northern Pakistan, with transport, hotels, meals, and guides taken care of."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8",
					children: [tours.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/tours/$slug",
						params: { slug: t.slug },
						className: "group",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative aspect-[3/4] overflow-hidden rounded-md bg-muted mb-5",
								children: [t.hero_image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: t.hero_image,
									alt: t.title,
									loading: "lazy",
									className: "size-full object-cover transition-transform duration-700 group-hover:scale-105"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "absolute top-4 left-4 rounded-full bg-background/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest",
									children: [t.duration_days, " Days"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-2xl group-hover:text-accent transition-colors",
								children: t.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground mt-1 line-clamp-2",
								children: t.summary
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex justify-between items-center border-t border-border pt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
									children: "From"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-display text-xl",
									children: ["PKR ", t.price_pkr.toLocaleString()]
								})]
							})
						]
					}, t.slug)), tours.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "No tours published yet."
					})]
				})
			]
		})
	});
}
//#endregion
export { ToursIndex as component };

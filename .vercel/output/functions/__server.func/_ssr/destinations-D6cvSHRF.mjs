import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useSuspenseQuery, o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as destinations, r as imageUrl } from "./data-DvbGLkfa.mjs";
import { n as siteImagesQuery } from "./queries-2TD0Z0kx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/destinations-D6cvSHRF.js
var import_jsx_runtime = require_jsx_runtime();
function DestinationsPage() {
	const { data: images } = useSuspenseQuery(siteImagesQuery);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pt-32 pb-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-6 mb-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] text-accent uppercase tracking-[0.3em] block mb-4",
					children: "Destinations"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-5xl md:text-6xl mb-4 text-balance",
					children: "Territories of the Great North."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground max-w-2xl text-lg",
					children: "From the granite cathedrals of Skardu to the verdant alpine meadows of Kashmir."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl px-6 space-y-24",
			children: destinations.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				id: d.slug,
				className: `grid lg:grid-cols-12 gap-10 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-7 aspect-[4/3] overflow-hidden rounded-md bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: imageUrl(d.imageKey, images),
						alt: d.name,
						loading: "lazy",
						className: "size-full object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-[10px] uppercase tracking-[0.3em] text-accent",
							children: [
								d.region,
								" · ",
								d.elevation
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-4xl md:text-5xl mt-3",
							children: d.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground mt-2 italic",
							children: d.tagline
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-foreground/80 leading-relaxed",
							children: d.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/customize",
							className: "mt-7 inline-flex rounded-full bg-foreground text-background px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-accent transition",
							children: "Plan a trip here"
						})
					]
				})]
			}, d.slug))
		})]
	});
}
//#endregion
export { DestinationsPage as component };

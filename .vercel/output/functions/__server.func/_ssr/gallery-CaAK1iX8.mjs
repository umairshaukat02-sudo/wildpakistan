import { n as useSuspenseQuery, o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as siteImagesQuery } from "./queries-2TD0Z0kx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gallery-CaAK1iX8.js
var import_jsx_runtime = require_jsx_runtime();
function GalleryPage() {
	const { data: images } = useSuspenseQuery(siteImagesQuery);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pt-32 pb-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-6 mb-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[10px] text-accent uppercase tracking-[0.3em] block mb-4",
				children: "Field Reports"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-5xl md:text-6xl text-balance",
				children: "Frames from the trail."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl px-6 columns-1 sm:columns-2 lg:columns-3 gap-4 [&>*]:mb-4",
			children: images.map((img) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "break-inside-avoid overflow-hidden rounded-md group",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: img.url,
					alt: img.alt ?? img.key,
					loading: "lazy",
					className: "w-full h-auto transition-transform duration-700 group-hover:scale-105"
				})
			}, img.key))
		})]
	});
}
//#endregion
export { GalleryPage as component };

import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as CircleCheck } from "../_libs/lucide-react.mjs";
import { t as Route } from "./inquiry-success-Cxk0-JFL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inquiry-success-CJDV76YL.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => {
	const { code } = Route.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pt-40 pb-32 px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-xl text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
					className: "mx-auto text-accent mb-6",
					size: 56
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl md:text-5xl mb-4",
					children: "Your trip is in motion."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground mb-2",
					children: "We've received your inquiry and our team will reach out within 24 hours."
				}),
				code && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-sm mt-4 text-accent",
					children: ["Reference: ", code]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 flex justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "rounded-full border border-border px-6 py-3 text-xs font-bold uppercase tracking-widest",
						children: "Home"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/tours",
						className: "rounded-full bg-accent text-accent-foreground px-6 py-3 text-xs font-bold uppercase tracking-widest",
						children: "Browse expeditions"
					})]
				})
			]
		})
	});
};
//#endregion
export { SplitComponent as component };

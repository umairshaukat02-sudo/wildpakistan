import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { Ct as stringType, St as objectType } from "../_libs/@ai-sdk/gateway+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inquiry-success-Cxk0-JFL.js
var $$splitComponentImporter = () => import("./inquiry-success-CJDV76YL.mjs");
var SearchSchema = objectType({ code: stringType().optional() });
var Route = createFileRoute("/inquiry-success")({
	validateSearch: (s) => SearchSchema.parse(s),
	head: () => ({ meta: [{ title: "Inquiry Received — WILD Pakistan" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };

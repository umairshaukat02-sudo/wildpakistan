import { F as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as tourBySlugQuery } from "./queries-2TD0Z0kx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tours._slug-DpmBI5XY.js
var $$splitComponentImporter = () => import("./tours._slug-BKNqYLw5.mjs");
var $$splitErrorComponentImporter = () => import("./tours._slug-CbxV_-hl.mjs");
var $$splitNotFoundComponentImporter = () => import("./tours._slug-COvfNruv.mjs");
var Route = createFileRoute("/tours/$slug")({
	loader: async ({ params, context }) => {
		const tour = await context.queryClient.ensureQueryData(tourBySlugQuery(params.slug));
		if (!tour) throw notFound();
		return { tour };
	},
	head: ({ loaderData }) => {
		const t = loaderData?.tour;
		if (!t) return { meta: [{ title: "Tour — WILD Pakistan" }] };
		return { meta: [
			{ title: `${t.title} — WILD Pakistan` },
			{
				name: "description",
				content: t.summary ?? ""
			},
			{
				property: "og:title",
				content: `${t.title} — WILD Pakistan`
			},
			{
				property: "og:description",
				content: t.summary ?? ""
			},
			...t.hero_image ? [{
				property: "og:image",
				content: t.hero_image
			}] : []
		] };
	},
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };

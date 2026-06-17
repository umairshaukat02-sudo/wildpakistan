import { t as queryOptions } from "../_libs/react+tanstack__react-query.mjs";
import { a as listPublishedTours, i as listContactMessages, n as getTourBySlug, o as listSiteImages, r as listAllTours } from "./cms.functions-DmxgqS96.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/queries-2TD0Z0kx.js
var siteImagesQuery = queryOptions({
	queryKey: ["site-images"],
	queryFn: () => listSiteImages(),
	staleTime: 6e4
});
var publishedToursQuery = queryOptions({
	queryKey: ["published-tours"],
	queryFn: () => listPublishedTours(),
	staleTime: 6e4
});
var tourBySlugQuery = (slug) => queryOptions({
	queryKey: ["tour", slug],
	queryFn: () => getTourBySlug({ data: { slug } }),
	staleTime: 6e4
});
queryOptions({
	queryKey: ["admin-contact-messages"],
	queryFn: () => listContactMessages()
});
queryOptions({
	queryKey: ["admin-all-tours"],
	queryFn: () => listAllTours()
});
//#endregion
export { siteImagesQuery as n, tourBySlugQuery as r, publishedToursQuery as t };

import { l as createServerFn } from "./esm-9EjmF9OT.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-Dpn8S0gM.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B40XrkQd.mjs";
import { Ct as stringType, St as objectType, bt as enumType, vt as arrayType, xt as numberType, yt as booleanType } from "../_libs/@ai-sdk/gateway+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cms.functions-DmxgqS96.js
var listSiteImages = createServerFn({ method: "GET" }).handler(createSsrRpc("90c8fa5a2526b19ab82da96671202eb5fa2ecbe5eb3accf592a6202537b8691e"));
var listPublishedTours = createServerFn({ method: "GET" }).handler(createSsrRpc("69042db2af1a4b21fc7321573f6a77035e45e4599fde18487e279762e84804f7"));
var getTourBySlug = createServerFn({ method: "GET" }).inputValidator((d) => objectType({ slug: stringType().min(1).max(120) }).parse(d)).handler(createSsrRpc("9806908c8b3342b3c11f965b8b729795c41e1351a60afa9f684eb9eb40931af5"));
var ContactInput = objectType({
	name: stringType().trim().min(1).max(150),
	email: stringType().trim().email().max(255),
	subject: stringType().trim().max(200).optional().nullable(),
	message: stringType().trim().min(1).max(4e3)
});
var submitContact = createServerFn({ method: "POST" }).inputValidator((d) => ContactInput.parse(d)).handler(createSsrRpc("02fe2454a177b4f90e8741b3fae6cb9f6b3229c77099bf9523d88340486adee0"));
var listContactMessages = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("d09efda71a186327444e402a21ff7cc949ed2478ad3407071e2d594e2c23cc58"));
var listAllTours = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("04c7161edc1c5fa6e3d71be377204cc2047b907240a881d59c7688dd61b71736"));
var ContactStatusUpdate = objectType({
	id: stringType().uuid(),
	status: enumType([
		"new",
		"read",
		"archived"
	])
});
var updateContactStatus = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => ContactStatusUpdate.parse(d)).handler(createSsrRpc("20b0f7598f22549b033757cbdc5f2e51598bee44904b1c212f9834923772e062"));
var TourUpsert = objectType({
	id: stringType().uuid().optional(),
	slug: stringType().min(1).max(120).regex(/^[a-z0-9-]+$/),
	title: stringType().min(1).max(200),
	destination: stringType().min(1).max(100),
	duration_days: numberType().int().min(1).max(60),
	price_pkr: numberType().int().min(0).max(1e7),
	summary: stringType().max(500).nullable().optional(),
	description: stringType().max(5e3).nullable().optional(),
	hero_image: stringType().max(500).nullable().optional(),
	itinerary: arrayType(objectType({
		day: numberType(),
		title: stringType(),
		details: stringType()
	})).max(60).default([]),
	inclusions: arrayType(stringType().max(200)).max(40).default([]),
	exclusions: arrayType(stringType().max(200)).max(40).default([]),
	featured: booleanType().default(false),
	published: booleanType().default(true),
	sort_order: numberType().int().min(0).max(1e3).default(0)
});
var upsertTour = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => TourUpsert.parse(d)).handler(createSsrRpc("a8b8e3aa1d614eb9ae57ee7eea94d5b8b9b8df361adda962552ce9079fb9cf2d"));
var deleteTour = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().uuid() }).parse(d)).handler(createSsrRpc("525cf506e1928b84ca1ed788081c03ad00d3ed9b67bc1461a232a28b59e6f3f9"));
var ImageUpsert = objectType({
	key: stringType().min(1).max(80).regex(/^[a-z0-9-]+$/),
	url: stringType().min(1).max(1e3),
	alt: stringType().max(300).nullable().optional(),
	caption: stringType().max(500).nullable().optional()
});
var upsertSiteImage = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => ImageUpsert.parse(d)).handler(createSsrRpc("0effe99b1805ac27b7c18aa96e601575b46642c693374d93b8b8aaec7a5297af"));
//#endregion
export { listPublishedTours as a, updateContactStatus as c, listContactMessages as i, upsertSiteImage as l, getTourBySlug as n, listSiteImages as o, listAllTours as r, submitContact as s, deleteTour as t, upsertTour as u };

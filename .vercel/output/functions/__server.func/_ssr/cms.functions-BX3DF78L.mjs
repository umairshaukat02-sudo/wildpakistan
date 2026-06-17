import { l as createServerFn } from "./esm-9EjmF9OT.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-Dpn8S0gM.mjs";
import { Ct as stringType, St as objectType, bt as enumType, vt as arrayType, xt as numberType, yt as booleanType } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { t as createServerRpc } from "./createServerRpc-TAUNrjZd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cms.functions-BX3DF78L.js
var listSiteImages_createServerFn_handler = createServerRpc({
	id: "90c8fa5a2526b19ab82da96671202eb5fa2ecbe5eb3accf592a6202537b8691e",
	name: "listSiteImages",
	filename: "src/lib/api/cms.functions.ts"
}, (opts) => listSiteImages.__executeServer(opts));
var listSiteImages = createServerFn({ method: "GET" }).handler(listSiteImages_createServerFn_handler, async () => {
	const { supabaseAdmin } = await import("./client.server-D1oHePJa.mjs");
	const { data, error } = await supabaseAdmin.from("site_images").select("key,url,alt,caption").order("key");
	if (error) throw new Error(error.message);
	return data ?? [];
});
var listPublishedTours_createServerFn_handler = createServerRpc({
	id: "69042db2af1a4b21fc7321573f6a77035e45e4599fde18487e279762e84804f7",
	name: "listPublishedTours",
	filename: "src/lib/api/cms.functions.ts"
}, (opts) => listPublishedTours.__executeServer(opts));
var listPublishedTours = createServerFn({ method: "GET" }).handler(listPublishedTours_createServerFn_handler, async () => {
	const { supabaseAdmin } = await import("./client.server-D1oHePJa.mjs");
	const { data, error } = await supabaseAdmin.from("tour_packages").select("*").eq("published", true).order("sort_order", { ascending: true });
	if (error) throw new Error(error.message);
	return data ?? [];
});
var getTourBySlug_createServerFn_handler = createServerRpc({
	id: "9806908c8b3342b3c11f965b8b729795c41e1351a60afa9f684eb9eb40931af5",
	name: "getTourBySlug",
	filename: "src/lib/api/cms.functions.ts"
}, (opts) => getTourBySlug.__executeServer(opts));
var getTourBySlug = createServerFn({ method: "GET" }).inputValidator((d) => objectType({ slug: stringType().min(1).max(120) }).parse(d)).handler(getTourBySlug_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin } = await import("./client.server-D1oHePJa.mjs");
	const { data: row, error } = await supabaseAdmin.from("tour_packages").select("*").eq("slug", data.slug).eq("published", true).maybeSingle();
	if (error) throw new Error(error.message);
	return row;
});
var ContactInput = objectType({
	name: stringType().trim().min(1).max(150),
	email: stringType().trim().email().max(255),
	subject: stringType().trim().max(200).optional().nullable(),
	message: stringType().trim().min(1).max(4e3)
});
var submitContact_createServerFn_handler = createServerRpc({
	id: "02fe2454a177b4f90e8741b3fae6cb9f6b3229c77099bf9523d88340486adee0",
	name: "submitContact",
	filename: "src/lib/api/cms.functions.ts"
}, (opts) => submitContact.__executeServer(opts));
var submitContact = createServerFn({ method: "POST" }).inputValidator((d) => ContactInput.parse(d)).handler(submitContact_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin } = await import("./client.server-D1oHePJa.mjs");
	const { data: row, error } = await supabaseAdmin.from("contact_messages").insert({
		name: data.name,
		email: data.email,
		subject: data.subject ?? null,
		message: data.message
	}).select("id").single();
	if (error) throw new Error(error.message);
	return {
		ok: true,
		id: row.id
	};
});
async function requireAdminClient(context) {
	const { supabaseAdmin } = await import("./client.server-D1oHePJa.mjs");
	const { data, error } = await supabaseAdmin.from("user_roles").select("id").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
	if (error) {
		console.error("Admin role check failed", error);
		throw new Error("Unable to verify admin access.");
	}
	if (!data) throw new Error("Forbidden");
	return supabaseAdmin;
}
var listContactMessages_createServerFn_handler = createServerRpc({
	id: "d09efda71a186327444e402a21ff7cc949ed2478ad3407071e2d594e2c23cc58",
	name: "listContactMessages",
	filename: "src/lib/api/cms.functions.ts"
}, (opts) => listContactMessages.__executeServer(opts));
var listContactMessages = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listContactMessages_createServerFn_handler, async ({ context }) => {
	const { data, error } = await (await requireAdminClient(context)).from("contact_messages").select("*").order("created_at", { ascending: false });
	if (error) throw new Error(error.message);
	return data ?? [];
});
var listAllTours_createServerFn_handler = createServerRpc({
	id: "04c7161edc1c5fa6e3d71be377204cc2047b907240a881d59c7688dd61b71736",
	name: "listAllTours",
	filename: "src/lib/api/cms.functions.ts"
}, (opts) => listAllTours.__executeServer(opts));
var listAllTours = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listAllTours_createServerFn_handler, async ({ context }) => {
	const { data, error } = await (await requireAdminClient(context)).from("tour_packages").select("*").order("sort_order", { ascending: true });
	if (error) throw new Error(error.message);
	return data ?? [];
});
var ContactStatusUpdate = objectType({
	id: stringType().uuid(),
	status: enumType([
		"new",
		"read",
		"archived"
	])
});
var updateContactStatus_createServerFn_handler = createServerRpc({
	id: "20b0f7598f22549b033757cbdc5f2e51598bee44904b1c212f9834923772e062",
	name: "updateContactStatus",
	filename: "src/lib/api/cms.functions.ts"
}, (opts) => updateContactStatus.__executeServer(opts));
var updateContactStatus = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => ContactStatusUpdate.parse(d)).handler(updateContactStatus_createServerFn_handler, async ({ data, context }) => {
	const { error } = await (await requireAdminClient(context)).from("contact_messages").update({ status: data.status }).eq("id", data.id);
	if (error) throw new Error("Unable to update message status.");
	return { ok: true };
});
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
var upsertTour_createServerFn_handler = createServerRpc({
	id: "a8b8e3aa1d614eb9ae57ee7eea94d5b8b9b8df361adda962552ce9079fb9cf2d",
	name: "upsertTour",
	filename: "src/lib/api/cms.functions.ts"
}, (opts) => upsertTour.__executeServer(opts));
var upsertTour = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => TourUpsert.parse(d)).handler(upsertTour_createServerFn_handler, async ({ data, context }) => {
	const { error } = await (await requireAdminClient(context)).from("tour_packages").upsert(data, { onConflict: "slug" });
	if (error) throw new Error(error.message);
	return { ok: true };
});
var deleteTour_createServerFn_handler = createServerRpc({
	id: "525cf506e1928b84ca1ed788081c03ad00d3ed9b67bc1461a232a28b59e6f3f9",
	name: "deleteTour",
	filename: "src/lib/api/cms.functions.ts"
}, (opts) => deleteTour.__executeServer(opts));
var deleteTour = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().uuid() }).parse(d)).handler(deleteTour_createServerFn_handler, async ({ data, context }) => {
	const { error } = await (await requireAdminClient(context)).from("tour_packages").delete().eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var ImageUpsert = objectType({
	key: stringType().min(1).max(80).regex(/^[a-z0-9-]+$/),
	url: stringType().min(1).max(1e3),
	alt: stringType().max(300).nullable().optional(),
	caption: stringType().max(500).nullable().optional()
});
var upsertSiteImage_createServerFn_handler = createServerRpc({
	id: "0effe99b1805ac27b7c18aa96e601575b46642c693374d93b8b8aaec7a5297af",
	name: "upsertSiteImage",
	filename: "src/lib/api/cms.functions.ts"
}, (opts) => upsertSiteImage.__executeServer(opts));
var upsertSiteImage = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => ImageUpsert.parse(d)).handler(upsertSiteImage_createServerFn_handler, async ({ data, context }) => {
	const { error } = await (await requireAdminClient(context)).from("site_images").upsert(data, { onConflict: "key" });
	if (error) throw new Error(error.message);
	return { ok: true };
});
//#endregion
export { deleteTour_createServerFn_handler, getTourBySlug_createServerFn_handler, listAllTours_createServerFn_handler, listContactMessages_createServerFn_handler, listPublishedTours_createServerFn_handler, listSiteImages_createServerFn_handler, submitContact_createServerFn_handler, updateContactStatus_createServerFn_handler, upsertSiteImage_createServerFn_handler, upsertTour_createServerFn_handler };

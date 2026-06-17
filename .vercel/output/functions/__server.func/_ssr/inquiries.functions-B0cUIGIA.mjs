import { l as createServerFn } from "./esm-9EjmF9OT.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-Dpn8S0gM.mjs";
import { Ct as stringType, St as objectType, bt as enumType, vt as arrayType, xt as numberType } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { t as createServerRpc } from "./createServerRpc-TAUNrjZd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inquiries.functions-B0cUIGIA.js
var TRANSPORTS = [
	{
		name: "Economy Transport",
		price: 0
	},
	{
		name: "Hiace",
		price: 1500
	},
	{
		name: "Coaster",
		price: 2e3
	},
	{
		name: "Luxury Transport",
		price: 3500
	},
	{
		name: "SUV",
		price: 5e3
	},
	{
		name: "Private Car",
		price: 6e3
	}
];
var HOTEL_TIERS = [
	{
		name: "Standard",
		price: 1500
	},
	{
		name: "2 Star",
		price: 2500
	},
	{
		name: "3 Star",
		price: 4e3
	},
	{
		name: "4 Star",
		price: 7e3
	},
	{
		name: "Luxury",
		price: 12e3
	}
];
var MEALS = [
	{
		name: "No Meals",
		price: 0
	},
	{
		name: "Breakfast Only",
		price: 800
	},
	{
		name: "Breakfast + Dinner",
		price: 1800
	},
	{
		name: "Full Board",
		price: 2800
	}
];
var ACTIVITIES = [
	{
		name: "Hiking",
		price: 1500
	},
	{
		name: "Camping",
		price: 2e3
	},
	{
		name: "Bonfire",
		price: 800
	},
	{
		name: "Photography Tour",
		price: 2500
	},
	{
		name: "Jeep Safari",
		price: 4500
	},
	{
		name: "Trekking",
		price: 3e3
	},
	{
		name: "Boating",
		price: 1500
	},
	{
		name: "Sightseeing",
		price: 1e3
	}
];
function computePricing(f) {
	const adults = Math.max(1, f.adults || 1);
	const children = Math.max(0, f.children || 0);
	const people = adults + .5 * children;
	const headcount = Math.max(1, adults + children);
	const days = Math.max(1, f.duration_days || 1);
	const base = 8e3 * days * people;
	const accommodation = (HOTEL_TIERS.find((h) => h.name === f.hotel_category)?.price ?? 0) * days * headcount;
	const transport = (TRANSPORTS.find((t) => t.name === f.transport)?.price ?? 0) * days * people;
	const acts = (f.activities ?? []).reduce((s, a) => s + (ACTIVITIES.find((x) => x.name === a)?.price ?? 0), 0) * headcount;
	const meals = (MEALS.find((m) => m.name === f.meals)?.price ?? 0) * days * headcount;
	const subtotal = base + accommodation + transport + acts + meals;
	const service = subtotal * .05;
	const taxes = subtotal * .08;
	const grand = subtotal + service + taxes;
	return {
		base_cost: Math.round(base),
		accommodation_cost: Math.round(accommodation),
		transport_cost: Math.round(transport),
		activities_cost: Math.round(acts + meals),
		service_charges: Math.round(service),
		taxes: Math.round(taxes),
		grand_total: Math.round(grand)
	};
}
var InquiryInput = objectType({
	customer_name: stringType().trim().min(1).max(200),
	customer_email: stringType().trim().email().max(255),
	customer_phone: stringType().trim().max(50).optional().nullable(),
	destination: stringType().min(1).max(100),
	duration_days: numberType().int().min(1).max(60),
	departure_date: stringType().optional().nullable(),
	return_date: stringType().optional().nullable(),
	pickup_location: stringType().max(100).optional().nullable(),
	transport: stringType().max(60).optional().nullable(),
	room_type: stringType().max(60).optional().nullable(),
	hotel_category: stringType().max(60).optional().nullable(),
	meals: stringType().max(60).optional().nullable(),
	activities: arrayType(stringType().max(60)).max(20).default([]),
	adults: numberType().int().min(1).max(50),
	children: numberType().int().min(0).max(50),
	additional_requirements: stringType().max(2e3).optional().nullable()
});
async function requireAdminClient(userId) {
	const { supabaseAdmin } = await import("./client.server-D1oHePJa.mjs");
	const { data, error } = await supabaseAdmin.from("user_roles").select("id").eq("user_id", userId).eq("role", "admin").maybeSingle();
	if (error) {
		console.error("Admin role check failed", error);
		throw new Error("Unable to verify admin access.");
	}
	if (!data) throw new Error("Forbidden");
	return supabaseAdmin;
}
var submitInquiry_createServerFn_handler = createServerRpc({
	id: "ddba39e709c8ba2549becfe54be50cbd672dd1cfc4f1f6175196a199dfe661bd",
	name: "submitInquiry",
	filename: "src/lib/api/inquiries.functions.ts"
}, (opts) => submitInquiry.__executeServer(opts));
var submitInquiry = createServerFn({ method: "POST" }).inputValidator((data) => InquiryInput.parse(data)).handler(submitInquiry_createServerFn_handler, async ({ data }) => {
	const priced = computePricing({
		duration_days: data.duration_days,
		adults: data.adults,
		children: data.children,
		transport: data.transport,
		hotel_category: data.hotel_category,
		meals: data.meals,
		activities: data.activities
	});
	const { supabaseAdmin } = await import("./client.server-D1oHePJa.mjs");
	const { data: row, error } = await supabaseAdmin.from("inquiries").insert({
		...data,
		...priced,
		status: "pending",
		admin_notes: null
	}).select("id, inquiry_code, grand_total").single();
	if (error) throw new Error(error.message);
	return row;
});
var listMyInquiries_createServerFn_handler = createServerRpc({
	id: "fe68f00827423aab2461a3f5fcc2f6d2e60ac79a1e37f091d8d404828e4dda9c",
	name: "listMyInquiries",
	filename: "src/lib/api/inquiries.functions.ts"
}, (opts) => listMyInquiries.__executeServer(opts));
var listMyInquiries = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listMyInquiries_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.from("inquiries").select("*").order("created_at", { ascending: false });
	if (error) throw new Error(error.message);
	return data;
});
var listAllInquiries_createServerFn_handler = createServerRpc({
	id: "85f06384f3508cd85f6ffb985d85b22ff0be4ab3116cf2edab6e0f70c4170b89",
	name: "listAllInquiries",
	filename: "src/lib/api/inquiries.functions.ts"
}, (opts) => listAllInquiries.__executeServer(opts));
var listAllInquiries = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listAllInquiries_createServerFn_handler, async ({ context }) => {
	const { data, error } = await (await requireAdminClient(context.userId)).from("inquiries").select("*").order("created_at", { ascending: false });
	if (error) throw new Error(error.message);
	return data;
});
var StatusUpdate = objectType({
	id: stringType().uuid(),
	status: enumType([
		"pending",
		"approved",
		"rejected",
		"in_review"
	]),
	admin_notes: stringType().max(2e3).optional().nullable()
});
var updateInquiryStatus_createServerFn_handler = createServerRpc({
	id: "1a0c026b7fd569b1bf76916681d1f902f75b0568f1a2f16af24d64d70895da03",
	name: "updateInquiryStatus",
	filename: "src/lib/api/inquiries.functions.ts"
}, (opts) => updateInquiryStatus.__executeServer(opts));
var updateInquiryStatus = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => StatusUpdate.parse(data)).handler(updateInquiryStatus_createServerFn_handler, async ({ data, context }) => {
	const { error } = await (await requireAdminClient(context.userId)).from("inquiries").update({
		status: data.status,
		admin_notes: data.admin_notes,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var checkIsAdmin_createServerFn_handler = createServerRpc({
	id: "8caa9a08410da45f97730310270c949a2f2c29f04196574c77b4f81c3f754762",
	name: "checkIsAdmin",
	filename: "src/lib/api/inquiries.functions.ts"
}, (opts) => checkIsAdmin.__executeServer(opts));
var checkIsAdmin = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(checkIsAdmin_createServerFn_handler, async ({ context }) => {
	try {
		await requireAdminClient(context.userId);
		return { isAdmin: true };
	} catch (error) {
		if (error instanceof Error && error.message === "Forbidden") return { isAdmin: false };
		throw error;
	}
});
//#endregion
export { checkIsAdmin_createServerFn_handler, listAllInquiries_createServerFn_handler, listMyInquiries_createServerFn_handler, submitInquiry_createServerFn_handler, updateInquiryStatus_createServerFn_handler };

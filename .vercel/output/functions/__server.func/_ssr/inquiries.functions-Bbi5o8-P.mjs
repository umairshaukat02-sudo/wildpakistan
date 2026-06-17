import { l as createServerFn } from "./esm-9EjmF9OT.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-Dpn8S0gM.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B40XrkQd.mjs";
import { Ct as stringType, St as objectType, bt as enumType, vt as arrayType, xt as numberType } from "../_libs/@ai-sdk/gateway+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inquiries.functions-Bbi5o8-P.js
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
var submitInquiry = createServerFn({ method: "POST" }).inputValidator((data) => InquiryInput.parse(data)).handler(createSsrRpc("ddba39e709c8ba2549becfe54be50cbd672dd1cfc4f1f6175196a199dfe661bd"));
var listMyInquiries = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("fe68f00827423aab2461a3f5fcc2f6d2e60ac79a1e37f091d8d404828e4dda9c"));
var listAllInquiries = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("85f06384f3508cd85f6ffb985d85b22ff0be4ab3116cf2edab6e0f70c4170b89"));
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
var updateInquiryStatus = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => StatusUpdate.parse(data)).handler(createSsrRpc("1a0c026b7fd569b1bf76916681d1f902f75b0568f1a2f16af24d64d70895da03"));
var checkIsAdmin = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("8caa9a08410da45f97730310270c949a2f2c29f04196574c77b4f81c3f754762"));
//#endregion
export { updateInquiryStatus as a, submitInquiry as i, listAllInquiries as n, listMyInquiries as r, checkIsAdmin as t };

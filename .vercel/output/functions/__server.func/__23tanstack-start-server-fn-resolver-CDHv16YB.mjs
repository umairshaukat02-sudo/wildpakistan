//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-CDHv16YB.js
var manifest = {
	"02fe2454a177b4f90e8741b3fae6cb9f6b3229c77099bf9523d88340486adee0": {
		functionName: "submitContact_createServerFn_handler",
		importer: () => import("./_ssr/cms.functions-BX3DF78L.mjs")
	},
	"04c7161edc1c5fa6e3d71be377204cc2047b907240a881d59c7688dd61b71736": {
		functionName: "listAllTours_createServerFn_handler",
		importer: () => import("./_ssr/cms.functions-BX3DF78L.mjs")
	},
	"0effe99b1805ac27b7c18aa96e601575b46642c693374d93b8b8aaec7a5297af": {
		functionName: "upsertSiteImage_createServerFn_handler",
		importer: () => import("./_ssr/cms.functions-BX3DF78L.mjs")
	},
	"1a0c026b7fd569b1bf76916681d1f902f75b0568f1a2f16af24d64d70895da03": {
		functionName: "updateInquiryStatus_createServerFn_handler",
		importer: () => import("./_ssr/inquiries.functions-B0cUIGIA.mjs")
	},
	"20b0f7598f22549b033757cbdc5f2e51598bee44904b1c212f9834923772e062": {
		functionName: "updateContactStatus_createServerFn_handler",
		importer: () => import("./_ssr/cms.functions-BX3DF78L.mjs")
	},
	"525cf506e1928b84ca1ed788081c03ad00d3ed9b67bc1461a232a28b59e6f3f9": {
		functionName: "deleteTour_createServerFn_handler",
		importer: () => import("./_ssr/cms.functions-BX3DF78L.mjs")
	},
	"69042db2af1a4b21fc7321573f6a77035e45e4599fde18487e279762e84804f7": {
		functionName: "listPublishedTours_createServerFn_handler",
		importer: () => import("./_ssr/cms.functions-BX3DF78L.mjs")
	},
	"85f06384f3508cd85f6ffb985d85b22ff0be4ab3116cf2edab6e0f70c4170b89": {
		functionName: "listAllInquiries_createServerFn_handler",
		importer: () => import("./_ssr/inquiries.functions-B0cUIGIA.mjs")
	},
	"8caa9a08410da45f97730310270c949a2f2c29f04196574c77b4f81c3f754762": {
		functionName: "checkIsAdmin_createServerFn_handler",
		importer: () => import("./_ssr/inquiries.functions-B0cUIGIA.mjs")
	},
	"90c8fa5a2526b19ab82da96671202eb5fa2ecbe5eb3accf592a6202537b8691e": {
		functionName: "listSiteImages_createServerFn_handler",
		importer: () => import("./_ssr/cms.functions-BX3DF78L.mjs")
	},
	"9806908c8b3342b3c11f965b8b729795c41e1351a60afa9f684eb9eb40931af5": {
		functionName: "getTourBySlug_createServerFn_handler",
		importer: () => import("./_ssr/cms.functions-BX3DF78L.mjs")
	},
	"a8b8e3aa1d614eb9ae57ee7eea94d5b8b9b8df361adda962552ce9079fb9cf2d": {
		functionName: "upsertTour_createServerFn_handler",
		importer: () => import("./_ssr/cms.functions-BX3DF78L.mjs")
	},
	"d09efda71a186327444e402a21ff7cc949ed2478ad3407071e2d594e2c23cc58": {
		functionName: "listContactMessages_createServerFn_handler",
		importer: () => import("./_ssr/cms.functions-BX3DF78L.mjs")
	},
	"ddba39e709c8ba2549becfe54be50cbd672dd1cfc4f1f6175196a199dfe661bd": {
		functionName: "submitInquiry_createServerFn_handler",
		importer: () => import("./_ssr/inquiries.functions-B0cUIGIA.mjs")
	},
	"fe68f00827423aab2461a3f5fcc2f6d2e60ac79a1e37f091d8d404828e4dda9c": {
		functionName: "listMyInquiries_createServerFn_handler",
		importer: () => import("./_ssr/inquiries.functions-B0cUIGIA.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };

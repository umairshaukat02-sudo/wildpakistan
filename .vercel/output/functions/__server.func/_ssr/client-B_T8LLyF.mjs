import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-B_T8LLyF.js
function createSupabaseClient() {
	return createClient("https://tfpjvhuyggrfxtzniurk.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmcGp2aHV5Z2dyZnh0em5pdXJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDYwMTksImV4cCI6MjA5NjkyMjAxOX0.Hq8QaxhbJuDO0hLglpXj9p1_FD4T2jIUE73TRVqJyeQ", { auth: {
		storage: typeof window !== "undefined" ? localStorage : void 0,
		persistSession: true,
		autoRefreshToken: true
	} });
}
var _supabase;
var supabase = new Proxy({}, { get(_, prop, receiver) {
	if (!_supabase) _supabase = createSupabaseClient();
	return Reflect.get(_supabase, prop, receiver);
} });
//#endregion
export { supabase as t };

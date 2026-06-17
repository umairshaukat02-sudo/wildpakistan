import { o as __toESM } from "../_runtime.mjs";
import { a as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as supabase } from "./client-B_T8LLyF.mjs";
import { d as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as createLovableAuth } from "../_libs/lovable.dev__cloud-auth-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-BFtGZviq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var lovableAuth = createLovableAuth();
var lovable = { auth: { signInWithOAuth: async (provider, opts) => {
	const result = await lovableAuth.signInWithOAuth(provider, {
		redirect_uri: opts?.redirect_uri,
		extraParams: { ...opts?.extraParams }
	});
	if (result.redirected) return result;
	if (result.error) return result;
	try {
		await supabase.auth.setSession(result.tokens);
	} catch (e) {
		return { error: e instanceof Error ? e : new Error(String(e)) };
	}
	return result;
} } };
function AuthPage() {
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const onSubmit = async (e) => {
		e.preventDefault();
		setBusy(true);
		try {
			if (mode === "signup") {
				const { error } = await supabase.auth.signUp({
					email,
					password,
					options: {
						data: { full_name: name },
						emailRedirectTo: `${window.location.origin}/dashboard`
					}
				});
				if (error) throw error;
				toast.success("Account created. Check your inbox to confirm.");
			} else {
				const { error } = await supabase.auth.signInWithPassword({
					email,
					password
				});
				if (error) throw error;
				toast.success("Welcome back.");
				navigate({ to: "/dashboard" });
			}
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Failed");
		} finally {
			setBusy(false);
		}
	};
	const google = async () => {
		setBusy(true);
		try {
			const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/dashboard" });
			if (result.error) throw new Error(String(result.error));
			if (result.redirected) return;
			navigate({ to: "/dashboard" });
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Google sign-in failed");
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center px-6 py-32 bg-muted/30",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md bg-background border border-border rounded-md p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl mb-1",
					children: mode === "signin" ? "Welcome back." : "Join WILD."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mb-6",
					children: mode === "signin" ? "Sign in to access your trips." : "Create an account to save trips and inquiries."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: google,
					disabled: busy,
					className: "w-full rounded-full border border-border py-3 text-sm font-semibold hover:bg-muted",
					children: "Continue with Google"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 my-5 text-[10px] uppercase tracking-widest text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1 h-px bg-border" }),
						" or ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1 h-px bg-border" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "space-y-3",
					children: [
						mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: name,
							onChange: (e) => setName(e.target.value),
							placeholder: "Full name",
							className: "w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							required: true,
							value: email,
							onChange: (e) => setEmail(e.target.value),
							placeholder: "Email",
							className: "w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							required: true,
							minLength: 6,
							value: password,
							onChange: (e) => setPassword(e.target.value),
							placeholder: "Password",
							className: "w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							disabled: busy,
							className: "w-full inline-flex justify-center items-center gap-2 rounded-full bg-foreground text-background py-3 text-xs font-bold uppercase tracking-widest disabled:opacity-50",
							children: [
								busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									className: "animate-spin",
									size: 14
								}),
								" ",
								mode === "signin" ? "Sign In" : "Create Account"
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setMode(mode === "signin" ? "signup" : "signin"),
					className: "mt-5 w-full text-xs uppercase tracking-widest text-muted-foreground hover:text-accent",
					children: mode === "signin" ? "New here? Create an account" : "Have an account? Sign in"
				})
			]
		})
	});
}
//#endregion
export { AuthPage as component };

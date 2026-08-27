import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { F as LoaderCircle, M as Mail, P as Lock, X as EyeOff, Y as Eye, i as User, nt as CircleAlert } from "../_libs/lucide-react.mjs";
import { c as useLocale, f as loginWithEmail, g as resetPassword, h as registerWithEmail, l as useAuth, m as loginWithGoogle, o as Route$10, p as loginWithFacebook } from "./router-JcPmpmb6.mjs";
import { t as logo_default } from "./logo-5e2hnhS0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-SmTMVSXP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var logo_1_default = "/assets/logo-1-Blx0kSQD.svg";
function LoginPage() {
	const navigate = useNavigate();
	const { redirect } = Route$10.useSearch();
	const { user } = useAuth();
	const { t } = useLocale();
	const [mode, setMode] = (0, import_react.useState)("login");
	(0, import_react.useEffect)(() => {
		if (user && user.role !== "GUEST") navigate({
			to: redirect || "/home",
			replace: true
		});
	}, [
		user,
		navigate,
		redirect
	]);
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPass, setShowPass] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [successMsg, setSuccessMsg] = (0, import_react.useState)("");
	const clearState = () => {
		setError("");
		setSuccessMsg("");
	};
	function friendlyError(code) {
		return {
			"auth/email-already-in-use": "This email is already registered. Please log in.",
			"auth/invalid-email": "Please enter a valid email.",
			"auth/weak-password": "Password must be at least 6 characters.",
			"auth/user-not-found": "No account was found with this email.",
			"auth/wrong-password": "The password is incorrect.",
			"auth/invalid-credential": "The email or password is incorrect.",
			"auth/too-many-requests": "Too many attempts. Please wait a few minutes.",
			"auth/popup-closed-by-user": "The sign-in window was closed.",
			"auth/unauthorized-domain": "This local address is not authorised in Firebase yet. Add 127.0.0.1 or localhost under Firebase Authentication > Settings > Authorised domains.",
			"auth/network-request-failed": "The app could not reach Firebase. Check your internet connection and try again.",
			"auth/operation-not-allowed": "This sign-in method is disabled in Firebase. Enable Email/Password or Google in Authentication > Sign-in method.",
			"auth/configuration-not-found": "Firebase Authentication is not configured for this project yet.",
			"auth/invalid-api-key": "Firebase is rejecting this app configuration. Update the Web API key in the local .env file, then restart the app.",
			"auth/account-exists-with-different-credential": "This email already uses a different sign-in method. Try the provider you used originally.",
			"auth/credential-already-in-use": "This social account is already linked to another SalaKhmer account."
		}[code] ?? "Something went wrong. Please try again.";
	}
	async function handleSubmit(e) {
		e.preventDefault();
		clearState();
		setLoading(true);
		try {
			const cleanedEmail = email.trim();
			if (mode === "reset") {
				await resetPassword(cleanedEmail);
				setSuccessMsg("📧 Password reset email sent. Check your inbox.");
				setLoading(false);
				return;
			}
			const guestData = user.role === "GUEST" ? {
				xp: user.xp,
				level: user.level,
				currentStreak: user.currentStreak,
				categoryProgress: user.categoryProgress,
				completedLessons: user.completedLessons
			} : void 0;
			if (mode === "register") await registerWithEmail(cleanedEmail, password, name.trim() || "Learner", guestData);
			else await loginWithEmail(cleanedEmail, password, guestData);
			navigate({
				to: redirect || "/home",
				replace: true
			});
		} catch (err) {
			console.error("🔴 Auth handleSubmit error:", err);
			const code = err?.code ?? "";
			setError(friendlyError(code) || String(err));
		} finally {
			setLoading(false);
		}
	}
	async function handleSocial(provider) {
		clearState();
		setLoading(true);
		try {
			const guestData = user.role === "GUEST" ? {
				xp: user.xp,
				level: user.level,
				currentStreak: user.currentStreak,
				categoryProgress: user.categoryProgress,
				completedLessons: user.completedLessons
			} : void 0;
			if (provider === "google") await loginWithGoogle(guestData);
			if (provider === "facebook") await loginWithFacebook(guestData);
		} catch (err) {
			console.error(`🔴 Auth ${provider} error:`, err);
			const code = err?.code ?? "";
			setError(friendlyError(code) || String(err));
			setLoading(false);
		}
		setLoading(false);
	}
	function handleGuest() {
		navigate({
			to: redirect || "/home",
			replace: true
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: user.role === "GUEST" ? logo_1_default : logo_default,
						alt: "SalaKhmer Logo",
						loading: "lazy",
						className: "h-20 w-20 mx-auto rounded-3xl bg-background object-cover border border-border/50 shadow-lg mb-4"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-4xl tracking-tighter mb-2 whitespace-nowrap",
						style: { fontFamily: "'Playfair Display', serif" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								color: "#D4AF37",
								fontStyle: "italic",
								fontWeight: 600
							},
							children: "Sala"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground",
							style: { fontWeight: 500 },
							children: "Khmer"
						})]
					})]
				}),
				mode !== "reset" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-6 flex rounded-2xl bg-secondary p-1",
					children: ["login", "register"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							setMode(m);
							clearState();
						},
						className: `flex-1 rounded-xl py-2 text-sm font-bold transition-all ${mode === m ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
						children: m === "login" ? t("login") : t("register")
					}, m))
				}),
				mode !== "reset" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						id: "btn-google-login",
						onClick: () => void handleSocial("google"),
						disabled: loading,
						className: "card-flat flex w-full items-center justify-center gap-3 py-3 text-sm font-bold transition-opacity hover:opacity-80 active:scale-[0.98] disabled:opacity-50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							className: "h-5 w-5",
							viewBox: "0 0 48 48",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									fill: "#EA4335",
									d: "M24 9.5c3.1 0 5.8 1.1 8 2.9l6-6C34.3 3 29.4 1 24 1 14.7 1 6.8 6.8 3.5 15l7 5.4C12.2 14 17.6 9.5 24 9.5z"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									fill: "#4285F4",
									d: "M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.4 5.7c4.3-4 6.8-9.9 6.8-16.9z"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									fill: "#FBBC05",
									d: "M10.5 28.6A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.7-4.6L3.2 14C1.2 17.5 0 21.6 0 26c0 4.3 1.1 8.4 3.1 11.9l7.4-5.7-.7-.4z",
									transform: "translate(.5 -2)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									fill: "#34A853",
									d: "M24 47c5.4 0 9.9-1.8 13.2-4.8l-7.4-5.7c-1.8 1.2-4 1.9-5.8 1.9-5.4 0-9.9-3.6-11.5-8.5l-7.4 5.7C6.8 41.2 14.7 47 24 47z"
								})
							]
						}), mode === "login" ? t("loginGoogle") : t("register") + " with Google"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => void handleSocial("facebook"),
							disabled: loading,
							className: "card-flat flex items-center justify-center gap-2 py-3 text-sm font-bold transition-opacity hover:opacity-80 disabled:opacity-50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-5 w-5 place-items-center rounded-full bg-[#1877F2] text-[15px] font-black leading-none text-white",
								children: "f"
							}), "Facebook"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => void handleSocial("apple"),
							disabled: loading,
							className: "hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[20px] leading-none text-black",
								children: "●"
							}), "Apple"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "my-5 flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-bold text-muted-foreground",
								children: t("or")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" })
						]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "space-y-4",
					noValidate: true,
					children: [
						mode === "reset" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-extrabold",
								children: t("forgotPassword")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Enter your email to receive a password reset link."
							})]
						}),
						mode === "register" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "input-name",
								type: "text",
								placeholder: t("name"),
								value: name,
								onChange: (e) => setName(e.target.value),
								className: "card-flat w-full py-3 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary rounded-2xl"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "input-email",
								type: "email",
								placeholder: t("email"),
								value: email,
								onChange: (e) => setEmail(e.target.value),
								required: true,
								autoComplete: "email",
								className: "card-flat w-full py-3 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary rounded-2xl"
							})]
						}),
						mode !== "reset" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "input-password",
									type: showPass ? "text" : "password",
									placeholder: t("password"),
									value: password,
									onChange: (e) => setPassword(e.target.value),
									required: true,
									autoComplete: mode === "register" ? "new-password" : "current-password",
									className: "card-flat w-full py-3 pl-10 pr-12 text-sm outline-none focus:ring-2 focus:ring-primary rounded-2xl"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowPass((v) => !v),
									className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground",
									children: showPass ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
								})
							]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 shrink-0" }), error]
						}),
						successMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-2xl border border-jade/30 bg-jade/10 px-4 py-3 text-sm text-jade",
							children: successMsg
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							id: "btn-submit-auth",
							type: "submit",
							disabled: loading,
							className: "flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-extrabold text-primary-foreground shadow transition-opacity hover:opacity-90 active:scale-[0.98] disabled:opacity-50",
							children: [
								loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
								mode === "login" && t("login"),
								mode === "register" && t("createAccount"),
								mode === "reset" && t("resetPassword")
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 space-y-3 text-center text-xs text-muted-foreground",
					children: [
						mode === "login" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setMode("reset");
								clearState();
							},
							className: "hover:text-foreground underline underline-offset-2",
							children: t("forgotPassword")
						}),
						mode === "reset" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setMode("login");
								clearState();
							},
							className: "hover:text-foreground underline underline-offset-2",
							children: t("backToLogin")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							id: "btn-continue-guest",
							onClick: handleGuest,
							className: "hover:text-foreground underline underline-offset-2",
							children: [t("continueGuest"), " →"]
						}) })
					]
				})
			]
		})
	});
}
//#endregion
export { LoginPage as component };

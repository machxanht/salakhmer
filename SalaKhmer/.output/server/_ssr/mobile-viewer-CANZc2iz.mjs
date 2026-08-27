import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { S as RefreshCw, Z as ExternalLink, k as MonitorSmartphone, p as Smartphone, u as Tablet, y as RotateCw } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mobile-viewer-CANZc2iz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var devices = [
	{
		name: "iPhone 15",
		width: 393,
		height: 852,
		kind: "phone"
	},
	{
		name: "iPhone SE",
		width: 375,
		height: 667,
		kind: "phone"
	},
	{
		name: "Pixel 8",
		width: 412,
		height: 915,
		kind: "phone"
	},
	{
		name: "iPad Mini",
		width: 768,
		height: 1024,
		kind: "tablet"
	}
];
function MobileViewer() {
	const [url, setUrl] = (0, import_react.useState)("/");
	const [frameUrl, setFrameUrl] = (0, import_react.useState)("/");
	const [device, setDevice] = (0, import_react.useState)(devices[0]);
	const [landscape, setLandscape] = (0, import_react.useState)(false);
	const [reloadKey, setReloadKey] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		setUrl(window.location.origin);
		setFrameUrl(window.location.origin);
	}, []);
	const dimensions = (0, import_react.useMemo)(() => landscape ? {
		width: device.height,
		height: device.width
	} : device, [device, landscape]);
	const navigate = (event) => {
		event.preventDefault();
		const trimmed = url.trim();
		if (!trimmed) return;
		setFrameUrl(/^https?:\/\//i.test(trimmed) || trimmed.startsWith("/") ? trimmed : `https://${trimmed}`);
		setReloadKey((key) => key + 1);
	};
	const isPhone = device.kind === "phone";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#101827] text-slate-100",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-white/10 bg-[#172033] px-4 py-3 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-[1600px] flex-wrap items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mr-2 flex items-center gap-2 font-display text-lg font-bold tracking-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-9 w-9 place-items-center rounded-xl bg-amber-400 text-slate-950",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonitorSmartphone, { className: "h-5 w-5" })
							}), "Mobile Viewer"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: navigate,
							className: "order-3 flex min-w-[260px] flex-1 items-center gap-2 sm:order-none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: url,
								onChange: (event) => setUrl(event.target.value),
								placeholder: "https://your-app.com",
								className: "h-10 min-w-0 flex-1 rounded-lg border border-white/10 bg-slate-950/50 px-3 text-sm outline-none ring-amber-400/60 placeholder:text-slate-500 focus:ring-2"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "h-10 rounded-lg bg-amber-400 px-4 text-sm font-bold text-slate-950 transition hover:bg-amber-300",
								children: "Load"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: frameUrl,
							target: "_blank",
							rel: "noreferrer",
							className: "inline-flex h-10 items-center gap-2 rounded-lg border border-white/15 px-3 text-sm font-semibold text-slate-200 hover:bg-white/5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-4 w-4" }), " Open"]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-white/10 bg-[#141d2e] px-4 py-3 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-[1600px] flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mr-1 text-xs font-bold uppercase tracking-wider text-slate-400",
							children: "Device"
						}),
						devices.map((item) => {
							const Icon = item.kind === "phone" ? Smartphone : Tablet;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setDevice(item),
								className: `inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-semibold transition ${device.name === item.name ? "bg-amber-400 text-slate-950" : "bg-white/5 text-slate-300 hover:bg-white/10"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }),
									" ",
									item.name,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs opacity-70",
										children: [
											item.width,
											"×",
											item.height
										]
									})
								]
							}, item.name);
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-1 hidden h-6 w-px bg-white/10 sm:block" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setLandscape((value) => !value),
							className: "inline-flex h-9 items-center gap-2 rounded-lg bg-white/5 px-3 text-sm font-semibold text-slate-300 hover:bg-white/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "h-4 w-4" }), " Rotate"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setReloadKey((key) => key + 1),
							className: "inline-flex h-9 items-center gap-2 rounded-lg bg-white/5 px-3 text-sm font-semibold text-slate-300 hover:bg-white/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4" }), " Reload"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-auto rounded-md bg-white/5 px-2 py-1 text-xs font-mono text-slate-400",
							children: [
								dimensions.width,
								" × ",
								dimensions.height
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "grid min-h-[calc(100vh-125px)] place-items-start overflow-auto bg-[radial-gradient(circle_at_center,_#24324d_0,_#101827_60%)] p-8 sm:p-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative rounded-[2.8rem] bg-slate-950 p-3 shadow-2xl shadow-black/50",
					style: {
						width: dimensions.width + 24,
						height: dimensions.height + 24
					},
					children: [
						isPhone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute z-10 h-6 w-28 rounded-full bg-slate-950 ${landscape ? "left-1 top-1/2 -translate-y-1/2" : "left-1/2 top-2 -translate-x-1/2"}` }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full w-full overflow-hidden rounded-[2rem] bg-white",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
								title: "Mobile preview",
								src: frameUrl,
								className: "h-full w-full border-0"
							}, reloadKey)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute bottom-1.5 left-1/2 h-1 w-20 -translate-x-1/2 rounded-full bg-slate-700" })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 max-w-xl text-center text-xs leading-5 text-slate-400",
					children: [
						"Mẹo: URL cùng domain sẽ xem được trực tiếp. Một số website chặn hiển thị trong iframe bằng chính sách bảo mật; hãy dùng nút",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-slate-300",
							children: "Open"
						}),
						" trong trường hợp đó."
					]
				})]
			})
		]
	});
}
//#endregion
export { MobileViewer as component };

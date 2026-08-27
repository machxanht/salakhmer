import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { $ as Compass, D as PenLine, K as Flame, L as Library, P as Lock, W as Headphones, c as Trophy, f as Sparkles, ft as ArrowRight, j as MapPin, lt as BookOpen, q as Flag, rt as ChevronRight } from "../_libs/lucide-react.mjs";
import { c as useLocale, l as useAuth } from "./router-JcPmpmb6.mjs";
import { a as LovableHeader, c as LovableSectionTitle, i as LovableBottomNav, l as apsara_script_basics_teacher_default, n as LanguagePicker, s as LovableScreen } from "./LovableAppShell-kutS1aM-.mjs";
import { t as hasFullLessonTestAccess } from "./tester-access-DrwpAQaY.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/home-7CkNpBZe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EXPEDITION_NODES = [
	{
		id: "bayon-temple",
		name: "Bayon Temple",
		nameKh: "ប្រាសាទបាយ័ន",
		description: "The gateway temple. Master the basics here.",
		levelRequired: 1,
		lessonsRequired: 0,
		relicId: "relic-1",
		posX: 20,
		posY: 5,
		connectedTo: ["angkor-wat"]
	},
	{
		id: "angkor-wat",
		name: "Angkor Wat",
		nameKh: "អង្គរវត្ត",
		description: "The heart of the empire. Mastered greetings & script.",
		levelRequired: 5,
		lessonsRequired: 15,
		relicId: "relic-2",
		posX: 62,
		posY: 12,
		connectedTo: ["ta-prohm"]
	},
	{
		id: "ta-prohm",
		name: "Ta Prohm",
		nameKh: "ប្រាសាទតាព្រហ្ម",
		description: "Where jungle meets stone. Deep vocabulary mastery.",
		levelRequired: 15,
		lessonsRequired: 40,
		relicId: "relic-3",
		posX: 55,
		posY: 38,
		connectedTo: ["preah-khan"]
	},
	{
		id: "preah-khan",
		name: "Preah Khan",
		nameKh: "ប្រាសាទព្រះខ័ន",
		description: "The sacred sword. Advanced grammar unlocked.",
		levelRequired: 20,
		lessonsRequired: 60,
		relicId: "relic-4",
		posX: 30,
		posY: 52,
		connectedTo: ["banteay-srei"]
	},
	{
		id: "banteay-srei",
		name: "Banteay Srei",
		nameKh: "ប្រាសាទបន្ទាយស្រី",
		description: "Citadel of Women. Refined conversation skills.",
		levelRequired: 30,
		lessonsRequired: 85,
		relicId: "relic-5",
		posX: 65,
		posY: 65,
		connectedTo: ["koh-ker"]
	},
	{
		id: "koh-ker",
		name: "Koh Ker",
		nameKh: "កោះកេរ",
		description: "The mountain kingdom. Cultural mastery achieved.",
		levelRequired: 40,
		lessonsRequired: 120,
		relicId: "relic-6",
		posX: 40,
		posY: 78,
		connectedTo: []
	}
];
EXPEDITION_NODES.flatMap((node) => node.connectedTo.map((toId) => ({
	from: node.id,
	to: toId
})));
/**
* Computes the status of every node given the user's current level
* and total completed lessons count.
*/
function computeExpeditionStatus(userLevel, totalCompletedLessons) {
	let currentFound = false;
	const withStatus = EXPEDITION_NODES.map((node) => {
		const canAccess = userLevel >= node.levelRequired && totalCompletedLessons >= node.lessonsRequired;
		return {
			...node,
			status: canAccess ? "unlocked" : "locked"
		};
	});
	for (let i = withStatus.length - 1; i >= 0; i--) {
		const node = withStatus[i];
		if (!currentFound && node && node.status === "unlocked") {
			node.status = "current";
			currentFound = true;
		}
	}
	return withStatus;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
function DailyChallenge() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 p-4 shadow-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/20 text-orange-500",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-6 w-6" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400",
							children: "Daily Challenge"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "mt-0.5 truncate text-sm font-bold text-foreground",
							children: [
								"Write ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "khmer text-primary",
									children: "\"សួស្តី\""
								}),
								" from memory"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 flex items-center text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-orange-600 dark:text-orange-400",
									children: "+50 XP"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mx-1.5 opacity-50",
									children: "•"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "4 min" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mx-1.5 opacity-50",
									children: "•"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Expires 11h 22m" })
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "icon",
					className: "h-8 w-8 shrink-0 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-md",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })
				})
			]
		})
	});
}
var landmarkArt = {
	"bayon-temple": "/assets/bayon-temple-Cf7WA6AZ.webp",
	"angkor-wat": "/assets/angkor-wat-DIoIrESw.webp",
	"ta-prohm": "/assets/ta-prohm-C8N_6kH_.webp",
	"preah-khan": "/assets/preah-khan-8Dmng1yp.webp",
	"banteay-srei": "/assets/banteay-srei-Dgfh6aim.webp",
	"koh-ker": "/assets/koh-ker-CpH7DKVO.webp"
};
/** A visual map of the real user profile: XP is the source of the level. */
function AngkorRelicsMap({ showDailyChallenge = true }) {
	const { user, totalCompletedLessons } = useAuth();
	const isGuest = user.role === "GUEST";
	const hasMapPreviewAccess = hasFullLessonTestAccess(user.email);
	const nodes = computeExpeditionStatus(hasMapPreviewAccess ? 40 : user.level, hasMapPreviewAccess ? 120 : totalCompletedLessons);
	const currentNode = nodes.find((node) => node.status === "current");
	const routePoints = nodes.map((node) => `${node.posX},${100 - node.posY}`).join(" ");
	const xpInLevel = user.xp % 200;
	const xpToNextLevel = 200 - xpInLevel || 200;
	const xpProgress = Math.min(100, Math.round(xpInLevel / 200 * 100));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "overflow-hidden rounded-[28px] border border-[#E9D7A8] bg-[#FFF9E9] shadow-[0_10px_24px_rgba(80,61,27,.08)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between px-5 pb-3 pt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] font-black uppercase tracking-[.14em] text-[#B67218]",
					children: "Your learning path"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 text-[21px] font-black text-[#173B33]",
					children: "Journey through Angkor"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-[#E2F1E8] px-3 py-1.5 text-[10px] font-black uppercase tracking-[.08em] text-[#16775B]",
					children: "6 stops"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-4 mb-4 rounded-[22px] border border-[#D8E9DE] bg-white px-4 py-3.5 shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#163F35] text-[#FFD166] shadow-[0_5px_12px_rgba(22,63,53,.18)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, {
								className: "h-5 w-5",
								strokeWidth: 2.2
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm font-black text-[#173B33]",
										children: ["Level ", user.level]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "whitespace-nowrap text-[11px] font-bold text-[#6B746D]",
										children: [user.xp.toLocaleString(), " XP"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 h-2 overflow-hidden rounded-full bg-[#E9EEE9]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full rounded-full bg-[linear-gradient(90deg,#D9871A,#F6C451)] transition-[width] duration-500",
										style: { width: `${xpProgress}%` }
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1.5 text-[10px] font-semibold text-[#7D6B49]",
									children: [
										xpToNextLevel,
										" XP to Level ",
										user.level + 1
									]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-3 gap-2 border-t border-[#EDF0EC] pt-3 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								value: totalCompletedLessons,
								label: "Lessons"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								value: user.currentStreak,
								label: "Day streak"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								value: `${nodes.filter((node) => node.status !== "locked").length}/6`,
								label: "Places"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 flex items-center gap-1.5 text-[10px] leading-4 text-[#6B746D]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 shrink-0 text-[#D9871A]" }), " Finish lessons and answer activities correctly to earn more XP."]
					})
				]
			}),
			showDailyChallenge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-5 pb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DailyChallenge, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-3 mb-3 h-[390px] overflow-hidden rounded-[22px] border border-[#F0D99F] bg-[#FFFDF5]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": "true",
						className: "absolute -left-10 bottom-4 h-28 w-28 rounded-full bg-[#DBF0E0]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": "true",
						className: "absolute -right-12 top-8 h-36 w-36 rounded-full bg-[#FFE8AF]/65"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						className: "absolute inset-0 h-full w-full",
						viewBox: "0 0 100 100",
						preserveAspectRatio: "none",
						"aria-hidden": "true",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
								points: routePoints,
								fill: "none",
								stroke: "#FFF5D9",
								strokeWidth: "5",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
								points: routePoints,
								fill: "none",
								stroke: "#F2A52B",
								strokeWidth: "1.4",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
								points: routePoints,
								fill: "none",
								stroke: "#FFD77B",
								strokeWidth: "0.35",
								strokeLinecap: "round",
								strokeLinejoin: "round",
								strokeDasharray: "1.3 2.1"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapTrees, { className: "left-[5%] top-[13%] scale-75" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapTrees, { className: "right-[4%] top-[31%] scale-90" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapTrees, { className: "bottom-[7%] left-[8%] scale-[.7]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapTrees, { className: "bottom-[13%] right-[12%] scale-[.62]" }),
					nodes.map((node, index) => {
						const unlocked = node.status === "unlocked" || node.status === "current";
						const current = node.status === "current";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute z-20 -translate-x-1/2 translate-y-1/2",
							style: {
								left: `${node.posX}%`,
								bottom: `${node.posY}%`
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `relative grid h-[72px] w-[72px] place-items-center transition-transform ${current ? "scale-110" : ""}`,
								children: [
									current && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"aria-hidden": "true",
										className: "absolute inset-1 rounded-full bg-[#F6B431]/30 blur-md"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: landmarkArt[node.id],
										alt: "",
										className: `relative h-[76px] w-[76px] max-w-none object-contain drop-shadow-[0_5px_4px_rgba(54,62,35,.24)] ${unlocked ? "" : "grayscale opacity-35"}`
									}),
									!unlocked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute inset-0 grid place-items-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid h-7 w-7 place-items-center rounded-full bg-white/90 shadow-sm",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3.5 w-3.5 text-[#756C5D]" })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `absolute -left-2 -top-2 z-10 grid h-5 min-w-5 place-items-center rounded-full px-1 text-[9px] font-black ${current ? "bg-[#173B33] text-white" : "bg-white text-[#7A623D] shadow-sm"}`,
										children: index + 1
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute left-1/2 top-[71px] w-[84px] -translate-x-1/2 text-center text-[9px] font-black leading-3 text-[#564827]",
								children: node.name
							})]
						}, node.id);
					}),
					currentNode && !isGuest && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute left-4 top-4 z-30 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1.5 text-[10px] font-black text-[#4E3E21] shadow-[0_5px_12px_rgba(65,50,18,.12)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
							className: "h-3.5 w-3.5 text-[#DD6D25]",
							fill: "currentColor"
						}), " You are here"]
					}),
					isGuest && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-x-4 bottom-4 z-30 flex items-center justify-center gap-2 rounded-2xl bg-white/95 px-4 py-3 text-center text-[11px] font-bold text-[#4E3E21] shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "h-4 w-4 text-[#DD6D25]" }), " Sign in to save your Angkor journey."]
					})
				]
			})
		]
	});
}
function Stat({ value, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm font-black text-[#173B33]",
		children: value
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-0.5 text-[9px] font-bold uppercase tracking-[.08em] text-[#8C806B]",
		children: label
	})] });
}
function MapTrees({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"aria-hidden": "true",
		className: `absolute z-10 flex items-end ${className}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tree, { size: "sm" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tree, { size: "lg" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tree, { size: "md" })
		]
	});
}
function Tree({ size }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `relative inline-block ${{
			sm: "h-9 w-7",
			md: "h-12 w-9",
			lg: "h-16 w-12"
		}[size]}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute bottom-0 left-1/2 h-[48%] w-1 -translate-x-1/2 rounded-full bg-[#6C5837]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-0 top-0 h-[68%] w-full rounded-[48%] bg-[#4C8C5B] shadow-[inset_0_-5px_0_rgba(36,104,64,.18)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-[18%] top-[12%] h-[42%] w-[64%] rounded-[48%] border-l border-[#D7F0B9]/70" })
		]
	});
}
function HomePage() {
	const { user, firebaseUser } = useAuth();
	const { tr } = useLocale();
	const firstName = user.name?.split(" ")[0] || "there";
	const avatarUrl = user.avatarUrl ?? firebaseUser?.photoURL ?? void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LovableScreen, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LovableHeader, {
			eyebrow: "SalaKhmer",
			title: tr("homeGreeting", { name: firstName }),
			right: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguagePicker, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/profile",
					"aria-label": "Open profile",
					className: "grid h-11 w-11 place-items-center overflow-hidden rounded-2xl bg-[#173B33] text-[15px] font-black text-white shadow-[0_6px_14px_rgba(23,59,51,.22)]",
					children: avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: avatarUrl,
						alt: "",
						referrerPolicy: "no-referrer",
						className: "h-full w-full object-cover"
					}) : firstName[0]?.toUpperCase()
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-5 pt-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative min-h-[248px] overflow-hidden rounded-[30px] bg-[linear-gradient(135deg,#123C32_0%,#18493B_62%,#245642_100%)] p-5 text-white shadow-[0_16px_34px_rgba(23,59,51,.2)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": "true",
						className: "absolute -right-12 -top-16 h-60 w-60 rounded-full border-[26px] border-[#F7B733]/15"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": "true",
						className: "absolute right-[38%] top-7 h-1.5 w-1.5 rounded-full bg-white/80 shadow-[18px_16px_0_rgba(255,255,255,.55),35px_-10px_0_rgba(255,255,255,.45),51px_12px_0_rgba(255,255,255,.35)]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 max-w-[60%]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-bold uppercase tracking-[.12em] text-white/75",
								children: "Today's lesson"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 text-[29px] font-extrabold leading-[1.05] tracking-[-.03em]",
								children: "Build your Khmer sound map."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-[13px] leading-5 text-white/85",
								children: "Discover two sound series and take your first step into Khmer."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/grid-lesson/$lessonId",
								params: { lessonId: "alpha-l1" },
								className: "mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-[13px] font-black text-[#173B33] shadow-[0_5px_12px_rgba(10,35,27,.25)]",
								children: ["Start lesson ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: apsara_script_basics_teacher_default,
						alt: "",
						"aria-hidden": "true",
						className: "pointer-events-none absolute -bottom-3 -right-5 z-10 h-[232px] w-[47%] object-contain object-bottom drop-shadow-[0_12px_10px_rgba(48,26,113,.25)]"
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "px-5 pt-7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LovableSectionTitle, {
				title: "Explore modules",
				note: "6 modules"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-3 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleShortcut, {
						icon: BookOpen,
						title: "Script",
						tone: "gold",
						to: "/category/module_1"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleShortcut, {
						icon: Library,
						title: "Read & Spell",
						tone: "mint",
						to: "/category/module_2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleShortcut, {
						icon: Headphones,
						title: "Listen",
						tone: "blue",
						to: "/category/module_3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleShortcut, {
						icon: PenLine,
						title: "Write",
						tone: "violet",
						to: "/category/module_4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleShortcut, {
						icon: Trophy,
						title: "Review",
						tone: "coral",
						to: "/category/module_5"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleShortcut, {
						icon: Compass,
						title: "Guide",
						tone: "mint",
						to: "/category/module_6"
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "px-5 pb-8 pt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LovableSectionTitle, {
				title: "Your Angkor journey",
				note: "Six learning levels"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AngkorRelicsMap, { showDailyChallenge: false })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LovableBottomNav, {})
	] });
}
function ModuleShortcut({ icon: Icon, title, tone, to }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "min-h-[120px] rounded-[20px] border border-[#E8E5DE] bg-white p-3 text-center shadow-[0_7px_18px_rgba(23,59,51,.05)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `mx-auto grid h-11 w-11 place-items-center rounded-xl ${{
				gold: "bg-[#FFF0CC] text-[#C77800]",
				mint: "bg-[#E3F4ED] text-[#07836C]",
				violet: "bg-[#EEE8FF] text-[#6756B5]",
				coral: "bg-[#FFE7DB] text-[#C45E36]",
				blue: "bg-[#E5F1FF] text-[#3073B6]"
			}[tone]}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				className: "h-5 w-5",
				strokeWidth: 1.9
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-2 block text-[11px] font-black leading-4 text-[#173B33]",
			children: title
		})]
	});
}
//#endregion
export { HomePage as component };

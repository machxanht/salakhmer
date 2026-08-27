import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { $ as Compass, A as MicVocal, D as PenLine, H as House, L as Library, T as Play, W as Headphones, a as UserRound, at as Check, c as Trophy, d as Star, f as Sparkles, j as MapPin, lt as BookOpen, n as Volume2, rt as ChevronRight, st as Bot, v as Search, z as Languages } from "../_libs/lucide-react.mjs";
import { t as apsara_reading_default } from "./apsara-reading-Dbi8OTvR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-concepts-xxE9034N.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var apsara_guide_chroma_default = "/assets/apsara-guide-chroma-BrB64OBH.png";
var concepts = [
	{
		id: "atlas",
		number: "01",
		title: "Sala Atlas",
		sub: "Icon-led home",
		bestFor: "Best overall direction"
	},
	{
		id: "path",
		number: "02",
		title: "Learning Path",
		sub: "Progress route",
		bestFor: "Module progression"
	},
	{
		id: "cards",
		number: "03",
		title: "Visual Library",
		sub: "Topic cards",
		bestFor: "Read & Spell + Guide"
	},
	{
		id: "dialogue",
		number: "04",
		title: "Conversation",
		sub: "Audio workspace",
		bestFor: "Listen & Speak"
	},
	{
		id: "notebook",
		number: "05",
		title: "Study Notebook",
		sub: "Quiet focus",
		bestFor: "Write + Review"
	}
];
function UiConcepts() {
	const [active, setActive] = (0, import_react.useState)("atlas");
	const concept = concepts.find((item) => item.id === active);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-[#EAF0F3] px-4 py-7 text-[#17231F] sm:px-8 sm:py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "grid gap-5 border-b border-[#D2DFDE] pb-6 lg:grid-cols-[1fr_auto] lg:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-black uppercase tracking-[.22em] text-[#0B8B76]",
						children: "SalaKhmer · mobile UI review"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 max-w-2xl text-3xl font-black tracking-[-.04em] sm:text-4xl",
						children: "Five icon-first directions"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-sm leading-6 text-[#61706A]",
						children: "A separate demo only. Each screen is designed at phone width first and keeps the same information architecture for Android and iOS."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 rounded-2xl border border-[#D2DFDE] bg-white/70 px-3 py-2 text-xs font-bold text-[#52635C]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-[#F29F05]" }), " Icon system over colour noise"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "rounded-[28px] border border-white bg-white/70 p-3 shadow-[0_16px_40px_rgba(29,53,46,.08)] backdrop-blur",
					children: [concepts.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActive(item.id),
						className: `mb-1 flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${active === item.id ? "bg-[#173B33] text-white shadow-lg" : "text-[#31433C] hover:bg-[#EDF5F2]"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `grid h-10 w-10 place-items-center rounded-xl text-xs font-black ${active === item.id ? "bg-[#F7B733] text-[#173B33]" : "bg-[#E4F2EE] text-[#0B8B76]"}`,
								children: item.number
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: "block text-sm",
									children: item.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
									className: `mt-0.5 block text-xs ${active === item.id ? "text-[#B9D6CC]" : "text-[#788881]"}`,
									children: item.sub
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: `h-4 w-4 ${active === item.id ? "text-[#F7B733]" : "text-[#95A59E]"}` })
						]
					}, item.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 rounded-2xl bg-[#FFF8E9] p-4 text-xs leading-5 text-[#78613A]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
								className: "block text-[#A26600]",
								children: "Recommendation"
							}),
							"Use ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Sala Atlas" }),
							" as the global shell, then use Conversation and Notebook only inside their modules."
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-[34px] border border-white bg-white/55 p-4 shadow-[0_20px_55px_rgba(29,53,46,.1)] sm:p-7",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5 flex items-end justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] font-black uppercase tracking-[.18em] text-[#0B8B76]",
							children: concept.bestFor
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 text-2xl font-black tracking-[-.03em]",
							children: concept.title
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden rounded-full bg-[#E7F2EE] px-3 py-1.5 text-xs font-bold text-[#297362] sm:block",
							children: "390px mobile frame"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto w-full max-w-[410px] rounded-[40px] bg-[#142A25] p-2.5 shadow-[0_28px_70px_rgba(21,42,37,.28)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative min-h-[790px] overflow-hidden rounded-[32px] bg-[#FFFCF7]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-1/2 top-2 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-[#142A25]" }),
								active === "atlas" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AtlasScreen, {}),
								active === "path" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PathScreen, {}),
								active === "cards" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardsScreen, {}),
								active === "dialogue" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogueScreen, {}),
								active === "notebook" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotebookScreen, {})
							]
						})
					})]
				})]
			})]
		})
	});
}
function AtlasScreen() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PhoneShell, {
		active: "Home",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between px-5 pt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] font-black uppercase tracking-[.18em] text-[#0B8B76]",
					children: "SalaKhmer"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-1 text-[25px] font-black tracking-[-.04em]",
					children: [
						"Learn Khmer",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"with confidence."
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "grid h-11 w-11 place-items-center rounded-2xl bg-[#F7B733] text-[#173B33]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "h-5 w-5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-5 mt-5 overflow-hidden rounded-[26px] bg-[#173B33] p-5 text-white",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 max-w-[60%]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] font-black uppercase tracking-[.14em] text-[#F7C95A]",
							children: "Continue your path"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "mt-2 text-xl font-black leading-tight",
							children: [
								"Khmer script",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"basics"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs leading-5 text-[#C3DDD5]",
							children: "Recognise letters and hear their sound."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "mt-4 flex items-center gap-1.5 rounded-xl bg-[#F7B733] px-3 py-2 text-xs font-black text-[#173B33]",
							children: ["Continue ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: apsara_reading_default,
					alt: "",
					className: "absolute right-0 top-[96px] h-44 object-contain"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "px-5 pt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					text: "Explore modules",
					action: "See all"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid grid-cols-3 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleIcon, {
							icon: BookOpen,
							text: "Script",
							tone: "gold"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleIcon, {
							icon: Headphones,
							text: "Listen",
							tone: "mint"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleIcon, {
							icon: PenLine,
							text: "Write",
							tone: "violet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleIcon, {
							icon: Trophy,
							text: "Review",
							tone: "coral"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleIcon, {
							icon: Compass,
							text: "Guide",
							tone: "blue"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleIcon, {
							icon: Library,
							text: "Words",
							tone: "gold"
						})
					]
				})]
			})
		]
	});
}
function PathScreen() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PhoneShell, {
		active: "Learn",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "px-5 pt-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] font-black uppercase tracking-[.18em] text-[#0B8B76]",
						children: "Your learning journey"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-[26px] font-black",
						children: "One clear next step."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-[#70807A]",
						children: "Build the Khmer script in small, useful stages."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-5 mt-6 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PathStep, {
						n: "1",
						icon: Volume2,
						title: "Hear the alphabet",
						text: "6 of 6 lessons completed",
						state: "done"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PathStep, {
						n: "2",
						icon: BookOpen,
						title: "Read & Spell",
						text: "Your next recommended module",
						state: "current"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PathStep, {
						n: "3",
						icon: MicVocal,
						title: "Listen & Speak",
						text: "Unlock after your first words",
						state: "locked"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PathStep, {
						n: "4",
						icon: PenLine,
						title: "Handwriting",
						text: "Trace at your own pace",
						state: "locked"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-5 mt-6 rounded-2xl bg-[#FFF3D7] p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-10 w-10 place-items-center rounded-xl bg-[#F7B733] text-[#173B33]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-5 w-5 fill-current" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold leading-5",
						children: "Your next step is visible before you need to scroll."
					})]
				})
			})
		]
	});
}
function CardsScreen() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PhoneShell, {
		active: "Dictionary",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between px-5 pt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] font-black uppercase tracking-[.18em] text-[#0B8B76]",
					children: "Read & spell"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 text-[26px] font-black",
					children: "Useful words"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "grid h-10 w-10 place-items-center rounded-full bg-[#E9F5F0] text-[#0B8B76]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-5 w-5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-5 mt-5 flex gap-2 overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						text: "Beginner",
						active: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { text: "Food" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { text: "Travel" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-2 gap-3 px-5 pt-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisualCard, {
						icon: "🥭",
						title: "Fruit",
						text: "15 words"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisualCard, {
						icon: "🍜",
						title: "Food",
						text: "15 words"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisualCard, {
						icon: "🚌",
						title: "Travel",
						text: "15 words"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisualCard, {
						icon: "📱",
						title: "Technology",
						text: "15 words"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-5 mt-5 flex items-center gap-3 rounded-2xl border border-[#E2EDE9] bg-[#F0F8F5] p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: apsara_guide_chroma_default,
					alt: "",
					className: "h-11 w-11 object-contain"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs leading-5 text-[#467067]",
					children: "One original illustrated icon per topic. No repeated placeholder images."
				})]
			})
		]
	});
}
function DialogueScreen() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PhoneShell, {
		active: "Learn",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-3 px-5 pt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "grid h-9 w-9 place-items-center rounded-full bg-[#F3F0EA]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-5 w-5 rotate-180" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-bold text-[#7B8B84]",
					children: "Listen & Speak · 3 of 5"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-black",
					children: "At the market"
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-5 mt-5 flex items-center gap-3 rounded-2xl bg-[#ECF6F2] p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid h-10 w-10 place-items-center rounded-xl bg-white text-[#0B8B76]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
					className: "block text-sm",
					children: "Market conversation"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
					className: "text-xs text-[#628178]",
					children: "Male + female dialogue · 1 min"
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-5 mt-5 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Speech, {
						left: true,
						avatar: "S",
						khmer: "សួស្តី! ចង់ទិញអ្វី?",
						english: "Hello! What would you like to buy?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Speech, {
						avatar: "P",
						khmer: "ខ្ញុំចង់ទិញផ្លែម្នាស់។",
						english: "I would like to buy pineapple."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Speech, {
						left: true,
						avatar: "S",
						khmer: "មួយផ្លែ បីពាន់រៀល។",
						english: "One is three thousand riel."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "mx-5 mt-5 flex w-[calc(100%-40px)] items-center justify-center gap-2 rounded-2xl bg-[#173B33] py-3.5 text-sm font-black text-white",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4 fill-current" }), " Play the full conversation"]
			})
		]
	});
}
function NotebookScreen() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PhoneShell, {
		active: "Learn",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between px-5 pt-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "grid h-10 w-10 place-items-center rounded-full bg-[#F1EEE9]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-5 w-5 rotate-180" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-black text-[#64766E]",
						children: "Handwriting · 4 / 33"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "grid h-10 w-10 place-items-center rounded-full bg-[#F1EEE9]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-5 w-5" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "px-5 pt-7 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-black uppercase tracking-[.16em] text-[#0B8B76]",
						children: "Quiet focus mode"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 text-4xl font-black text-[#173B33]",
						children: "ក"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm font-bold text-[#887A70]",
						children: "K-aw"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-5 mt-6 rounded-[26px] border border-[#E4DED4] bg-[#FFFDF9] p-4 shadow-[0_12px_30px_rgba(41,48,43,.06)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-[290px] place-items-center overflow-hidden rounded-2xl border border-[#E5D5AD] bg-[linear-gradient(#EADDBF_1px,transparent_1px),linear-gradient(90deg,#EADDBF_1px,transparent_1px)] bg-[size:100%_58px,58px_100%]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, {
						className: "h-24 w-24 text-[#0B8B76]",
						strokeWidth: 1.25
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#F7B733] py-3.5 text-sm font-black text-[#173B33]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4 fill-current" }), " Replay stroke order"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-7 mt-4 text-center text-xs leading-5 text-[#7A827E]",
				children: "One task, one primary action, no distracting cards below it."
			})
		]
	});
}
function PhoneShell({ children, active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-[790px] bg-[#FFFCF7] pb-24 text-[#173B33]",
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "absolute inset-x-0 bottom-0 flex h-[76px] items-center justify-around border-t border-[#E5E6E0] bg-[#FFFCF7]/95 px-3 text-[10px] font-bold text-[#88938E]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {
					icon: House,
					label: "Home",
					active: active === "Home"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {
					icon: Library,
					label: "Dictionary",
					active: active === "Dictionary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "-mt-8 grid h-14 w-14 place-items-center rounded-full border-4 border-[#FFFCF7] bg-[#0B8B76] text-white shadow-lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-5 w-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {
					icon: Compass,
					label: "Apply"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {
					icon: UserRound,
					label: "Profile"
				})
			]
		})]
	});
}
function Nav({ icon: Icon, label, active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		className: `flex min-w-12 flex-col items-center gap-1 ${active ? "text-[#0B8B76]" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "h-5 w-5",
			strokeWidth: active ? 2.5 : 1.8
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
	});
}
function Title({ text, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "text-lg font-black",
			children: text
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: "text-xs font-bold text-[#0B8B76]",
			children: action
		})]
	});
}
function ModuleIcon({ icon: Icon, text, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		className: "rounded-2xl border border-[#E8E5DE] bg-white p-3 text-center shadow-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `mx-auto grid h-11 w-11 place-items-center rounded-xl ${{
				gold: "bg-[#FFF0CC] text-[#C77800]",
				mint: "bg-[#E3F4ED] text-[#07836C]",
				violet: "bg-[#EEE8FF] text-[#6756B5]",
				coral: "bg-[#FFE7DB] text-[#C45E36]",
				blue: "bg-[#E5F1FF] text-[#3073B6]"
			}[tone]}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-2 block text-[11px] font-black",
			children: text
		})]
	});
}
function PathStep({ n, icon: Icon, title, text, state }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: `flex items-center gap-3 rounded-2xl border p-3 ${state === "done" ? "border-[#CFE7DC] bg-[#F2FAF6]" : state === "current" ? "border-[#0B8B76] bg-white shadow-[0_10px_22px_rgba(11,139,118,.12)]" : "border-[#E8E5DE] bg-[#FBFAF8] opacity-65"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `grid h-10 w-10 place-items-center rounded-xl ${state === "current" ? "bg-[#F7B733] text-[#173B33]" : "bg-white text-[#0B8B76]"}`,
				children: state === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", {
					className: "block text-sm",
					children: [
						n,
						". ",
						title
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
					className: "mt-1 block text-xs text-[#74827C]",
					children: text
				})]
			}),
			state === "current" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-5 w-5 text-[#0B8B76]" })
		]
	});
}
function Pill({ text, active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: `shrink-0 rounded-full px-3 py-2 text-xs font-bold ${active ? "bg-[#173B33] text-white" : "bg-[#EEF4F1] text-[#668077]"}`,
		children: text
	});
}
function VisualCard({ icon, title, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		className: "min-h-[145px] rounded-[22px] border border-[#E5E6E0] bg-white p-4 text-left shadow-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-14 w-14 place-items-center rounded-2xl bg-[#FFF3D9] text-3xl",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
				className: "mt-4 block text-sm",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
				className: "mt-1 block text-xs text-[#7A8781]",
				children: text
			})
		]
	});
}
function Speech({ left, avatar, khmer, english }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: `flex items-start gap-2 ${left ? "" : "flex-row-reverse"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `grid h-8 w-8 shrink-0 place-items-center rounded-full text-[10px] font-black ${left ? "bg-[#FFE6D7] text-[#BF643B]" : "bg-[#E0ECFF] text-[#4379BD]"}`,
			children: avatar
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `max-w-[78%] rounded-[19px] border p-3 ${left ? "border-[#E5E2DC] bg-white" : "border-[#DCEAE5] bg-[#E9F4EF]"}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "min-w-0 flex-1 font-[Noto_Sans_Khmer] text-[19px] leading-7",
					children: khmer
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "mt-1 h-4 w-4 shrink-0 text-[#0B8B76]" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-xs leading-5 text-[#71817A]",
				children: english
			})]
		})]
	});
}
//#endregion
export { UiConcepts as component };

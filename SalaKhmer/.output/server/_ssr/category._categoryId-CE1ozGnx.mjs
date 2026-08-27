import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { $ as Compass, D as PenLine, E as PenTool, P as Lock, Q as Download, W as Headphones, X as EyeOff, Y as Eye, at as Check, b as RotateCcw, it as ChevronLeft, lt as BookOpen, pt as ArrowLeft, r as Users, rt as ChevronRight, s as Type, ut as Banknote } from "../_libs/lucide-react.mjs";
import { a as Route$3, c as useLocale, l as useAuth, u as MOCK_LESSONS } from "./router-JcPmpmb6.mjs";
import { a as LEVEL_5_INDEPENDENT_VOWELS, i as LEVEL_4_DEPENDENT_VOWELS, o as LEVEL_6_NUMERALS } from "./khmerAlphabetData-CJ1SnSWu.mjs";
import { c as LovableSectionTitle, i as LovableBottomNav, r as LongPageNav, s as LovableScreen, t as LOVABLE_MODULES, u as getLocalizedModuleCopy } from "./LovableAppShell-kutS1aM-.mjs";
import { t as PatreonSupportCard } from "./PatreonSupportCard-DIO9v5-U.mjs";
import { t as hasFullLessonTestAccess } from "./tester-access-DrwpAQaY.mjs";
import { n as TopicCover, r as getLocalizedReadSpellTopic, t as READ_SPELL_TOPICS } from "./read-spell-localization-DngSCBWw.mjs";
import { n as localizeLegacyLesson, r as localizeLegacyText, t as isCategoryAccessible } from "./content-localization-CdbR65H0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/category._categoryId-CE1ozGnx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LEVELS = [
	{
		id: "alpha-l1",
		title: "LEVEL 1: A-series consonants",
		subtitle: "The first consonant series; its base vowel is close to the a in ‘father’.",
		khmerTitle: "ក ខ ច ឆ ដ ...",
		theme: "ruby",
		isFree: true,
		totalItems: 15
	},
	{
		id: "alpha-l2",
		title: "LEVEL 2: O-series consonants",
		subtitle: "The second consonant series; its base vowel is close to the aw in ‘law’.",
		khmerTitle: "គ ឃ ង ជ ឈ ...",
		theme: "jade",
		isFree: true,
		totalItems: 18
	},
	{
		id: "alpha-l3",
		title: "LEVEL 3: Sub-consonants (coeng)",
		subtitle: "Letters placed below a main consonant to make a cluster.",
		khmerTitle: "្ក ្ខ ្គ ្ឃ ្ង ...",
		theme: "amber",
		isFree: false,
		totalItems: 32
	},
	{
		id: "alpha-l4",
		title: "LEVEL 4: Dependent Vowels",
		subtitle: "(Dependent vowels) Wraps around a consonant",
		khmerTitle: "ា ិ ី ឹ ឺ ...",
		theme: "blue",
		isFree: false,
		totalItems: 24
	},
	{
		id: "alpha-l5",
		title: "LEVEL 5: Independent Vowels",
		subtitle: "(Independent vowels) Standalone syllables",
		khmerTitle: "ឥ ឦ ឧ ឩ ឪ ...",
		theme: "purple",
		isFree: false,
		totalItems: 13
	},
	{
		id: "alpha-l6",
		title: "LEVEL 6: Numerals",
		subtitle: "(Numerals) Khmer counting system",
		khmerTitle: "០ ១ ២ ៣ ៤ ...",
		theme: "slate",
		isFree: false,
		totalItems: 15
	}
];
var VI_LEVEL_COPY = {
	"alpha-l1": {
		title: "CẤP 1: Phụ âm nhóm A",
		subtitle: "Nhóm phụ âm đầu tiên; nguyên âm cơ bản gần với âm a trong 'father'."
	},
	"alpha-l2": {
		title: "CẤP 2: Phụ âm nhóm O",
		subtitle: "Nhóm phụ âm thứ hai; nguyên âm cơ bản gần với âm aw trong 'law'."
	},
	"alpha-l3": {
		title: "CẤP 3: Phụ âm chân",
		subtitle: "Chữ cái đặt dưới phụ âm chính để tạo cụm phụ âm."
	},
	"alpha-l4": {
		title: "CẤP 4: Nguyên âm phụ thuộc",
		subtitle: "Nguyên âm bao quanh một phụ âm."
	},
	"alpha-l5": {
		title: "CẤP 5: Nguyên âm độc lập",
		subtitle: "Âm tiết có thể đứng độc lập."
	},
	"alpha-l6": {
		title: "CẤP 6: Số Khmer",
		subtitle: "Hệ thống đếm bằng số Khmer."
	}
};
function localizedLevel(level, locale) {
	return locale === "vi" ? VI_LEVEL_COPY[level.id] ?? level : level;
}
function AlphabetGrid() {
	const { user, firebaseUser } = useAuth();
	const { locale, t } = useLocale();
	const hasTesterAccess = hasFullLessonTestAccess(firebaseUser?.email ?? user.email);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative pt-2 pb-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 sm:grid-cols-3 gap-4",
			children: LEVELS.map((level, index) => {
				const copy = localizedLevel(level, locale);
				const isCompleted = user.completedLessons.includes(level.id);
				const previousLevelId = LEVELS[index - 1]?.id;
				const isUnlocked = (hasTesterAccess || user.role === "REGISTERED" || index === 0) && (index === 0 || hasTesterAccess || isCompleted || previousLevelId != null && user.completedLessons.includes(previousLevelId));
				const isNextToLearn = isUnlocked && !isCompleted;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative flex flex-col h-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `flex-1 rounded-2xl p-4 transition-all duration-300 ${isCompleted ? "bg-card border border-border/50 opacity-90" : isNextToLearn ? "bg-card shadow-md border-2 border-primary/20 scale-[1.02]" : "bg-card/50 border border-border/30 opacity-60 grayscale-[0.3]"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-start mb-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold tracking-[0.1em] text-muted-foreground uppercase",
									children: locale === "vi" ? "BẢNG CHỮ CÁI" : "ALPHABET"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] font-extrabold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm",
									children: [
										"+",
										level.totalItems,
										" XP"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: `font-extrabold ${isNextToLearn ? "text-lg text-foreground" : "text-base text-foreground/80"}`,
								children: copy.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `khmer text-sm mt-0.5 ${getThemeTextColor(level.theme)}`,
								children: level.khmerTitle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-1.5 leading-relaxed",
								children: copy.subtitle
							}),
							isNextToLearn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/grid-lesson/$lessonId",
								params: { lessonId: level.id },
								className: "mt-4 block w-full bg-primary text-primary-foreground font-extrabold text-sm py-2 rounded-xl shadow-sm hover:opacity-90 active:scale-95 transition-all text-center",
								children: locale === "vi" ? "Bắt đầu học" : "Start learning"
							}),
							isCompleted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/grid-lesson/$lessonId",
								params: { lessonId: level.id },
								className: "mt-4 block w-full bg-secondary text-foreground font-extrabold text-sm py-2 rounded-xl shadow-sm hover:opacity-90 active:scale-95 transition-all text-center",
								children: t("review")
							}),
							!isUnlocked && !isCompleted && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-center justify-center gap-1.5 w-full bg-secondary/50 text-muted-foreground font-bold text-sm py-2.5 rounded-xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4" }),
									" ",
									t("locked")
								]
							})
						]
					})
				}, level.id);
			})
		})
	});
}
function getThemeTextColor(theme) {
	switch (theme) {
		case "ruby": return "text-ruby";
		case "jade": return "text-jade";
		case "amber": return "text-amber-600";
		case "blue": return "text-blue-600";
		case "purple": return "text-purple-600";
		case "slate": return "text-slate-600";
		default: return "text-primary";
	}
}
var EXPANDED_INSIGHT_VI = {
	"ride-apps": {
		title: "Ứng dụng gọi xe và địa chỉ",
		subtitle: "Giúp tài xế đón bạn dễ hơn",
		content: "Đặt điểm đón ở nơi tài xế có thể dừng an toàn và đối chiếu tên địa điểm Khmer trên bản đồ. Hãy lưu ảnh chụp tên, số điện thoại và địa chỉ Khmer của chỗ ở để dùng khi mất mạng."
	},
	"road-crossing": {
		title: "Qua đường đông xe",
		subtitle: "Di chuyển dễ đoán và luôn quan sát",
		content: "Ưu tiên vạch qua đường hoặc đèn giao thông. Nhìn cả hai hướng vì xe có thể đến từ phía bạn không ngờ tới, và tránh bước ra từ sau xe đang đỗ."
	},
	"checking-change": {
		title: "Thanh toán và kiểm tra tiền thừa",
		subtitle: "Đếm bình tĩnh trước khi rời đi",
		content: "Xác nhận tổng tiền trước khi trả và đếm tiền thừa ngay tại quầy. Tách tiền riel mệnh giá nhỏ khỏi tiền lớn để giao dịch hằng ngày rõ ràng hơn."
	},
	heat: {
		title: "Nắng nóng và bổ sung nước",
		subtitle: "Nghỉ trước khi cơ thể kiệt sức",
		content: "Mang theo nước đóng chai còn niêm phong, ưu tiên bóng râm và đi bộ nhiều vào lúc mát. Nếu chóng mặt hoặc yếu bất thường, hãy dừng lại, làm mát cơ thể và nhờ giúp đỡ."
	},
	laundry: {
		title: "Dùng dịch vụ giặt ủi",
		subtitle: "Xác nhận thời gian và cách chăm sóc",
		content: "Hỏi giá tính theo món hay theo cân và xác nhận giờ lấy đồ. Báo trước đồ mỏng, vết bẩn hoặc món không được sấy."
	},
	"home-shoes": {
		title: "Giày dép trong nhà và nơi linh thiêng",
		subtitle: "Quan sát dấu hiệu của người địa phương",
		content: "Nếu giày dép được xếp ngoài cửa nhà, phòng hoặc khu vực thờ cúng, hãy cởi giày trước khi vào và đặt gọn để không chắn lối."
	},
	photography: {
		title: "Chụp ảnh mọi người một cách tôn trọng",
		subtitle: "Xin phép trước khi chụp chân dung gần",
		content: "Xin phép trước khi chụp rõ mặt một người, đặc biệt là trẻ em, nhà sư, người lao động hoặc người đang hành lễ. Tôn trọng biển cấm chụp ảnh và không làm gián đoạn nghi lễ."
	},
	"rural-visits": {
		title: "Thăm cộng đồng nông thôn",
		subtitle: "Đi nhẹ nhàng và hỏi trước",
		content: "Đi theo lối có sẵn, xin phép trước khi vào đất riêng và mang rác của bạn ra ngoài. Không phát quà hoặc chụp người dân khi chưa có hướng dẫn và đồng ý."
	},
	pharmacy: {
		title: "Trao đổi tại nhà thuốc",
		subtitle: "Mang theo thông tin thuốc",
		content: "Cho dược sĩ xem tên hoạt chất, liều dùng, thông tin dị ứng và ảnh bao bì gốc nếu có. Khi có triệu chứng nặng, khó thở hoặc chấn thương lớn, hãy tìm cơ sở y tế đủ chuyên môn."
	},
	charging: {
		title: "Sạc điện thoại và thiết bị",
		subtitle: "Giữ quyền truy cập bản đồ và liên lạc",
		content: "Mang đầu chuyển phù hợp và pin dự phòng nhỏ, sạc trước ngày di chuyển dài. Lưu ngoại tuyến địa chỉ, vé và số liên lạc quan trọng."
	}
};
function getInsightCopy(insight, locale) {
	return (locale === "vi" ? EXPANDED_INSIGHT_VI[insight.id] : void 0) ?? {
		title: insight.title,
		subtitle: insight.subtitle,
		content: insight.content
	};
}
var INSIGHTS = [
	{
		id: "sampeah",
		title: "Greeting local people",
		subtitle: "The five levels of Sampeah",
		icon: Users,
		image: "https://images.unsplash.com/photo-1540304859062-817bf49544eb?auto=format&fit=crop&q=80&w=800",
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Like a prayer gesture, ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Sampeah" }),
					" is Cambodia's traditional greeting and a way to show respect. The higher the hands are held, the greater the respect."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "list-disc pl-5 space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Level 1 (chest):" }), " Greet friends and peers."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Level 2 (mouth):" }), " Greet older people or a superior."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Level 3 (nose):" }), " Greet parents, grandparents, or teachers."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Level 4 (eyebrows):" }), " Greet a king or monk."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Level 5 (forehead):" }), " Pray to deities."] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold italic border-l-2 border-jade pl-3 text-jade mt-4",
					children: "Note: Do not use Sampeah with children or street vendors; a nod and smile is enough."
				})
			]
		})
	},
	{
		id: "currency",
		title: "Currency survival tips",
		subtitle: "Riel or US dollars?",
		icon: Banknote,
		image: "https://images.unsplash.com/photo-1621503953724-4f40f0653f5a?auto=format&fit=crop&q=80&w=800",
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Cambodia uses two currencies side by side: the ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Riel (KHR)" }),
					" and the",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "US dollar (USD)" }),
					"."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "list-disc pl-5 space-y-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Small change (under $1):" }), " You will usually receive change in Riel. 4000 Riel = $1."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Whole dollars ($1 or more):" }), " You can use US dollars almost everywhere, from supermarkets to tuk-tuks."] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-destructive/10 text-destructive p-3 rounded-xl text-sm font-semibold border border-destructive/20 mt-4",
					children: [
						"Very important: US dollar bills must be",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "underline",
							children: "NEW, UNDAMAGED, UNFOLDED, AND INK-FREE"
						}),
						". A Cambodian seller may reject a $100 bill because of even a tiny tear."
					]
				})
			]
		})
	},
	{
		id: "tuk-tuk",
		title: "Tuk-tuk etiquette",
		subtitle: "Agree the fare before leaving",
		icon: Compass,
		image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&q=80&w=800",
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Agree the fare before the ride, keep small notes for change, and save your hotel name in Khmer for the return trip." })
	},
	{
		id: "temples",
		title: "Temple dress code",
		subtitle: "Respectful visits to sacred places",
		icon: Compass,
		image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&q=80&w=800",
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Cover shoulders and knees at temples, remove hats where requested, and speak quietly near monks and worshippers." })
	},
	{
		id: "food",
		title: "Ordering Khmer food",
		subtitle: "A simple restaurant routine",
		icon: Compass,
		image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=800",
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
			"Start with a greeting, point politely when needed, and ask for less chilli with ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "កុំហឹរ" }),
			" (kom her)."
		] })
	},
	{
		id: "water",
		title: "Water and ice",
		subtitle: "Stay comfortable in the heat",
		icon: Compass,
		image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Choose sealed bottled water. In established cafés, factory ice is usually safe; use your own judgement in remote areas." })
	},
	{
		id: "markets",
		title: "Market manners",
		subtitle: "Shop with a smile",
		icon: Compass,
		image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=800",
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Ask the price first, bargain gently when appropriate, and walk away warmly if a price does not work for you." })
	},
	{
		id: "monks",
		title: "Meeting monks",
		subtitle: "Small gestures of respect",
		icon: Compass,
		image: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&q=80&w=800",
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Offer objects with both hands when possible. Women should avoid touching monks and can place an item on a table instead." })
	},
	{
		id: "phones",
		title: "Phone and data",
		subtitle: "Stay connected",
		icon: Compass,
		image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A local eSIM or SIM is inexpensive. Download an offline map and keep your accommodation address saved before travelling." })
	},
	{
		id: "weather",
		title: "Weather basics",
		subtitle: "Dry season and rainy season",
		icon: Compass,
		image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=800",
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Carry sun protection year-round. During the wet season, brief heavy showers are normal, so a light rain layer helps." })
	},
	{
		id: "polite",
		title: "Polite body language",
		subtitle: "Respect in everyday moments",
		icon: Compass,
		image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800",
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Avoid pointing feet at people or sacred objects. Pass items with your right hand or both hands when you can." })
	},
	{
		id: "emergency",
		title: "Useful help phrases",
		subtitle: "When you need assistance",
		icon: Compass,
		image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800",
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
			"Save ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "ជួយខ្ញុំផង" }),
			" (chuoy khnhom phong) — “Please help me” — along with your hotel contact and travel insurance details."
		] })
	},
	{
		id: "ride-apps",
		title: "Ride apps and addresses",
		subtitle: "Make pickups easier",
		icon: Compass,
		image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800",
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Place the pickup pin where the driver can stop safely, then compare the Khmer place name with the map before leaving." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Save a screenshot of your accommodation name, phone number, and Khmer address in case mobile data is unavailable." })]
		})
	},
	{
		id: "road-crossing",
		title: "Crossing busy roads",
		subtitle: "Move predictably and stay alert",
		icon: Compass,
		image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=800",
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Use a marked crossing or traffic light where one is available. Look in both directions, because vehicles may approach from an unexpected side." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Avoid stepping out from behind parked vehicles, especially after dark or during rain." })]
		})
	},
	{
		id: "checking-change",
		title: "Paying and checking change",
		subtitle: "Count calmly before leaving",
		icon: Banknote,
		image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&q=80&w=800",
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Confirm the total before paying and count your change while you are still at the counter." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Keep small riel notes separate from larger notes so everyday purchases are quicker and clearer." })]
		})
	},
	{
		id: "heat",
		title: "Heat and hydration",
		subtitle: "Plan breaks before you need them",
		icon: Compass,
		image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80&w=800",
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Carry sealed water, use shade, and schedule demanding walks for cooler parts of the day." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "If you feel dizzy or unusually weak, stop, cool down, and ask for help rather than trying to push on." })]
		})
	},
	{
		id: "laundry",
		title: "Using a laundry service",
		subtitle: "Confirm timing and special care",
		icon: Compass,
		image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&q=80&w=800",
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Ask whether the price is per item or by weight, and confirm when the clothes will be ready." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Point out delicate items, stains, or anything that must not go in a dryer before handing over the bag." })]
		})
	},
	{
		id: "home-shoes",
		title: "Shoes in homes and sacred spaces",
		subtitle: "Look for the local cue",
		icon: Users,
		image: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&q=80&w=800",
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "If shoes are lined up outside a home, room, or sacred area, remove yours before entering." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Place them neatly without blocking a doorway, and avoid stepping over someone else's belongings." })]
		})
	},
	{
		id: "photography",
		title: "Photographing people respectfully",
		subtitle: "Ask before taking a close portrait",
		icon: Users,
		image: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&q=80&w=800",
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Ask permission before photographing an identifiable person at close range, especially children, monks, workers, or worshippers." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Respect any no-photo sign and never interrupt a ceremony just to get a better angle." })]
		})
	},
	{
		id: "rural-visits",
		title: "Visiting rural communities",
		subtitle: "Travel lightly and ask first",
		icon: Users,
		image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=80&w=800",
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Stay on established paths, ask before entering private land, and carry your rubbish back out." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Buy locally when appropriate, but do not distribute gifts or photograph residents without guidance and consent." })]
		})
	},
	{
		id: "pharmacy",
		title: "Communicating at a pharmacy",
		subtitle: "Bring the medicine details",
		icon: Compass,
		image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800",
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Show the generic medicine name, dosage, allergy information, and a photo of the original packaging when possible." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "For severe symptoms, breathing difficulty, major injury, or uncertainty, seek qualified medical care instead of relying only on self-treatment." })]
		})
	},
	{
		id: "charging",
		title: "Charging phones and devices",
		subtitle: "Protect access to maps and contacts",
		icon: Compass,
		image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&q=80&w=800",
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Carry a suitable adapter and a small power bank, and charge before long travel days." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Use your own cable when possible and keep an offline copy of essential addresses, tickets, and contact numbers." })]
		})
	}
];
function KingdomInsights() {
	const [activeArticle, setActiveArticle] = (0, import_react.useState)(INSIGHTS[0]?.id ?? "");
	const { locale } = useLocale();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 pt-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-jade/10 border border-jade/20 rounded-2xl p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "font-extrabold text-jade flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "h-5 w-5" }), " Cambodia Handbook"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-2",
					children: "Essential survival and cultural tips before visiting the Kingdom of Wonder."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3",
				children: INSIGHTS.map((insight) => {
					const isActive = activeArticle === insight.id;
					const Icon = insight.icon;
					const copy = getInsightCopy(insight, locale);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveArticle(insight.id),
						className: `p-3 rounded-2xl border text-left transition-all ${isActive ? "bg-jade text-jade-foreground border-jade shadow-md scale-105" : "bg-card text-muted-foreground border-border hover:bg-secondary"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 mb-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-bold leading-tight",
							children: copy.title
						})]
					}, insight.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 animate-in slide-in-from-bottom-4 fade-in duration-300",
				children: INSIGHTS.map((insight) => {
					if (insight.id !== activeArticle) return null;
					const copy = getInsightCopy(insight, locale);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "card-flat overflow-hidden border border-border/50 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "h-40 w-full relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: insight.image,
									alt: insight.title,
									className: "w-full h-full object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-white font-extrabold text-xl leading-tight",
										children: copy.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-white/80 text-sm font-semibold mt-1",
										children: copy.subtitle
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-5 text-foreground leading-relaxed",
								children: typeof copy.content === "string" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: copy.content }) : copy.content
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PatreonSupportCard, {
								locale,
								className: "mx-5 mb-5"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-secondary/50 p-4 border-t border-border flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-bold text-muted-foreground tracking-widest uppercase flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-3.5 w-3.5" }), " Survival knowledge"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "text-sm font-bold text-jade hover:underline",
									children: "Got it"
								})]
							})
						]
					}, insight.id);
				})
			})
		]
	});
}
var ALL_CONSONANT_DRAFTS = Object.fromEntries(Object.entries({
	"ក": "TmlN73zSQ8I",
	"ខ": "M9SXYmwMBnA",
	"គ": "leHEF9DW39M",
	"ឃ": "XhQ49geiDac",
	"ង": "7yutJvZP_qE",
	"ច": "gEYW6mF0GL8",
	"ឆ": "QwQGvY-zPxc",
	"ជ": "gO0A3ZM4mAg",
	"ឈ": "gUG9hyLvyiE",
	"ញ": "Ybi4fqNkxuA",
	"ដ": "o6GqExbA9l8",
	"ឋ": "Yc_9hvMC-YE",
	"ឌ": "y6b0sFaS_do",
	"ឍ": "aK4pQvT-ojM",
	"ណ": "j5rCUd5KMGE",
	"ត": "KkS-vUOOklE",
	"ថ": "VjG8fm3olTo",
	"ទ": "dWLq-0CpfoE",
	"ធ": "Jqk9KhAZ-sk",
	"ន": "W-uArp1Shng",
	"ប": "Mv5R6hUNYXM",
	"ផ": "jDWu0mOGO9Y",
	"ព": "MhllaRsDKic",
	"ភ": "Edc5cmWuNbI",
	"ម": "bVBqvd2g4ME",
	"យ": "5sdyDJCwlso",
	"រ": "y6CvoGSYMmw",
	"ល": "2NMnFuip7AE",
	"វ": "frYfq4c4g88",
	"ស": "CbAexmmxLaM",
	"ហ": "wEx5wCvZnQ8",
	"ឡ": "GLBrRw8UGgY",
	"អ": "fB2O1aQUTJM",
	"ា": "YY_diXbrD_Q",
	"ិ": "48zP9ZPuIwo",
	"ី": "QDNdmbV9L5k",
	"ឹ": "wuFXule1s5I",
	"ឺ": "o5I3tlfu4oU",
	"ុ": "YfF9qXohAys",
	"ូ": "MRNfNt5YbG8",
	"ួ": "vpWIGNxIvWM",
	"ើ": "hWkNepbjrgw",
	"ឿ": "ZW0OuwwmxbA",
	"ៀ": "jebHyNnfHhk",
	"េ": "k-RWuUUSTGo",
	"ែ": "RodoZdbds70",
	"ៃ": "7A80F78YFMk",
	"ោ": "_vQ4Pwrah4s",
	"ៅ": "un3VeIKi194",
	"ុំ": "bNonPYLVcfA",
	"ំ": "VOBsaNKvoA4",
	"ាំ": "wyQn8iitRVw",
	"ះ": "CXe3HLcz_P4",
	"ុះ": "S_HRTB1j-qw",
	"េះ": "--Xi1uHtwcY",
	"ែះ": "gyCGzcJxIBM",
	"ោះ": "--Xi1uHtwcY",
	"ឥ": "WiGx-3jtszI",
	"ឦ": "h5z0dMnwmTE",
	"ឧ": "UySiRlCscM4",
	"ឩ": "vLQ8CIxJmsA",
	"ឪ": "x9WCQe60Y6E",
	"ឫ": "dSIXmCc1D0o",
	"ឬ": "v7tJlEQrzP8",
	"ឭ": "-Fmk4_N9FwA",
	"ឮ": "tG7An22CNpo",
	"ឯ": "sNpvR0Uuc5s",
	"ឰ": "AjiXyD-V3c8",
	"ឱ": "2JduamasQOY",
	"ឳ": "00j7IjzStlw"
}).map(([character, videoId]) => [character, {
	label: "Video-traced draft",
	videoId
}]));
function hasVideoTracedDraft(character) {
	return character in ALL_CONSONANT_DRAFTS;
}
function VideoTracedHandwritingPreview({ character }) {
	const [replayKey, setReplayKey] = (0, import_react.useState)(0);
	const draft = ALL_CONSONANT_DRAFTS[character];
	if (!draft) return null;
	const replay = () => setReplayKey((value) => value + 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto grid aspect-square w-full max-w-sm place-items-center overflow-hidden rounded-2xl border-2 border-gold/30 bg-[#fffdf5]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PracticeGrid$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: `/writing-video-drafts/${draft.videoId}/animation.webp?v=3`,
					alt: "",
					className: `z-10 absolute bottom-[25%] h-[70%] w-[70%] object-contain`
				}, replayKey)]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: replay,
				className: "flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-3 py-3 text-xs font-extrabold text-gold-foreground hover:opacity-90",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" }), " Replay writing animation"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-center text-[11px] leading-4 text-muted-foreground",
				children: [
					"Draft from supplied video ",
					draft.videoId,
					" · owner review required before publishing."
				]
			})
		]
	});
}
function PracticeGrid$1() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 top-[12%] h-px bg-[#b9a36c]" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 top-[31%] h-px bg-[#d8c89e]" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 top-1/2 h-px bg-[#b9a36c]" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 top-[69%] h-px bg-[#d8c89e]" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 top-[88%] h-px bg-[#b9a36c]" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-y-0 left-1/2 w-px border-l border-dashed border-[#d8c89e]" })
	] });
}
var LETTERS = [
	{
		char: "ក",
		name: "Kâ",
		family: "A series",
		cue: "Begin at the marked start. Trace the main body before the finishing detail.",
		guide: "body"
	},
	{
		char: "ខ",
		name: "Khâ",
		family: "A series",
		cue: "Start high, keep the curve smooth, then complete the lower form.",
		guide: "curve"
	},
	{
		char: "គ",
		name: "Kô",
		family: "O series",
		cue: "Trace the main body first. Keep the lower hook inside the square.",
		guide: "body"
	},
	{
		char: "ឃ",
		name: "Khô",
		family: "O series",
		cue: "Follow the large curve slowly, then add the finishing detail.",
		guide: "curve"
	},
	{
		char: "ង",
		name: "Ngô",
		family: "O series",
		cue: "Make one relaxed curve at a time; do not rush the final turn.",
		guide: "loop"
	},
	{
		char: "ច",
		name: "Châ",
		family: "A series",
		cue: "Start at the top marker and keep the body centred on the grid.",
		guide: "body"
	},
	{
		char: "ឆ",
		name: "Chhâ",
		family: "A series",
		cue: "Draw the outer curve first, then finish the inner detail.",
		guide: "curve"
	},
	{
		char: "ជ",
		name: "Chô",
		family: "O series",
		cue: "Use a calm, continuous motion through the centre of the square.",
		guide: "loop"
	},
	{
		char: "ឈ",
		name: "Chhô",
		family: "O series",
		cue: "Start high and let the lower curve sit above the baseline.",
		guide: "curve"
	},
	{
		char: "ញ",
		name: "Nhô",
		family: "O series",
		cue: "Keep the loops open and leave space around the edges.",
		guide: "loop"
	},
	{
		char: "ដ",
		name: "Dâ",
		family: "A series",
		cue: "Make the main body first, then add the small finishing stroke.",
		guide: "body"
	},
	{
		char: "ឋ",
		name: "Thâ",
		family: "A series",
		cue: "Follow the curve from the start marker and finish neatly at the base.",
		guide: "curve"
	},
	{
		char: "ឌ",
		name: "Dô",
		family: "O series",
		cue: "Keep a steady speed through the central curve.",
		guide: "loop"
	},
	{
		char: "ឍ",
		name: "Thô",
		family: "O series",
		cue: "Use the grid to keep the letter tall and balanced.",
		guide: "curve"
	},
	{
		char: "ណ",
		name: "Nâ",
		family: "A series",
		cue: "Start at the dot and keep the final turn inside the box.",
		guide: "loop"
	},
	{
		char: "ត",
		name: "Tâ",
		family: "A series",
		cue: "Trace the tall body first; finish with a light final detail.",
		guide: "body"
	},
	{
		char: "ថ",
		name: "Thâ",
		family: "A series",
		cue: "Move from the start dot in one controlled curve.",
		guide: "curve"
	},
	{
		char: "ទ",
		name: "Tô",
		family: "O series",
		cue: "Keep the shape open and centred before you finish the stroke.",
		guide: "loop"
	},
	{
		char: "ធ",
		name: "Thô",
		family: "O series",
		cue: "Follow the guide slowly and leave space for the lower form.",
		guide: "curve"
	},
	{
		char: "ន",
		name: "Nô",
		family: "O series",
		cue: "Trace the body with a gentle turn rather than sharp corners.",
		guide: "loop"
	},
	{
		char: "ប",
		name: "Bâ",
		family: "A series",
		cue: "Begin with the larger body and add the final detail afterward.",
		guide: "body"
	},
	{
		char: "ផ",
		name: "Phâ",
		family: "A series",
		cue: "Keep the top curve smooth and finish close to the baseline.",
		guide: "curve"
	},
	{
		char: "ព",
		name: "Pô",
		family: "O series",
		cue: "Use the square as a guide; keep the letter from leaning right.",
		guide: "body"
	},
	{
		char: "ភ",
		name: "Phô",
		family: "O series",
		cue: "Make the outer shape first and complete the inner curve last.",
		guide: "curve"
	},
	{
		char: "ម",
		name: "Mô",
		family: "O series",
		cue: "Slow down at the lower loop and finish with a clean lift.",
		guide: "loop"
	},
	{
		char: "យ",
		name: "Yô",
		family: "O series",
		cue: "Keep the main body light and follow the guide through the centre.",
		guide: "body"
	},
	{
		char: "រ",
		name: "Rô",
		family: "O series",
		cue: "Start at the dot and keep the letter compact inside the grid.",
		guide: "curve"
	},
	{
		char: "ល",
		name: "Lô",
		family: "O series",
		cue: "Make a smooth body, then finish the lower turn without lifting early.",
		guide: "loop"
	},
	{
		char: "វ",
		name: "Vô",
		family: "O series",
		cue: "Trace from top to bottom and keep the final detail small.",
		guide: "body"
	},
	{
		char: "ស",
		name: "Sâ",
		family: "A series",
		cue: "Follow the curve from the start marker; keep the shape rounded.",
		guide: "curve"
	},
	{
		char: "ហ",
		name: "Hâ",
		family: "A series",
		cue: "Keep the body broad, then add the final detail carefully.",
		guide: "body"
	},
	{
		char: "ឡ",
		name: "Lâ",
		family: "A series",
		cue: "Use a slow loop and return to the baseline before lifting.",
		guide: "loop"
	},
	{
		char: "អ",
		name: "Â",
		family: "A series",
		cue: "Trace the main body at a steady pace and finish inside the square.",
		guide: "body"
	}
];
var EXTRA_ITEMS = {
	vowels: LEVEL_4_DEPENDENT_VOWELS.map((item) => ({
		char: item.khmer,
		name: item.latin,
		family: "O series",
		cue: "Write the vowel sign in its correct position around an imaginary base consonant.",
		guide: "curve"
	})),
	independent: LEVEL_5_INDEPENDENT_VOWELS.map((item) => ({
		char: item.khmer,
		name: item.latin,
		family: "O series",
		cue: "Keep the full independent-vowel form inside the writing lines.",
		guide: "body"
	})),
	numbers: LEVEL_6_NUMERALS.slice(0, 10).map((item) => ({
		char: item.khmer,
		name: item.latin,
		family: "O series",
		cue: "Trace the Khmer numeral, then write it again without the pale model.",
		guide: "loop"
	}))
};
var WRITING_GROUPS = [
	{
		id: "o-consonants",
		label: "O consonants (15)",
		sourcePage: 13
	},
	{
		id: "oo-consonants",
		label: "Ô consonants (18)",
		sourcePage: 13
	},
	{
		id: "vowels",
		label: "Vowel signs",
		sourcePage: 16
	},
	{
		id: "independent",
		label: "Independent vowels",
		sourcePage: 106
	},
	{
		id: "numbers",
		label: "Khmer numbers",
		sourcePage: 118
	}
];
function itemsForGroup(group) {
	if (group === "o-consonants") return LETTERS.filter((letter) => letter.family === "A series");
	if (group === "oo-consonants") return LETTERS.filter((letter) => letter.family === "O series");
	return EXTRA_ITEMS[group];
}
function getPoint(event, canvas) {
	const bounds = canvas.getBoundingClientRect();
	return {
		x: (event.clientX - bounds.left) * (canvas.width / bounds.width),
		y: (event.clientY - bounds.top) * (canvas.height / bounds.height)
	};
}
function StrokeOrderDrawing() {
	const { locale } = useLocale();
	const [activeGroup, setActiveGroup] = (0, import_react.useState)("o-consonants");
	const [letterIndex, setLetterIndex] = (0, import_react.useState)(0);
	const [practiceTab, setPracticeTab] = (0, import_react.useState)("model");
	const [isDrawing, setIsDrawing] = (0, import_react.useState)(false);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [showModel, setShowModel] = (0, import_react.useState)(true);
	const canvasRef = (0, import_react.useRef)(null);
	const activeItems = itemsForGroup(activeGroup);
	const letter = activeItems[letterIndex] ?? activeItems[0] ?? LETTERS[0];
	const groupInfo = WRITING_GROUPS.find((group) => group.id === activeGroup) ?? WRITING_GROUPS[0];
	const clearCanvas = () => {
		const canvas = canvasRef.current;
		const context = canvas?.getContext("2d");
		if (canvas && context) context.clearRect(0, 0, canvas.width, canvas.height);
		setSaved(false);
	};
	(0, import_react.useEffect)(() => clearCanvas(), [letterIndex]);
	const begin = (event) => {
		const canvas = canvasRef.current;
		const context = canvas?.getContext("2d");
		if (!canvas || !context) return;
		const point = getPoint(event, canvas);
		canvas.setPointerCapture(event.pointerId);
		context.lineCap = "round";
		context.lineJoin = "round";
		context.lineWidth = Math.max(8, canvas.width * .035);
		context.strokeStyle = "#b7791f";
		context.beginPath();
		context.moveTo(point.x, point.y);
		setIsDrawing(true);
	};
	const draw = (event) => {
		if (!isDrawing) return;
		const canvas = canvasRef.current;
		const context = canvas?.getContext("2d");
		if (!canvas || !context) return;
		const point = getPoint(event, canvas);
		context.lineTo(point.x, point.y);
		context.stroke();
	};
	const end = () => {
		setIsDrawing(false);
		canvasRef.current?.getContext("2d")?.beginPath();
	};
	const changeLetter = (nextIndex) => {
		setLetterIndex((nextIndex + activeItems.length) % activeItems.length);
		setSaved(false);
		setShowModel(true);
		setPracticeTab("model");
	};
	const savePractice = () => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const link = document.createElement("a");
		link.download = `salakhmer-practice-${letter.char}.png`;
		link.href = canvas.toDataURL("image/png");
		link.click();
		setSaved(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-4 pt-2",
		"aria-label": "Khmer handwriting practice",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[24px] bg-[#173B33] p-5 text-white shadow-[0_12px_26px_rgba(23,59,51,.15)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "flex items-center gap-2 font-extrabold text-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-9 w-9 place-items-center rounded-xl bg-[#F7B733] text-[#173B33]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenTool, { className: "h-5 w-5" })
					}), " Khmer writing practice"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-5 text-[#C7DDD6]",
					children: "Trace the pale letter inside the grid. Use one finger on a phone or a mouse on computer."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2 sm:grid-cols-5",
				"aria-label": "Choose a writing group",
				children: WRITING_GROUPS.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setActiveGroup(group.id);
						setLetterIndex(0);
						setSaved(false);
						setPracticeTab("model");
					},
					className: `rounded-xl border px-3 py-2 text-xs font-extrabold transition ${activeGroup === group.id ? "border-gold bg-gold text-gold-foreground" : "border-border bg-card hover:border-gold/50"}`,
					children: group.label
				}, group.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 overflow-x-auto pb-1",
				"aria-label": "Choose a Khmer writing item",
				children: activeItems.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => changeLetter(index),
					className: `khmer h-11 min-w-11 rounded-xl border text-2xl font-bold transition ${index === letterIndex ? "border-gold bg-gold text-gold-foreground shadow-sm" : "border-border bg-card text-foreground hover:border-gold/50"}`,
					"aria-label": `Practice ${item.name}`,
					children: item.char
				}, item.char))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[28px] border border-[#E5E6E0] bg-white p-4 shadow-[0_10px_24px_rgba(23,59,51,.07)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => changeLetter(letterIndex - 1),
								className: "rounded-xl border border-border p-2 hover:bg-secondary",
								"aria-label": "Previous letter",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "khmer text-5xl font-bold leading-none",
										children: letter.char
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm font-bold",
										children: letter.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
										children: ["Reference writing page ", groupInfo.sourcePage]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => changeLetter(letterIndex + 1),
								className: "rounded-xl border border-border p-2 hover:bg-secondary",
								"aria-label": "Next letter",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-5 w-5" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 grid grid-cols-2 overflow-hidden rounded-xl border border-gold/25 bg-[#fffaf1] p-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setPracticeTab("model"),
							className: `rounded-lg px-3 py-2 text-sm font-extrabold transition ${practiceTab === "model" ? "bg-gold text-gold-foreground shadow-sm" : "text-muted-foreground"}`,
							children: "Model"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setPracticeTab("draw"),
							className: `rounded-lg px-3 py-2 text-sm font-extrabold transition ${practiceTab === "draw" ? "bg-gold text-gold-foreground shadow-sm" : "text-muted-foreground"}`,
							children: "Write"
						})]
					}),
					practiceTab === "model" ? hasVideoTracedDraft(letter.char) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoTracedHandwritingPreview, { character: letter.char }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto grid aspect-square w-full max-w-sm place-items-center overflow-hidden rounded-2xl border-2 border-gold/30 bg-[#fffdf5]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PracticeGrid, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative z-10 px-5 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "khmer text-[14rem] leading-none text-[#47382B]",
									children: letter.char
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm font-bold text-muted-foreground",
									children: "Writing-direction model is being reviewed."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs leading-5 text-muted-foreground",
									children: "Use the Write tab to practise the letter shape for now."
								})
							]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl border-2 border-gold/30 bg-[#fffdf5]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PracticeGrid, {}),
							showModel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pointer-events-none absolute inset-0 flex items-center justify-center select-none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "khmer -mt-2 text-[13rem] leading-none text-slate-700/10",
									children: letter.char
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
								ref: canvasRef,
								width: "720",
								height: "720",
								className: "relative z-10 h-full w-full touch-none cursor-crosshair",
								onPointerDown: begin,
								onPointerMove: draw,
								onPointerUp: end,
								onPointerCancel: end,
								onPointerLeave: end,
								"aria-label": `Trace the Khmer letter ${letter.char}`
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 rounded-2xl border border-[#DDEBE5] bg-[#F0F8F5] p-4 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-extrabold text-foreground",
							children: practiceTab === "draw" ? "Trace the pale model, then hide it and write again." : "Open Write when you are ready to trace this letter."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-muted-foreground",
							children: practiceTab === "draw" ? "This is a free-hand practice board for finger, stylus, or mouse." : "Stroke directions will be added only after each letter is reviewed from its own source reference."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid grid-cols-3 gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: clearCanvas,
								className: "flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-3 py-3 text-xs font-extrabold hover:bg-secondary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" }), " Clear"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setShowModel((value) => !value),
								disabled: practiceTab !== "draw",
								className: "flex items-center justify-center gap-1 rounded-xl border border-gold/35 bg-gold/10 px-3 py-3 text-xs font-extrabold text-gold hover:bg-gold/20 disabled:opacity-40",
								children: [showModel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" }), showModel ? "Hide model" : "Show model"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: savePractice,
								disabled: practiceTab !== "draw",
								className: "flex items-center justify-center gap-1 rounded-xl bg-gold px-3 py-3 text-xs font-extrabold text-gold-foreground hover:opacity-90 disabled:opacity-40",
								children: [saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), saved ? "Saved" : "Save practice"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PatreonSupportCard, {
						locale,
						className: "mt-5"
					})
				]
			})
		]
	});
}
function PracticeGrid() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 top-[12%] h-px bg-[#b9a36c]" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 top-[31%] h-px bg-[#d8c89e]" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 top-1/2 h-px bg-[#b9a36c]" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 top-[69%] h-px bg-[#d8c89e]" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 top-[88%] h-px bg-[#b9a36c]" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-y-0 left-1/2 w-px border-l border-dashed border-[#d8c89e]" })
	] });
}
var apiBase = "https://salakhmer-cms-api.oliverkhang.workers.dev".replace(/\/$/, "");
/**
* The learner app always asks the Worker for the active locale. The Worker
* resolves a saved translation and falls back to canonical English, so a
* missing translation never creates a blank lesson card.
*/
async function getPublishedModuleContent(moduleId, locale) {
	if (!apiBase) return [];
	const params = new URLSearchParams({
		moduleId,
		locale
	});
	const response = await fetch(`${apiBase}/api/content?${params.toString()}`);
	if (!response.ok) throw new Error("Published content could not be loaded.");
	return (await response.json()).items ?? [];
}
var scriptLessons = [
	"alpha-l1",
	"alpha-l2",
	"alpha-l3",
	"alpha-l4",
	"alpha-l5",
	"alpha-l6"
];
var SCRIPT_LESSON_COPY = {
	en: [
		["Level 1: A-series consonants", "Hear, recognise, and practise the first consonant series."],
		["Level 2: O-series consonants", "Hear, recognise, and practise the second consonant series."],
		["Level 3: Sub-consonants", "Learn the smaller consonant forms used in Khmer word building."],
		["Level 4: Dependent vowels", "Hear each vowel in both A-series and O-series contexts."],
		["Level 5: Independent vowels", "Recognise the vowels that stand on their own."],
		["Level 6: Khmer numbers", "Read Khmer numerals from everyday counting to larger amounts."]
	],
	vi: [
		["Cấp 1: Phụ âm giọng A", "Nghe, nhận biết và luyện nhóm phụ âm đầu tiên."],
		["Cấp 2: Phụ âm giọng O", "Nghe, nhận biết và luyện nhóm phụ âm thứ hai."],
		["Cấp 3: Phụ âm chân", "Học dạng phụ âm nhỏ dùng khi ghép từ Khmer."],
		["Cấp 4: Nguyên âm phụ thuộc", "Nghe từng nguyên âm trong cả ngữ cảnh giọng A và O."],
		["Cấp 5: Nguyên âm độc lập", "Nhận biết các nguyên âm có thể đứng riêng."],
		["Cấp 6: Số Khmer", "Đọc số Khmer từ đếm hằng ngày đến số lớn."]
	],
	zh: [
		["第 1 级：A 系辅音", "聆听、辨认并练习第一组辅音。"],
		["第 2 级：O 系辅音", "聆听、辨认并练习第二组辅音。"],
		["第 3 级：下标辅音", "学习构词时使用的小辅音形式。"],
		["第 4 级：附属元音", "在 A 系和 O 系语境中聆听每个元音。"],
		["第 5 级：独立元音", "认识能够独立使用的元音。"],
		["第 6 级：高棉数字", "从日常计数到较大数额阅读高棉数字。"]
	],
	fr: [
		["Niveau 1 : consonnes de série A", "Écoutez, reconnaissez et pratiquez la première série de consonnes."],
		["Niveau 2 : consonnes de série O", "Écoutez, reconnaissez et pratiquez la deuxième série de consonnes."],
		["Niveau 3 : consonnes souscrites", "Apprenez les petites formes de consonnes utilisées pour former des mots."],
		["Niveau 4 : voyelles dépendantes", "Écoutez chaque voyelle dans les contextes des séries A et O."],
		["Niveau 5 : voyelles indépendantes", "Reconnaissez les voyelles qui peuvent s’employer seules."],
		["Niveau 6 : nombres khmers", "Lisez les chiffres khmers, du comptage quotidien aux grands nombres."]
	]
};
function CategoryPage() {
	const { categoryId } = Route$3.useParams();
	const navigate = useNavigate();
	const { user, firebaseUser } = useAuth();
	const { locale, t, tr } = useLocale();
	const [publishedContent, setPublishedContent] = (0, import_react.useState)([]);
	const module = LOVABLE_MODULES.find((item) => item.id === categoryId);
	if (!module) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LovableScreen, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-6",
		children: "This module does not exist."
	}) });
	const catId = categoryId;
	const lessons = (catId === "module_1" ? scriptLessons.map((id, index) => ({
		id,
		title: SCRIPT_LESSON_COPY[locale][index][0],
		description: SCRIPT_LESSON_COPY[locale][index][1]
	})) : MOCK_LESSONS[catId] ?? []).map((lesson) => localizeLegacyLesson(lesson, locale));
	const complete = lessons.filter((lesson) => user.completedLessons.includes(lesson.id)).length;
	const percent = lessons.length ? Math.round(complete / lessons.length * 100) : 0;
	const access = hasFullLessonTestAccess(firebaseUser?.email ?? user.email) || isCategoryAccessible(user.role, catId);
	const Icon = module.icon;
	const moduleCopy = getLocalizedModuleCopy(module.id, locale);
	(0, import_react.useEffect)(() => {
		let active = true;
		getPublishedModuleContent(categoryId, locale).then((items) => {
			if (active) setPublishedContent(items);
		}).catch(() => {
			if (active) setPublishedContent([]);
		});
		return () => {
			active = false;
		};
	}, [categoryId, locale]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LovableScreen, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center gap-3 px-5 pt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => navigate({ to: "/learn" }),
				className: "grid h-10 w-10 place-items-center rounded-2xl border border-[#D8E6E3] bg-[#EAF6F2] text-[#0B8B76]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[14px] font-black text-[#64766E]",
				children: t("allModules")
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative mx-5 mt-5 overflow-hidden rounded-[27px] bg-[#173B33] px-5 pb-5 pt-5 text-white",
			children: [module.art && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: module.art,
				alt: "",
				"aria-hidden": "true",
				className: "pointer-events-none absolute -bottom-4 right-2 h-[170px] w-[132px] object-contain object-bottom opacity-95"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: module.art ? "relative z-10 max-w-[64%]" : "relative z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-12 w-12 place-items-center rounded-[16px] bg-[#F7B733] text-[#173B33]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-6 w-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 text-[28px] font-black tracking-[-.04em]",
						children: moduleCopy.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-[14px] leading-5 text-[#C7DDD6]",
						children: [
							moduleCopy.subtitle,
							". ",
							t("moduleIntro")
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 h-2 overflow-hidden rounded-full bg-white/15",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-[#F7B733]",
							style: { width: `${percent}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-[12.5px] font-bold text-[#C7DDD6]",
						children: [
							complete,
							" of ",
							lessons.length,
							" ",
							t("lessonsCompleted")
						]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "px-5 pt-8",
			children: [!access && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[18px] border border-[#E5D5BC] bg-[#FFF8E8] p-5 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "mx-auto h-6 w-6 text-[#A9631E]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-semibold",
						children: t("signInUnlockModule")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						search: { redirect: `/category/${catId}` },
						className: "mt-4 block rounded-[14px] bg-[#D98624] py-3 text-sm font-semibold text-white",
						children: t("signInCreate")
					})
				]
			}), access && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				catId !== "module_1" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LovableSectionTitle, {
					title: t("lessons"),
					note: t("audioIncluded")
				}),
				catId === "module_1" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlphabetGrid, {})
				}),
				catId === "module_2" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-6 grid grid-cols-2 gap-3",
					children: READ_SPELL_TOPICS.map((topic) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/read-spell/$topicId",
						params: { topicId: topic.topic_id },
						className: "min-h-[116px] rounded-[20px] border border-[#E4D7C5] bg-[#FFFCF7] p-4 shadow-[0_2px_5px_rgba(71,56,43,.05)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopicCover, {
									topicId: topic.topic_id,
									label: getLocalizedReadSpellTopic(topic, locale).title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-8 w-8 place-items-center rounded-full bg-[#F9E8BF] text-xs font-bold text-[#A9631E]",
									children: topic.topic_order
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "mt-3 block text-[14px] leading-5",
								children: getLocalizedReadSpellTopic(topic, locale).title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
								className: "mt-1 block text-[11px] text-[#786858]",
								children: ["15 ", tr("topicWords")]
							})
						]
					}, topic.topic_id))
				}) }),
				catId === "module_4" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StrokeOrderDrawing, {})
				}),
				catId === "module_6" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KingdomInsights, {})
				}),
				catId !== "module_1" && catId !== "module_4" && publishedContent.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LovableSectionTitle, {
						title: locale === "vi" ? "Nội dung đã xuất bản" : "Published updates",
						note: `${publishedContent.length}`
					}), publishedContent.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-[18px] border border-[#B9DDD5] bg-[#F1FAF7] p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] font-bold uppercase tracking-[.1em] text-[#167C70]",
								children: item.type
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 text-[16px] font-bold",
								children: localizeLegacyText(item.title, locale)
							}),
							item.summary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-[13px] leading-5 text-[#58726F]",
								children: localizeLegacyText(item.summary, locale)
							})
						]
					}, item.id))]
				}),
				catId !== "module_1" && catId !== "module_2" && catId !== "module_4" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-3",
					children: lessons.map((lesson, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonRow, {
						index: index + 1,
						lesson,
						complete: user.completedLessons.includes(lesson.id),
						moduleId: catId
					}, lesson.id))
				})
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LongPageNav, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LovableBottomNav, {})
	] });
}
function LessonRow({ index, lesson, complete, moduleId }) {
	const isScript = lesson.id.startsWith("alpha-");
	const icon = moduleId === "module_3" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Headphones, { className: "h-5 w-5" }) : moduleId === "module_4" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "h-5 w-5" }) : moduleId === "module_1" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Type, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-5 w-5" });
	isScript ? `${lesson.id}` : `${lesson.id}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: isScript ? "/grid-lesson/$lessonId" : "/lesson/$lessonId",
		params: { lessonId: lesson.id },
		search: isScript ? void 0 : { activity: 0 },
		className: "flex min-h-[82px] items-center gap-4 rounded-[22px] border border-[#E5E6E0] bg-white p-4 shadow-[0_7px_18px_rgba(23,59,51,.06)] transition active:scale-[.99]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#E7F2EE] text-sm font-black text-[#0B8B76]",
				children: complete ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) : index
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "block text-[15px]",
					children: lesson.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
					className: "mt-1 block truncate text-[12px] text-[#786858]",
					children: lesson.description
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[#0B8B76]",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-[#A99B8C]" })
		]
	});
}
//#endregion
export { CategoryPage as component };

import type { Locale } from "@/lib/i18n";
import type { ReadSpellTopic, ReadSpellWord } from "@/lib/read-spell-catalog";

type LocalizedFields = Partial<Record<Locale, { title?: string; description?: string; meaning?: string; example?: string }>>;

// Learner-facing language data lives outside the generated Khmer catalog. This
// makes regeneration safe: generated IDs stay stable while translators edit one
// reviewed file rather than source components or `*_en` fields.
const TOPIC_TRANSLATIONS: Record<string, LocalizedFields> = {
  "topic-colors": { vi: { title: "Màu sắc", description: "Màu sắc thường gặp" }, zh: { title: "颜色", description: "常见颜色" }, fr: { title: "Les couleurs", description: "Couleurs courantes" } },
  "topic-numbers": { vi: { title: "Số từ 1–20", description: "Số cơ bản dùng hằng ngày" }, zh: { title: "数字 1–20", description: "日常基础数字" }, fr: { title: "Les nombres 1–20", description: "Nombres utiles au quotidien" } },
  "topic-family": { vi: { title: "Gia đình", description: "Từ vựng về người thân" }, zh: { title: "家人", description: "家庭成员词汇" }, fr: { title: "La famille", description: "Vocabulaire de la famille" } },
  "topic-greetings": { vi: { title: "Chào hỏi và lịch sự", description: "Những từ dùng khi gặp gỡ" }, zh: { title: "问候与礼貌用语", description: "见面时常用的词" }, fr: { title: "Salutations et politesse", description: "Mots utiles pour se rencontrer" } },
  "topic-food": { vi: { title: "Đồ ăn", description: "Từ vựng đồ ăn hằng ngày" }, zh: { title: "食物", description: "日常食物词汇" }, fr: { title: "La nourriture", description: "Vocabulaire des aliments" } },
  "topic-drinks": { vi: { title: "Đồ uống", description: "Đồ uống thường gặp" }, zh: { title: "饮料", description: "常见饮料" }, fr: { title: "Les boissons", description: "Boissons courantes" } },
  "topic-fruit": { vi: { title: "Trái cây", description: "Trái cây phổ biến ở chợ" }, zh: { title: "水果", description: "市场常见水果" }, fr: { title: "Les fruits", description: "Fruits courants au marché" } },
  "topic-animals": { vi: { title: "Động vật", description: "Tên động vật thông dụng" }, zh: { title: "动物", description: "常见动物名称" }, fr: { title: "Les animaux", description: "Noms d'animaux courants" } },
  "topic-body-parts": { vi: { title: "Bộ phận cơ thể", description: "Từ vựng cơ thể cơ bản" }, zh: { title: "身体部位", description: "基础身体词汇" }, fr: { title: "Les parties du corps", description: "Vocabulaire du corps" } },
  "topic-clothes": { vi: { title: "Quần áo", description: "Trang phục hằng ngày" }, zh: { title: "衣物", description: "日常穿着" }, fr: { title: "Les vêtements", description: "Tenues de tous les jours" } },
  "topic-home-furniture": { vi: { title: "Nhà và nội thất", description: "Đồ vật trong nhà" }, zh: { title: "家与家具", description: "家里的物品" }, fr: { title: "La maison et les meubles", description: "Objets de la maison" } },
  "topic-school-study": { vi: { title: "Trường học và học tập", description: "Từ vựng lớp học" }, zh: { title: "学校与学习", description: "课堂词汇" }, fr: { title: "L'école et les études", description: "Vocabulaire de la classe" } },
  "topic-places-in-town": { vi: { title: "Địa điểm trong thành phố", description: "Nơi chốn hằng ngày" }, zh: { title: "城里的地点", description: "日常地点" }, fr: { title: "Les lieux en ville", description: "Lieux du quotidien" } },
  "topic-transport": { vi: { title: "Phương tiện", description: "Cách di chuyển" }, zh: { title: "交通", description: "出行方式" }, fr: { title: "Les transports", description: "Se déplacer" } },
  "topic-weather": { vi: { title: "Thời tiết", description: "Nói về thời tiết" }, zh: { title: "天气", description: "谈论天气" }, fr: { title: "La météo", description: "Parler du temps" } },
  "topic-time-days": { vi: { title: "Thời gian và ngày", description: "Từ chỉ thời gian" }, zh: { title: "时间与日期", description: "时间词汇" }, fr: { title: "Le temps et les jours", description: "Mots du temps" } },
  "topic-jobs": { vi: { title: "Nghề nghiệp", description: "Công việc và vai trò" }, zh: { title: "职业", description: "工作与角色" }, fr: { title: "Les métiers", description: "Travail et rôles" } },
  "topic-common-actions": { vi: { title: "Hành động thường dùng", description: "Động từ thực tế" }, zh: { title: "常用动作", description: "实用动词" }, fr: { title: "Actions courantes", description: "Verbes pratiques" } },
  "topic-shopping": { vi: { title: "Mua sắm", description: "Từ dùng khi mua hàng" }, zh: { title: "购物", description: "买东西时的用词" }, fr: { title: "Les achats", description: "Mots pour faire des achats" } },
  "topic-nature": { vi: { title: "Thiên nhiên", description: "Cảnh vật và thế giới tự nhiên" }, zh: { title: "自然", description: "自然世界词汇" }, fr: { title: "La nature", description: "Le monde naturel" } },
  "topic-directions-location": { vi: { title: "Phương hướng và vị trí", description: "Tìm địa điểm và hiểu chỉ đường đơn giản" }, zh: { title: "方向与位置", description: "寻找地点并理解简单指路" }, fr: { title: "Directions et positions", description: "Trouver un lieu et comprendre des indications simples" } },
  "topic-health-symptoms": { vi: { title: "Sức khỏe và triệu chứng", description: "Mô tả triệu chứng thường gặp và nhu cầu sức khỏe cơ bản" }, zh: { title: "健康与症状", description: "描述常见症状和基本健康需求" }, fr: { title: "Santé et symptômes", description: "Décrire des symptômes courants et des besoins de santé" } },
  "topic-feelings-emotions": { vi: { title: "Cảm xúc và tâm trạng", description: "Nói về cảm xúc và phản ứng cá nhân" }, zh: { title: "感受与情绪", description: "谈论心情、感受和个人反应" }, fr: { title: "Sentiments et émotions", description: "Parler des humeurs et des réactions personnelles" } },
  "topic-daily-routine": { vi: { title: "Thói quen hằng ngày", description: "Đọc các cụm từ từ buổi sáng đến giờ đi ngủ" }, zh: { title: "日常作息", description: "阅读从早晨到睡前的实用表达" }, fr: { title: "Routine quotidienne", description: "Lire des expressions utiles du matin au coucher" } },
  "topic-kitchen-cooking": { vi: { title: "Nhà bếp và nấu ăn", description: "Động tác, dụng cụ và hướng dẫn nấu ăn cơ bản" }, zh: { title: "厨房与烹饪", description: "学习烹饪动作、厨具和基本指令" }, fr: { title: "Cuisine et préparation", description: "Actions, ustensiles et consignes de cuisine" } },
  "topic-travel-accommodation": { vi: { title: "Du lịch và lưu trú", description: "Từ hữu ích cho hành trình, khách sạn và vé" }, zh: { title: "旅行与住宿", description: "旅程、酒店、票务和入住常用词" }, fr: { title: "Voyage et hébergement", description: "Mots utiles pour les trajets, hôtels et billets" } },
  "topic-technology-communication": { vi: { title: "Công nghệ và liên lạc", description: "Điện thoại, Internet, tin nhắn và thiết bị" }, zh: { title: "科技与通信", description: "手机、网络、信息和设备词汇" }, fr: { title: "Technologie et communication", description: "Téléphones, Internet, messages et appareils" } },
  "topic-personal-care": { vi: { title: "Chăm sóc cá nhân", description: "Từ thực tế về vệ sinh và chăm sóc cơ thể" }, zh: { title: "个人护理", description: "清洁、梳洗和个人护理实用词" }, fr: { title: "Soins personnels", description: "Vocabulaire pratique de l'hygiène" } },
  "topic-emergency-safety": { vi: { title: "Khẩn cấp và an toàn", description: "Nhận biết từ khẩn cấp và yêu cầu giúp đỡ" }, zh: { title: "紧急情况与安全", description: "识别紧急用语并寻求帮助" }, fr: { title: "Urgences et sécurité", description: "Reconnaître les mots urgents et demander de l'aide" } },
  "topic-services-documents": { vi: { title: "Dịch vụ và giấy tờ", description: "Biểu mẫu, lịch hẹn, nhận dạng và dịch vụ công" }, zh: { title: "服务与证件", description: "表格、预约、身份证明和公共服务" }, fr: { title: "Services et documents", description: "Formulaires, rendez-vous, identité et services publics" } },
};

// Deliberately sparse at first: a translation is shown only when it has been
// reviewed. The English meaning remains a reliable fallback for learners.
// Add complete word translations by stable `word.id`, never by display text.
const WORD_TRANSLATIONS: Record<string, LocalizedFields> = {
  "rs-colors-001": { vi: { meaning: "Đỏ", example: "Chiếc áo này màu đỏ." }, zh: { meaning: "红色", example: "这件衬衫是红色的。" }, fr: { meaning: "Rouge", example: "Cette chemise est rouge." } },
  "rs-colors-002": { vi: { meaning: "Xanh dương", example: "Bầu trời màu xanh dương." }, zh: { meaning: "蓝色", example: "天空是蓝色的。" }, fr: { meaning: "Bleu", example: "Le ciel est bleu." } },
  "rs-colors-003": { vi: { meaning: "Vàng", example: "Quả chuối màu vàng." }, zh: { meaning: "黄色", example: "这根香蕉是黄色的。" }, fr: { meaning: "Jaune", example: "Cette banane est jaune." } },
  "rs-fruit-001": { vi: { meaning: "Chuối" }, zh: { meaning: "香蕉" }, fr: { meaning: "Banane" } },
  "rs-fruit-002": { vi: { meaning: "Xoài" }, zh: { meaning: "芒果" }, fr: { meaning: "Mangue" } },
  "rs-fruit-003": { vi: { meaning: "Dừa" }, zh: { meaning: "椰子" }, fr: { meaning: "Noix de coco" } },
};

function fieldsFor(id: string, locale: Locale, fallback: { title?: string; description?: string; meaning?: string; example?: string }) {
  if (locale === "en") return fallback;
  return { ...fallback, ...(TOPIC_TRANSLATIONS[id]?.[locale] ?? WORD_TRANSLATIONS[id]?.[locale] ?? {}) };
}

export function getLocalizedReadSpellTopic(topic: ReadSpellTopic, locale: Locale) {
  return fieldsFor(topic.topic_id, locale, { title: topic.topic_name_en, description: topic.topic_description_en });
}

export function getLocalizedReadSpellWord(word: ReadSpellWord, locale: Locale) {
  return fieldsFor(word.id, locale, { meaning: word.english_translation, example: word.example_english });
}

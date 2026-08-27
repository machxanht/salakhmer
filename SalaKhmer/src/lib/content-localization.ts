import type { Locale } from "@/lib/i18n";
import { EXPANDED_VI_TEXT } from "@/lib/module-content-expansion";

type LessonDisplay = { id: string; categoryId?: string; title: string; description: string };

const viText: Record<string, string> = {
  "15 picture words": "15 từ có hình minh họa",
  "Published updates": "Nội dung đã xuất bản",
  "Khmer Sala": "SalaKhmer",
  "A five-line everyday Khmer conversation. Listen line by line.": "Hội thoại Khmer đời thường gồm năm câu. Nghe từng câu.",
  "Hear, recognise, and practise the next script group.": "Nghe, nhận biết và luyện tập nhóm chữ tiếp theo.",
  "Study the letter form, trace it slowly, then write it in the practice box.": "Quan sát dạng chữ, tô chậm theo mẫu rồi viết vào ô luyện tập.",
  "Quickly assess Khmer vocabulary and recall.": "Kiểm tra nhanh vốn từ và khả năng ghi nhớ Khmer.",
  "Greet, introduce yourself, and choose a polite reply.": "Chào hỏi, tự giới thiệu và chọn câu trả lời lịch sự.",
  "Essential survival and cultural tips before visiting the Kingdom of Wonder.": "Mẹo sinh tồn và văn hóa thiết yếu trước khi đến Campuchia.",
  "Polite Greeting at Phnom Penh": "Chào hỏi lịch sự tại Phnom Penh",
  "Self Introduction near Park": "Tự giới thiệu gần công viên",
  "Language Conversation at School": "Hội thoại ngôn ngữ tại trường học",
  "Starter assessment": "Bài đánh giá khởi đầu",
  "Meeting someone · Listening & bridge": "Gặp gỡ người mới · Nghe và cầu nối đọc",
  "Meeting someone · Dialogue repair": "Gặp gỡ người mới · Sửa hội thoại",
  "Write Khmer consonants 1": "Viết phụ âm Khmer 1",
  "Cambodia Handbook": "Cẩm nang Campuchia",
  "Greeting local people": "Chào người địa phương",
  "Currency survival tips": "Mẹo sử dụng tiền tệ",
  "Tuk-tuk etiquette": "Quy tắc đi tuk-tuk",
  "Temple dress code": "Trang phục khi vào chùa",
  "Ordering Khmer food": "Gọi món Khmer",
  "Water and ice": "Nước uống và đá",
  "Listen. Which word did you hear?": "Nghe và chọn từ bạn vừa nghe.",
  "Listen to the reply, then choose it.": "Nghe câu trả lời rồi chọn đáp án đúng.",
  "Repair this learner note.": "Sửa ghi chú bị sai của người học.",
  "Fix the reading bridge result.": "Sửa kết quả của Cầu nối đọc.",
  "Choose the repair": "Chọn cách sửa đúng",
  "No penalty — choose when ready.": "Không bị trừ điểm — hãy chọn khi bạn sẵn sàng.",
  "Match the Khmer word to its actual English meaning before replying.": "Ghép từ Khmer với đúng nghĩa tiếng Việt trước khi trả lời.",
  "The bridge is a beginner aid. Confirm the final word with its standard meaning.": "Cầu nối chỉ hỗ trợ người mới. Hãy kiểm tra từ cuối bằng nghĩa chuẩn.",
  "Hello": "Xin chào",
  "Thank you": "Cảm ơn",
  "Sorry": "Xin lỗi",
  "Goodbye": "Tạm biệt",
  "Yes (male speaker)": "Vâng (người nói nam)",
  "Yes (female speaker)": "Vâng (người nói nữ)",
  "One": "Một",
  "Two": "Hai",
  "Three": "Ba",
  "Four": "Bốn",
  "Five": "Năm",
  "Water": "Nước",
  "Rice": "Cơm",
  "Food": "Đồ ăn",
  "Market": "Chợ",
  "Price": "Giá",
  "How much is it?": "Giá bao nhiêu?",
  "Friend": "Bạn bè",
  "Family": "Gia đình",
  "Home": "Nhà",
  "School": "Trường học",
  "Book": "Sách",
  "Teacher": "Giáo viên",
  "Morning": "Buổi sáng",
  "Evening": "Buổi tối",
  "Today": "Hôm nay",
  "Red": "Màu đỏ",
  "Blue": "Màu xanh dương",
  "Green": "Màu xanh lá",
  "Yellow": "Màu vàng",
};

const viPlaces: Record<string, string> = {
  "Phnom Penh": "Phnom Penh", "Siem Reap": "Siem Reap", Battambang: "Battambang",
  Kampot: "Kampot", Kep: "Kep", Sihanoukville: "Sihanoukville", Park: "công viên",
  School: "trường học", Hotel: "khách sạn", Office: "văn phòng", Bank: "ngân hàng",
  Pharmacy: "nhà thuốc", Restaurant: "nhà hàng", "Central Market": "Chợ Trung tâm",
  "Orussey Market": "Chợ Orussey", "Night Market": "chợ đêm", Riverside: "bờ sông",
};

function viDynamicText(value: string): string | undefined {
  let match = value.match(/^A five-line everyday Khmer conversation\. Listen line by line or play it all\.$/);
  if (match) return "Hội thoại Khmer đời thường gồm năm câu. Nghe từng câu hoặc phát toàn bộ.";
  match = value.match(/^(.+?) · Listening & bridge$/);
  if (match) return `${viDynamicText(match[1]) ?? match[1]} · Nghe và cầu nối đọc`;
  match = value.match(/^(.+?) · Dialogue repair$/);
  if (match) return `${viDynamicText(match[1]) ?? match[1]} · Sửa hội thoại`;
  match = value.match(/^(.+?) · Mixed speed review$/);
  if (match) return `${viDynamicText(match[1]) ?? match[1]} · Ôn tập tốc độ hỗn hợp`;
  const scenario: Record<string, string> = {
    "Meeting someone": "Gặp gỡ người mới", "At home": "Ở nhà", "Counting money": "Đếm tiền",
    "Buying food": "Mua đồ ăn", "At school": "Ở trường", "Morning plans": "Kế hoạch buổi sáng",
    "Choosing colours": "Chọn màu sắc", "Polite answers": "Câu trả lời lịch sự",
    "Market question": "Hỏi ở chợ", "Daily essentials": "Nhu cầu hằng ngày",
  };
  if (scenario[value]) return scenario[value];
  const descriptions: Record<string, string> = {
    "Greet, introduce yourself, and choose a polite reply.": "Chào hỏi, tự giới thiệu và chọn câu trả lời lịch sự.",
    "Recognise family and home words in a short everyday exchange.": "Nhận biết từ về gia đình và nhà cửa trong hội thoại ngắn.",
    "Hear numbers, read a price word, and respond with the right meaning.": "Nghe số, đọc từ chỉ giá và chọn đúng nghĩa.",
    "Use food and market vocabulary to make a simple request.": "Dùng từ về đồ ăn và chợ để đưa ra yêu cầu đơn giản.",
    "Read common school words and choose a useful classroom response.": "Đọc từ thông dụng ở trường và chọn câu trả lời phù hợp.",
    "Connect time words with a natural daily plan.": "Nối từ chỉ thời gian với kế hoạch hằng ngày tự nhiên.",
    "Discriminate colour words and build a short description.": "Phân biệt từ chỉ màu và tạo mô tả ngắn.",
    "Choose the correct male or female polite response in context.": "Chọn câu đáp lịch sự dành cho nam hoặc nữ theo ngữ cảnh.",
    "Follow a short market exchange and repair an incorrect reply.": "Theo dõi hội thoại ngắn ở chợ và sửa câu trả lời sai.",
    "Mix water, rice, food, and home vocabulary in a practical check.": "Ôn kết hợp từ về nước, cơm, đồ ăn và nhà cửa.",
  };
  if (descriptions[value]) return descriptions[value];
  match = value.match(/^A shopkeeper says “(.+)”\. What is the best meaning\?$/);
  if (match) return `Người bán hàng nói “${match[1]}”. Nghĩa phù hợp nhất là gì?`;
  match = value.match(/^Quick reply: which Khmer word means “(.+)”\?$/);
  if (match) return `Trả lời nhanh: từ Khmer nào có nghĩa “${localizeLegacyText(match[1], "vi") }”?`;
  match = value.match(/^Quick recall: choose “(.+)”\.$/);
  if (match) return `Nhớ nhanh: chọn “${localizeLegacyText(match[1], "vi") }”.`;
  match = value.match(/^Which Khmer word means “(.+)”\?$/);
  if (match) return `Từ Khmer nào có nghĩa “${localizeLegacyText(match[1], "vi") }”?`;
  match = value.match(/^Reading bridge: (.+)\. Which final reading is closest to the bridge\?$/);
  if (match) return `Cầu nối đọc: ${match[1]}. Cách đọc cuối nào gần nhất với cầu nối?`;
  match = value.match(/^Hello ([^!]+)! How are you at (.+)\?$/);
  if (match) return `Xin chào ${match[1]}! Bạn khỏe không khi ở ${viPlaces[match[2]] ?? match[2]}?`;
  match = value.match(/^Yes, I am fine\. How about (.+)\?$/);
  if (match) return `Vâng, tôi khỏe. Còn ${match[1]} thì sao?`;
  if (value === "Yes, I am fine too. Thank you very much!") return "Vâng, tôi cũng khỏe. Cảm ơn rất nhiều!";
  if (value === "Yes, you're welcome! Have a nice day.") return "Vâng, không có gì! Chúc bạn một ngày tốt lành.";
  match = value.match(/^Yes, thank you! See you tomorrow at (.+)\.$/);
  if (match) return `Vâng, cảm ơn! Hẹn gặp lại ngày mai ở ${viPlaces[match[1]] ?? match[1]}.`;
  match = value.match(/^(.+?) near (.+)$/);
  if (match) return `${viDynamicText(match[1]) ?? match[1]} gần ${viPlaces[match[2]] ?? match[2]}`;
  match = value.match(/^Family Discussion$/); if (match) return "Trò chuyện về gia đình";
  match = value.match(/^Pricing Query for (.+)$/); if (match) return `Hỏi giá ${match[1]}`;
  match = value.match(/^Market Shopping for (.+)$/); if (match) return `Mua ${match[1]} ở chợ`;
  match = value.match(/^Ordering (.+) at Restaurant$/); if (match) return `Gọi ${match[1]} tại nhà hàng`;
  return undefined;
}

/**
 * Temporary catalogue resolver for legacy lesson records. New CMS/import data
 * must provide locale fields; this prevents mixed-language screens meanwhile.
 */
export function localizeLegacyText(value: string | undefined, locale: Locale): string {
  if (!value || locale === "en") return value ?? "";
  if (locale === "vi")
    return EXPANDED_VI_TEXT[value] ?? viText[value] ?? viDynamicText(value) ?? value;
  return value;
}

export function localizeLegacyLesson<T extends LessonDisplay>(lesson: T, locale: Locale): T {
  if (locale === "en") return lesson;
  return {
    ...lesson,
    title: localizeLegacyText(lesson.title, locale),
    description: localizeLegacyText(lesson.description, locale),
  };
}

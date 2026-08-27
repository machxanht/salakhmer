import type { Locale } from "./i18n";

/**
 * SalaKhmer's intentionally small, offline starter dictionary.
 *
 * This is original application data for everyday learner vocabulary; it has no
 * remote lookup, tracking or R2 objects.  Larger third-party lexicons must be
 * imported only after their individual licence has been reviewed.
 */
export type KhmerDictionaryEntry = {
  khmer: string;
  romanization: string;
  translations: Record<Locale, string>;
  category: string;
};

export const KHMER_LOCAL_DICTIONARY: KhmerDictionaryEntry[] = [
  ["សួស្តី", "suos-dei", "Hello", "Xin chào", "你好", "Bonjour", "Greetings"],
  ["អរគុណ", "aw-kun", "Thank you", "Cảm ơn", "谢谢", "Merci", "Greetings"],
  ["សូម", "sohm", "Please", "Làm ơn", "请", "S’il vous plaît", "Greetings"],
  ["បាទ", "baat", "Yes (male speaker)", "Vâng (người nói nam)", "是（男性）", "Oui (homme)", "Greetings"],
  ["ចាស", "chaas", "Yes (female speaker)", "Vâng (người nói nữ)", "是（女性）", "Oui (femme)", "Greetings"],
  ["ទេ", "te", "No", "Không", "不", "Non", "Greetings"],
  ["លាហើយ", "lea-hai", "Goodbye", "Tạm biệt", "再见", "Au revoir", "Greetings"],
  ["ទឹក", "teuk", "Water", "Nước", "水", "Eau", "Food & drink"],
  ["បាយ", "bai", "Rice / meal", "Cơm / bữa ăn", "米饭 / 一餐", "Riz / repas", "Food & drink"],
  ["ម្ហូប", "mhoop", "Food / dish", "Món ăn", "食物 / 菜", "Plat / nourriture", "Food & drink"],
  ["កាហ្វេ", "kaa-fe", "Coffee", "Cà phê", "咖啡", "Café", "Food & drink"],
  ["តែ", "tae", "Tea", "Trà", "茶", "Thé", "Food & drink"],
  ["ផ្លែឈើ", "phlae-chheu", "Fruit", "Trái cây", "水果", "Fruit", "Food & drink"],
  ["ផ្ទះ", "phteah", "House / home", "Nhà", "房子 / nhà", "Maison", "Places"],
  ["ផ្សារ", "psaa", "Market", "Chợ", "市场", "Marché", "Places"],
  ["សណ្ឋាគារ", "sonthakia", "Hotel", "Khách sạn", "酒店", "Hôtel", "Places"],
  ["សាលារៀន", "sa-la-rian", "School", "Trường học", "学校", "École", "Places"],
  ["មន្ទីរពេទ្យ", "mon-ti-pet", "Hospital", "Bệnh viện", "医院", "Hôpital", "Places"],
  ["បន្ទប់ទឹក", "bon-toop-teuk", "Restroom", "Nhà vệ sinh", "洗手间", "Toilettes", "Places"],
  ["ឡាន", "laan", "Car", "Xe ô tô", "汽车", "Voiture", "Travel"],
  ["តុកតុក", "tuk-tuk", "Tuk-tuk", "Xe tuk-tuk", "嘟嘟车", "Tuk-tuk", "Travel"],
  ["ឡានក្រុង", "laan-krong", "Bus", "Xe buýt", "公交车", "Bus", "Travel"],
  ["សំបុត្រ", "som-bot", "Ticket", "Vé", "票", "Billet", "Travel"],
  ["ថ្ងៃនេះ", "thngai-nih", "Today", "Hôm nay", "今天", "Aujourd’hui", "Time"],
  ["ថ្ងៃស្អែក", "thngai-saek", "Tomorrow", "Ngày mai", "明天", "Demain", "Time"],
  ["ឥឡូវនេះ", "ei-lov-nih", "Now", "Bây giờ", "现在", "Maintenant", "Time"],
  ["មួយ", "muoy", "One", "Một", "一", "Un", "Numbers"],
  ["ពីរ", "pii", "Two", "Hai", "二", "Deux", "Numbers"],
  ["បី", "bei", "Three", "Ba", "三", "Trois", "Numbers"],
  ["តម្លៃ", "dom-lai", "Price", "Giá", "价格", "Prix", "Shopping"],
  ["ថោក", "thaok", "Cheap", "Rẻ", "便宜", "Bon marché", "Shopping"],
  ["ថ្លៃ", "thlai", "Expensive", "Đắt", "贵", "Cher", "Shopping"],
  ["ឈ្មោះ", "chhmoh", "Name", "Tên", "名字", "Nom", "People"],
  ["មិត្ត", "mit", "Friend", "Bạn", "朋友", "Ami", "People"],
  ["គ្រួសារ", "kruo-saa", "Family", "Gia đình", "家庭", "Famille", "People"],
  ["ជួយ", "chuoy", "Help", "Giúp", "帮助", "Aider", "Useful verbs"],
  ["ចង់", "chong", "Want", "Muốn", "想要", "Vouloir", "Useful verbs"],
  ["ទៅ", "tov", "Go", "Đi", "去", "Aller", "Useful verbs"],
  ["មក", "mok", "Come", "Đến", "来", "Venir", "Useful verbs"],
].map(([khmer, romanization, en, vi, zh, fr, category]) => ({
  khmer, romanization, translations: { en, vi, zh, fr }, category,
}));

export function searchKhmerDictionary(query: string, targetLocale: Locale) {
  const needle = query.normalize("NFC").trim().toLocaleLowerCase();
  if (!needle) return KHMER_LOCAL_DICTIONARY;
  return KHMER_LOCAL_DICTIONARY.filter((entry) =>
    [entry.khmer, entry.romanization, entry.category, ...Object.values(entry.translations)]
      .some((value) => value.toLocaleLowerCase().includes(needle)),
  ).sort((left, right) => {
    const leftExact = left.translations[targetLocale].toLocaleLowerCase() === needle || left.khmer === needle;
    const rightExact = right.translations[targetLocale].toLocaleLowerCase() === needle || right.khmer === needle;
    return Number(rightExact) - Number(leftExact);
  });
}

import { KhmerCharacter } from "./khmerAlphabetData";

export const GREETINGS_DATA: Record<
  string,
  {
    title: string;
    subtitle: string;
    data: KhmerCharacter[];
    theme: "jade" | "ruby" | "blue" | "amber" | "purple" | "slate";
  }
> = {
  "greet-l1": {
    title: "1. Basic greetings",
    subtitle: "Basic Greetings (Informal & Formal)",
    theme: "jade",
    data: [
      { id: "g1-1", khmer: "សួស្ដី", latin: "Suosdey (Hello — informal)" },
      { id: "g1-2", khmer: "ជម្រាបសួរ", latin: "Chum reap sour (Hello — formal)" },
      { id: "g1-3", khmer: "អរុណសួស្ដី", latin: "Arun suosdey (Good morning)" },
      { id: "g1-4", khmer: "ទិវាសួស្ដី", latin: "Tivea suosdey (Good afternoon)" },
      { id: "g1-5", khmer: "សាយ័ន្តសួស្ដី", latin: "Sayan suosdey (Good evening)" },
    ],
  },
  "greet-l2": {
    title: "2. Saying goodbye",
    subtitle: "Saying Goodbye",
    theme: "ruby",
    data: [
      { id: "g2-1", khmer: "លាហើយ", latin: "Lea hey (Goodbye — informal)" },
      { id: "g2-2", khmer: "ជម្រាបលា", latin: "Chum reap lea (Goodbye — formal)" },
      { id: "g2-3", khmer: "រាត្រីសួស្ដី", latin: "Reatrey suosdey (Good night)" },
      { id: "g2-4", khmer: "ជួបគ្នាពេលក្រោយ", latin: "Chuob knea pel kraoy (See you later)" },
      { id: "g2-5", khmer: "សំណាងល្អ", latin: "Somnang laor (Good luck)" },
    ],
  },
  "greet-l3": {
    title: "3. Asking how someone is",
    subtitle: "Asking 'How are you?'",
    theme: "blue",
    data: [
      { id: "g3-1", khmer: "អ្នកសុខសប្បាយទេ?", latin: "Neak sok sabay te? (Bạn có khỏe không?)" },
      { id: "g3-2", khmer: "សុខសប្បាយជាទេ?", latin: "Sok sabay chea te? (Khỏe không? - Thân mật)" },
      { id: "g3-3", khmer: "យ៉ាងម៉េចហើយ?", latin: "Yang mech hey? (Dạo này sao rồi?)" },
      {
        id: "g3-4",
        khmer: "គ្រួសារអ្នកសុខសប្បាយទេ?",
        latin: "Kruosa neak sok sabay te? (Gia đình bạn khỏe không?)",
      },
    ],
  },
  "greet-l4": {
    title: "4. Answering how you are",
    subtitle: "Answering 'How are you?'",
    theme: "amber",
    data: [
      { id: "g4-1", khmer: "ខ្ញុំសុខសប្បាយ", latin: "Knhom sok sabay (Tôi khỏe)" },
      { id: "g4-2", khmer: "ចុះអ្នកវិញ?", latin: "Choh neak vinh? (Còn bạn thì sao?)" },
      {
        id: "g4-3",
        khmer: "ខ្ញុំមិនសូវស្រួលខ្លួនទេ",
        latin: "Knhom min sov sruol kluon te (Tôi không khỏe lắm)",
      },
      { id: "g4-4", khmer: "ធម្មតា", latin: "Thommada (Bình thường)" },
    ],
  },
  "greet-l5": {
    title: "5. Thanks and apologies",
    subtitle: "Thanks & Apologies",
    theme: "purple",
    data: [
      { id: "g5-1", khmer: "អរគុណ", latin: "Orkun (Thank you)" },
      { id: "g5-2", khmer: "អរគុណច្រើន", latin: "Orkun chroeun (Thank you very much)" },
      { id: "g5-3", khmer: "សូមទោស", latin: "Som tos (Xin lỗi)" },
      { id: "g5-4", khmer: "មិនអីទេ", latin: "Min ey te (Không có gì / Không sao)" },
      { id: "g5-5", khmer: "សូមមេត្តា", latin: "Som metta (Vui lòng / Xin hãy)" },
    ],
  },
  "greet-l6": {
    title: "6. Introductions",
    subtitle: "Introductions",
    theme: "slate",
    data: [
      { id: "g6-1", khmer: "ខ្ញុំឈ្មោះ...", latin: "Knhom chmuah... (Tôi tên là...)" },
      { id: "g6-2", khmer: "អ្នកឈ្មោះអ្វី?", latin: "Neak chmuah avey? (Bạn tên gì?)" },
      {
        id: "g6-3",
        khmer: "ខ្ញុំមកពីប្រទេសវៀតណាម",
        latin: "Knhom mok pi brates Vietnam (Tôi đến từ VN)",
      },
      {
        id: "g6-4",
        khmer: "រីករាយដែលបានស្គាល់",
        latin: "Rik reay del ban skoal (Rất vui được gặp bạn)",
      },
    ],
  },
  "greet-l7": {
    title: "7. Age",
    subtitle: "Asking about age",
    theme: "jade",
    data: [
      { id: "g7-1", khmer: "អ្នកអាយុប៉ុន្មាន?", latin: "Neak ayu ponman? (Bạn bao nhiêu tuổi?)" },
      { id: "g7-2", khmer: "ខ្ញុំអាយុ ២០ ឆ្នាំ", latin: "Knhom ayu m'pey chhnam (Tôi 20 tuổi)" },
      { id: "g7-3", khmer: "ចាស់", latin: "Chah (Già)" },
      { id: "g7-4", khmer: "ក្មេង", latin: "Kmeng (Trẻ)" },
    ],
  },
  "greet-l8": {
    title: "8. Congratulations and wishes",
    subtitle: "Congratulations & Wishes",
    theme: "ruby",
    data: [
      { id: "g8-1", khmer: "អបអរសាទរ", latin: "Ob or sator (Congratulations)" },
      {
        id: "g8-2",
        khmer: "រីករាយថ្ងៃកំណើត",
        latin: "Rik reay thngay komnaeut (Happy birthday)",
      },
      { id: "g8-3", khmer: "រីករាយឆ្នាំថ្មី", latin: "Rik reay chhnam thmey (Happy New Year)" },
      { id: "g8-4", khmer: "សុខភាពល្អ", latin: "Sokhapheap laor (Dồi dào sức khỏe)" },
    ],
  },
  "greet-l9": {
    title: "9. Agreement and refusal",
    subtitle: "Yes, No & Agreement",
    theme: "blue",
    data: [
      { id: "g9-1", khmer: "បាទ", latin: "Bat (Vâng / Dạ - Dành cho nam)" },
      { id: "g9-2", khmer: "ចាស", latin: "Chas (Vâng / Dạ - Dành cho nữ)" },
      { id: "g9-3", khmer: "ទេ", latin: "Te (Không)" },
      { id: "g9-4", khmer: "យល់ព្រម", latin: "Yol prom (Đồng ý)" },
      { id: "g9-5", khmer: "មិនដឹងទេ", latin: "Min doeng te (Không biết)" },
    ],
  },
  "greet-l10": {
    title: "10. Compliments",
    subtitle: "Compliments",
    theme: "amber",
    data: [
      { id: "g10-1", khmer: "អ្នកស្អាតណាស់", latin: "Neak saat nah (Bạn đẹp quá)" },
      { id: "g10-2", khmer: "ពូកែណាស់", latin: "Pukae nah (Giỏi quá)" },
      { id: "g10-3", khmer: "ឆ្លាតណាស់", latin: "Chhlat nah (Thông minh quá)" },
      { id: "g10-4", khmer: "ល្អណាស់", latin: "Laor nah (Tốt lắm)" },
    ],
  },
};

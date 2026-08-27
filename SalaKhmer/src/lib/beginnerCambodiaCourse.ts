import type { LessonMock } from "./mock-lessons";

type CourseCard = {
  id: string;
  front: string;
  back: string;
  backVi: string;
  desc: string;
  audioId: string;
};

const card = (
  id: string,
  front: string,
  back: string,
  backVi: string,
  desc: string,
): CourseCard => ({
  id,
  front,
  back,
  backVi,
  desc,
  audioId: `daily-${id}`,
});

const lesson = (
  id: string,
  title: string,
  description: string,
  content: CourseCard[],
): LessonMock => ({
  id,
  categoryId: "module_3",
  title,
  description,
  xpReward: 15,
  type: "conversation",
  content,
});

/** Beginner course for international learners living or travelling in Cambodia.
 * English is the source translation; Vietnamese is an optional UI translation.
 * Khmer audio is intentionally generated only after native-speaker review.
 */
export const beginnerCambodiaLessons: LessonMock[] = [
  lesson(
    "daily-01-greetings",
    "Greetings and politeness",
    "Meet someone respectfully in Cambodia.",
    [
      card("01-01", "សួស្តី", "Hello / hi", "Xin chào", "sous-dei"),
      card("01-02", "ជំរាបសួរ", "Hello (formal)", "Xin chào (trang trọng)", "chom-reap-sou"),
      card("01-03", "អរគុណ", "Thank you", "Cảm ơn", "aw-kun"),
      card("01-04", "សុំទោស", "Sorry / excuse me", "Xin lỗi / xin phép", "som-toh"),
      card("01-05", "លាហើយ", "Goodbye", "Tạm biệt", "lea-haeuy"),
    ],
  ),
  lesson(
    "daily-02-introductions",
    "Introducing yourself",
    "Say who you are and where you are from.",
    [
      card("02-01", "ខ្ញុំឈ្មោះ...", "My name is...", "Tôi tên là...", "khnhom chmuoh"),
      card("02-02", "អ្នកឈ្មោះអ្វី?", "What is your name?", "Bạn tên gì?", "neak chmuoh avei"),
      card("02-03", "ខ្ញុំមកពី...", "I am from...", "Tôi đến từ...", "khnhom mok pi"),
      card(
        "02-04",
        "ខ្ញុំជាជនបរទេស",
        "I am a foreigner",
        "Tôi là người nước ngoài",
        "khnhom chea chun borotes",
      ),
      card(
        "02-05",
        "រីករាយដែលបានស្គាល់អ្នក",
        "Nice to meet you",
        "Rất vui được gặp bạn",
        "rik-reay del ban skoa neak",
      ),
    ],
  ),
  lesson("daily-03-numbers-money", "Numbers and prices", "Understand simple prices and amounts.", [
    card("03-01", "មួយ", "One", "Một", "muoy"),
    card("03-02", "ពីរ", "Two", "Hai", "pi"),
    card("03-03", "ថ្លៃប៉ុន្មាន?", "How much does it cost?", "Giá bao nhiêu?", "tlai pon-man"),
    card("03-04", "ថ្លៃពេក", "Too expensive", "Đắt quá", "tlai pek"),
    card(
      "03-05",
      "សូមបញ្ចុះតម្លៃបានទេ?",
      "Can you lower the price?",
      "Có thể bớt giá không?",
      "som banchoh domlai ban te",
    ),
  ]),
  lesson("daily-04-market", "Shopping at a market", "Buy everyday items at a Cambodian market.", [
    card("04-01", "ខ្ញុំចង់ទិញ...", "I want to buy...", "Tôi muốn mua...", "khnhom chong tɨnh"),
    card(
      "04-02",
      "មានទំហំតូចជាងនេះទេ?",
      "Do you have a smaller size?",
      "Có cỡ nhỏ hơn không?",
      "mean tomhom touch cheang nih te",
    ),
    card(
      "04-03",
      "មានពណ៌ផ្សេងទៀតទេ?",
      "Do you have another color?",
      "Có màu khác không?",
      "mean por pseng tiet te",
    ),
    card("04-04", "ខ្ញុំមើលសិន", "I will look first", "Tôi xem trước đã", "khnhom merl sen"),
    card(
      "04-05",
      "ខ្ញុំយកមួយនេះ",
      "I will take this one",
      "Tôi lấy cái này",
      "khnhom yok muoy nih",
    ),
  ]),
  lesson("daily-05-restaurant", "Ordering food", "Order a meal and express a food preference.", [
    card(
      "05-01",
      "សូមមើលម៉ឺនុយ",
      "Please show me the menu",
      "Cho tôi xem thực đơn",
      "som merl menu",
    ),
    card("05-02", "ខ្ញុំចង់បាន...", "I would like...", "Tôi muốn...", "khnhom chong ban"),
    card(
      "05-03",
      "មិនហឹរទេ សូមអរគុណ",
      "Not spicy, please",
      "Làm ơn đừng cay",
      "min heur te som aw-kun",
    ),
    card(
      "05-04",
      "សូមទឹកមួយកែវ",
      "A glass of water, please",
      "Cho tôi một ly nước",
      "som tɨk muoy kaev",
    ),
    card("05-05", "សូមគិតលុយ", "The bill, please", "Tính tiền giúp tôi", "som ket luy"),
  ]),
  lesson(
    "daily-06-transport",
    "Tuk-tuk and directions",
    "Take local transport and give a destination.",
    [
      card(
        "06-01",
        "ខ្ញុំចង់ទៅ...",
        "I want to go to...",
        "Tôi muốn đi đến...",
        "khnhom chong tov",
      ),
      card(
        "06-02",
        "ទៅផ្សារនេះថ្លៃប៉ុន្មាន?",
        "How much to this market?",
        "Đi đến chợ này bao nhiêu tiền?",
        "tov psar nih tlai pon-man",
      ),
      card(
        "06-03",
        "សូមឈប់នៅទីនេះ",
        "Please stop here",
        "Làm ơn dừng ở đây",
        "som chhob nov ti nih",
      ),
      card("06-04", "បត់ស្តាំ", "Turn right", "Rẽ phải", "bot sdam"),
      card("06-05", "បត់ឆ្វេង", "Turn left", "Rẽ trái", "bot chhveng"),
    ],
  ),
  lesson("daily-07-phone-sim", "Buying a phone SIM", "Get connected when you arrive in Cambodia.", [
    card(
      "07-01",
      "ខ្ញុំចង់ទិញស៊ីមកាត",
      "I want to buy a SIM card",
      "Tôi muốn mua SIM",
      "khnhom chong tɨnh sim kat",
    ),
    card(
      "07-02",
      "មានអ៊ីនធឺណិតទេ?",
      "Does it include internet?",
      "Có bao gồm Internet không?",
      "mean internet te",
    ),
    card(
      "07-03",
      "សូមជួយចុះឈ្មោះឲ្យខ្ញុំ",
      "Please help me register it",
      "Làm ơn giúp tôi đăng ký",
      "som chuoy choh chhmoh aoy khnhom",
    ),
    card(
      "07-04",
      "លេខទូរស័ព្ទរបស់ខ្ញុំគឺ...",
      "My phone number is...",
      "Số điện thoại của tôi là...",
      "lek torosap robos khnhom ku",
    ),
    card(
      "07-05",
      "សេវាមិនដំណើរការ",
      "The service is not working",
      "Dịch vụ không hoạt động",
      "seva min damnaerka",
    ),
  ]),
  lesson("daily-08-hotel", "At a hotel", "Check in and ask for practical help.", [
    card(
      "08-01",
      "ខ្ញុំមានការកក់បន្ទប់",
      "I have a room reservation",
      "Tôi có đặt phòng",
      "khnhom mean ka kok bontup",
    ),
    card(
      "08-02",
      "បន្ទប់របស់ខ្ញុំនៅឯណា?",
      "Where is my room?",
      "Phòng của tôi ở đâu?",
      "bontup robos khnhom nov aena",
    ),
    card(
      "08-03",
      "សូមផ្តល់កូនសោឲ្យខ្ញុំ",
      "Please give me the key",
      "Làm ơn đưa chìa khóa",
      "som pdal kon sao aoy khnhom",
    ),
    card(
      "08-04",
      "ម៉ាស៊ីនត្រជាក់មិនដំណើរការ",
      "The air conditioner is not working",
      "Máy lạnh không hoạt động",
      "masin tracheak min damnaerka",
    ),
    card("08-05", "សូមជួយខ្ញុំផង", "Please help me", "Làm ơn giúp tôi", "som chuoy khnhom pong"),
  ]),
  lesson("daily-09-pharmacy", "At a pharmacy", "Explain a simple health need and ask for help.", [
    card(
      "09-01",
      "ខ្ញុំមិនស្រួលខ្លួន",
      "I do not feel well",
      "Tôi không khỏe",
      "khnhom min sruol kluon",
    ),
    card("09-02", "ខ្ញុំឈឺក្បាល", "I have a headache", "Tôi bị đau đầu", "khnhom chheu kbal"),
    card("09-03", "ខ្ញុំត្រូវការថ្នាំ", "I need medicine", "Tôi cần thuốc", "khnhom trov ka thnam"),
    card(
      "09-04",
      "មន្ទីរពេទ្យនៅឯណា?",
      "Where is the hospital?",
      "Bệnh viện ở đâu?",
      "mondol pet nov aena",
    ),
    card("09-05", "ខ្ញុំមានអាឡែហ្ស៊ី", "I have an allergy", "Tôi bị dị ứng", "khnhom mean allergy"),
  ]),
  lesson(
    "daily-10-review",
    "Daily life review",
    "Review the most useful phrases from the first week.",
    [
      card("10-01", "ខ្ញុំមិនយល់ទេ", "I do not understand", "Tôi không hiểu", "khnhom min yol te"),
      card(
        "10-02",
        "សូមនិយាយយឺតៗ",
        "Please speak slowly",
        "Làm ơn nói chậm",
        "som niyeay yeut yeut",
      ),
      card(
        "10-03",
        "តើអ្នកនិយាយភាសាអង់គ្លេសទេ?",
        "Do you speak English?",
        "Bạn có nói tiếng Anh không?",
        "tae neak niyeay pheasa anglais te",
      ),
      card(
        "10-04",
        "ខ្ញុំកំពុងរៀនភាសាខ្មែរ",
        "I am learning Khmer",
        "Tôi đang học tiếng Khmer",
        "khnhom kompong rien pheasa khmae",
      ),
      card(
        "10-05",
        "សូមអរគុណច្រើន",
        "Thank you very much",
        "Cảm ơn rất nhiều",
        "som aw-kun chraen",
      ),
    ],
  ),
];

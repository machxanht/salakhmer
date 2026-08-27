import type { LessonMock } from "./mock-lessons";

type DialogueTurn = readonly [khmer: string, english: string, phonetic: string, vietnamese: string];

type DialogueSeed = {
  title: string;
  titleVi: string;
  description: string;
  descriptionVi: string;
  turns: readonly DialogueTurn[];
};

const dialogueSeeds: readonly DialogueSeed[] = [
  {
    title: "Getting ready in the morning",
    titleVi: "Chuẩn bị vào buổi sáng",
    description: "Talk through a normal morning routine and leaving for work.",
    descriptionVi: "Nói về thói quen buổi sáng và lúc chuẩn bị đi làm.",
    turns: [
      ["អរុណសួស្តី! អ្នកក្រោកពីគេងម៉ោងប៉ុន្មាន?", "Good morning! What time do you wake up?", "aw-roon suo-sdei! neak kraok pi keng maong pon-man?", "Chào buổi sáng! Bạn thức dậy lúc mấy giờ?"],
      ["ខ្ញុំក្រោកពីគេងម៉ោងប្រាំមួយ។", "I wake up at six o'clock.", "khnyom kraok pi keng maong pram-muoy.", "Tôi thức dậy lúc sáu giờ."],
      ["បន្ទាប់មក អ្នកធ្វើអ្វី?", "What do you do next?", "bon-toap mok, neak tver avei?", "Sau đó bạn làm gì?"],
      ["ខ្ញុំងូតទឹក ហើយញ៉ាំអាហារពេលព្រឹក។", "I shower and eat breakfast.", "khnyom ngoot teuk haey nyam aha pel preuk.", "Tôi tắm rồi ăn sáng."],
      ["រួចហើយ ខ្ញុំទៅធ្វើការ។", "Then I go to work.", "ruoch haey, khnyom tov tver kaa.", "Sau đó tôi đi làm."],
    ],
  },
  {
    title: "Taking a tuk-tuk across town",
    titleVi: "Đi tuk-tuk qua thành phố",
    description: "Name a destination, discuss the route, agree a fare, and request a safe speed.",
    descriptionVi: "Nói điểm đến, trao đổi tuyến đường, thống nhất giá và nhờ đi chậm.",
    turns: [
      ["សួស្តីពូ ខ្ញុំចង់ទៅផ្សារធំថ្មី។", "Hello, uncle. I would like to go to Central Market.", "suo-sdei pu, khnyom chong tov psaa thom thmei.", "Chào chú. Tôi muốn đi Chợ Trung tâm."],
      ["បាន។ អ្នកចង់ទៅតាមផ្លូវណា?", "Sure. Which route would you like to take?", "baan. neak chong tov tam plov naa?", "Được. Bạn muốn đi đường nào?"],
      ["សូមទៅតាមផ្លូវដែលមិនសូវកកស្ទះ។", "Please take a route that is not too congested.", "sohm tov tam plov del min sov kak-steah.", "Vui lòng đi đường ít kẹt xe."],
      ["តម្លៃប៉ុន្មាន?", "How much is the fare?", "dom-lai pon-man?", "Giá bao nhiêu?"],
      ["មួយម៉ឺនរៀល។", "Ten thousand riel.", "muoy meun riel.", "Mười nghìn riel."],
      ["យល់ព្រម សូមបើកយឺតៗ។", "Agreed. Please drive slowly.", "yol-prom, sohm baek yeut-yeut.", "Đồng ý. Vui lòng lái chậm."],
    ],
  },
  {
    title: "Checking in at a hotel",
    titleVi: "Nhận phòng khách sạn",
    description: "Confirm a reservation, provide a passport, and ask about breakfast.",
    descriptionVi: "Xác nhận đặt phòng, đưa hộ chiếu và hỏi về bữa sáng.",
    turns: [
      ["សួស្តី ខ្ញុំបានកក់បន្ទប់មួយយប់។", "Hello. I booked a room for one night.", "suo-sdei, khnyom baan kok bontop muoy yub.", "Xin chào. Tôi đã đặt phòng một đêm."],
      ["សូមឲ្យខ្ញុំមើលលិខិតឆ្លងដែនរបស់អ្នក។", "May I see your passport, please?", "sohm aoy khnyom merl likhet chhlong-den robos neak.", "Cho tôi xem hộ chiếu của bạn nhé."],
      ["នេះជាលិខិតឆ្លងដែនរបស់ខ្ញុំ។", "Here is my passport.", "nih chea likhet chhlong-den robos khnyom.", "Đây là hộ chiếu của tôi."],
      ["បន្ទប់របស់អ្នកនៅជាន់ទីបី។", "Your room is on the third floor.", "bontop robos neak nov choan ti bei.", "Phòng của bạn ở tầng ba."],
      ["អាហារពេលព្រឹកចាប់ផ្តើមម៉ោងប៉ុន្មាន?", "What time does breakfast begin?", "aha pel preuk chap-pdaem maong pon-man?", "Bữa sáng bắt đầu lúc mấy giờ?"],
      ["ចាប់ផ្តើមម៉ោងប្រាំពីរ។", "It begins at seven o'clock.", "chap-pdaem maong pram-pi.", "Bắt đầu lúc bảy giờ."],
    ],
  },
  {
    title: "Reporting a problem with the room",
    titleVi: "Báo sự cố trong phòng",
    description: "Explain that the air conditioner is not working and arrange assistance.",
    descriptionVi: "Báo máy lạnh không hoạt động và nhờ khách sạn hỗ trợ.",
    turns: [
      ["សូមទោស ម៉ាស៊ីនត្រជាក់ក្នុងបន្ទប់ខ្ញុំមិនដំណើរការ។", "Excuse me, the air conditioner in my room is not working.", "sohm-toh, ma-sin tro-cheak knong bontop khnyom min dom-naer-kaa.", "Xin lỗi, máy lạnh trong phòng tôi không hoạt động."],
      ["បន្ទប់លេខប៉ុន្មាន?", "What is your room number?", "bontop lek pon-man?", "Phòng số mấy?"],
      ["បន្ទប់លេខពីររយប្រាំ។", "Room 205.", "bontop lek pi roy pram.", "Phòng 205."],
      ["ខ្ញុំនឹងឲ្យបុគ្គលិកទៅពិនិត្យឥឡូវនេះ។", "I will send a staff member to check it now.", "khnyom neng aoy bok-kolik tov pi-nit ailov nih.", "Tôi sẽ cho nhân viên lên kiểm tra ngay."],
      ["តើខ្ញុំត្រូវរង់ចាំនៅក្នុងបន្ទប់ទេ?", "Should I wait in the room?", "tae khnyom trov rong-cham nov knong bontop te?", "Tôi có cần chờ trong phòng không?"],
      ["បាទ សូមរង់ចាំប្រហែលដប់នាទី។", "Yes, please wait about ten minutes.", "baat, sohm rong-cham pro-hael dop ni-ti.", "Vâng, vui lòng chờ khoảng mười phút."],
    ],
  },
  {
    title: "Asking for medicine at a pharmacy",
    titleVi: "Hỏi mua thuốc tại nhà thuốc",
    description: "Describe a headache, answer a safety question, and understand dosage advice.",
    descriptionVi: "Mô tả đau đầu, trả lời câu hỏi an toàn và nghe hướng dẫn liều dùng.",
    turns: [
      ["សួស្តី ខ្ញុំឈឺក្បាលតាំងពីព្រឹក។", "Hello. I have had a headache since this morning.", "suo-sdei, khnyom chheu kbaal tang pi preuk.", "Xin chào. Tôi bị đau đầu từ sáng."],
      ["តើអ្នកមានគ្រុនក្តៅទេ?", "Do you have a fever?", "tae neak mean kroon kdav te?", "Bạn có bị sốt không?"],
      ["ទេ ខ្ញុំមិនមានគ្រុនក្តៅទេ។", "No, I do not have a fever.", "te, khnyom min mean kroon kdav te.", "Không, tôi không bị sốt."],
      ["តើអ្នកមានអាឡែស៊ីថ្នាំអ្វីទេ?", "Are you allergic to any medicine?", "tae neak mean a-lae-si thnam avei te?", "Bạn có dị ứng thuốc nào không?"],
      ["ខ្ញុំមិនមានអាឡែស៊ីថ្នាំទេ។", "I am not allergic to medicine.", "khnyom min mean a-lae-si thnam te.", "Tôi không dị ứng thuốc."],
      ["សូមលេបមួយគ្រាប់ក្រោយអាហារ។", "Take one tablet after food, please.", "sohm leb muoy kroap kraoy aha.", "Vui lòng uống một viên sau khi ăn."],
    ],
  },
  {
    title: "Making a clinic appointment",
    titleVi: "Đặt lịch khám tại phòng khám",
    description: "Request an appointment, choose a time, and confirm what to bring.",
    descriptionVi: "Xin lịch khám, chọn giờ và xác nhận giấy tờ cần mang theo.",
    turns: [
      ["ខ្ញុំចង់ណាត់ជួបគ្រូពេទ្យនៅថ្ងៃស្អែក។", "I would like to make a doctor's appointment for tomorrow.", "khnyom chong nat-chuop kru-pet nov thngai saek.", "Tôi muốn đặt lịch gặp bác sĩ vào ngày mai."],
      ["ពេលព្រឹកឬពេលរសៀល?", "Morning or afternoon?", "pel preuk reu pel ro-siel?", "Buổi sáng hay buổi chiều?"],
      ["ពេលរសៀលងាយស្រួលជាង។", "The afternoon is more convenient.", "pel ro-siel ngeay sruol cheang.", "Buổi chiều thuận tiện hơn."],
      ["ម៉ោងពីរនៅទំនេរ។", "Two o'clock is available.", "maong pi nov tom-ne.", "Hai giờ còn trống."],
      ["ល្អណាស់ ខ្ញុំនឹងមកម៉ោងពីរ។", "Great. I will come at two.", "la-or nah, khnyom neng mok maong pi.", "Tốt quá. Tôi sẽ đến lúc hai giờ."],
      ["សូមយកលិខិតឆ្លងដែនមកជាមួយ។", "Please bring your passport with you.", "sohm yok likhet chhlong-den mok chea-muoy.", "Vui lòng mang theo hộ chiếu."],
    ],
  },
  {
    title: "Buying a bus ticket",
    titleVi: "Mua vé xe buýt",
    description: "Ask about departure time, seat availability, journey length, and price.",
    descriptionVi: "Hỏi giờ khởi hành, chỗ ngồi, thời gian di chuyển và giá vé.",
    turns: [
      ["សំបុត្រទៅសៀមរាបមួយ សូម។", "One ticket to Siem Reap, please.", "sombot tov Siem Reap muoy, sohm.", "Cho tôi một vé đi Siem Reap."],
      ["អ្នកចង់ចេញដំណើរម៉ោងប៉ុន្មាន?", "What time would you like to leave?", "neak chong chenh dom-naer maong pon-man?", "Bạn muốn khởi hành lúc mấy giờ?"],
      ["តើឡានម៉ោងប្រាំបីនៅមានកៅអីទេ?", "Does the eight o'clock bus still have seats?", "tae laan maong pram-bei nov mean kao-ei te?", "Xe tám giờ còn chỗ không?"],
      ["បាទ នៅសល់កៅអីជិតបង្អួចមួយ។", "Yes, one window seat remains.", "baat, nov sol kao-ei chit bong-uoch muoy.", "Có, còn một ghế gần cửa sổ."],
      ["ការធ្វើដំណើរចំណាយពេលប៉ុន្មានម៉ោង?", "How many hours does the journey take?", "kaa tver dom-naer chom-nai pel pon-man maong?", "Chuyến đi mất bao nhiêu giờ?"],
      ["ប្រហែលប្រាំមួយម៉ោង។", "About six hours.", "pro-hael pram-muoy maong.", "Khoảng sáu giờ."],
    ],
  },
  {
    title: "Checking in for a flight",
    titleVi: "Làm thủ tục chuyến bay",
    description: "Present travel documents, check a bag, and confirm the gate.",
    descriptionVi: "Đưa giấy tờ, ký gửi hành lý và xác nhận cửa ra máy bay.",
    turns: [
      ["សូមបង្ហាញលិខិតឆ្លងដែន និងសំបុត្រយន្តហោះ។", "Please show your passport and plane ticket.", "sohm bong-hanh likhet chhlong-den ning sombot yon-hoh.", "Vui lòng xuất trình hộ chiếu và vé máy bay."],
      ["នេះជាឯកសាររបស់ខ្ញុំ។", "Here are my documents.", "nih chea aek-sa robos khnyom.", "Đây là giấy tờ của tôi."],
      ["តើអ្នកមានវ៉ាលីផ្ញើទេ?", "Do you have a bag to check?", "tae neak mean vali phnyae te?", "Bạn có hành lý ký gửi không?"],
      ["បាទ ខ្ញុំមានវ៉ាលីមួយ។", "Yes, I have one suitcase.", "baat, khnyom mean vali muoy.", "Có, tôi có một vali."],
      ["ជើងហោះហើររបស់អ្នកចេញពីច្រកលេខប្រាំ។", "Your flight leaves from gate five.", "cherng hoh-haer robos neak chenh pi chrok lek pram.", "Chuyến bay của bạn đi từ cửa số năm."],
      ["អរគុណ តើខ្ញុំត្រូវទៅទីនោះឥឡូវនេះទេ?", "Thank you. Should I go there now?", "aw-kun, tae khnyom trov tov ti-noh ailov nih te?", "Cảm ơn. Tôi có cần đến đó ngay không?"],
    ],
  },
  {
    title: "Ordering a meal without meat",
    titleVi: "Gọi món không có thịt",
    description: "Ask about ingredients and order a vegetarian meal politely.",
    descriptionVi: "Hỏi thành phần và gọi món chay một cách lịch sự.",
    turns: [
      ["តើម្ហូបនេះមានសាច់ទេ?", "Does this dish contain meat?", "tae mhob nih mean sach te?", "Món này có thịt không?"],
      ["បាទ មានសាច់មាន់បន្តិច។", "Yes, it has a little chicken.", "baat, mean sach moan bon-tech.", "Có, món này có một ít thịt gà."],
      ["ខ្ញុំមិនញ៉ាំសាច់ទេ។", "I do not eat meat.", "khnyom min nyam sach te.", "Tôi không ăn thịt."],
      ["យើងអាចធ្វើដោយមិនដាក់សាច់បាន។", "We can make it without meat.", "yeung ach tver daoy min dak sach baan.", "Chúng tôi có thể làm món không có thịt."],
      ["ល្អណាស់ សូមធ្វើមួយចាន។", "Great. One plate, please.", "la-or nah, sohm tver muoy chan.", "Tốt quá. Cho tôi một phần."],
      ["តើអ្នកចង់ឲ្យហឹរតិចឬអត់ហឹរ?", "Would you like it mildly spicy or not spicy?", "tae neak chong aoy her tech reu ot her?", "Bạn muốn ít cay hay không cay?"],
    ],
  },
  {
    title: "Customising a coffee order",
    titleVi: "Tùy chỉnh món cà phê",
    description: "Choose hot or iced coffee and adjust milk and sugar.",
    descriptionVi: "Chọn cà phê nóng hoặc đá rồi điều chỉnh sữa và đường.",
    turns: [
      ["ខ្ញុំចង់បានកាហ្វេទឹកកកមួយកែវ។", "I would like one iced coffee.", "khnyom chong baan ka-fe teuk-kak muoy kaev.", "Tôi muốn một ly cà phê đá."],
      ["ដាក់ទឹកដោះគោទេ?", "Would you like milk in it?", "dak teuk-doh-ko te?", "Có thêm sữa không?"],
      ["បាទ ដាក់ទឹកដោះគោតិចៗ។", "Yes, add just a little milk.", "baat, dak teuk-doh-ko tech-tech.", "Có, thêm một ít sữa."],
      ["ចង់បានស្ករប៉ុន្មាន?", "How much sugar would you like?", "chong baan skaa pon-man?", "Bạn muốn bao nhiêu đường?"],
      ["កុំដាក់ស្ករ។", "Please do not add sugar.", "kom dak skaa.", "Đừng thêm đường."],
      ["បាន សូមរង់ចាំបន្តិច។", "All right. Please wait a moment.", "baan, sohm rong-cham bon-tech.", "Được. Vui lòng chờ một chút."],
    ],
  },
  {
    title: "Choosing the right clothing size",
    titleVi: "Chọn đúng cỡ quần áo",
    description: "Ask for another size, use a fitting room, and decide whether to buy.",
    descriptionVi: "Hỏi cỡ khác, thử đồ và quyết định mua.",
    turns: [
      ["តើអាវនេះមានទំហំធំជាងនេះទេ?", "Do you have this shirt in a larger size?", "tae aav nih mean tom-hom thom cheang nih te?", "Áo này có cỡ lớn hơn không?"],
      ["មាន។ អ្នកចង់សាកទំហំអិលទេ?", "Yes. Would you like to try size L?", "mean. neak chong sak tom-hom L te?", "Có. Bạn muốn thử cỡ L không?"],
      ["បាទ បន្ទប់សាកនៅឯណា?", "Yes. Where is the fitting room?", "baat, bontop sak nov ae-naa?", "Có. Phòng thử đồ ở đâu?"],
      ["នៅខាងក្រោយកញ្ចក់នោះ។", "It is behind that mirror.", "nov khang kraoy kan-chok noh.", "Ở phía sau chiếc gương đó."],
      ["អាវនេះសមល្អ។ តម្លៃប៉ុន្មាន?", "This shirt fits well. How much is it?", "aav nih som la-or. dom-lai pon-man?", "Áo này vừa đẹp. Giá bao nhiêu?"],
      ["ប្រាំបីម៉ឺនរៀល។", "Eighty thousand riel.", "pram-bei meun riel.", "Tám mươi nghìn riel."],
    ],
  },
  {
    title: "Buying a local SIM card",
    titleVi: "Mua SIM địa phương",
    description: "Compare data plans and ask staff to activate a SIM.",
    descriptionVi: "So sánh gói dữ liệu và nhờ nhân viên kích hoạt SIM.",
    turns: [
      ["ខ្ញុំចង់ទិញស៊ីមកាតសម្រាប់ប្រើអ៊ីនធឺណិត។", "I would like a SIM card for internet use.", "khnyom chong tinh sim-kat sam-rap prae internet.", "Tôi muốn mua SIM để dùng Internet."],
      ["អ្នកត្រូវការប្រើរយៈពេលប៉ុន្មានថ្ងៃ?", "How many days do you need it for?", "neak trov-kaa prae ro-yeak pel pon-man thngai?", "Bạn cần dùng trong bao nhiêu ngày?"],
      ["ខ្ញុំនៅទីនេះដប់ថ្ងៃ។", "I will be here for ten days.", "khnyom nov ti-nih dop thngai.", "Tôi ở đây mười ngày."],
      ["គម្រោងនេះមានទិន្នន័យម្ភៃជីហ្គាបៃ។", "This plan includes twenty gigabytes of data.", "kom-rong nih mean tin-na-nay mphei gigabyte.", "Gói này có hai mươi gigabyte dữ liệu."],
      ["ល្អ តើអ្នកអាចបើកដំណើរការឲ្យខ្ញុំបានទេ?", "Good. Can you activate it for me?", "la-or, tae neak ach baek dom-naer-kaa aoy khnyom baan te?", "Tốt. Bạn có thể kích hoạt giúp tôi không?"],
      ["បាន សូមឲ្យខ្ញុំមើលលិខិតឆ្លងដែន។", "Yes. May I see your passport?", "baan, sohm aoy khnyom merl likhet chhlong-den.", "Được. Cho tôi xem hộ chiếu nhé."],
    ],
  },
  {
    title: "Changing plans because of rain",
    titleVi: "Đổi kế hoạch vì trời mưa",
    description: "Discuss the weather and choose an indoor activity together.",
    descriptionVi: "Trao đổi về thời tiết và chọn hoạt động trong nhà.",
    turns: [
      ["ថ្ងៃនេះមេឃងងឹតណាស់។", "The sky is very dark today.", "thngai nih mekh ngo-ngeut nah.", "Hôm nay trời rất tối."],
      ["ខ្ញុំគិតថានឹងមានភ្លៀង។", "I think it is going to rain.", "khnyom kit tha neng mean phlieng.", "Tôi nghĩ trời sắp mưa."],
      ["ដូច្នេះ យើងមិនទៅឧទ្យានទេ។", "Then we will not go to the park.", "doch-nih, yeung min tov ut-tean te.", "Vậy chúng ta không đi công viên."],
      ["តើយើងទៅសារមន្ទីរវិញទេ?", "Shall we go to the museum instead?", "tae yeung tov sa-ra-mon-ti ving te?", "Chúng ta đi bảo tàng thay nhé?"],
      ["បាន គំនិតល្អ។", "Yes, that is a good idea.", "baan, kom-nit la-or.", "Được, ý hay đó."],
      ["ខ្ញុំនឹងយកឆ័ត្រទៅជាមួយ។", "I will bring an umbrella too.", "khnyom neng yok chhat tov chea-muoy.", "Tôi sẽ mang theo ô."],
    ],
  },
  {
    title: "Finding a place on foot",
    titleVi: "Tìm đường khi đi bộ",
    description: "Ask for directions and follow a sequence of landmarks.",
    descriptionVi: "Hỏi đường và đi theo các mốc chỉ dẫn.",
    turns: [
      ["សូមទោស តើធនាគារនៅឯណា?", "Excuse me, where is the bank?", "sohm-toh, tae tho-nea-kea nov ae-naa?", "Xin lỗi, ngân hàng ở đâu?"],
      ["ដើរត្រង់ទៅរហូតដល់ភ្លើងស្តុប។", "Walk straight until the traffic light.", "daer trong tov ro-hot dol phlerng stop.", "Đi thẳng đến đèn giao thông."],
      ["បន្ទាប់មក ខ្ញុំត្រូវបត់ទៅណា?", "Which way should I turn after that?", "bon-toap mok, khnyom trov bot tov naa?", "Sau đó tôi rẽ hướng nào?"],
      ["បត់ឆ្វេង ហើយដើរប្រហែលពីររយម៉ែត្រ។", "Turn left and walk about two hundred metres.", "bot chhveng haey daer pro-hael pi roy maet.", "Rẽ trái rồi đi khoảng hai trăm mét."],
      ["តើធនាគារនៅខាងណា?", "Which side is the bank on?", "tae tho-nea-kea nov khang naa?", "Ngân hàng ở phía nào?"],
      ["វានៅខាងស្តាំ ជាប់ហាងកាហ្វេ។", "It is on the right, next to the café.", "vea nov khang sdam, choap hang ka-fe.", "Nó ở bên phải, cạnh quán cà phê."],
    ],
  },
  {
    title: "Asking a teacher to repeat",
    titleVi: "Nhờ giáo viên nhắc lại",
    description: "Say that you do not understand and ask for a slower explanation.",
    descriptionVi: "Nói rằng bạn chưa hiểu và xin giải thích chậm hơn.",
    turns: [
      ["គ្រូ ខ្ញុំមិនទាន់យល់ទេ។", "Teacher, I do not understand yet.", "kru, khnyom min toan yol te.", "Thưa cô/thầy, tôi vẫn chưa hiểu."],
      ["តើអ្នកមិនយល់ត្រង់ណា?", "Which part do you not understand?", "tae neak min yol trong naa?", "Bạn chưa hiểu phần nào?"],
      ["ខ្ញុំមិនយល់ពាក្យចុងក្រោយទេ។", "I do not understand the last word.", "khnyom min yol peak chong-kraoy te.", "Tôi không hiểu từ cuối cùng."],
      ["ខ្ញុំនឹងពន្យល់ម្តងទៀត។", "I will explain it again.", "khnyom neng pon-yol mdong tiet.", "Tôi sẽ giải thích lại."],
      ["សូមនិយាយយឺតជាងនេះបន្តិច។", "Please speak a little more slowly.", "sohm ni-yeay yeut cheang nih bon-tech.", "Vui lòng nói chậm hơn một chút."],
      ["បាន ស្តាប់ដោយប្រុងប្រយ័ត្ន។", "All right. Listen carefully.", "baan, sdap daoy prong-pro-yat.", "Được. Hãy nghe kỹ nhé."],
    ],
  },
  {
    title: "Clarifying a task at work",
    titleVi: "Làm rõ nhiệm vụ tại nơi làm việc",
    description: "Confirm a deadline, file format, and who should receive the work.",
    descriptionVi: "Xác nhận hạn chót, định dạng tệp và người nhận công việc.",
    turns: [
      ["តើរបាយការណ៍នេះត្រូវរួចនៅពេលណា?", "When does this report need to be finished?", "tae ro-bay-kaa nih trov ruoch nov pel naa?", "Báo cáo này cần hoàn thành khi nào?"],
      ["សូមធ្វើឲ្យរួចមុនថ្ងៃសុក្រ។", "Please finish it before Friday.", "sohm tver aoy ruoch mun thngai sok.", "Vui lòng hoàn thành trước thứ Sáu."],
      ["តើខ្ញុំត្រូវផ្ញើជាឯកសារ PDF ទេ?", "Should I send it as a PDF file?", "tae khnyom trov phnyae chea aek-sa PDF te?", "Tôi cần gửi dưới dạng PDF phải không?"],
      ["បាទ ហើយសូមផ្ញើច្បាប់ចម្លងឲ្យអ្នកគ្រប់គ្រង។", "Yes, and send a copy to the manager.", "baat, haey sohm phnyae chbab chom-long aoy neak krop-krong.", "Đúng, và gửi một bản cho quản lý."],
      ["ខ្ញុំយល់ហើយ។ តើមានអ្វីទៀតទេ?", "I understand. Is there anything else?", "khnyom yol haey. tae mean avei tiet te?", "Tôi hiểu rồi. Còn gì nữa không?"],
      ["គ្មានទេ អរគុណ។", "No, that is all. Thank you.", "kmean te, aw-kun.", "Không, vậy là đủ. Cảm ơn."],
    ],
  },
  {
    title: "Inviting a friend to dinner",
    titleVi: "Mời bạn đi ăn tối",
    description: "Make an invitation, negotiate a time, and choose where to meet.",
    descriptionVi: "Mời bạn, thống nhất thời gian và chọn chỗ gặp.",
    turns: [
      ["តើអ្នកទំនេរញ៉ាំបាយល្ងាចជាមួយខ្ញុំទេ?", "Are you free to have dinner with me?", "tae neak tom-ne nyam bai lngach chea-muoy khnyom te?", "Bạn có rảnh ăn tối cùng tôi không?"],
      ["ទំនេរ។ ថ្ងៃណា?", "I am free. Which day?", "tom-ne. thngai naa?", "Tôi rảnh. Ngày nào?"],
      ["ល្ងាចថ្ងៃសៅរ៍បានទេ?", "Would Saturday evening work?", "lngach thngai sao baan te?", "Tối thứ Bảy được không?"],
      ["បាន ប៉ុន្តែខ្ញុំទំនេរក្រោយម៉ោងប្រាំពីរ។", "Yes, but I am free after seven.", "baan, pon-tae khnyom tom-ne kraoy maong pram-pi.", "Được, nhưng tôi rảnh sau bảy giờ."],
      ["យើងជួបគ្នានៅមុខភោជនីយដ្ឋានម៉ោងប្រាំពីរកន្លះ។", "Let us meet in front of the restaurant at seven thirty.", "yeung chuop knea nov muk pho-chea-ni-ya-than maong pram-pi kon-lah.", "Gặp nhau trước nhà hàng lúc bảy giờ rưỡi nhé."],
      ["ល្អណាស់ ជួបគ្នាថ្ងៃសៅរ៍។", "Great. See you on Saturday.", "la-or nah, chuop knea thngai sao.", "Tốt quá. Hẹn gặp vào thứ Bảy."],
    ],
  },
  {
    title: "Choosing a birthday gift",
    titleVi: "Chọn quà sinh nhật",
    description: "Discuss what someone likes and decide on a practical present.",
    descriptionVi: "Nói về sở thích của người nhận và chọn món quà phù hợp.",
    turns: [
      ["ថ្ងៃស្អែកជាថ្ងៃកំណើតរបស់សុភា។", "Tomorrow is Sophea's birthday.", "thngai saek chea thngai kom-naet robos Sophea.", "Ngày mai là sinh nhật của Sophea."],
      ["យើងគួរទិញអ្វីឲ្យគាត់?", "What should we buy for her?", "yeung kuor tinh avei aoy koat?", "Chúng ta nên mua gì tặng cô ấy?"],
      ["គាត់ចូលចិត្តអានសៀវភៅ។", "She likes reading books.", "koat chol-chet an siev-phov.", "Cô ấy thích đọc sách."],
      ["អ៊ីចឹង យើងទិញសៀវភៅមួយក្បាល។", "Then let us buy a book.", "e-cheng, yeung tinh siev-phov muoy kbaal.", "Vậy chúng ta mua một cuốn sách."],
      ["តើយើងត្រូវការក្រដាសខ្ចប់អំណោយទេ?", "Do we need gift-wrapping paper?", "tae yeung trov-kaa kro-das khchop om-naoy te?", "Chúng ta có cần giấy gói quà không?"],
      ["បាទ ហើយសរសេរកាតជូនពរផង។", "Yes, and let us write a greeting card too.", "baat, haey sor-se kat choun-por phong.", "Có, và viết thêm thiệp chúc mừng."],
    ],
  },
  {
    title: "Apologising and rescheduling",
    titleVi: "Xin lỗi và đổi lịch",
    description: "Cancel politely, explain briefly, and agree a new meeting time.",
    descriptionVi: "Hủy lịch lịch sự, giải thích ngắn gọn và thống nhất giờ mới.",
    turns: [
      ["សុំទោស ខ្ញុំមិនអាចមកជួបអ្នកល្ងាចនេះបានទេ។", "I am sorry, but I cannot meet you this evening.", "som-toh, khnyom min ach mok chuop neak lngach nih baan te.", "Xin lỗi, tối nay tôi không thể gặp bạn."],
      ["មានបញ្ហាអ្វីទេ?", "Is something wrong?", "mean ban-ha avei te?", "Có chuyện gì không?"],
      ["ខ្ញុំត្រូវធ្វើការយឺត។", "I have to work late.", "khnyom trov tver kaa yeut.", "Tôi phải làm việc muộn."],
      ["មិនអីទេ។ តើយើងជួបគ្នាថ្ងៃស្អែកបានទេ?", "That is all right. Can we meet tomorrow?", "min ei te. tae yeung chuop knea thngai saek baan te?", "Không sao. Ngày mai chúng ta gặp được không?"],
      ["បាន ម៉ោងដប់ព្រឹកល្អទេ?", "Yes. Is ten in the morning good?", "baan, maong dop preuk la-or te?", "Được. Mười giờ sáng có được không?"],
      ["ល្អ ជួបគ្នាម៉ោងដប់។", "Good. See you at ten.", "la-or, chuop knea maong dop.", "Được. Hẹn gặp lúc mười giờ."],
    ],
  },
  {
    title: "Looking for a lost phone",
    titleVi: "Tìm điện thoại bị mất",
    description: "Describe a missing phone and retrace the last place it was used.",
    descriptionVi: "Mô tả điện thoại bị mất và nhớ lại nơi sử dụng gần nhất.",
    turns: [
      ["ខ្ញុំរកទូរស័ព្ទមិនឃើញទេ។", "I cannot find my phone.", "khnyom rok tu-ro-sap min khern te.", "Tôi không tìm thấy điện thoại."],
      ["អ្នកបានប្រើវាចុងក្រោយនៅឯណា?", "Where did you use it last?", "neak baan prae vea chong-kraoy nov ae-naa?", "Lần cuối bạn dùng nó ở đâu?"],
      ["ខ្ញុំបានប្រើវានៅក្នុងហាងកាហ្វេ។", "I used it in the café.", "khnyom baan prae vea nov knong hang ka-fe.", "Tôi đã dùng nó trong quán cà phê."],
      ["តើវាមានពណ៌អ្វី?", "What colour is it?", "tae vea mean poa avei?", "Nó màu gì?"],
      ["វាមានពណ៌ខ្មៅ និងមានស្រោមពណ៌ខៀវ។", "It is black with a blue case.", "vea mean poa khmav ning mean sraom poa khiev.", "Nó màu đen và có ốp màu xanh."],
      ["យើងត្រឡប់ទៅសួរបុគ្គលិកនៅទីនោះ។", "Let us go back and ask the staff there.", "yeung tro-lop tov suor bok-kolik nov ti-noh.", "Chúng ta quay lại hỏi nhân viên ở đó."],
    ],
  },
  {
    title: "Asking for urgent help",
    titleVi: "Yêu cầu giúp đỡ khẩn cấp",
    description: "Get attention, identify the problem, and request appropriate assistance.",
    descriptionVi: "Gọi người hỗ trợ, nói vấn đề và yêu cầu giúp đỡ phù hợp.",
    turns: [
      ["សូមជួយផង! មិត្តរបស់ខ្ញុំដួល។", "Please help! My friend has fallen.", "sohm chuoy phong! mit robos khnyom duol.", "Xin hãy giúp! Bạn tôi bị ngã."],
      ["តើគាត់នៅដឹងខ្លួនទេ?", "Is your friend conscious?", "tae koat nov deng khluon te?", "Bạn ấy còn tỉnh không?"],
      ["បាទ ប៉ុន្តែគាត់ឈឺជើងខ្លាំង។", "Yes, but their leg hurts badly.", "baat, pon-tae koat chheu cherng khlang.", "Có, nhưng chân bạn ấy đau nhiều."],
      ["កុំឲ្យគាត់ក្រោកឡើងសិន។", "Do not let them stand up yet.", "kom aoy koat kraok laeng sen.", "Đừng để bạn ấy đứng dậy vội."],
      ["តើអាចហៅឡានពេទ្យបានទេ?", "Can you call an ambulance?", "tae ach hav laan-pet baan te?", "Có thể gọi xe cấp cứu không?"],
      ["បាន ខ្ញុំនឹងហៅឥឡូវនេះ។", "Yes, I will call now.", "baan, khnyom neng hav ailov nih.", "Được, tôi sẽ gọi ngay."],
    ],
  },
  {
    title: "Renting a bicycle safely",
    titleVi: "Thuê xe đạp an toàn",
    description: "Check the rental period, lock, brakes, and return conditions.",
    descriptionVi: "Kiểm tra thời gian thuê, khóa, phanh và điều kiện trả xe.",
    turns: [
      ["ខ្ញុំចង់ជួលកង់មួយថ្ងៃ។", "I would like to rent a bicycle for one day.", "khnyom chong chuol kong muoy thngai.", "Tôi muốn thuê xe đạp một ngày."],
      ["អ្នកអាចយកកង់នេះបាន។", "You can take this bicycle.", "neak ach yok kong nih baan.", "Bạn có thể lấy chiếc xe này."],
      ["តើមានសោ និងមួកសុវត្ថិភាពទេ?", "Does it include a lock and helmet?", "tae mean sao ning muok so-vat-the-phiap te?", "Có khóa và mũ bảo hiểm không?"],
      ["បាទ មានទាំងពីរ។", "Yes, both are included.", "baat, mean teang pi.", "Có, gồm cả hai."],
      ["សូមជួយពិនិត្យហ្វ្រាំងមុន។", "Please check the brakes first.", "sohm chuoy pi-nit frang mun.", "Vui lòng kiểm tra phanh trước."],
      ["បាន ហើយសូមយកមកវិញមុនម៉ោងប្រាំមួយល្ងាច។", "All right, and return it before six this evening.", "baan, haey sohm yok mok ving mun maong pram-muoy lngach.", "Được, và vui lòng trả trước sáu giờ tối."],
    ],
  },
  {
    title: "Sending a parcel",
    titleVi: "Gửi một bưu kiện",
    description: "Choose a delivery speed, state the contents, and complete an address form.",
    descriptionVi: "Chọn tốc độ giao, khai nội dung và điền địa chỉ.",
    turns: [
      ["ខ្ញុំចង់ផ្ញើកញ្ចប់នេះទៅបាត់ដំបង។", "I would like to send this parcel to Battambang.", "khnyom chong phnyae kan-chop nih tov Battambang.", "Tôi muốn gửi bưu kiện này đến Battambang."],
      ["អ្នកចង់ផ្ញើធម្មតា ឬរហ័ស?", "Would you like standard or express delivery?", "neak chong phnyae thom-ma-da reu ro-hah?", "Bạn muốn gửi thường hay nhanh?"],
      ["ផ្ញើធម្មតាបានហើយ។", "Standard delivery is fine.", "phnyae thom-ma-da baan haey.", "Gửi thường là được."],
      ["នៅក្នុងកញ្ចប់មានអ្វី?", "What is inside the parcel?", "nov knong kan-chop mean avei?", "Trong bưu kiện có gì?"],
      ["មានសៀវភៅពីរក្បាល។", "There are two books inside.", "mean siev-phov pi kbaal.", "Có hai cuốn sách."],
      ["សូមបំពេញឈ្មោះ និងអាសយដ្ឋាននៅទីនេះ។", "Please complete the name and address here.", "sohm bom-pen chhmoh ning a-sa-ya-than nov ti-nih.", "Vui lòng điền tên và địa chỉ ở đây."],
    ],
  },
  {
    title: "Buying admission to a museum",
    titleVi: "Mua vé vào bảo tàng",
    description: "Buy admission, ask about opening hours, and check photography rules.",
    descriptionVi: "Mua vé, hỏi giờ mở cửa và quy định chụp ảnh.",
    turns: [
      ["សំបុត្រចូលសារមន្ទីរពីរ សូម។", "Two museum tickets, please.", "sombot chol sa-ra-mon-ti pi, sohm.", "Cho tôi hai vé vào bảo tàng."],
      ["សម្រាប់មនុស្សពេញវ័យពីរនាក់មែនទេ?", "Are they for two adults?", "sam-rap mo-nus pen-voay pi neak men te?", "Vé cho hai người lớn phải không?"],
      ["បាទ។ សារមន្ទីរបិទម៉ោងប៉ុន្មាន?", "Yes. What time does the museum close?", "baat. sa-ra-mon-ti bet maong pon-man?", "Đúng. Bảo tàng đóng cửa lúc mấy giờ?"],
      ["បិទម៉ោងប្រាំល្ងាច។", "It closes at five in the evening.", "bet maong pram lngach.", "Đóng cửa lúc năm giờ chiều."],
      ["តើអាចថតរូបនៅខាងក្នុងបានទេ?", "May we take photos inside?", "tae ach thot rup nov khang knong baan te?", "Có được chụp ảnh bên trong không?"],
      ["អាចថតបាន ប៉ុន្តែកុំប្រើភ្លើងហ្វ្លាស។", "Yes, but please do not use flash.", "ach thot baan, pon-tae kom prae phlerng flash.", "Được, nhưng vui lòng không dùng đèn flash."],
    ],
  },
  {
    title: "Visiting someone at home",
    titleVi: "Đến thăm nhà một người bạn",
    description: "Arrive politely, offer a small gift, and respond to hospitality.",
    descriptionVi: "Đến nhà lịch sự, tặng quà nhỏ và đáp lại sự hiếu khách.",
    turns: [
      ["សួស្តី អរគុណដែលអញ្ជើញខ្ញុំមកផ្ទះ។", "Hello. Thank you for inviting me to your home.", "suo-sdei, aw-kun del anh-chernh khnyom mok pteah.", "Xin chào. Cảm ơn bạn đã mời tôi đến nhà."],
      ["សូមស្វាគមន៍! ចូលមកខាងក្នុង។", "Welcome! Please come inside.", "sohm sva-kom! chol mok khang knong.", "Chào mừng! Mời vào trong."],
      ["ខ្ញុំមានផ្លែឈើបន្តិចជូនគ្រួសារអ្នក។", "I brought some fruit for your family.", "khnyom mean phlae-chher bon-tech choun kruo-sa neak.", "Tôi mang một ít trái cây tặng gia đình bạn."],
      ["អរគុណច្រើន។ អញ្ជើញអង្គុយ។", "Thank you very much. Please sit down.", "aw-kun chraen. anh-chernh ong-kuy.", "Cảm ơn nhiều. Mời ngồi."],
      ["តើខ្ញុំអាចជួយរៀបចំអាហារបានទេ?", "May I help prepare the food?", "tae khnyom ach chuoy riep-chom aha baan te?", "Tôi có thể phụ chuẩn bị thức ăn không?"],
      ["មិនបាច់ទេ សូមសម្រាក។", "There is no need. Please relax.", "min bach te, sohm som-rak.", "Không cần đâu. Bạn cứ nghỉ ngơi."],
    ],
  },
  {
    title: "Getting a haircut",
    titleVi: "Đi cắt tóc",
    description: "Explain the preferred length and confirm the style before cutting.",
    descriptionVi: "Nói độ dài mong muốn và xác nhận kiểu tóc trước khi cắt.",
    turns: [
      ["ខ្ញុំចង់កាត់សក់។", "I would like a haircut.", "khnyom chong kat sok.", "Tôi muốn cắt tóc."],
      ["អ្នកចង់កាត់ខ្លីប៉ុន្មាន?", "How short would you like it?", "neak chong kat khlei pon-man?", "Bạn muốn cắt ngắn bao nhiêu?"],
      ["សូមកាត់ខាងចំហៀងខ្លី ហើយទុកខាងលើបន្តិច។", "Please cut the sides short and leave some length on top.", "sohm kat khang chom-hieng khlei haey tuk khang ler bon-tech.", "Cắt ngắn hai bên và để dài một chút phía trên."],
      ["តើអ្នកចង់កក់សក់ដែរទេ?", "Would you like a hair wash too?", "tae neak chong kok sok dae te?", "Bạn có muốn gội đầu không?"],
      ["បាទ សូមកក់សក់ផង។", "Yes, a hair wash too, please.", "baat, sohm kok sok phong.", "Có, vui lòng gội đầu luôn."],
      ["បាន សូមអង្គុយត្រង់នេះ។", "All right. Please sit here.", "baan, sohm ong-kuy trong nih.", "Được. Mời ngồi ở đây."],
    ],
  },
  {
    title: "Opening a bank account",
    titleVi: "Mở tài khoản ngân hàng",
    description: "Ask about required documents and understand the next verification step.",
    descriptionVi: "Hỏi giấy tờ cần thiết và hiểu bước xác minh tiếp theo.",
    turns: [
      ["ខ្ញុំចង់បើកគណនីធនាគារ។", "I would like to open a bank account.", "khnyom chong baek ko-nea-ni tho-nea-kea.", "Tôi muốn mở tài khoản ngân hàng."],
      ["តើអ្នកមានលិខិតឆ្លងដែន និងអាសយដ្ឋាននៅកម្ពុជាទេ?", "Do you have a passport and an address in Cambodia?", "tae neak mean likhet chhlong-den ning a-sa-ya-than nov Kampuchea te?", "Bạn có hộ chiếu và địa chỉ tại Campuchia không?"],
      ["បាទ ខ្ញុំមានទាំងពីរ។", "Yes, I have both.", "baat, khnyom mean teang pi.", "Có, tôi có cả hai."],
      ["សូមបំពេញពាក្យសុំនេះ។", "Please complete this application form.", "sohm bom-pen peak-som nih.", "Vui lòng điền đơn này."],
      ["តើខ្ញុំអាចប្រើកម្មវិធីធនាគារបានភ្លាមទេ?", "Can I use the banking app immediately?", "tae khnyom ach prae kam-vi-thi tho-nea-kea baan phliam te?", "Tôi có thể dùng ứng dụng ngân hàng ngay không?"],
      ["បន្ទាប់ពីផ្ទៀងផ្ទាត់ អ្នកអាចប្រើបាន។", "You can use it after verification.", "bon-toap pi phtieng-phtat, neak ach prae baan.", "Bạn có thể dùng sau khi xác minh."],
    ],
  },
  {
    title: "Explaining a food allergy",
    titleVi: "Giải thích dị ứng thực phẩm",
    description: "State an allergy clearly and confirm how the kitchen will avoid it.",
    descriptionVi: "Nói rõ tình trạng dị ứng và xác nhận cách bếp tránh nguyên liệu đó.",
    turns: [
      ["ខ្ញុំមានអាឡែស៊ីសណ្តែកដី។", "I am allergic to peanuts.", "khnyom mean a-lae-si son-daek-dei.", "Tôi bị dị ứng đậu phộng."],
      ["តើអាឡែស៊ីរបស់អ្នកធ្ងន់ធ្ងរទេ?", "Is your allergy severe?", "tae a-lae-si robos neak thngon-thngor te?", "Dị ứng của bạn có nghiêm trọng không?"],
      ["បាទ សូមកុំដាក់សណ្តែកដីក្នុងម្ហូប។", "Yes. Please do not put peanuts in the food.", "baat, sohm kom dak son-daek-dei knong mhob.", "Có. Vui lòng không cho đậu phộng vào món ăn."],
      ["ខ្ញុំនឹងប្រាប់ចុងភៅ។", "I will tell the cook.", "khnyom neng prap chong-phov.", "Tôi sẽ báo cho đầu bếp."],
      ["តើប្រេងនេះបានប្រើចម្អិនសណ្តែកដីទេ?", "Has this oil been used to cook peanuts?", "tae preng nih baan prae chom-in son-daek-dei te?", "Dầu này có dùng để nấu đậu phộng không?"],
      ["ទេ យើងនឹងប្រើខ្ទះស្អាតដាច់ដោយឡែក។", "No. We will use a separate clean pan.", "te, yeung neng prae khteah sa-at dach daoy laek.", "Không. Chúng tôi sẽ dùng chảo sạch riêng."],
    ],
  },
  {
    title: "Planning a weekend trip",
    titleVi: "Lên kế hoạch chuyến đi cuối tuần",
    description: "Compare transport, decide when to leave, and divide preparation tasks.",
    descriptionVi: "So sánh phương tiện, chọn giờ đi và chia việc chuẩn bị.",
    turns: [
      ["ចុងសប្តាហ៍នេះ យើងទៅកំពតទេ?", "Shall we go to Kampot this weekend?", "chong sap-da nih, yeung tov Kampot te?", "Cuối tuần này chúng ta đi Kampot nhé?"],
      ["បាន។ យើងទៅដោយឡាន ឬរថភ្លើង?", "Sure. Shall we go by car or train?", "baan. yeung tov daoy laan reu rot-phlerng?", "Được. Chúng ta đi ô tô hay tàu?"],
      ["រថភ្លើងស្រួលជាង ហើយអាចមើលទេសភាពបាន។", "The train is easier, and we can see the scenery.", "rot-phlerng sruol cheang haey ach merl tesapheap baan.", "Đi tàu tiện hơn và có thể ngắm cảnh."],
      ["យើងគួរចេញព្រឹកថ្ងៃសៅរ៍។", "We should leave on Saturday morning.", "yeung kuor chenh preuk thngai sao.", "Chúng ta nên đi sáng thứ Bảy."],
      ["ខ្ញុំនឹងកក់សំបុត្រ។", "I will book the tickets.", "khnyom neng kok sombot.", "Tôi sẽ đặt vé."],
      ["ខ្ញុំនឹងរកកន្លែងស្នាក់នៅ។", "I will find accommodation.", "khnyom neng rok kon-laeng snak nov.", "Tôi sẽ tìm chỗ ở."],
    ],
  },
  {
    title: "Finding the restroom",
    titleVi: "Tìm nhà vệ sinh",
    description: "Ask where the restroom is and understand a short direction.",
    descriptionVi: "Hỏi vị trí nhà vệ sinh và hiểu chỉ dẫn ngắn.",
    turns: [
      ["សូមទោស បន្ទប់ទឹកនៅឯណា?", "Excuse me, where is the restroom?", "sohm-toh, bontop-teuk nov ae-naa?", "Xin lỗi, nhà vệ sinh ở đâu?"],
      ["បន្ទប់ទឹកនៅខាងឆ្វេង ជិតជណ្តើរ។", "The restroom is on the left, near the stairs.", "bontop-teuk nov khang chhveng, chit chandaeu.", "Nhà vệ sinh ở bên trái, gần cầu thang."],
      ["តើខ្ញុំត្រូវបង់ប្រាក់ទេ?", "Do I need to pay?", "tae khnyom trov bang-prak te?", "Tôi có cần trả tiền không?"],
      ["មិនបាច់ទេ អ្នកអាចប្រើបាន។", "No, you can use it.", "min-bach te, neak ach prae baan.", "Không, bạn có thể dùng."],
      ["អរគុណច្រើន។", "Thank you very much.", "aw-kun chraen.", "Cảm ơn rất nhiều."],
    ],
  },
  {
    title: "Handing in a lost wallet",
    titleVi: "Nộp lại ví bị thất lạc",
    description: "Report a found wallet and leave it safely with staff.",
    descriptionVi: "Báo tìm thấy ví và gửi lại cho nhân viên an toàn.",
    turns: [
      ["ខ្ញុំបានរកឃើញកាបូបលុយមួយ។", "I found a wallet.", "khnyom baan rok-khoeunh ka-bao-loy muoy.", "Tôi tìm thấy một chiếc ví."],
      ["សូមយកវាទៅកន្លែងព័ត៌មាន។", "Please take it to the information desk.", "sohm yok vea tov kon-laeng por-mean.", "Vui lòng mang nó đến quầy thông tin."],
      ["តើមានអត្តសញ្ញាណប័ណ្ណនៅខាងក្នុងទេ?", "Is there an ID card inside?", "tae mean at-sanh-nhean ban nov khang-knong te?", "Có thẻ căn cước bên trong không?"],
      ["មាន ខ្ញុំនឹងទុកវាជាមួយបុគ្គលិក។", "Yes. I will leave it with a staff member.", "mean, khnyom neng tuk vea chea-muoy bok-kolik.", "Có. Tôi sẽ gửi nó cho nhân viên."],
      ["អរគុណដែលបានជួយ។", "Thank you for helping.", "aw-kun del baan chuoy.", "Cảm ơn vì đã giúp."],
    ],
  },
  {
    title: "Connecting to Wi-Fi",
    titleVi: "Kết nối Wi-Fi",
    description: "Ask for the Wi-Fi password and check the connection.",
    descriptionVi: "Hỏi mật khẩu Wi-Fi và kiểm tra kết nối.",
    turns: [
      ["តើនៅទីនេះមានវ៉ាយហ្វាយទេ?", "Is there Wi-Fi here?", "tae nov ti-nih mean wai-fai te?", "Ở đây có Wi-Fi không?"],
      ["មាន លេខសម្ងាត់សរសេរនៅលើក្រដាសនេះ។", "Yes. The password is written on this paper.", "mean, lek som-ngat sor-sae nov ler kra-daas nih.", "Có. Mật khẩu được viết trên tờ giấy này."],
      ["តើសញ្ញាខ្លាំងទេ?", "Is the signal strong?", "tae sanh-nhea khlang te?", "Tín hiệu có mạnh không?"],
      ["បាទ សញ្ញាល្អនៅជិតតុនេះ។", "Yes, the signal is good near this table.", "baat, sanh-nhea la-or nov chit to-nih.", "Có, tín hiệu tốt gần bàn này."],
      ["អរគុណ ខ្ញុំនឹងភ្ជាប់ឥឡូវនេះ។", "Thank you. I will connect now.", "aw-kun, khnyom neng phchoap ailov nih.", "Cảm ơn. Tôi sẽ kết nối ngay bây giờ."],
    ],
  },
];

function buildDialogueLessons(): LessonMock[] {
  return dialogueSeeds.map((dialogue, dialogueIndex) => ({
    id: `a1-expansion-dialogue-${String(dialogueIndex + 1).padStart(2, "0")}`,
    categoryId: "module_3",
    title: dialogue.title,
    description: dialogue.description,
    xpReward: 18,
    type: "conversation",
    content: dialogue.turns.map(([front, back, desc], turnIndex) => ({
      id: `a1-expansion-d${String(dialogueIndex + 1).padStart(2, "0")}-t${String(turnIndex + 1).padStart(2, "0")}`,
      front,
      back,
      desc,
      audioId: `a1-expansion-d${String(dialogueIndex + 1).padStart(2, "0")}-t${String(turnIndex + 1).padStart(2, "0")}`,
      speaker: turnIndex % 2 === 0 ? "female" : "male",
      speakerName: turnIndex % 2 === 0 ? "Sreymom" : "Piseth",
    })),
  }));
}

export const EXPANDED_DIALOGUE_LESSONS = buildDialogueLessons();

const writingSets = [
  {
    id: "write-practical-profile",
    title: "Copy personal information words",
    titleVi: "Chép các từ thông tin cá nhân",
    description: "Copy useful form words without claiming an unreviewed stroke order.",
    descriptionVi: "Chép các từ thường gặp trên biểu mẫu mà không suy đoán thứ tự nét chưa kiểm duyệt.",
    cards: [
      ["ឈ្មោះ", "Name", "chhmoh"], ["ប្រទេស", "Country", "bro-tes"], ["ទីក្រុង", "City", "ti-krong"],
      ["ភាសា", "Language", "phea-sa"], ["លេខទូរស័ព្ទ", "Phone number", "lek tu-ro-sap"],
    ],
  },
  {
    id: "write-practical-signs",
    title: "Copy signs you see every day",
    titleVi: "Chép biển báo thường gặp",
    description: "Practise whole-word spacing with common public signs.",
    descriptionVi: "Luyện bố cục từ hoàn chỉnh qua các biển báo công cộng quen thuộc.",
    cards: [
      ["ចូល", "Enter", "chol"], ["ចេញ", "Exit", "chenh"], ["បើក", "Open", "baek"],
      ["បិទ", "Closed", "bet"], ["បង្គន់", "Restroom", "bong-kon"],
    ],
  },
  {
    id: "write-polite-phrases",
    title: "Copy polite Khmer phrases",
    titleVi: "Chép các câu Khmer lịch sự",
    description: "Build control by copying short phrases from a clear model.",
    descriptionVi: "Luyện kiểm soát nét bằng cách chép câu ngắn từ mẫu rõ ràng.",
    cards: [
      ["សូម", "Please", "sohm"], ["អរគុណ", "Thank you", "aw-kun"], ["សុំទោស", "Sorry", "som-toh"],
      ["មិនអីទេ", "It is all right", "min ei te"], ["លាហើយ", "Goodbye", "lea haey"],
    ],
  },
  {
    id: "write-short-sentences",
    title: "Copy complete beginner sentences",
    titleVi: "Chép câu hoàn chỉnh cho người mới",
    description: "Copy one complete sentence at a time, preserving Khmer punctuation and spacing.",
    descriptionVi: "Chép từng câu hoàn chỉnh, giữ đúng dấu câu và khoảng cách Khmer.",
    cards: [
      ["ខ្ញុំរៀនភាសាខ្មែរ។", "I study Khmer.", "khnyom rien phea-sa Khmer"],
      ["ខ្ញុំចូលចិត្តអានសៀវភៅ។", "I like reading books.", "khnyom chol-chet an siev-phov"],
      ["ថ្ងៃនេះអាកាសធាតុល្អ។", "The weather is good today.", "thngai nih a-kas-theat la-or"],
      ["សូមនិយាយយឺតៗ។", "Please speak slowly.", "sohm ni-yeay yeut-yeut"],
      ["ជួបគ្នាថ្ងៃស្អែក។", "See you tomorrow.", "chuop knea thngai saek"],
    ],
  },
] as const;

export const EXPANDED_WRITING_LESSONS: LessonMock[] = writingSets.map((set) => ({
  id: set.id,
  categoryId: "module_4",
  title: set.title,
  description: set.description,
  xpReward: 24,
  type: "flashcard",
  content: set.cards.map(([front, back, desc], index) => ({
    id: `${set.id}-${index + 1}`,
    front,
    back,
    desc,
    audioId: `${set.id}-${index + 1}`,
  })),
}));

const reviewSeeds = [
  ["Travel time", "តើឡានចេញម៉ោងប៉ុន្មាន?", "What time does the bus leave?", ["តើឡាន", "ចេញ", "ម៉ោងប៉ុន្មាន?"]],
  ["Hotel help", "ម៉ាស៊ីនត្រជាក់មិនដំណើរការ។", "The air conditioner is not working.", ["ម៉ាស៊ីនត្រជាក់", "មិន", "ដំណើរការ។"]],
  ["At the pharmacy", "ខ្ញុំឈឺក្បាល។", "I have a headache.", ["ខ្ញុំ", "ឈឺ", "ក្បាល។"]],
  ["Finding a bank", "ធនាគារនៅឯណា?", "Where is the bank?", ["ធនាគារ", "នៅ", "ឯណា?"]],
  ["Restaurant request", "កុំដាក់ស្ករ។", "Do not add sugar.", ["កុំ", "ដាក់", "ស្ករ។"]],
  ["Food safety", "ខ្ញុំមានអាឡែស៊ីសណ្តែកដី។", "I am allergic to peanuts.", ["ខ្ញុំ", "មានអាឡែស៊ី", "សណ្តែកដី។"]],
  ["Weather plan", "ខ្ញុំនឹងយកឆ័ត្រ។", "I will bring an umbrella.", ["ខ្ញុំ", "នឹងយក", "ឆ័ត្រ។"]],
  ["Classroom language", "សូមនិយាយយឺតជាងនេះ។", "Please speak more slowly.", ["សូម", "និយាយ", "យឺតជាងនេះ។"]],
  ["Work deadline", "សូមធ្វើឲ្យរួចមុនថ្ងៃសុក្រ។", "Please finish it before Friday.", ["សូម", "ធ្វើឲ្យរួច", "មុនថ្ងៃសុក្រ។"]],
  ["Making plans", "យើងជួបគ្នាម៉ោងប្រាំពីរ។", "Let us meet at seven.", ["យើង", "ជួបគ្នា", "ម៉ោងប្រាំពីរ។"]],
  ["Lost property", "ខ្ញុំរកទូរស័ព្ទមិនឃើញទេ។", "I cannot find my phone.", ["ខ្ញុំ", "រកទូរស័ព្ទ", "មិនឃើញទេ។"]],
  ["Urgent help", "សូមហៅឡានពេទ្យ។", "Please call an ambulance.", ["សូម", "ហៅ", "ឡានពេទ្យ។"]],
  ["Returning a rental", "សូមយកកង់មកវិញមុនម៉ោងប្រាំមួយ។", "Please return the bicycle before six.", ["សូម", "យកកង់មកវិញ", "មុនម៉ោងប្រាំមួយ។"]],
  ["Sending a parcel", "ខ្ញុំចង់ផ្ញើកញ្ចប់នេះ។", "I would like to send this parcel.", ["ខ្ញុំ", "ចង់ផ្ញើ", "កញ្ចប់នេះ។"]],
  ["Museum rules", "កុំប្រើភ្លើងហ្វ្លាស។", "Do not use flash.", ["កុំ", "ប្រើ", "ភ្លើងហ្វ្លាស។"]],
] as const;

export const EXPANDED_REVIEW_LESSONS: LessonMock[] = reviewSeeds.map(
  ([title, khmer, english, sentence], index) => {
    const next = reviewSeeds[(index + 1) % reviewSeeds.length] ?? reviewSeeds[0];
    const other = reviewSeeds[(index + 4) % reviewSeeds.length] ?? reviewSeeds[1];
    return {
      id: `review-expansion-${String(index + 1).padStart(2, "0")}`,
      categoryId: "module_5",
      title: `Practical review · ${title}`,
      description: "A four-skill checkpoint using a new real-life situation.",
      xpReward: 38,
      type: "quiz",
      activities: [
        {
          type: "audioChoice",
          prompt: "Listen and choose the matching Khmer sentence.",
          audioId: `review-expansion-${String(index + 1).padStart(2, "0")}-listen`,
          audioText: khmer,
          options: [khmer, next[1], other[1]],
          answer: khmer,
        },
        {
          type: "multipleChoice",
          prompt: `What does “${khmer}” mean?`,
          options: [english, next[2], other[2]],
          answer: english,
        },
        { type: "ordering", items: [...sentence].reverse(), answer: [...sentence] },
        {
          type: "errorRepair",
          prompt: "Repair the incorrect learner translation.",
          sentence: `${khmer} = ${next[2]}`,
          options: [`${khmer} = ${english}`, `${khmer} = ${next[2]}`, `${khmer} = ${other[2]}`],
          answer: `${khmer} = ${english}`,
          explanation: "Check the complete phrase and its situation, not just one familiar word.",
        },
      ],
    } satisfies LessonMock;
  },
);

export const EXPANDED_VI_TEXT: Readonly<Record<string, string>> = Object.freeze({
  ...Object.fromEntries(
    dialogueSeeds.flatMap((dialogue) => [
      [dialogue.title, dialogue.titleVi],
      [dialogue.description, dialogue.descriptionVi],
      ...dialogue.turns.map(([, english, , vietnamese]) => [english, vietnamese]),
    ]),
  ),
  ...Object.fromEntries(
    writingSets.flatMap((set) => [
      [set.title, set.titleVi],
      [set.description, set.descriptionVi],
    ]),
  ),
  "A four-skill checkpoint using a new real-life situation.":
    "Bài kiểm tra bốn kỹ năng trong một tình huống đời sống mới.",
  "Listen and choose the matching Khmer sentence.": "Nghe và chọn câu Khmer tương ứng.",
  "Repair the incorrect learner translation.": "Sửa bản dịch sai của người học.",
  "Check the complete phrase and its situation, not just one familiar word.":
    "Kiểm tra cả câu và ngữ cảnh, không chỉ một từ quen thuộc.",
});

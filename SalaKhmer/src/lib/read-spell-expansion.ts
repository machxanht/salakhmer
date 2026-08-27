export type ReadSpellExpansionTopic = {
  topic_id: string;
  topic_order: number;
  topic_name_en: string;
  topic_description_en: string;
  cover_image_prompt: string;
  difficulty: "A1" | "A2";
  estimated_minutes: number;
};

export type ReadSpellExpansionWord = {
  id: string;
  topic_id: string;
  word_order: number;
  khmer_text: string;
  phonetic_en: string;
  english_translation: string;
  word_type: string;
  azure_voice: "km-KH-SreymomNeural" | "km-KH-PisethNeural";
  image_filename: string;
  image_prompt: string;
  example_khmer: string;
  example_phonetic_en: string;
  example_english: string;
  spelling_parts: string;
  special_learning_note: string;
  status: "draft";
  image_path: string;
};

type WordSeed = readonly [
  khmer: string,
  phonetic: string,
  meaning: string,
  wordType: string,
  exampleKhmer: string,
  examplePhonetic: string,
  exampleEnglish: string,
  note?: string,
];

type TopicSeed = {
  id: string;
  slug: string;
  order: number;
  name: string;
  description: string;
  cover: string;
  difficulty: "A1" | "A2";
  words: readonly WordSeed[];
};

const bridgeConsonants: Record<string, string> = {
  ក: "K", ខ: "KH", គ: "K", ឃ: "KH", ង: "NG", ច: "CH", ឆ: "CHH", ជ: "J", ឈ: "CHH", ញ: "NH",
  ដ: "D", ឋ: "TH", ឌ: "D", ឍ: "TH", ណ: "N", ត: "T", ថ: "TH", ទ: "T", ធ: "TH", ន: "N",
  ប: "B", ផ: "PH", ព: "P", ភ: "PH", ម: "M", យ: "Y", រ: "R", ល: "L", វ: "V", ស: "S", ហ: "H", ឡ: "L", អ: "A",
};

const bridgeSigns: Record<string, string> = {
  "ា": "A", "ិ": "I", "ី": "EI", "ឹ": "EU", "ឺ": "EU", "ុ": "U", "ូ": "OU", "ួ": "UO", "ើ": "EU",
  "ឿ": "UE", "ៀ": "IE", "េ": "E", "ែ": "AE", "ៃ": "AI", "ោ": "AO", "ៅ": "AO", "ំ": "OM", "ះ": "AH", "ៈ": "AK",
};

function makeSalaBridge(khmer: string, phonetic: string) {
  const characters = Array.from(khmer);
  const parts: string[] = [];

  for (let index = 0; index < characters.length; index += 1) {
    const character = characters[index];
    if (!character) continue;
    if (/\s/u.test(character)) continue;

    if (character === "្") {
      const next = characters[index + 1];
      if (!next) continue;
      const latin = bridgeConsonants[next];
      if (latin) parts.push(`${character}${next} (${latin})`);
      index += 1;
      continue;
    }

    const latin = bridgeConsonants[character] ?? bridgeSigns[character];
    if (latin) parts.push(`${character} (${latin})`);
  }

  const result = phonetic.replace(/[^a-z]/gi, "").toUpperCase();
  return parts.length ? `${parts.join(" + ")} ➡️ ${result}` : "";
}

const TOPIC_SEEDS: readonly TopicSeed[] = [
  {
    id: "topic-directions-location",
    slug: "directions",
    order: 21,
    name: "Directions and location",
    description: "Find places and understand simple directions in everyday Khmer.",
    cover: "A friendly educational map with a location pin, a left arrow, and a right arrow on a warm cream background.",
    difficulty: "A1",
    words: [
      ["ឆ្វេង", "chhveang", "Left", "direction", "បត់ទៅឆ្វេង។", "Bot tov chhveang.", "Turn left."],
      ["ស្តាំ", "sdam", "Right", "direction", "បត់ទៅស្តាំ។", "Bot tov sdam.", "Turn right."],
      ["ត្រង់", "trang", "Straight", "direction", "ទៅត្រង់។", "Tov trang.", "Go straight."],
      ["ជិត", "chit", "Near", "adjective", "ផ្សារនៅជិតផ្ទះ។", "Phsar nov chit phteah.", "The market is near the house."],
      ["ឆ្ងាយ", "chhngay", "Far", "adjective", "ព្រលានយន្តហោះនៅឆ្ងាយ។", "Prolean yontohoh nov chhngay.", "The airport is far away."],
      ["ខាងក្នុង", "khang knong", "Inside", "location", "គាត់នៅខាងក្នុងបន្ទប់។", "Koat nov khang knong bantop.", "He is inside the room."],
      ["ខាងក្រៅ", "khang krao", "Outside", "location", "ពួកគេនៅខាងក្រៅ។", "Puok ke nov khang krao.", "They are outside."],
      ["ខាងលើ", "khang leu", "Above / Upstairs", "location", "សៀវភៅនៅខាងលើតុ។", "Sievphov nov khang leu tok.", "The book is above the table."],
      ["ខាងក្រោម", "khang kraom", "Below / Downstairs", "location", "ស្បែកជើងនៅខាងក្រោមគ្រែ។", "Sbaek cheung nov khang kraom kre.", "The shoes are under the bed."],
      ["ខាងមុខ", "khang muk", "In front", "location", "ឡាននៅខាងមុខផ្ទះ។", "Lan nov khang muk phteah.", "The car is in front of the house."],
      ["ខាងក្រោយ", "khang kraoy", "Behind", "location", "សួននៅខាងក្រោយសាលា។", "Suon nov khang kraoy sala.", "The garden is behind the school."],
      ["ក្បែរ", "kbae", "Beside / Near", "location", "ធនាគារនៅក្បែរផ្សារ។", "Thoneakear nov kbae phsar.", "The bank is beside the market."],
      ["ទីនេះ", "ti nih", "Here", "location", "សូមអង្គុយទីនេះ។", "Som angkuy ti nih.", "Please sit here."],
      ["ទីនោះ", "ti noh", "There", "location", "បន្ទប់ទឹកនៅទីនោះ។", "Bantop tuk nov ti noh.", "The bathroom is there."],
      ["ឯណា", "ae na", "Where?", "question", "សណ្ឋាគារនៅឯណា?", "Santhakear nov ae na?", "Where is the hotel?"],
    ],
  },
  {
    id: "topic-health-symptoms",
    slug: "health",
    order: 22,
    name: "Health and symptoms",
    description: "Describe common symptoms and basic health needs in Khmer.",
    cover: "A warm educational first-aid kit beside a thermometer and medicine bottle on a cream background.",
    difficulty: "A2",
    words: [
      ["ឈឺ", "chheu", "Sick / Hurt", "adjective", "ខ្ញុំឈឺ។", "Khnhom chheu.", "I am sick."],
      ["ក្តៅខ្លួន", "kdao khluon", "Have a fever", "symptom", "កូនខ្ញុំក្តៅខ្លួន។", "Kon khnhom kdao khluon.", "My child has a fever."],
      ["ឈឺក្បាល", "chheu kbal", "Headache", "symptom", "ខ្ញុំឈឺក្បាល។", "Khnhom chheu kbal.", "I have a headache."],
      ["ឈឺពោះ", "chheu poh", "Stomachache", "symptom", "នាងឈឺពោះ។", "Neang chheu poh.", "She has a stomachache."],
      ["ក្អក", "ka-ak", "Cough", "symptom", "គាត់ក្អកច្រើន។", "Koat ka-ak chraen.", "He coughs a lot."],
      ["ផ្តាសាយ", "phtasay", "Cold / Flu", "illness", "ខ្ញុំមានផ្តាសាយ។", "Khnhom mean phtasay.", "I have a cold."],
      ["ថ្នាំ", "thnam", "Medicine", "noun", "សូមលេបថ្នាំនេះ។", "Som leb thnam nih.", "Please take this medicine."],
      ["របួស", "robuos", "Wound / Injury", "noun", "ដៃគាត់មានរបួស។", "Dai koat mean robuos.", "His hand is injured."],
      ["ឈាម", "chheam", "Blood", "noun", "របួសនេះមានឈាម។", "Robuos nih mean chheam.", "This wound is bleeding."],
      ["ឈឺចាប់", "chheu chap", "Pain", "symptom", "ខ្ញុំឈឺចាប់ត្រង់នេះ។", "Khnhom chheu chap trang nih.", "It hurts here."],
      ["សម្រាក", "samrak", "Rest", "verb", "អ្នកត្រូវសម្រាក។", "Neak trov samrak.", "You need to rest."],
      ["សុខភាពល្អ", "sokhapheap la-aw", "Healthy", "adjective", "គាត់មានសុខភាពល្អ។", "Koat mean sokhapheap la-aw.", "He is healthy."],
      ["វិលមុខ", "vil muk", "Dizzy", "symptom", "ខ្ញុំមានអារម្មណ៍វិលមុខ។", "Khnhom mean arom vil muk.", "I feel dizzy."],
      ["ក្អួត", "k-uot", "Vomit", "symptom", "កុមារក្អួតពីរដង។", "Komar k-uot pi dong.", "The child vomited twice."],
      ["រាគ", "reak", "Diarrhea", "illness", "ខ្ញុំមានជំងឺរាគ។", "Khnhom mean chumngu reak.", "I have diarrhea."],
    ],
  },
  {
    id: "topic-feelings-emotions",
    slug: "feelings",
    order: 23,
    name: "Feelings and emotions",
    description: "Talk about moods, feelings, and simple personal reactions.",
    cover: "A set of friendly expressive faces showing happiness, sadness, surprise, and calm on a cream background.",
    difficulty: "A1",
    words: [
      ["សប្បាយ", "sabbay", "Happy", "adjective", "ថ្ងៃនេះខ្ញុំសប្បាយ។", "Thngai nih khnhom sabbay.", "I am happy today."],
      ["ពិបាកចិត្ត", "pibak chet", "Sad / Upset", "adjective", "នាងពិបាកចិត្ត។", "Neang pibak chet.", "She is upset."],
      ["ខឹង", "kheng", "Angry", "adjective", "កុំខឹងអី។", "Kom kheng ey.", "Please do not be angry."],
      ["ខ្លាច", "khlach", "Afraid", "adjective", "ក្មេងខ្លាចឆ្កែ។", "Kmeng khlach chhkae.", "The child is afraid of the dog."],
      ["បារម្ភ", "barom", "Worried", "adjective", "ម៉ាក់បារម្ភពីកូន។", "Mak barom pi kon.", "Mother is worried about her child."],
      ["ហត់", "hot", "Tired", "adjective", "ខ្ញុំហត់បន្ទាប់ពីធ្វើការ។", "Khnhom hot bantoap pi thveu kar.", "I am tired after work."],
      ["ភ្ញាក់ផ្អើល", "phnhak pha-ael", "Surprised", "adjective", "គាត់ភ្ញាក់ផ្អើលណាស់។", "Koat phnhak pha-ael nas.", "He is very surprised."],
      ["រំភើប", "rompheub", "Excited", "adjective", "កុមាររំភើបនឹងដំណើរ។", "Komar rompheub neng damnaeu.", "The children are excited about the trip."],
      ["ស្ងប់ស្ងាត់", "sngop sngat", "Calm / Quiet", "adjective", "បន្ទប់នេះស្ងប់ស្ងាត់។", "Bantop nih sngop sngat.", "This room is quiet."],
      ["ខ្មាស", "khmas", "Shy / Embarrassed", "adjective", "នាងខ្មាសពេលនិយាយ។", "Neang khmas pel niyeay.", "She is shy when speaking."],
      ["ឯកោ", "aekkao", "Lonely", "adjective", "គាត់មានអារម្មណ៍ឯកោ។", "Koat mean arom aekkao.", "He feels lonely."],
      ["ស្រឡាញ់", "sralanh", "Love", "verb", "ខ្ញុំស្រឡាញ់គ្រួសារ។", "Khnhom sralanh kruosa.", "I love my family."],
      ["ចូលចិត្ត", "chol chet", "Like", "verb", "ខ្ញុំចូលចិត្តតន្ត្រី។", "Khnhom chol chet dontrei.", "I like music."],
      ["មិនចូលចិត្ត", "min chol chet", "Dislike", "verb", "ខ្ញុំមិនចូលចិត្តសំឡេងខ្លាំង។", "Khnhom min chol chet samleng khlang.", "I dislike loud noise."],
      ["សង្ឃឹម", "sangkheum", "Hope", "verb", "ខ្ញុំសង្ឃឹមថាអ្នកសុខសប្បាយ។", "Khnhom sangkheum tha neak sok sabbay.", "I hope you are well."],
    ],
  },
  {
    id: "topic-daily-routine",
    slug: "routine",
    order: 24,
    name: "Daily routine",
    description: "Read useful phrases for a normal day from morning to bedtime.",
    cover: "A simple educational day planner with sunrise, work, meal, and moon icons on a warm cream background.",
    difficulty: "A1",
    words: [
      ["ភ្ញាក់ពីគេង", "phnhak pi keng", "Wake up", "verb phrase", "ខ្ញុំភ្ញាក់ពីគេងម៉ោងប្រាំមួយ។", "Khnhom phnhak pi keng maong pram muoy.", "I wake up at six."],
      ["ក្រោកពីគេង", "kraok pi keng", "Get out of bed", "verb phrase", "គាត់ក្រោកពីគេងពីព្រលឹម។", "Koat kraok pi keng pi prolum.", "He gets up early."],
      ["លាងមុខ", "leang muk", "Wash the face", "verb phrase", "ខ្ញុំលាងមុខរាល់ព្រឹក។", "Khnhom leang muk roal preuk.", "I wash my face every morning."],
      ["ដុសធ្មេញ", "doh thmenh", "Brush the teeth", "verb phrase", "កូនដុសធ្មេញមុនទៅសាលា។", "Kon doh thmenh mun tov sala.", "The child brushes their teeth before school."],
      ["ងូតទឹក", "ngout tuk", "Take a shower", "verb phrase", "ខ្ញុំងូតទឹកពេលព្រឹក។", "Khnhom ngout tuk pel preuk.", "I take a shower in the morning."],
      ["ស្លៀកពាក់", "sliek peak", "Get dressed", "verb phrase", "នាងស្លៀកពាក់ទៅធ្វើការ។", "Neang sliek peak tov thveu kar.", "She gets dressed for work."],
      ["ញ៉ាំអាហារពេលព្រឹក", "nham aha pel preuk", "Eat breakfast", "verb phrase", "យើងញ៉ាំអាហារពេលព្រឹកជាមួយគ្នា។", "Yeung nham aha pel preuk cheamuoy knea.", "We eat breakfast together."],
      ["ទៅធ្វើការ", "tov thveu kar", "Go to work", "verb phrase", "ប៉ាទៅធ្វើការម៉ោងប្រាំបី។", "Pa tov thveu kar maong pram bei.", "Father goes to work at eight."],
      ["ទៅសាលារៀន", "tov sala rien", "Go to school", "verb phrase", "កូនទៅសាលារៀនដោយកង់។", "Kon tov sala rien daoy kang.", "The child goes to school by bicycle."],
      ["ញ៉ាំបាយថ្ងៃត្រង់", "nham bay thngai trang", "Eat lunch", "verb phrase", "ខ្ញុំញ៉ាំបាយថ្ងៃត្រង់នៅការិយាល័យ។", "Khnhom nham bay thngai trang nov kariyealay.", "I eat lunch at the office."],
      ["ត្រឡប់មកផ្ទះ", "tralop mok phteah", "Return home", "verb phrase", "យើងត្រឡប់មកផ្ទះពេលល្ងាច។", "Yeung tralop mok phteah pel lngeach.", "We return home in the evening."],
      ["ធ្វើម្ហូបពេលល្ងាច", "thveu mhob pel lngeach", "Cook dinner", "verb phrase", "ម៉ាក់ធ្វើម្ហូបពេលល្ងាច។", "Mak thveu mhob pel lngeach.", "Mother cooks dinner."],
      ["ធ្វើកិច្ចការផ្ទះ", "thveu kichkar phteah", "Do homework", "verb phrase", "សិស្សធ្វើកិច្ចការផ្ទះ។", "Seuh thveu kichkar phteah.", "The student does homework."],
      ["មើលទូរទស្សន៍", "merl touratos", "Watch television", "verb phrase", "គ្រួសារមើលទូរទស្សន៍ជាមួយគ្នា។", "Kruosa merl touratos cheamuoy knea.", "The family watches television together."],
      ["ចូលគេង", "chol keng", "Go to sleep", "verb phrase", "ខ្ញុំចូលគេងម៉ោងដប់។", "Khnhom chol keng maong dop.", "I go to sleep at ten."],
    ],
  },
  {
    id: "topic-kitchen-cooking",
    slug: "cooking",
    order: 25,
    name: "Kitchen and cooking",
    description: "Learn essential cooking actions, utensils, and kitchen instructions.",
    cover: "A friendly educational cooking pot with a wooden spoon, knife, and vegetables on a cream background.",
    difficulty: "A1",
    words: [
      ["ចម្អិន", "cham-in", "Cook", "verb", "ខ្ញុំចម្អិនបាយ។", "Khnhom cham-in bay.", "I cook rice."],
      ["ស្ងោរ", "sngao", "Boil", "verb", "សូមស្ងោរទឹក។", "Som sngao tuk.", "Please boil the water."],
      ["ចៀន", "chien", "Fry", "verb", "នាងចៀនត្រី។", "Neang chien trei.", "She fries fish."],
      ["អាំង", "ang", "Grill / Roast", "verb", "ពួកគេអាំងសាច់។", "Puok ke ang sach.", "They grill meat."],
      ["ចំហុយ", "chamhoy", "Steam", "verb", "យើងចំហុយត្រី។", "Yeung chamhoy trei.", "We steam the fish."],
      ["កាត់", "kat", "Cut", "verb", "សូមកាត់បន្លែ។", "Som kat banlae.", "Please cut the vegetables."],
      ["លាង", "leang", "Wash", "verb", "លាងបន្លែមុនចម្អិន។", "Leang banlae mun cham-in.", "Wash the vegetables before cooking."],
      ["លាយ", "leay", "Mix", "verb", "លាយស្ករជាមួយទឹក។", "Leay skar cheamuoy tuk.", "Mix sugar with water."],
      ["ដាក់", "dak", "Put / Add", "verb", "ដាក់អំបិលបន្តិច។", "Dak ambel bantich.", "Add a little salt."],
      ["ភ្លក់", "phlok", "Taste", "verb", "សូមភ្លក់សម្ល។", "Som phlok samlor.", "Please taste the soup."],
      ["ស្លាបព្រា", "slab prea", "Spoon", "noun", "ស្លាបព្រានៅលើតុ។", "Slab prea nov leu tok.", "The spoon is on the table."],
      ["សម", "sam", "Fork", "noun", "ខ្ញុំត្រូវការសមមួយ។", "Khnhom trovkar sam muoy.", "I need one fork."],
      ["កាំបិត", "kambet", "Knife", "noun", "កាំបិតនេះមុត។", "Kambet nih mut.", "This knife is sharp."],
      ["ឆ្នាំង", "chhnang", "Cooking pot", "noun", "ឆ្នាំងនៅលើចង្ក្រាន។", "Chhnang nov leu chongkran.", "The pot is on the stove."],
      ["ចាន", "chan", "Plate / Dish", "noun", "ដាក់បាយក្នុងចាន។", "Dak bay knong chan.", "Put the rice on the plate."],
    ],
  },
  {
    id: "topic-travel-accommodation",
    slug: "travel",
    order: 26,
    name: "Travel and accommodation",
    description: "Useful words for journeys, hotels, tickets, and checking in.",
    cover: "A small suitcase, passport, room key, and folded map in a warm educational illustration.",
    difficulty: "A2",
    words: [
      ["ដំណើរ", "damnaeu", "Journey / Trip", "noun", "ដំណើរនេះមានរយៈពេលពីរថ្ងៃ។", "Damnaeu nih mean royeak pel pi thngai.", "This trip lasts two days."],
      ["លិខិតឆ្លងដែន", "likhet chhlang daen", "Passport", "noun", "សូមបង្ហាញលិខិតឆ្លងដែន។", "Som banghanh likhet chhlang daen.", "Please show your passport."],
      ["សំបុត្រ", "sambot", "Ticket", "noun", "ខ្ញុំទិញសំបុត្រឡានក្រុង។", "Khnhom tinh sambot lan krong.", "I bought a bus ticket."],
      ["ការកក់", "kar kok", "Reservation", "noun", "ខ្ញុំមានការកក់បន្ទប់។", "Khnhom mean kar kok bantop.", "I have a room reservation."],
      ["សោបន្ទប់", "sao bantop", "Room key", "noun", "នេះជាសោបន្ទប់របស់អ្នក។", "Nih chea sao bantop robos neak.", "This is your room key."],
      ["បន្ទប់មួយគ្រែ", "bantop muoy kre", "Single room", "noun phrase", "ខ្ញុំចង់បានបន្ទប់មួយគ្រែ។", "Khnhom chong ban bantop muoy kre.", "I would like a single room."],
      ["បន្ទប់ពីរគ្រែ", "bantop pi kre", "Twin room", "noun phrase", "តើមានបន្ទប់ពីរគ្រែទេ?", "Tae mean bantop pi kre te?", "Do you have a twin room?"],
      ["អីវ៉ាន់", "ei-van", "Luggage / Belongings", "noun", "អីវ៉ាន់ខ្ញុំនៅក្នុងឡាន។", "Ei-van khnhom nov knong lan.", "My luggage is in the car."],
      ["វ៉ាលី", "vali", "Suitcase", "noun", "វ៉ាលីនេះធ្ងន់។", "Vali nih thngon.", "This suitcase is heavy."],
      ["កន្លែងទទួលភ្ញៀវ", "kanlaeng totuol phnhiev", "Reception desk", "noun", "សួរនៅកន្លែងទទួលភ្ញៀវ។", "Suor nov kanlaeng totuol phnhiev.", "Ask at the reception desk."],
      ["ចុះឈ្មោះចូល", "choh chhmoh chol", "Check in", "verb phrase", "យើងចុះឈ្មោះចូលម៉ោងពីរ។", "Yeung choh chhmoh chol maong pi.", "We check in at two."],
      ["ចាកចេញ", "chak chenh", "Check out / Leave", "verb", "យើងចាកចេញពីសណ្ឋាគារពេលព្រឹក។", "Yeung chak chenh pi santhakear pel preuk.", "We check out of the hotel in the morning."],
      ["ផែនទី", "phaen ti", "Map", "noun", "សូមបង្ហាញលើផែនទី។", "Som banghanh leu phaen ti.", "Please show it on the map."],
      ["មគ្គុទ្ទេសក៍", "mok-kut-teh", "Tour guide", "noun", "មគ្គុទ្ទេសក៍និយាយភាសាអង់គ្លេស។", "Mok-kut-teh niyeay pheasa Angkleh.", "The tour guide speaks English."],
      ["អ្នកទេសចរ", "neak tesachar", "Tourist", "noun", "អ្នកទេសចរទៅទស្សនាប្រាសាទ។", "Neak tesachar tov tossana prasat.", "The tourist visits the temple."],
    ],
  },
  {
    id: "topic-technology-communication",
    slug: "technology",
    order: 27,
    name: "Technology and communication",
    description: "Everyday words for phones, internet access, messages, and devices.",
    cover: "A friendly smartphone, laptop, Wi-Fi symbol, and message bubble on a warm cream background.",
    difficulty: "A2",
    words: [
      ["ទូរស័ព្ទ", "tourasap", "Telephone", "noun", "ទូរស័ព្ទខ្ញុំនៅលើតុ។", "Tourasap khnhom nov leu tok.", "My phone is on the table."],
      ["កុំព្យូទ័រ", "kompyuteu", "Computer", "noun", "ខ្ញុំធ្វើការលើកុំព្យូទ័រ។", "Khnhom thveu kar leu kompyuteu.", "I work on a computer."],
      ["អ៊ីនធឺណិត", "in-thoe-net", "Internet", "noun", "អ៊ីនធឺណិតនៅទីនេះលឿន។", "In-thoe-net nov ti nih leuon.", "The internet here is fast."],
      ["សារ", "sar", "Message", "noun", "ខ្ញុំបានទទួលសាររបស់អ្នក។", "Khnhom ban totuol sar robos neak.", "I received your message."],
      ["អ៊ីមែល", "email", "Email", "noun", "សូមផ្ញើអ៊ីមែលមកខ្ញុំ។", "Som phnheu email mok khnhom.", "Please send me an email."],
      ["ហៅទូរស័ព្ទ", "hav tourasap", "Make a phone call", "verb phrase", "ខ្ញុំនឹងហៅទូរស័ព្ទទៅអ្នក។", "Khnhom neng hav tourasap tov neak.", "I will call you."],
      ["រូបថត", "roup thot", "Photograph", "noun", "យើងថតរូបថតមួយ។", "Yeung thot roup thot muoy.", "We take a photograph."],
      ["វីដេអូ", "video", "Video", "noun", "វីដេអូនេះខ្លី។", "Video nih khlei.", "This video is short."],
      ["ឆ្នាំងសាក", "chhnang sak", "Charger", "noun", "ខ្ញុំត្រូវការឆ្នាំងសាក។", "Khnhom trovkar chhnang sak.", "I need a charger."],
      ["ថ្ម", "thmor", "Battery", "noun", "ថ្មទូរស័ព្ទជិតអស់ហើយ។", "Thmor tourasap chit os haey.", "The phone battery is almost empty."],
      ["ពាក្យសម្ងាត់", "peak samngat", "Password", "noun", "កុំប្រាប់ពាក្យសម្ងាត់ដល់គេ។", "Kom prap peak samngat dol ke.", "Do not tell anyone your password."],
      ["វ៉ាយហ្វាយ", "vay-fay", "Wi-Fi", "noun", "តើមានវ៉ាយហ្វាយទេ?", "Tae mean vay-fay te?", "Is there Wi-Fi?"],
      ["ទាញយក", "teanh yok", "Download", "verb", "សូមទាញយកឯកសារនេះ។", "Som teanh yok aekasar nih.", "Please download this file."],
      ["ផ្ញើ", "phnheu", "Send", "verb", "ផ្ញើរូបថតមកខ្ញុំ។", "Phnheu roup thot mok khnhom.", "Send me the photo."],
      ["ភ្ជាប់", "phcheap", "Connect", "verb", "ភ្ជាប់ទូរស័ព្ទទៅវ៉ាយហ្វាយ។", "Phcheap tourasap tov vay-fay.", "Connect the phone to Wi-Fi."],
    ],
  },
  {
    id: "topic-personal-care",
    slug: "personal-care",
    order: 28,
    name: "Personal care and hygiene",
    description: "Practical words for washing, grooming, and staying clean.",
    cover: "A neat educational arrangement of soap, toothbrush, towel, comb, and clean water on a cream background.",
    difficulty: "A1",
    words: [
      ["សាប៊ូ", "sabou", "Soap", "noun", "សាប៊ូនៅក្បែរអាងទឹក។", "Sabou nov kbae ang tuk.", "The soap is beside the sink."],
      ["សាប៊ូកក់សក់", "sabou kok sak", "Shampoo", "noun", "ខ្ញុំត្រូវការសាប៊ូកក់សក់។", "Khnhom trovkar sabou kok sak.", "I need shampoo."],
      ["ច្រាសដុសធ្មេញ", "chras doh thmenh", "Toothbrush", "noun", "នេះជាច្រាសដុសធ្មេញថ្មី។", "Nih chea chras doh thmenh thmei.", "This is a new toothbrush."],
      ["ថ្នាំដុសធ្មេញ", "thnam doh thmenh", "Toothpaste", "noun", "ថ្នាំដុសធ្មេញជិតអស់ហើយ។", "Thnam doh thmenh chit os haey.", "The toothpaste is almost empty."],
      ["កន្សែង", "kansaeng", "Towel", "noun", "កន្សែងស្អាតនៅលើគ្រែ។", "Kansaeng s-at nov leu kre.", "The clean towel is on the bed."],
      ["សិតសក់", "set sak", "Comb the hair", "verb phrase", "នាងសិតសក់រាល់ព្រឹក។", "Neang set sak roal preuk.", "She combs her hair every morning."],
      ["ឡាម", "lam", "Razor", "noun", "ឡាមនេះមុតណាស់។", "Lam nih mut nas.", "This razor is very sharp."],
      ["ក្រដាសអនាម័យ", "kradas anamai", "Toilet paper", "noun", "ក្រដាសអនាម័យនៅក្នុងបន្ទប់ទឹក។", "Kradas anamai nov knong bantop tuk.", "The toilet paper is in the bathroom."],
      ["ទឹកលាងដៃ", "tuk leang dai", "Hand sanitizer", "noun", "ប្រើទឹកលាងដៃមុនញ៉ាំបាយ។", "Prae tuk leang dai mun nham bay.", "Use hand sanitizer before eating."],
      ["លាងដៃ", "leang dai", "Wash the hands", "verb phrase", "សូមលាងដៃជាមួយសាប៊ូ។", "Som leang dai cheamuoy sabou.", "Please wash your hands with soap."],
      ["កាត់ក្រចក", "kat krachek", "Cut the nails", "verb phrase", "ខ្ញុំកាត់ក្រចករៀងរាល់សប្តាហ៍។", "Khnhom kat krachek rieng roal sabda.", "I cut my nails every week."],
      ["ដុសសក់", "doh sak", "Brush the hair", "verb phrase", "ដុសសក់ថ្នមៗ។", "Doh sak thnam-thnam.", "Brush the hair gently."],
      ["សម្អាត", "sam-at", "Clean", "verb", "យើងសម្អាតបន្ទប់រាល់ថ្ងៃ។", "Yeung sam-at bantop roal thngai.", "We clean the room every day."],
      ["កខ្វក់", "kakvak", "Dirty", "adjective", "អាវនេះកខ្វក់។", "Aav nih kakvak.", "This shirt is dirty."],
      ["ស្អាត", "s-at", "Clean / Beautiful", "adjective", "បន្ទប់នេះស្អាត។", "Bantop nih s-at.", "This room is clean."],
    ],
  },
  {
    id: "topic-emergency-safety",
    slug: "safety",
    order: 29,
    name: "Emergency and safety",
    description: "Recognise urgent words and ask for help in unsafe situations.",
    cover: "A clear educational safety shield, emergency phone, warning triangle, and first-aid symbol on cream.",
    difficulty: "A2",
    words: [
      ["ជួយ", "chuoy", "Help", "verb", "សូមជួយខ្ញុំផង!", "Som chuoy khnhom phong!", "Please help me!"],
      ["គ្រោះថ្នាក់", "kroh thnak", "Danger / Accident", "noun", "ផ្លូវនេះមានគ្រោះថ្នាក់។", "Phlov nih mean kroh thnak.", "This road is dangerous."],
      ["ភ្លើងឆេះ", "phleung chheh", "Fire", "emergency", "មានភ្លើងឆេះនៅផ្ទះ។", "Mean phleung chheh nov phteah.", "There is a fire at the house."],
      ["ហៅប៉ូលិស", "hav polis", "Call the police", "verb phrase", "សូមហៅប៉ូលិស។", "Som hav polis.", "Please call the police."],
      ["ហៅឡានពេទ្យ", "hav lan pet", "Call an ambulance", "verb phrase", "សូមហៅឡានពេទ្យឥឡូវនេះ។", "Som hav lan pet aelov nih.", "Call an ambulance now."],
      ["ឈប់", "chhop", "Stop", "verb", "សូមឈប់នៅទីនេះ។", "Som chhop nov ti nih.", "Please stop here."],
      ["ប្រយ័ត្ន", "prayat", "Be careful", "warning", "ប្រយ័ត្នឡាន!", "Prayat lan!", "Watch out for the car!"],
      ["វង្វេងផ្លូវ", "vongveng phlov", "Lost", "adjective", "ខ្ញុំវង្វេងផ្លូវ។", "Khnhom vongveng phlov.", "I am lost."],
      ["ត្រូវបានលួច", "trov ban luoch", "Stolen", "verb phrase", "ទូរស័ព្ទខ្ញុំត្រូវបានលួច។", "Tourasap khnhom trov ban luoch.", "My phone was stolen."],
      ["បន្ទាន់", "bantuan", "Urgent / Emergency", "adjective", "នេះជាករណីបន្ទាន់។", "Nih chea karanei bantuan.", "This is an emergency."],
      ["ច្រកចេញ", "chrak chenh", "Exit", "noun", "ច្រកចេញនៅខាងឆ្វេង។", "Chrak chenh nov khang chhveang.", "The exit is on the left."],
      ["ច្រកចូល", "chrak chol", "Entrance", "noun", "ច្រកចូលនៅខាងមុខ។", "Chrak chol nov khang muk.", "The entrance is in front."],
      ["សុវត្ថិភាព", "sovatthepheab", "Safety / Safe", "noun", "កុមារនៅកន្លែងមានសុវត្ថិភាព។", "Komar nov kanlaeng mean sovatthepheab.", "The child is in a safe place."],
      ["គ្រោះថ្នាក់ចរាចរណ៍", "kroh thnak charachor", "Traffic accident", "noun", "មានគ្រោះថ្នាក់ចរាចរណ៍នៅមុខផ្សារ។", "Mean kroh thnak charachor nov muk phsar.", "There is a traffic accident in front of the market."],
      ["បំពង់ពន្លត់អគ្គិភ័យ", "bampong ponlot akkiphay", "Fire extinguisher", "noun", "បំពង់ពន្លត់អគ្គិភ័យនៅក្បែរទ្វារ។", "Bampong ponlot akkiphay nov kbae tvear.", "The fire extinguisher is beside the door."],
    ],
  },
  {
    id: "topic-services-documents",
    slug: "services",
    order: 30,
    name: "Services and documents",
    description: "Handle simple forms, appointments, identification, and public services.",
    cover: "An educational clipboard with a form, identity card, pen, signature line, and office counter on cream.",
    difficulty: "A2",
    words: [
      ["ឈ្មោះ", "chhmoh", "Name", "noun", "សូមសរសេរឈ្មោះរបស់អ្នក។", "Som sarser chhmoh robos neak.", "Please write your name."],
      ["អាសយដ្ឋាន", "asayathan", "Address", "noun", "តើអាសយដ្ឋានរបស់អ្នកនៅឯណា?", "Tae asayathan robos neak nov ae na?", "What is your address?"],
      ["លេខទូរស័ព្ទ", "lek tourasap", "Phone number", "noun", "សូមផ្តល់លេខទូរស័ព្ទ។", "Som phdal lek tourasap.", "Please provide a phone number."],
      ["ពាក្យសុំ", "peak som", "Application form", "noun", "សូមបំពេញពាក្យសុំនេះ។", "Som bampenh peak som nih.", "Please complete this application form."],
      ["ហត្ថលេខា", "hattha lekha", "Signature", "noun", "ដាក់ហត្ថលេខាត្រង់នេះ។", "Dak hattha lekha trang nih.", "Sign here."],
      ["អត្តសញ្ញាណប័ណ្ណ", "attasanhana bann", "Identity card", "noun", "សូមបង្ហាញអត្តសញ្ញាណប័ណ្ណ។", "Som banghanh attasanhana bann.", "Please show your identity card."],
      ["ច្បាប់ចម្លង", "chbab chamlang", "Copy", "noun", "ខ្ញុំត្រូវការច្បាប់ចម្លងមួយ។", "Khnhom trovkar chbab chamlang muoy.", "I need one copy."],
      ["ឯកសារដើម", "aekasar daem", "Original document", "noun", "សូមយកឯកសារដើមមក។", "Som yok aekasar daem mok.", "Please bring the original document."],
      ["ការិយាល័យ", "kariyealay", "Office", "noun", "ការិយាល័យបើកម៉ោងប្រាំបី។", "Kariyealay baek maong pram bei.", "The office opens at eight."],
      ["ការណាត់ជួប", "kar nat chuob", "Appointment", "noun", "ខ្ញុំមានការណាត់ជួបថ្ងៃនេះ។", "Khnhom mean kar nat chuob thngai nih.", "I have an appointment today."],
      ["ជួរ", "chuor", "Queue / Line", "noun", "សូមឈរតាមជួរ។", "Som chhor tam chuor.", "Please stand in line."],
      ["រង់ចាំ", "rong cham", "Wait", "verb", "សូមរង់ចាំបន្តិច។", "Som rong cham bantich.", "Please wait a moment."],
      ["បើក", "baek", "Open", "adjective", "ធនាគារបើកហើយ។", "Thoneakear baek haey.", "The bank is open."],
      ["បិទ", "bet", "Closed", "adjective", "ការិយាល័យបិទថ្ងៃអាទិត្យ។", "Kariyealay bet thngai Atit.", "The office is closed on Sunday."],
      ["ឯកសារ", "aekasar", "Document", "noun", "ឯកសារទាំងអស់នៅក្នុងថត។", "Aekasar teang os nov knong thot.", "All the documents are in the folder."],
    ],
  },
];

function makeWords(topic: TopicSeed): ReadSpellExpansionWord[] {
  return topic.words.map((seed, index) => {
    const [khmer, phonetic, meaning, wordType, exampleKhmer, examplePhonetic, exampleEnglish, note = ""] = seed;
    const order = index + 1;
    const paddedOrder = String(order).padStart(3, "0");
    const id = `rs-${topic.slug}-${paddedOrder}`;
    const imageFilename = `read-spell/${topic.id}/${id}.webp`;

    return {
      id,
      topic_id: topic.id,
      word_order: order,
      khmer_text: khmer,
      phonetic_en: phonetic,
      english_translation: meaning,
      word_type: wordType,
      azure_voice: order % 2 === 0 ? "km-KH-PisethNeural" : "km-KH-SreymomNeural",
      image_filename: imageFilename,
      image_prompt: `A clear, friendly educational illustration representing “${meaning}”, isolated on a warm cream background, no text, no watermark.`,
      example_khmer: exampleKhmer,
      example_phonetic_en: examplePhonetic,
      example_english: exampleEnglish,
      spelling_parts: makeSalaBridge(khmer, phonetic),
      special_learning_note: note,
      status: "draft",
      image_path: `/${imageFilename}`,
    };
  });
}

export const READ_SPELL_EXPANSION_TOPICS: ReadSpellExpansionTopic[] = TOPIC_SEEDS.map((topic) => ({
  topic_id: topic.id,
  topic_order: topic.order,
  topic_name_en: topic.name,
  topic_description_en: topic.description,
  cover_image_prompt: topic.cover,
  difficulty: topic.difficulty,
  estimated_minutes: 12,
}));

export const READ_SPELL_EXPANSION_WORDS: ReadSpellExpansionWord[] = TOPIC_SEEDS.flatMap(makeWords);

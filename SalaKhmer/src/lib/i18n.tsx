import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Locale = "en" | "vi" | "zh" | "fr";
export const LOCALES: { id: Locale; label: string; nativeLabel: string }[] = [
  { id: "en", label: "English", nativeLabel: "English" },
  { id: "vi", label: "Vietnamese", nativeLabel: "Tiếng Việt" },
  { id: "zh", label: "Chinese", nativeLabel: "中文" },
  { id: "fr", label: "French", nativeLabel: "Français" },
];

const englishCopy = {
    home: "HOME",
    practice: "APPLY",
    dictionary: "DICTIONARY",
    profile: "PROFILE",
    login: "Log in",
    register: "Sign up",
    loginGoogle: "Continue with Google",
    createAccount: "Create account",
    continueGuest: "Continue as guest",
    forgotPassword: "Forgot password?",
    resetPassword: "Reset password",
    backToLogin: "← Back to login",
    email: "Email address",
    password: "Password",
    name: "Full name",
    lockedTitle: "Sign in to unlock this category",
    lockedText: "Create a free account to save your progress and access all lessons.",
    signInOrUp: "Log in / Sign up",
    lessonMissing: "Lesson data is unavailable",
    back: "Go back",
    lessonNeedsAccount: "This lesson requires an account",
    lessonNeedsAccountText: "Sign in to unlock this lesson and save your progress.",
    complete: "Complete",
    next: "Continue",
    completed: "Completed!",
    earned: "You earned",
    saving: "Saving...",
    tapFlip: "Tap to flip",
    tapFlipBack: "Tap to flip back",
    continuePath: "Continue learning",
    categoryMissing: "Category not found",
    progress: "Progress",
    lessons: "lessons",
    startLesson: "Start lesson",
    review: "Review",
    locked: "Locked",
    or: "OR",
    changeLanguage: "Change language",
    welcomeBack: "WELCOME BACK",
    studyDay: "Study day",
    overallProgress: "Overall progress",
    lessonsCompleted: "lessons completed",
    newLearner: "New learner",
    expedition: "Angkor Expedition",
    cultureFact: "TODAY'S CULTURAL FACT",
    cultureLabel: "CULTURE",
    categoryTitle: "★ 6 LEARNING PATHS ★",
    basic: "Beginner",
    intermediate: "Intermediate",
    beginningSound: "initial sound",
    nasalSound: "nasal sound",
    alphabet: "Script basics",
    spelling: "Read & spell",
    dialogues: "Listen & speak",
    writing: "Handwriting lab",
    tests: "Review & test",
    handbook: "Cambodia guide",
    today: "Today's lessons",
    logout: "Log out",
    cultureDescription:
      "The world's largest religious monument, built in the 12th century by King Suryavarman II. Its name means Temple City in Khmer.",
    weekdays: "Mon,Tue,Wed,Thu,Fri,Sat,Sun",
    learnKhmer: "Learn Khmer",
    curriculum: "Your curriculum",
    curriculumIntro: "Work down the path. Each module teaches one skill, with clear audio and practical examples.",
    yourPath: "Your path",
    allModules: "All modules",
    moduleIntro: "Follow the lessons at your own pace and use the speaker button whenever you need to hear Khmer again.",
    audioIncluded: "Audio included",
    signInUnlockModule: "Sign in to unlock this module",
    signInCreate: "Sign in or create account",
    contentLanguage: "Interface language",
} as const;

type TranslationKey = keyof typeof englishCopy;
type InterfaceKey =
  | "homeGreeting"
  | "dailyGoal"
  | "streakPrompt"
  | "continueLesson"
  | "todaysPractice"
  | "fiveMinuteReview"
  | "savedMistakes"
  | "handwritingDrill"
  | "traceLetters"
  | "dailyDialogue"
  | "listenRepeat"
  | "practicalKhmer"
  | "applyIntro"
  | "searchWord"
  | "starterDictionary"
  | "tapToHear"
  | "tools"
  | "khmerCalendar"
  | "checkLunarDate"
  | "khmerKeyboard"
  | "setUpTyping"
  | "askKhmerPhrase"
  | "reviewSavedMistakes"
  | "myLearning"
  | "yourProfile"
  | "yourLearningPath"
  | "savedWords"
  | "mistakesToReview"
  | "waiting"
  | "audio"
  | "listeningSpeed"
  | "speedDescription"
  | "signOut"
  | "back"
  | "readAndSpell"
  | "topicWords"
  | "playAll"
  | "readAloud"
  | "standardSpelling"
  | "readingBridge"
  | "quickRecall"
  | "matchWords"
  | "chooseMeaning"
  | "checkAnswer"
  | "correctAnswer"
  | "notQuite"
  | "answerLabel"
  | "arrangeSentence"
  | "selectWords"
  | "reset"
  | "writeCharacter"
  | "typeKhmerCharacter"
  | "strokeOrder"
  | "reviewLesson"
  | "nextLesson"
  | "checkpointNotPassed"
  | "scoreLabel"
  | "needScore"
  | "reviewIncorrect"
  | "items"
  | "notYet"
  | "iRemember"
  | "noItemsToReview"
  | "startNewLesson"
  | "backToPath"
  | "alphabetLevel1Title"
  | "alphabetLevel2Title"
  | "alphabetLevel3Title"
  | "alphabetLevel4Title"
  | "alphabetLevel5Title"
  | "alphabetLevel6Title"
  | "lessonPlayEverySound"
  | "lessonGuestPreview"
  | "lessonCompletedSummary"
  | "backToLessons"
  | "playASeries"
  | "playOSeries"
  | "aSeries"
  | "oSeries"
  | "air";

const interfaceCopy: Record<Locale, Partial<Record<InterfaceKey, string>>> = {
  en: {
    homeGreeting: "Good morning, {name}", dailyGoal: "Daily goal", streakPrompt: "Keep your streak alive with one short lesson.", continueLesson: "Continue lesson", todaysPractice: "Today’s practice", fiveMinuteReview: "5-min review", savedMistakes: "Review saved mistakes", handwritingDrill: "Handwriting drill", traceLetters: "Trace Khmer letters", dailyDialogue: "Daily dialogue", listenRepeat: "Listen and repeat", practicalKhmer: "Practical Khmer", applyIntro: "Use Khmer for everyday life: look up a word, set up typing, check dates, or ask a question.", searchWord: "Search a Khmer or English word", starterDictionary: "Starter dictionary", tapToHear: "Tap a word to hear its Khmer pronunciation.", tools: "Tools", khmerCalendar: "Khmer calendar", checkLunarDate: "Check a lunar date", khmerKeyboard: "Khmer keyboard", setUpTyping: "Set up Khmer typing", askKhmerPhrase: "Ask about a Khmer phrase", reviewSavedMistakes: "Practice saved mistakes", myLearning: "My learning", yourProfile: "Your profile", yourLearningPath: "Your learning path", savedWords: "Saved words", mistakesToReview: "Mistakes to review", waiting: "waiting", audio: "Audio", listeningSpeed: "Listening speed", speedDescription: "This setting is saved to your account and applies to Khmer audio.", signOut: "Sign out", back: "Back", readAndSpell: "Read & spell", topicWords: "picture words", playAll: "Play all", readAloud: "Read aloud", standardSpelling: "Standard spelling", readingBridge: "SalaKhmer Reading Bridge",
  },
  vi: {
    homeGreeting: "Chào buổi sáng, {name}", dailyGoal: "Mục tiêu hôm nay", streakPrompt: "Giữ chuỗi học bằng một bài ngắn.", continueLesson: "Tiếp tục bài học", todaysPractice: "Luyện tập hôm nay", fiveMinuteReview: "Ôn tập 5 phút", savedMistakes: "Ôn lỗi đã lưu", handwritingDrill: "Luyện viết", traceLetters: "Tô chữ Khmer", dailyDialogue: "Hội thoại hằng ngày", listenRepeat: "Nghe và lặp lại", practicalKhmer: "Khmer thực tế", applyIntro: "Dùng Khmer trong đời sống: tra từ, cài bàn phím, xem ngày hoặc đặt câu hỏi.", searchWord: "Tìm từ Khmer hoặc tiếng Anh", starterDictionary: "Từ điển cơ bản", tapToHear: "Chạm vào từ để nghe cách phát âm Khmer.", tools: "Công cụ", khmerCalendar: "Lịch Khmer", checkLunarDate: "Xem ngày âm", khmerKeyboard: "Bàn phím Khmer", setUpTyping: "Cài gõ Khmer", askKhmerPhrase: "Hỏi về một câu Khmer", reviewSavedMistakes: "Luyện lỗi đã lưu", myLearning: "Việc học của tôi", yourProfile: "Hồ sơ của bạn", yourLearningPath: "Lộ trình học", savedWords: "Từ đã lưu", mistakesToReview: "Lỗi cần ôn", waiting: "đang chờ", audio: "Âm thanh", listeningSpeed: "Tốc độ nghe", speedDescription: "Cài đặt này được lưu trong tài khoản và áp dụng cho âm thanh Khmer.", signOut: "Đăng xuất", back: "Quay lại", readAndSpell: "Đọc & đánh vần", topicWords: "từ có hình", playAll: "Phát tất cả", readAloud: "Đọc thành tiếng", standardSpelling: "Đánh vần chuẩn", readingBridge: "Cầu nối đọc SalaKhmer",
  },
  zh: {
    homeGreeting: "早上好，{name}", dailyGoal: "每日目标", streakPrompt: "用一节短课保持你的学习连续性。", continueLesson: "继续学习", todaysPractice: "今日练习", fiveMinuteReview: "5 分钟复习", savedMistakes: "复习已保存的错误", handwritingDrill: "书写练习", traceLetters: "描摹高棉文字", dailyDialogue: "每日对话", listenRepeat: "听并跟读", practicalKhmer: "实用高棉语", applyIntro: "把高棉语用于日常生活：查词、设置输入法、查看日期或提问。", searchWord: "搜索高棉语或英语单词", starterDictionary: "入门词典", tapToHear: "点击单词以听高棉语发音。", tools: "工具", khmerCalendar: "高棉历", checkLunarDate: "查看农历日期", khmerKeyboard: "高棉语键盘", setUpTyping: "设置高棉语输入", askKhmerPhrase: "询问高棉语短语", reviewSavedMistakes: "练习已保存的错误", myLearning: "我的学习", yourProfile: "你的资料", yourLearningPath: "你的学习路径", savedWords: "已保存的单词", mistakesToReview: "待复习的错误", waiting: "等待中", audio: "音频", listeningSpeed: "播放速度", speedDescription: "此设置会保存到你的账户，并应用于高棉语音频。", signOut: "退出登录", back: "返回", readAndSpell: "阅读与拼写", topicWords: "图解词汇", playAll: "全部播放", readAloud: "朗读", standardSpelling: "标准拼写", readingBridge: "SalaKhmer 拼读桥",
  },
  fr: {
    homeGreeting: "Bonjour, {name}", dailyGoal: "Objectif du jour", streakPrompt: "Gardez votre série avec une courte leçon.", continueLesson: "Continuer la leçon", todaysPractice: "Entraînement du jour", fiveMinuteReview: "Révision de 5 min", savedMistakes: "Réviser les erreurs enregistrées", handwritingDrill: "Exercice d’écriture", traceLetters: "Tracer les lettres khmères", dailyDialogue: "Dialogue du jour", listenRepeat: "Écouter et répéter", practicalKhmer: "Khmer pratique", applyIntro: "Utilisez le khmer au quotidien : cherchez un mot, configurez la saisie, vérifiez une date ou posez une question.", searchWord: "Rechercher un mot khmer ou anglais", starterDictionary: "Dictionnaire débutant", tapToHear: "Touchez un mot pour entendre sa prononciation khmère.", tools: "Outils", khmerCalendar: "Calendrier khmer", checkLunarDate: "Vérifier une date lunaire", khmerKeyboard: "Clavier khmer", setUpTyping: "Configurer la saisie khmère", askKhmerPhrase: "Demander une phrase khmère", reviewSavedMistakes: "Travailler les erreurs enregistrées", myLearning: "Mon apprentissage", yourProfile: "Votre profil", yourLearningPath: "Votre parcours", savedWords: "Mots enregistrés", mistakesToReview: "Erreurs à réviser", waiting: "en attente", audio: "Audio", listeningSpeed: "Vitesse d’écoute", speedDescription: "Ce réglage est enregistré dans votre compte et s’applique à l’audio khmer.", signOut: "Se déconnecter", back: "Retour", readAndSpell: "Lire et épeler", topicWords: "mots illustrés", playAll: "Tout lire", readAloud: "Lire à voix haute", standardSpelling: "Épellation standard", readingBridge: "Passerelle de lecture SalaKhmer",
  },
};

/** Learner activity labels live here rather than inside React components. */
const activityInterfaceCopy: Record<Locale, Record<string, string>> = {
  en: { quickRecall: "Quick recall", matchWords: "Match words with meanings", chooseMeaning: "Choose a meaning", checkAnswer: "Check", correctAnswer: "Correct!", notQuite: "Not quite", answerLabel: "Answer", arrangeSentence: "Arrange the sentence", selectWords: "Select each word below", reset: "Reset", writeCharacter: "Write the character", typeKhmerCharacter: "Type the Khmer character here", strokeOrder: "Stroke order", reviewLesson: "Review this lesson", nextLesson: "Next lesson", checkpointNotPassed: "Checkpoint not passed", scoreLabel: "Your score", needScore: "You need at least {score}% to complete this lesson.", reviewIncorrect: "Review incorrect answers", items: "items", notYet: "Not yet", iRemember: "I remember", noItemsToReview: "No items left to review", startNewLesson: "Start a new lesson to continue building your Khmer skills.", backToPath: "Back to learning path" },
  vi: { quickRecall: "Ôn phản xạ", matchWords: "Ghép từ với nghĩa", chooseMeaning: "Chọn nghĩa", checkAnswer: "Kiểm tra", correctAnswer: "Đúng!", notQuite: "Chưa đúng", answerLabel: "Đáp án", arrangeSentence: "Sắp xếp câu", selectWords: "Chọn từng từ bên dưới", reset: "Đặt lại", writeCharacter: "Viết chữ cái", typeKhmerCharacter: "Nhập chữ Khmer ở đây", strokeOrder: "Thứ tự nét", reviewLesson: "Ôn lại bài này", nextLesson: "Bài tiếp theo", checkpointNotPassed: "Chưa qua mốc kiểm tra", scoreLabel: "Điểm của bạn", needScore: "Bạn cần ít nhất {score}% để hoàn thành bài này.", reviewIncorrect: "Ôn các câu sai", items: "mục", notYet: "Chưa nhớ", iRemember: "Tôi nhớ rồi", noItemsToReview: "Không còn mục cần ôn", startNewLesson: "Bắt đầu bài mới để tiếp tục rèn kỹ năng Khmer.", backToPath: "Về lộ trình học" },
  zh: { quickRecall: "快速回忆", matchWords: "词语配对", chooseMeaning: "选择含义", checkAnswer: "检查", correctAnswer: "正确！", notQuite: "还不对", answerLabel: "答案", arrangeSentence: "排列句子", selectWords: "从下方逐个选择单词", reset: "重置", writeCharacter: "书写字符", typeKhmerCharacter: "在此输入高棉文字", strokeOrder: "笔画顺序", reviewLesson: "复习本课", nextLesson: "下一课", checkpointNotPassed: "未通过检查点", scoreLabel: "你的得分", needScore: "你至少需要 {score}% 才能完成本课。", reviewIncorrect: "复习错题", items: "项", notYet: "还没掌握", iRemember: "我记住了", noItemsToReview: "没有需要复习的项目", startNewLesson: "开始新课程，继续提升高棉语技能。", backToPath: "返回学习路径" },
  fr: { quickRecall: "Rappel rapide", matchWords: "Associer les mots à leurs sens", chooseMeaning: "Choisir un sens", checkAnswer: "Vérifier", correctAnswer: "Correct !", notQuite: "Pas tout à fait", answerLabel: "Réponse", arrangeSentence: "Remettre la phrase en ordre", selectWords: "Sélectionnez chaque mot ci-dessous", reset: "Réinitialiser", writeCharacter: "Écrire le caractère", typeKhmerCharacter: "Saisissez le caractère khmer ici", strokeOrder: "Ordre des traits", reviewLesson: "Revoir cette leçon", nextLesson: "Leçon suivante", checkpointNotPassed: "Étape non validée", scoreLabel: "Votre score", needScore: "Vous avez besoin d’au moins {score}% pour terminer cette leçon.", reviewIncorrect: "Réviser les réponses incorrectes", items: "éléments", notYet: "Pas encore", iRemember: "Je m’en souviens", noItemsToReview: "Aucun élément à réviser", startNewLesson: "Commencez une nouvelle leçon pour continuer à développer vos compétences en khmer.", backToPath: "Retour au parcours" },
};

/** Detail-screen copy is separate from navigation copy to keep module i18n auditable. */
const lessonInterfaceCopy: Record<Locale, Record<string, string>> = {
  en: {
    alphabetLevel1Title: "LEVEL 1: A-series consonants", alphabetLevel2Title: "LEVEL 2: O-series consonants", alphabetLevel3Title: "LEVEL 3: Sub-consonants (coeng)", alphabetLevel4Title: "LEVEL 4: Dependent vowels", alphabetLevel5Title: "LEVEL 5: Independent vowels", alphabetLevel6Title: "LEVEL 6: Khmer numbers", lessonPlayEverySound: "Play every sound to complete this lesson.", lessonGuestPreview: "Guests can try the first 10 characters. Create a free account to unlock the full Khmer script.", lessonCompletedSummary: "You completed {lesson} and earned +{xp} XP", backToLessons: "Back to lessons", playASeries: "Play A-series example for {label}", playOSeries: "Play O-series example for {label}", aSeries: "A series", oSeries: "O series", air: "+ air",
  },
  vi: {
    alphabetLevel1Title: "CẤP 1: Phụ âm nhóm A", alphabetLevel2Title: "CẤP 2: Phụ âm nhóm O", alphabetLevel3Title: "CẤP 3: Phụ âm chân", alphabetLevel4Title: "CẤP 4: Nguyên âm phụ thuộc", alphabetLevel5Title: "CẤP 5: Nguyên âm độc lập", alphabetLevel6Title: "CẤP 6: Số Khmer", lessonPlayEverySound: "Nghe mọi âm để hoàn thành bài học.", lessonGuestPreview: "Khách có thể thử 10 ký tự đầu. Tạo tài khoản miễn phí để mở toàn bộ chữ Khmer.", lessonCompletedSummary: "Bạn đã hoàn thành {lesson} và nhận +{xp} XP", backToLessons: "Quay lại bài học", playASeries: "Phát ví dụ nhóm A cho {label}", playOSeries: "Phát ví dụ nhóm O cho {label}", aSeries: "Nhóm A", oSeries: "Nhóm O", air: "+ hơi",
  },
  zh: {
    alphabetLevel1Title: "第 1 级：A 组辅音", alphabetLevel2Title: "第 2 级：O 组辅音", alphabetLevel3Title: "第 3 级：下标辅音", alphabetLevel4Title: "第 4 级：附属元音", alphabetLevel5Title: "第 5 级：独立元音", alphabetLevel6Title: "第 6 级：高棉数字", lessonPlayEverySound: "播放所有发音以完成本课。", lessonGuestPreview: "访客可试听前 10 个字符。创建免费账户以解锁完整高棉文字。", lessonCompletedSummary: "你已完成 {lesson}，获得 +{xp} XP", backToLessons: "返回课程", playASeries: "播放 {label} 的 A 组示例", playOSeries: "播放 {label} 的 O 组示例", aSeries: "A 组", oSeries: "O 组", air: "+ 气流",
  },
  fr: {
    alphabetLevel1Title: "NIVEAU 1 : consonnes de série A", alphabetLevel2Title: "NIVEAU 2 : consonnes de série O", alphabetLevel3Title: "NIVEAU 3 : sous-consonnes", alphabetLevel4Title: "NIVEAU 4 : voyelles dépendantes", alphabetLevel5Title: "NIVEAU 5 : voyelles indépendantes", alphabetLevel6Title: "NIVEAU 6 : nombres khmers", lessonPlayEverySound: "Écoutez chaque son pour terminer cette leçon.", lessonGuestPreview: "Les invités peuvent essayer les 10 premiers caractères. Créez un compte gratuit pour déverrouiller l'écriture khmère complète.", lessonCompletedSummary: "Vous avez terminé {lesson} et gagné +{xp} XP", backToLessons: "Retour aux leçons", playASeries: "Lire l'exemple de série A pour {label}", playOSeries: "Lire l'exemple de série O pour {label}", aSeries: "Série A", oSeries: "Série O", air: "+ souffle",
  },
};

function interfaceText(locale: Locale, key: InterfaceKey): string {
  return activityInterfaceCopy[locale][key]
    ?? interfaceCopy[locale][key]
    ?? lessonInterfaceCopy[locale][key]
    ?? activityInterfaceCopy.en[key]
    ?? interfaceCopy.en[key]
    ?? lessonInterfaceCopy.en[key]
    ?? key;
}
const copy: Record<Locale, Record<TranslationKey, string>> = {
  en: englishCopy,
  vi: {
    ...englishCopy,
    home: "TRANG CHỦ", practice: "ỨNG DỤNG", dictionary: "TỪ ĐIỂN", profile: "HỒ SƠ",
    login: "Đăng nhập", register: "Đăng ký", loginGoogle: "Tiếp tục với Google",
    createAccount: "Tạo tài khoản", continueGuest: "Tiếp tục với tư cách khách",
    forgotPassword: "Quên mật khẩu?", resetPassword: "Đặt lại mật khẩu", backToLogin: "← Quay lại đăng nhập",
    email: "Địa chỉ email", password: "Mật khẩu", name: "Họ và tên", lockedTitle: "Đăng nhập để mở khóa mục này",
    lockedText: "Tạo tài khoản miễn phí để lưu tiến độ và mở toàn bộ bài học.", signInOrUp: "Đăng nhập / Đăng ký",
    lessonMissing: "Không có dữ liệu bài học", back: "Quay lại", lessonNeedsAccount: "Bài học này cần tài khoản",
    lessonNeedsAccountText: "Đăng nhập để mở bài học và lưu tiến độ.", complete: "Hoàn thành", next: "Tiếp tục",
    completed: "Hoàn thành!", earned: "Bạn nhận được", saving: "Đang lưu...", continuePath: "Tiếp tục học",
    review: "Ôn tập", locked: "Đã khóa", changeLanguage: "Đổi ngôn ngữ", welcomeBack: "CHÀO MỪNG TRỞ LẠI",
    overallProgress: "Tiến độ tổng", lessonsCompleted: "bài đã hoàn thành", logout: "Đăng xuất",
    lessons: "Bài học", review: "Ôn tập", locked: "Đã khóa",
    learnKhmer: "Học tiếng Khmer", curriculum: "Lộ trình học", curriculumIntro: "Học theo lộ trình. Mỗi mô-đun rèn một kỹ năng với âm thanh rõ ràng và ví dụ thực tế.",
    yourPath: "Lộ trình của bạn", allModules: "Tất cả mô-đun", moduleIntro: "Học theo tốc độ của bạn và dùng nút loa bất cứ khi nào cần nghe lại tiếng Khmer.",
    audioIncluded: "Có âm thanh", signInUnlockModule: "Đăng nhập để mở khóa mô-đun này", signInCreate: "Đăng nhập hoặc tạo tài khoản", contentLanguage: "Ngôn ngữ giao diện",
  },
  zh: {
    ...englishCopy,
    home: "主页", practice: "应用", dictionary: "词典", profile: "个人资料",
    login: "登录", register: "注册", loginGoogle: "使用 Google 继续", createAccount: "创建账户",
    continueGuest: "以访客身份继续", forgotPassword: "忘记密码？", resetPassword: "重置密码", backToLogin: "← 返回登录",
    email: "电子邮箱", password: "密码", name: "姓名", lockedTitle: "登录以解锁此模块",
    lockedText: "创建免费账户以保存学习进度并访问所有课程。", signInOrUp: "登录 / 注册",
    lessonMissing: "课程数据不可用", back: "返回", lessonNeedsAccount: "此课程需要账户",
    lessonNeedsAccountText: "登录以解锁课程并保存学习进度。", complete: "完成", next: "继续",
    completed: "已完成！", earned: "你获得了", saving: "正在保存...", continuePath: "继续学习",
    review: "复习", locked: "已锁定", changeLanguage: "切换语言", welcomeBack: "欢迎回来",
    overallProgress: "总体进度", lessonsCompleted: "已完成课程", logout: "退出登录",
    learnKhmer: "学习高棉语", curriculum: "学习课程", curriculumIntro: "按照学习路径前进。每个模块培养一项技能，配有清晰音频和实用示例。",
    yourPath: "你的学习路径", allModules: "所有模块", moduleIntro: "按自己的节奏学习，需要再次听高棉语时使用扬声器按钮。",
    audioIncluded: "包含音频", signInUnlockModule: "登录以解锁此模块", signInCreate: "登录或创建账户", contentLanguage: "界面语言",
  },
  fr: {
    ...englishCopy,
    home: "ACCUEIL", practice: "OUTILS", dictionary: "DICTIONNAIRE", profile: "PROFIL",
    login: "Se connecter", register: "S'inscrire", loginGoogle: "Continuer avec Google",
    createAccount: "Créer un compte", continueGuest: "Continuer en invité", forgotPassword: "Mot de passe oublié ?",
    resetPassword: "Réinitialiser le mot de passe", backToLogin: "← Retour à la connexion",
    email: "Adresse e-mail", password: "Mot de passe", name: "Nom complet",
    lockedTitle: "Connectez-vous pour déverrouiller ce module", lockedText: "Créez un compte gratuit pour enregistrer votre progression.",
    signInOrUp: "Connexion / Inscription", lessonMissing: "Les données de la leçon sont indisponibles",
    back: "Retour", lessonNeedsAccount: "Cette leçon nécessite un compte", lessonNeedsAccountText: "Connectez-vous pour accéder à cette leçon.",
    complete: "Terminer", next: "Continuer", completed: "Terminé !", earned: "Vous avez gagné", saving: "Enregistrement...",
    continuePath: "Continuer à apprendre", review: "Révision", locked: "Verrouillé", changeLanguage: "Changer de langue",
    welcomeBack: "BON RETOUR", overallProgress: "Progression globale", lessonsCompleted: "leçons terminées", logout: "Se déconnecter",
    learnKhmer: "Apprendre le khmer", curriculum: "Votre programme", curriculumIntro: "Suivez le parcours. Chaque module développe une compétence, avec un audio clair et des exemples pratiques.",
    yourPath: "Votre parcours", allModules: "Tous les modules", moduleIntro: "Progressez à votre rythme et utilisez le bouton audio lorsque vous voulez réécouter le khmer.",
    audioIncluded: "Audio inclus", signInUnlockModule: "Connectez-vous pour déverrouiller ce module", signInCreate: "Se connecter ou créer un compte", contentLanguage: "Langue de l’interface",
  },
};
type I18nContext = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
  tr: (key: InterfaceKey, values?: Record<string, string | number>) => string;
};
const LocaleContext = createContext<I18nContext | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") return "en";
    const saved = window.localStorage.getItem("app-language");
    return saved === "vi" || saved === "zh" || saved === "fr" || saved === "en" ? saved : "en";
  });
  const setLocale = (next: Locale) => {
    setLocaleState(next);
    if (typeof window !== "undefined") window.localStorage.setItem("app-language", next);
  };
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: (key: TranslationKey) => copy[locale][key],
      tr: (key: InterfaceKey, values: Record<string, string | number> = {}) =>
        Object.entries(values).reduce(
          (text, [name, value]) => text.replaceAll(`{${name}}`, String(value)),
          interfaceText(locale, key),
        ),
    }),
    [locale],
  );
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  // TanStack Start can render route components in a separate SSR tree from the
  // document shell. Use deterministic English during that pass; hydration then
  // receives the persisted locale from LocaleProvider.
  if (!context) {
    return {
      locale: "en" as Locale,
      setLocale: () => undefined,
      t: (key: TranslationKey) => copy.en[key],
      tr: (key: InterfaceKey, values: Record<string, string | number> = {}) =>
        Object.entries(values).reduce(
          (text, [name, value]) => text.replaceAll(`{${name}}`, String(value)),
          interfaceText("en", key),
        ),
    };
  }
  return context;
}

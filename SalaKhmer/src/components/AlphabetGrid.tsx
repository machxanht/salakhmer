import { Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "@tanstack/react-router";
import { hasFullLessonTestAccess } from "@/lib/tester-access";
import { useLocale, type Locale } from "@/lib/i18n";

const LEVELS = [
  {
    id: "alpha-l1",
    title: "LEVEL 1: A-series consonants",
    subtitle: "The first consonant series; its base vowel is close to the a in ‘father’.",
    khmerTitle: "ក ខ ច ឆ ដ ...",
    theme: "ruby",
    isFree: true,
    totalItems: 15,
  },
  {
    id: "alpha-l2",
    title: "LEVEL 2: O-series consonants",
    subtitle: "The second consonant series; its base vowel is close to the aw in ‘law’.",
    khmerTitle: "គ ឃ ង ជ ឈ ...",
    theme: "jade",
    isFree: true,
    totalItems: 18,
  },
  {
    id: "alpha-l3",
    title: "LEVEL 3: Sub-consonants (coeng)",
    subtitle: "Letters placed below a main consonant to make a cluster.",
    khmerTitle: "្ក ្ខ ្គ ្ឃ ្ង ...",
    theme: "amber",
    isFree: false,
    totalItems: 32,
  },
  {
    id: "alpha-l4",
    title: "LEVEL 4: Dependent Vowels",
    subtitle: "(Dependent vowels) Wraps around a consonant",
    khmerTitle: "ា ិ ី ឹ ឺ ...",
    theme: "blue",
    isFree: false,
    totalItems: 24,
  },
  {
    id: "alpha-l5",
    title: "LEVEL 5: Independent Vowels",
    subtitle: "(Independent vowels) Standalone syllables",
    khmerTitle: "ឥ ឦ ឧ ឩ ឪ ...",
    theme: "purple",
    isFree: false,
    totalItems: 13,
  },
  {
    id: "alpha-l6",
    title: "LEVEL 6: Numerals",
    subtitle: "(Numerals) Khmer counting system",
    khmerTitle: "០ ១ ២ ៣ ៤ ...",
    theme: "slate",
    isFree: false,
    totalItems: 15,
  },
];

const VI_LEVEL_COPY: Record<string, { title: string; subtitle: string }> = {
  "alpha-l1": { title: "CẤP 1: Phụ âm nhóm A", subtitle: "Nhóm phụ âm đầu tiên; nguyên âm cơ bản gần với âm a trong 'father'." },
  "alpha-l2": { title: "CẤP 2: Phụ âm nhóm O", subtitle: "Nhóm phụ âm thứ hai; nguyên âm cơ bản gần với âm aw trong 'law'." },
  "alpha-l3": { title: "CẤP 3: Phụ âm chân", subtitle: "Chữ cái đặt dưới phụ âm chính để tạo cụm phụ âm." },
  "alpha-l4": { title: "CẤP 4: Nguyên âm phụ thuộc", subtitle: "Nguyên âm bao quanh một phụ âm." },
  "alpha-l5": { title: "CẤP 5: Nguyên âm độc lập", subtitle: "Âm tiết có thể đứng độc lập." },
  "alpha-l6": { title: "CẤP 6: Số Khmer", subtitle: "Hệ thống đếm bằng số Khmer." },
};

function localizedLevel(level: (typeof LEVELS)[number], locale: Locale) {
  return locale === "vi" ? (VI_LEVEL_COPY[level.id] ?? level) : level;
}

export function AlphabetGrid() {
  const { user, firebaseUser } = useAuth();
  const { locale, t } = useLocale();
  const hasTesterAccess = hasFullLessonTestAccess(firebaseUser?.email ?? user.email);

  return (
    <div className="relative pt-2 pb-20">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {LEVELS.map((level, index) => {
          const copy = localizedLevel(level, locale);
          const isCompleted = user.completedLessons.includes(level.id);
          const previousLevelId = LEVELS[index - 1]?.id;
          const isUnlocked =
            (hasTesterAccess || user.role === "REGISTERED" || index === 0) &&
            (index === 0 ||
              hasTesterAccess ||
              isCompleted ||
              (previousLevelId != null && user.completedLessons.includes(previousLevelId)));
          const isNextToLearn = isUnlocked && !isCompleted;

          return (
            <div key={level.id} className="relative flex flex-col h-full">
              {/* Lesson Card */}
              <div
                className={`flex-1 rounded-2xl p-4 transition-all duration-300 ${
                  isCompleted
                    ? "bg-card border border-border/50 opacity-90"
                    : isNextToLearn
                      ? "bg-card shadow-md border-2 border-primary/20 scale-[1.02]"
                      : "bg-card/50 border border-border/30 opacity-60 grayscale-[0.3]"
                }`}
              >
                <div className="flex justify-between items-start mb-1.5">
                  <span className="text-[10px] font-bold tracking-[0.1em] text-muted-foreground uppercase">
                    {locale === "vi" ? "BẢNG CHỮ CÁI" : "ALPHABET"}
                  </span>
                  <span className="text-[10px] font-extrabold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                    +{level.totalItems} XP
                  </span>
                </div>
                <h3
                  className={`font-extrabold ${isNextToLearn ? "text-lg text-foreground" : "text-base text-foreground/80"}`}
                >
                  {copy.title}
                </h3>

                <p className={`khmer text-sm mt-0.5 ${getThemeTextColor(level.theme)}`}>
                  {level.khmerTitle}
                </p>

                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                  {copy.subtitle}
                </p>

                {isNextToLearn && (
                  <Link
                    to="/grid-lesson/$lessonId"
                    params={{ lessonId: level.id }}
                    className="mt-4 block w-full bg-primary text-primary-foreground font-extrabold text-sm py-2 rounded-xl shadow-sm hover:opacity-90 active:scale-95 transition-all text-center"
                  >
                    {locale === "vi" ? "Bắt đầu học" : "Start learning"}
                  </Link>
                )}
                {isCompleted && (
                  <Link
                    to="/grid-lesson/$lessonId"
                    params={{ lessonId: level.id }}
                    className="mt-4 block w-full bg-secondary text-foreground font-extrabold text-sm py-2 rounded-xl shadow-sm hover:opacity-90 active:scale-95 transition-all text-center"
                  >
                    {t("review")}
                  </Link>
                )}
                {!isUnlocked && !isCompleted && (
                  <div className="mt-3 flex items-center justify-center gap-1.5 w-full bg-secondary/50 text-muted-foreground font-bold text-sm py-2.5 rounded-xl">
                    <Lock className="h-4 w-4" /> {t("locked")}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getThemeTextColor(theme: string) {
  switch (theme) {
    case "ruby":
      return "text-ruby";
    case "jade":
      return "text-jade";
    case "amber":
      return "text-amber-600";
    case "blue":
      return "text-blue-600";
    case "purple":
      return "text-purple-600";
    case "slate":
      return "text-slate-600";
    default:
      return "text-primary";
  }
}

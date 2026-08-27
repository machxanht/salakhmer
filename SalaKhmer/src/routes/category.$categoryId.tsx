import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronRight,
  Headphones,
  Lock,
  PenLine,
  Type,
} from "lucide-react";
import { AlphabetGrid } from "@/components/AlphabetGrid";
import { KingdomInsights } from "@/components/KingdomInsights";
import {
  LovableBottomNav,
  LongPageNav,
  LovableScreen,
  LovableSectionTitle,
  LOVABLE_MODULES,
  getLocalizedModuleCopy,
} from "@/components/LovableAppShell";
import { TopicCover } from "@/components/TopicCover";
import { StrokeOrderDrawing } from "@/components/StrokeOrderDrawing";
import { isCategoryAccessible, type ContentCategory } from "@/lib/auth-access";
import { MOCK_LESSONS } from "@/lib/mock-lessons";
import { hasFullLessonTestAccess } from "@/lib/tester-access";
import { useAuth } from "@/hooks/useAuth";
import { READ_SPELL_TOPICS } from "@/lib/read-spell-catalog";
import { useLocale } from "@/lib/i18n";
import { getPublishedModuleContent, type PublishedCmsContent } from "@/lib/cms-content";
import { getLocalizedReadSpellTopic } from "@/lib/read-spell-localization";
import { localizeLegacyLesson, localizeLegacyText } from "@/lib/content-localization";

export const Route = createFileRoute("/category/$categoryId")({ component: CategoryPage });
const scriptLessons = ["alpha-l1", "alpha-l2", "alpha-l3", "alpha-l4", "alpha-l5", "alpha-l6"];
const SCRIPT_LESSON_COPY = {
  en: [["Level 1: A-series consonants", "Hear, recognise, and practise the first consonant series."], ["Level 2: O-series consonants", "Hear, recognise, and practise the second consonant series."], ["Level 3: Sub-consonants", "Learn the smaller consonant forms used in Khmer word building."], ["Level 4: Dependent vowels", "Hear each vowel in both A-series and O-series contexts."], ["Level 5: Independent vowels", "Recognise the vowels that stand on their own."], ["Level 6: Khmer numbers", "Read Khmer numerals from everyday counting to larger amounts."]],
  vi: [["Cấp 1: Phụ âm giọng A", "Nghe, nhận biết và luyện nhóm phụ âm đầu tiên."], ["Cấp 2: Phụ âm giọng O", "Nghe, nhận biết và luyện nhóm phụ âm thứ hai."], ["Cấp 3: Phụ âm chân", "Học dạng phụ âm nhỏ dùng khi ghép từ Khmer."], ["Cấp 4: Nguyên âm phụ thuộc", "Nghe từng nguyên âm trong cả ngữ cảnh giọng A và O."], ["Cấp 5: Nguyên âm độc lập", "Nhận biết các nguyên âm có thể đứng riêng."], ["Cấp 6: Số Khmer", "Đọc số Khmer từ đếm hằng ngày đến số lớn."]],
  zh: [["第 1 级：A 系辅音", "聆听、辨认并练习第一组辅音。"], ["第 2 级：O 系辅音", "聆听、辨认并练习第二组辅音。"], ["第 3 级：下标辅音", "学习构词时使用的小辅音形式。"], ["第 4 级：附属元音", "在 A 系和 O 系语境中聆听每个元音。"], ["第 5 级：独立元音", "认识能够独立使用的元音。"], ["第 6 级：高棉数字", "从日常计数到较大数额阅读高棉数字。"]],
  fr: [["Niveau 1 : consonnes de série A", "Écoutez, reconnaissez et pratiquez la première série de consonnes."], ["Niveau 2 : consonnes de série O", "Écoutez, reconnaissez et pratiquez la deuxième série de consonnes."], ["Niveau 3 : consonnes souscrites", "Apprenez les petites formes de consonnes utilisées pour former des mots."], ["Niveau 4 : voyelles dépendantes", "Écoutez chaque voyelle dans les contextes des séries A et O."], ["Niveau 5 : voyelles indépendantes", "Reconnaissez les voyelles qui peuvent s’employer seules."], ["Niveau 6 : nombres khmers", "Lisez les chiffres khmers, du comptage quotidien aux grands nombres."]],
} as const;
function CategoryPage() {
  const { categoryId } = Route.useParams();
  const navigate = useNavigate();
  const { user, firebaseUser } = useAuth();
  const { locale, t, tr } = useLocale();
  const [publishedContent, setPublishedContent] = useState<PublishedCmsContent[]>([]);
  const module = LOVABLE_MODULES.find((item) => item.id === categoryId);
  if (!module)
    return (
      <LovableScreen>
        <div className="p-6">This module does not exist.</div>
      </LovableScreen>
    );
  const catId = categoryId as ContentCategory;
  const sourceLessons =
    catId === "module_1"
      ? scriptLessons.map((id, index) => ({
          id,
          title: SCRIPT_LESSON_COPY[locale][index][0],
          description: SCRIPT_LESSON_COPY[locale][index][1],
        }))
      : (MOCK_LESSONS[catId] ?? []);
  const lessons = sourceLessons.map((lesson) => localizeLegacyLesson(lesson, locale));
  const complete = lessons.filter((lesson) => user.completedLessons.includes(lesson.id)).length;
  const percent = lessons.length ? Math.round((complete / lessons.length) * 100) : 0;
  const access =
    hasFullLessonTestAccess(firebaseUser?.email ?? user.email) ||
    isCategoryAccessible(user.role, catId);
  const Icon = module.icon;
  const moduleCopy = getLocalizedModuleCopy(module.id, locale);
  useEffect(() => {
    let active = true;
    void getPublishedModuleContent(categoryId, locale)
      .then((items) => {
        if (active) setPublishedContent(items);
      })
      .catch(() => {
        if (active) setPublishedContent([]);
      });
    return () => {
      active = false;
    };
  }, [categoryId, locale]);
  return (
    <LovableScreen>
      <header className="flex items-center gap-3 px-5 pt-8">
        <button
          onClick={() => navigate({ to: "/learn" })}
          className="grid h-10 w-10 place-items-center rounded-2xl border border-[#D8E6E3] bg-[#EAF6F2] text-[#0B8B76]"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="text-[14px] font-black text-[#64766E]">{t("allModules")}</span>
      </header>
      <section className="relative mx-5 mt-5 overflow-hidden rounded-[27px] bg-[#173B33] px-5 pb-5 pt-5 text-white">
        {module.art && (
          <img
            src={module.art}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-4 right-2 h-[170px] w-[132px] object-contain object-bottom opacity-95"
          />
        )}
        <div className={module.art ? "relative z-10 max-w-[64%]" : "relative z-10"}>
        <span className="grid h-12 w-12 place-items-center rounded-[16px] bg-[#F7B733] text-[#173B33]">
          <Icon className="h-6 w-6" />
        </span>
        <h1 className="mt-4 text-[28px] font-black tracking-[-.04em]">{moduleCopy.title}</h1>
        <p className="mt-2 text-[14px] leading-5 text-[#C7DDD6]">
          {moduleCopy.subtitle}. {t("moduleIntro")}
        </p>
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/15">
          <div className="h-full rounded-full bg-[#F7B733]" style={{ width: `${percent}%` }} />
        </div>
        <p className="mt-2 text-[12.5px] font-bold text-[#C7DDD6]">
          {complete} of {lessons.length} {t("lessonsCompleted")}
        </p>
        </div>
      </section>
      <section className="px-5 pt-8">
        {!access && (
          <div className="rounded-[18px] border border-[#E5D5BC] bg-[#FFF8E8] p-5 text-center">
            <Lock className="mx-auto h-6 w-6 text-[#A9631E]" />
            <h2 className="mt-3 font-semibold">{t("signInUnlockModule")}</h2>
            <Link
              to="/login"
              search={{ redirect: `/category/${catId}` }}
              className="mt-4 block rounded-[14px] bg-[#D98624] py-3 text-sm font-semibold text-white"
            >
              {t("signInCreate")}
            </Link>
          </div>
        )}
        {access && (
          <>
            {catId !== "module_1" && <LovableSectionTitle title={t("lessons")} note={t("audioIncluded")} />}
            {catId === "module_1" && (
              <div className="mb-6">
                <AlphabetGrid />
              </div>
            )}
            {catId === "module_2" && (
              <>
                <div className="mb-6 grid grid-cols-2 gap-3">
                  {READ_SPELL_TOPICS.map((topic) => (
                    <Link
                      key={topic.topic_id}
                      to="/read-spell/$topicId"
                      params={{ topicId: topic.topic_id }}
                      className="min-h-[116px] rounded-[20px] border border-[#E4D7C5] bg-[#FFFCF7] p-4 shadow-[0_2px_5px_rgba(71,56,43,.05)]"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <TopicCover topicId={topic.topic_id} label={getLocalizedReadSpellTopic(topic, locale).title} />
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#F9E8BF] text-xs font-bold text-[#A9631E]">{topic.topic_order}</span>
                      </div>
                      <strong className="mt-3 block text-[14px] leading-5">{getLocalizedReadSpellTopic(topic, locale).title}</strong>
                      <small className="mt-1 block text-[11px] text-[#786858]">15 {tr("topicWords")}</small>
                    </Link>
                  ))}
                </div>
              </>
            )}
            {catId === "module_4" && (
              <div className="mb-6">
                <StrokeOrderDrawing />
              </div>
            )}
            {catId === "module_6" && (
              <div className="mb-6">
                <KingdomInsights />
              </div>
            )}
            {catId !== "module_1" && catId !== "module_4" && publishedContent.length > 0 && (
              <div className="mb-6 space-y-3">
                <LovableSectionTitle title={locale === "vi" ? "Nội dung đã xuất bản" : "Published updates"} note={`${publishedContent.length}`} />
                {publishedContent.map((item) => (
                  <article key={item.id} className="rounded-[18px] border border-[#B9DDD5] bg-[#F1FAF7] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[.1em] text-[#167C70]">{item.type}</p>
                    <h2 className="mt-1 text-[16px] font-bold">{localizeLegacyText(item.title, locale)}</h2>
                    {item.summary && <p className="mt-2 text-[13px] leading-5 text-[#58726F]">{localizeLegacyText(item.summary, locale)}</p>}
                  </article>
                ))}
              </div>
            )}
            {catId !== "module_1" && catId !== "module_2" && catId !== "module_4" && (
              <div className="flex flex-col gap-3">
                {lessons.map((lesson, index) => (
                  <LessonRow
                    key={lesson.id}
                    index={index + 1}
                    lesson={lesson}
                    complete={user.completedLessons.includes(lesson.id)}
                    moduleId={catId}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>
      <LongPageNav />
      <LovableBottomNav />
    </LovableScreen>
  );
}
function LessonRow({
  index,
  lesson,
  complete,
  moduleId,
}: {
  index: number;
  lesson: { id: string; title: string; description: string };
  complete: boolean;
  moduleId: ContentCategory;
}) {
  const isScript = lesson.id.startsWith("alpha-");
  const icon =
    moduleId === "module_3" ? (
      <Headphones className="h-5 w-5" />
    ) : moduleId === "module_4" ? (
      <PenLine className="h-5 w-5" />
    ) : moduleId === "module_1" ? (
      <Type className="h-5 w-5" />
    ) : (
      <BookOpen className="h-5 w-5" />
    );
  const target = isScript ? `/grid-lesson/${lesson.id}` : `/lesson/${lesson.id}`;
  return (
    <Link
      to={isScript ? "/grid-lesson/$lessonId" : "/lesson/$lessonId"}
      params={{ lessonId: lesson.id }}
      search={isScript ? undefined : { activity: 0 }}
      className="flex min-h-[82px] items-center gap-4 rounded-[22px] border border-[#E5E6E0] bg-white p-4 shadow-[0_7px_18px_rgba(23,59,51,.06)] transition active:scale-[.99]"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#E7F2EE] text-sm font-black text-[#0B8B76]">
        {complete ? <Check className="h-4 w-4" /> : index}
      </span>
      <span className="min-w-0 flex-1">
        <strong className="block text-[15px]">{lesson.title}</strong>
        <small className="mt-1 block truncate text-[12px] text-[#786858]">
          {lesson.description}
        </small>
      </span>
      <span className="text-[#0B8B76]">{icon}</span>
      <ChevronRight className="h-4 w-4 text-[#A99B8C]" />
    </Link>
  );
}

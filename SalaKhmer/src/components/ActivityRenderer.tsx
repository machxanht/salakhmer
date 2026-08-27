import type { ActivityResult, LessonActivity } from "@/lib/lesson-activities";
import type { FlashcardContent } from "@/lib/mock-lessons";
import { englishFriendlyRomanization } from "@/lib/romanization";
import { useLocale } from "@/lib/i18n";
import { useRef, useState } from "react";

type ActivityRendererProps = {
  activity: LessonActivity;
  cardIndex: number;
  flipped: boolean;
  onFlip: () => void;
  onPlayAudio: (card: FlashcardContent) => void;
  onPlayPromptAudio: (audioId: string, text: string) => void;
  isPlaying: boolean;
  onResult: (result: ActivityResult) => void;
};

/** Shared activity surface; new activity types can be added without changing LessonPage. */
export function ActivityRenderer({
  activity,
  cardIndex,
  flipped,
  onFlip,
  onPlayAudio,
  onPlayPromptAudio,
  isPlaying,
  onResult,
}: ActivityRendererProps) {
  const { tr } = useLocale();
  if (activity.type === "multipleChoice" || activity.type === "audioChoice") {
    return (
      <ChoiceActivity
        activity={activity}
        isPlaying={isPlaying}
        onPlayAudio={onPlayPromptAudio}
        onResult={onResult}
      />
    );
  }

  if (activity.type === "timedChoice") {
    return <TimedChoiceActivity activity={activity} onResult={onResult} />;
  }

  if (activity.type === "errorRepair") {
    return <ErrorRepairActivity activity={activity} onResult={onResult} />;
  }

  if (activity.type === "matching") {
    return <MatchingActivity pairs={activity.pairs} onResult={onResult} />;
  }

  if (activity.type === "ordering") {
    return <OrderingActivity items={activity.items} answer={activity.answer} onResult={onResult} />;
  }

  if (activity.type === "writing") {
    return (
      <WritingActivity
        character={activity.character}
        strokes={activity.strokes}
        onResult={onResult}
      />
    );
  }

  if (activity.type !== "flashcard") {
    return (
      <div className="flex aspect-[3/4] w-full max-w-sm items-center justify-center rounded-3xl border border-dashed border-primary/40 bg-card p-8 text-center">
        <p className="text-sm font-bold text-muted-foreground">
          {tr("notYet")}
        </p>
      </div>
    );
  }

  const card = activity.cards[cardIndex];
  if (!card) {
    return (
      <div className="rounded-2xl bg-card p-6 text-center text-sm text-muted-foreground">
        {tr("lessonMissing")}
      </div>
    );
  }
  return (
    <div
      className={`relative aspect-[3/4] w-full max-w-sm cursor-pointer transition-transform duration-700 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}
      onClick={onFlip}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-border/50 bg-card p-8 text-center shadow-xl [backface-visibility:hidden]">
        <button
          onClick={(event) => {
            event.stopPropagation();
            onPlayAudio(card);
          }}
          disabled={isPlaying}
          className="absolute right-5 top-5 rounded-full bg-secondary p-3 text-primary transition-transform hover:scale-110 disabled:animate-pulse"
          aria-label={tr("audio")}
        >
          🔊
        </button>
        <p
          className={`khmer font-bold ${card.front.length > 5 ? "text-4xl" : "text-[9rem] leading-none"}`}
        >
          {card.front}
        </p>
        <p className="absolute bottom-8 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
          {tr("tapFlip")}
        </p>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-primary bg-primary p-8 text-center text-primary-foreground shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
        <p className="khmer mb-6 text-5xl font-bold">{card.front}</p>
        <h2 className="mb-3 text-4xl font-extrabold">{card.back}</h2>
        <p className="text-lg opacity-90">{englishFriendlyRomanization(card.desc)}</p>
      </div>
    </div>
  );
}

function result(
  correct: boolean,
  response: string,
  startedAt: number,
  attempts = 1,
): ActivityResult {
  return {
    correct,
    response,
    attempts,
    score: correct ? 100 : 0,
    responseTimeMs: Date.now() - startedAt,
  };
}

function ChoiceActivity({
  activity,
  isPlaying,
  onPlayAudio,
  onResult,
}: {
  activity: Extract<LessonActivity, { type: "multipleChoice" | "audioChoice" }>;
  isPlaying: boolean;
  onPlayAudio: (audioId: string, text: string) => void;
  onResult: (result: ActivityResult) => void;
}) {
  const { tr } = useLocale();
  const [selected, setSelected] = useState<string>();
  const startedAt = useRef(Date.now());
  const answered = selected !== undefined;
  return (
    <div className="w-full max-w-sm rounded-3xl border border-border/50 bg-card p-6 shadow-xl">
      <div className="mb-5 flex items-start justify-between gap-3">
        <p className="text-lg font-extrabold leading-relaxed">{activity.prompt}</p>
        {activity.type === "audioChoice" && (
          <button
            type="button"
            disabled={isPlaying}
            aria-label={tr("audio")}
            onClick={() =>
              onPlayAudio(
                activity.audioId ?? activity.prompt,
                activity.audioText ?? activity.prompt,
              )
            }
            className="shrink-0 rounded-full bg-secondary p-3 text-primary disabled:opacity-50"
          >
            🔊
          </button>
        )}
      </div>
      <div className="space-y-3">
        {activity.options.map((option) => {
          const isSelected = selected === option;
          const correct = option === activity.answer;
          return (
            <button
              key={option}
              type="button"
              disabled={answered}
              onClick={() => {
                setSelected(option);
                onResult(result(correct, option, startedAt.current));
              }}
              className={`w-full rounded-2xl border p-4 text-left text-sm font-bold transition-all ${answered && correct ? "border-emerald-500 bg-emerald-50 text-emerald-700" : answered && isSelected ? "border-red-400 bg-red-50 text-red-700" : "border-border bg-background hover:border-primary hover:bg-primary/5"}`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {answered && <Feedback correct={selected === activity.answer} answer={activity.answer} />}
    </div>
  );
}

function Feedback({ correct, answer }: { correct: boolean; answer: string }) {
  return (
    <p
      role="status"
      className={`mt-5 rounded-xl p-3 text-center text-sm font-extrabold ${correct ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}
    >
      {correct ? "Correct!" : `Not quite — answer: ${answer}`}
    </p>
  );
}

function TimedChoiceActivity({
  activity,
  onResult,
}: {
  activity: Extract<LessonActivity, { type: "timedChoice" }>;
  onResult: (result: ActivityResult) => void;
}) {
  const { tr } = useLocale();
  const [selected, setSelected] = useState<string>();
  const startedAt = useRef(Date.now());
  const elapsed = Math.floor((Date.now() - startedAt.current) / 1000);
  const remaining = Math.max(activity.seconds - elapsed, 0);
  return (
    <div className="w-full max-w-sm rounded-3xl border border-border/50 bg-card p-6 shadow-xl">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-800">{tr("quickRecall")}</span>
        <span className="text-xs font-bold text-muted-foreground">{activity.seconds}s</span>
      </div>
      <p className="mb-5 text-lg font-extrabold leading-relaxed">{activity.prompt}</p>
      <div className="space-y-3">
        {activity.options.map((option) => {
          const answered = selected !== undefined;
          const correct = option === activity.answer;
          return (
            <button key={option} type="button" disabled={answered} onClick={() => {
              setSelected(option);
              onResult(result(correct, option, startedAt.current));
            }} className={`w-full rounded-2xl border p-4 text-left text-sm font-bold ${answered && correct ? "border-emerald-500 bg-emerald-50 text-emerald-700" : answered && selected === option ? "border-red-400 bg-red-50 text-red-700" : "border-border bg-background hover:border-primary hover:bg-primary/5"}`}>
              {option}
            </button>
          );
        })}
      </div>
      {selected && <Feedback correct={selected === activity.answer} answer={activity.answer} />}
      {remaining === 0 && !selected ? <p className="mt-3 text-xs text-muted-foreground">No penalty — choose when ready.</p> : null}
    </div>
  );
}

function ErrorRepairActivity({
  activity,
  onResult,
}: {
  activity: Extract<LessonActivity, { type: "errorRepair" }>;
  onResult: (result: ActivityResult) => void;
}) {
  const { tr } = useLocale();
  const [selected, setSelected] = useState<string>();
  const startedAt = useRef(Date.now());
  const answered = selected !== undefined;
  return (
    <div className="w-full max-w-sm rounded-3xl border border-border/50 bg-card p-6 shadow-xl">
      <p className="mb-3 text-lg font-extrabold leading-relaxed">{activity.prompt}</p>
      <p className="khmer mb-5 rounded-2xl bg-secondary p-4 text-center text-2xl font-bold">{activity.sentence}</p>
      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">{tr("checkAnswer")}</p>
      <div className="space-y-3">
        {activity.options.map((option) => {
          const correct = option === activity.answer;
          return <button key={option} type="button" disabled={answered} onClick={() => {
            setSelected(option);
            onResult(result(correct, option, startedAt.current));
          }} className={`w-full rounded-2xl border p-4 text-left text-sm font-bold ${answered && correct ? "border-emerald-500 bg-emerald-50 text-emerald-700" : answered && selected === option ? "border-red-400 bg-red-50 text-red-700" : "border-border bg-background hover:border-primary hover:bg-primary/5"}`}>{option}</button>;
        })}
      </div>
      {answered && <><Feedback correct={selected === activity.answer} answer={activity.answer} /><p className="mt-3 text-xs text-muted-foreground">{activity.explanation}</p></>}
    </div>
  );
}

function MatchingActivity({
  pairs,
  onResult,
}: {
  pairs: { left: string; right: string }[];
  onResult: (result: ActivityResult) => void;
}) {
  const { tr } = useLocale();
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const startedAt = useRef(Date.now());
  const correct = pairs.every((pair) => matches[pair.left] === pair.right);
  return (
    <div className="w-full max-w-sm rounded-3xl border border-border/50 bg-card p-6 shadow-xl">
      <h2 className="mb-4 text-lg font-extrabold">{tr("matchWords")}</h2>
      <div className="space-y-3">
        {pairs.map((pair) => (
          <div key={pair.left} className="grid grid-cols-2 items-center gap-2">
            <span className="rounded-xl bg-secondary p-3 text-center font-bold">{pair.left}</span>
            <select
              aria-label={tr("chooseMeaning")}
              disabled={submitted}
              value={matches[pair.left] ?? ""}
              onChange={(event) =>
                setMatches((current) => ({ ...current, [pair.left]: event.target.value }))
              }
              className="rounded-xl border border-border bg-background p-3 text-sm"
            >
              <option value="">{tr("chooseMeaning")}</option>
              {pairs.map((option) => (
                <option key={option.right}>{option.right}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <button
        type="button"
        disabled={submitted || Object.keys(matches).length !== pairs.length}
        onClick={() => {
          setSubmitted(true);
          onResult(
            result(
              correct,
              pairs.map((pair) => `${pair.left}=${matches[pair.left] ?? ""}`).join(" | "),
              startedAt.current,
            ),
          );
        }}
        className="mt-5 w-full rounded-xl bg-primary p-3 font-extrabold text-primary-foreground disabled:opacity-40"
      >
        {tr("checkAnswer")}
      </button>
      {submitted && (
        <Feedback
          correct={correct}
          answer={pairs.map((pair) => `${pair.left} = ${pair.right}`).join(" · ")}
        />
      )}
    </div>
  );
}

function OrderingActivity({
  items,
  answer,
  onResult,
}: {
  items: string[];
  answer: string[];
  onResult: (result: ActivityResult) => void;
}) {
  const { tr } = useLocale();
  const [order, setOrder] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const startedAt = useRef(Date.now());
  const complete = order.length === items.length;
  const response = order.map((index) => items[index] ?? "");
  const correct = response.join(" ") === answer.join(" ");
  return (
    <div className="w-full max-w-sm rounded-3xl border border-border/50 bg-card p-6 shadow-xl">
      <h2 className="mb-4 text-lg font-extrabold">{tr("arrangeSentence")}</h2>
      <div className="mb-4 min-h-12 rounded-xl bg-primary/10 p-3 text-sm font-bold">
        {response.join(" ") || tr("selectWords")}
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <button
            key={`${item}-${index}`}
            type="button"
            disabled={submitted || order.includes(index)}
            onClick={() => setOrder((current) => [...current, index])}
            className="rounded-xl border border-border bg-background px-3 py-2 text-sm font-bold disabled:opacity-40"
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2">
        <button
          type="button"
          disabled={submitted || order.length === 0}
          onClick={() => setOrder([])}
          className="rounded-xl border border-border p-3 font-bold disabled:opacity-40"
        >
          {tr("reset")}
        </button>
        <button
          type="button"
          disabled={submitted || !complete}
          onClick={() => {
            setSubmitted(true);
            onResult(result(correct, response.join(" "), startedAt.current));
          }}
          className="rounded-xl bg-primary p-3 font-extrabold text-primary-foreground disabled:opacity-40"
        >
          {tr("checkAnswer")}
        </button>
      </div>
      {submitted && <Feedback correct={correct} answer={answer.join(" ")} />}
    </div>
  );
}

function WritingActivity({
  character,
  strokes,
  onResult,
}: {
  character: string;
  strokes: string[];
  onResult: (result: ActivityResult) => void;
}) {
  const { tr } = useLocale();
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const startedAt = useRef(Date.now());
  const correct = value.trim() === character;
  return (
    <div className="w-full max-w-sm rounded-3xl border border-border/50 bg-card p-6 text-center shadow-xl">
      <p className="mb-2 text-xs font-extrabold uppercase tracking-widest text-muted-foreground">
        {tr("writeCharacter")}
      </p>
      <p className="khmer mb-4 text-8xl font-bold text-primary">{character}</p>
      <input
        value={value}
        disabled={submitted}
        onChange={(event) => setValue(event.target.value)}
        placeholder={tr("typeKhmerCharacter")}
        className="w-full rounded-xl border border-border bg-background p-3 text-center text-xl"
        aria-label={tr("typeKhmerCharacter")}
      />
      <p className="mt-3 text-xs text-muted-foreground">Stroke order: {strokes.join(" → ")}</p>
      <button
        type="button"
        disabled={submitted || value.trim().length === 0}
        onClick={() => {
          setSubmitted(true);
          onResult(result(correct, value.trim(), startedAt.current));
        }}
        className="mt-5 w-full rounded-xl bg-primary p-3 font-extrabold text-primary-foreground disabled:opacity-40"
      >
        {tr("checkAnswer")}
      </button>
      {submitted && <Feedback correct={correct} answer={character} />}
    </div>
  );
}

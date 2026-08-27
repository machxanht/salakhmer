import { useAuth } from "@/hooks/useAuth";

const PLAYBACK_RATES = [0.6, 1, 1.25] as const;

export function AudioSpeedSettings({ compact = false }: { compact?: boolean }) {
  const { updateUser, user } = useAuth();
  const selectedRate = user.audioSettings.playbackRate;

  if (compact) {
    return (
      <div className="flex items-center justify-center gap-2" role="group" aria-label="Audio speed">
        <span className="text-xs font-bold text-muted-foreground">Speed</span>
        {PLAYBACK_RATES.map((rate) => (
          <button
            key={rate}
            type="button"
            aria-pressed={selectedRate === rate}
            onClick={() =>
              void updateUser({ audioSettings: { ...user.audioSettings, playbackRate: rate } })
            }
            className={`rounded-lg px-2.5 py-1.5 text-xs font-extrabold transition-colors ${
              selectedRate === rate
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-foreground hover:bg-secondary/80"
            }`}
          >
            {rate}×
          </button>
        ))}
      </div>
    );
  }

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-muted-foreground">
        Audio speed
      </p>
      <h3 className="mt-1 text-lg font-extrabold">Listening speed</h3>
      <p className="mt-1 text-sm text-muted-foreground">This applies to every Khmer audio clip.</p>
      <div className="mt-4 grid grid-cols-3 gap-2" role="group" aria-label="Audio speed">
        {PLAYBACK_RATES.map((rate) => (
          <button
            key={rate}
            type="button"
            aria-pressed={selectedRate === rate}
            onClick={() =>
              void updateUser({ audioSettings: { ...user.audioSettings, playbackRate: rate } })
            }
            className={`rounded-xl px-3 py-3 text-sm font-extrabold transition-colors ${
              selectedRate === rate
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-foreground hover:bg-secondary/80"
            }`}
          >
            {rate}×
          </button>
        ))}
      </div>
    </section>
  );
}

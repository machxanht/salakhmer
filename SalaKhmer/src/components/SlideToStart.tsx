import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronsRight } from "lucide-react";

export function SlideToStart({
  onComplete,
  label = "SLIDE TO START",
}: {
  onComplete: () => void;
  label?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [done, setDone] = useState(false);

  const maxX = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    return track.clientWidth - 64 - 8;
  }, []);

  useEffect(() => {
    if (!dragging) return;

    const move = (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const next = Math.min(Math.max(clientX - rect.left - 36, 0), maxX());
      setX(next);
    };

    const onPointerMove = (e: PointerEvent) => move(e.clientX);
    const onPointerUp = () => {
      setDragging(false);
      if (x >= maxX() - 6) {
        setDone(true);
        setX(maxX());
        setTimeout(onComplete, 320);
      } else {
        setX(0);
      }
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [dragging, x, maxX, onComplete]);

  const progress = maxX() > 0 ? x / maxX() : 0;

  return (
    <div
      ref={trackRef}
      className="relative h-[72px] w-full select-none overflow-hidden rounded-full border border-border bg-card p-1 shadow-[0_4px_0_0_var(--color-border)]"
    >
      <div
        className="absolute inset-y-1 left-1 rounded-full bg-primary/25 transition-[width]"
        style={{ width: x + 64 }}
      />
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <span
          className="text-xs font-extrabold tracking-[0.28em] text-muted-foreground"
          style={{ opacity: 1 - progress * 1.4 }}
        >
          {label}
        </span>
        <span
          className="shimmer-hint absolute h-full w-24 bg-gradient-to-r from-transparent via-primary/25 to-transparent"
          style={{ opacity: 1 - progress * 2 }}
        />
      </div>
      <button
        type="button"
        aria-label={label}
        onPointerDown={(e) => {
          e.currentTarget.releasePointerCapture?.(e.pointerId);
          setDragging(true);
        }}
        onClick={() => {
          if (!dragging && !done) {
            setDone(true);
            setX(maxX());
            setTimeout(onComplete, 320);
          }
        }}
        className={`absolute top-1 grid h-16 w-16 touch-none place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_3px_0_0_var(--color-gold)] ${
          dragging ? "" : "transition-transform duration-300"
        } ${done ? "scale-95" : ""}`}
        style={{ transform: `translateX(${x}px)` }}
      >
        <ChevronsRight className="h-7 w-7" strokeWidth={2.6} />
      </button>
    </div>
  );
}

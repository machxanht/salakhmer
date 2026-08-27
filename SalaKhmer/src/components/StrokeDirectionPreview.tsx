import { useEffect, useId, useState } from "react";
import { KHMER_STROKE_REFERENCE, validateStrokeModel } from "@/lib/khmer-stroke-order";

/**
 * A reusable SVG direction renderer. It uses the path data as the source of
 * truth: marker-end follows the final tangent and the dash animation travels
 * from each M (pen down) to its final point (pen up).
 */
export function StrokeDirectionPreview() {
  const [running, setRunning] = useState(true);
  const markerId = useId().replace(/:/g, "");
  const valid = validateStrokeModel(KHMER_STROKE_REFERENCE);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setRunning(false), 4000);
    return () => window.clearInterval(timer);
  }, [running]);

  if (!valid) return null;

  return (
    <div className="rounded-2xl border border-[#E7C982] bg-[#FFFCF5] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.12em] text-[#A9631E]">
            Stroke direction preview
          </p>
          <p className="mt-1 text-sm text-[#6F5A48]">
            The orange line moves from pen-down to pen-up. This is a verified basic-stroke
            reference, not a letter lesson.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setRunning(true)}
          className="shrink-0 rounded-full bg-[#F6A800] px-3 py-2 text-xs font-extrabold text-[#4A2A0B]"
        >
          Replay
        </button>
      </div>

      <svg
        viewBox={KHMER_STROKE_REFERENCE.viewBox}
        className="mt-3 w-full"
        role="img"
        aria-label="Stroke direction example"
      >
        <defs>
          <marker
            id={markerId}
            markerWidth="8"
            markerHeight="8"
            refX="6.5"
            refY="3.5"
            orient="auto-start-reverse"
            markerUnits="strokeWidth"
          >
            <path d="M 0 0 L 7 3.5 L 0 7 z" fill="#DE8500" />
          </marker>
        </defs>
        {KHMER_STROKE_REFERENCE.strokes.map((stroke) => (
          <g key={stroke.order}>
            <path
              d={stroke.path}
              fill="none"
              stroke="#4A3021"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity=".18"
            />
            <circle
              cx={stroke.start.x}
              cy={stroke.start.y}
              r="7"
              fill="#F6A800"
              stroke="#8C5200"
              strokeWidth="2"
            />
            <text
              x={stroke.orderLabel.x}
              y={stroke.orderLabel.y}
              fill="#8C5200"
              fontSize="18"
              fontWeight="700"
            >
              {stroke.order}
            </text>
            <path
              d={stroke.path}
              fill="none"
              stroke="#DE8500"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              markerEnd={`url(#${markerId})`}
              pathLength="100"
              className={running ? "animate-stroke-direction" : ""}
            />
          </g>
        ))}
      </svg>
      <style>{`@keyframes strokeDirection { from { stroke-dasharray: 100; stroke-dashoffset: 100; } to { stroke-dasharray: 100; stroke-dashoffset: 0; } } .animate-stroke-direction { animation: strokeDirection 1.15s ease-out both; } .animate-stroke-direction:nth-of-type(2) { animation-delay: 1.2s; }`}</style>
    </div>
  );
}

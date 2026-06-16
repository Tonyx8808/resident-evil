"use client";

type Props = {
  corner: "tl" | "tr" | "bl" | "br";
  size?: number;
  className?: string;
};

export function HudFrame({ corner, size = 26, className = "" }: Props) {
  const s = size;
  const arm = Math.round(s * 0.55);

  const paths: Record<Props["corner"], string> = {
    tl: `M 2 ${arm} L 2 2 L ${arm} 2`,
    tr: `M ${s - arm} 2 L ${s} 2 L ${s} ${arm}`,
    bl: `M 2 ${s - arm} L 2 ${s} L ${arm} ${s}`,
    br: `M ${s - arm} ${s} L ${s} ${s} L ${s} ${s - arm}`,
  };

  /* Tick marks at the elbow */
  const tickPaths: Record<Props["corner"], string> = {
    tl: `M 2 ${arm + 4} L 6 ${arm + 4}`,
    tr: `M ${s - 6} ${arm + 4} L ${s} ${arm + 4}`,
    bl: `M 2 ${s - arm - 4} L 6 ${s - arm - 4}`,
    br: `M ${s - 6} ${s - arm - 4} L ${s} ${s - arm - 4}`,
  };

  return (
    <svg
      aria-hidden="true"
      width={s}
      height={s}
      viewBox={`0 0 ${s} ${s}`}
      fill="none"
      className={className}
    >
      {/* Chrome main bracket */}
      <path
        d={paths[corner]}
        stroke="url(#chromeBracket)"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      {/* Tick mark */}
      <path
        d={tickPaths[corner]}
        stroke="rgba(200,0,0,0.7)"
        strokeWidth="1"
        strokeLinecap="square"
      />
      <defs>
        <linearGradient id="chromeBracket" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e0e0e0" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#888" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#c0c0c0" stopOpacity="0.85" />
        </linearGradient>
      </defs>
    </svg>
  );
}

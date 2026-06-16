"use client";

/**
 * BloodDrip – decorative SVG drip element.
 * Place at the bottom of a section with `relative overflow-visible`.
 */
export function BloodDrip({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute bottom-0 left-0 w-full ${className}`}
      style={{ height: "80px" }}
    >
      {/* Base fill */}
      <rect x="0" y="0" width="1440" height="4" fill="rgba(139,0,0,0.85)" />

      {/* Drips */}
      {[
        { x: 80,  h: 48, w: 8 },
        { x: 200, h: 30, w: 6 },
        { x: 380, h: 62, w: 10 },
        { x: 510, h: 22, w: 5 },
        { x: 680, h: 55, w: 9 },
        { x: 820, h: 36, w: 7 },
        { x: 960, h: 70, w: 11 },
        { x: 1100,h: 28, w: 6 },
        { x: 1250,h: 45, w: 8 },
        { x: 1380,h: 18, w: 5 },
      ].map(({ x, h, w }, i) => (
        <g key={i}>
          {/* Drip body */}
          <path
            d={`M${x - w / 2} 0 Q${x - w / 2 - 1} ${h * 0.6} ${x} ${h} Q${x + w / 2 + 1} ${h * 0.6} ${x + w / 2} 0`}
            fill={`rgba(${160 + i * 3}, 0, 0, 0.9)`}
          />
          {/* Teardrop blob at base */}
          <ellipse
            cx={x}
            cy={h + w * 0.8}
            rx={w * 0.75}
            ry={w * 0.55}
            fill={`rgba(140, 0, 0, 0.85)`}
          />
        </g>
      ))}
    </svg>
  );
}

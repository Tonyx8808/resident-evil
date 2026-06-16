"use client";

type Props = { children: React.ReactNode; className?: string };

export function EyebrowBadge({ children, className = "" }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-2 border border-red-900/60 bg-red-950/20 px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-red-500 backdrop-blur-md ${className}`}
      style={{
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.04), 0 0 24px -8px rgba(180,0,0,0.5)",
        clipPath:
          "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
      }}
    >
      <span
        className="inline-block h-1.5 w-1.5 bg-red-500"
        style={{ boxShadow: "0 0 8px rgba(200,0,0,0.9)" }}
      />
      {children}
    </span>
  );
}

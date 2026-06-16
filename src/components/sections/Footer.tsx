"use client";

import { UmbrellaLogo } from "@/components/ui/UmbrellaLogo";

const divisions = [
  ["T-Virus Division", "Arklay Mansion · 1998"],
  ["G-Virus Research", "Raccoon City · 1998"],
  ["Nemesis Programme", "Raccoon City · 1998"],
  ["Uroboros Project", "Kijuju · 2009"],
  ["G-Birkin Studies", "NEST Lab · 1998"],
  ["Tyrant Series", "Umbrella HQ · 2003"],
] as const;

export function Footer() {
  return (
    <footer
      id="footer"
      className="relative px-6 py-14 md:px-10 md:py-16"
      style={{
        borderTop: "1px solid rgba(139,0,0,0.35)",
        background:
          "linear-gradient(180deg, #0c0c0c 0%, #080808 40%, #050505 100%)",
        boxShadow: "inset 0 1px 0 rgba(139,0,0,0.2)",
      }}
    >
      {/* Chrome top edge */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(180,180,180,0.15) 30%, rgba(220,220,220,0.25) 50%, rgba(180,180,180,0.15) 70%, transparent)",
        }}
      />

      <div className="mx-auto flex max-w-[1400px] flex-col gap-12">

        {/* Top row */}
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">

          {/* Brand */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <UmbrellaLogo size={42} glowIntensity="mid" />
              <div className="flex flex-col leading-none">
                <span
                  className="font-display text-[13px] font-bold uppercase tracking-[0.28em] text-zinc-200"
                  style={{ textShadow: "0 1px 0 rgba(255,255,255,0.1)" }}
                >
                  Umbrella Corporation
                </span>
                <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-red-900">
                  Obedience · Sacrifice · Loyalty
                </span>
              </div>
            </div>
            <p className="max-w-[36ch] font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-zinc-600">
              © Umbrella Corporation — Raccoon City, USA. Registered trademark
              of the Office of Oswell E. Spencer &amp; Albert Wesker.
              All specimens are property of Umbrella Corp.
            </p>
          </div>

          {/* Divisions nav */}
          <nav className="grid grid-cols-2 gap-x-10 gap-y-4 md:grid-cols-3">
            {divisions.map(([name, note]) => (
              <a
                key={name}
                href="#"
                className="group flex flex-col gap-1"
              >
                <span className="font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-300 transition-colors duration-150 group-hover:text-red-500">
                  {name}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-700">
                  {note}
                </span>
              </a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(139,0,0,0.4) 20%, rgba(80,80,80,0.2) 50%, rgba(139,0,0,0.4) 80%, transparent)",
          }}
        />

        {/* Bottom row */}
        <div className="flex flex-col gap-3 font-mono text-[9px] uppercase tracking-[0.26em] text-zinc-700 md:flex-row md:items-center md:justify-between">
          <span>
            Build 1998.09.28 &nbsp;·&nbsp; Biohazard Level IV &nbsp;·&nbsp;
            Director Wesker — Online
          </span>
          <span
            className="text-red-900"
            style={{ textShadow: "0 0 8px rgba(139,0,0,0.4)" }}
          >
            Classified document — no commercial use
          </span>
        </div>
      </div>

      {/* Blood pool at very bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-1"
        style={{
          background:
            "linear-gradient(90deg, transparent, #8b0000 15%, #6b0000 50%, #8b0000 85%, transparent)",
          boxShadow: "0 0 20px 2px rgba(139,0,0,0.5)",
        }}
      />
    </footer>
  );
}

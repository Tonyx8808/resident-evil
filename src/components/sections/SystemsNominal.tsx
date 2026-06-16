"use client";

import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { BloodDrip } from "@/components/ui/BloodDrip";

const telemetry = [
  {
    label: "T-Virus Mutagenic Rate",
    value: "99.8%",
    note: "G-Virus recombinant hybrid",
  },
  {
    label: "Subject Reanimation",
    value: "4.2 hrs",
    note: "Ambient temp 18°C optimal",
  },
  {
    label: "Licker Combat Rating",
    value: "Class VII",
    note: "Neural parasite bonded",
  },
  {
    label: "Tyrant Threat Index",
    value: "∞",
    note: "Nemesis-T type — uncontained",
  },
];

export function SystemsNominal() {
  return (
    <section
      id="systems"
      className="relative overflow-visible px-6 pb-40 pt-28 md:px-10 md:pb-56 md:pt-36"
      style={{
        borderTop: "1px solid rgba(139,0,0,0.25)",
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(60,0,0,0.18) 0%, #080808 60%)",
      }}
    >
      {/* Scanline texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 3px)",
        }}
      />

      <div className="relative mx-auto flex max-w-[1400px] flex-col gap-16 md:grid md:grid-cols-[5fr_4fr] md:gap-24">

        {/* Left column */}
        <AnimatedSection className="flex flex-col gap-8">
          <AnimatedItem>
            <EyebrowBadge>WESKER // SYSTEMS NOMINAL</EyebrowBadge>
          </AnimatedItem>

          <AnimatedItem>
            <h2
              className="max-w-[18ch] font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-zinc-100 md:text-6xl"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.9)" }}
            >
              &ldquo;I will not allow
              this world to
              <span
                className="text-red-600"
                style={{ textShadow: "0 0 32px rgba(200,0,0,0.45)" }}
              >
                {" "}continue.&rdquo;
              </span>
            </h2>
          </AnimatedItem>

          <AnimatedItem>
            <p className="max-w-[46ch] font-mono text-[12px] uppercase leading-relaxed tracking-[0.16em] text-zinc-500">
              The Uroboros virus has entered Phase III deployment. All remaining
              S.T.A.R.S. operatives are neutralised. Arklay Research confirms
              Tyrant production at full capacity — Director Wesker's new world
              order is no longer a projection.
            </p>
          </AnimatedItem>

          <AnimatedItem>
            <a
              href="#footer"
              className="group inline-flex items-center gap-2 self-start font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-200 transition-all duration-200"
              style={{
                background: "linear-gradient(180deg, #2a0000 0%, #160000 100%)",
                border: "1px solid rgba(139,0,0,0.55)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.05), 0 0 20px -6px rgba(200,0,0,0.4)",
                padding: "12px 24px",
                clipPath:
                  "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
              }}
            >
              Access Incident Archive
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
          </AnimatedItem>
        </AnimatedSection>

        {/* Right column — telemetry rows */}
        <AnimatedSection className="flex flex-col md:mt-3">
          {/* Chrome header bar */}
          <div
            className="mb-0 flex items-center gap-3 px-0 py-2"
            style={{
              borderBottom: "1px solid rgba(139,0,0,0.4)",
              borderTop: "1px solid rgba(80,80,80,0.25)",
            }}
          >
            <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-zinc-600">
              Live Readout
            </span>
            <span
              className="ml-auto inline-block h-1.5 w-1.5 bg-red-600"
              style={{ boxShadow: "0 0 6px rgba(200,0,0,0.9)" }}
            />
          </div>

          {telemetry.map((row, i) => (
            <AnimatedItem key={row.label}>
              <div
                className="flex items-baseline justify-between gap-6 py-5"
                style={{
                  borderBottom:
                    i < telemetry.length - 1
                      ? "1px solid rgba(255,255,255,0.05)"
                      : "none",
                }}
              >
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-zinc-600">
                    {row.label}
                  </span>
                  <span className="font-mono text-[11px] text-zinc-500">
                    {row.note}
                  </span>
                </div>
                <span
                  className="font-display text-2xl font-bold uppercase tracking-tight text-zinc-100 md:text-3xl"
                  style={{ textShadow: "0 0 20px rgba(255,255,255,0.08)" }}
                >
                  {row.value}
                </span>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </div>

   {/* Hazard bar */}
<div
  className="absolute bottom-0 left-0 right-0 h-[6px]"
  style={{
    background:
      "repeating-linear-gradient(45deg, #8b0000 0 10px, #000 10px 20px)",
    opacity: 0.35,
  }}
/>
</section>

  );
}

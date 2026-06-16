"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { UmbrellaLogo } from "@/components/ui/UmbrellaLogo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-red-900/60 backdrop-blur-2xl"
          : "border-b border-transparent"
      }`}
      style={
        scrolled
          ? {
              background:
                "linear-gradient(180deg, rgba(15,15,15,0.95) 0%, rgba(8,8,8,0.9) 100%)",
              boxShadow: "0 1px 0 rgba(139,0,0,0.4), 0 4px 24px rgba(0,0,0,0.7)",
            }
          : {}
      }
    >
      {/* Chrome top highlight line */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(200,200,200,0.3) 30%, rgba(255,255,255,0.5) 50%, rgba(200,200,200,0.3) 70%, transparent)",
        }}
      />

      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-8 md:py-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <UmbrellaLogo size={34} glowIntensity="mid" />
          <div className="flex flex-col leading-none">
            <span
              className="font-display text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-200"
              style={{ textShadow: "0 1px 0 rgba(255,255,255,0.15)" }}
            >
              Umbrella Corp.
            </span>
            <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-red-800">
              Est. 1968 · Raccoon City
            </span>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="hidden items-center gap-8 md:flex">
          {[
            ["Research", "#research"],
            ["Facilities", "#facilities"],
            ["Security", "#security"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-400 transition-colors duration-200 hover:text-zinc-100"
              style={{ textShadow: "none" }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#systems"
          className="group relative inline-flex items-center gap-2 overflow-hidden px-5 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-200 transition-all duration-200"
          style={{
            background:
              "linear-gradient(180deg, #2a0000 0%, #1a0000 100%)",
            border: "1px solid rgba(139,0,0,0.6)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.06), 0 0 20px -6px rgba(200,0,0,0.4)",
            clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
          }}
        >
          {/* Hover chrome shimmer */}
          <span
            className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)",
            }}
          />
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 bg-red-600"
            style={{ boxShadow: "0 0 6px rgba(200,0,0,0.9)" }}
          />
          Engage
        </a>
      </div>

      {/* Blood-red glow bottom line */}
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background: scrolled
            ? "linear-gradient(90deg, transparent, #8b0000 20%, #cc0000 50%, #8b0000 80%, transparent)"
            : "transparent",
          boxShadow: scrolled ? "0 0 12px 2px rgba(180,0,0,0.45)" : "none",
          transition: "all 0.3s ease",
        }}
      />
    </header>
  );
}

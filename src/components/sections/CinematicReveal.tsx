"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { HudFrame } from "@/components/ui/HudFrame";
import { DIALOGUES, FRAME_COUNT, framePath } from "@/lib/cinematic";

export function CinematicReveal() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const h2PrologueRef = useRef<HTMLHeadingElement | null>(null);
  const h2WeskerRef = useRef<HTMLHeadingElement | null>(null);
  const outroRef = useRef<HTMLDivElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const seqReadoutRef = useRef<HTMLSpanElement | null>(null);

  const framesRef = useRef<HTMLImageElement[]>([]);
  const tickingRef = useRef(false);
  const loadedRef = useRef(false);
  const lastFrameRef = useRef(-1);
  const prevVisibleIdsRef = useRef("");

  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [visibleDialogues, setVisibleDialogues] = useState<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i);
      img.onload = () => {
        if (cancelled) return;
        loadedCount++;
        setLoadProgress(loadedCount / FRAME_COUNT);
        if (loadedCount === FRAME_COUNT) {
          loadedRef.current = true;
          setLoaded(true);
        }
      };
      img.onerror = () => {
        if (cancelled) return;
        loadedCount++;
        setLoadProgress(loadedCount / FRAME_COUNT);
        if (loadedCount === FRAME_COUNT) {
          loadedRef.current = true;
          setLoaded(true);
        }
      };
      imgs.push(img);
    }
    framesRef.current = imgs;

    return () => { cancelled = true; };
  }, []);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = framesRef.current[index];
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;

    let drawW: number, drawH: number;
    if (canvasRatio > imgRatio) {
      drawW = cw;
      drawH = cw / imgRatio;
    } else {
      drawH = ch;
      drawW = ch * imgRatio;
    }

    if (window.innerWidth <= 768) {
      drawW *= 1.3;
      drawH *= 1.3;
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - drawW) / 2, (ch - drawH) / 2, drawW, drawH);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    drawFrame(lastFrameRef.current >= 0 ? lastFrameRef.current : 0);
  }, [drawFrame]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  useEffect(() => {
    if (!loaded) return;
    drawFrame(0);
    lastFrameRef.current = 0;
  }, [loaded, drawFrame]);

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        tickingRef.current = false;
        const section = sectionRef.current;
        if (!section || !loadedRef.current) return;

        const rect = section.getBoundingClientRect();
        const scrollable = section.offsetHeight - window.innerHeight;
        const progress =
          scrollable <= 0
            ? 0
            : Math.min(1, Math.max(0, -rect.top / scrollable));

        const frameIndex = Math.min(
          FRAME_COUNT - 1,
          Math.floor(progress * FRAME_COUNT),
        );
        if (frameIndex !== lastFrameRef.current) {
          lastFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }

        if (h2PrologueRef.current) {
          const op = Math.min(1, Math.max(0, (0.52 - progress) / 0.1));
          h2PrologueRef.current.style.opacity = String(op);
        }

        if (h2WeskerRef.current) {
          const op = Math.min(1, Math.max(0, (progress - 0.48) / 0.1));
          h2WeskerRef.current.style.opacity = String(op);
        }

        if (outroRef.current) {
          const op = Math.min(1, Math.max(0, (progress - 0.86) / 0.06));
          outroRef.current.style.opacity = String(op);
          outroRef.current.style.transform = `translateY(${(1 - op) * 14}px)`;
        }

        if (progressFillRef.current) {
          progressFillRef.current.style.transform = `scaleX(${progress})`;
        }

        if (seqReadoutRef.current) {
          const n = Math.min(FRAME_COUNT, frameIndex + 1);
          seqReadoutRef.current.textContent =
            `SEQ ${String(n).padStart(3, "0")} / ${FRAME_COUNT}`;
        }

        const newVisible = new Set<string>();
        for (const d of DIALOGUES) {
          if (progress >= d.show && progress <= d.hide) newVisible.add(d.id);
        }
        const newIds = [...newVisible].sort().join(",");
        if (newIds !== prevVisibleIdsRef.current) {
          prevVisibleIdsRef.current = newIds;
          setVisibleDialogues(newVisible);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [drawFrame]);

  return (
    <section
      ref={sectionRef}
      id="cinematic"
      className="scroll-animation relative"
      style={{
        borderTop: "1px solid rgba(139,0,0,0.2)",
        background: "#080808",
        height: "600dvh",
      }}
    >
      <div
        className="sticky top-0 min-h-[100dvh] w-full overflow-hidden"
        style={{
          height: "100dvh",
          background: "#080808",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ willChange: "contents", transform: "translateZ(0)" }}
        />

        {/* Cinematic vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 90%, transparent 30%, rgba(8,8,8,0.5) 70%, rgba(8,8,8,0.9) 100%)",
          }}
        />

        {/* Red fog bottom */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0"
          style={{
            height: "40%",
            background:
              "linear-gradient(to top, rgba(30,0,0,0.7) 0%, transparent 100%)",
          }}
        />

        {/* HUD Corners */}
        <div className="pointer-events-none absolute left-6 top-24 text-zinc-300 md:left-10 md:top-28">
          <HudFrame corner="tl" size={28} />
        </div>
        <div className="pointer-events-none absolute right-6 top-24 text-zinc-300 md:right-10 md:top-28">
          <HudFrame corner="tr" size={28} />
        </div>
        <div className="pointer-events-none absolute bottom-14 left-6 text-zinc-300 md:bottom-16 md:left-10">
          <HudFrame corner="bl" size={28} />
        </div>
        <div className="pointer-events-none absolute bottom-14 right-6 text-zinc-300 md:bottom-16 md:right-10">
          <HudFrame corner="br" size={28} />
        </div>

        {/* Crossfade headline right */}
        <div className="pointer-events-none absolute right-6 top-28 z-10 flex max-w-[44ch] flex-col items-end gap-5 text-right md:right-12 md:top-32">
          <EyebrowBadge>RACCOON CITY // FINAL TRANSMISSION</EyebrowBadge>
          <div className="relative self-stretch">
            <h2
              ref={h2PrologueRef}
              className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-zinc-100 md:text-6xl lg:text-7xl"
              style={{
                textShadow: "0 2px 24px rgba(0,0,0,0.95)",
                transition: "opacity 240ms ease-out",
              }}
            >
              The Chosen
              <br />
              <span
                className="text-red-600"
                style={{ textShadow: "0 0 40px rgba(200,0,0,0.5)" }}
              >
                Will Survive.
              </span>
            </h2>
            <h2
              ref={h2WeskerRef}
              className="absolute inset-0 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-zinc-100 md:text-6xl lg:text-7xl"
              style={{
                opacity: 0,
                textShadow: "0 2px 24px rgba(0,0,0,0.95)",
                transition: "opacity 240ms ease-out",
              }}
            >
              I Am
              <br />
              <span
                className="text-red-600"
                style={{ textShadow: "0 0 40px rgba(200,0,0,0.5)" }}
              >
                The Virus.
              </span>
            </h2>
          </div>
          <p className="max-w-[40ch] font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-zinc-500">
            Kijuju incident — final frame recovered. Wesker held the last
            transmission so we could rebuild from the ashes.
          </p>
        </div>

        {/* Top left label */}
        <div className="pointer-events-none absolute left-6 top-20 z-10 flex items-center gap-2 md:left-10 md:top-24">
          <div className="h-px w-8" style={{ background: "rgba(139,0,0,0.8)" }} />
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-zinc-600">
            Incident Archive — Classified
          </span>
        </div>

        {/* Top right sequence */}
        <div className="pointer-events-none absolute right-6 top-20 z-10 flex items-center gap-3 md:right-10 md:top-24">
          <span
            ref={seqReadoutRef}
            className="font-mono text-[10px] uppercase tracking-[0.28em] text-red-600"
          >
            SEQ 001 / {FRAME_COUNT}
          </span>
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 bg-red-600"
            style={{ boxShadow: "0 0 8px rgba(200,0,0,0.85)" }}
          />
        </div>

        {/* Progress bar */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
          <div className="mx-6 mb-3 h-px bg-white/8 md:mx-10">
            <div
              ref={progressFillRef}
              className="h-full origin-left"
              style={{
                transform: "scaleX(0)",
                transition: "transform 80ms linear",
                background: "linear-gradient(90deg, #8b0000, #dd0000)",
                boxShadow: "0 0 10px 2px rgba(180,0,0,0.6)",
              }}
            />
          </div>
          <div className="mx-6 flex items-center justify-between pb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-600 md:mx-10">
            <span>BIOHAZARD // ARCHIVE</span>
            <span>NEMESIS // PLAYBACK</span>
            <span>Scroll ↓</span>
          </div>
        </div>

        {/* Dialogue cards — desktop */}
        {DIALOGUES.map((d: import("@/lib/cinematic").Dialogue, i: number) => {
          const visible = visibleDialogues.has(d.id);
          const position =
            i === 0
              ? "top-[24%] left-6 md:left-12"
              : i === 1
              ? "top-1/2 -translate-y-1/2 left-6 md:left-12"
              : "bottom-24 left-6 md:bottom-28 md:left-12";
          return (
            <div
              key={d.id}
              className={`pointer-events-none absolute ${position} z-20 hidden w-[400px] max-w-[88vw] md:block`}
            >
              <figure
                className={`pointer-events-auto transition-all duration-500 ease-out ${
                  visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                }`}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(8,8,8,0.97) 0%, rgba(18,3,3,0.95) 100%)",
                  border: "1px solid rgba(139,0,0,0.4)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.04), 0 0 40px -10px rgba(180,0,0,0.4), 0 12px 48px rgba(0,0,0,0.75)",
                  padding: "1.25rem 1.5rem",
                }}
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-red-600">
                  {d.code}
                </span>
                <blockquote
                  className="mt-3 font-display text-lg font-medium uppercase leading-snug tracking-tight text-zinc-100"
                  style={{ textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}
                >
                  &ldquo;{d.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-zinc-300">
                    {d.speaker}
                  </span>
                  <span
                    className="font-mono text-[9px] uppercase tracking-[0.2em] text-red-700"
                    style={{
                      background: "rgba(139,0,0,0.15)",
                      border: "1px solid rgba(139,0,0,0.3)",
                      padding: "2px 8px",
                    }}
                  >
                    {d.classification}
                  </span>
                </figcaption>
              </figure>
            </div>
          );
        })}

        {/* Dialogue cards — mobile */}
        <div className="pointer-events-none absolute inset-x-0 top-[36%] z-20 flex flex-col gap-3 px-6 md:hidden">
          {DIALOGUES.map((d: import("@/lib/cinematic").Dialogue) => {
            const visible = visibleDialogues.has(d.id);
            return (
              <figure
                key={d.id}
                className={`pointer-events-auto transition-all duration-400 ease-out ${
                  visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{
                  background: "rgba(10,10,10,0.96)",
                  border: "1px solid rgba(139,0,0,0.35)",
                  padding: "1rem 1.25rem",
                }}
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-red-600">
                  {d.code}
                </span>
                <blockquote className="mt-2 font-display text-sm font-medium uppercase leading-snug text-zinc-100">
                  &ldquo;{d.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-zinc-300">{d.speaker}</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-red-700">
                    {d.classification}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>

     {/* Outro CTA */}
<div
  ref={outroRef}
  className="pointer-events-none absolute bottom-24 right-6 z-10 flex flex-col items-end gap-4 md:bottom-32 md:right-12"
  style={{ opacity: 0, transition: "opacity 80ms linear" }}
>
  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-red-600">
    Next — engage directive
  </span>

  <a
    href="#systems"
    className="pointer-events-auto inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-200 transition-all duration-200"
    style={{
      background: "linear-gradient(180deg, #2a0000 0%, #1a0000 100%)",
      border: "1px solid rgba(139,0,0,0.55)",
      boxShadow: "0 0 20px -6px rgba(200,0,0,0.45)",
      padding: "10px 20px",
      clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
    }}
  >
    Access Systems <span aria-hidden>↓</span>
  </a>
</div>


        {/* Loading */}
        {!loaded && (
          <div
            className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-5 px-6"
            style={{ background: "#080808" }}
          >
            <EyebrowBadge>BIOHAZARD ARCHIVE // RESTORING</EyebrowBadge>
            <div className="h-px w-60 bg-white/8 md:w-80">
              <div
                className="h-full transition-[width] duration-150 ease-out"
                style={{
                  width: `${Math.round(loadProgress * 100)}%`,
                  background: "linear-gradient(90deg, #8b0000, #cc0000)",
                  boxShadow: "0 0 8px rgba(180,0,0,0.7)",
                }}
              />
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-600">
              Rendering Incident Sequence &nbsp;·&nbsp; {Math.round(loadProgress * 100)}%
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
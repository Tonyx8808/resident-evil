"use client";

import Image from "next/image";

type Props = {
  size?: number;
  className?: string;
  glowIntensity?: "low" | "mid" | "high";
};

export function UmbrellaLogo({
  size = 40,
  className = "",
  glowIntensity = "mid",
}: Props) {
  const glowMap = {
    low: "drop-shadow(0 0 4px rgba(200,0,0,0.4))",
    mid: "drop-shadow(0 0 10px rgba(220,0,0,0.65)) drop-shadow(0 2px 6px rgba(0,0,0,0.8))",
    high: "drop-shadow(0 0 24px rgba(255,0,0,0.8)) drop-shadow(0 0 60px rgba(200,0,0,0.4))",
  };

  return (
    <Image
      src="/logo.png"
      alt="Umbrella Corporation"
      width={size}
      height={size}
      className={className + " select-none pointer-events-none"}
      style={{ filter: glowMap[glowIntensity] }}
    />
  );
}

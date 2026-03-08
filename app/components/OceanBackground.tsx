"use client";

import { useEffect, useState } from "react";

interface Bubble {
  id: number;
  left: number;
  bottom: number;
  size: number;
  duration: number;
  delay: number;
}

interface Caustic {
  id: number;
  left: number;
  top: number;
  width: number;
  height: number;
  duration: number;
}

// Wave SVG paths — 2× width for seamless translateX(-50%) loop
const WAVE_BACK =
  "M0,45 Q180,15 360,45 Q540,75 720,45 Q900,15 1080,45 Q1260,75 1440,45 Q1620,15 1800,45 Q1980,75 2160,45 Q2340,15 2520,45 Q2700,75 2880,45 L2880,120 L0,120 Z";

const WAVE_MID =
  "M0,50 Q120,20 240,50 Q360,80 480,50 Q600,20 720,50 Q840,80 960,50 Q1080,20 1200,50 Q1320,80 1440,50 Q1560,20 1680,50 Q1800,80 1920,50 Q2040,20 2160,50 Q2280,80 2400,50 Q2520,20 2640,50 Q2760,80 2880,50 L2880,120 L0,120 Z";

const WAVE_FRONT =
  "M0,55 Q90,25 180,55 Q270,85 360,55 Q450,25 540,55 Q630,85 720,55 Q810,25 900,55 Q990,85 1080,55 Q1170,25 1260,55 Q1350,85 1440,55 Q1530,25 1620,55 Q1710,85 1800,55 Q1890,25 1980,55 Q2070,85 2160,55 Q2250,25 2340,55 Q2430,85 2520,55 Q2610,25 2700,55 Q2790,85 2880,55 L2880,100 L0,100 Z";

const WAVE_FOAM =
  "M0,60 Q60,45 120,60 Q180,75 240,60 Q300,45 360,60 Q420,75 480,60 Q540,45 600,60 Q660,75 720,60 Q780,45 840,60 Q900,75 960,60 Q1020,45 1080,60 Q1140,75 1200,60 Q1260,45 1320,60 Q1380,75 1440,60 Q1500,45 1560,60 Q1620,75 1680,60 Q1740,45 1800,60 Q1860,75 1920,60 Q1980,45 2040,60 Q2100,75 2160,60 Q2220,45 2280,60 Q2340,75 2400,60 Q2460,45 2520,60 Q2580,75 2640,60 Q2700,45 2760,60 Q2820,75 2880,60 L2880,80 L0,80 Z";

export default function OceanBackground() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [caustics, setCaustics] = useState<Caustic[]>([]);

  useEffect(() => {
    const b: Bubble[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: (i * 37 + 7) % 100,
      bottom: (i * 23 + 5) % 35,
      size: (i % 4) * 6 + 6,
      duration: (i % 5) + 4,
      delay: (i * 0.7) % 5,
    }));
    setBubbles(b);

    const c: Caustic[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: (i * 29 + 10) % 90,
      top: (i * 17 + 15) % 60,
      width: (i % 3) * 120 + 80,
      height: (i % 3) * 60 + 40,
      duration: (i % 4) + 6,
    }));
    setCaustics(c);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a3a5c] via-[#0e3460] to-[#081c3a]" />

      {/* Sunset horizon glow */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#c0392b]/20 via-[#ff7043]/10 to-transparent" />

      {/* Stars */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: i % 5 === 0 ? 2 : 1,
            height: i % 5 === 0 ? 2 : 1,
            left: `${(i * 37 + 11) % 100}%`,
            top: `${(i * 19 + 3) % 45}%`,
            opacity: 0.3 + (i % 4) * 0.15,
          }}
        />
      ))}

      {/* Moon / Sun */}
      <div
        className="absolute rounded-full animate-sun-pulse"
        style={{
          width: 56,
          height: 56,
          right: "22%",
          top: "8%",
          background:
            "radial-gradient(circle, #ffe57a 30%, #ffd700 60%, rgba(255,200,50,0) 100%)",
          boxShadow: "0 0 40px 20px rgba(255,200,50,0.3)",
        }}
      />

      {/* Light rays from sun */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute origin-top-right opacity-10"
          style={{
            width: 2,
            height: "35vh",
            right: `calc(22% - 28px + ${Math.sin((i * Math.PI) / 3) * 28}px)`,
            top: `calc(8% + 28px)`,
            background: "linear-gradient(180deg, #ffd700, transparent)",
            transform: `rotate(${i * 60 + 210}deg)`,
            transformOrigin: "top center",
          }}
        />
      ))}

      {/* Deep ocean body */}
      <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-b from-[#0c3060] via-[#071a3e] to-[#020813]" />

      {/* Caustic light effects */}
      {caustics.map((c) => (
        <div
          key={c.id}
          className="caustic"
          style={{
            left: `${c.left}%`,
            top: `${c.top}%`,
            width: c.width,
            height: c.height,
            "--duration": `${c.duration}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Wave layer — back */}
      <div
        className="wave-layer animate-wave-slow"
        style={{ bottom: "32%", height: 80 }}
      >
        <svg
          viewBox="0 0 2880 120"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path d={WAVE_BACK} fill="rgba(14,52,96,0.6)" />
        </svg>
      </div>

      {/* Wave layer — mid */}
      <div
        className="wave-layer animate-wave-medium"
        style={{ bottom: "22%", height: 90 }}
      >
        <svg
          viewBox="0 0 2880 120"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path d={WAVE_MID} fill="rgba(10,42,80,0.75)" />
        </svg>
      </div>

      {/* Wave layer — front */}
      <div
        className="wave-layer animate-wave-fast"
        style={{ bottom: "12%", height: 100 }}
      >
        <svg
          viewBox="0 0 2880 100"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path d={WAVE_FRONT} fill="rgba(7,26,62,0.85)" />
        </svg>
      </div>

      {/* Wave foam */}
      <div
        className="wave-layer animate-wave-foam"
        style={{ bottom: "10%", height: 60 }}
      >
        <svg
          viewBox="0 0 2880 80"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path d={WAVE_FOAM} fill="rgba(255,255,255,0.08)" />
        </svg>
      </div>

      {/* Distant surfer silhouette */}
      <div
        className="absolute animate-surfboard-float opacity-20"
        style={{ bottom: "24%", left: "12%" }}
      >
        <svg
          width="48"
          height="32"
          viewBox="0 0 48 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Surfboard */}
          <ellipse cx="24" cy="22" rx="22" ry="7" fill="#ffd700" opacity="0.8" />
          {/* Rider silhouette */}
          <ellipse cx="20" cy="15" rx="4" ry="5" fill="#ffd700" opacity="0.8" />
          <circle cx="20" cy="10" r="3.5" fill="#ffd700" opacity="0.8" />
          {/* Arms */}
          <path
            d="M16,13 Q12,10 14,16"
            stroke="#ffd700"
            strokeWidth="2"
            fill="none"
            opacity="0.8"
          />
          <path
            d="M24,13 Q28,10 26,16"
            stroke="#ffd700"
            strokeWidth="2"
            fill="none"
            opacity="0.8"
          />
        </svg>
      </div>

      {/* Bubbles */}
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full border border-white/20 bg-white/5"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            bottom: `${b.bottom}%`,
            animationName: "bubble-rise",
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in",
          }}
        />
      ))}

      {/* Bottom ocean floor fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#010810] to-transparent" />
    </div>
  );
}

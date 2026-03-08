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

      {/* ── BIG BREAKING WAVE ──────────────────────────────────── */}
      {/* A Pipeline-style right-hand barrel wave on the right side */}
      <div
        className="absolute big-wave-animated"
        style={{ bottom: "3%", right: 0, width: "54vw", minWidth: 380, pointerEvents: "none" }}
      >
        <svg
          viewBox="0 0 520 330"
          preserveAspectRatio="xMaxYMax meet"
          className="w-full h-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Wave body — main mass */}
          <path
            d="M0,330 L0,242 C100,212 200,192 280,177 C330,167 372,156 397,136 C416,120 426,100 421,79 C416,59 406,43 391,31 C376,19 358,11 340,8 C322,5 305,10 295,22 C285,34 278,50 275,67 C272,82 272,97 278,110 C285,123 298,133 318,139 C346,149 380,151 416,146 C455,141 490,149 520,161 L520,330 Z"
            fill="rgba(7,35,92,0.94)"
          />
          {/* Wave face — lighter teal-blue highlight */}
          <path
            d="M0,242 C100,212 200,192 280,177 C330,167 370,156 395,135 C380,148 355,158 325,163 C290,169 255,168 224,175 C185,184 140,205 90,228 C55,243 25,255 0,260 Z"
            fill="rgba(14,58,138,0.60)"
          />
          {/* Secondary face shimmer — sunlight on water */}
          <path
            d="M60,248 C120,228 185,213 240,210 C275,208 305,212 330,220 C295,232 250,238 200,240 C155,242 105,247 60,260 Z"
            fill="rgba(30,100,200,0.18)"
          />
          {/* Barrel interior — dark hollow */}
          <ellipse
            cx="302"
            cy="78"
            rx="47"
            ry="40"
            transform="rotate(-8,302,78)"
            fill="rgba(2,7,28,0.96)"
          />
          {/* Barrel rim — glassy edge of the tube */}
          <path
            d="M275,67 C272,82 272,97 278,110 C282,97 283,82 282,68 Z"
            fill="rgba(22,82,175,0.72)"
          />
          <path
            d="M295,22 C285,34 278,50 275,67 C285,58 296,45 305,30 Z"
            fill="rgba(22,82,175,0.55)"
          />
          {/* Lip curling over — the top of the wave */}
          <path
            d="M340,8 C355,2 373,5 386,14 C376,25 360,27 345,22 C337,18 336,11 340,8 Z"
            fill="rgba(18,72,160,0.80)"
          />
          {/* Foam on the crest */}
          <path
            d="M340,8 C352,2 370,4 382,13 C368,15 352,13 340,8 Z"
            fill="rgba(255,255,255,0.65)"
          />
          <path
            d="M294,23 C302,14 314,11 323,16 C315,22 304,25 294,23 Z"
            fill="rgba(255,255,255,0.48)"
          />
          <path
            d="M278,64 C280,55 286,49 294,50 C290,58 284,63 278,64 Z"
            fill="rgba(255,255,255,0.38)"
          />
          {/* Spray particles off the crest */}
          <circle className="spray-particle" style={{"--spray-dur":"2.2s","--spray-delay":"0s"} as React.CSSProperties} cx="355" cy="5"  r="4"   fill="rgba(255,255,255,0.60)" />
          <circle className="spray-particle" style={{"--spray-dur":"2.6s","--spray-delay":"0.3s"} as React.CSSProperties} cx="368" cy="2"  r="2.8" fill="rgba(255,255,255,0.52)" />
          <circle className="spray-particle" style={{"--spray-dur":"2.0s","--spray-delay":"0.7s"} as React.CSSProperties} cx="346" cy="4"  r="3.2" fill="rgba(255,255,255,0.45)" />
          <circle className="spray-particle" style={{"--spray-dur":"3.0s","--spray-delay":"1.1s"} as React.CSSProperties} cx="374" cy="9"  r="2.2" fill="rgba(255,255,255,0.40)" />
          <circle className="spray-particle" style={{"--spray-dur":"1.8s","--spray-delay":"0.5s"} as React.CSSProperties} cx="338" cy="10" r="2.5" fill="rgba(255,255,255,0.35)" />
          <circle className="spray-particle" style={{"--spray-dur":"2.4s","--spray-delay":"1.5s"} as React.CSSProperties} cx="380" cy="6"  r="1.8" fill="rgba(255,255,255,0.30)" />
          {/* Foam base / whitewater at foot of wave */}
          <path
            d="M0,295 C80,278 170,272 260,276 C340,280 420,285 520,280 L520,330 L0,330 Z"
            fill="rgba(255,255,255,0.09)"
          />
          <path
            d="M0,310 C60,300 140,296 230,299 C310,302 400,308 520,305 L520,330 L0,330 Z"
            fill="rgba(255,255,255,0.06)"
          />
        </svg>
      </div>

      {/* ── ANIMATED SURFER ────────────────────────────────────── */}
      {/* Phases: ride face → barrel → barrel exit → aerial backflip → land → paddle out */}
      <div
        className="absolute surfer-animated"
        style={{ bottom: "22%", right: "27%", pointerEvents: "none" }}
      >
        <svg
          width="54"
          height="74"
          viewBox="-27 -52 54 74"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Surfboard */}
          <ellipse cx="0" cy="20" rx="21" ry="5.5" fill="#60a5fa" opacity="0.90" />
          <ellipse cx="0" cy="20" rx="21" ry="5.5" fill="url(#boardShine)" opacity="0.35" />
          {/* Board fin */}
          <path d="M14,23 L18,32 L12,24 Z" fill="#3b82f6" opacity="0.75" />
          {/* Legs — low crouch stance */}
          <path d="M-3,12 L-9,20 L-5,22" stroke="#ffd700" strokeWidth="2.8" strokeLinecap="round" fill="none" opacity="0.92" />
          <path d="M3,12 L9,20 L5,22"  stroke="#ffd700" strokeWidth="2.8" strokeLinecap="round" fill="none" opacity="0.92" />
          {/* Body */}
          <line x1="0" y1="-8" x2="0" y2="12" stroke="#ffd700" strokeWidth="3.5" strokeLinecap="round" opacity="0.92" />
          {/* Head */}
          <circle cx="0" cy="-16" r="7.5" fill="#ffd700" opacity="0.93" />
          {/* Front arm (leading) extended forward for balance */}
          <path d="M-1,-4 L-18,2"  stroke="#ffd700" strokeWidth="2.8" strokeLinecap="round" fill="none" opacity="0.90" />
          {/* Rear arm extended back */}
          <path d="M-1,-2 L16,-6"  stroke="#ffd700" strokeWidth="2.8" strokeLinecap="round" fill="none" opacity="0.90" />
          {/* Wetsuit highlight */}
          <line x1="0" y1="-4" x2="0" y2="6" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" />
          {/* Board shine gradient */}
          <defs>
            <linearGradient id="boardShine" x1="-21" y1="0" x2="21" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="white" stopOpacity="0" />
              <stop offset="50%"  stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
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

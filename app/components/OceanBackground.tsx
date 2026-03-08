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

export default function OceanBackground() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const b: Bubble[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: (i * 37 + 7) % 100,
      bottom: (i * 23 + 5) % 18,
      size: (i % 4) * 5 + 5,
      duration: (i % 5) + 4,
      delay: (i * 0.7) % 5,
    }));
    setBubbles(b);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1e38] via-[#0d2e55] to-[#071a3e]" />

      {/* Horizon glow */}
      <div className="absolute top-0 left-0 right-0 h-52 bg-gradient-to-b from-[#c0392b]/15 via-[#ff7043]/08 to-transparent" />

      {/* Stars */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: i % 5 === 0 ? 2 : 1,
            height: i % 5 === 0 ? 2 : 1,
            left: `${(i * 37 + 11) % 100}%`,
            top: `${(i * 19 + 3) % 42}%`,
            opacity: 0.25 + (i % 4) * 0.12,
          }}
        />
      ))}

      {/* Sun */}
      <div
        className="absolute rounded-full animate-sun-pulse"
        style={{
          width: 54,
          height: 54,
          right: "14%",
          top: "8%",
          background:
            "radial-gradient(circle, #ffe57a 30%, #ffd700 60%, rgba(255,200,50,0) 100%)",
          boxShadow: "0 0 40px 20px rgba(255,200,50,0.3)",
        }}
      />

      {/* Sun rays */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute opacity-10"
          style={{
            width: 2,
            height: "32vh",
            right: `calc(14% - 27px + ${Math.sin((i * Math.PI) / 3) * 27}px)`,
            top: "calc(8% + 27px)",
            background: "linear-gradient(180deg, #ffd700, transparent)",
            transform: `rotate(${i * 60 + 210}deg)`,
            transformOrigin: "top center",
          }}
        />
      ))}

      {/* ═══════════════════════════════════════════════════════
          MONSTER WAVE — single full-screen left-to-right breaker
          Left: broken whitewater | Centre: barrel | Right: open face
          ═══════════════════════════════════════════════════════ */}
      <svg
        className="absolute inset-0 w-full h-full big-wave-animated"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main wave body: deep navy at crest, near-black at base */}
          <linearGradient id="waveBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#1565a8" stopOpacity="0.88" />
            <stop offset="35%"  stopColor="#0c3868" stopOpacity="0.94" />
            <stop offset="100%" stopColor="#020c1e" stopOpacity="1"    />
          </linearGradient>

          {/* Glassy wave face: teal-blue translucent */}
          <linearGradient id="waveFace" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#1a8abd" stopOpacity="0.52" />
            <stop offset="100%" stopColor="#0d5a96" stopOpacity="0.10" />
          </linearGradient>

          {/* Foam fading left-to-right */}
          <linearGradient id="foamGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="white" stopOpacity="0.72" />
            <stop offset="65%"  stopColor="white" stopOpacity="0.28" />
            <stop offset="100%" stopColor="white" stopOpacity="0"    />
          </linearGradient>

          {/* Barrel interior: very dark */}
          <radialGradient id="barrelInner" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#020810" stopOpacity="0.99" />
            <stop offset="75%"  stopColor="#041222" stopOpacity="0.97" />
            <stop offset="100%" stopColor="#0c2d52" stopOpacity="0.88" />
          </radialGradient>
        </defs>

        {/* Deep trough / ocean floor colour */}
        <rect x="0" y="640" width="1440" height="260" fill="rgba(2,8,20,1)" />

        {/* ── MAIN WAVE BODY ─────────────────────────────────── */}
        {/*
          Crest curve (L→R):
            x=0   y=515  (aftermath / already broken)
            x=400 y=390  (barrel zone rising)
            x=660 y=288  (steep face)
            x=870 y=218  (PEAK — highest point)
            x=1100 y=228 (shoulder just past peak)
            x=1440 y=348 (right shoulder)
        */}
        <path
          d="
            M0,900 L0,515
            C 95,492  190,468  285,448
            C 340,436  385,422  418,404
            C 448,388  464,368  468,346
            C 472,324  466,302  452,285
            C 436,267  414,254  388,248
            C 360,242  330,244  304,256
            C 276,270  256,293  250,322
            C 244,352  253,384  275,408
            C 298,432  334,448  380,454
            C 420,459  466,455  518,440
            C 572,422  630,394  692,360
            C 748,328  806,292  864,262
            C 920,232  984,215  1054,212
            C 1124,209  1196,222  1268,248
            C 1330,270  1390,304  1440,342
            L1440,900 Z
          "
          fill="url(#waveBody)"
        />

        {/* ── WAVE FACE (glassy right section) ───────────────── */}
        <path
          d="
            M690,900 L690,360
            C 748,328  806,292  864,262
            C 920,232  984,215  1054,212
            C 1124,209  1196,222  1268,248
            C 1330,270  1390,304  1440,342
            L1440,900 Z
          "
          fill="rgba(14,74,140,0.38)"
        />

        {/* ── INNER GLASSY FACE (sunlit teal-green strip) ─────── */}
        <path
          d="
            M870,900 L870,230
            C 930,222  998,218  1068,226
            C 1132,234  1198,256  1262,284
            C 1330,314  1390,354  1440,398
            L1440,900 Z
          "
          fill="rgba(20,120,178,0.20)"
        />

        {/* ── BARREL CEILING (overhanging lip) ───────────────── */}
        {/*  A broad arc showing the curl in the barrel zone (x≈330–570) */}
        <path
          d="
            M308,256
            C 320,215  358,186  402,176
            C 444,166  488,172  520,192
            C 552,212  568,244  562,278
            C 556,312  534,338  504,350
            C 474,362  442,360  418,342
            C 394,324  386,296  398,272
            C 410,248  436,238  460,246
            C 484,254  494,278  482,298
            C 470,318  448,326  430,318
          "
          stroke="rgba(24,92,188,0.52)"
          strokeWidth="3"
          fill="rgba(10,52,118,0.48)"
        />

        {/* ── BARREL DARK INTERIOR ───────────────────────────── */}
        <ellipse
          cx="438" cy="308"
          rx="102" ry="76"
          transform="rotate(-12,438,308)"
          fill="url(#barrelInner)"
          opacity="0.97"
        />

        {/* Barrel opening rim glow */}
        <ellipse
          cx="438" cy="308"
          rx="102" ry="76"
          transform="rotate(-12,438,308)"
          fill="none"
          stroke="rgba(28,98,204,0.32)"
          strokeWidth="5"
        />

        {/* ── WHITEWATER / FOAM — left (already broken) ──────── */}
        <path
          d="M0,515 C95,492 190,468 285,448 C340,436 385,422 415,410
             C395,424 350,436 295,446 C220,458 130,464 60,466
             C35,467 12,467 0,464 Z"
          fill="url(#foamGrad)"
        />
        <path
          d="M0,530 C58,516 125,508 192,507
             C245,506 288,509 314,518
             C282,528 234,534 178,536
             C115,538 52,532 0,528 Z"
          fill="rgba(255,255,255,0.34)"
        />
        <path
          d="M0,552 C42,540 96,534 155,534
             C198,534 228,538 248,546
             C215,553 172,557 122,558
             C78,559 34,555 0,552 Z"
          fill="rgba(255,255,255,0.22)"
        />
        <path
          d="M0,572 C32,564 72,559 118,560
             C152,561 174,564 188,571
             C158,577 118,580 76,580
             C44,580 16,577 0,573 Z"
          fill="rgba(255,255,255,0.14)"
        />

        {/* ── FOAM STREAKS ON THE FACE ─────────────────────────── */}
        <path d="M468,432 C530,416 588,410 630,415 C596,426 544,431 495,431 Z"
              fill="rgba(255,255,255,0.24)" />
        <path d="M600,386 C656,371 708,367 745,373 C712,381 668,385 624,384 Z"
              fill="rgba(255,255,255,0.18)" />
        <path d="M750,346 C804,332 856,328 892,334 C858,342 810,345 762,344 Z"
              fill="rgba(255,255,255,0.13)" />
        <path d="M895,302 C938,291 978,289 1006,294 C977,302 940,304 900,303 Z"
              fill="rgba(255,255,255,0.10)" />

        {/* ── WAVE CREST / LIP LINE ─────────────────────────────── */}
        <path
          d="
            M0,515
            C 150,478  278,438  396,394
            C 490,358  570,322  648,287
            C 724,253  796,230  872,218
            C 948,206  1030,208  1114,224
            C 1196,240  1278,270  1358,308
            C 1394,326  1424,344  1440,356
          "
          stroke="rgba(255,255,255,0.44)"
          strokeWidth="2.8"
          fill="none"
        />

        {/* ── SPRAY OFF THE PEAK ───────────────────────────────── */}
        <circle className="spray-particle"
          style={{"--spray-dur":"2.2s","--spray-delay":"0s"} as React.CSSProperties}
          cx="872" cy="210" r="5.5" fill="rgba(255,255,255,0.66)" />
        <circle className="spray-particle"
          style={{"--spray-dur":"2.8s","--spray-delay":"0.4s"} as React.CSSProperties}
          cx="900" cy="200" r="3.8" fill="rgba(255,255,255,0.56)" />
        <circle className="spray-particle"
          style={{"--spray-dur":"1.9s","--spray-delay":"0.8s"} as React.CSSProperties}
          cx="928" cy="206" r="4.4" fill="rgba(255,255,255,0.50)" />
        <circle className="spray-particle"
          style={{"--spray-dur":"2.5s","--spray-delay":"1.2s"} as React.CSSProperties}
          cx="958" cy="198" r="3.2" fill="rgba(255,255,255,0.44)" />
        <circle className="spray-particle"
          style={{"--spray-dur":"3.1s","--spray-delay":"0.6s"} as React.CSSProperties}
          cx="988" cy="194" r="4.2" fill="rgba(255,255,255,0.38)" />
        <circle className="spray-particle"
          style={{"--spray-dur":"2.0s","--spray-delay":"1.6s"} as React.CSSProperties}
          cx="846" cy="216" r="3.0" fill="rgba(255,255,255,0.34)" />
        <circle className="spray-particle"
          style={{"--spray-dur":"2.6s","--spray-delay":"0.2s"} as React.CSSProperties}
          cx="838" cy="224" r="3.6" fill="rgba(255,255,255,0.28)" />

        {/* ── BASE FOAM at deep trough ─────────────────────────── */}
        <path d="M0,828 C280,812 560,808 840,812 C1060,816 1260,822 1440,820
                 L1440,900 L0,900 Z"
              fill="rgba(255,255,255,0.07)" />
        <path d="M0,852 C220,840 460,836 720,840 C960,844 1180,850 1440,846
                 L1440,900 L0,900 Z"
              fill="rgba(255,255,255,0.04)" />
      </svg>

      {/* ── ANIMATED SURFER ──────────────────────────────────────
          Starts on the right (open face), rides LEFT with tight
          turns, finishes with a backflip, then paddles back right.
          ─────────────────────────────────────────────────────── */}
      <div
        className="absolute surfer-animated"
        style={{ bottom: "34%", right: "11%", pointerEvents: "none" }}
      >
        <svg
          width="58"
          height="78"
          viewBox="-29 -56 58 78"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Surfboard */}
          <ellipse cx="0" cy="20" rx="23" ry="5.8" fill="#60a5fa" opacity="0.92" />
          <ellipse cx="0" cy="20" rx="23" ry="5.8" fill="url(#bShine)" opacity="0.36" />
          {/* Board fin */}
          <path d="M15,24 L19,34 L13,25 Z" fill="#3b82f6" opacity="0.76" />
          {/* Legs — low crouch */}
          <path d="M-3,12 L-10,21 L-5,23" stroke="#ffd700" strokeWidth="2.9"
                strokeLinecap="round" fill="none" opacity="0.93" />
          <path d="M3,12  L10,21  L5,23"  stroke="#ffd700" strokeWidth="2.9"
                strokeLinecap="round" fill="none" opacity="0.93" />
          {/* Body */}
          <line x1="0" y1="-8" x2="0" y2="12"
                stroke="#ffd700" strokeWidth="3.6" strokeLinecap="round" opacity="0.93" />
          {/* Head */}
          <circle cx="0" cy="-17" r="7.8" fill="#ffd700" opacity="0.94" />
          {/* Arms */}
          <path d="M-1,-4 L-19,2"  stroke="#ffd700" strokeWidth="2.9"
                strokeLinecap="round" fill="none" opacity="0.91" />
          <path d="M-1,-2 L17,-7"  stroke="#ffd700" strokeWidth="2.9"
                strokeLinecap="round" fill="none" opacity="0.91" />
          {/* Wetsuit highlight */}
          <line x1="0" y1="-4" x2="0" y2="6"
                stroke="rgba(255,255,255,0.24)" strokeWidth="1.5" strokeLinecap="round" />
          <defs>
            <linearGradient id="bShine" x1="-23" y1="0" x2="23" y2="0"
                            gradientUnits="userSpaceOnUse">
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
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#010810] to-transparent" />
    </div>
  );
}

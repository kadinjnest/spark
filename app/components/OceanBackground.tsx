"use client";

/* ─────────────────────────────────────────────────────────────────────────
   OceanBackground — clean illustration style
   Inspired by flat vector surf art: teal wave blob, pink foam, purple rider.
   Light white background so hero text above has full legibility.
   ───────────────────────────────────────────────────────────────────────── */

export default function OceanBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">

      {/* ── BASE: white → very-pale-teal gradient ─────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #ffffff 0%, #f4fffe 45%, #e8f8f6 75%, #d0f0ec 100%)",
        }}
      />

      {/* Soft radial bloom top-right (light warmth) */}
      <div
        className="absolute"
        style={{
          top: "-10%",
          right: "-5%",
          width: "55vw",
          height: "55vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(244,200,224,0.28) 0%, rgba(232,160,200,0.10) 50%, transparent 75%)",
          filter: "blur(48px)",
        }}
      />

      {/* ── MAIN SVG ILLUSTRATION ─────────────────────────────────── */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* ─ Wave blob gradient ─ */}
          <radialGradient id="waveBlob" cx="48%" cy="50%" r="52%">
            <stop offset="0%"   stopColor="#5DE0D4" />
            <stop offset="55%"  stopColor="#3DCFC2" />
            <stop offset="100%" stopColor="#2BBFB2" />
          </radialGradient>

          {/* ─ Teal water surface ─ */}
          <linearGradient id="waterSurface" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#3DCFC2" stopOpacity="0.70" />
            <stop offset="100%" stopColor="#1A9A8E" stopOpacity="0.95" />
          </linearGradient>

          {/* ─ Pink foam ─ */}
          <radialGradient id="pinkFoam" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#F4C8E0" />
            <stop offset="60%"  stopColor="#E8A0C8" />
            <stop offset="100%" stopColor="#D490B8" stopOpacity="0.6" />
          </radialGradient>

          {/* ─ Board gradient ─ */}
          <linearGradient id="boardGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#3D2060" />
            <stop offset="100%" stopColor="#5A3A8A" />
          </linearGradient>

          {/* ─ Surfer body ─ */}
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#7B5EA7" />
            <stop offset="100%" stopColor="#5A3E8A" />
          </linearGradient>

          {/* Wave inner glow */}
          <filter id="softBloom" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="18" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Drop shadow for surfer */}
          <filter id="surferShadow" x="-30%" y="-10%" width="160%" height="130%">
            <feDropShadow dx="8" dy="10" stdDeviation="12"
              floodColor="#1A9A8E" floodOpacity="0.30" />
          </filter>
        </defs>

        {/* ══════════════════════════════════════════════════════════════
            TEAL WATER SURFACE — fills the lower third
        ══════════════════════════════════════════════════════════════ */}
        <path
          d="M0,680 Q180,650 360,668 Q540,686 720,660 Q900,634 1080,658 Q1260,682 1440,650
             L1440,900 L0,900 Z"
          fill="url(#waterSurface)"
        />
        {/* Second layer — lighter ripple */}
        <path
          d="M0,700 Q180,678 360,692 Q540,706 720,684 Q900,662 1080,682 Q1260,702 1440,674
             L1440,900 L0,900 Z"
          fill="rgba(61,207,194,0.35)"
        />
        {/* Foam line on water */}
        <path
          d="M0,680 Q180,650 360,668 Q540,686 720,660 Q900,634 1080,658 Q1260,682 1440,650"
          stroke="rgba(255,255,255,0.70)"
          strokeWidth="3"
          fill="none"
        />

        {/* ══════════════════════════════════════════════════════════════
            MAIN WAVE BLOB — large organic circular shape
            Positioned centre-left, the "barrel" behind the surfer
        ══════════════════════════════════════════════════════════════ */}
        <g className="wave-blob-breathe" style={{ transformOrigin: "560px 500px" }}>
          <path
            d="
              M 340,300
              C 270,270  220,320  200,390
              C 180,460  210,530  260,580
              C 310,630  380,650  450,640
              C 530,628  600,590  640,540
              C 680,490  690,430  670,375
              C 650,318  600,280  545,268
              C 490,256  420,262  380,280
              C 360,290  348,295  340,300 Z
            "
            fill="url(#waveBlob)"
            opacity="0.90"
          />
          {/* Inner lighter arc — the glassy face */}
          <path
            d="
              M 360,320
              C 310,300  275,345  265,405
              C 255,465  285,525  330,560
              C 375,595  435,605  490,588
              C 545,570  588,535  608,488
              C 628,440  620,388  592,346
              C 564,304  522,286  478,284
              C 440,282  390,296  360,320 Z
            "
            fill="rgba(100,235,228,0.35)"
          />
          {/* Wave highlight arc (top-left rim) */}
          <path
            d="M 355,308 C 300,290 250,340 238,400 C 232,430 238,460 252,486"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          {/* Wave crest foam — top of the blob */}
          <path
            d="M 340,300 C 380,268 440,254 500,256 C 540,258 572,270 596,286"
            stroke="rgba(255,255,255,0.72)"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* ══════════════════════════════════════════════════════════════
            PINK FOAM SPLASH — upper right of wave
            Three organic blob shapes + smaller droplets
        ══════════════════════════════════════════════════════════════ */}
        <g className="foam-sway" style={{ transformOrigin: "750px 280px" }}>
          {/* Main pink blob */}
          <path
            d="
              M 680,240
              C 700,200  740,185  780,195
              C 820,205  848,235  852,270
              C 856,305  836,335  808,345
              C 780,355  748,342  730,318
              C 712,294  700,268  700,250
              C 698,244  688,248  680,240 Z
            "
            fill="url(#pinkFoam)"
            opacity="0.88"
          />
          {/* Second smaller blob */}
          <path
            d="
              M 820,175
              C 836,152  862,148  882,162
              C 902,176  908,202  896,220
              C 884,238  860,242  842,228
              C 824,214  818,190  820,175 Z
            "
            fill="#E8A0C8"
            opacity="0.80"
          />
          {/* Third tiny blob */}
          <path
            d="
              M 900,220
              C 908,208  922,206  932,214
              C 942,222  944,236  936,244
              C 928,252  916,250  908,242
              C 900,234  898,226  900,220 Z
            "
            fill="#F4C8E0"
            opacity="0.75"
          />
          {/* Droplets */}
          <circle cx="860" cy="155" r="9"  fill="#E8A0C8" opacity="0.65" />
          <circle cx="890" cy="140" r="6"  fill="#F0B8D4" opacity="0.55" />
          <circle cx="924" cy="178" r="7"  fill="#E8A0C8" opacity="0.60" />
          <circle cx="948" cy="205" r="5"  fill="#EAB8D8" opacity="0.50" />
          <circle cx="912" cy="252" r="4"  fill="#E8A0C8" opacity="0.48" />
          <circle cx="868" cy="130" r="4"  fill="#F0C0DC" opacity="0.45" />
        </g>

        {/* ══════════════════════════════════════════════════════════════
            SURFER FIGURE — stylised flat illustration
            Purple/violet body, white swimsuit, dark board with shadow
        ══════════════════════════════════════════════════════════════ */}
        <g
          className="surfer-float"
          style={{ transformOrigin: "480px 540px" }}
          filter="url(#surferShadow)"
        >
          {/* Board shadow on water */}
          <ellipse cx="490" cy="618" rx="96" ry="12"
            fill="rgba(58,28,100,0.22)" />

          {/* Surfboard */}
          <path
            d="M 380,600 Q 410,578 490,568 Q 570,558 600,576 Q 590,610 490,618 Q 390,618 380,600 Z"
            fill="url(#boardGrad)"
          />
          {/* Board nose highlight */}
          <path
            d="M 590,576 Q 598,590 592,606"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />

          {/* ─ Back leg ─ */}
          <path
            d="M 504,574 L 510,596 L 530,600"
            stroke="url(#bodyGrad)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* ─ Front leg ─ */}
          <path
            d="M 476,564 L 462,586 L 448,592"
            stroke="url(#bodyGrad)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* ─ Torso (white swimsuit) ─ */}
          <path
            d="M 464,522 C 460,508 462,492 472,484 C 482,476 500,476 510,484
               C 520,492 522,508 516,524 C 508,538 470,538 464,522 Z"
            fill="white"
          />

          {/* ─ Body top (shoulders & neck — purple) ─ */}
          <path
            d="M 468,478 C 462,468 462,456 472,450 C 482,444 502,444 510,450
               C 518,456 518,468 512,478"
            fill="#7B5EA7"
          />

          {/* ─ Head ─ */}
          <ellipse cx="490" cy="440" rx="22" ry="24" fill="#6A4490" />

          {/* ─ Hair flowing back ─ */}
          <path
            d="M 475,428 C 455,418 432,412 418,420 C 405,428 406,448 418,456
               C 430,462 448,458 462,446 C 472,436 476,430 475,428 Z"
            fill="#2C1A40"
          />
          <path
            d="M 475,428 C 468,416 455,408 444,412 C 435,416 432,426 436,434"
            stroke="#2C1A40"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />

          {/* ─ Face highlights ─ */}
          <ellipse cx="498" cy="438" rx="3" ry="4" fill="rgba(255,255,255,0.30)" />
          {/* Smile */}
          <path d="M 484,448 Q 490,453 496,448"
            stroke="rgba(255,255,255,0.50)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          {/* ─ Back arm (behind body) ─ */}
          <path
            d="M 512,500 L 544,488 L 558,475"
            stroke="#5A3E8A"
            strokeWidth="13"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* ─ Front arm (pointing forward) ─ */}
          <path
            d="M 468,500 L 436,488 L 418,476"
            stroke="url(#bodyGrad)"
            strokeWidth="13"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* ─ White suit body fill (over legs) ─ */}
          <path
            d="M 468,520 L 470,560 L 508,564 L 514,522 Z"
            fill="white"
            opacity="0.92"
          />
        </g>

        {/* ══════════════════════════════════════════════════════════════
            WATER SPARKLES / LIGHT REFLECTIONS
        ══════════════════════════════════════════════════════════════ */}
        {[
          {cx: 180, cy: 720, rx: 28, ry: 4},
          {cx: 320, cy: 740, rx: 18, ry: 3},
          {cx: 600, cy: 710, rx: 22, ry: 4},
          {cx: 800, cy: 730, rx: 30, ry: 5},
          {cx: 1050,cy: 715, rx: 20, ry: 3},
          {cx: 1250,cy: 735, rx: 25, ry: 4},
        ].map((s, i) => (
          <ellipse
            key={i}
            cx={s.cx} cy={s.cy} rx={s.rx} ry={s.ry}
            fill="rgba(255,255,255,0.38)"
            className="shimmer-sparkle"
            style={{ animationDelay: `${i * 0.4}s` } as React.CSSProperties}
          />
        ))}

        {/* Small teal circles (secondary foam dots around wave) */}
        {[
          {cx:300,cy:308,r:8,o:0.40},
          {cx:254,cy:410,r:6,o:0.30},
          {cx:230,cy:490,r:7,o:0.35},
          {cx:635,cy:280,r:9,o:0.38},
          {cx:660,cy:350,r:6,o:0.30},
          {cx:625,cy:460,r:5,o:0.25},
        ].map((d, i) => (
          <circle
            key={i}
            cx={d.cx} cy={d.cy} r={d.r}
            fill="#3DCFC2"
            opacity={d.o}
            className="dot-drift"
            style={{ animationDelay: `${i * 0.55}s` } as React.CSSProperties}
          />
        ))}
      </svg>

      {/* ── Bottom fade: ensures footer text is legible ─────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(26,154,142,0.08), transparent)",
        }}
      />
    </div>
  );
}

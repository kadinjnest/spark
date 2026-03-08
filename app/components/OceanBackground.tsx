"use client";

/* ─────────────────────────────────────────────────────────────────────────
   OceanBackground — clean illustration style
   Blue wave blob, amber/orange foam, orange rider.
   Light white background so hero text above has full legibility.
   ───────────────────────────────────────────────────────────────────────── */

export default function OceanBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">

      {/* ── BASE: white → very-pale-blue gradient ─────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #ffffff 0%, #f0f6ff 45%, #e0edff 75%, #cce0ff 100%)",
        }}
      />

      {/* Soft radial bloom top-right (warm orange glow) */}
      <div
        className="absolute"
        style={{
          top: "-10%",
          right: "-5%",
          width: "55vw",
          height: "55vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(251,191,36,0.22) 0%, rgba(249,115,22,0.08) 50%, transparent 75%)",
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
            <stop offset="0%"   stopColor="#60A5FA" />
            <stop offset="55%"  stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#2563EB" />
          </radialGradient>

          {/* ─ Blue water surface ─ */}
          <linearGradient id="waterSurface" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#3B82F6" stopOpacity="0.70" />
            <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.95" />
          </linearGradient>

          {/* ─ Orange foam ─ */}
          <radialGradient id="orangeFoam" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#FED7AA" />
            <stop offset="60%"  stopColor="#FDBA74" />
            <stop offset="100%" stopColor="#FB923C" stopOpacity="0.6" />
          </radialGradient>

          {/* ─ Board gradient (sleek silver board) ─ */}
          <linearGradient id="boardGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#B0BEC5" />
            <stop offset="40%"  stopColor="#E0E0E0" />
            <stop offset="60%"  stopColor="#90A4AE" />
            <stop offset="100%" stopColor="#CFD8DC" />
          </linearGradient>

          {/* ─ Surfer body (chrome/silver metallic) ─ */}
          <linearGradient id="bodyGrad" x1="0.2" y1="0" x2="0.8" y2="1">
            <stop offset="0%"   stopColor="#E0E0E0" />
            <stop offset="25%"  stopColor="#B0BEC5" />
            <stop offset="50%"  stopColor="#CFD8DC" />
            <stop offset="75%"  stopColor="#78909C" />
            <stop offset="100%" stopColor="#546E7A" />
          </linearGradient>

          {/* ─ Chrome highlight (specular) ─ */}
          <linearGradient id="chromeHighlight" x1="0" y1="0" x2="0.5" y2="1">
            <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="50%"  stopColor="#ECEFF1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#90A4AE" stopOpacity="0.1" />
          </linearGradient>

          {/* ─ Chrome dark side ─ */}
          <linearGradient id="chromeDark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#78909C" />
            <stop offset="100%" stopColor="#455A64" />
          </linearGradient>

          {/* ─ Board metallic sheen ─ */}
          <linearGradient id="boardSheen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
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
              floodColor="#1D4ED8" floodOpacity="0.30" />
          </filter>
        </defs>

        {/* ══════════════════════════════════════════════════════════════
            BLUE WATER SURFACE — fills the lower third
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
          fill="rgba(59,130,246,0.35)"
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
            fill="rgba(147,197,253,0.35)"
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
            ORANGE FOAM SPLASH — upper right of wave
            Three organic blob shapes + smaller droplets
        ══════════════════════════════════════════════════════════════ */}
        <g className="foam-sway" style={{ transformOrigin: "750px 280px" }}>
          {/* Main orange blob */}
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
            fill="url(#orangeFoam)"
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
            fill="#FDBA74"
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
            fill="#FED7AA"
            opacity="0.75"
          />
          {/* Droplets */}
          <circle cx="860" cy="155" r="9"  fill="#FDBA74" opacity="0.65" />
          <circle cx="890" cy="140" r="6"  fill="#FED7AA" opacity="0.55" />
          <circle cx="924" cy="178" r="7"  fill="#FDBA74" opacity="0.60" />
          <circle cx="948" cy="205" r="5"  fill="#FDE68A" opacity="0.50" />
          <circle cx="912" cy="252" r="4"  fill="#FDBA74" opacity="0.48" />
          <circle cx="868" cy="130" r="4"  fill="#FED7AA" opacity="0.45" />
        </g>

        {/* ══════════════════════════════════════════════════════════════
            SURFER FIGURE — Silver Surfer-inspired chrome rider
            Metallic body, dynamic low-crouch carving pose, silver board
            Animated: carves tight turns on the wave face
        ══════════════════════════════════════════════════════════════ */}
        <g
          className="surfer-carve"
          style={{ transformOrigin: "490px 570px" }}
          filter="url(#surferShadow)"
        >
          {/* Board shadow on water */}
          <ellipse cx="490" cy="620" rx="100" ry="10"
            fill="rgba(69,90,100,0.25)" />

          {/* Surfboard — sleek silver shortboard */}
          <path
            d="M 375,598 Q 400,572 490,562 Q 580,552 610,574 Q 598,612 490,620 Q 382,620 375,598 Z"
            fill="url(#boardGrad)"
          />
          {/* Board sheen overlay */}
          <path
            d="M 385,594 Q 408,576 490,568 Q 572,560 598,576 Q 540,580 490,578 Q 430,582 385,594 Z"
            fill="url(#boardSheen)"
          />
          {/* Fin */}
          <path
            d="M 420,614 L 415,628 L 430,620 Z"
            fill="#546E7A"
            opacity="0.7"
          />
          {/* Board stringer line */}
          <path
            d="M 388,600 Q 490,582 602,578"
            stroke="rgba(84,110,122,0.3)"
            strokeWidth="1.5"
            fill="none"
          />

          {/* ─ Back leg (bent, athletic crouch — chrome) ─ */}
          <path
            d="M 510,568 C 514,578 518,590 528,596 C 534,600 540,600 544,598"
            stroke="url(#bodyGrad)"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Back leg highlight */}
          <path
            d="M 512,570 C 515,578 518,588 526,594"
            stroke="url(#chromeHighlight)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />

          {/* ─ Front leg (deep bend, weight forward — chrome) ─ */}
          <path
            d="M 472,560 C 464,572 454,584 442,590 C 436,594 430,594 426,592"
            stroke="url(#bodyGrad)"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Front leg highlight */}
          <path
            d="M 470,562 C 463,572 455,582 445,588"
            stroke="url(#chromeHighlight)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />

          {/* ─ Lower torso / hips (chrome) ─ */}
          <path
            d="M 466,520 C 462,534 464,550 472,558
               L 510,562 C 518,550 520,534 516,520 Z"
            fill="url(#bodyGrad)"
          />
          {/* Torso highlight */}
          <path
            d="M 472,524 C 470,536 472,548 476,554
               L 496,556 C 500,548 500,536 498,524 Z"
            fill="url(#chromeHighlight)"
          />

          {/* ─ Upper torso / chest (broad, muscular — chrome) ─ */}
          <path
            d="M 458,478 C 452,490 454,506 462,516
               L 520,518 C 528,506 530,490 524,478 Z"
            fill="url(#bodyGrad)"
          />
          {/* Chest highlight (specular reflection) */}
          <path
            d="M 468,484 C 464,494 466,506 470,512
               L 500,514 C 504,506 504,494 500,484 Z"
            fill="url(#chromeHighlight)"
          />

          {/* ─ Shoulders (wide, powerful) ─ */}
          <path
            d="M 448,480 C 452,470 470,464 490,464
               C 510,464 528,470 532,480"
            stroke="url(#bodyGrad)"
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
          />
          {/* Shoulder highlight */}
          <path
            d="M 458,476 C 464,470 478,466 490,466 C 502,466 516,470 522,476"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />

          {/* ─ Neck ─ */}
          <path
            d="M 482,466 L 484,452 L 496,452 L 498,466"
            fill="url(#bodyGrad)"
          />

          {/* ─ Head (smooth chrome dome — Silver Surfer iconic) ─ */}
          <ellipse cx="490" cy="438" rx="20" ry="22" fill="url(#bodyGrad)" />
          {/* Head specular highlight */}
          <ellipse cx="484" cy="432" rx="10" ry="12"
            fill="url(#chromeHighlight)" />
          {/* Eye — subtle chrome slit */}
          <path
            d="M 496,436 C 500,434 504,436 502,438"
            stroke="#37474F"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Jaw line */}
          <path
            d="M 478,448 C 484,454 496,454 502,448"
            stroke="#546E7A"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* ─ Back arm (trailing, counterbalance — chrome) ─ */}
          <path
            d="M 524,486 C 540,478 556,466 566,452 C 572,444 570,438 564,436"
            stroke="url(#chromeDark)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Back arm highlight */}
          <path
            d="M 526,484 C 540,476 554,466 562,454"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          {/* Back hand */}
          <circle cx="564" cy="436" r="6" fill="url(#bodyGrad)" />

          {/* ─ Front arm (leading, reaching into turn — chrome) ─ */}
          <path
            d="M 458,486 C 440,476 420,464 406,454 C 398,448 396,442 400,438"
            stroke="url(#bodyGrad)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Front arm highlight */}
          <path
            d="M 456,484 C 440,474 422,464 410,454"
            stroke="url(#chromeHighlight)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Front hand */}
          <circle cx="400" cy="438" r="6" fill="url(#bodyGrad)" />

          {/* ── Spray particles from board rail ── */}
          {[
            { cx: 370, cy: 594, r: 4, delay: 0 },
            { cx: 358, cy: 586, r: 3, delay: 0.3 },
            { cx: 348, cy: 578, r: 2.5, delay: 0.6 },
            { cx: 362, cy: 572, r: 2, delay: 0.9 },
            { cx: 376, cy: 580, r: 3, delay: 1.2 },
          ].map((s, i) => (
            <circle
              key={`spray-${i}`}
              cx={s.cx} cy={s.cy} r={s.r}
              fill="rgba(255,255,255,0.7)"
              className="east-spray"
              style={{
                "--sx": `${-8 - i * 4}px`,
                "--sdur": "1.8s",
                "--sdelay": `${s.delay}s`,
              } as React.CSSProperties}
            />
          ))}
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

        {/* Small blue circles (secondary foam dots around wave) */}
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
            fill="#3B82F6"
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
            "linear-gradient(to top, rgba(29,78,216,0.08), transparent)",
        }}
      />
    </div>
  );
}

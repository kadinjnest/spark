"use client";

/* ─────────────────────────────────────────────────────────────────────────
   OceanBackground — East-coast beach-break scene
   · Sky, sun, drifting clouds
   · Three simultaneous peaking waves (left / centre / right) with foam
   · Crowd: 4 lineup surfers (back), 3 riding surfers (mid), 1 close up
   · All 3-D depth simulated with scale + opacity layers
   ───────────────────────────────────────────────────────────────────────── */

function Cloud({ w }: { w: number }) {
  const h = w * 0.38;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <ellipse cx={w * 0.5} cy={h * 0.72} rx={w * 0.48} ry={h * 0.28} fill="white" opacity="0.9" />
      <ellipse cx={w * 0.32} cy={h * 0.6} rx={w * 0.24} ry={h * 0.34} fill="white" opacity="0.88" />
      <ellipse cx={w * 0.62} cy={h * 0.56} rx={w * 0.22} ry={h * 0.32} fill="white" opacity="0.85" />
      <ellipse cx={w * 0.48} cy={h * 0.44} rx={w * 0.18} ry={h * 0.28} fill="white" opacity="0.82" />
    </svg>
  );
}

/* Generic surfer — standing, riding */
function RiderFigure() {
  return (
    <>
      {/* Board */}
      <ellipse cx="0" cy="18" rx="22" ry="5" fill="#60a5fa" opacity="0.92" />
      <ellipse cx="0" cy="18" rx="22" ry="5" fill="url(#boardShine)" opacity="0.3" />
      <path d="M14,22 L18,31 L12,23 Z" fill="#3b82f6" opacity="0.7" />
      {/* Legs */}
      <path d="M-3,10 L-9,19 L-4,21" stroke="#fbbf24" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      <path d="M3,10 L9,19 L4,21" stroke="#fbbf24" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      {/* Body */}
      <line x1="0" y1="-7" x2="0" y2="10" stroke="#fbbf24" strokeWidth="3.4" strokeLinecap="round" />
      {/* Head */}
      <circle cx="0" cy="-15" r="7" fill="#fbbf24" opacity="0.95" />
      {/* Arms — wide for balance */}
      <path d="M-1,-3 L-18,2" stroke="#fbbf24" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      <path d="M-1,-2 L16,-7" stroke="#fbbf24" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      {/* Wetsuit highlight */}
      <line x1="0" y1="-4" x2="0" y2="5" stroke="rgba(255,255,255,0.22)" strokeWidth="1.4" strokeLinecap="round" />
    </>
  );
}

/* Surfer sitting in lineup */
function SitterFigure() {
  return (
    <>
      {/* Board flat */}
      <ellipse cx="0" cy="10" rx="20" ry="4.5" fill="#60a5fa" opacity="0.88" />
      {/* Legs dangling */}
      <path d="M-6,12 L-14,22" stroke="#fbbf24" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <path d="M6,12 L14,22" stroke="#fbbf24" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      {/* Body */}
      <line x1="0" y1="-10" x2="0" y2="10" stroke="#fbbf24" strokeWidth="3.2" strokeLinecap="round" />
      {/* Head */}
      <circle cx="0" cy="-18" r="6.5" fill="#fbbf24" opacity="0.95" />
      {/* Arms resting */}
      <path d="M-1,-2 L-16,6" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M-1,-2 L15,4" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </>
  );
}

/* Paddling figure */
function PaddlerFigure() {
  return (
    <>
      {/* Board */}
      <ellipse cx="0" cy="8" rx="24" ry="4.5" fill="#60a5fa" opacity="0.88" />
      {/* Body prone */}
      <rect x="-6" y="2" width="12" height="8" rx="3" fill="#fbbf24" opacity="0.92" />
      {/* Head up */}
      <circle cx="0" cy="-4" r="6" fill="#fbbf24" opacity="0.95" />
      {/* Arms paddling */}
      <path d="M-5,6 Q-20,0 -24,8" stroke="#fbbf24" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      <path d="M5,6 Q20,0 24,8" stroke="#fbbf24" strokeWidth="2.8" strokeLinecap="round" fill="none" />
    </>
  );
}

export default function OceanBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">

      {/* ── SKY ───────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #2a6db0 0%, #4a90cc 18%, #6bb4de 38%, #9acde8 58%, #bddff2 74%, #d4eef8 86%, #e4f5fc 100%)",
        }}
      />

      {/* Horizon warm glow */}
      <div
        className="absolute"
        style={{
          left: "58%",
          top: "26%",
          width: 380,
          height: 140,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(255,235,160,0.35) 0%, rgba(255,215,80,0.12) 50%, transparent 75%)",
          filter: "blur(22px)",
        }}
      />

      {/* Sun */}
      <div
        className="absolute east-coast-sun"
        style={{
          width: 58,
          height: 58,
          left: "72%",
          top: "7%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, #fff9c4 25%, #ffe57a 55%, rgba(255,210,50,0) 100%)",
          boxShadow:
            "0 0 40px 16px rgba(255,230,80,0.30), 0 0 90px 40px rgba(255,200,50,0.10)",
        }}
      />

      {/* Clouds */}
      <div className="absolute east-cloud-a" style={{ left: "4%", top: "5%", opacity: 0.80 }}>
        <Cloud w={200} />
      </div>
      <div className="absolute east-cloud-b" style={{ left: "24%", top: "2%", opacity: 0.62 }}>
        <Cloud w={148} />
      </div>
      <div className="absolute east-cloud-c" style={{ left: "50%", top: "9%", opacity: 0.48 }}>
        <Cloud w={118} />
      </div>
      <div className="absolute east-cloud-d" style={{ left: "76%", top: "4%", opacity: 0.35 }}>
        <Cloud w={96} />
      </div>

      {/* ── MAIN SVG SCENE ─────────────────────────────────────────── */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* ─ Gradients ─ */}
          <linearGradient id="oceanDeep" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a607a" />
            <stop offset="100%" stopColor="#0b3248" />
          </linearGradient>
          <linearGradient id="oceanShallow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a9a88" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#196050" />
          </linearGradient>
          <linearGradient id="waveBodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e84a0" stopOpacity="0.92" />
            <stop offset="50%" stopColor="#10547a" stopOpacity="0.97" />
            <stop offset="100%" stopColor="#061e34" />
          </linearGradient>
          <linearGradient id="waveFaceL" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3ec8d8" stopOpacity="0.58" />
            <stop offset="100%" stopColor="#1890a8" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="foamLeft" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0.88" />
            <stop offset="60%" stopColor="white" stopOpacity="0.38" />
            <stop offset="100%" stopColor="white" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id="foamRight" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0.88" />
            <stop offset="60%" stopColor="white" stopOpacity="0.38" />
            <stop offset="100%" stopColor="white" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id="foamCenter" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.92" />
            <stop offset="100%" stopColor="white" stopOpacity="0.06" />
          </linearGradient>
          <linearGradient id="boardShine" x1="-22" y1="0" x2="22" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          {/* Water reflection shimmer */}
          <linearGradient id="shimmerH" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="45%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="55%" stopColor="rgba(255,255,255,0.14)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* ── OCEAN BASE ───────────────────────────────────────────── */}
        <rect x="0" y="410" width="1440" height="490" fill="url(#oceanDeep)" />

        {/* Horizon haze line */}
        <rect x="0" y="408" width="1440" height="18" fill="rgba(180,225,245,0.28)" />

        {/* Water sun reflection path */}
        <path
          d="M820,420 C900,418 980,422 1060,418 C1100,416 1120,420 1060,425 C980,432 900,430 820,428 Z"
          fill="rgba(255,245,180,0.18)"
        />

        {/* ── BACKGROUND SWELL LINES (rolling, give depth) ─────────── */}
        <g className="east-swell-drift" opacity="0.55">
          {/* 4 thin lines across the horizon area, slight curvature */}
          <path d="M0,445 Q360,438 720,444 Q1080,450 1440,443" stroke="rgba(200,240,255,0.35)" strokeWidth="1.2" fill="none" />
          <path d="M0,468 Q360,460 720,466 Q1080,472 1440,465" stroke="rgba(200,240,255,0.30)" strokeWidth="1.0" fill="none" />
          <path d="M0,490 Q360,482 720,488 Q1080,494 1440,486" stroke="rgba(200,240,255,0.24)" strokeWidth="0.9" fill="none" />
          <path d="M0,512 Q360,504 720,510 Q1080,516 1440,508" stroke="rgba(200,240,255,0.18)" strokeWidth="0.8" fill="none" />
          <path d="M0,534 Q360,526 720,532 Q1080,538 1440,530" stroke="rgba(200,240,255,0.14)" strokeWidth="0.7" fill="none" />
        </g>

        {/* ─────────────────────────────────────────────────────────────
            LINEUP SURFERS — 4 small figures in the back, bobbing
            All sitting on boards, waiting for the next set
            Scale ≈ 0.36 (very far away)
        ───────────────────────────────────────────────────────────── */}
        {/* Surfer A — far left of lineup */}
        <g transform="translate(480,516) scale(0.34)" className="east-bob-a" opacity="0.72">
          <SitterFigure />
        </g>
        {/* Surfer B */}
        <g transform="translate(560,510) scale(0.32)" className="east-bob-b" opacity="0.68">
          <SitterFigure />
        </g>
        {/* Surfer C */}
        <g transform="translate(650,508) scale(0.34)" className="east-bob-c" opacity="0.70">
          <SitterFigure />
        </g>
        {/* Surfer D — paddler in from outside */}
        <g transform="translate(750,514) scale(0.30)" className="east-bob-b" opacity="0.60">
          <PaddlerFigure />
        </g>
        {/* Surfer E — far right lineup */}
        <g transform="translate(840,512) scale(0.32)" className="east-bob-a" opacity="0.62">
          <SitterFigure />
        </g>

        {/* ═══════════════════════════════════════════════════════════
            THREE SIMULTANEOUS WAVE PEAKS
            Classic east-coast beach-break: multiple peaks at once
            ═══════════════════════════════════════════════════════ */}

        {/* ── WAVE 1 — LEFT PEAK (x 0–560) breaking leftward ───────── */}
        <g className="east-wave-left">
          {/* Main body */}
          <path
            d="M0,900 L0,640
               C 60,610  120,585  190,568
               C 240,556  288,548  330,538
               C 360,530  380,520  388,506
               C 396,490  394,474  384,460
               C 372,444  354,434  330,430
               C 306,426  282,432  264,448
               C 246,464  244,486  258,508
               C 272,530  300,546  338,554
               C 374,562  416,558  460,546
               C 510,532  552,508  578,480
               L578,900 Z"
            fill="url(#waveBodyGrad)"
            opacity="0.93"
          />
          {/* Glassy face */}
          <path
            d="M334,430 C342,410 360,396 382,392 C406,388 428,398 440,420
               C452,442 448,468 432,484 C416,500 392,502 372,492
               C352,482 342,462 348,444 Z"
            fill="rgba(45,180,200,0.32)"
          />
          {/* Crest lip */}
          <path
            d="M0,640 C90,610 180,582 268,558 C320,543 365,530 395,514
               C432,495 452,472 444,448 C432,420 402,408 370,414
               C338,420 316,442 318,468"
            stroke="rgba(255,255,255,0.52)"
            strokeWidth="2.5"
            fill="none"
          />
          {/* Foam breaking left */}
          <path
            d="M0,640 C60,618 120,604 190,596 C235,590 272,588 296,592
               C264,602 218,610 162,616 C102,622 44,622 0,618 Z"
            fill="url(#foamLeft)"
          />
          <path
            d="M0,660 C48,646 106,638 168,637 C216,636 250,640 268,648
               C235,657 190,661 136,663 C84,665 34,660 0,657 Z"
            fill="rgba(255,255,255,0.42)"
          />
          <path
            d="M0,680 C34,668 78,662 126,661 C162,661 186,665 198,672
               C170,679 132,682 88,682 C52,682 18,679 0,677 Z"
            fill="rgba(255,255,255,0.28)"
          />
        </g>

        {/* ── WAVE 2 — CENTRE PEAK (x 420–1020) the big one ─────────── */}
        <g className="east-wave-centre">
          {/* Main body */}
          <path
            d="M420,900 L420,580
               C 480,562  540,546  600,530
               C 645,518  685,506  714,490
               C 738,476  748,460  744,440
               C 738,418  720,402  696,394
               C 670,386  642,390  622,406
               C 600,424  592,450  602,476
               C 612,502  638,522  674,534
               C 710,546  752,548  796,540
               C 844,530  892,508  936,480
               C 970,456  996,430  1006,402
               C 1016,374  1006,348  984,330
               C 960,312  928,308  896,318
               C 862,330  840,354  836,382
               C 832,410  846,438  872,454
               C 898,470  934,476  972,472
               C 1004,468  1030,454  1046,432
               L1046,900 Z"
            fill="url(#waveBodyGrad)"
            opacity="0.95"
          />
          {/* Glassy face right of peak */}
          <path
            d="M710,390 L710,490 C752,472 798,458 840,450
               C 888,442 934,444 972,452 C1004,459 1024,468 1034,480
               L1034,900 L710,900 Z"
            fill="rgba(18,100,130,0.38)"
          />
          {/* Inner sunlit green */}
          <path
            d="M840,380 L840,450 C888,442 934,444 972,452
               C1004,459 1028,470 1046,485 L1046,900 L840,900 Z"
            fill="rgba(30,140,120,0.18)"
          />
          {/* Crest highlight */}
          <path
            d="M420,580 C480,560 542,540 606,520 C658,504 702,488 732,468
               C758,450 770,428 762,404 C752,378 728,360 700,354
               C670,348 640,358 622,378 C602,400 598,428 610,452
               C622,476 646,492 678,500"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="2.8"
            fill="none"
          />
          {/* Peak spray */}
          {[
            {cx:696,cy:348,r:5,dur:"2.1s",delay:"0s"},
            {cx:722,cy:338,r:3.6,dur:"2.6s",delay:"0.4s"},
            {cx:748,cy:342,r:4.2,dur:"1.9s",delay:"0.8s"},
            {cx:774,cy:336,r:3.0,dur:"2.4s",delay:"1.2s"},
            {cx:800,cy:332,r:3.8,dur:"2.8s",delay:"0.6s"},
            {cx:668,cy:356,r:2.8,dur:"2.0s",delay:"1.5s"},
          ].map((s, i) => (
            <circle
              key={i}
              className="east-spray"
              cx={s.cx} cy={s.cy} r={s.r}
              fill="rgba(255,255,255,0.72)"
              style={{"--sdur":s.dur,"--sdelay":s.delay} as React.CSSProperties}
            />
          ))}
          {/* Foam at base of wave */}
          <path
            d="M420,580 C480,566 540,558 610,552 C654,548 690,548 710,554
               C678,564 634,570 578,574 C510,578 456,574 420,568 Z"
            fill="rgba(255,255,255,0.38)"
          />
        </g>

        {/* ── WAVE 3 — RIGHT SECTION (x 880–1440) ─────────────────── */}
        <g className="east-wave-right">
          {/* Main body */}
          <path
            d="M900,900 L900,520
               C 950,508  998,496  1044,482
               C 1082,470  1114,456  1136,440
               C 1156,424  1162,406  1152,390
               C 1140,374  1118,366  1092,368
               C 1064,370  1042,384  1032,406
               C 1022,428  1028,452  1046,468
               C 1064,484  1092,492  1126,492
               C 1160,492  1200,480  1240,460
               C 1290,436  1340,404  1380,372
               C 1404,354  1424,336  1440,320
               L1440,900 Z"
            fill="url(#waveBodyGrad)"
            opacity="0.90"
          />
          {/* Glassy face */}
          <path
            d="M1092,366 C1100,346 1118,334 1138,332 C1160,330 1178,342 1184,362
               C1190,382 1180,404 1162,414 C1144,424 1122,418 1110,400 Z"
            fill="rgba(40,170,190,0.28)"
          />
          {/* Crest */}
          <path
            d="M900,520 C960,504 1018,488 1072,468 C1108,454 1136,436 1150,414
               C1162,394 1158,372 1140,358"
            stroke="rgba(255,255,255,0.46)"
            strokeWidth="2.2"
            fill="none"
          />
          {/* Foam right */}
          <path
            d="M1440,320 C1412,342 1372,368 1330,390 C1296,408 1268,418 1252,420
               C1280,408 1322,390 1360,368 C1398,346 1426,322 1440,308 Z"
            fill="url(#foamRight)"
          />
        </g>

        {/* ═══════════════════════════════════════════════════════════
            SURFERS ON THE WAVES
            Scale increases as they get closer (3D depth)
        ═══════════════════════════════════════════════════════════ */}

        {/* Rider 1 — on left wave face, mid-distance (scale 0.60) */}
        <g transform="translate(305,504) scale(0.58)" className="east-ride-a" opacity="0.88">
          <RiderFigure />
        </g>

        {/* Rider 2 — on centre wave face, dropping in (scale 0.68) */}
        <g transform="translate(648,480) scale(0.66)" className="east-ride-b" opacity="0.90">
          <RiderFigure />
        </g>

        {/* Rider 3 — on right wave, closest to peak (scale 0.56) */}
        <g transform="translate(1044,456) scale(0.54)" className="east-ride-c" opacity="0.84">
          <RiderFigure />
        </g>

        {/* Paddler — heading out through the whitewater (scale 0.74) */}
        <g transform="translate(178,628) scale(0.72)" className="east-bob-c" opacity="0.78">
          <PaddlerFigure />
        </g>

        {/* ── FOREGROUND WHITEWATER — rushes toward viewer ──────────── */}
        {/* Shallow water green tint */}
        <path
          d="M0,720 Q360,706 720,712 Q1080,718 1440,708 L1440,900 L0,900 Z"
          fill="rgba(28,100,80,0.40)"
        />
        {/* White foam bands */}
        <path
          className="east-foam-pulse"
          d="M0,730 Q180,718 360,724 Q540,730 720,722 Q900,714 1080,720 Q1260,726 1440,716
             L1440,760 Q1260,768 1080,762 Q900,756 720,764 Q540,772 360,764 Q180,756 0,764 Z"
          fill="rgba(255,255,255,0.52)"
        />
        <path
          className="east-foam-pulse-2"
          d="M0,772 Q180,764 360,770 Q540,776 720,768 Q900,760 1080,766 Q1260,772 1440,762
             L1440,795 Q1260,800 1080,796 Q900,790 720,798 Q540,806 360,800 Q180,794 0,800 Z"
          fill="rgba(255,255,255,0.36)"
        />
        <path
          d="M0,808 Q360,800 720,806 Q1080,812 1440,802 L1440,900 L0,900 Z"
          fill="rgba(255,255,255,0.20)"
        />
        <path
          d="M0,838 Q360,832 720,837 Q1080,842 1440,834 L1440,900 L0,900 Z"
          fill="rgba(255,255,255,0.12)"
        />
        <path
          d="M0,864 Q360,860 720,863 Q1080,866 1440,860 L1440,900 L0,900 Z"
          fill="rgba(255,255,255,0.07)"
        />

        {/* Water shimmer reflections */}
        <path
          d="M200,510 Q280,504 340,510"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M860,470 Q940,464 1010,470"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1.0"
          fill="none"
        />
        <path
          d="M1180,440 Q1240,435 1290,440"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="0.9"
          fill="none"
        />

        {/* Bottom depth fade */}
        <rect x="0" y="840" width="1440" height="60"
          fill="url(#deepWater)"
          opacity="0.7"
        />
      </svg>

      {/* ── BOTTOM VIGNETTE ─────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20"
        style={{
          background: "linear-gradient(to top, rgba(4,18,34,0.60), transparent)",
        }}
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import OceanBackground from "./components/OceanBackground";
import MemoryCreator from "./components/MemoryCreator";
import MemoryVideoPlayer from "./components/MemoryVideoPlayer";
import WaveLoader from "./components/WaveLoader";

interface MemoryResult {
  id: string;
  title: string;
  narrative: string;
  imageUrl?: string;
  videoUrl?: string;
  videoError?: string;
  createdAt: string;
}

type Stage = "hero" | "create" | "loading" | "player";

/* ─── tiny icon helpers ─────────────────────────────────────── */
function IconCamera() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  );
}
function IconEdit() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );
}
function IconFilm() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
      <line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/>
      <line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/>
      <line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/>
      <line x1="17" y1="7" x2="22" y2="7"/>
    </svg>
  );
}
function IconShare() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  );
}
function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}

export default function Home() {
  const [stage, setStage] = useState<Stage>("hero");
  const [memory, setMemory] = useState<MemoryResult | null>(null);

  const handleMemoryCreated = (result: MemoryResult) => {
    setMemory(result);
    setStage("player");
  };

  const handleLoading = (loading: boolean) => {
    if (loading) setStage("loading");
  };

  const handleReset = () => {
    setMemory(null);
    setStage("hero");
  };

  return (
    <main className="relative min-h-screen bg-white">
      {/* Always-visible illustration background */}
      <OceanBackground />

      {/* ═══════════════════════════════════════════════════════════
          STICKY NAV — visible on hero only
      ═══════════════════════════════════════════════════════════ */}
      {stage === "hero" && (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 nav-blur">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-sm"
              style={{ background: "linear-gradient(135deg, #3B82F6, #F97316)" }}
            >
              M
            </div>
            <span className="font-bold text-lg text-surf-text tracking-tight">Memora</span>
          </div>

          {/* Centre links */}
          <div className="hidden md:flex items-center gap-8">
            {["Features", "How it works", "Examples"].map((link) => (
              <button
                key={link}
                className="text-sm text-surf-subtext hover:text-surf-text transition-colors duration-200 font-medium"
              >
                {link}
              </button>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => setStage("create")}
            className="text-sm font-semibold px-5 py-2.5 rounded-xl text-white shadow-sm transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ background: "linear-gradient(135deg, #3B82F6 0%, #F97316 100%)" }}
          >
            Get started
          </button>
        </nav>
      )}

      {/* Content layer */}
      <div className="relative z-10">

        {/* ═══════════════════════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════════════════════ */}
        {stage === "hero" && (
          <div>
            {/* ── Above-fold hero ─────────────────────────────────── */}
            <section className="min-h-screen flex flex-col items-center justify-start pt-32 pb-0 px-6 text-center">

              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6 animate-fade-up"
                style={{
                  background: "rgba(59,130,246,0.12)",
                  color: "#1D4ED8",
                  border: "1px solid rgba(59,130,246,0.30)",
                  animationDelay: "0.05s",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-surf-teal animate-pulse inline-block" />
                AI-Powered Memory Maker
              </div>

              {/* Headline */}
              <h1
                className="font-display font-black text-surf-text animate-fade-up"
                style={{
                  fontSize: "clamp(2.6rem, 6vw, 5.2rem)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.035em",
                  maxWidth: "820px",
                  animationDelay: "0.12s",
                }}
              >
                Bring your memories<br />
                <span
                  style={{
                    backgroundImage: "linear-gradient(135deg, #3B82F6 20%, #F97316 80%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  back to life.
                </span>
              </h1>

              {/* Sub-copy */}
              <p
                className="mt-5 text-surf-subtext font-normal leading-relaxed animate-fade-up"
                style={{
                  fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
                  maxWidth: "520px",
                  animationDelay: "0.22s",
                }}
              >
                Upload a photo or describe a moment. Memora transforms it into
                a beautiful, personalised video — the way it actually felt.
              </p>

              {/* CTA buttons */}
              <div
                className="flex flex-col sm:flex-row items-center gap-4 mt-8 animate-fade-up"
                style={{ animationDelay: "0.32s" }}
              >
                {/* Primary */}
                <button
                  onClick={() => setStage("create")}
                  className="group flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-white font-semibold text-base shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, #3DCFC2 0%, #7B5EA7 100%)",
                    boxShadow: "0 8px 30px rgba(59,130,246,0.35)",
                  }}
                >
                  Relive a memory
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <IconArrow />
                  </span>
                </button>

                {/* Secondary */}
                <button
                  onClick={() => setStage("create")}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-base transition-all duration-200 hover:bg-surf-subtle"
                  style={{
                    color: "#1A2340",
                    border: "1.5px solid rgba(26,36,64,0.14)",
                  }}
                >
                  See how it works
                </button>
              </div>

              {/* Trust line */}
              <p
                className="mt-5 text-xs text-surf-subtext/60 animate-fade-up"
                style={{ animationDelay: "0.40s" }}
              >
                No account needed · Free to try · 30-second results
              </p>

              {/* Scroll hint */}
              <div
                className="mt-10 flex flex-col items-center gap-1 text-surf-subtext/40 animate-fade-up"
                style={{ animationDelay: "0.55s" }}
              >
                <span className="text-[10px] uppercase tracking-[0.18em]">scroll</span>
                <div className="w-px h-7 bg-gradient-to-b from-surf-subtext/30 to-transparent" />
              </div>
            </section>

            {/* ── Feature cards ──────────────────────────────────────
                Positioned to appear below the wave illustration
            ─────────────────────────────────────────────────────── */}
            <section className="relative z-20 px-6 pt-[520px] pb-24 md:pt-[580px]">
              <div className="max-w-5xl mx-auto">

                {/* Section label */}
                <div className="text-center mb-12">
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-3"
                    style={{ color: "#3B82F6" }}
                  >
                    Everything you need
                  </p>
                  <h2
                    className="font-display font-black text-surf-text"
                    style={{
                      fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                      letterSpacing: "-0.025em",
                    }}
                  >
                    Your memories deserve more
                    <br />
                    than a photo album.
                  </h2>
                </div>

                {/* 4 feature cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {[
                    {
                      icon: <IconCamera />,
                      title: "Photo upload",
                      desc: "Drag in any photo — we extract the emotion and context automatically.",
                      accent: "#3B82F6",
                      bg: "rgba(59,130,246,0.08)",
                    },
                    {
                      icon: <IconEdit />,
                      title: "Describe it",
                      desc: "No photo? Just write what you remember. Every detail matters.",
                      accent: "#F97316",
                      bg: "rgba(249,115,22,0.08)",
                    },
                    {
                      icon: <IconFilm />,
                      title: "Memory video",
                      desc: "AI crafts a short, beautiful video that captures the feeling of that moment.",
                      accent: "#FDBA74",
                      bg: "rgba(253,186,116,0.12)",
                    },
                    {
                      icon: <IconShare />,
                      title: "Share & keep",
                      desc: "Download or share with anyone. Your memory, your story, forever.",
                      accent: "#2563EB",
                      bg: "rgba(37,99,235,0.08)",
                    },
                  ].map(({ icon, title, desc, accent, bg }) => (
                    <div
                      key={title}
                      className="rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                      style={{
                        background: "rgba(255,255,255,0.80)",
                        backdropFilter: "blur(16px)",
                        border: "1.5px solid rgba(255,255,255,0.90)",
                        boxShadow: "0 4px 24px rgba(29,78,216,0.08)",
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: bg, color: accent }}
                      >
                        {icon}
                      </div>
                      <div>
                        <h3
                          className="font-bold text-surf-text mb-1"
                          style={{ fontSize: "1rem" }}
                        >
                          {title}
                        </h3>
                        <p className="text-sm text-surf-subtext leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* How it works — 3 steps */}
                <div className="mt-20 text-center mb-12">
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-3"
                    style={{ color: "#F97316" }}
                  >
                    Three steps
                  </p>
                  <h2
                    className="font-display font-black text-surf-text"
                    style={{
                      fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                      letterSpacing: "-0.025em",
                    }}
                  >
                    As easy as catching a wave.
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                  {/* Connecting line (desktop) */}
                  <div
                    className="hidden md:block absolute top-9 left-[calc(16.6%+16px)] right-[calc(16.6%+16px)] h-px"
                    style={{ background: "linear-gradient(90deg, #3B82F6, #F97316)" }}
                  />

                  {[
                    {
                      step: "01",
                      title: "Upload or describe",
                      desc: "Add a photo or write a few sentences about your memory.",
                      color: "#3B82F6",
                    },
                    {
                      step: "02",
                      title: "AI works its magic",
                      desc: "Our model understands the emotion, context, and story of the moment.",
                      color: "#F97316",
                    },
                    {
                      step: "03",
                      title: "Watch & share",
                      desc: "Receive a personalised video ready to download or share instantly.",
                      color: "#FDBA74",
                    },
                  ].map(({ step, title, desc, color }) => (
                    <div key={step} className="flex flex-col items-center text-center gap-4">
                      <div
                        className="w-[52px] h-[52px] rounded-full flex items-center justify-center font-black text-lg text-white shadow-md relative z-10"
                        style={{ background: color }}
                      >
                        {step}
                      </div>
                      <h3 className="font-bold text-surf-text" style={{ fontSize: "1.05rem" }}>
                        {title}
                      </h3>
                      <p className="text-sm text-surf-subtext leading-relaxed max-w-[200px]">
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Final CTA */}
                <div className="mt-20 text-center">
                  <div
                    className="inline-flex flex-col items-center gap-6 py-12 px-10 rounded-3xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(249,115,22,0.10) 100%)",
                      border: "1.5px solid rgba(59,130,246,0.22)",
                    }}
                  >
                    <h2
                      className="font-display font-black text-surf-text"
                      style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", letterSpacing: "-0.025em" }}
                    >
                      Ready to relive your favourite moments?
                    </h2>
                    <button
                      onClick={() => setStage("create")}
                      className="group flex items-center gap-2.5 px-8 py-4 rounded-2xl text-white font-bold text-base shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
                      style={{
                        background: "linear-gradient(135deg, #3DCFC2 0%, #7B5EA7 100%)",
                        boxShadow: "0 8px 30px rgba(59,130,246,0.30)",
                      }}
                    >
                      Start for free
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        <IconArrow />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════
            CREATE
        ═══════════════════════════════════════════════════════════ */}
        {stage === "create" && (
          <div className="flex flex-col items-center justify-center min-h-screen px-6 py-16">
            <button
              onClick={() => setStage("hero")}
              className="mb-8 flex items-center gap-2 text-surf-subtext hover:text-surf-text text-sm transition-colors font-medium"
            >
              ← Back to shore
            </button>

            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-display font-black text-surf-text mb-3" style={{ letterSpacing: "-0.025em" }}>
                What&apos;s your memory?
              </h2>
              <p className="text-surf-subtext text-sm md:text-base max-w-sm mx-auto leading-relaxed">
                Upload a photo from that moment, or describe it in your own words.
              </p>
            </div>

            <MemoryCreator
              onMemoryCreated={handleMemoryCreated}
              onLoading={handleLoading}
            />
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════
            LOADING
        ═══════════════════════════════════════════════════════════ */}
        {stage === "loading" && (
          <div className="flex flex-col items-center justify-center min-h-screen px-6">
            <div
              className="rounded-3xl p-10 max-w-sm w-full shadow-2xl"
              style={{
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(20px)",
                border: "1.5px solid rgba(59,130,246,0.20)",
              }}
            >
              <WaveLoader />
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════
            PLAYER
        ═══════════════════════════════════════════════════════════ */}
        {stage === "player" && memory && (
          <div className="flex flex-col items-center justify-center min-h-screen px-6 py-16">
            <div className="text-center mb-8 animate-fade-up">
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4 text-xs font-semibold uppercase tracking-widest"
                style={{
                  background: "rgba(61,207,194,0.12)",
                  color: "#1A9A8E",
                  border: "1px solid rgba(59,130,246,0.25)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-surf-teal animate-pulse inline-block" />
                Memory created
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-black text-surf-text" style={{ letterSpacing: "-0.02em" }}>
                Here&apos;s your memory
              </h2>
              <p className="text-surf-subtext text-sm mt-2">
                Sit back and let it wash over you 🌊
              </p>
            </div>

            <MemoryVideoPlayer memory={memory} onReset={handleReset} />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 pointer-events-none">
        <div className="flex justify-center pb-4">
          <p className="text-[11px] text-surf-subtext/40 font-medium">
            Memora · Powered by the tide
          </p>
        </div>
      </footer>
    </main>
  );
}

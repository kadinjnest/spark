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
  createdAt: string;
}

type Stage = "hero" | "create" | "loading" | "player";

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
    <main className="relative min-h-screen">
      {/* Always-on ocean background */}
      <OceanBackground />

      {/* Content layer */}
      <div className="relative z-10">
        {/* ─── HERO ─────────────────────────────────────────────────── */}
        {stage === "hero" && (
          <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
            {/* Logo mark */}
            <div className="mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-ocean-bright to-ocean-teal shadow-lg shadow-ocean-bright/30 mb-4">
                <span className="text-4xl">🌊</span>
              </div>
            </div>

            {/* Brand name */}
            <h1
              className="text-6xl md:text-8xl font-display font-bold text-white text-ocean-glow mb-3 animate-fade-up"
              style={{ animationDelay: "0.2s", letterSpacing: "-0.02em" }}
            >
              Memora
            </h1>

            {/* Tagline */}
            <p
              className="text-ocean-foam/80 text-lg md:text-2xl font-display italic mb-3 animate-fade-up"
              style={{ animationDelay: "0.35s" }}
            >
              The wave that brings you back
            </p>

            <p
              className="text-white/40 text-sm md:text-base max-w-md mb-12 leading-relaxed animate-fade-up"
              style={{ animationDelay: "0.5s" }}
            >
              Upload a photo or describe a memory. We&apos;ll bring it back to life as a beautiful story — the way it actually felt.
            </p>

            {/* CTA buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 animate-fade-up"
              style={{ animationDelay: "0.65s" }}
            >
              <button
                onClick={() => setStage("create")}
                className="group relative px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden shadow-lg hover:shadow-ocean-bright/40 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-ocean-teal via-ocean-bright to-sunset-orange" />
                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center gap-2 text-base">
                  <span className="text-xl">🏄</span>
                  Relive a Memory
                </span>
              </button>

              <button
                onClick={() => setStage("create")}
                className="px-8 py-4 rounded-2xl text-ocean-foam/80 border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all duration-300 text-base"
              >
                See How It Works
              </button>
            </div>

            {/* Decorative feature pills */}
            <div
              className="flex flex-wrap justify-center gap-3 mt-16 animate-fade-up"
              style={{ animationDelay: "0.8s" }}
            >
              {[
                { icon: "📸", label: "Photo Upload" },
                { icon: "✍️", label: "Text Memories" },
                { icon: "🎬", label: "Memory Videos" },
                { icon: "🔗", label: "Share Moments" },
              ].map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-white/60 text-sm"
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>

            {/* Scroll indicator */}
            <div
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 animate-fade-up"
              style={{ animationDelay: "1s" }}
            >
              <span className="text-xs uppercase tracking-widest">scroll</span>
              <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
            </div>
          </div>
        )}

        {/* ─── CREATE ───────────────────────────────────────────────── */}
        {stage === "create" && (
          <div className="flex flex-col items-center justify-center min-h-screen px-6 py-16">
            {/* Back button */}
            <button
              onClick={() => setStage("hero")}
              className="mb-8 flex items-center gap-2 text-ocean-foam/50 hover:text-ocean-foam/80 text-sm transition-colors"
            >
              ← Back to shore
            </button>

            {/* Section header */}
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
                What&apos;s your memory?
              </h2>
              <p className="text-white/45 text-sm md:text-base max-w-sm mx-auto">
                Upload a photo from that moment, or describe it in your own words.
              </p>
            </div>

            {/* Creator form */}
            <MemoryCreator
              onMemoryCreated={handleMemoryCreated}
              onLoading={handleLoading}
            />
          </div>
        )}

        {/* ─── LOADING ──────────────────────────────────────────────── */}
        {stage === "loading" && (
          <div className="flex flex-col items-center justify-center min-h-screen px-6">
            <div className="glass rounded-3xl p-10 max-w-sm w-full shadow-2xl shadow-black/40">
              <WaveLoader />
            </div>
          </div>
        )}

        {/* ─── PLAYER ───────────────────────────────────────────────── */}
        {stage === "player" && memory && (
          <div className="flex flex-col items-center justify-center min-h-screen px-6 py-16">
            {/* Header */}
            <div className="text-center mb-8 animate-fade-up">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-4 text-ocean-foam/60 text-xs uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-ocean-teal animate-pulse" />
                Memory Created
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
                Here&apos;s your memory
              </h2>
              <p className="text-white/40 text-sm mt-2">
                Sit back and let it wash over you 🌊
              </p>
            </div>

            <MemoryVideoPlayer memory={memory} onReset={handleReset} />
          </div>
        )}
      </div>

      {/* Persistent footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-10 pointer-events-none">
        <div className="flex justify-center pb-4">
          <p className="text-white/15 text-xs">
            Memora · Powered by the tide
          </p>
        </div>
      </footer>
    </main>
  );
}

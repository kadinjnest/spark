"use client";

import { useEffect, useRef, useState } from "react";

interface MemoryResult {
  id: string;
  title: string;
  narrative: string;
  imageUrl?: string;
  videoUrl?: string;
  createdAt: string;
}

interface Props {
  memory: MemoryResult;
  onReset: () => void;
}

// Ocean-themed abstract background when no image is provided
function OceanPlaceholder() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-ocean-mid via-ocean-bright to-ocean-teal">
      {/* Abstract wave shapes */}
      <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 300">
        <path
          d="M0,100 Q100,60 200,100 Q300,140 400,100 L400,300 L0,300 Z"
          fill="rgba(255,255,255,0.1)"
        />
        <path
          d="M0,150 Q100,110 200,150 Q300,190 400,150 L400,300 L0,300 Z"
          fill="rgba(255,255,255,0.08)"
        />
        <path
          d="M0,200 Q100,170 200,200 Q300,230 400,200 L400,300 L0,300 Z"
          fill="rgba(255,255,255,0.06)"
        />
      </svg>
      {/* Shell / Star decoration */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-8xl opacity-20">🌊</div>
      </div>
    </div>
  );
}

function TypewriterText({ text, speed = 28 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    indexRef.current = 0;

    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        const next = text.slice(0, indexRef.current + 1);
        setDisplayed(next);
        indexRef.current++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <p
      className={`text-white/90 text-sm md:text-base leading-relaxed font-display italic ${!done ? "typewriter-cursor" : ""}`}
    >
      {displayed}
    </p>
  );
}

export default function MemoryVideoPlayer({ memory, onReset }: Props) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showNarrative, setShowNarrative] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const DURATION_MS = 30000; // 30s "video" duration

  useEffect(() => {
    // Brief delay before showing narrative
    const t = setTimeout(() => setShowNarrative(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return p + (100 / (DURATION_MS / 80));
        });
      }, 80);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (progress >= 100) {
      setProgress(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((p) => !p);
    }
  };

  const handleReplay = () => {
    setProgress(0);
    setIsPlaying(true);
    setShowNarrative(false);
    setTimeout(() => setShowNarrative(true), 500);
  };

  const handleShare = () => {
    setShowShare(true);
    const text = `"${memory.title}" — a memory from Memora`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const formattedDate = new Date(memory.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-up">
      {/* Player frame */}
      <div className="glass rounded-3xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10">
        {/* Image / visual area */}
        <div className="relative h-64 md:h-96 overflow-hidden bg-ocean-dark">
          {memory.videoUrl ? (
            <>
              {/* Generated video — plays automatically and loops */}
              <video
                src={memory.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: isPlaying ? "none" : "brightness(0.6)" }}
              />
              {/* Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />
            </>
          ) : memory.imageUrl ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={memory.imageUrl}
                alt={memory.title}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  animation: isPlaying
                    ? "kenburns 20s ease-in-out infinite alternate"
                    : "none",
                }}
              />
              {/* Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />
            </>
          ) : (
            <OceanPlaceholder />
          )}

          {/* Wave overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden h-20 pointer-events-none">
            <svg
              viewBox="0 0 800 60"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                d="M0,30 Q100,10 200,30 Q300,50 400,30 Q500,10 600,30 Q700,50 800,30 L800,60 L0,60 Z"
                fill="rgba(4,13,26,0.9)"
              />
            </svg>
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-white font-display text-xl md:text-2xl font-bold drop-shadow-lg leading-tight">
                  {memory.title}
                </h2>
                <p className="text-white/50 text-xs mt-1 flex items-center gap-1">
                  <span>🐚</span>
                  {formattedDate}
                </p>
              </div>
              {/* Live badge */}
              {isPlaying && (
                <div className="flex items-center gap-1.5 bg-sunset-orange/20 border border-sunset-orange/40 rounded-full px-3 py-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-sunset-orange animate-pulse" />
                  <span className="text-sunset-orange text-xs font-medium">LIVE</span>
                </div>
              )}
            </div>
          </div>

          {/* Play/Pause overlay button */}
          <button
            onClick={handlePlayPause}
            className="absolute inset-0 flex items-center justify-center group opacity-0 hover:opacity-100 transition-opacity"
          >
            <div className="w-14 h-14 rounded-full bg-black/40 flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
              <span className="text-white text-2xl">
                {progress >= 100 ? "↩" : isPlaying ? "⏸" : "▶"}
              </span>
            </div>
          </button>
        </div>

        {/* Progress bar */}
        <div className="relative h-1.5 bg-ocean-dark/80">
          <div
            className="absolute left-0 top-0 h-full progress-bar transition-none rounded-r-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Narrative section */}
        <div className="p-6 md:p-8 bg-gradient-to-b from-ocean-deep/95 to-ocean-dark/95">
          {/* Section label */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-ocean-foam/40 text-xs uppercase tracking-widest flex items-center gap-1.5">
              <span>🌊</span> Your Memory Story
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Narrative text */}
          <div className="min-h-[120px]">
            {showNarrative && (
              <TypewriterText text={memory.narrative} speed={22} />
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="px-6 pb-6 md:px-8 md:pb-8 flex flex-wrap gap-3 border-t border-white/5 pt-5">
          {/* Replay */}
          <button
            onClick={handleReplay}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ocean-mid/40 hover:bg-ocean-mid/60 border border-white/10 text-ocean-foam text-sm transition-all hover:scale-105"
          >
            <span>↩</span>
            Replay
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ocean-teal/20 hover:bg-ocean-teal/35 border border-ocean-teal/30 text-ocean-teal text-sm transition-all hover:scale-105"
          >
            <span>{copied ? "✓" : "↗"}</span>
            {copied ? "Copied!" : "Share Memory"}
          </button>

          {/* Spacer */}
          <div className="flex-1" />

          {/* New memory */}
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sunset-orange/20 to-sunset-coral/20 hover:from-sunset-orange/35 hover:to-sunset-coral/35 border border-sunset-orange/30 text-sunset-orange text-sm transition-all hover:scale-105"
          >
            <span>🏄</span>
            New Memory
          </button>
        </div>
      </div>

      {/* Share toast */}
      {showShare && copied && (
        <div className="mt-4 text-center animate-fade-up">
          <span className="text-ocean-foam/60 text-sm">
            Link copied to clipboard 🌊
          </span>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "Bringing your memory to life…",
  "Animating the moment…",
  "The tide is bringing it back…",
  "Generating your memory video…",
  "Letting the scene breathe again…",
  "Almost there — catching the curl…",
];

export default function WaveLoader() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 2200);

    const progressTimer = setInterval(() => {
      setProgress((p) => {
        if (p >= 99) return p;
        if (p >= 95) return p + 0.03;
        if (p >= 88) return p + 0.15;
        return p + (Math.random() * 4 + 1);
      });
    }, 160);

    return () => {
      clearInterval(msgTimer);
      clearInterval(progressTimer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[420px] gap-8 px-8">
      {/* Surfboard animation */}
      <div className="relative w-48 h-32">
        {/* Ocean waves */}
        <svg
          viewBox="0 0 192 40"
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,20 Q24,8 48,20 Q72,32 96,20 Q120,8 144,20 Q168,32 192,20 L192,40 L0,40 Z"
            fill="rgba(21,101,168,0.5)"
            className="animate-wave-fast"
          />
          <path
            d="M0,25 Q32,12 64,25 Q96,38 128,25 Q160,12 192,25 L192,40 L0,40 Z"
            fill="rgba(14,52,96,0.7)"
            className="animate-wave-medium"
          />
        </svg>

        {/* Surfboard */}
        <div
          className="absolute left-1/2 -translate-x-1/2 animate-surfboard-float"
          style={{ bottom: "20px" }}
        >
          <svg
            width="80"
            height="32"
            viewBox="0 0 80 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Board */}
            <ellipse cx="40" cy="22" rx="38" ry="8" fill="#ff7043" />
            <ellipse cx="40" cy="21" rx="30" ry="5" fill="#ff9a3c" opacity="0.6" />
            {/* Fin */}
            <path d="M55,26 L60,36 L50,36 Z" fill="#c0392b" />
            {/* Rider */}
            <ellipse cx="35" cy="15" rx="6" ry="8" fill="#ffd700" />
            <circle cx="35" cy="7" r="5" fill="#ffd700" />
            {/* Arms */}
            <path
              d="M29,13 Q22,9 25,17"
              stroke="#ffd700"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M41,13 Q48,9 45,17"
              stroke="#ffd700"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* Message */}
      <div className="text-center">
        <p
          key={msgIndex}
          className="text-ocean-foam text-lg font-display italic animate-fade-up"
        >
          {MESSAGES[msgIndex]}
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-xs">
        <div className="w-full h-2 rounded-full bg-ocean-mid/40 overflow-hidden">
          <div
            className="h-full rounded-full progress-bar transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 99)}%` }}
          />
        </div>
        <p className="text-center text-ocean-foam/50 text-xs mt-2 font-mono">
          {Math.min(Math.round(progress), 99)}%
        </p>
      </div>

      {/* Decorative dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-ocean-light"
            style={{
              animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

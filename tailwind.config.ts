import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Illustration palette (new) ─────────────────────── */
        surf: {
          teal:         "#3B82F6",
          "teal-mid":   "#2563EB",
          "teal-dark":  "#1D4ED8",
          "teal-pale":  "#BFDBFE",
          pink:         "#FDBA74",
          "pink-light": "#FED7AA",
          "pink-dark":  "#FB923C",
          purple:       "#F97316",
          "purple-dark":"#EA580C",
          "purple-body":"#C2410C",
          offwhite:     "#F0F6FF",
          text:         "#1A2340",
          subtext:      "#6B7A9A",
          subtle:       "#DBEAFE",
        },
        /* ── Legacy tokens for create/loading/player stages ─── */
        ocean: {
          deep:   "#040d1a",
          dark:   "#0a1f3d",
          mid:    "#0e3460",
          bright: "#1565a8",
          light:  "#2196c4",
          teal:   "#17a589",
          foam:   "#a8dce8",
        },
        sand: {
          light: "#fff9e6",
          mid:   "#f5deb3",
          dark:  "#deb887",
          warm:  "#c8a96a",
        },
        sunset: {
          orange: "#ff7043",
          coral:  "#f7627b",
          gold:   "#ffd700",
          peach:  "#ffb347",
        },
        wave: {
          white: "rgba(255,255,255,0.85)",
          foam:  "rgba(255,255,255,0.4)",
        },
      },
      fontFamily: {
        display: ['"Inter"', '"SF Pro Display"', "system-ui", "sans-serif"],
        sans:    ['"Inter"', '"SF Pro Text"',    "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "ocean-gradient": "linear-gradient(180deg, #1a6ba5 0%, #0e3460 40%, #040d1a 100%)",
        "sky-gradient": "linear-gradient(180deg, #ff9a3c 0%, #f05454 15%, #c0392b 25%, #7b2d8b 40%, #1565a8 60%, #0e3460 80%)",
        "shimmer": "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
      },
      animation: {
        "wave-slow": "wave-move 14s linear infinite",
        "wave-medium": "wave-move 9s linear infinite reverse",
        "wave-fast": "wave-move 5s linear infinite",
        "wave-foam": "wave-move 3.5s linear infinite reverse",
        "bubble-rise": "bubble-rise var(--duration, 6s) ease-in infinite",
        "sun-pulse": "sun-pulse 4s ease-in-out infinite",
        "kenburns": "kenburns 20s ease-in-out infinite alternate",
        "kenburns-alt": "kenburns-alt 20s ease-in-out infinite alternate",
        "surfboard-float": "surfboard-float 3s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "ripple": "ripple 1s ease-out forwards",
        "shimmer-wave": "shimmer-wave 2s linear infinite",
        "progress-wave": "progress-wave 2s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
      },
      keyframes: {
        "wave-move": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "bubble-rise": {
          "0%": { transform: "translateY(0) scale(1)", opacity: "0" },
          "10%": { opacity: "0.6" },
          "90%": { opacity: "0.2" },
          "100%": { transform: "translateY(-80vh) scale(1.3)", opacity: "0" },
        },
        "sun-pulse": {
          "0%, 100%": { boxShadow: "0 0 40px 20px rgba(255,180,50,0.35), 0 0 80px 40px rgba(255,120,30,0.2)" },
          "50%": { boxShadow: "0 0 70px 35px rgba(255,200,70,0.5), 0 0 130px 65px rgba(255,140,40,0.3)" },
        },
        "kenburns": {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "100%": { transform: "scale(1.18) translate(-3%, -2%)" },
        },
        "kenburns-alt": {
          "0%": { transform: "scale(1.08) translate(2%, 1%)" },
          "100%": { transform: "scale(1) translate(-2%, -2%)" },
        },
        "surfboard-float": {
          "0%, 100%": { transform: "translateY(0) rotate(-4deg)" },
          "35%": { transform: "translateY(-18px) rotate(3deg)" },
          "70%": { transform: "translateY(-10px) rotate(-6deg)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "ripple": {
          "0%": { transform: "scale(0.5)", opacity: "0.8" },
          "100%": { transform: "scale(3.5)", opacity: "0" },
        },
        "shimmer-wave": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "progress-wave": {
          "0%, 100%": { transform: "scaleX(1) scaleY(1)" },
          "50%": { transform: "scaleX(1.02) scaleY(1.3)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.8", filter: "blur(0px)" },
          "50%": { opacity: "1", filter: "blur(2px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;

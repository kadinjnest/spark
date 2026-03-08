"use client";

import { useCallback, useRef, useState } from "react";

type Mode = "image" | "text";

interface MemoryResult {
  id: string;
  title: string;
  narrative: string;
  imageUrl?: string;
  videoUrl?: string;
  createdAt: string;
}

interface Props {
  onMemoryCreated: (result: MemoryResult) => void;
  onLoading: (loading: boolean) => void;
}

const PLACEHOLDERS = [
  "The summer we drove down the coast with the windows down…",
  "That morning at the beach when the water was glass-flat…",
  "New Year's Eve on the rooftop, the city all lit up below…",
  "My grandmother's kitchen on Sunday mornings…",
  "The last day of school, running through the sprinklers…",
];

export default function MemoryCreator({ onMemoryCreated, onLoading }: Props) {
  const [mode, setMode] = useState<Mode>("image");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoPrompt, setVideoPrompt] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [placeholder] = useState(
    () => PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)]
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressImage = useCallback((dataUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const MAX = 1280;
        let w = img.naturalWidth;
        let h = img.naturalHeight;
        if (w > MAX || h > MAX) {
          if (w >= h) { h = Math.round((h * MAX) / w); w = MAX; }
          else { w = Math.round((w * MAX) / h); h = MAX; }
        }
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.src = dataUrl;
    });
  }, []);

  const handleFile = useCallback((file: File) => {
    setError(null);
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/heic"];
    if (!allowed.includes(file.type) && !file.name.match(/\.(jpg|jpeg|png|webp|heic)$/i)) {
      setError("Please upload a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setError("Image must be under 20 MB.");
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const raw = e.target?.result as string;
      const compressed = await compressImage(raw);
      setImagePreview(compressed);
    };
    reader.readAsDataURL(file);
  }, [compressImage]);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === "image" && !imageFile) {
      setError("Please upload a photo first.");
      return;
    }
    if (mode === "text" && !description.trim()) {
      setError("Please describe your memory.");
      return;
    }

    onLoading(true);

    try {
      const res = await fetch("/api/memories/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim() || undefined,
          description: description.trim() || imageFile?.name,
          imageBase64: imagePreview ?? undefined,
          videoPrompt: videoPrompt.trim() || undefined,
        }),
      });

      if (!res.ok) throw new Error("Something went wrong.");
      const data = await res.json();

      onMemoryCreated({
        ...data,
        imageUrl: imagePreview ?? undefined,
      });
    } catch {
      setError("Couldn't catch that wave. Please try again.");
      onLoading(false);
    }
  };

  return (
    <div className="glass rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/40 animate-fade-up w-full max-w-xl mx-auto">
      {/* Mode toggle */}
      <div className="flex rounded-2xl bg-ocean-dark/60 p-1 mb-8 gap-1">
        <button
          onClick={() => setMode("image")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
            mode === "image"
              ? "bg-gradient-to-r from-ocean-bright to-ocean-teal text-white shadow-lg"
              : "text-ocean-foam/60 hover:text-ocean-foam/90"
          }`}
        >
          <span className="text-lg">📸</span>
          Upload Photo
        </button>
        <button
          onClick={() => setMode("text")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
            mode === "text"
              ? "bg-gradient-to-r from-ocean-bright to-ocean-teal text-white shadow-lg"
              : "text-ocean-foam/60 hover:text-ocean-foam/90"
          }`}
        >
          <span className="text-lg">✍️</span>
          Write Memory
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-ocean-foam/70 text-xs font-medium uppercase tracking-widest mb-2">
            Memory Title <span className="text-ocean-foam/30">(optional)</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give this memory a name…"
            maxLength={80}
            className="w-full bg-ocean-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-ocean-light/60 focus:ring-1 focus:ring-ocean-light/30 transition-all"
          />
        </div>

        {/* Video direction prompt — only shown in image mode */}
        {mode === "image" && (
          <div>
            <label className="block text-ocean-foam/70 text-xs font-medium uppercase tracking-widest mb-2">
              Video Direction{" "}
              <span className="text-ocean-foam/30">(optional — guides the motion)</span>
            </label>
            <textarea
              value={videoPrompt}
              onChange={(e) => setVideoPrompt(e.target.value)}
              placeholder="e.g. 'slow cinematic zoom out, golden hour light, waves lapping gently' or 'dynamic action, board spray, surfer carving turns'…"
              rows={2}
              maxLength={300}
              className="w-full bg-ocean-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm resize-none focus:outline-none focus:border-ocean-light/60 focus:ring-1 focus:ring-ocean-light/30 transition-all leading-relaxed"
            />
            <p className="text-right text-white/20 text-xs mt-1">
              {videoPrompt.length}/300
            </p>
          </div>
        )}

        {/* Image upload */}
        {mode === "image" && (
          <div>
            <label className="block text-ocean-foam/70 text-xs font-medium uppercase tracking-widest mb-2">
              Your Photo
            </label>
            <div
              className={`drop-zone relative border-2 border-dashed rounded-2xl transition-all duration-300 ${
                dragOver
                  ? "border-ocean-teal bg-ocean-teal/10"
                  : "border-white/15 hover:border-ocean-light/40 hover:bg-white/[0.02]"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onInputChange}
                className="hidden"
              />

              {imagePreview ? (
                <div className="relative rounded-2xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="Memory preview"
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <span className="text-white text-xs font-medium truncate">
                      {imageFile?.name}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                      className="text-white/70 hover:text-white text-xs bg-black/30 rounded-lg px-2 py-1 transition"
                    >
                      Change
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-14 px-6 cursor-pointer">
                  <div className="text-5xl mb-4 opacity-60">🌊</div>
                  <p className="text-white/50 text-sm text-center">
                    Drag & drop your photo here, or{" "}
                    <span className="text-ocean-light underline underline-offset-2">
                      browse
                    </span>
                  </p>
                  <p className="text-white/25 text-xs mt-2">
                    JPG, PNG, WebP · up to 20 MB
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Text input */}
        {mode === "text" && (
          <div>
            <label className="block text-ocean-foam/70 text-xs font-medium uppercase tracking-widest mb-2">
              Describe Your Memory
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={placeholder}
              rows={5}
              maxLength={800}
              className="w-full bg-ocean-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm resize-none focus:outline-none focus:border-ocean-light/60 focus:ring-1 focus:ring-ocean-light/30 transition-all leading-relaxed"
            />
            <p className="text-right text-white/20 text-xs mt-1">
              {description.length}/800
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
            <span className="text-lg">🚫</span>
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="group relative w-full py-4 rounded-2xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-ocean-bright/30"
        >
          {/* Animated gradient bg */}
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-teal via-ocean-bright to-sunset-orange opacity-90 group-hover:opacity-100 transition-opacity" />
          {/* Shimmer */}
          <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
          {/* Ripple hint */}
          <div className="absolute inset-0 rounded-2xl border border-white/20" />
          <span className="relative z-10 flex items-center justify-center gap-2 text-base">
            <span className="text-xl">🏄</span>
            Catch This Wave
          </span>
        </button>
      </form>
    </div>
  );
}

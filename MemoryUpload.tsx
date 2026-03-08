"use client";

import { useState, useRef } from "react";

export default function MemoryUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [narrative, setNarrative] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

  const handleSubmit = async () => {
    if (!file && !text.trim()) return;
    setIsProcessing(true);
    setNarrative("");

    // TODO: call backend API
    // Placeholder response for scaffolding
    await new Promise((r) => setTimeout(r, 1500));
    setNarrative(
      "The warmth of that moment is still tangible — the way the light fell across the scene, the sounds, the feeling in the air. This memory holds a quiet kind of magic that time hasn't dimmed..."
    );
    setIsProcessing(false);
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors
          ${isDragging ? "border-amber-400 bg-amber-50" : "border-stone-200 hover:border-stone-300 bg-white"}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        {file ? (
          <p className="font-sans text-stone-600">{file.name}</p>
        ) : (
          <div className="space-y-2">
            <p className="text-2xl">📷</p>
            <p className="font-sans text-stone-500">Drop a photo or video here</p>
            <p className="font-sans text-stone-400 text-sm">JPG, PNG, MP4, MOV — up to 100MB</p>
          </div>
        )}
      </div>

      <div className="relative">
        <span className="absolute -top-3 left-4 bg-cream-50 px-2 text-stone-400 font-sans text-sm">or describe a memory</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="It was a warm July evening. We were all sitting around the campfire..."
          rows={3}
          className="w-full px-4 py-3 border border-stone-200 rounded-xl font-sans text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={(!file && !text.trim()) || isProcessing}
        className="w-full py-3 bg-amber-600 text-white rounded-xl font-sans font-medium hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isProcessing ? "Reliving your memory..." : "Relive This Memory ✨"}
      </button>

      {narrative && (
        <div className="bg-white border border-stone-100 rounded-2xl p-6 animate-fade-in">
          <p className="font-serif text-stone-700 leading-relaxed text-lg">{narrative}</p>
        </div>
      )}
    </div>
  );
}

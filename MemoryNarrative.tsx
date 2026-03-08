"use client";

interface Props {
  narrative: string;
}

export default function MemoryNarrative({ narrative }: Props) {
  return (
    <div className="bg-cream-100 rounded-2xl p-6 border border-amber-100">
      <p className="font-sans text-xs text-amber-600 uppercase tracking-widest mb-3">AI Memory Narrative</p>
      <p className="font-serif text-stone-700 leading-relaxed text-lg">{narrative}</p>
    </div>
  );
}

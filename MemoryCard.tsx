import Link from "next/link";

interface Memory {
  id: string;
  title: string;
  date: string;
  thumbnailUrl: string;
  mood: string;
}

export default function MemoryCard({ memory }: { memory: Memory }) {
  return (
    <Link href={`/memory/${memory.id}`}>
      <div className="bg-white rounded-2xl overflow-hidden border border-stone-100 hover:border-stone-200 hover:shadow-md transition-all group">
        <div className="aspect-square bg-stone-50 flex items-center justify-center">
          {memory.thumbnailUrl ? (
            <img src={memory.thumbnailUrl} alt={memory.title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl">📷</span>
          )}
        </div>
        <div className="p-4 space-y-1">
          <h3 className="font-serif text-stone-800 group-hover:text-amber-700 transition-colors">
            {memory.title}
          </h3>
          <div className="flex items-center gap-2 text-stone-400 font-sans text-sm">
            <span>{memory.date}</span>
            <span>·</span>
            <span className="capitalize">{memory.mood}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

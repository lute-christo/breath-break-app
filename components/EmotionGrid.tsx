"use client";

import { useRouter } from "next/navigation";
import type { Mode } from "@/data/scripts";

const QUICK_EMOTIONS = ["anxiety", "anger", "grief", "restless"];

interface EmotionGridProps {
  mode: Mode;
}

export function EmotionGrid({ mode }: EmotionGridProps) {
  const router = useRouter();

  const handleSelect = (emotion: string) => {
    router.push(
      `/session?emotion=${encodeURIComponent(
        emotion
      )}&mode=${encodeURIComponent(mode)}`
    );
  };

  return (
    <div className="grid grid-cols-3 gap-2 text-sm">
      {QUICK_EMOTIONS.map((emotion) => (
        <button
          key={emotion}
          onClick={() => handleSelect(emotion)}
          className="border border-neutral-700 rounded-md px-2 py-2 hover:border-neutral-400 active:scale-[0.99] transition"
        >
          {emotion.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
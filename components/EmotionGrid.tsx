"use client";

import { useRouter } from "next/navigation";
import { FREE_EMOTIONS } from "@/data/scripts";
import type { Mode } from "@/data/scripts";

const QUICK_EMOTIONS = ["anxiety", "anger", "grief", "restless"];

interface EmotionGridProps {
  mode: Mode;
  emotions?: string[];
  isPremium?: boolean;
}

export function EmotionGrid({
  mode,
  emotions = QUICK_EMOTIONS,
  isPremium = false,
}: EmotionGridProps) {
  const router = useRouter();

  const handleSelect = (emotion: string, locked: boolean) => {
    if (locked) {
      router.push("/premium");
      return;
    }
    router.push(
      `/session?emotion=${encodeURIComponent(emotion)}&mode=${encodeURIComponent(mode)}`
    );
  };

  return (
    <div className="grid grid-cols-3 gap-2 text-sm">
      {emotions.map((emotion) => {
        const locked = !isPremium && !FREE_EMOTIONS.includes(emotion);
        return (
          <button
            key={emotion}
            onClick={() => handleSelect(emotion, locked)}
            className={`relative border rounded-md px-2 py-2 active:scale-[0.99] transition ${
              locked
                ? "border-neutral-800 text-neutral-600 hover:border-neutral-700"
                : "border-neutral-700 hover:border-neutral-400"
            }`}
          >
            {emotion.toUpperCase()}
            {locked && (
              <span className="absolute top-1 right-1 text-[0.5rem] uppercase tracking-wide text-neutral-700">
                PRO
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

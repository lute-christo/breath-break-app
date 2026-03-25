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

  const freeEmotions = emotions.filter((e) => isPremium || FREE_EMOTIONS.includes(e));
  const lockedEmotions = emotions.filter((e) => !isPremium && !FREE_EMOTIONS.includes(e));

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2 text-sm">
        {freeEmotions.map((emotion) => (
          <button
            key={emotion}
            onClick={() => handleSelect(emotion, false)}
            className="border border-neutral-700 rounded-md px-2 py-2 hover:border-neutral-400 active:scale-[0.99] transition"
          >
            {emotion.toUpperCase()}
          </button>
        ))}
      </div>

      {lockedEmotions.length > 0 && (
        <>
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-neutral-800" />
            <span className="text-[0.6rem] uppercase tracking-widest text-neutral-600">
              Pro
            </span>
            <div className="h-px flex-1 bg-neutral-800" />
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm">
            {lockedEmotions.map((emotion) => (
              <button
                key={emotion}
                onClick={() => handleSelect(emotion, true)}
                className="border border-neutral-800 rounded-md px-2 py-2 text-neutral-600 hover:border-neutral-700 active:scale-[0.99] transition"
              >
                {emotion.toUpperCase()}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

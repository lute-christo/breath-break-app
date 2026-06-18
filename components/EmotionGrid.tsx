"use client";

import { useRouter } from "next/navigation";
import { FREE_EMOTIONS, EMOTION_GROUPS } from "@/data/scripts";
import type { Mode } from "@/data/scripts";

const QUICK_EMOTIONS = ["anxiety", "anger", "grief", "restless"];

interface EmotionGridProps {
  mode: Mode;
  emotions?: string[];
  isPremium?: boolean;
  grouped?: boolean;
  quickEmotions?: string[];
}

export function EmotionGrid({
  mode,
  emotions = QUICK_EMOTIONS,
  isPremium = false,
  grouped = false,
  quickEmotions,
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

  if (grouped && quickEmotions) {
    const remaining = emotions.filter((e) => !quickEmotions.includes(e));
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-2 text-sm">
          {quickEmotions.map((emotion) => (
              <button
                key={emotion}
                onClick={() => handleSelect(emotion, false)}
                className="border border-neutral-700 rounded-md px-2 py-2 hover:border-neutral-400 active:scale-[0.99] transition"
              >
                {emotion.toUpperCase()}
              </button>
          ))}
        </div>
        {EMOTION_GROUPS.map((group) => {
          const groupEmotions = group.emotions.filter((e) => remaining.includes(e));
          if (groupEmotions.length === 0) return null;
          const freeOnes = groupEmotions.filter((e) => isPremium || FREE_EMOTIONS.includes(e));
          const lockedOnes = groupEmotions.filter((e) => !isPremium && !FREE_EMOTIONS.includes(e));
          return (
            <div key={group.label} className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[0.6rem] uppercase tracking-widest text-neutral-500 font-semibold">
                  {group.label}
                </span>
                <div className="h-px flex-1 bg-neutral-800" />
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                {freeOnes.map((emotion) => (
                  <button key={emotion} onClick={() => handleSelect(emotion, false)}
                    className="border border-neutral-700 rounded-md px-2 py-2 hover:border-neutral-400 active:scale-[0.99] transition">
                    {emotion.toUpperCase()}
                  </button>
                ))}
                {lockedOnes.map((emotion) => (
                  <button key={emotion} onClick={() => handleSelect(emotion, true)}
                    className="border border-neutral-800 rounded-md px-2 py-2 text-neutral-600 hover:border-neutral-700 active:scale-[0.99] transition">
                    {emotion.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (grouped) {
    return (
      <div className="space-y-6">
        {EMOTION_GROUPS.map((group) => {
          const groupEmotions = group.emotions.filter((e) => emotions.includes(e));
          if (groupEmotions.length === 0) return null;

          const freeOnes = groupEmotions.filter((e) => isPremium || FREE_EMOTIONS.includes(e));
          const lockedOnes = groupEmotions.filter((e) => !isPremium && !FREE_EMOTIONS.includes(e));

          return (
            <div key={group.label} className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[0.6rem] uppercase tracking-widest text-neutral-500 font-semibold">
                  {group.label}
                </span>
                <div className="h-px flex-1 bg-neutral-800" />
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                {freeOnes.map((emotion) => (
                  <button
                    key={emotion}
                    onClick={() => handleSelect(emotion, false)}
                    className="border border-neutral-700 rounded-md px-2 py-2 hover:border-neutral-400 active:scale-[0.99] transition"
                  >
                    {emotion.toUpperCase()}
                  </button>
                ))}
                {lockedOnes.map((emotion) => (
                  <button
                    key={emotion}
                    onClick={() => handleSelect(emotion, true)}
                    className="border border-neutral-800 rounded-md px-2 py-2 text-neutral-600 hover:border-neutral-700 active:scale-[0.99] transition"
                  >
                    {emotion.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

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

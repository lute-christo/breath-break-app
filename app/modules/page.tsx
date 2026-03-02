"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import type { Mode } from "@/data/scripts";

const ALL_EMOTIONS = [
  "Anxiety",
  "Anger",
  "Grief",
  "Shame",
  "Jealousy",
  "Loneliness",
  "Exhaustion",
  "Numbness",
];

export default function ModulesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawMode = (searchParams.get("mode") || "standard").toLowerCase() as Mode;
  const mode: Mode = rawMode === "hardcore" ? "hardcore" : "standard";

  const handleSelect = (emotion: string) => {
    const param = emotion.toLowerCase();
    router.push(
      `/session?emotion=${encodeURIComponent(
        param
      )}&mode=${encodeURIComponent(mode)}`
    );
  };

  return (
    <main className="space-y-6">
      <Header />

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Emotion Modules</h1>
          {mode === "hardcore" && (
            <span className="text-[0.6rem] uppercase tracking-[0.2em] px-2 py-1 border border-red-600 text-red-400 rounded-full">
              Hardcore
            </span>
          )}
        </div>

        <p className="text-sm text-neutral-300">
          Pick what you want to turn toward for the next 3 minutes.
        </p>

        <div className="grid grid-cols-2 gap-2 text-sm">
          {ALL_EMOTIONS.map((e) => (
            <button
              key={e}
              onClick={() => handleSelect(e)}
              className="border border-neutral-700 rounded-md px-3 py-2 text-left hover:border-neutral-400 active:scale-[0.99] transition"
            >
              {e}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
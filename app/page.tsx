"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { BreathButton } from "@/components/BreathButton";
import { EmotionGrid } from "@/components/EmotionGrid";
import type { Mode } from "@/data/scripts";
import { usePracticeData } from "@/hooks/usePracticeData";
import { practiceStore } from "@/lib/practiceStore";
import { InstallPrompt } from "@/components/InstallPrompt";
import { BottomNav } from "@/components/BottomNav";

function pickSuggestedEmotion(byEmotion: Record<string, number>): string | null {
  const emotions = Object.keys(byEmotion);
  if (!emotions.length) return null;
  if (emotions.length === 1) return null; // if you've only ever done one, no "neglected" emotions yet

  // suggest the least-practiced emotion
  let best: string | null = null;
  let minCount = Infinity;
  for (const e of emotions) {
    const count = byEmotion[e];
    if (count < minCount) {
      minCount = count;
      best = e;
    }
  }
  return best;
}

function streakLine(streakDays: number) {
  if (streakDays === 0) return "Start a new streak today.";
  if (streakDays === 1) return "Day 1. Don’t make it perfect, just make it real.";
  if (streakDays < 7) return `Day ${streakDays}. You’re building tolerance for the real stuff.`;
  return `Day ${streakDays}. This is officially a habit of turning toward it.`;
}

export default function HomePage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("standard");

  const isDev = process.env.NODE_ENV === "development";

  // Practice summary (derived from per-session logs)
  const { summary, loading } = usePracticeData();

  const totalSessions = summary?.totalSessions ?? 0;
  const totalMinutes = summary?.totalMinutes ?? 0;
  const streakDays = summary?.streakDays ?? 0;
  const totalDaysPracticed = summary?.totalDaysPracticed ?? 0;
  const mostPracticedEmotion = summary?.mostPracticedEmotion ?? null;
  const suggestedEmotion = summary
    ? pickSuggestedEmotion(summary.byEmotion)
    : null;

  const handleBrowseAll = () => {
    router.push(`/modules?mode=${encodeURIComponent(mode)}`);
  };

  const handleDevReset = async () => {
    await practiceStore.resetAll();
    // simplest way to refresh the hook data
    window.location.reload();
  };

  return (
    <main className="space-y-8 pb-16">
      <Header />

      {/* Today’s Practice + Mode Toggle */}
      <section className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          {/* Left: title + copy + stats */}
          <div className="min-w-0">
            <h1 className="text-lg font-semibold">Today&apos;s Practice</h1>
            <p className="text-sm text-neutral-300">
              Turn toward the thing you&apos;re avoiding.
            </p>

            {!loading && summary && (
              <div className="mt-2 text-[0.7rem] text-neutral-400 space-y-1">
                <p className="break-words">
                  <span className="font-mono text-neutral-100">
                    {totalSessions}
                  </span>{" "}
                  session{totalSessions === 1 ? "" : "s"} ·{" "}
                  <span className="font-mono text-neutral-100">
                    {totalMinutes}
                  </span>{" "}
                  minute{totalMinutes === 1 ? "" : "s"} total · practiced on{" "}
                  <span className="font-mono text-neutral-100">
                    {totalDaysPracticed}
                  </span>{" "}
                  day{totalDaysPracticed === 1 ? "" : "s"}.
                </p>
                <p>{streakLine(streakDays)}</p>
                {mostPracticedEmotion && (
                  <p>
                    You keep coming back to{" "}
                    <span className="font-mono text-neutral-100">
                      {mostPracticedEmotion}
                    </span>
                    .
                  </p>
                )}
                {suggestedEmotion && (
                  <p className="text-neutral-500">
                    Maybe turn toward{" "}
                    <span className="font-mono text-neutral-100">
                      {suggestedEmotion}
                    </span>{" "}
                    today.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right: mode toggle pill */}
          <div className="flex justify-start sm:justify-end">
            <div className="inline-flex items-center text-[0.7rem] border border-neutral-700 rounded-full overflow-hidden shrink-0">
              <button
                onClick={() => setMode("standard")}
                className={`px-3 py-1 uppercase tracking-[0.15em] ${
                  mode === "standard"
                    ? "bg-neutral-200 text-black"
                    : "text-neutral-400"
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => setMode("hardcore")}
                className={`px-3 py-1 uppercase tracking-[0.15em] ${
                  mode === "hardcore"
                    ? "bg-red-600 text-white"
                    : "text-neutral-400"
                }`}
              >
                Hardcore
              </button>
            </div>
          </div>
        </div>

        <BreathButton mode={mode} />
      </section>

      {/* Quick start + catalog link */}
      <section className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-medium text-neutral-200">Quick Start</h2>

          <button
            onClick={handleBrowseAll}
            className="text-[0.7rem] text-neutral-400 hover:text-neutral-200 underline underline-offset-4"
          >
            Browse all emotions
          </button>
        </div>

        <EmotionGrid mode={mode} />
      </section>

      {/* Stats footer + history link */}
      <section className="space-y-2 text-xs text-neutral-400 border-t border-neutral-800 pt-4">
        {loading ? (
          <p>Loading your reps…</p>
        ) : totalSessions > 0 ? (
          <>
            <p>
              You&apos;ve completed{" "}
              <span className="font-mono text-neutral-100">
                {totalSessions}
              </span>{" "}
              session{totalSessions === 1 ? "" : "s"} so far.
            </p>
            <p>
              That&apos;s{" "}
              <span className="font-mono text-neutral-100">
                {totalMinutes}
              </span>{" "}
              minute{totalMinutes === 1 ? "" : "s"} of breathing into the mess.
            </p>
          </>
        ) : (
          <p>Your first rep will show up here.</p>
        )}

        <div className="flex items-center justify-between pt-1">
          <Link
            href="/history"
            className="text-[0.7rem] text-neutral-400 hover:text-neutral-200 underline underline-offset-4"
          >
            View history →
          </Link>

          {isDev && (
            <button
              onClick={handleDevReset}
              className="text-[0.7rem] text-neutral-500 hover:text-neutral-300 underline underline-offset-2"
            >
              Reset practice data (dev)
            </button>
          )}
        </div>
      </section>

      <BottomNav />
    </main>
  );
}
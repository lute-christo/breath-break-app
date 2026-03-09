"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { BreathAnimation } from "@/components/BreathAnimation";
import { getScriptForEmotion, type Mode } from "@/data/scripts";
import { practiceStore } from "@/lib/practiceStore";

const SESSION_LENGTH_SECONDS = 180; // 3 minutes
const SESSION_LENGTH_MS = SESSION_LENGTH_SECONDS * 1000; // 180,000 ms
const PHASE_MS = 8_000; // 8s per script line/phase

function SessionInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawEmotion = (searchParams.get("emotion") || "anxiety").toLowerCase();
  const rawMode = (searchParams.get("mode") || "standard").toLowerCase() as Mode;

  const emotion = rawEmotion;
  const mode: Mode = rawMode === "hardcore" ? "hardcore" : "standard";

  const script = getScriptForEmotion(emotion, mode);

  const [elapsedMs, setElapsedMs] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [endedEarly, setEndedEarly] = useState(false);
  const [startedAt, setStartedAt] = useState<string>(
    () => new Date().toISOString()
  );

  // useRef instead of state to avoid React's "setState in effect" complaint
  const hasLoggedRef = useRef(false);

  const isFinished = elapsedMs >= SESSION_LENGTH_MS;

  // Timer: tick every 100ms while running
  useEffect(() => {
    if (isPaused || isFinished) return;

    const interval = setInterval(() => {
      setElapsedMs((prev) => {
        const next = prev + 100;
        if (next >= SESSION_LENGTH_MS) {
          return SESSION_LENGTH_MS;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPaused, isFinished]);

  // Log once when session finishes (full or early)
  useEffect(() => {
    if (!isFinished || hasLoggedRef.current || !startedAt) return;

    const durationSec = Math.round(elapsedMs / 1000);
    const completed = !endedEarly && elapsedMs >= SESSION_LENGTH_MS;

    practiceStore
      .logSession({
        emotion,
        mode,
        startedAt,
        durationSec,
        completed,
      })
      .catch((err) => {
        console.error("Failed to log practice session", err);
      });

    hasLoggedRef.current = true;
  }, [isFinished, startedAt, elapsedMs, emotion, mode, endedEarly]);

  // Timer display in MM:SS
  const elapsedSeconds = Math.floor(elapsedMs / 1000);
  const minutes = Math.floor(elapsedSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (elapsedSeconds % 60).toString().padStart(2, "0");

  // Script line: one line per 8 seconds, loop if needed
  const lineIndex = Math.floor(elapsedMs / PHASE_MS) % script.lines.length;
  const currentLine = script.lines[lineIndex];

  const handlePauseResume = () => {
    setIsPaused((prev) => !prev);
  };

  const handleEndNow = () => {
    setEndedEarly(true);
    setIsPaused(true);
    setElapsedMs(SESSION_LENGTH_MS);
  };

  const handleAnotherRound = () => {
    // start a fresh round
    setElapsedMs(0);
    setIsPaused(false);
    setEndedEarly(false);
    setStartedAt(new Date().toISOString());
    hasLoggedRef.current = false;
  };

  const handleDifferentEmotion = () => {
    router.push(`/modules?mode=${encodeURIComponent(mode)}`);
  };

  return (
    <main className="space-y-6 pb-4">
      <Header />

      <section className="space-y-5">
        {/* Top row: emotion + mode pill + timer */}
        <div className="flex items-baseline justify-between">
          <div className="flex items-center gap-2">
            <div className="text-xs uppercase tracking-[0.2em] text-neutral-400">
              {emotion.toUpperCase()}
            </div>
            {mode === "hardcore" && (
              <span className="text-[0.6rem] uppercase tracking-[0.2em] px-2 py-1 border border-red-600 text-red-400 rounded-full">
                Hardcore
              </span>
            )}
          </div>
          <div className="text-xs text-neutral-400 font-mono">
            {minutes}:{seconds}
          </div>
        </div>

        {isFinished ? (
          // =====================
          // SESSION COMPLETE VIEW
          // =====================
          <div className="space-y-4 mt-4">
            <p className="text-base">
              {endedEarly ? (
                <>
                  Session with <span className="uppercase">{emotion}</span>{" "}
                  ended early.
                </>
              ) : (
                <>
                  3 minutes with <span className="uppercase">{emotion}</span>{" "}
                  completed.
                </>
              )}
            </p>
            <p className="text-sm text-neutral-300">
              Notice what&apos;s different now, even if it&apos;s subtle.
            </p>

            <div className="space-y-2 mt-4">
              <button
                onClick={handleAnotherRound}
                className="w-full py-3.5 border border-neutral-700 rounded-md text-sm hover:border-neutral-400 active:scale-[0.99] transition"
              >
                Another 3 minutes with {emotion}
              </button>
              <button
                onClick={handleDifferentEmotion}
                className="w-full py-3.5 border border-neutral-700 rounded-md text-sm hover:border-neutral-400 active:scale-[0.99] transition"
              >
                Choose a different emotion
              </button>
            </div>

            <p className="text-[0.75rem] text-neutral-500 mt-3">
              You can always come back to this one. Every round is another rep.
            </p>
          </div>
        ) : (
          // ====================
          // ACTIVE SESSION VIEW
          // ====================
          <>
            {/* Breath animation driven by elapsedMs */}
            <div className="mt-2">
              <BreathAnimation elapsedMs={elapsedMs} />
            </div>

            {/* Script prompt */}
            <div className="space-y-1 mt-3">
              <p className="text-xs text-neutral-500">{currentLine.label}</p>
              <p className="text-base leading-relaxed">{currentLine.text}</p>
            </div>

            {/* Controls: pause / end */}
            <div className="flex items-center gap-3 mt-5">
              <button
                onClick={handlePauseResume}
                className="flex-1 py-3 border border-neutral-700 rounded-md text-sm hover:border-neutral-400 active:scale-[0.99] transition"
              >
                {isPaused ? "Resume //" : "Pause //"}
              </button>
              <button
                onClick={handleEndNow}
                className="flex-1 py-3 border border-neutral-800 rounded-md text-sm text-neutral-300 hover:border-red-600 hover:text-red-400 active:scale-[0.99] transition"
              >
                End session
              </button>
            </div>

            <p className="text-[0.75rem] text-neutral-500 mt-3">
              You can pause or end at any time. The breath doesn&apos;t have to
              be perfect.
            </p>
          </>
        )}
      </section>
    </main>
  );
}

export default function SessionPage() {
  return (
    <Suspense>
      <SessionInner />
    </Suspense>
  );
}
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { BreathAnimation } from "@/components/BreathAnimation";
import { getScriptForEmotion, type Mode } from "@/data/scripts";
import { logSession } from "@/lib/localStats";
import { practiceStore } from "@/lib/practiceStore";
import { usePracticeData } from "@/hooks/usePracticeData";

const SESSION_LENGTH_SECONDS = 180; // 3 minutes
const SESSION_LENGTH_MS = SESSION_LENGTH_SECONDS * 1000; // 180,000 ms
const PHASE_MS = 8_000; // 8s per script line/phase

function formatDuration(seconds: number) {
  const s = Math.max(0, seconds);
  const mPart = Math.floor(s / 60);
  const sPart = s % 60;
  return `${mPart}:${sPart.toString().padStart(2, "0")}`;
}

export default function SessionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [elapsedMs, setElapsedMs] = useState(0);
  const [sessionId, setSessionId] = useState(0); // bump to restart
  const [isPaused, setIsPaused] = useState(false);
  const [endedEarly, setEndedEarly] = useState(false);
  const [hasLogged, setHasLogged] = useState(false);
  const [startedAt, setStartedAt] = useState<string>(() =>
    new Date().toISOString()
  );
  const [finalDurationSec, setFinalDurationSec] = useState<number | null>(null);

  // Emotion + mode from query params
  const rawEmotion = searchParams.get("emotion") || "anxiety";
  const rawMode = (searchParams.get("mode") || "standard").toLowerCase() as Mode;

  const emotion = rawEmotion.toLowerCase();
  const mode: Mode = rawMode === "hardcore" ? "hardcore" : "standard";

  const script = getScriptForEmotion(emotion, mode);

  const isFinished = elapsedMs >= SESSION_LENGTH_MS;

  // Practice summary for completion screen
  const { summary } = usePracticeData();

  // Timer: tick every 100ms while running
  useEffect(() => {
    if (isPaused || isFinished) return;

    const interval = setInterval(() => {
      setElapsedMs((prev) => {
        const next = prev + 100;
        if (next >= SESSION_LENGTH_MS) {
          return SESSION_LENGTH_MS; // clamp at the end
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [sessionId, isPaused, isFinished]);

  // Helper: log session once (localStats + practiceStore)
  const logSessionOnce = (opts: { early: boolean; finalElapsedMs: number }) => {
    if (hasLogged) return;

    const { early, finalElapsedMs } = opts;
    const durationSec = Math.floor(finalElapsedMs / 1000);
    const completed = !early && durationSec >= SESSION_LENGTH_SECONDS;

    setFinalDurationSec(durationSec);

    // Legacy aggregate stats
    logSession(emotion);

    // Rich per-session log
    practiceStore
      .logSession({
        emotion,
        mode,
        startedAt,
        durationSec,
        completed,
      })
      .catch(() => {
        // swallow errors for now
      });

    setHasLogged(true);
  };

  // Log once when session finishes naturally (full 3 minutes)
  useEffect(() => {
    if (!isFinished || hasLogged) return;

    // Natural completion: use full session length
    logSessionOnce({ early: false, finalElapsedMs: SESSION_LENGTH_MS });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished, hasLogged]);

  // Timer display in MM:SS (live)
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
    // Log with the *actual* elapsed time before we jump to finished view
    logSessionOnce({ early: true, finalElapsedMs: elapsedMs });

    setEndedEarly(true);
    setIsPaused(true);
    // Move to finished view; logging already happened with real duration
    setElapsedMs(SESSION_LENGTH_MS);
  };

  const handleAnotherRound = () => {
    setElapsedMs(0);
    setIsPaused(false);
    setEndedEarly(false);
    setHasLogged(false);
    setFinalDurationSec(null);
    setSessionId((prev) => prev + 1);
    setStartedAt(new Date().toISOString());
  };

  const handleDifferentEmotion = () => {
    router.push(`/modules?mode=${encodeURIComponent(mode)}`);
  };

  const completionDuration =
    finalDurationSec ?? (endedEarly ? elapsedSeconds : SESSION_LENGTH_SECONDS);

  const totalSessions = summary?.totalSessions ?? null;
  const totalMinutes = summary?.totalMinutes ?? null;
  const streakDays = summary?.streakDays ?? null;

  return (
    <main className="space-y-6">
      <Header />

      <section className="space-y-4">
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
          <div className="space-y-4 mt-6">
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
              Actual time:{" "}
              <span className="font-mono">
                {formatDuration(completionDuration)}
              </span>{" "}
              {endedEarly && (
                <span className="text-amber-400 text-xs">(ended early)</span>
              )}
            </p>

            {summary && (
              <div className="text-[0.7rem] text-neutral-500 space-y-1 mt-2">
                <p>
                  Lifetime:{" "}
                  <span className="font-mono text-neutral-100">
                    {totalSessions}
                  </span>{" "}
                  session{totalSessions === 1 ? "" : "s"},{" "}
                  <span className="font-mono text-neutral-100">
                    {totalMinutes}
                  </span>{" "}
                  minute{(totalMinutes ?? 0) === 1 ? "" : "s"} total.
                </p>
                {streakDays !== null && (
                  <p>
                    Current streak:{" "}
                    <span className="font-mono text-neutral-100">
                      {streakDays}
                    </span>{" "}
                    day{streakDays === 1 ? "" : "s"} in a row.
                  </p>
                )}
              </div>
            )}

            <p className="text-sm text-neutral-300 mt-2">
              Notice what&apos;s different now, even if it&apos;s subtle.
            </p>

            <div className="space-y-2 mt-4">
              <button
                onClick={handleAnotherRound}
                className="w-full py-3 border border-neutral-700 rounded-md text-sm hover:border-neutral-400 active:scale-[0.99] transition"
              >
                Another 3 minutes with {emotion}
              </button>
              <button
                onClick={handleDifferentEmotion}
                className="w-full py-3 border border-neutral-700 rounded-md text-sm hover:border-neutral-400 active:scale-[0.99] transition"
              >
                Choose a different emotion
              </button>
            </div>

            <p className="text-[0.7rem] text-neutral-500 mt-2">
              You can always come back to this one. Every round is another rep.
            </p>
          </div>
        ) : (
          // ====================
          // ACTIVE SESSION VIEW
          // ====================
          <>
            {/* Breath animation driven by elapsedMs */}
            <BreathAnimation elapsedMs={elapsedMs} />

            {/* Script prompt */}
            <div className="space-y-1 mt-2">
              <p className="text-xs text-neutral-500">{currentLine.label}</p>
              <p className="text-base leading-relaxed">{currentLine.text}</p>
            </div>

            {/* Controls: pause / end */}
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={handlePauseResume}
                className="flex-1 py-2 border border-neutral-700 rounded-md text-xs hover:border-neutral-400 active:scale-[0.99] transition"
              >
                {isPaused ? "Resume //" : "Pause //"}
              </button>
              <button
                onClick={handleEndNow}
                className="flex-1 py-2 border border-neutral-800 rounded-md text-xs text-neutral-400 hover:border-red-600 hover:text-red-400 active:scale-[0.99] transition"
              >
                End session
              </button>
            </div>

            <p className="text-[0.7rem] text-neutral-500 mt-2">
              You can pause or end at any time. The breath doesn&apos;t have to
              be perfect.
            </p>
          </>
        )}
      </section>
    </main>
  );
}
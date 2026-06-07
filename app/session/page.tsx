"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { BreathAnimation } from "@/components/BreathAnimation";
import { getScriptForEmotion, type Mode } from "@/data/scripts";
import { practiceStore } from "@/lib/practiceStore";
import { getSettings } from "@/lib/settingsStore";
import { useSessionAudio } from "@/hooks/useSessionAudio";

function hapticPulse() {
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    navigator.vibrate(50);
  }
}

function hapticComplete() {
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    navigator.vibrate([100, 50, 100]);
  }
}

const PHASE_MS = 8_000;

function SessionInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawEmotion = (searchParams.get("emotion") || "anxiety").toLowerCase();
  const rawMode = (searchParams.get("mode") || "standard").toLowerCase() as Mode;

  const emotion = rawEmotion;
  const mode: Mode = rawMode === "hardcore" ? "hardcore" : "standard";

  const script = getScriptForEmotion(emotion, mode);

  // Read settings once at mount — stable for the lifetime of this session
  const [sessionSettings] = useState(() => getSettings());
  const SESSION_LENGTH_MS = sessionSettings.sessionLengthMinutes * 60 * 1000;

  const [elapsedMs, setElapsedMs] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [endedEarly, setEndedEarly] = useState(false);
  const [startedAt] = useState<string>(() => new Date().toISOString());

  const hasLoggedRef = useRef(false);
  const prevLineIndexRef = useRef(-1);
  const isFinishedRef = useRef(false);

  // Wall-clock refs — prevent timer drift on screen lock / app background
  const sessionStartTimeRef = useRef<number>(Date.now());
  const totalPausedMsRef = useRef<number>(0);
  const pausedAtRef = useRef<number | null>(null);

  const isFinished = elapsedMs >= SESSION_LENGTH_MS;

  // Keep isFinishedRef in sync for use in event handlers that can't close over state
  useEffect(() => { isFinishedRef.current = isFinished; }, [isFinished]);

  // Wall-clock timer — reads actual elapsed time so screen lock / backgrounding
  // doesn't cause the timer to fall behind
  useEffect(() => {
    if (isPaused || isFinished) return;

    const interval = setInterval(() => {
      const elapsed = Date.now() - sessionStartTimeRef.current - totalPausedMsRef.current;
      setElapsedMs(Math.min(elapsed, SESSION_LENGTH_MS));
    }, 100);

    return () => clearInterval(interval);
  }, [isPaused, isFinished, SESSION_LENGTH_MS]);

  // Track time spent paused so wall-clock calculation stays accurate
  useEffect(() => {
    if (isPaused) {
      pausedAtRef.current = Date.now();
    } else {
      if (pausedAtRef.current !== null) {
        totalPausedMsRef.current += Date.now() - pausedAtRef.current;
        pausedAtRef.current = null;
      }
    }
  }, [isPaused]);

  // Back-button guard — intercept Android back gesture / browser back while
  // session is in progress and confirm before leaving
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      if (isFinishedRef.current) return;
      const leave = window.confirm(
        "Leave this session? Your progress so far will be saved."
      );
      if (leave) {
        router.push("/");
      } else {
        window.history.pushState(null, "", window.location.href);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [router]);

  // Log once when session finishes (full or early)
  useEffect(() => {
    if (!isFinished || hasLoggedRef.current) return;

    const durationSec = Math.round(elapsedMs / 1000);
    const completed = !endedEarly && elapsedMs >= SESSION_LENGTH_MS;

    practiceStore
      .logSession({ emotion, mode, startedAt, durationSec, completed })
      .catch((err) => console.error("Failed to log practice session", err));

    hasLoggedRef.current = true;

    if (sessionSettings.hapticEnabled) hapticComplete();
  }, [isFinished, elapsedMs, emotion, mode, startedAt, endedEarly, sessionSettings.hapticEnabled, SESSION_LENGTH_MS]);

  // Session audio — plays drone loop when audio is enabled, pauses with session
  useSessionAudio({
    enabled: sessionSettings.audioEnabled,
    isPaused,
    isFinished,
  });

  // Haptic on phase change
  const lineIndex = Math.floor(elapsedMs / PHASE_MS) % script.lines.length;

  useEffect(() => {
    if (isFinished || isPaused) return;
    if (prevLineIndexRef.current === lineIndex) return;

    prevLineIndexRef.current = lineIndex;

    if (sessionSettings.hapticEnabled) hapticPulse();
  }, [lineIndex, isFinished, isPaused, sessionSettings.hapticEnabled]);

  // Timer display
  const elapsedSeconds = Math.floor(elapsedMs / 1000);
  const minutes = Math.floor(elapsedSeconds / 60).toString().padStart(2, "0");
  const seconds = (elapsedSeconds % 60).toString().padStart(2, "0");

  const currentLine = script.lines[lineIndex];

  const handlePauseResume = () => setIsPaused((prev) => !prev);

  const handleEndNow = () => {
    setEndedEarly(true);
    setIsPaused(true);
    setElapsedMs(SESSION_LENGTH_MS);
  };

  const handleAnotherRound = () => {
    sessionStartTimeRef.current = Date.now();
    totalPausedMsRef.current = 0;
    pausedAtRef.current = null;
    setElapsedMs(0);
    setIsPaused(false);
    setEndedEarly(false);
    hasLoggedRef.current = false;
    prevLineIndexRef.current = -1;
  };

  const handleDifferentEmotion = () => {
    router.push(`/modules?mode=${encodeURIComponent(mode)}`);
  };

  const sessionLengthLabel = `${sessionSettings.sessionLengthMinutes} minute${sessionSettings.sessionLengthMinutes === 1 ? "" : "s"}`;

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
          <div className="space-y-4 mt-4">
            <p className="text-base">
              {endedEarly ? (
                <>
                  Session with <span className="uppercase">{emotion}</span>{" "}
                  ended early.
                </>
              ) : (
                <>
                  {sessionLengthLabel} with{" "}
                  <span className="uppercase">{emotion}</span> completed.
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
                Another {sessionLengthLabel} with {emotion}
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
          <>
            <div className="mt-2">
              <BreathAnimation elapsedMs={elapsedMs} />
            </div>

            <div className="space-y-1 mt-3">
              <p className="text-xs text-neutral-500">{currentLine.label}</p>
              <p className="text-base leading-relaxed">{currentLine.text}</p>
            </div>

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

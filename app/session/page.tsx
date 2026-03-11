"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { BreathAnimation } from "@/components/BreathAnimation";
import { getScriptForEmotion, type Mode } from "@/data/scripts";
import { practiceStore } from "@/lib/practiceStore";
import { getSettings } from "@/lib/settingsStore";

// Musical notes per phase: C4, E4, A3, G3
// Inhale (gathering) → Hold full (present) → Exhale (releasing) → Hold empty (low)
const PHASE_FREQS = [261.63, 329.63, 220, 196];

// Harmonic partials with individual decay rates — higher partials die faster,
// leaving the fundamental to sustain like a real piano string
const PIANO_PARTIALS = [
  { ratio: 1, gain: 0.50, decay: 4.0 }, // fundamental — longest sustain
  { ratio: 2, gain: 0.22, decay: 2.2 }, // octave
  { ratio: 3, gain: 0.12, decay: 1.4 }, // fifth
  { ratio: 4, gain: 0.06, decay: 0.9 }, // two octaves
  { ratio: 5, gain: 0.03, decay: 0.5 }, // major third — brief brightness
];

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

function playTone(audioCtx: AudioContext, fundamental: number) {
  const now = audioCtx.currentTime;

  for (const { ratio, gain, decay } of PIANO_PARTIALS) {
    const osc = audioCtx.createOscillator();
    const oscGain = audioCtx.createGain();
    osc.connect(oscGain);
    oscGain.connect(audioCtx.destination);

    osc.type = "sine";
    osc.frequency.value = fundamental * ratio;

    // 3ms hammer attack, then exponential decay per partial
    oscGain.gain.setValueAtTime(0, now);
    oscGain.gain.linearRampToValueAtTime(gain, now + 0.003);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

    osc.start(now);
    osc.stop(now + decay + 0.1);
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
  const audioCtxRef = useRef<AudioContext | null>(null);

  const isFinished = elapsedMs >= SESSION_LENGTH_MS;

  // Lazy AudioContext getter — deferred until first interaction
  const getAudioCtx = (): AudioContext | null => {
    if (typeof window === "undefined") return null;
    const AC =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AC();
    }
    return audioCtxRef.current;
  };

  // Timer: tick every 100ms while running
  useEffect(() => {
    if (isPaused || isFinished) return;

    const interval = setInterval(() => {
      setElapsedMs((prev) => {
        const next = prev + 100;
        return next >= SESSION_LENGTH_MS ? SESSION_LENGTH_MS : next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPaused, isFinished, SESSION_LENGTH_MS]);

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

  // Haptic + audio on phase change
  const lineIndex = Math.floor(elapsedMs / PHASE_MS) % script.lines.length;

  useEffect(() => {
    if (isFinished || isPaused) return;
    if (prevLineIndexRef.current === lineIndex) return;

    prevLineIndexRef.current = lineIndex;

    if (sessionSettings.hapticEnabled) hapticPulse();

    if (sessionSettings.audioEnabled) {
      const ctx = getAudioCtx();
      if (ctx) {
        const play = () => playTone(ctx, PHASE_FREQS[lineIndex % PHASE_FREQS.length]);
        if (ctx.state === "suspended") {
          ctx.resume().then(play).catch(() => {});
        } else {
          play();
        }
      }
    }
  }, [lineIndex, isFinished, isPaused, sessionSettings.hapticEnabled, sessionSettings.audioEnabled]);

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

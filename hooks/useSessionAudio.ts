"use client";

import { useEffect, useRef } from "react";

interface UseSessionAudioOptions {
  enabled: boolean;
  isPaused: boolean;
  isFinished: boolean;
}

/**
 * Plays the session drone audio while a session is active.
 * Respects the audioEnabled setting, pauses with the session,
 * and stops cleanly when the session ends or the component unmounts.
 */
export function useSessionAudio({ enabled, isPaused, isFinished }: UseSessionAudioOptions) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Create the audio element once on mount (if enabled)
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const audio = new Audio("/audio/session-drone.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    audio.play().catch((err) => {
      // Autoplay may be blocked until a user gesture — session start is a gesture so
      // this should succeed, but we log silently rather than crashing if not.
      console.warn("Session audio autoplay blocked:", err);
    });

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [enabled]);

  // Pause / resume in sync with session state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPaused || isFinished) {
      audio.pause();
    } else {
      audio.play().catch((err) => {
        console.warn("Session audio play failed:", err);
      });
    }
  }, [isPaused, isFinished]);
}

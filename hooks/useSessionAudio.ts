"use client";

import { useCallback, useEffect, useRef } from "react";

const FADE_DURATION_MS = 3_000; // 3-second fade in / out
const TARGET_VOLUME    = 0.5;
const STEP_MS          = 50;    // volume update every 50ms

interface UseSessionAudioOptions {
  enabled:    boolean;
  isPaused:   boolean;
  isFinished: boolean;
}

/**
 * Plays the session drone audio with a fade-in at start and fade-out at end.
 * Respects the audioEnabled setting and pauses immediately with the session.
 */
export function useSessionAudio({ enabled, isPaused, isFinished }: UseSessionAudioOptions) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef  = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopFade = useCallback(() => {
    if (fadeRef.current !== null) {
      clearInterval(fadeRef.current);
      fadeRef.current = null;
    }
  }, []);

  const fadeIn = useCallback((audio: HTMLAudioElement) => {
    stopFade();
    audio.volume = 0;
    const increment = TARGET_VOLUME / (FADE_DURATION_MS / STEP_MS);

    fadeRef.current = setInterval(() => {
      const next = audio.volume + increment;
      if (next >= TARGET_VOLUME) {
        audio.volume = TARGET_VOLUME;
        stopFade();
      } else {
        audio.volume = next;
      }
    }, STEP_MS);
  }, [stopFade]);

  const fadeOut = useCallback((audio: HTMLAudioElement) => {
    stopFade();
    const decrement = audio.volume / (FADE_DURATION_MS / STEP_MS);

    fadeRef.current = setInterval(() => {
      const next = audio.volume - decrement;
      if (next <= 0) {
        audio.volume = 0;
        audio.pause();
        stopFade();
      } else {
        audio.volume = next;
      }
    }, STEP_MS);
  }, [stopFade]);

  // Create audio element and fade in on mount
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const audio = new Audio("/audio/session-drone.mp3");
    audio.loop   = true;
    audio.volume = 0;
    audioRef.current = audio;

    audio.play()
      .then(() => fadeIn(audio))
      .catch((err) => console.warn("Session audio autoplay blocked:", err));

    return () => {
      stopFade();
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [enabled, fadeIn, stopFade]);

  // React to pause / finish / resume
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isFinished) {
      // Fade out and let the interval pause it when volume hits zero
      fadeOut(audio);
    } else if (isPaused) {
      // Immediate pause — no fade
      stopFade();
      audio.pause();
    } else {
      // Resuming from pause — fade back in
      audio.play()
        .then(() => fadeIn(audio))
        .catch((err) => console.warn("Session audio play failed:", err));
    }
  }, [isPaused, isFinished, fadeIn, fadeOut, stopFade]);
}

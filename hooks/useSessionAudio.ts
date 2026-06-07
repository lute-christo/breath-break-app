"use client";

import { useCallback, useEffect, useRef } from "react";

const FADE_IN_S  = 3;   // seconds
const FADE_OUT_S = 3;
const TARGET_VOL = 0.5;

interface UseSessionAudioOptions {
  enabled:    boolean;
  isPaused:   boolean;
  isFinished: boolean;
}

/**
 * Plays the session drone using the Web Audio API for gapless looping.
 * Fades in at session start, fades out at session end.
 * Pause/resume suspends and resumes the AudioContext in place.
 */
export function useSessionAudio({ enabled, isPaused, isFinished }: UseSessionAudioOptions) {
  const ctxRef    = useRef<AudioContext | null>(null);
  const gainRef   = useRef<GainNode | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);

  // --- helpers ---

  const startSource = useCallback(() => {
    const ctx    = ctxRef.current;
    const gain   = gainRef.current;
    const buffer = bufferRef.current;
    if (!ctx || !gain || !buffer) return;

    // Tear down any existing source node first
    if (sourceRef.current) {
      try { sourceRef.current.stop(); } catch { /* already stopped */ }
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }

    const src  = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop   = true;          // Web Audio API loop is sample-accurate — no gap
    src.connect(gain);
    src.start();
    sourceRef.current = src;
  }, []);

  const fadeIn = useCallback(() => {
    const ctx  = ctxRef.current;
    const gain = gainRef.current;
    if (!ctx || !gain) return;

    gain.gain.cancelScheduledValues(ctx.currentTime);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(TARGET_VOL, ctx.currentTime + FADE_IN_S);
  }, []);

  const fadeOut = useCallback((onDone?: () => void) => {
    const ctx  = ctxRef.current;
    const gain = gainRef.current;
    if (!ctx || !gain) return;

    const now = ctx.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(gain.gain.value, now);
    gain.gain.linearRampToValueAtTime(0, now + FADE_OUT_S);

    if (onDone) setTimeout(onDone, FADE_OUT_S * 1000);
  }, []);

  // --- mount: create context, load buffer, start playing ---

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    // Safari needs webkitAudioContext
    const AC  = window.AudioContext ?? (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;

    const ctx  = new AC();
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.connect(ctx.destination);

    ctxRef.current  = ctx;
    gainRef.current = gain;

    fetch("/audio/session-drone.mp3")
      .then((r) => r.arrayBuffer())
      .then((ab) => ctx.decodeAudioData(ab))
      .then((buf) => {
        bufferRef.current = buf;
        startSource();
        fadeIn();
      })
      .catch((err) => console.warn("Session audio failed to load:", err));

    return () => {
      if (sourceRef.current) {
        try { sourceRef.current.stop(); } catch { /* ok */ }
        sourceRef.current = null;
      }
      ctx.close();
      ctxRef.current  = null;
      gainRef.current = null;
      bufferRef.current = null;
    };
  }, [enabled, startSource, fadeIn]);

  // --- respond to pause / finish / resume ---

  const prevIsFinishedRef = useRef(false);

  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    const wasFinished = prevIsFinishedRef.current;
    prevIsFinishedRef.current = isFinished;

    if (isFinished) {
      // Fade out then stop the source
      fadeOut(() => {
        if (sourceRef.current) {
          try { sourceRef.current.stop(); } catch { /* ok */ }
          sourceRef.current = null;
        }
      });
    } else if (wasFinished && !isFinished && !isPaused) {
      // "Another round" — session reset, restart and fade in
      if (ctx.state === "suspended") ctx.resume().catch(() => {});
      startSource();
      fadeIn();
    } else if (isPaused) {
      // Suspend the context in place — preserves loop position exactly
      ctx.suspend().catch(() => {});
    } else {
      // Resume from pause
      ctx.resume().catch(() => {});
    }
  }, [isPaused, isFinished, fadeIn, fadeOut, startSource]);
}

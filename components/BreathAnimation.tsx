"use client";

interface BreathAnimationProps {
  elapsedMs: number; // total elapsed time in milliseconds
}

export function BreathAnimation({ elapsedMs }: BreathAnimationProps) {
  const CYCLE_MS = 32_000; // 32 seconds: 8 inhale + 8 holdFull + 8 exhale + 8 holdEmpty
  const PHASE_MS = 8_000;  // each phase = 8 seconds

  const MIN_SPREAD = 8;    // how close slashes are in contracted state
  const MAX_SPREAD = 40;   // how far apart they get in expanded state

  const cyclePos = elapsedMs % CYCLE_MS; // where we are in current 32s cycle

  let spread: number;

  if (cyclePos < PHASE_MS) {
    // INHALE: 0 -> 8s
    const t = cyclePos / PHASE_MS; // 0 -> 1
    spread = MIN_SPREAD + (MAX_SPREAD - MIN_SPREAD) * t;
  } else if (cyclePos < 2 * PHASE_MS) {
    // HOLD FULL: 8 -> 16s
    spread = MAX_SPREAD;
  } else if (cyclePos < 3 * PHASE_MS) {
    // EXHALE: 16 -> 24s
    const t = (cyclePos - 2 * PHASE_MS) / PHASE_MS; // 0 -> 1
    spread = MAX_SPREAD - (MAX_SPREAD - MIN_SPREAD) * t;
  } else {
    // HOLD EMPTY: 24 -> 32s
    spread = MIN_SPREAD;
  }

  const leftX = -spread;
  const rightX = spread;

  return (
    <div className="h-24 flex items-center justify-center mb-2">
      <div className="relative w-40 h-16 flex items-center justify-center">
        <span
          className="absolute text-4xl font-black"
          style={{ transform: `translateX(${leftX}px)` }}
        >
          /
        </span>
        <span
          className="absolute text-4xl font-black"
          style={{ transform: `translateX(${rightX}px)` }}
        >
          /
        </span>
      </div>
    </div>
  );
}
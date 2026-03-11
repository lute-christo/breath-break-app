"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OnboardingProps {
  onDone: () => void;
}

const SCREENS = [
  {
    key: "what",
    content: (
      <div className="space-y-6">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-neutral-500 mb-3">
            BREATH<span className="text-red-600">{"//"}</span>BREAK
          </p>
          <h1 className="text-3xl font-black tracking-tight leading-tight">
            Courage training.
          </h1>
        </div>

        <p className="text-base text-neutral-300 leading-relaxed">
          Most breathing apps teach you to calm down.
        </p>
        <p className="text-base text-neutral-300 leading-relaxed">
          This one teaches you to turn toward.
        </p>

        <div className="border-l-2 border-neutral-700 pl-4 space-y-2 text-sm text-neutral-400">
          <p>Pick an emotion.</p>
          <p>Breathe with it for 3 minutes.</p>
          <p>That&apos;s the whole practice.</p>
        </div>

        <p className="text-xs text-neutral-500">
          Based on Tonglen — a Tibetan practice of breathing into difficulty
          rather than away from it.
        </p>
      </div>
    ),
  },
  {
    key: "how",
    content: (
      <div className="space-y-6">
        <h1 className="text-3xl font-black tracking-tight leading-tight">
          How a session works.
        </h1>

        <p className="text-sm text-neutral-400">
          Each session is 3 minutes. The cycle repeats until time is up.
        </p>

        <div className="space-y-4">
          {[
            {
              label: "INHALE //",
              text: "Breathe the feeling in. Let it get bigger, not smaller.",
            },
            {
              label: "HOLD //",
              text: "Stay with it at full capacity. Don't fix it.",
            },
            {
              label: "EXHALE //",
              text: "Breathe out. Send relief to everyone else carrying this right now.",
            },
            {
              label: "HOLD //",
              text: "Empty. Notice what remains.",
            },
          ].map(({ label, text }) => (
            <div key={label} className="flex gap-3">
              <span className="font-mono text-[0.65rem] text-neutral-500 uppercase tracking-[0.15em] pt-0.5 shrink-0 w-20">
                {label}
              </span>
              <p className="text-sm text-neutral-300 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-neutral-500">
          Each phase is 8 seconds. You can pause or end at any time — the
          breath doesn&apos;t have to be perfect.
        </p>
      </div>
    ),
  },
  {
    key: "modes",
    content: (
      <div className="space-y-6">
        <h1 className="text-3xl font-black tracking-tight leading-tight">
          Two intensities.
        </h1>

        <div className="space-y-3">
          <div className="border border-neutral-700 rounded-md px-4 py-3 space-y-1">
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-neutral-400">
              Standard
            </p>
            <p className="text-sm text-neutral-300">
              Direct language. Clear prompts. Good for most days and for
              starting out.
            </p>
          </div>

          <div className="border border-red-900 rounded-md px-4 py-3 space-y-1">
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-red-400">
              Hardcore
            </p>
            <p className="text-sm text-neutral-300">
              Raw language. No softening. For when Standard feels too polite
              for what you&apos;re carrying.
            </p>
          </div>
        </div>

        <p className="text-sm text-neutral-300 leading-relaxed">
          Start with Standard. Switch to Hardcore when you&apos;re ready to stop
          managing the feeling and start meeting it.
        </p>

        <p className="text-xs text-neutral-500">
          Pick the emotion that&apos;s most alive right now. The breath does
          the rest.
        </p>
      </div>
    ),
  },
];

export function Onboarding({ onDone }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const isLast = step === SCREENS.length - 1;

  const handleNext = () => {
    setDirection(1);
    if (isLast) {
      onDone();
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleSkip = () => {
    onDone();
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="flex-1 flex flex-col max-w-md mx-auto w-full px-6 pt-8 pb-6">
        {/* Skip button */}
        <div className="flex justify-end mb-8">
          <button
            onClick={handleSkip}
            className="text-[0.65rem] uppercase tracking-[0.15em] text-neutral-600 hover:text-neutral-400 transition"
          >
            Skip
          </button>
        </div>

        {/* Screen content */}
        <div className="flex-1">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={SCREENS[step].key}
              custom={direction}
              initial={{ opacity: 0, x: 24 * direction }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 * direction }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {SCREENS[step].content}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer: dots + button */}
        <div className="space-y-6 pt-4">
          {/* Step dots */}
          <div className="flex justify-center gap-2">
            {SCREENS.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                  i === step ? "bg-neutral-200" : "bg-neutral-700"
                }`}
              />
            ))}
          </div>

          {/* CTA button */}
          <button
            onClick={handleNext}
            className="w-full py-4 border border-neutral-700 rounded-md text-sm tracking-[0.1em] hover:border-neutral-400 active:scale-[0.99] transition"
          >
            {isLast ? "Start practicing //" : "Continue →"}
          </button>
        </div>
      </div>
    </div>
  );
}

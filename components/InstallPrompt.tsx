"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice?: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  if (!deferredPrompt || dismissed) return null;

  const handleInstallClick = async () => {
    try {
      await deferredPrompt.prompt();
      setDeferredPrompt(null);
    } catch {
      setDismissed(true);
    }
  };

  const handleClose = () => {
    setDismissed(true);
  };

  return (
    <div className="mt-4 text-[0.7rem] border border-neutral-800 rounded-md px-3 py-2 flex items-center justify-between gap-2 bg-black/40">
      <div className="text-neutral-300">
        Install BREATH//BREAK on your home screen for quicker reps.
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handleInstallClick}
          className="px-2 py-1 border border-neutral-600 rounded text-[0.65rem] uppercase tracking-[0.12em] hover:border-neutral-300 active:scale-[0.98] transition"
        >
          Install
        </button>
        <button
          onClick={handleClose}
          className="text-[0.65rem] text-neutral-500 hover:text-neutral-300"
        >
          Not now
        </button>
      </div>
    </div>
  );
}
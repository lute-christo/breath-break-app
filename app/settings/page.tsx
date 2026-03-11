"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { useSettings } from "@/hooks/useSettings";
import { practiceStore } from "@/lib/practiceStore";
import type { SessionLengthMinutes } from "@/lib/settingsStore";

function Toggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void | Promise<void>;
}) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      aria-pressed={enabled}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${
        enabled ? "bg-neutral-200" : "bg-neutral-700"
      }`}
    >
      <span
        className={`absolute top-[2px] left-[2px] w-5 h-5 rounded-full bg-black transition-transform duration-200 ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const { settings, update } = useSettings();

  const handleReminderToggle = async (enabled: boolean) => {
    if (enabled) {
      if (typeof Notification === "undefined") return;
      if (Notification.permission === "denied") return;
      if (Notification.permission !== "granted") {
        const result = await Notification.requestPermission();
        if (result !== "granted") return;
      }
    }
    update({ reminderEnabled: enabled });
  };

  const handleReset = async () => {
    if (!confirm("Reset all practice data? This cannot be undone.")) return;
    await practiceStore.resetAll();
    window.location.reload();
  };

  return (
    <main className="space-y-8 pb-16">
      <Header />

      <section className="space-y-6">
        <h1 className="text-lg font-semibold">Settings</h1>

        {/* Practice */}
        <div className="space-y-5">
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-neutral-500">
            Practice
          </p>

          {/* Session length */}
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-neutral-300">Session length</span>
            <div className="inline-flex items-center text-[0.7rem] border border-neutral-700 rounded-full overflow-hidden shrink-0">
              {([1, 3, 5] as SessionLengthMinutes[]).map((len) => (
                <button
                  key={len}
                  onClick={() => update({ sessionLengthMinutes: len })}
                  className={`px-3 py-1 uppercase tracking-[0.1em] transition ${
                    settings.sessionLengthMinutes === len
                      ? "bg-neutral-200 text-black"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  {len}m
                </button>
              ))}
            </div>
          </div>

          {/* Haptic feedback */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-neutral-300">Haptic feedback</p>
              <p className="text-xs text-neutral-500">
                Vibrate on each phase change
              </p>
            </div>
            <Toggle
              enabled={settings.hapticEnabled}
              onChange={(v) => update({ hapticEnabled: v })}
            />
          </div>

          {/* Audio cues */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-neutral-300">Audio cues</p>
              <p className="text-xs text-neutral-500">
                Soft tone on each phase change
              </p>
            </div>
            <Toggle
              enabled={settings.audioEnabled}
              onChange={(v) => update({ audioEnabled: v })}
            />
          </div>
        </div>

        <div className="border-t border-neutral-800" />

        {/* Reminders */}
        <div className="space-y-5">
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-neutral-500">
            Reminders
          </p>

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-neutral-300">Daily reminder</p>
              <p className="text-xs text-neutral-500">
                Notify if you haven&apos;t practiced yet
              </p>
            </div>
            <Toggle
              enabled={settings.reminderEnabled}
              onChange={handleReminderToggle}
            />
          </div>

          {settings.reminderEnabled && (
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-neutral-300">Reminder time</span>
              <input
                type="time"
                value={settings.reminderTime}
                onChange={(e) => update({ reminderTime: e.target.value })}
                className="bg-neutral-900 border border-neutral-700 rounded px-2 py-1 text-sm text-neutral-200"
              />
            </div>
          )}
        </div>

        <div className="border-t border-neutral-800" />

        {/* Data */}
        <div className="space-y-4">
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-neutral-500">
            Data
          </p>
          <button
            onClick={handleReset}
            className="text-sm text-red-400 hover:text-red-300 transition"
          >
            Reset all practice data
          </button>
        </div>

        <div className="border-t border-neutral-800" />

        {/* Premium */}
        <Link
          href="/premium"
          className="flex items-center justify-between text-sm text-neutral-300 hover:text-neutral-100 transition"
        >
          <span>BREATH//BREAK Pro</span>
          <span className="text-neutral-500">→</span>
        </Link>
      </section>

      <BottomNav />
    </main>
  );
}

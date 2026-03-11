"use client";

export type SessionLengthMinutes = 1 | 3 | 5;

export interface AppSettings {
  hapticEnabled: boolean;
  audioEnabled: boolean;
  reminderEnabled: boolean;
  reminderTime: string; // "HH:MM" 24-hour format
  sessionLengthMinutes: SessionLengthMinutes;
}

const STORAGE_KEY = "breathbreak_settings_v1";

const DEFAULTS: AppSettings = {
  hapticEnabled: true,
  audioEnabled: false,
  reminderEnabled: false,
  reminderTime: "08:00",
  sessionLengthMinutes: 3,
};

export function getSettings(): AppSettings {
  if (typeof window === "undefined") return { ...DEFAULTS };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULTS };
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULTS };
  }
}

export function saveSettings(patch: Partial<AppSettings>): AppSettings {
  const next = { ...getSettings(), ...patch };
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
  return next;
}

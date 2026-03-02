// lib/practiceStore.ts
"use client";

export type PracticeMode = "standard" | "hardcore";

export type SessionLog = {
  id: string;
  emotion: string;
  mode: PracticeMode;
  startedAt: string;    // ISO string
  durationSec: number;  // 0–180
  completed: boolean;   // full 3 mins?
};

export type PracticeSummary = {
  totalSessions: number;
  totalMinutes: number;
  byEmotion: Record<string, number>;
  streakDays: number;
  totalDaysPracticed: number;
  lastSessionDate: string | null; // ISO
  mostPracticedEmotion: string | null;
};

export interface PracticeStore {
  logSession(entry: Omit<SessionLog, "id">): Promise<SessionLog>;
  getSessions(): Promise<SessionLog[]>;
  getSummary(): Promise<PracticeSummary>;
  resetAll(): Promise<void>;
}

/**
 * LocalStorage-backed implementation.
 * Later you can add a SupabasePracticeStore implementing the same interface.
 */
const STORAGE_KEY = "breathbreak_sessions_v1";

// basic id generator, no extra deps
const makeId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const safeGetWindow = (): Window | null =>
  typeof window === "undefined" ? null : window;

function readSessionsFromStorage(): SessionLog[] {
  const win = safeGetWindow();
  if (!win) return [];
  try {
    const raw = win.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // You could validate shape here if you want to be extra safe
    return parsed;
  } catch {
    return [];
  }
}

function writeSessionsToStorage(sessions: SessionLog[]) {
  const win = safeGetWindow();
  if (!win) return;
  try {
    win.localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch {
    // ignore quota errors for now
  }
}

function computeSummary(sessions: SessionLog[]): PracticeSummary {
  if (!sessions.length) {
    return {
      totalSessions: 0,
      totalMinutes: 0,
      byEmotion: {},
      streakDays: 0,
      totalDaysPracticed: 0,
      lastSessionDate: null,
      mostPracticedEmotion: null,
    };
  }

  const byEmotion: Record<string, number> = {};
  let totalMinutes = 0;

  for (const s of sessions) {
    byEmotion[s.emotion] = (byEmotion[s.emotion] ?? 0) + 1;
    totalMinutes += s.durationSec / 60;
  }

  // most practiced emotion
  let mostPracticedEmotion: string | null = null;
  let maxCount = 0;
  for (const [emotion, count] of Object.entries(byEmotion)) {
    if (count > maxCount) {
      maxCount = count;
      mostPracticedEmotion = emotion;
    }
  }

  // streak & days practiced: based on calendar days with >=1 session
  const daySet = new Set<string>();
  for (const s of sessions) {
    const d = new Date(s.startedAt);
    const dayKey = d.toISOString().slice(0, 10); // yyyy-mm-dd
    daySet.add(dayKey);
  }

  const totalDaysPracticed = daySet.size;

  // walk backwards from today while we have practice days
  let streak = 0;
  const cursor = new Date();

  while (true) {
    const key = cursor.toISOString().slice(0, 10);
    if (!daySet.has(key)) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  // last session date (most recent in array)
  const lastSession = sessions[sessions.length - 1];
  const lastSessionDate = lastSession?.startedAt ?? null;

  return {
    totalSessions: sessions.length,
    totalMinutes: Math.round(totalMinutes),
    byEmotion,
    streakDays: streak,
    totalDaysPracticed,
    lastSessionDate,
    mostPracticedEmotion,
  };
}

class LocalPracticeStore implements PracticeStore {
  async logSession(entry: Omit<SessionLog, "id">): Promise<SessionLog> {
    const sessions = readSessionsFromStorage();
    const newEntry: SessionLog = { id: makeId(), ...entry };
    const all = [...sessions, newEntry];

    // optional prune: keep last 500
    const pruned = all.slice(-500);
    writeSessionsToStorage(pruned);

    return newEntry;
  }

  async getSessions(): Promise<SessionLog[]> {
    return readSessionsFromStorage();
  }

  async getSummary(): Promise<PracticeSummary> {
    const sessions = readSessionsFromStorage();
    return computeSummary(sessions);
  }

  async resetAll(): Promise<void> {
    writeSessionsToStorage([]);
  }
}

// this is what you import elsewhere
export const practiceStore: PracticeStore = new LocalPracticeStore();

/**
 * Later, when you add Supabase:
 *
 * export const practiceStore: PracticeStore = new SupabasePracticeStore(supabaseClient);
 */
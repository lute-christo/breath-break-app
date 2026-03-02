// lib/localStats.ts

const STORAGE_KEY = "breathbreak_stats_v1";

export interface LocalStats {
  totalSessions: number;
  byEmotion: Record<string, number>;
}

function getDefaultStats(): LocalStats {
  return {
    totalSessions: 0,
    byEmotion: {},
  };
}

export function getStats(): LocalStats {
  if (typeof window === "undefined") {
    // In case this is ever called during SSR, just return defaults.
    return getDefaultStats();
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultStats();

    const parsed = JSON.parse(raw);
    if (
      typeof parsed.totalSessions === "number" &&
      parsed.byEmotion &&
      typeof parsed.byEmotion === "object"
    ) {
      return parsed as LocalStats;
    }

    return getDefaultStats();
  } catch {
    return getDefaultStats();
  }
}

export function logSession(emotion: string) {
  if (typeof window === "undefined") return;

  const stats = getStats();
  stats.totalSessions += 1;

  const key = emotion.toLowerCase();
  stats.byEmotion[key] = (stats.byEmotion[key] || 0) + 1;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}
  export function resetStats() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}
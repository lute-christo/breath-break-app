// src/app/history/page.tsx
"use client";

import { useMemo, useState } from "react";
import { Nav } from "@/components/Nav";
import { usePracticeData } from "@/hooks/usePracticeData";
import type { SessionLog } from "@/lib/practiceStore";

function formatTime(ts: string) {
  const d = new Date(ts);
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatDuration(seconds: number) {
  const s = Math.max(0, seconds);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

export default function HistoryPage() {
  const { summary, sessions, loading, error } = usePracticeData({
    includeSessions: true,
  });

  const [emotionFilter, setEmotionFilter] = useState<string | "all">("all");
  const [modeFilter, setModeFilter] = useState<"all" | "standard" | "hardcore">(
    "all"
  );

  const filteredSessions: SessionLog[] = useMemo(() => {
    if (!sessions) return [];
    return [...sessions]
      .sort(
        (a, b) =>
          new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
      )
      .filter((s) => {
        if (emotionFilter !== "all" && s.emotion !== emotionFilter) return false;
        if (modeFilter !== "all" && s.mode !== modeFilter) return false;
        return true;
      });
  }, [sessions, emotionFilter, modeFilter]);

  const emotionOptions = useMemo(() => {
    if (!summary) return [];
    return Object.keys(summary.byEmotion).sort();
  }, [summary]);

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col">
        <Nav />
        <section className="flex-1 px-4 py-8 flex items-center justify-center">
          <p className="text-sm uppercase tracking-wide text-neutral-400">
            Loading practice history…
          </p>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex flex-col">
        <Nav />
        <section className="flex-1 px-4 py-8 flex items-center justify-center">
          <p className="text-red-400 text-sm">{error}</p>
        </section>
      </main>
    );
  }

  const totalSessions = summary?.totalSessions ?? 0;
  const totalMinutes = summary?.totalMinutes ?? 0;
  const streakDays = summary?.streakDays ?? 0;
  const totalDaysPracticed = summary?.totalDaysPracticed ?? 0;
  const mostPracticedEmotion = summary?.mostPracticedEmotion ?? null;

  return (
    <main className="min-h-screen flex flex-col">
      <Nav />

      <section className="flex-1 px-4 py-8 max-w-2xl mx-auto space-y-8">
        {/* Header + summary */}
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Practice History
          </h1>
          {summary && (
            <div className="text-sm text-neutral-400 space-y-1">
              <p>
                <span className="font-mono text-neutral-100">
                  {totalSessions}
                </span>{" "}
                session{totalSessions === 1 ? "" : "s"} ·{" "}
                <span className="font-mono text-neutral-100">
                  {totalMinutes}
                </span>{" "}
                minute{totalMinutes === 1 ? "" : "s"} total · practiced on{" "}
                <span className="font-mono text-neutral-100">
                  {totalDaysPracticed}
                </span>{" "}
                day{totalDaysPracticed === 1 ? "" : "s"}.
              </p>
              <p>
                Streak:{" "}
                <span className="font-mono text-neutral-100">
                  {streakDays}
                </span>{" "}
                day{streakDays === 1 ? "" : "s"} in a row.
              </p>
              {mostPracticedEmotion && (
                <p>
                  Most practiced emotion:{" "}
                  <span className="font-mono text-neutral-100">
                    {mostPracticedEmotion}
                  </span>
                  .
                </p>
              )}
            </div>
          )}
        </header>

        {/* Filters */}
        <section className="flex gap-4 text-xs text-neutral-300">
          <div className="flex flex-col gap-1">
            <span className="uppercase tracking-wide text-[0.65rem] text-neutral-500">
              Emotion
            </span>
            <select
              value={emotionFilter}
              onChange={(e) =>
                setEmotionFilter(e.target.value as typeof emotionFilter)
              }
              className="bg-neutral-900 border border-neutral-700 rounded px-2 py-1"
            >
              <option value="all">All</option>
              {emotionOptions.map((emotion) => (
                <option key={emotion} value={emotion}>
                  {emotion}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <span className="uppercase tracking-wide text-[0.65rem] text-neutral-500">
              Mode
            </span>
            <select
              value={modeFilter}
              onChange={(e) =>
                setModeFilter(e.target.value as typeof modeFilter)
              }
              className="bg-neutral-900 border border-neutral-700 rounded px-2 py-1"
            >
              <option value="all">All</option>
              <option value="standard">Standard</option>
              <option value="hardcore">Hardcore</option>
            </select>
          </div>
        </section>

        {/* Session list */}
        <section className="space-y-2">
          {filteredSessions.length === 0 ? (
            <p className="text-sm text-neutral-500">
              No sessions yet with these filters.
            </p>
          ) : (
            <ul className="space-y-2">
              {filteredSessions.map((s) => (
                <li
                  key={s.id}
                  className="border border-neutral-800 rounded-md px-3 py-2 flex justify-between items-center text-sm"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs uppercase tracking-wide">
                        {s.emotion}
                      </span>
                      <span className="text-[0.65rem] px-1.5 py-0.5 rounded-full border border-neutral-700">
                        {s.mode === "hardcore" ? "HARDCORE" : "Standard"}
                      </span>
                      {!s.completed && (
                        <span className="text-[0.65rem] text-amber-400">
                          ended early
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500">
                      {formatTime(s.startedAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-xs">
                      {formatDuration(s.durationSec)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </section>
    </main>
  );
}
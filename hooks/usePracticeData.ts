// hooks/usePracticeData.ts
"use client";

import { useEffect, useState } from "react";
import { practiceStore, PracticeSummary, SessionLog } from "../lib/practiceStore";

type PracticeDataState = {
  summary: PracticeSummary | null;
  sessions: SessionLog[] | null;
  loading: boolean;
  error: string | null;
};

export function usePracticeData(options?: { includeSessions?: boolean }) {
  const { includeSessions = false } = options ?? {};

  const [state, setState] = useState<PracticeDataState>({
    summary: null,
    sessions: includeSessions ? null : [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [summary, sessions] = await Promise.all([
          practiceStore.getSummary(),
          includeSessions ? practiceStore.getSessions() : Promise.resolve([]),
        ]);

        if (cancelled) return;
        setState({
          summary,
          sessions: includeSessions ? sessions : [],
          loading: false,
          error: null,
        });
      } catch (e) {
        if (cancelled) return;
        setState((prev) => ({
          ...prev,
          loading: false,
          error: "Failed to load practice data",
        }));
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [includeSessions]);

  return state;
}
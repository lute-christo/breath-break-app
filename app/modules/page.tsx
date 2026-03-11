"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { EmotionGrid } from "@/components/EmotionGrid";
import { BottomNav } from "@/components/BottomNav";
import { ALL_EMOTIONS } from "@/data/scripts";
import type { Mode } from "@/data/scripts";

function ModulesInner() {
  const searchParams = useSearchParams();
  const rawMode = (searchParams.get("mode") || "standard").toLowerCase() as Mode;
  const mode: Mode = rawMode === "hardcore" ? "hardcore" : "standard";

  return (
    <main className="space-y-6 pb-16">
      <Header />

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">All emotions</h1>
          <div className="text-[0.7rem] uppercase tracking-[0.2em] text-neutral-400">
            {mode === "hardcore" ? "HARDCORE" : "STANDARD"}
          </div>
        </div>

        <EmotionGrid mode={mode} emotions={ALL_EMOTIONS} />
      </section>

      <BottomNav />
    </main>
  );
}

export default function ModulesPage() {
  return (
    <Suspense>
      <ModulesInner />
    </Suspense>
  );
}

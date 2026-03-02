import { Header } from "@/components/Header";
import { EmotionGrid } from "@/components/EmotionGrid";
import type { Mode } from "@/data/scripts";

type ModulesPageProps = {
  searchParams?: {
    mode?: string;
  };
};

export default function ModulesPage({ searchParams }: ModulesPageProps) {
  const rawMode = (searchParams?.mode || "standard").toLowerCase() as Mode;
  const mode: Mode = rawMode === "hardcore" ? "hardcore" : "standard";

  return (
    <main className="space-y-6">
      <Header />

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Browse emotions</h1>
          <div className="text-[0.7rem] uppercase tracking-[0.2em] text-neutral-400">
            Mode: {mode === "hardcore" ? "HARDCORE" : "STANDARD"}
          </div>
        </div>

        <EmotionGrid mode={mode} />
      </section>
    </main>
  );
}
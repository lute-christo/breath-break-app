import { Header } from "@/components/Header";

export default function PremiumPage() {
  return (
    <main className="space-y-6">
      <Header />

      <section className="space-y-3">
        <h1 className="text-lg font-semibold">BREATH//BREAK Pro</h1>
        <p className="text-sm text-neutral-300">
          Unlock Hardcore Mode, deeper emotion packs, and audio tracks.
        </p>

        <div className="border border-neutral-700 rounded-md p-4 space-y-2 text-sm">
          <p>• All emotion modules</p>
          <p>• Hardcore Mode</p>
          <p>• Dark Night pack</p>
          <p>• Audio sessions</p>
        </div>

        <button className="w-full mt-2 py-3 border border-neutral-700 rounded-md text-sm hover:border-neutral-400 active:scale-[0.99] transition">
          Upgrade (stub)
        </button>

        <p className="text-xs text-neutral-500">
          This is just a placeholder screen for now. We&apos;ll wire up real
          subscriptions later.
        </p>
      </section>
    </main>
  );
}
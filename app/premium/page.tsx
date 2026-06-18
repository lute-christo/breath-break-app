"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { redeemCode, isBetaUnlock } from "@/lib/premiumStore";

// ─── SETUP ────────────────────────────────────────────────────────────────────
// 1. Go to https://formspree.io and create a free account
// 2. Create a new form, set the destination email to lutec2@gmail.com
// 3. Replace YOUR_FORM_ID below with the ID from your Formspree dashboard
// ─────────────────────────────────────────────────────────────────────────────
const FORMSPREE_ID = "xnjgbegy";

const PREMIUM_FEATURES = [
  {
    title: "All 9 emotions",
    description:
      "Unlock shame, jealousy, loneliness, exhaustion, and numbness — the harder ones.",
  },
  {
    title: "Hardcore mode",
    description:
      "Raw, unfiltered language. For when Standard feels too polite for what you're carrying.",
  },
  {
    title: "Flexible session lengths",
    description:
      "1-minute sessions when you're short on time. 5-minute sessions when you're ready to go deeper.",
  },
];

export default function PremiumPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [code, setCode] = useState("");
  const [codeStatus, setCodeStatus] = useState<"idle" | "success" | "error">(
    isBetaUnlock() ? "success" : "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("submitting");

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.ok) {
        setStatus("done");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="space-y-8 pb-8">
      <Header />

      <section className="space-y-6">
        {/* Heading */}
        <div className="space-y-2">
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-neutral-500">
            Coming soon
          </p>
          <h1 className="text-2xl font-black tracking-tight leading-tight">
            BREATH//BREAK Pro
          </h1>
          <p className="text-sm text-neutral-300">
            One-time purchase. No subscription. Own it forever.
          </p>
        </div>

        {/* Feature list */}
        <div className="space-y-3">
          {PREMIUM_FEATURES.map(({ title, description }) => (
            <div
              key={title}
              className="border border-neutral-800 rounded-md px-4 py-3 space-y-1"
            >
              <p className="text-sm font-medium text-neutral-200">{title}</p>
              <p className="text-xs text-neutral-500">{description}</p>
            </div>
          ))}
        </div>

        {/* Email capture */}
        <div className="border-t border-neutral-800 pt-6 space-y-4">
          {status === "done" ? (
            <div className="space-y-2">
              <p className="text-sm text-neutral-200">You&apos;re on the list.</p>
              <p className="text-xs text-neutral-500">
                We&apos;ll email you when Pro is available.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-1">
                <p className="text-sm text-neutral-300">
                  Get notified when Pro launches.
                </p>
                <p className="text-xs text-neutral-500">
                  No spam. One email when it&apos;s ready.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-md px-3 py-3 text-sm text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition"
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-3 border border-neutral-700 rounded-md text-sm hover:border-neutral-400 active:scale-[0.99] transition disabled:opacity-50"
                >
                  {status === "submitting" ? "Sending…" : "Notify me //"}
                </button>
                {status === "error" && (
                  <p className="text-xs text-red-400">
                    Something went wrong. Try again or email lutec2@gmail.com directly.
                  </p>
                )}
              </form>
            </>
          )}
        </div>
      </section>
      {/* Beta access code */}
      <section className="border-t border-neutral-800 pt-6 space-y-3">
        <p className="text-[0.65rem] uppercase tracking-[0.2em] text-neutral-500">
          Have a code?
        </p>
        {codeStatus === "success" ? (
          <p className="text-sm text-neutral-200">Pro access unlocked. Welcome.</p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (redeemCode(code)) {
                setCodeStatus("success");
              } else {
                setCodeStatus("error");
              }
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              placeholder="Enter access code"
              value={code}
              onChange={(e) => { setCode(e.target.value); setCodeStatus("idle"); }}
              className="flex-1 bg-neutral-900 border border-neutral-700 rounded-md px-3 py-2 text-sm text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition uppercase"
            />
            <button
              type="submit"
              className="px-4 py-2 border border-neutral-700 rounded-md text-sm hover:border-neutral-400 active:scale-[0.99] transition"
            >
              Unlock
            </button>
          </form>
        )}
        {codeStatus === "error" && (
          <p className="text-xs text-red-400">That code didn&apos;t work.</p>
        )}
      </section>
    </main>
  );
}

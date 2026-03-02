"use client";

import Link from "next/link";

export function Nav() {
  return (
    <nav className="w-full px-4 py-3 border-b border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
      <Link
        href="/"
        className="hover:text-neutral-200 uppercase tracking-[0.15em]"
      >
        BREATH//BREAK
      </Link>

      <div className="flex items-center gap-4">
        <Link
          href="/history"
          className="hover:text-neutral-200 tracking-[0.1em]"
        >
          History
        </Link>

        <Link
          href="/modules"
          className="hover:text-neutral-200 tracking-[0.1em]"
        >
          Emotions
        </Link>
      </div>
    </nav>
  );
}
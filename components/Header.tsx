"use client";

import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between mb-6">
      <button
        onClick={() => router.push("/")}
        className="font-black tracking-[0.25em] text-[0.7rem]"
      >
        BREATH<span className="text-red-600">{"//"}</span>BREAK
      </button>
      <button
        className="text-xs text-neutral-400 hover:text-neutral-200 transition"
        onClick={() => router.push("/premium")}
      >
        ⋯
      </button>
    </header>
  );
}
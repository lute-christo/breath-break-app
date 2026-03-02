"use client";

import { useRouter } from "next/navigation";
import type { Mode } from "@/data/scripts";

interface BreathButtonProps {
  mode: Mode;
  defaultEmotion?: string;
}

export function BreathButton({
  mode,
  defaultEmotion = "anxiety",
}: BreathButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(
      `/session?emotion=${encodeURIComponent(
        defaultEmotion
      )}&mode=${encodeURIComponent(mode)}`
    );
  };

  return (
    <button
      onClick={handleClick}
      className="w-full py-7 border border-neutral-700 rounded-md text-xl font-semibold tracking-[0.3em] hover:border-neutral-400 active:scale-[0.99] transition"
    >
      {"//"}
    </button>
  );
}
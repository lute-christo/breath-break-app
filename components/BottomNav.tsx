"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/history", label: "History" },
    { href: "/modules", label: "Emotions" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-neutral-800 bg-black flex justify-around text-[0.65rem] uppercase tracking-[0.15em] pb-[env(safe-area-inset-bottom)]">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`flex-1 py-3 text-center transition ${
            pathname === href
              ? "text-neutral-100"
              : "text-neutral-500 hover:text-neutral-300"
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}

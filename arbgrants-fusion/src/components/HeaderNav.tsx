"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function HeaderNav() {
  const pathname = usePathname();
  const active = pathname.startsWith("/ltip")
    ? "ltip"
    : pathname.startsWith("/stip")
      ? "stip"
      : null;

  const linkClass = (program: "ltip" | "stip") =>
    `transition-colors ${
      active === program
        ? "text-arb-blue dark:text-arb-teal"
        : "text-zinc-600 dark:text-zinc-400 hover:text-arb-blue dark:hover:text-arb-teal"
    }`;

  return (
    <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
      <Link href="/?program=ltip#programs" className={linkClass("ltip")}>
        LTIP
      </Link>
      <Link href="/?program=stip#programs" className={linkClass("stip")}>
        STIP
      </Link>
    </nav>
  );
}

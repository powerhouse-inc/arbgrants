"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { ArbitrumLtipGranteeState } from "@arbitrum/arbgrants/document-models/arbitrum-ltip-grantee";
import type { ArbitrumStipGranteeState } from "@arbitrum/arbgrants/document-models/arbitrum-stip-grantee";
import { GranteeCard } from "./GranteeCard";

type GranteeState = ArbitrumLtipGranteeState | ArbitrumStipGranteeState;
type Item = { id: string; state: GranteeState };
type ProgramData = { items: ReadonlyArray<Item>; totalCount: number };

type Program = "ltip" | "stip";

const PROGRAMS: ReadonlyArray<{
  key: Program;
  title: string;
  subtitle: string;
}> = [
  {
    key: "ltip",
    title: "LTIP Grantees",
    subtitle: "Long-Term Incentives Program",
  },
  {
    key: "stip",
    title: "STIP Grantees",
    subtitle: "Short-Term Incentives Program",
  },
];

type Props = {
  ltip: ProgramData;
  stip: ProgramData;
};

export function ProgramTabs({ ltip, stip }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active: Program =
    searchParams.get("program") === "stip" ? "stip" : "ltip";

  const handleSelect = (program: Program) => {
    if (program === active) return;
    const params = new URLSearchParams(searchParams);
    params.set("program", program);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const data = active === "ltip" ? ltip : stip;
  const meta = PROGRAMS.find((p) => p.key === active)!;

  const [query, setQuery] = useState("");
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data.items;
    return data.items.filter((item) =>
      (item.state.granteeName ?? "").toLowerCase().includes(q),
    );
  }, [data.items, query]);
  const isFiltering = query.trim().length > 0;

  return (
    <section>
      <span id="programs" className="block scroll-mt-24" aria-hidden />

      <div
        role="tablist"
        aria-label="Programs"
        className="flex items-end justify-between border-b border-zinc-200 dark:border-arb-border"
      >
        <div className="flex">
          {PROGRAMS.map((p) => {
            const count = (p.key === "ltip" ? ltip : stip).totalCount;
            const isActive = p.key === active;
            return (
              <button
                key={p.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleSelect(p.key)}
                className={`-mb-px inline-flex items-center gap-2 border-b-2 px-4 py-3 font-mono text-xs uppercase tracking-wider transition-colors ${
                  isActive
                    ? "border-arb-blue text-arb-blue"
                    : "border-transparent text-zinc-500 dark:text-arb-muted hover:text-arb-blue dark:hover:text-arb-blue"
                }`}
              >
                <span>{p.key}</span>
                <span
                  className={`rounded-md px-1.5 py-0.5 text-[10px] ${
                    isActive
                      ? "bg-arb-blue/10 text-arb-blue"
                      : "bg-zinc-100 dark:bg-arb-surface-2 text-zinc-500 dark:text-arb-muted"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <header className="mt-6 mb-4 flex items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="h-6 w-1 rounded-full bg-arb-blue" />
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              {meta.title}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {meta.subtitle}
            </p>
          </div>
        </div>
        <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-arb-muted">
          {isFiltering
            ? `${filteredItems.length} of ${data.totalCount}`
            : `${data.totalCount} ${data.totalCount === 1 ? "grantee" : "grantees"}`}
        </span>
      </header>

      <div className="mb-6">
        <input
          type="search"
          placeholder="Search grantees…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label={`Search ${meta.title}`}
          className="w-full rounded-lg border border-zinc-200 dark:border-arb-border bg-white dark:bg-arb-surface-2 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-arb-muted focus:border-arb-blue focus:outline-none"
        />
      </div>

      {data.items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 dark:border-arb-border p-10 text-center text-sm text-zinc-500">
          No grantees found.
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 dark:border-arb-border p-10 text-center text-sm text-zinc-500">
          No grantees match “{query.trim()}”.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <GranteeCard
              key={item.id}
              program={active}
              id={item.id}
              state={item.state}
            />
          ))}
        </div>
      )}
    </section>
  );
}

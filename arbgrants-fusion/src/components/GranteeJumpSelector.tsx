"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Grantee = { id: string; name: string };

type Props = {
  program: "ltip" | "stip";
  currentId: string;
  grantees: ReadonlyArray<Grantee>;
};

export function GranteeJumpSelector({ program, currentId, grantees }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const current = grantees.find((g) => g.id === currentId);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return grantees;
    return grantees.filter((g) => g.name.toLowerCase().includes(q));
  }, [grantees, query]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onMouseDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.children[activeIdx] as
      | HTMLElement
      | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIdx, open]);

  const navigate = (id: string) => {
    setOpen(false);
    if (id === currentId) return;
    router.push(`/${program}/${id}/`);
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filtered[activeIdx];
      if (item) navigate(item.id);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex max-w-[18rem] items-center gap-2 rounded-lg border border-zinc-200 dark:border-arb-border bg-white dark:bg-arb-surface-2 px-3 py-2 text-sm hover:border-arb-blue dark:hover:border-arb-blue transition-colors"
      >
        <span className="truncate text-zinc-700 dark:text-zinc-200">
          {current?.name || "Jump to grantee"}
        </span>
        <span
          aria-hidden
          className={`text-zinc-500 dark:text-arb-muted transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-80 overflow-hidden rounded-xl border border-zinc-200 dark:border-arb-border bg-white dark:bg-arb-surface-2 shadow-lg">
          <div className="border-b border-zinc-100 dark:border-arb-border/60 p-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search grantees…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onInputKey}
              className="w-full rounded-md border border-zinc-200 dark:border-arb-border bg-white dark:bg-arb-dark px-2.5 py-1.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-arb-muted focus:border-arb-blue focus:outline-none"
            />
          </div>
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-sm text-zinc-500 dark:text-arb-muted">
              No matches
            </div>
          ) : (
            <ul
              ref={listRef}
              role="listbox"
              className="max-h-72 overflow-auto py-1"
            >
              {filtered.map((g, idx) => {
                const isCurrent = g.id === currentId;
                const isActive = idx === activeIdx;
                return (
                  <li
                    key={g.id}
                    role="option"
                    aria-selected={isCurrent}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => navigate(g.id)}
                    className={`flex cursor-pointer items-center justify-between gap-3 px-3 py-2 text-sm ${
                      isActive
                        ? "bg-arb-blue/10 text-arb-blue"
                        : "text-zinc-700 dark:text-zinc-200"
                    }`}
                  >
                    <span className="truncate">{g.name}</span>
                    {isCurrent && (
                      <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-arb-muted">
                        current
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

import type { ArbitrumLtipGranteeState } from "@arbitrum/arbgrants/document-models/arbitrum-ltip-grantee";
import type { ArbitrumStipGranteeState } from "@arbitrum/arbgrants/document-models/arbitrum-stip-grantee";
import { GranteeCard } from "./GranteeCard";

type GranteeState = ArbitrumLtipGranteeState | ArbitrumStipGranteeState;

type Props = {
  id: string;
  program: "ltip" | "stip";
  title: string;
  subtitle: string;
  items: ReadonlyArray<{ id: string; state: GranteeState }>;
  totalCount: number;
};

export function GranteeSection({
  id,
  program,
  title,
  subtitle,
  items,
  totalCount,
}: Props) {
  return (
    <section id={id} className="scroll-mt-24">
      <header className="mb-6 flex items-end justify-between border-b border-zinc-200 dark:border-arb-border pb-4">
        <div className="flex items-center gap-3">
          <span className="h-6 w-1 rounded-full bg-arb-blue" />
          <div>
            <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {subtitle}
            </p>
          </div>
        </div>
        <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-arb-muted">
          {totalCount} {totalCount === 1 ? "grantee" : "grantees"}
        </span>
      </header>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 dark:border-arb-border p-10 text-center text-sm text-zinc-500">
          No grantees found.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <GranteeCard
              key={item.id}
              program={program}
              id={item.id}
              state={item.state}
            />
          ))}
        </div>
      )}
    </section>
  );
}

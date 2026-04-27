import Link from "next/link";
import type { ArbitrumLtipGranteeState } from "@arbitrum/arbgrants/document-models/arbitrum-ltip-grantee";
import type { ArbitrumStipGranteeState } from "@arbitrum/arbgrants/document-models/arbitrum-stip-grantee";
import { formatArb } from "@/lib/format";

type GranteeState = ArbitrumLtipGranteeState | ArbitrumStipGranteeState;

type Props = {
  program: "ltip" | "stip";
  id: string;
  state: Pick<
    GranteeState,
    "granteeName" | "grantSize" | "matchingGrantSize" | "grantSummary"
  >;
};

export function GranteeCard({ program, id, state }: Props) {
  const name = state.granteeName?.trim() || "Untitled grantee";
  const summary = state.grantSummary?.trim();

  return (
    <Link
      href={`/${program}/${id}/`}
      className="group relative block rounded-xl border border-zinc-200 dark:border-arb-border bg-white dark:bg-arb-surface-2 p-5 transition-all hover:border-arb-blue dark:hover:border-arb-blue hover:shadow-[0_0_0_1px_rgba(18,170,255,0.3)]"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-base font-semibold tracking-tight group-hover:text-arb-blue transition-colors">
          {name}
        </h3>
        <span className="shrink-0 rounded-md border border-arb-blue/30 bg-arb-blue/10 px-2 py-0.5 text-[10px] font-mono font-medium uppercase tracking-wider text-arb-blue">
          {program}
        </span>
      </div>
      {summary && (
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
          {summary}
        </p>
      )}
      <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs border-t border-zinc-100 dark:border-arb-border/60 pt-4">
        <div>
          <dt className="font-mono uppercase tracking-wider text-zinc-500 dark:text-arb-muted">
            Grant size
          </dt>
          <dd className="mt-0.5 font-mono text-zinc-900 dark:text-zinc-100">
            {formatArb(state.grantSize)}
          </dd>
        </div>
        <div>
          <dt className="font-mono uppercase tracking-wider text-zinc-500 dark:text-arb-muted">
            Matching
          </dt>
          <dd className="mt-0.5 font-mono text-zinc-900 dark:text-zinc-100">
            {formatArb(state.matchingGrantSize)}
          </dd>
        </div>
      </dl>
    </Link>
  );
}

import Link from "next/link";
import type {
  ArbitrumLtipGranteeState,
  Phase,
} from "@arbitrum/arbgrants/document-models/arbitrum-ltip-grantee";
import type { ArbitrumStipGranteeState } from "@arbitrum/arbgrants/document-models/arbitrum-stip-grantee";
import { AddressRow } from "./AddressRow";
import { PhaseCard } from "./PhaseCard";
import { Stat } from "./Stat";
import { formatArb } from "@/lib/format";

type Props = {
  program: "ltip" | "stip";
  state: ArbitrumLtipGranteeState | ArbitrumStipGranteeState;
};

export function GranteeDetail({ program, state }: Props) {
  const name = state.granteeName?.trim() || "Untitled grantee";
  const phases = (state.phases ?? []).filter(
    (p): p is Phase => p !== null && p !== undefined,
  );
  const fundingTypes = (state.fundingType ?? [])
    .filter((t): t is NonNullable<typeof t> => t !== null && t !== undefined)
    .join(", ");

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 space-y-10">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-mono uppercase tracking-wider text-zinc-500 dark:text-arb-muted hover:text-arb-blue dark:hover:text-arb-blue transition-colors"
        >
          ← Back to grantees
        </Link>
      </div>

      <header className="flex flex-wrap items-start justify-between gap-6 border-b border-zinc-200 dark:border-arb-border pb-8">
        <div>
          <span className="inline-block rounded-md border border-arb-blue/30 bg-arb-blue/10 px-2 py-0.5 text-[10px] font-mono font-medium uppercase tracking-wider text-arb-blue">
            {program}
          </span>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">{name}</h1>
          {state.grantSummary && (
            <p className="mt-3 text-zinc-600 dark:text-zinc-400 max-w-3xl">
              {state.grantSummary}
            </p>
          )}
        </div>
        {state.metricsDashboardLink && (
          <a
            href={state.metricsDashboardLink}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 rounded-lg border border-arb-blue bg-arb-blue px-4 py-2 text-sm font-medium text-white hover:bg-arb-blue-light hover:border-arb-blue-light transition-colors"
          >
            Metrics dashboard
            <span aria-hidden>↗</span>
          </a>
        )}
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label="Grant size"
          value={formatArb(state.grantSize)}
          accent
        />
        <Stat
          label="Matching grant"
          value={formatArb(state.matchingGrantSize)}
        />
        <Stat label="Funding type" value={fundingTypes || "—"} />
        <Stat label="Phases" value={String(phases.length)} />
      </section>

      <section className="rounded-xl border border-zinc-200 dark:border-arb-border bg-white dark:bg-arb-surface-2 p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold mb-5">
          <span className="h-5 w-1 rounded-full bg-arb-blue" />
          Addresses
        </h2>
        <dl className="grid gap-5 sm:grid-cols-2 text-sm">
          <AddressRow
            label="Authorized signer"
            value={state.authorizedSignerAddress}
          />
          <AddressRow label="Funding address" value={state.fundingAddress} />
          <AddressRow
            label="Disbursement contract"
            value={state.disbursementContractAddress}
          />
        </dl>
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-lg font-semibold mb-5">
          <span className="h-5 w-1 rounded-full bg-arb-blue" />
          Phases
        </h2>
        {phases.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-300 dark:border-arb-border p-8 text-center text-sm text-zinc-500">
            No phase data recorded.
          </div>
        ) : (
          <ol className="space-y-4">
            {phases.map((phase, idx) => (
              <PhaseCard key={idx} index={idx} phase={phase} />
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}

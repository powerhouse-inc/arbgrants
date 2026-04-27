import type {
  NamedKpi,
  Phase,
  Status,
} from "@arbitrum/arbgrants/document-models/arbitrum-ltip-grantee";
import { Metric } from "./Metric";
import { Notes } from "./Notes";
import { StatusBadge } from "./StatusBadge";
import { formatArb, formatDate, formatNumber } from "@/lib/format";

export function PhaseCard({ index, phase }: { index: number; phase: Phase }) {
  const status: Status = phase.status ?? "Uninitialized";
  const kpis = (phase.stats?.kpis ?? []).filter(
    (k): k is NamedKpi => k !== null && k !== undefined,
  );

  const hasStats = Boolean(
    phase.stats?.avgDailyTVL ||
      phase.stats?.avgDailyTXNS ||
      phase.stats?.avgDailyUniqueUsers,
  );

  return (
    <li className="rounded-xl border border-zinc-200 dark:border-arb-border bg-white dark:bg-arb-surface-2 p-5">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 dark:border-arb-border/60 pb-3">
        <h3 className="flex items-center gap-2 font-semibold">
          <span className="font-mono text-xs uppercase tracking-wider text-arb-blue">
            Phase
          </span>
          <span>{index + 1}</span>
        </h3>
        <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-arb-muted">
          <span className="font-mono">
            {formatDate(phase.startDate)} → {formatDate(phase.endDate)}
          </span>
          <StatusBadge status={status} />
        </div>
      </header>

      <div className="mt-4 grid gap-4 sm:grid-cols-3 text-sm">
        <Metric
          label="ARB received"
          value={formatArb(phase.actuals?.arbReceived)}
        />
        <Metric
          label="ARB utilized"
          value={formatArb(phase.actuals?.arbUtilized)}
        />
        <Metric
          label="ARB remaining"
          value={formatArb(phase.actuals?.arbRemaining)}
        />
      </div>

      {hasStats && (
        <div className="mt-4 grid gap-4 sm:grid-cols-3 text-sm">
          <Metric
            label="Avg daily TVL"
            value={formatNumber(phase.stats?.avgDailyTVL)}
          />
          <Metric
            label="Avg daily txns"
            value={formatNumber(phase.stats?.avgDailyTXNS)}
          />
          <Metric
            label="Avg daily users"
            value={formatNumber(phase.stats?.avgDailyUniqueUsers)}
          />
        </div>
      )}

      {kpis.length > 0 && (
        <div className="mt-5">
          <h4 className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 dark:text-arb-muted mb-2">
            KPIs
          </h4>
          <ul className="flex flex-wrap gap-2">
            {kpis.map((kpi, i) => (
              <li
                key={i}
                className="rounded-md border border-zinc-200 dark:border-arb-border bg-zinc-50 dark:bg-arb-surface px-2 py-1 text-xs font-mono"
              >
                <span className="text-zinc-500 dark:text-arb-muted">
                  {kpi.name ?? "KPI"}:
                </span>{" "}
                <span className="text-zinc-900 dark:text-zinc-100">
                  {formatNumber(kpi.value)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {phase.actuals?.summary && (
        <Notes title="Summary" body={phase.actuals.summary} />
      )}
      {phase.planned?.expectations && (
        <Notes title="Expectations" body={phase.planned.expectations} />
      )}
      {phase.stats?.lessons && (
        <Notes title="Lessons" body={phase.stats.lessons} />
      )}
    </li>
  );
}

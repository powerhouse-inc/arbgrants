import type { Status } from "@arbitrum/arbgrants/document-models/arbitrum-ltip-grantee";

const colors: Record<Status, string> = {
  InProgress:
    "border-arb-blue/30 bg-arb-blue/10 text-arb-blue",
  Finalized:
    "border-arb-green/30 bg-arb-green/10 text-arb-green dark:text-arb-green",
  NotStarted:
    "border-zinc-300 dark:border-arb-border bg-zinc-100 dark:bg-arb-surface text-zinc-600 dark:text-arb-muted",
  Uninitialized:
    "border-zinc-200 dark:border-arb-border bg-zinc-50 dark:bg-arb-surface text-zinc-400 dark:text-arb-muted",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-mono font-medium uppercase tracking-wider ${colors[status]}`}
    >
      {status}
    </span>
  );
}

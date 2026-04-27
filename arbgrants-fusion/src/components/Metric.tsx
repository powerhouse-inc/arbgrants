export function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 dark:text-arb-muted">
        {label}
      </div>
      <div className="mt-0.5 font-mono text-zinc-900 dark:text-zinc-100">
        {value}
      </div>
    </div>
  );
}

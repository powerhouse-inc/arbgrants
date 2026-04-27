export function Stat({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border bg-white dark:bg-arb-surface-2 p-4 ${
        accent
          ? "border-arb-blue/40 dark:border-arb-blue/40"
          : "border-zinc-200 dark:border-arb-border"
      }`}
    >
      {accent && (
        <span className="absolute inset-x-0 top-0 h-0.5 bg-arb-blue" />
      )}
      <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 dark:text-arb-muted">
        {label}
      </div>
      <div
        className={`mt-1.5 text-lg font-semibold font-mono ${
          accent ? "text-arb-blue" : ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}

export function AddressRow({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 dark:text-arb-muted">
        {label}
      </dt>
      <dd className="mt-1 font-mono text-xs break-all text-zinc-800 dark:text-zinc-200">
        {value?.trim() || "—"}
      </dd>
    </div>
  );
}

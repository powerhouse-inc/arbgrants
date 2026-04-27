export function Notes({ title, body }: { title: string; body: string }) {
  return (
    <div className="mt-4 border-l-2 border-arb-blue/40 pl-3">
      <h4 className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 dark:text-arb-muted mb-1">
        {title}
      </h4>
      <p className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-line">
        {body}
      </p>
    </div>
  );
}

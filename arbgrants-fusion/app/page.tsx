import { Suspense } from "react";
import { getLtipDocuments, getStipDocuments } from "@/services/powerhouse";
import { ProgramTabs } from "@/components/ProgramTabs";
import { MainScrollRestorer } from "@/components/MainScrollRestorer";

export default async function Home() {
  const [ltip, stip] = await Promise.all([
    getLtipDocuments({ limit: 500 }),
    getStipDocuments({ limit: 500 }),
  ]);

  return (
    <div>
      <MainScrollRestorer />
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-arb-border">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-br from-arb-teal/20 via-arb-blue/15 to-white dark:from-arb-blue/30 dark:via-arb-navy dark:to-arb-dark"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.08] dark:opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "24px 24px",
            color: "#016BE5",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-arb-blue/30 bg-arb-blue/10 px-3 py-1 text-xs font-mono uppercase tracking-wider text-arb-blue dark:border-arb-teal/40 dark:bg-arb-teal/10 dark:text-arb-teal">
            <span className="h-1.5 w-1.5 rounded-full bg-arb-blue dark:bg-arb-teal" />
            Incentives programs
          </span>
          <h1 className="font-display mt-5 text-4xl sm:text-6xl font-semibold tracking-tight">
            Arbitrum Grants
          </h1>
          <p className="mt-4 text-zinc-700 dark:text-zinc-300 max-w-2xl text-base sm:text-lg">
            Browse grantees across the Long-Term and Short-Term Incentives
            Programs. Click a grantee for funding details, phases, and reported
            metrics.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="?program=ltip#programs"
              className="group inline-flex items-center gap-3 rounded-lg border border-arb-blue/30 bg-white/70 dark:bg-arb-navy-tint/60 backdrop-blur px-4 py-2.5 text-sm font-medium hover:border-arb-blue dark:hover:border-arb-teal transition-colors"
            >
              <span className="font-mono text-xs uppercase tracking-wider text-arb-blue dark:text-arb-teal">
                LTIP
              </span>
              <span>{ltip.totalCount} grantees</span>
            </a>
            <a
              href="?program=stip#programs"
              className="group inline-flex items-center gap-3 rounded-lg border border-arb-blue/30 bg-white/70 dark:bg-arb-navy-tint/60 backdrop-blur px-4 py-2.5 text-sm font-medium hover:border-arb-blue dark:hover:border-arb-teal transition-colors"
            >
              <span className="font-mono text-xs uppercase tracking-wider text-arb-blue dark:text-arb-teal">
                STIP
              </span>
              <span>{stip.totalCount} grantees</span>
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-14">
        <Suspense fallback={null}>
          <ProgramTabs
            ltip={{ items: ltip.items, totalCount: ltip.totalCount }}
            stip={{ items: stip.items, totalCount: stip.totalCount }}
          />
        </Suspense>
      </div>
    </div>
  );
}

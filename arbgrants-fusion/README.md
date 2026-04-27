# arbgrants-fusion

Static Next.js site that renders Arbitrum LTIP and STIP grantee reports sourced
from a Powerhouse Switchboard.

## What it does

- **Home (`/`)** — lists every `arbitrum/ltip-grantee` and `arbitrum/stip-grantee`
  document, grouped by program.
- **Detail (`/ltip/[id]/`, `/stip/[id]/`)** — renders a grantee's grant size,
  funding addresses, and per-phase actuals, stats, and KPIs.

All pages are prerendered to HTML at build time via `output: "export"`. Dynamic
grantee routes are enumerated with `generateStaticParams`, so no server is
needed to serve the output.

## Data source

Grantee data comes from the Powerhouse Switchboard GraphQL endpoint configured
by `PH_SWITCHBOARD_URL` (defaults to `http://localhost:4001/graphql`). The
document models are consumed from the sibling workspace package
`@arbitrum/arbgrants` (see `../arbgrants`):

- `arbitrum/ltip-grantee` → `ArbitrumLtipGranteeState`
- `arbitrum/stip-grantee` → `ArbitrumStipGranteeState`

Queries live in `src/services/powerhouse.ts`.

## Project layout

```
app/
  layout.tsx           Header, footer, fonts
  page.tsx             LTIP + STIP lists
  ltip/[id]/page.tsx   LTIP grantee detail (generateStaticParams)
  stip/[id]/page.tsx   STIP grantee detail (generateStaticParams)
src/
  services/powerhouse.ts   Switchboard client + typed wrappers
  components/              One component per file
  lib/format.ts            Shared formatters (ARB, numbers, dates)
```

## Running

```bash
# Install (once)
pnpm install

# Start Switchboard in the sibling project first:
#   cd ../arbgrants && ph vetra

# Dev server
pnpm dev

# Static build → out/
pnpm build

# Point at a different Switchboard
PH_SWITCHBOARD_URL=https://example.com/graphql pnpm build
```

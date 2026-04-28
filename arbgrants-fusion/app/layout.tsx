import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import { HeaderNav } from "@/components/HeaderNav";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arbitrum Grants",
  description: "Arbitrum LTIP and STIP grantee reports",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const switchboardUrl = process.env.PH_SWITCHBOARD_URL ?? "";

  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-arb-navy dark:bg-arb-dark dark:text-zinc-100">
        <header className="border-b border-zinc-200 dark:border-arb-border bg-white/80 dark:bg-arb-dark/80 backdrop-blur sticky top-0 z-10">
          <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="group flex items-center gap-3 hover:opacity-90"
            >
              <Image
                src="/brand/arbitrum-logo-dark.svg"
                alt="Arbitrum"
                width={143}
                height={56}
                className="block h-14 w-auto dark:hidden"
                priority
              />
              <Image
                src="/brand/arbitrum-logo-light.svg"
                alt="Arbitrum"
                 width={143}
                height={56}
                className="hidden h-14 w-auto dark:block"
                priority
              />
              <span
                aria-hidden
                className="h-5 w-px bg-zinc-300 dark:bg-arb-border"
              />
              <span className="ml-3 font-display text-base font-medium tracking-tight text-arb-navy dark:text-zinc-200">
                Grants
              </span>
            </Link>
            <HeaderNav />
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-200 dark:border-arb-border">
          <div className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between text-xs text-zinc-500 dark:text-arb-muted">
            <span>
              Data sourced from{" "}
              {switchboardUrl ? (
                <a
                  href={switchboardUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-zinc-300 dark:decoration-arb-border underline-offset-2 hover:text-arb-blue dark:hover:text-arb-teal hover:decoration-arb-blue dark:hover:decoration-arb-teal transition-colors"
                >
                  Powerhouse Switchboard
                </a>
              ) : (
                "Powerhouse Switchboard"
              )}
              .
            </span>
            <nav className="font-mono uppercase tracking-wider text-[10px] flex items-center gap-3">
              <a
                href="https://www.arbitrumhub.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-arb-blue dark:hover:text-arb-teal transition-colors"
              >
                Arbitrum
              </a>
              <span aria-hidden className="text-zinc-300 dark:text-arb-border">
                ·
              </span>
              <a
                href="https://www.arbitrumhub.io/incentive-programs/long-term-incentive-pilot-program/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-arb-blue dark:hover:text-arb-teal transition-colors"
              >
                LTIP
              </a>
              <span aria-hidden className="text-zinc-300 dark:text-arb-border">
                ·
              </span>
              <a
                href="https://www.arbitrumhub.io/incentive-programs/short-term-incentive-program/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-arb-blue dark:hover:text-arb-teal transition-colors"
              >
                STIP
              </a>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}

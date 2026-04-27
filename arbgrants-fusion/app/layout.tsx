import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
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
                width={1920}
                height={489}
                className="h-7 w-auto dark:hidden"
                priority
              />
              <Image
                src="/brand/arbitrum-logo-light.svg"
                alt="Arbitrum"
                width={1920}
                height={489}
                className="h-7 w-auto hidden dark:block"
                priority
              />
              <span
                aria-hidden
                className="h-5 w-px bg-zinc-300 dark:bg-arb-border"
              />
              <span className="font-display text-base font-medium tracking-tight text-arb-navy dark:text-zinc-200">
                Grants
              </span>
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium">
              <Link
                href="/?program=ltip#programs"
                className="text-zinc-600 dark:text-zinc-400 hover:text-arb-blue dark:hover:text-arb-teal transition-colors"
              >
                LTIP
              </Link>
              <Link
                href="/?program=stip#programs"
                className="text-zinc-600 dark:text-zinc-400 hover:text-arb-blue dark:hover:text-arb-teal transition-colors"
              >
                STIP
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-200 dark:border-arb-border">
          <div className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between text-xs text-zinc-500 dark:text-arb-muted">
            <span>Data sourced from Powerhouse Switchboard.</span>
            <span className="font-mono uppercase tracking-wider text-[10px]">
              Arbitrum · LTIP · STIP
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}

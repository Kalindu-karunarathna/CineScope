import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  /**
   * metadataBase is required for absolute Open Graph image URLs.
   * Set NEXT_PUBLIC_SITE_URL in your production environment (e.g. https://cinescope.example.com).
   * The localhost fallback is only for local development and must NOT be used in production.
   */
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),

  applicationName: "CineScope",

  /**
   * Title template: individual pages export `title: "Page Name"` and Next.js
   * automatically produces "Page Name | CineScope" in the <title> tag.
   * The default renders when a page does not export its own title.
   */
  title: {
    default: "CineScope — Discover Movies",
    template: "%s | CineScope",
  },

  description:
    "Discover trending movies, explore movie details, search for your favorites, and build your personal movie collection.",

  openGraph: {
    type: "website",
    siteName: "CineScope",
    title: "CineScope — Discover Movies",
    description:
      "Discover trending movies, explore movie details, search for your favorites, and build your personal movie collection.",
    /**
     * og:image — if you add a dedicated social-sharing image, place it at
     * public/og-image.png (1200×630) and uncomment the line below.
     * Without it, social crawlers will fall back to the page title card.
     */
    // images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CineScope" }],
  },

  twitter: {
    card: "summary_large_image",
    title: "CineScope — Discover Movies",
    description:
      "Discover trending movies, explore movie details, search for your favorites, and build your personal movie collection.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background text-foreground transition-colors duration-200">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <Header />
            <div className="flex flex-1 flex-col">{children}</div>
            <Footer />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

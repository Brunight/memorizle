import { Inter } from "next/font/google";
import Script from "next/script";
import type { Metadata } from "next";

import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Memorizle - Fun Memory Games to Train Your Brain",
    template: "%s | Memorizle",
  },
  description:
    "Boost your memory skills with engaging image-based games. Learn flags, capitals, chess openings, and more through interactive memory challenges.",
  keywords: [
    "memory games",
    "brain training",
    "educational games",
    "memorization",
    "learning games",
    "chess openings",
    "flags",
    "capitals",
  ],
  authors: [{ name: "Memorizle" }],
  creator: "Memorizle",
  publisher: "Memorizle",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://memorizle.com",
    siteName: "Memorizle",
    title: "Memorizle - Fun Memory Games to Train Your Brain",
    description:
      "Boost your memory skills with engaging image-based games. Learn flags, capitals, chess openings, and more through interactive memory challenges.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Memorizle - Memory Games",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Memorizle - Fun Memory Games to Train Your Brain",
    description:
      "Boost your memory skills with engaging image-based games. Learn flags, capitals, chess openings, and more through interactive memory challenges.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>

        {/* Cloudflare Web Analytics */}
        {process.env.NODE_ENV === "production" ? (
          <Script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token": "3a4ea0eb7e824ce8bbc24cdcd044985d"}'
          />
        ) : null}
      </body>
    </html>
  );
}

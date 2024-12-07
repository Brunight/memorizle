import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import Script from "next/script";
import type { Metadata } from "next";

import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { localeLabels } from "@/config/i18n";

const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pt" }];
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;

  try {
    const messages = (await import(`@/messages/${locale}.json`)).default;

    return {
      title: {
        default: messages.metadata.title,
        template: `%s | ${messages.metadata.title}`,
      },
      description: messages.metadata.description,
      keywords: messages.metadata.keywords,
      openGraph: {
        title: messages.metadata.title,
        description: messages.metadata.description,
        locale: localeLabels[locale as keyof typeof localeLabels],
      },
      twitter: {
        title: messages.metadata.title,
        description: messages.metadata.description,
      },
    };
  } catch {
    return {};
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;
  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>

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

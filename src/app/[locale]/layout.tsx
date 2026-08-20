import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import Script from 'next/script';
import type {Metadata} from 'next';
import {routing} from '@/i18n/routing';
import "../globals.css";

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AttributionTracker from '@/components/AttributionTracker';

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'HomePage'});
  const title = t('title');
  const description = t('subtitle');

  return {
    metadataBase: new URL('https://pwa.ad'),
    title,
    description,
    keywords: locale === 'zh'
      ? ['PWA封装', 'APK封装', '广告归因', 'W2A', 'PWA.ad']
      : ['PWA wrapping', 'APK wrapping', 'ad attribution', 'W2A', 'PWA.ad'],
    authors: [{ name: 'PWA.ad Team' }],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://pwa.ad/${locale}`,
      siteName: 'PWA.ad',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'PWA.ad',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="antialiased bg-slate-950 text-white font-sans selection:bg-brand/30 selection:text-brand-foreground">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JFTG28MSCD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-JFTG28MSCD');
          `}
        </Script>
        <AttributionTracker />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

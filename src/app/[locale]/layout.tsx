import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import Script from 'next/script';
import {routing} from '@/i18n/routing';
import "../globals.css";

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'PWA/APK 智能封装 - 智能斗篷过审 & 精准归因解决方案 | PWA.ad',
  description: 'PWA.ad 提供一站式 PWA/APK 封装、智能斗篷过审、精准广告归因服务。无需上架 Google Play，完美解决真金/直播/小说等敏感行业投放受限难题，让广告转化数据清晰可见。',
  keywords: ['PWA封装', 'APK封装', '智能斗篷', '广告归因', 'W2A', 'Google Play过审', 'Facebook投放', '真金游戏推广', 'PWA.ad'],
  authors: [{ name: 'PWA.ad Team' }],
  openGraph: {
    title: 'PWA/APK 智能封装 - 智能斗篷过审 & 精准归因解决方案 | PWA.ad',
    description: '无需上架 Google Play，一键将您的网页端产品封装为 APP。完美解决投放受限与归因丢失难题。',
    type: 'website',
    url: 'https://pwa.ad',
    siteName: 'PWA.ad',
    images: [
      {
        url: 'https://pwa.ad/og-image.png', // Assuming you'll add an OG image
        width: 1200,
        height: 630,
        alt: 'PWA.ad Solution Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PWA/APK 智能封装 - 智能斗篷过审 & 精准归因解决方案 | PWA.ad',
    description: '无需上架 Google Play，一键将您的网页端产品封装为 APP。完美解决投放受限与归因丢失难题。',
  },
};

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

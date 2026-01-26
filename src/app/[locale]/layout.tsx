import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import Script from 'next/script';
import {routing} from '@/i18n/routing';
import "../globals.css";

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'PWA.ad - PWA/APK Brand Website',
  description: 'Intelligent Cloaking & PWA Encapsulation Solution',
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
  if (!routing.locales.includes(locale as any)) {
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

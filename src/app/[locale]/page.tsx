import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Comparison from '@/components/home/Comparison';
import CTA from '@/components/home/CTA';
import WhatIsPWA from '@/components/home/WhatIsPWA';
import HowItWorks from '@/components/home/HowItWorks';
import Attribution from '@/components/home/Attribution';
import DashboardPreview from '@/components/home/DashboardPreview';
import Stats from '@/components/home/Stats';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'HomePage'});
  const title = t('title');
  const description = t('subtitle');

  return {
    title,
    description,
    alternates: {
      canonical: `https://pwa.ad/${locale}`,
      languages: {
        'en': 'https://pwa.ad/en',
        'zh': 'https://pwa.ad/zh',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://pwa.ad/${locale}`,
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
    },
  };
}

export default function HomePage() {
  return (
    <div className="flex flex-col bg-slate-950">
      <Hero />
      <WhatIsPWA />
      <HowItWorks />
      <Attribution />
      <Comparison />
      <Features />
      <DashboardPreview />
      <Stats />
      <CTA />
    </div>
  );
}

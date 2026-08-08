import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Comparison from '@/components/home/Comparison';
import CTA from '@/components/home/CTA';
import WhatIsPWA from '@/components/home/WhatIsPWA';
import DashboardPreview from '@/components/home/DashboardPreview';
import Stats from '@/components/home/Stats';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'HomePage'});
  
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `https://pwa.ad/${locale}`,
      languages: {
        'en': 'https://pwa.ad/en',
        'zh': 'https://pwa.ad/zh',
      },
    },
  };
}

export default function HomePage() {
  return (
    <div className="flex flex-col bg-slate-950">
      <Hero />
      <WhatIsPWA />
      <Comparison />
      <Features />
      <DashboardPreview />
      <Stats />
      <CTA />
    </div>
  );
}

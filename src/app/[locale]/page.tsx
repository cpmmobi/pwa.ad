import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Comparison from '@/components/home/Comparison';
import CTA from '@/components/home/CTA';
import WhatIsPWA from '@/components/home/WhatIsPWA';
import DashboardPreview from '@/components/home/DashboardPreview';
import Stats from '@/components/home/Stats';

export default function HomePage() {
  return (
    <div className="flex flex-col">
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

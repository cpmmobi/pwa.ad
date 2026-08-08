import { useTranslations } from 'next-intl';
import { Smartphone, Zap, ShieldCheck } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';

export default function WhatIsPWA() {
  const t = useTranslations('WhatIsPWA');

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-brand" />,
      title: t('feature1_title'),
      desc: t('feature1_desc')
    },
    {
      icon: <Smartphone className="w-8 h-8 text-brand" />,
      title: t('feature2_title'),
      desc: t('feature2_desc')
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-brand" />,
      title: t('feature3_title'),
      desc: t('feature3_desc')
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 border-b border-white/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
            <SectionTitle>{t('title')}</SectionTitle>
            <h3 className="text-xl md:text-2xl text-brand font-medium mb-6">
                {t('subtitle')}
            </h3>
            <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mx-auto">
                {t('desc')}
            </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
                <div key={index} className="bg-white/5 p-8 rounded-2xl border border-white/20 hover:border-brand/30 transition-all hover:bg-white/[0.07] group">
                    <div className="bg-slate-900 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-black/50">
                        {feature.icon}
                    </div>
                    <h4 className="text-xl font-bold mb-4 text-white group-hover:text-brand transition-colors">
                        {feature.title}
                    </h4>
                    <p className="text-slate-300 leading-relaxed">
                        {feature.desc}
                    </p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}

import { useTranslations } from 'next-intl';
import { Link as LinkIcon, Package, Radio } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';

export default function HowItWorks() {
  const t = useTranslations('HowItWorks');

  const steps = [
    { icon: LinkIcon, title: t('step1_title'), desc: t('step1_desc') },
    { icon: Package, title: t('step2_title'), desc: t('step2_desc') },
    { icon: Radio, title: t('step3_title'), desc: t('step3_desc') },
  ];

  return (
    <section className="py-20 bg-slate-950 border-b border-white/5">
      <div className="container mx-auto px-4">
        <SectionTitle>{t('title')}</SectionTitle>
        <p className="text-slate-300 text-lg text-center max-w-2xl mx-auto mb-16">
          {t('subtitle')}
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.title} className="relative text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <span className="text-brand font-black text-sm tracking-[0.2em]">
                  0{index + 1}
                </span>
                <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-brand" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';

export default function Attribution() {
  const t = useTranslations('Features');

  const points = [
    t('attribution_point1'),
    t('attribution_point2'),
    t('attribution_point3'),
  ];

  return (
    <section className="py-20 bg-slate-900/50" id="attribution">
      <div className="container mx-auto px-4">
        <SectionTitle>{t('attribution_title')}</SectionTitle>
        <p className="text-slate-300 text-lg text-center max-w-3xl mx-auto mb-16">
          {t('attribution_desc')}
        </p>
        <div className="max-w-6xl mx-auto bg-slate-950 rounded-3xl border border-white/20 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-3xl md:text-4xl font-black mb-6 text-white leading-tight">
                {t('attribution_detail_title')}
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                {t('attribution_detail_desc')}
              </p>
              <ul className="space-y-4">
                {points.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-white font-medium">
                    <CheckCircle2 className="text-brand shrink-0" size={20} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-900 relative min-h-[300px] md:min-h-full border-l border-white/5">
              <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 z-10" />
              <div className="relative w-full h-full min-h-[300px]">
                <Image
                  src="/feature-attribution.png"
                  alt={t('attribution_title')}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

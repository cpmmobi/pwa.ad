import { useTranslations } from 'next-intl';
import { Clock3, Radio, Smartphone } from 'lucide-react';

export default function Stats() {
  const t = useTranslations('Stats');

  const items = [
    { icon: Smartphone, title: t('item1_title'), desc: t('item1_desc') },
    { icon: Radio, title: t('item2_title'), desc: t('item2_desc') },
    { icon: Clock3, title: t('item3_title'), desc: t('item3_desc') },
  ];

  return (
    <section className="py-14 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-brand/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {items.map((item) => (
            <div key={item.title} className="text-center px-4">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-brand" />
              </div>
              <h2 className="text-lg md:text-xl font-bold text-white mb-2">
                {item.title}
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

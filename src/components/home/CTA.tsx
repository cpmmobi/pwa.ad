import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function CTA() {
  const t = useTranslations('CTA');

  return (
    <section className="py-20 px-4 relative z-20">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-slate-900 to-slate-900/90 rounded-2xl p-12 text-center border border-white/20 relative overflow-hidden shadow-2xl shadow-brand/10 backdrop-blur-xl">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">
            {t('title')}
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto relative z-10">
            {t('description')}
          </p>
          
          <Link href="/contact" className="inline-block bg-brand hover:bg-brand-hover text-white px-8 py-3 rounded-full font-bold text-lg transition-all relative z-10 hover:shadow-[0_0_20px_rgba(0,194,80,0.4)] hover:scale-105 transform duration-200">
            {t('button')}
          </Link>
        </div>
      </div>
    </section>
  );
}

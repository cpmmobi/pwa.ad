import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import PlatformLogos from './PlatformLogos';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden min-h-[80vh] flex flex-col justify-center">
      <div className="container mx-auto px-4 text-center z-10 relative">
        <h1 className="font-bold leading-tight mb-8">
          <span className="block text-6xl md:text-9xl tracking-tighter">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-400">
              PWA
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-brand via-brand to-brand-hover">
              .ad
            </span>
          </span>
        </h1>

        <p className="block text-2xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-brand via-white to-brand bg-300% animate-gradient font-bold mb-8">
          {t('title_slogan')}
        </p>

        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
          {t('subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link
            href="/contact"
            className="bg-brand hover:bg-brand-hover text-white px-10 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,194,80,0.4)]"
          >
            {t('cta_contact')} <ArrowRight size={20} />
          </Link>
        </div>

        <p className="text-sm md:text-base text-slate-400 mb-16">
          {t('trust_badges')}
        </p>

        <div className="pt-8 border-t border-white/5">
          <p className="text-sm text-slate-500 uppercase tracking-widest font-semibold mb-6">
            {t('supported_platforms')}
          </p>
          <PlatformLogos />
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand/10 rounded-full blur-[120px]" />
      </div>
    </section>
  );
}

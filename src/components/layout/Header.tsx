import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../ui/LanguageSwitcher';

export default function Header() {
  const t = useTranslations('Navigation');

  return (
    <header className="fixed top-0 w-full z-50 pt-4 px-4 pointer-events-none">
      <div className="mx-auto max-w-5xl">
        <div className="pointer-events-auto flex items-center justify-between h-14 px-6 bg-slate-900/60 backdrop-blur-2xl saturate-150 border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-300">
          <Link href="/" className="text-xl font-bold text-white tracking-tight flex items-center gap-1 hover:opacity-80 transition-opacity">
            PWA<span className="text-brand">.ad</span>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            <Link href="/" className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">{t('home')}</Link>
            <Link href="/faq" className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">{t('faq')}</Link>
            <Link href="/contact" className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">{t('contact')}</Link>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link href="/contact" className="bg-brand hover:bg-brand-hover text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-[0_0_15px_rgba(0,194,80,0.2)] hover:shadow-[0_0_25px_rgba(0,194,80,0.4)] hover:scale-105 active:scale-95">
              {t('consult')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

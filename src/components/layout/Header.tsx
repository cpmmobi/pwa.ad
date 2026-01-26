import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../ui/LanguageSwitcher';

export default function Header() {
  const t = useTranslations('Navigation');

  return (
    <header className="fixed w-full top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white tracking-tight">
          PWA<span className="text-brand">.ad</span>
        </Link>

        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          <Link href="/" className="hover:text-white transition-colors">{t('home')}</Link>
          <Link href="/faq" className="hover:text-white transition-colors">{t('faq')}</Link>
          <Link href="/contact" className="hover:text-white transition-colors">{t('contact')}</Link>
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Link href="/contact" className="bg-brand hover:bg-brand-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            {t('consult')}
          </Link>
        </div>
      </div>
    </header>
  );
}

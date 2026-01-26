import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  
  return (
    <footer className="bg-slate-900 border-t border-white/10 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          <div className="max-w-sm">
            <div className="text-xl font-bold text-white mb-4">PWA<span className="text-brand">.ad</span></div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('desc')}
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">{t('service_support')}</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/faq" className="hover:text-brand transition-colors">{t('faq')}</Link></li>
              <li><Link href="/contact" className="hover:text-brand transition-colors">{t('contact_us')}</Link></li>
              <li><Link href="/terms" className="hover:text-brand transition-colors">{t('terms_of_service')}</Link></li>
              <li><Link href="/privacy" className="hover:text-brand transition-colors">{t('privacy_policy')}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm">
                {t('copyright', {year: new Date().getFullYear()})}
            </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === 'en' ? 'zh' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button onClick={toggleLocale} className="px-3 py-1 text-sm border border-white/10 rounded-lg hover:border-brand/50 hover:text-brand transition-all">
      {locale === 'en' ? '中文' : 'English'}
    </button>
  );
}

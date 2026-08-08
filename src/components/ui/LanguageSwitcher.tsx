"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === 'en' ? 'zh' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button 
      onClick={toggleLocale} 
      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-300 border border-white/10 rounded-full hover:border-white/30 hover:text-white transition-all"
    >
      <Globe size={14} />
      <span>{locale === 'en' ? '中文' : 'EN'}</span>
    </button>
  );
}

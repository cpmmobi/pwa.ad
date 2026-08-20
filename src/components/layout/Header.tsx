"use client";

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from '../ui/LanguageSwitcher';

export default function Header() {
  const t = useTranslations('Navigation');
  const [open, setOpen] = useState(false);

  const links = [
    { href: '/', label: t('home') },
    { href: '/faq', label: t('faq') },
    { href: '/contact', label: t('contact') },
  ] as const;

  return (
    <header className="fixed top-0 w-full z-50 pt-4 px-4 pointer-events-none">
      <div className="mx-auto max-w-5xl">
        <div className={`pointer-events-auto bg-slate-900/60 backdrop-blur-2xl saturate-150 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-300 ${open ? 'rounded-3xl' : 'rounded-full'}`}>
          <div className="flex items-center justify-between h-14 px-6">
            <Link href="/" className="text-xl font-bold text-white tracking-tight flex items-center gap-1 hover:opacity-80 transition-opacity" onClick={() => setOpen(false)}>
              PWA<span className="text-brand">.ad</span>
            </Link>

            <nav className="hidden md:flex items-center gap-2">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                className="md:hidden p-2 -mr-1 text-slate-300 hover:text-white transition-colors"
                aria-expanded={open}
                aria-label={open ? t('close_menu') : t('open_menu')}
                onClick={() => setOpen((prev) => !prev)}
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
              <LanguageSwitcher />
              <Link href="/contact" className="bg-brand hover:bg-brand-hover text-white px-4 sm:px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-[0_0_15px_rgba(0,194,80,0.2)] hover:shadow-[0_0_25px_rgba(0,194,80,0.4)] hover:scale-105 active:scale-95" onClick={() => setOpen(false)}>
                {t('consult')}
              </Link>
            </div>
          </div>

          {open && (
            <nav className="md:hidden px-4 pb-4 pt-1 border-t border-white/10 flex flex-col">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-3 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

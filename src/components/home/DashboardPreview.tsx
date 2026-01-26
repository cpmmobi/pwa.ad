"use client";

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import SectionTitle from '../ui/SectionTitle';
import { Eye } from 'lucide-react';

export default function DashboardPreview() {
  const t = useTranslations('Dashboard');

  return (
    <section className="pt-20 pb-0 bg-slate-950 overflow-hidden relative z-10">
      <div className="container mx-auto px-4">
        {/* Title removed as requested */}
        
        <div className="max-w-6xl mx-auto relative group perspective-1000 -mb-24">
          <Link href="/contact" className="block relative z-10">
            {/* Tablet/Device Mockup Container */}
            <div className="relative rounded-t-[2.5rem] rounded-b-[1rem] border-[14px] border-b-0 border-slate-700 bg-slate-900 shadow-[0_-20px_50px_rgba(0,194,80,0.15)] ring-1 ring-white/10 transition-transform duration-500 ease-out group-hover:translate-y-[-10px] group-hover:shadow-[0_-30px_80px_rgba(0,194,80,0.3)]">
              
              {/* Camera Dot */}
              <div className="absolute top-[20%] left-[-14px] w-[14px] h-24 bg-slate-700 rounded-l-md flex flex-col items-center justify-center gap-4">
                 <div className="w-1 h-8 bg-slate-600 rounded-full"></div>
              </div>

              {/* Screen Content */}
              <div className="relative overflow-hidden rounded-t-[2rem] bg-slate-900">
                {/* Placeholder for the user's dashboard image */}
                {/* User needs to place 'dashboard.png' in public folder */}
                <div className="relative bg-slate-800 flex items-center justify-center text-slate-600 min-h-[300px]">
                  <img 
                    src="/dashboard.png" 
                    alt="PWA Dashboard" 
                    className="w-full h-auto block"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '<div class="flex flex-col items-center gap-4 py-20"><p>请将后台截图命名为 dashboard.png 并放入 public 目录</p><div class="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900"></div></div>';
                    }}
                  />
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <button className="bg-brand hover:bg-brand-hover text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 shadow-lg shadow-brand/30">
                      <Eye size={24} />
                      {t('cta_demo')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Decorative Glow Behind */}
          <div className="absolute top-0 left-0 right-0 h-full bg-brand/20 blur-[100px] -z-10 rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
        </div>
      </div>
    </section>
  );
}

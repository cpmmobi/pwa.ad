"use client";

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const t = useTranslations('Contact');
  const [submitted, setSubmitted] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState('both');
  const [showOtherRegion, setShowOtherRegion] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center py-12 bg-slate-900/50 rounded-2xl border border-white/10">
        <CheckCircle2 className="w-16 h-16 text-brand mb-6" />
        <h3 className="text-2xl font-bold mb-2">{t('success')}</h3>
        <p className="text-gray-400">We will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/50 p-8 rounded-2xl border border-white/10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">{t('form_company')}</label>
          <input type="text" required className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">{t('form_business')}</label>
              <select className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors">
                  <option value="real_money">{t('type_real_money')}</option>
                  <option value="live_entertainment">{t('type_live_entertainment')}</option>
                  <option value="drama_novel">{t('type_drama_novel')}</option>
                  <option value="finance_loan">{t('type_finance_loan')}</option>
                  <option value="tools">{t('type_tools')}</option>
                  <option value="other">{t('type_other')}</option>
              </select>
          </div>
          <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">{t('form_telegram')}</label>
              <input type="text" required placeholder="@username" className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">{t('form_region')}</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <label className="flex items-center gap-2 p-3 rounded-lg border border-white/10 bg-slate-950 cursor-pointer hover:border-blue-500/50 transition-colors">
                  <input type="checkbox" name="region" value="sea" className="accent-blue-500 w-4 h-4" />
                  <span className="text-sm text-white">{t('region_sea')}</span>
              </label>
              <label className="flex items-center gap-2 p-3 rounded-lg border border-white/10 bg-slate-950 cursor-pointer hover:border-blue-500/50 transition-colors">
                  <input type="checkbox" name="region" value="india" className="accent-blue-500 w-4 h-4" />
                  <span className="text-sm text-white">{t('region_india')}</span>
              </label>
              <label className="flex items-center gap-2 p-3 rounded-lg border border-white/10 bg-slate-950 cursor-pointer hover:border-blue-500/50 transition-colors">
                  <input type="checkbox" name="region" value="latam" className="accent-blue-500 w-4 h-4" />
                  <span className="text-sm text-white">{t('region_latam')}</span>
              </label>
              <label className="flex items-center gap-2 p-3 rounded-lg border border-white/10 bg-slate-950 cursor-pointer hover:border-blue-500/50 transition-colors">
                  <input type="checkbox" name="region" value="mena" className="accent-blue-500 w-4 h-4" />
                  <span className="text-sm text-white">{t('region_mena')}</span>
              </label>
              <label className="flex items-center gap-2 p-3 rounded-lg border border-white/10 bg-slate-950 cursor-pointer hover:border-blue-500/50 transition-colors">
                  <input type="checkbox" name="region" value="russia" className="accent-blue-500 w-4 h-4" />
                  <span className="text-sm text-white">{t('region_russia')}</span>
              </label>
              <label className="flex items-center gap-2 p-3 rounded-lg border border-white/10 bg-slate-950 cursor-pointer hover:border-blue-500/50 transition-colors">
                  <input type="checkbox" name="region" value="jp_kr" className="accent-blue-500 w-4 h-4" />
                  <span className="text-sm text-white">{t('region_jp_kr')}</span>
              </label>
              <label className="flex items-center gap-2 p-3 rounded-lg border border-white/10 bg-slate-950 cursor-pointer hover:border-blue-500/50 transition-colors">
                  <input type="checkbox" name="region" value="africa" className="accent-blue-500 w-4 h-4" />
                  <span className="text-sm text-white">{t('region_africa')}</span>
              </label>
              <label className="flex items-center gap-2 p-3 rounded-lg border border-white/10 bg-slate-950 cursor-pointer hover:border-blue-500/50 transition-colors">
                  <input type="checkbox" name="region" value="other" className="accent-blue-500 w-4 h-4" onChange={(e) => setShowOtherRegion(e.target.checked)} />
                  <span className="text-sm text-white">{t('region_other')}</span>
              </label>
          </div>
          {showOtherRegion && (
            <div className="mt-4 animate-in fade-in slide-in-from-top-2">
              <input 
                type="text" 
                name="region_detail" 
                placeholder={t('region_other_placeholder')} 
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                required 
              />
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">{t('form_need')}</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <label className={`flex items-center justify-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${selectedNeed === 'pwa' ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 bg-slate-950 hover:border-blue-500/50'}`}>
                  <input type="radio" name="need" value="pwa" className="accent-blue-500" checked={selectedNeed === 'pwa'} onChange={(e) => setSelectedNeed(e.target.value)} />
                  <span className="text-sm">{t('need_pwa')}</span>
              </label>
              <label className={`flex items-center justify-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${selectedNeed === 'w2a' ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 bg-slate-950 hover:border-blue-500/50'}`}>
                  <input type="radio" name="need" value="w2a" className="accent-blue-500" checked={selectedNeed === 'w2a'} onChange={(e) => setSelectedNeed(e.target.value)} />
                  <span className="text-sm">{t('need_w2a')}</span>
              </label>
              <label className={`flex items-center justify-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${selectedNeed === 'both' ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 bg-slate-950 hover:border-blue-500/50'}`}>
                  <input type="radio" name="need" value="both" className="accent-blue-500" checked={selectedNeed === 'both'} onChange={(e) => setSelectedNeed(e.target.value)} />
                  <span className="text-sm">{t('need_both')}</span>
              </label>
              <label className={`flex items-center justify-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${selectedNeed === 'other' ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 bg-slate-950 hover:border-blue-500/50'}`}>
                  <input type="radio" name="need" value="other" className="accent-blue-500" checked={selectedNeed === 'other'} onChange={(e) => setSelectedNeed(e.target.value)} />
                  <span className="text-sm">{t('need_other')}</span>
              </label>
          </div>
          {selectedNeed === 'other' && (
            <div className="mt-4 animate-in fade-in slide-in-from-top-2">
              <input 
                type="text" 
                name="need_detail" 
                placeholder={t('need_other_placeholder')} 
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                required 
              />
            </div>
          )}
        </div>

        <button type="submit" className="w-full bg-brand hover:bg-brand-hover text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(0,194,80,0.3)]">
          <Send size={18} /> {t('submit')}
        </button>
      </form>
    </div>
  );
}

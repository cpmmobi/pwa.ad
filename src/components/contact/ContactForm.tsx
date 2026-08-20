"use client";

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { getAttribution } from '@/lib/attribution';

export default function ContactForm() {
  const t = useTranslations('Contact');
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState('pwa_distribution');
  const [showOtherRegion, setShowOtherRegion] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [telegramInput, setTelegramInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [urlError, setUrlError] = useState('');
  const [telegramError, setTelegramError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [contactError, setContactError] = useState('');
  const [regionError, setRegionError] = useState('');

  const validateUrl = (url: string) => {
    if (!url) return false;
    let urlToTest = url.trim();
    if (!/^https?:\/\//i.test(urlToTest)) {
      urlToTest = 'http://' + urlToTest;
    }
    
    // More strict URL validation regex
    // Ensures it has at least a valid domain (e.g. something.com)
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
    
    if (!urlPattern.test(urlToTest)) {
        return false;
    }

    try {
      new URL(urlToTest);
      return true;
    } catch (e) {
      return false;
    }
  };

  const formatUrl = (url: string) => {
    if (!url) return url;
    if (!/^https?:\/\//i.test(url)) {
      return 'https://' + url;
    }
    return url;
  };

  const validateTelegram = (tg: string) => {
    if (!tg) return false;
    const tgPattern = /^@?[a-zA-Z0-9_]{5,}$|^https?:\/\/t\.me\/[a-zA-Z0-9_]{5,}$/;
    return tgPattern.test(tg.trim());
  };

  const validateEmail = (email: string) => {
    if (!email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
  };

  const handleUrlBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    if (val && !validateUrl(val)) {
      setUrlError(t('error_invalid_url'));
    } else {
      setUrlError('');
      setUrlInput(formatUrl(val));
    }
  };

  const handleTelegramBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    if (val && !validateTelegram(val)) {
      setTelegramError(t('error_invalid_telegram'));
    } else {
      setTelegramError('');
    }
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    if (val && !validateEmail(val)) {
      setEmailError(t('error_invalid_email'));
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Final validation before submit
    const finalUrl = formatUrl(urlInput.trim());
    if (!validateUrl(finalUrl)) {
      setUrlError(t('error_invalid_url'));
      return;
    }
    const telegram = telegramInput.trim();
    const email = emailInput.trim();

    if (!telegram && !email) {
      setContactError(t('error_contact_required'));
      return;
    }
    if (telegram && !validateTelegram(telegram)) {
      setTelegramError(t('error_invalid_telegram'));
      return;
    }
    if (email && !validateEmail(email)) {
      setEmailError(t('error_invalid_email'));
      return;
    }

    const formData = new FormData(e.currentTarget);
    const targetRegions = formData.getAll('targetRegions');
    if (targetRegions.length === 0) {
      setRegionError(t('error_regions'));
      return;
    }

    setSubmitting(true);

    try {
      const data = {
        landingUrl: finalUrl,
        telegram,
        email,
        primarySolution: formData.get('primarySolution'),
        primarySolutionOther: formData.get('primarySolutionOther'),
        campaignStage: formData.get('campaignStage'),
        dailyAdSpend: formData.get('dailyAdSpend'),
        targetRegions,
        targetRegionsOther: formData.get('targetRegionsOther'),
        additionalNotes: formData.get('additionalNotes'),
        locale: locale,
        attribution: getAttribution(),
        source_info: {
          referrer: document.referrer,
          url: window.location.href,
          userAgent: navigator.userAgent,
          browserLanguage: navigator.language,
        }
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      // Trigger GA Event
      if (typeof window !== 'undefined' && ('gtag' in window)) {
        (window as { gtag?: (event: string, action: string, data: Record<string, unknown>) => void }).gtag?.('event', 'submit_form', {
          'event_category': 'Contact',
          'event_label': 'Contact Form Submission',
          'primarySolution': data.primarySolution,
          'targetRegions': data.targetRegions.join(',')
        });
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(t('error_submit')); // Assuming you might want to add this key or just use a generic message
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center py-12 bg-slate-900/50 rounded-2xl border border-white/20 px-8">
        <CheckCircle2 className="w-16 h-16 text-brand mb-6" />
        <p className="text-slate-300 leading-relaxed max-w-2xl">{t('success')}</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/40 p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="space-y-10">
        
        {/* Section 1: Core Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
            <div className="w-8 h-8 rounded-full bg-brand/20 text-brand flex items-center justify-center font-bold text-sm">1</div>
            <h4 className="text-lg font-semibold text-white">{t('step_1_title')}</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">{t('form_landing_url')} <span className="text-brand">*</span></label>
              <input 
                type="url" 
                name="landingUrl" 
                required 
                placeholder={t('landing_url_placeholder')}
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  setUrlError('');
                }}
                onBlur={handleUrlBlur}
                className={`w-full bg-slate-950/50 border ${urlError ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-brand'} rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-1 focus:ring-brand/50 transition-all`} 
              />
              {urlError && <p className="text-red-400 text-xs mt-2 ml-1">{urlError}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">{t('form_telegram')}</label>
              <input 
                type="text" 
                name="telegram" 
                placeholder={t('telegram_placeholder')}
                value={telegramInput}
                onChange={(e) => {
                  setTelegramInput(e.target.value);
                  setTelegramError('');
                  setContactError('');
                }}
                onBlur={handleTelegramBlur}
                className={`w-full bg-slate-950/50 border ${telegramError || contactError ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-brand'} rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-1 focus:ring-brand/50 transition-all`} 
              />
              {telegramError && <p className="text-red-400 text-xs mt-2 ml-1">{telegramError}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">{t('form_email')}</label>
              <input
                type="email"
                name="email"
                placeholder={t('email_placeholder')}
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value);
                  setEmailError('');
                  setContactError('');
                }}
                onBlur={handleEmailBlur}
                className={`w-full bg-slate-950/50 border ${emailError || contactError ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-brand'} rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-1 focus:ring-brand/50 transition-all`}
              />
              {emailError && <p className="text-red-400 text-xs mt-2 ml-1">{emailError}</p>}
            </div>
          </div>

          {contactError ? (
            <p className="text-red-400 text-xs ml-1">{contactError}</p>
          ) : (
            <p className="text-slate-500 text-xs ml-1">{t('contact_helper')}</p>
          )}
        </div>

        {/* Section 2: Business Needs */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
            <div className="w-8 h-8 rounded-full bg-brand/20 text-brand flex items-center justify-center font-bold text-sm">2</div>
            <h4 className="text-lg font-semibold text-white">{t('step_2_title')}</h4>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-4">{t('form_primary_solution')} <span className="text-brand">*</span></label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${selectedSolution === 'pwa_distribution' ? 'border-brand bg-brand/10 ring-1 ring-brand/30' : 'border-white/5 bg-slate-950/50 hover:bg-white/5 hover:border-white/20'}`}>
                    <input type="radio" name="primarySolution" value="pwa_distribution" className="accent-brand w-4 h-4" checked={selectedSolution === 'pwa_distribution'} onChange={(e) => setSelectedSolution(e.target.value)} required />
                    <span className="text-sm text-slate-200">{t('solution_pwa')}</span>
                </label>
                <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${selectedSolution === 'apk_distribution' ? 'border-brand bg-brand/10 ring-1 ring-brand/30' : 'border-white/5 bg-slate-950/50 hover:bg-white/5 hover:border-white/20'}`}>
                    <input type="radio" name="primarySolution" value="apk_distribution" className="accent-brand w-4 h-4" checked={selectedSolution === 'apk_distribution'} onChange={(e) => setSelectedSolution(e.target.value)} required />
                    <span className="text-sm text-slate-200">{t('solution_apk')}</span>
                </label>
                <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${selectedSolution === 'other' ? 'border-brand bg-brand/10 ring-1 ring-brand/30' : 'border-white/5 bg-slate-950/50 hover:bg-white/5 hover:border-white/20'}`}>
                    <input type="radio" name="primarySolution" value="other" className="accent-brand w-4 h-4" checked={selectedSolution === 'other'} onChange={(e) => setSelectedSolution(e.target.value)} required />
                    <span className="text-sm text-slate-200">{t('solution_other')}</span>
                </label>
            </div>
            {selectedSolution === 'other' && (
              <div className="mt-3 animate-in fade-in slide-in-from-top-2">
                <input 
                  type="text" 
                  name="primarySolutionOther" 
                  placeholder={t('solution_other')} 
                  className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-5 py-3 text-sm text-white focus:outline-none focus:border-brand transition-colors"
                  required 
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">{t('form_campaign_stage')} <span className="text-brand">*</span></label>
                <select name="campaignStage" required defaultValue="" className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-5 py-4 text-sm text-slate-200 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/50 transition-all appearance-none cursor-pointer">
                    <option value="" disabled className="text-slate-500">-- Select --</option>
                    <option value="new_product_testing">{t('stage_new')}</option>
                    <option value="h5_ready_to_launch">{t('stage_ready')}</option>
                    <option value="running_ads_improve_conversion">{t('stage_running_improve')}</option>
                    <option value="running_ads_attribution_issue">{t('stage_running_issue')}</option>
                    <option value="replace_or_optimize_existing_solution">{t('stage_replace')}</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">{t('form_ad_spend')} <span className="text-brand">*</span></label>
                <select name="dailyAdSpend" required defaultValue="" className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-5 py-4 text-sm text-slate-200 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/50 transition-all appearance-none cursor-pointer">
                    <option value="" disabled className="text-slate-500">-- Select --</option>
                    <option value="not_started">{t('spend_none')}</option>
                    <option value="lt_100">{t('spend_lt100')}</option>
                    <option value="100_500">{t('spend_100_500')}</option>
                    <option value="500_2000">{t('spend_500_2000')}</option>
                    <option value="2000_10000">{t('spend_2000_10000')}</option>
                    <option value="gt_10000">{t('spend_gt10000')}</option>
                </select>
            </div>
          </div>
        </div>

        {/* Section 3: Details */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
            <div className="w-8 h-8 rounded-full bg-brand/20 text-brand flex items-center justify-center font-bold text-sm">3</div>
            <h4 className="text-lg font-semibold text-white">{t('step_3_title')}</h4>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-4">{t('form_target_regions')} <span className="text-brand">*</span></label>
            <div className="flex flex-wrap gap-2 md:gap-3">
                {['sea', 'india', 'latam', 'mena', 'jp_kr', 'africa', 'eu_us', 'other'].map((region) => (
                  <label key={region} className="relative group cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="targetRegions" 
                      value={region === 'mena' ? 'middle_east' : region} 
                      className="peer sr-only" 
                      onChange={(e) => {
                        setRegionError('');
                        if (region === 'other') setShowOtherRegion(e.target.checked);
                      }} 
                    />
                    <div className={`px-4 py-2.5 rounded-full border bg-slate-950/50 text-sm text-slate-400 peer-checked:bg-brand/10 peer-checked:border-brand peer-checked:text-brand hover:border-white/30 transition-all select-none ${regionError ? 'border-red-500/50' : 'border-white/10'}`}>
                      {t(`region_${region}`)}
                    </div>
                  </label>
                ))}
            </div>
            {regionError && <p className="text-red-400 text-xs mt-3 ml-1">{regionError}</p>}
            {showOtherRegion && (
              <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                <input 
                  type="text" 
                  name="targetRegionsOther" 
                  placeholder={t('region_other')} 
                  className="w-full md:w-1/2 bg-slate-950/50 border border-white/10 rounded-xl px-5 py-3 text-sm text-white focus:outline-none focus:border-brand transition-colors"
                  required={showOtherRegion}
                />
              </div>
            )}
          </div>
          
          <div className="pt-2">
            <label className="block text-sm font-medium text-slate-300 mb-3">{t('form_additional_notes')}</label>
            <textarea 
              name="additionalNotes" 
              placeholder={t('notes_placeholder')} 
              rows={3}
              className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/50 transition-all resize-none"
            ></textarea>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5">
          <button type="submit" disabled={submitting || !!urlError || !!telegramError || !!emailError} className="w-full md:w-auto md:min-w-[280px] mx-auto bg-brand hover:bg-brand-hover text-white font-bold py-4 px-8 rounded-full flex items-center justify-center gap-3 transition-all hover:shadow-[0_0_30px_rgba(0,194,80,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none">
            {submitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                {t('sending')}
              </>
            ) : (
              <>
                <Send size={18} /> {t('submit')}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

import { useTranslations } from 'next-intl';
import { Mail } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import ContactForm from '@/components/contact/ContactForm';
import SectionTitle from '@/components/ui/SectionTitle';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Contact'});
  return {
    title: `${t('title')} | PWA.ad`,
    description: t('subtitle'),
    alternates: {
      canonical: `https://pwa.ad/${locale}/contact`,
    }
  };
}

export default function ContactPage() {
  const t = useTranslations('Contact');

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <SectionTitle className="mb-4">
              {t('title')}
            </SectionTitle>
            <p className="text-slate-300 text-lg font-medium">{t('subtitle')}</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            {/* Contact Form */}
            <ContactForm />

            {/* Bottom Info / Trust Panel */}
            <div className="p-8 rounded-2xl border border-white/10 bg-slate-900/30 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                <div className="w-14 h-14 shrink-0 rounded-full bg-brand/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path><path d="m9 12 2 2 4-4"></path></svg>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">100% 隐私保护</h3>
                  <div className="text-sm text-slate-400 leading-relaxed">
                      {t('response_time_text')}
                  </div>
                </div>

                <div className="flex flex-col gap-3 text-sm text-slate-300 md:pl-8 md:border-l border-white/10">
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand"></div>
                    您的业务数据将严格保密
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand"></div>
                    技术专家 1v1 专属对接
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand"></div>
                    最快 4 小时内完成部署
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

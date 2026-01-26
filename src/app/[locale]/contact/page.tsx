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
            <p className="text-gray-400 text-lg font-medium">{t('subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Contact Form */}
            <div className="md:col-span-3">
              <ContactForm />
            </div>

            {/* Direct Contact Info */}
            <div className="md:col-span-2 space-y-6">
                <div className="bg-gradient-to-br from-brand/20 to-slate-900/40 p-6 rounded-2xl border border-white/10">
                    <h3 className="text-lg font-bold mb-6">{t('contact_info')}</h3>

                    <a href="mailto:support@pwa.ad" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                        <div className="bg-sky-500/20 p-3 rounded-lg text-sky-400 group-hover:scale-110 transition-transform">
                            <Mail size={24} />
                        </div>
                        <div>
                            <div className="text-sm text-gray-400">Email</div>
                            <div className="font-semibold text-white">support@pwa.ad</div>
                        </div>
                    </a>
                </div>

                <div className="p-6 rounded-2xl border border-white/5 bg-slate-950/50">
                    <div className="text-sm text-gray-500 leading-relaxed">
                        {t('response_time_text')}
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

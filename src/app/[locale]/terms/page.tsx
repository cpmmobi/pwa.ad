import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Legal'});
  return {
    title: `${t('terms_title')} - PWA.ad`,
  };
}

export default function TermsPage() {
  const t = useTranslations('Legal');

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{t('terms_title')}</h1>
          </div>
          <div className="bg-slate-900/50 p-8 rounded-2xl border border-white/10 text-gray-300 leading-relaxed whitespace-pre-wrap">
            {t('terms_content')}
          </div>
        </div>
      </div>
    </div>
  );
}

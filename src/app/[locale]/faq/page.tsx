import { useTranslations } from 'next-intl';
import SectionTitle from '@/components/ui/SectionTitle';
import { getTranslations } from 'next-intl/server';
import { Plus, Minus } from 'lucide-react';
import FAQItem from './FAQItem';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'FAQ'});
  return {
    title: `${t('title')} - PWA.ad`,
    description: t('subtitle')
  };
}

export default function FAQPage() {
  const t = useTranslations('FAQ');

  const faqs = [
    { q: t('q1'), a: t('a1') },
    { q: t('q2'), a: t('a2') },
    { q: t('q3'), a: t('a3') },
    { q: t('q4'), a: t('a4') },
    { q: t('q5'), a: t('a5') },
    { q: t('q6'), a: t('a6') },
    { q: t('q7'), a: t('a7') },
    { q: t('q8'), a: t('a8') },
  ];

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <SectionTitle>{t('title')}</SectionTitle>
          <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </div>
  );
}

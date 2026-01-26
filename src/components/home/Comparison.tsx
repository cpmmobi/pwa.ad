import { useTranslations } from 'next-intl';
import SectionTitle from '../ui/SectionTitle';

export default function Comparison() {
  const t = useTranslations('Comparison');

  const rows = [
    { key: 'row_review', pwa: 'val_easy', gp: 'val_hard', highlight: true },
    { key: 'row_risk', pwa: 'val_safe', gp: 'val_risk', highlight: true },
    { key: 'row_commission', pwa: 'val_zero', gp: 'val_high', highlight: true },
    { key: 'row_payment', pwa: 'val_flexible', gp: 'val_strict', highlight: true },
    { key: 'row_push', pwa: 'val_permanent', gp: 'val_none', highlight: true },
    { key: 'row_conversion', pwa: 'val_better', gp: 'val_standard', highlight: true },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle>{t('title')}</SectionTitle>
        
        <div className="overflow-x-auto">
          <table className="w-full max-w-4xl mx-auto border-collapse">
            <thead>
              <tr>
                <th className="p-4 text-left text-gray-400 w-1/3"></th>
                <th className="p-4 text-center text-xl font-bold text-brand bg-slate-800/50 rounded-t-xl w-1/3 border-b border-brand/20">
                {t('our_solution')}
              </th>
                <th className="p-4 text-center text-xl font-bold text-gray-400 w-1/3">
                  {t('google_play')}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-medium text-gray-300">{t(row.key)}</td>
                  <td className={`p-4 text-center font-bold bg-slate-800/50 border-x border-brand/20 ${row.highlight ? 'text-brand' : 'text-white'}`}>
                    {t(row.pwa)}
                  </td>
                  <td className="p-4 text-center text-gray-500">
                    {t(row.gp)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

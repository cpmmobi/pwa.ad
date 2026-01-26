"use client";

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { BellRing, BarChart3, ShieldCheck, Box, LayoutTemplate, Coins, CheckCircle2 } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import { motion } from 'framer-motion';

export default function Features() {
  const t = useTranslations('Features');

  const features = [
    {
      id: 'landing',
      icon: <ShieldCheck className="w-10 h-10 text-brand" />,
      title: t('landing_title'),
      desc: t('landing_desc'),
      detailTitle: t('landing_detail_title'),
      detailDesc: t('landing_detail_desc'),
      points: [t('landing_point1'), t('landing_point2'), t('landing_point3')],
      image: "/feature-landing.png"
    },
    {
      id: 'attribution',
      icon: <BarChart3 className="w-10 h-10 text-brand" />,
      title: t('attribution_title'),
      desc: t('attribution_desc'),
      detailTitle: t('attribution_detail_title'),
      detailDesc: t('attribution_detail_desc'),
      points: [t('attribution_point1'), t('attribution_point2'), t('attribution_point3')],
      image: "/feature-attribution.png"
    },
    {
      id: 'cloaking',
      icon: <BellRing className="w-10 h-10 text-brand" />,
      title: t('cloaking_title'),
      desc: t('cloaking_desc'),
      detailTitle: t('cloaking_detail_title'),
      detailDesc: t('cloaking_detail_desc'),
      points: [t('cloaking_point1'), t('cloaking_point2'), t('cloaking_point3')],
      image: "/feature-push.png"
    },
    {
      id: 'commission',
      icon: <Box className="w-10 h-10 text-brand" />,
      title: t('commission_title'),
      desc: t('commission_desc'),
      detailTitle: t('commission_detail_title'),
      detailDesc: t('commission_detail_desc'),
      points: [t('commission_point1'), t('commission_point2'), t('commission_point3')],
      image: "/feature-w2a.png"
    },
    {
      id: 'pixel',
      icon: <LayoutTemplate className="w-10 h-10 text-brand" />,
      title: t('pixel_title'),
      desc: t('pixel_desc'),
      detailTitle: t('pixel_detail_title'),
      detailDesc: t('pixel_detail_desc'),
      points: [t('pixel_point1'), t('pixel_point2'), t('pixel_point3')],
      image: "/feature-landing-page.png"
    },
    {
      id: 'price',
      icon: <Coins className="w-10 h-10 text-brand" />,
      title: t('price_title'),
      desc: t('price_desc'),
      detailTitle: t('price_detail_title'),
      detailDesc: t('price_detail_desc'),
      points: [t('price_point1'), t('price_point2'), t('price_point3')],
      image: "/feature-price.png"
    }
  ];

  const numberMap = ['一', '二', '三', '四', '五', '六'];

  const scrollToFeature = (id: string) => {
    const element = document.getElementById(`feature-${id}`);
    if (element) {
      const offset = 80; // Header height offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-20 bg-slate-900/50" id="features">
      <div className="container mx-auto px-4">
        <SectionTitle>
          {t('title_part1')} <span className="text-brand">{t('title_part2')}</span>
        </SectionTitle>
        
        {/* Navigation Cards (Click to Scroll) */}
        <div className="flex flex-wrap justify-center gap-6 mb-20">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => scrollToFeature(feature.id)}
              className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] p-6 rounded-xl border border-white/5 bg-slate-800/50 hover:bg-slate-800 hover:border-brand/50 transition-all text-left group relative overflow-hidden"
            >
              <div className="mb-4 w-16 h-16 rounded-lg flex items-center justify-center transition-colors bg-slate-900 text-brand group-hover:bg-brand/20">
                <div className="text-brand">
                    {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-brand transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </button>
          ))}
        </div>

        {/* Detailed Content List (Tiled Vertically) */}
        <div className="space-y-24">
            {features.map((feature, index) => (
                <motion.div
                    key={feature.id}
                    id={`feature-${feature.id}`}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="bg-slate-950 rounded-3xl border border-white/10 overflow-hidden shadow-2xl scroll-mt-24"
                >
                    <div className="grid md:grid-cols-2 gap-0">
                        {/* Text Content */}
                        <div className={`p-8 md:p-12 flex flex-col justify-center order-2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex gap-1" aria-hidden="true">
                                    <div className="w-1 h-4 bg-brand/20 -skew-x-12 rounded-[1px]"></div>
                                    <div className="w-1 h-4 bg-brand/40 -skew-x-12 rounded-[1px]"></div>
                                    <div className="w-1 h-4 bg-brand -skew-x-12 rounded-[1px]"></div>
                                </div>
                                <div className="text-brand font-black tracking-[0.2em] text-lg md:text-xl uppercase">
                                    {t('feature_prefix')}{numberMap[index]}
                                </div>
                            </div>
                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 text-white leading-tight tracking-tight drop-shadow-2xl">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                {feature.detailDesc}
                            </p>
                            <ul className="space-y-4">
                                {feature.points.map((point, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-white font-medium">
                                        <CheckCircle2 className="text-brand shrink-0" size={20} />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Image Display */}
                        <div className={`bg-slate-900 relative min-h-[300px] md:min-h-full order-1 flex items-center justify-center overflow-hidden ${index % 2 === 0 ? 'md:order-2 border-l border-white/5' : 'md:order-1 border-r border-white/5'}`}>
                            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 z-10"></div>
                            <div className="relative w-full h-full min-h-[300px]">
                                <Image 
                                    src={feature.image as any} 
                                    alt={feature.title} 
                                    fill 
                                    className="object-cover hover:scale-105 transition-transform duration-700" 
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}

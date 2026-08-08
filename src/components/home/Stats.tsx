"use client";

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState, useMemo } from 'react';

const CountUp = ({ end, duration = 2 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function: easeOutExpo
      const easeOutExpo = (x: number): number => {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
      };

      setCount(Math.floor(easeOutExpo(progress) * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return <span ref={nodeRef}>{count.toLocaleString()}</span>;
};

export default function Stats() {
  const t = useTranslations('Stats');

  // Calculate dynamic count based on current date
  const dynamicCount = useMemo(() => {
    // Base date: 2024-01-01
    const baseDate = new Date('2024-01-01').getTime();
    const baseCount = 39324202; // Base count
    const dailyGrowth = 18450; // Daily growth approx
    
    const now = Date.now();
    const daysDiff = Math.floor((now - baseDate) / (1000 * 60 * 60 * 24));
    
    // Add some random variance based on hour of day to simulate real-time
    const hourVariance = Math.floor((new Date().getHours() / 24) * dailyGrowth);
    
    return baseCount + (daysDiff * dailyGrowth) + hourVariance;
  }, []);

  return (
    <section className="py-10 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-brand/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-base md:text-lg text-slate-300 mb-2 font-medium tracking-wide">
            {t('title')}
          </h2>
          
          <div className="flex items-center justify-center gap-1 mb-3">
            <span className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400 tabular-nums tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
              <CountUp end={dynamicCount} duration={2.5} />
            </span>
            <span className="text-2xl md:text-3xl font-bold text-brand mb-1 self-end pb-1 md:pb-2">
              {t('unit')}
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-semibold">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand"></span>
            </span>
            {t('subtitle')}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

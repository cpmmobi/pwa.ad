"use client";

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight, Play } from 'lucide-react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Hero() {
  const t = useTranslations('Hero');
  const locale = useLocale();
  const [showLogo, setShowLogo] = useState(false);
  const [flash, setFlash] = useState(false);
  const controls = useAnimation();

  // Full text to type out
  const fullText = "Progressive Web App for Advertisement";
  
  // Animation variants for the typewriter effect
  const sentenceVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.03, // Faster typing
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      filter: "blur(4px)",
      transition: { duration: 0.4, ease: "easeIn" }
    }
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  useEffect(() => {
    // Start the typewriter sequence
    const sequence = async () => {
      await controls.start("visible");
      // Wait for reading (shorter for impact)
      await new Promise(resolve => setTimeout(resolve, 800));
      // Fade out typewriter text
      await controls.start("exit");
      
      // Flash effect
      setFlash(true);
      setShowLogo(true);
      
      setTimeout(() => setFlash(false), 200);
    };
    
    sequence();
  }, [controls]);

  return (
    <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden min-h-[80vh] flex flex-col justify-center">
      
      {/* Flash Overlay */}
      {flash && (
        <div className="fixed inset-0 bg-white/80 z-[100] animate-out fade-out duration-300 pointer-events-none mix-blend-overlay"></div>
      )}

      <div className="container mx-auto px-4 text-center z-10 relative">
        
        {/* Intro Animation Container */}
        <div className="h-32 md:h-48 flex items-center justify-center mb-8 relative">
          {!showLogo ? (
            <motion.h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-brand/90 font-mono"
              variants={sentenceVariants}
              initial="hidden"
              animate={controls}
            >
              {fullText.split("").map((char, index) => (
                <motion.span key={`${char}-${index}`} variants={letterVariants}>
                  {char}
                </motion.span>
              ))}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.1, repeatDelay: 0.1 }}
                className="inline-block w-3 h-[1.2em] bg-brand ml-2 align-middle shadow-[0_0_10px_rgba(0,194,80,0.8)]"
              />
            </motion.h1>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 3, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1], // Custom spring-like ease
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
            >
               <h1 className="font-bold leading-tight">
                <span className="block text-6xl md:text-9xl tracking-tighter relative inline-block">
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-400 drop-shadow-[0_0_50px_rgba(255,255,255,0.5)]">
                    PWA
                  </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-brand via-brand to-brand-hover drop-shadow-[0_0_50px_rgba(0,194,80,0.6)]">
                    .ad
                  </span>
                </span>
              </h1>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: showLogo ? 1 : 0, y: showLogo ? 0 : 30 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
            <span className="block text-2xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-brand via-white to-brand bg-300% animate-gradient font-bold mb-8">
              {t('title_slogan')}
            </span>
        </motion.div>

        <motion.p 
          className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showLogo ? 1 : 0, y: showLogo ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
            <Link href="/contact" className="bg-brand hover:bg-brand-hover text-white px-10 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,194,80,0.4)]">
                {t('cta_contact')} <ArrowRight size={20} />
            </Link>
        </motion.div>

        <motion.div
          className="text-sm md:text-base text-slate-400 flex flex-wrap justify-center gap-2 items-center mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: showLogo ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          dangerouslySetInnerHTML={{ __html: t('trust_badges') }}
        />

        {/* Supported Platforms Logo Wall */}
        <motion.div
          className="pt-8 border-t border-white/5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showLogo ? 1 : 0, y: showLogo ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="text-sm text-slate-500 uppercase tracking-widest font-semibold mb-6">{t('supported_platforms')}</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0">
            {/* Meta (Facebook) */}
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" alt="Meta Ads" className="h-4 md:h-5 object-contain brightness-0 invert" />
            {/* Google Ads */}
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Ads_logo.svg" alt="Google Ads" className="h-6 md:h-7 object-contain brightness-0 invert" />
            {/* TikTok */}
            <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg" alt="TikTok Ads" className="h-6 md:h-7 object-contain brightness-0 invert" />
            {/* Kwai */}
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-6 md:h-7 object-contain">
              <title>Kwai Ads</title>
              <path d="M18.315 12.264c2.33 0 4.218 1.88 4.218 4.2V19.8c0 2.32-1.888 4.2-4.218 4.2h-6.202a4.218 4.218 0 0 1-4.023-2.938l-3.676 1.833a2.04 2.04 0 0 1-2.731-.903 2.015 2.015 0 0 1-.216-.907v-5.94a2.03 2.03 0 0 1 2.035-2.024 2.044 2.044 0 0 1 .919.218l3.673 1.85a4.218 4.218 0 0 1 4.02-2.925zm-.062 2.162h-6.078c-1.153 0-2.09.921-2.108 2.065v3.247c0 1.148.925 2.081 2.073 2.1h6.113c1.153 0 2.09-.922 2.109-2.065v-3.247a2.104 2.104 0 0 0-2.074-2.1zM4.18 15.72a.554.554 0 0 0-.555.542v3.734a.556.556 0 0 0 .798.496l.01-.004 3.463-1.756V17.51l-3.467-1.73a.557.557 0 0 0-.249-.06zM9.28 0a5.667 5.667 0 0 1 4.98 2.965 4.921 4.921 0 0 1 3.36-1.317c2.714 0 4.913 2.177 4.913 4.863 0 2.686-2.2 4.863-4.912 4.863a4.921 4.921 0 0 1-3.996-2.034 5.651 5.651 0 0 1-4.345 2.034c-3.131 0-5.67-2.546-5.67-5.687C3.61 2.546 6.149 0 9.28 0Zm8.34 3.926c-1.441 0-2.61 1.157-2.61 2.585s1.169 2.585 2.61 2.585c1.443 0 2.612-1.157 2.612-2.585s-1.169-2.585-2.611-2.585zM9.28 2.287a3.395 3.395 0 0 0-3.39 3.4c0 1.877 1.518 3.4 3.39 3.4a3.395 3.395 0 0 0 3.39-3.4c0-1.878-1.518-3.4-3.39-3.4z"/>
            </svg>
            {/* AppsFlyer */}
            <svg viewBox="0 0 110 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-5 md:h-6 object-contain">
              <title>AppsFlyer</title>
              <text x="0" y="18" fontFamily="Arial, Helvetica, sans-serif" fontWeight="bold" fontSize="19" letterSpacing="-0.5">AppsFlyer</text>
            </svg>
          </div>
        </motion.div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/10 rounded-full blur-[120px]"
          animate={{ 
            scale: showLogo ? [1, 1.2, 1] : 1,
            opacity: showLogo ? [0.2, 0.4, 0.2] : 0
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand/10 rounded-full blur-[120px]"
          animate={{ 
            scale: showLogo ? [1.2, 1, 1.2] : 1,
            opacity: showLogo ? [0.2, 0.4, 0.2] : 0
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>
    </section>
  );
}

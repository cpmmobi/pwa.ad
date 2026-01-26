"use client";

import { useTranslations } from 'next-intl';
import { ArrowRight, Play } from 'lucide-react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Hero() {
  const t = useTranslations('Hero');
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
          className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showLogo ? 1 : 0, y: showLogo ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          {t('subtitle')}
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showLogo ? 1 : 0, y: showLogo ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
            <button className="bg-brand hover:bg-brand-hover text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 hover:shadow-lg hover:shadow-brand/25">
                {t('cta_contact')} <ArrowRight size={20} />
            </button>
            <button className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-all backdrop-blur-sm border border-white/10 hover:border-white/20">
                <Play size={20} className="fill-current" /> {t('cta_demo')}
            </button>
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

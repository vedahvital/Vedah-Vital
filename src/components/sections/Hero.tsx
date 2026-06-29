import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ShieldCheck from '../ui/icons/shield-check';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const resetTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 5);
    }, 5000);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % 5);
    resetTimer();
  }, [resetTimer]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + 5) % 5);
    resetTimer();
  }, [resetTimer]);

  useEffect(() => {
    resetTimer();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [resetTimer]);

  const renderSlideContent = (slideIndex: number) => {
    switch (slideIndex) {
      case 0:
        return (
          <motion.div
            key="slide-bottle"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Circular soft halo glow */}
            <div className="absolute w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-[var(--color-navy)]/25 to-white/30 filter blur-2xl opacity-80 z-0" />

            {/* Info badge 1 (Claymorphic) */}
            <div className="absolute top-[12%] left-2 sm:left-[-4%] md:left-[-8%] z-20 clay-card-navy py-2 px-3 sm:py-3 sm:px-4.5 flex flex-col items-start gap-0.5 pointer-events-none select-none">
              <span className="text-[7px] sm:text-[8px] font-sans font-bold tracking-[0.15em] text-[var(--color-navy)] uppercase leading-none">FORMULA TYPE</span>
              <span className="text-[10px] sm:text-[11px] font-sans font-bold text-[var(--color-heading)] uppercase leading-none">5% WITHANOLIDES</span>
            </div>

            {/* Info badge 2 (Glassmorphic) */}
            <div className="absolute bottom-[18%] right-2 sm:right-[-4%] md:right-[-8%] z-20 glass-card-navy py-2 px-3 sm:py-3 sm:px-4.5 flex flex-col items-start gap-0.5 pointer-events-none select-none">
              <span className="text-[7px] sm:text-[8px] font-sans font-bold tracking-[0.15em] text-[var(--color-navy)] uppercase leading-none font-semibold">PURITY GUARANTEE</span>
              <span className="text-[10px] sm:text-[11px] font-sans font-bold text-[var(--color-heading)] uppercase leading-none font-bold">99.8% BIO-ACTIVE</span>
            </div>

            {/* Isolated product bottle image */}
            <img
              src="/images/isolated_bottle.webp"
              alt="Vedah Vital Ashwagandha Bottle"
              className="w-[65%] h-auto object-contain select-none filter drop-shadow-[0_30px_45px_rgba(10,25,47,0.22)] z-10"
              draggable="false"
            />
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            key="slide-supplement-facts"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full flex items-center justify-center p-2 sm:p-4"
          >
            <div className="w-full sm:w-[90%] md:w-[85%] h-[96%] sm:h-[92%] md:h-[90%] bg-white/95 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-3 sm:p-4 flex flex-col items-center justify-between z-10 overflow-hidden text-[var(--color-heading)]">
              <div className="w-full flex justify-between items-center px-1 sm:px-2 pb-1.5 sm:pb-2 border-b border-gray-200">
                <span className="font-sans text-[12.5px] sm:text-sm md:text-base font-bold tracking-wider uppercase text-[var(--color-navy)]">Supplement Facts</span>
                <span className="font-sans text-[10.5px] sm:text-xs md:text-sm font-semibold text-gray-500">60 Vegetarian Capsules</span>
              </div>
              
              <div className="flex-1 w-full flex items-center justify-center overflow-hidden my-2 sm:my-2.5">
                <img 
                  src="/images/supplement_facts.webp" 
                  alt="Supplement Facts Label" 
                  className="max-w-full max-h-full object-contain rounded-lg filter drop-shadow-md select-none"
                  draggable="false"
                />
              </div>
              
              <div className="w-full text-center text-[10.5px] sm:text-xs md:text-sm font-sans text-gray-500 leading-normal px-1 sm:px-2">
                Take 1 capsule daily. Standardized to 5% withanolides for maximum potency.
              </div>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="slide-ingredients"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full flex items-center justify-center p-1.5 sm:p-3"
          >
            <div className="w-full sm:w-[92%] h-[98%] sm:h-[92%] bg-white/95 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-2.5 sm:p-4.5 flex flex-col justify-between z-10 overflow-hidden text-[var(--color-heading)]">
              <div className="pb-1 sm:pb-1.5 border-b border-gray-200 text-center">
                <span className="font-sans text-[12.5px] sm:text-sm md:text-base font-bold tracking-wider uppercase text-[var(--color-navy)]">Active Ingredients</span>
              </div>

              {/* Side-by-side ingredient cards on desktop, stacked on mobile */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-3.5 my-1.5 sm:my-3">
                {/* Ashwagandha Card */}
                <div className="flex flex-row md:flex-col bg-[var(--color-navy)]/5 rounded-2xl border border-[var(--color-navy)]/10 overflow-hidden shadow-sm p-2 sm:p-3 text-left justify-between items-center md:items-stretch">
                  <div className="w-20 h-20 min-[380px]:w-24 min-[380px]:h-24 sm:w-28 sm:h-28 md:w-full md:h-auto md:aspect-[1.15/1] rounded-xl overflow-hidden shadow-inner border border-white bg-white shrink-0">
                    <img 
                      src="/images/ashwagandha_plant_root.webp" 
                      alt="Ashwagandha Plant & Root" 
                      className="w-full h-full object-cover select-none"
                      draggable="false"
                    />
                  </div>
                  <div className="flex flex-col flex-1 justify-center ml-3.5 md:ml-0 md:mt-2">
                    <div>
                      <span className="font-sans text-[12px] sm:text-[13px] md:text-sm font-bold text-[var(--color-heading)] leading-tight block">KSM-66® Ashwagandha</span>
                      <span className="font-sans text-[9.5px] sm:text-[10.5px] md:text-[11px] text-[var(--color-navy)] font-bold tracking-wider uppercase mt-0.5 block">600mg Dose</span>
                      <p className="font-sans text-[10px] min-[380px]:text-[10.5px] sm:text-[11.5px] md:text-[12px] text-[var(--color-text)] font-light leading-snug mt-1">
                        Clinically proven KSM-66® root extract, standardized to 5% active withanolides. Supports cortisol balance, cognitive focus, and muscle recovery.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Black Pepper Card */}
                <div className="flex flex-row md:flex-col bg-[var(--color-navy)]/5 rounded-2xl border border-[var(--color-navy)]/10 overflow-hidden shadow-sm p-2 sm:p-3 text-left justify-between items-center md:items-stretch">
                  <div className="w-20 h-20 min-[380px]:w-24 min-[380px]:h-24 sm:w-28 sm:h-28 md:w-full md:h-auto md:aspect-[1.15/1] rounded-xl overflow-hidden shadow-inner border border-white bg-white shrink-0">
                    <img 
                      src="/images/black_peppercorns.webp" 
                      alt="Black Peppercorns" 
                      className="w-full h-full object-cover select-none"
                      draggable="false"
                    />
                  </div>
                  <div className="flex flex-col flex-1 justify-center ml-3.5 md:ml-0 md:mt-2">
                    <div>
                      <span className="font-sans text-[12px] sm:text-[13px] md:text-sm font-bold text-[var(--color-heading)] leading-tight block">Black Pepper Extract</span>
                      <span className="font-sans text-[9.5px] sm:text-[10.5px] md:text-[11px] text-[var(--color-navy)] font-bold tracking-wider uppercase mt-0.5 block">5mg Dose</span>
                      <p className="font-sans text-[10px] min-[380px]:text-[10.5px] sm:text-[11.5px] md:text-[12px] text-[var(--color-text)] font-light leading-snug mt-1">
                        Premium Bio-enhancing Piperine extract. Maximizes bioavailability, ensuring optimal absorption of actives in every capsule.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center text-[10px] sm:text-[11px] md:text-xs font-sans text-gray-500">
                100% natural, vegetarian capsules with zero synthetic fillers.
              </div>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="slide-comparison"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full flex items-center justify-center p-2 sm:p-4"
          >
            <div className="w-full sm:w-[90%] h-[96%] sm:h-[90%] bg-white/95 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-3 sm:p-4 flex flex-col justify-between z-10 overflow-hidden text-[var(--color-heading)]">
              
              {/* Botanical Visual Image Banner */}
              <div className="h-[35%] w-full rounded-2xl overflow-hidden relative border border-gray-200 shrink-0">
                <img 
                  src="/images/hero_comparison.webp" 
                  alt="Root vs Leaf comparison" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-x-3 bottom-1.5 flex justify-between items-center text-white font-sans font-bold text-[7px] sm:text-[9px] tracking-wider uppercase">
                  <span>KSM-66® (Root Only)</span>
                  <span>Standard (Leaf Filler)</span>
                </div>
              </div>

              {/* Simplified Comparison Table */}
              <div className="flex-1 flex flex-col justify-center gap-1.5 my-2 text-left">
                <div className="grid grid-cols-12 gap-1 text-[9px] sm:text-[10px] md:text-xs font-sans font-bold border-b border-gray-100 pb-1 text-gray-400">
                  <div className="col-span-5">Feature</div>
                  <div className="col-span-4 text-[var(--color-navy)]">KSM-66®</div>
                  <div className="col-span-3">Standard</div>
                </div>

                <div className="grid grid-cols-12 gap-1 text-[9px] sm:text-[10px] md:text-xs font-sans border-b border-gray-50 py-1 items-center">
                  <div className="col-span-5 font-medium text-gray-600">Cytotoxicity</div>
                  <div className="col-span-4 font-bold text-emerald-600">Safe (≤0.1% WaA)</div>
                  <div className="col-span-3 text-red-500 font-bold">Risk (2.5% WaA)</div>
                </div>

                <div className="grid grid-cols-12 gap-1 text-[9px] sm:text-[10px] md:text-xs font-sans border-b border-gray-50 py-1 items-center">
                  <div className="col-span-5 font-medium text-gray-600">Withanolides</div>
                  <div className="col-span-4 font-bold text-emerald-600">5% Standardized</div>
                  <div className="col-span-3 text-red-500">Unspecified</div>
                </div>

                <div className="grid grid-cols-12 gap-1 text-[9px] sm:text-[10px] md:text-xs font-sans py-1 items-center">
                  <div className="col-span-5 font-medium text-gray-600">Clinical Proof</div>
                  <div className="col-span-4 font-bold text-emerald-600">20+ Trials</div>
                  <div className="col-span-3 text-red-500">None</div>
                </div>
              </div>

              <div className="text-center text-[8.5px] sm:text-[10px] font-sans text-gray-400 border-t border-gray-100 pt-1.5 shrink-0">
                KSM-66® is the highest concentration, most bioavailable root extract.
              </div>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            key="slide-benefits"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full flex items-center justify-center p-2 sm:p-4"
          >
            <div className="w-full sm:w-[90%] h-[96%] sm:h-[90%] bg-white/95 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-3.5 sm:p-5 flex flex-col justify-between z-10 overflow-hidden text-[var(--color-heading)]">
              <div className="pb-1.5 sm:pb-2 border-b border-gray-200 text-center">
                <span className="font-sans text-[12.5px] sm:text-sm md:text-base font-bold tracking-wider uppercase text-[var(--color-navy)]">Clinically Backed Benefits</span>
              </div>

              <div className="flex-1 flex flex-col justify-center gap-3 sm:gap-4.5 my-2.5 sm:my-4 text-left">
                <div>
                  <div className="flex justify-between items-center text-[11.5px] sm:text-[12.5px] md:text-sm font-sans font-bold text-gray-700">
                    <span>Stress & Cortisol Reduction</span>
                    <span className="text-[var(--color-navy)]">-27.9%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full mt-1.5 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: "27.9%" }} 
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="bg-[var(--color-navy)] h-full rounded-full" 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-[11.5px] sm:text-[12.5px] md:text-sm font-sans font-bold text-gray-700">
                    <span>Strength & Muscle Recovery</span>
                    <span className="text-[var(--color-navy)]">+17.8%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full mt-1.5 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: "17.8%" }} 
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="bg-[var(--color-navy)] h-full rounded-full" 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-[11.5px] sm:text-[12.5px] md:text-sm font-sans font-bold text-gray-700">
                    <span>Cognitive Focus & Memory</span>
                    <span className="text-[var(--color-navy)]">+13.5%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full mt-1.5 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: "13.5%" }} 
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="bg-[var(--color-navy)] h-full rounded-full" 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-[11.5px] sm:text-[12.5px] md:text-sm font-sans font-bold text-gray-700">
                    <span>Restful Sleep Depth</span>
                    <span className="text-[var(--color-navy)]">+15.2%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full mt-1.5 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: "15.2%" }} 
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="bg-[var(--color-navy)] h-full rounded-full" 
                    />
                  </div>
                </div>
              </div>

              <div className="text-center text-[10.5px] sm:text-xs md:text-sm font-sans text-gray-500">
                *Based on randomized double-blind placebo-controlled clinical trials.
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  // Parallax scrolling layers
  const { scrollY } = useScroll();
  const yBottle = useTransform(scrollY, [0, 1000], [0, -70]);



  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100svh] flex items-center justify-center pt-28 pb-16 overflow-clip bg-white"
    >
      {/* 1. Full-Width Background Layer */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <img 
          src="/images/hero-bg.webp?v=4" 
          alt="Natural Stone Backdrop" 
          className="w-full h-full object-cover opacity-100 select-none"
          draggable="false"
        />

        {/* Soft bottom blend to white background - restricted to bottom 25% to keep image crisp */}
        <div className="absolute bottom-0 left-0 w-full h-[25%] bg-gradient-to-t from-white to-transparent z-0" />
      </div>

            
      {/* Main Grid Content */}
      <div className="w-full max-w-[var(--max-width)] mx-auto px-4 min-[400px]:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        <div className="order-2 lg:order-1 lg:col-span-6 flex flex-col items-start gap-4.5 text-left py-5 md:py-6.5 px-6 md:px-8 rounded-3xl liquid-glass-card max-w-xl">
          
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-navy)]" />
            <span className="font-sans text-[0.75rem] font-bold tracking-[0.25em] text-[var(--color-navy)] uppercase">
              100% organic KSM-66®
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col"
          >
            <h1 className="heading-condensed text-5xl min-[400px]:text-6xl md:text-7xl lg:text-6xl xl:text-8xl text-[var(--color-heading)] tracking-wide">
              ashwagandha
            </h1>
            <h2 className="heading-condensed text-3xl min-[400px]:text-4xl md:text-5xl lg:text-4xl xl:text-6xl text-[var(--color-navy)] tracking-wide -mt-2">
              zero compromise
            </h2>
            <span className="font-sans font-bold text-[10px] tracking-[0.18em] text-[var(--color-heading)] opacity-80 uppercase mt-2">
              standardized root extract • 5% active withanolides
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans text-[0.95rem] text-[var(--color-text)] font-light leading-relaxed"
          >
            Experience authentic Ayurvedic science. Our formulation delivers clinical stress support, muscle recovery, and sleep depth with zero fillers or leaf waste.
          </motion.p>

          {/* Action Row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto pt-3"
          >
            <a 
              href="https://www.amazon.com" 
              target="_blank" 
              rel="noreferrer"
              className="w-full sm:w-auto focus:outline-none"
            >
              <Button variant="primary" className="w-full sm:w-auto py-3.5 px-9">
                buy on amazon
              </Button>
            </a>

            {/* Trust specs */}
            <div className="flex items-center gap-4 text-xs font-sans font-semibold text-[var(--color-navy)]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                cGMP
              </span>
              <span className="opacity-40">•</span>
              <span>Non-GMO</span>
            </div>
          </motion.div>

        </div>

        {/* RIGHT COLUMN: Interactive Product Carousel */}
        <div className="group order-1 lg:order-2 lg:col-span-6 flex justify-center lg:justify-end items-center relative py-8 lg:py-0 z-10">
          <div className="relative w-full max-w-[460px] md:max-w-[500px] h-[460px] min-[380px]:h-[480px] md:h-auto md:aspect-square flex items-center justify-center overflow-visible">
            
            {/* Carousel Container (Static on hover, swipeable on touch/drag) */}
            <motion.div
              style={{ y: yBottle }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="relative w-full h-full flex items-center justify-center overflow-visible touch-pan-y cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_event, info) => {
                const threshold = 50; // Swipe threshold in pixels
                if (info.offset.x < -threshold) {
                  nextSlide();
                } else if (info.offset.x > threshold) {
                  prevSlide();
                }
              }}
            >
              <AnimatePresence mode="wait">
                {renderSlideContent(currentSlide)}
              </AnimatePresence>
            </motion.div>

            {/* Carousel Controls (Chevron Navigation) — hidden on mobile, visible on hover for md+ */}
            <button
              onClick={prevSlide}
              className="hidden md:flex absolute left-2 md:left-4 w-11 h-11 rounded-full bg-white/40 backdrop-blur-md border border-white/30 text-[var(--color-navy)] hover:text-white items-center justify-center hover:bg-[var(--color-navy)] transition-all duration-300 z-30 opacity-0 group-hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="hidden md:flex absolute right-2 md:right-4 w-11 h-11 rounded-full bg-white/40 backdrop-blur-md border border-white/30 text-[var(--color-navy)] hover:text-white items-center justify-center hover:bg-[var(--color-navy)] transition-all duration-300 z-30 opacity-0 group-hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Pagination Indicators (Dots) — padded for WCAG 44px touch target */}
            <div className="flex justify-center items-center gap-1 absolute bottom-[-20px] md:bottom-[-25px] left-1/2 -translate-x-1/2 z-30 bg-white/55 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/30 shadow-md">
              {[0, 1, 2, 3, 4].map((index) => (
                <button
                  key={index}
                  onClick={() => { setCurrentSlide(index); resetTimer(); }}
                  className="p-2 -m-1 focus:outline-none cursor-pointer"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <span className={`block h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? 'bg-[var(--color-navy)] w-5'
                      : 'bg-[var(--color-navy)]/35 hover:bg-[var(--color-navy)]/65 w-2'
                  }`} />
                </button>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );

};
export default Hero;

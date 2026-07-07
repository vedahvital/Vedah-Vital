import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Award, Check, ShieldAlert, X } from 'lucide-react';
import ShieldCheck from '../ui/icons/shield-check';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isEnlarged, setIsEnlarged] = useState(false);

  const resetTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!isPlaying) return;
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 5);
    }, 5000);
  }, [isPlaying]);

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

  // Scroll or Touch to exit enlarged view and resume sliding
  useEffect(() => {
    if (!isEnlarged) return;
    const handleExit = () => {
      setIsEnlarged(false);
      setIsPlaying(true);
    };
    window.addEventListener('scroll', handleExit, { passive: true });
    window.addEventListener('touchmove', handleExit, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleExit);
      window.removeEventListener('touchmove', handleExit);
    };
  }, [isEnlarged]);

  const renderSlideContent = (slideIndex: number, isEnlargedMode: boolean = false) => {
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

            {/* Info badge 1 (Claymorphic) - Top Left */}
            <div className="absolute top-[12%] left-2 sm:left-[-4%] md:left-[-8%] z-20 clay-card-navy py-2 px-3 sm:py-3 sm:px-4.5 flex flex-col items-start gap-0.5 pointer-events-none select-none">
              <span className="text-[7px] sm:text-[8px] font-sans font-bold tracking-[0.15em] text-[var(--color-navy)] uppercase leading-none">FORMULA TYPE</span>
              <span className="text-[10px] sm:text-[11px] font-sans font-bold text-[var(--color-heading)] uppercase leading-none">5% WITHANOLIDES</span>
            </div>

            {/* Info badge 2 (Glassmorphic) - Bottom Right */}
            <div className="absolute bottom-[18%] right-2 sm:right-[-4%] md:right-[-8%] z-20 glass-card-navy py-2 px-3 sm:py-3 sm:px-4.5 flex flex-col items-start gap-0.5 pointer-events-none select-none">
              <span className="text-[7px] sm:text-[8px] font-sans font-bold tracking-[0.15em] text-[var(--color-navy)] uppercase leading-none font-semibold">PURITY GUARANTEE</span>
              <span className="text-[10px] sm:text-[11px] font-sans font-bold text-[var(--color-heading)] uppercase leading-none font-bold">99.8% BIO-ACTIVE</span>
            </div>

            {/* Info badge 3 (Claymorphic) - Top Right: KSM-66 Licensed */}
            <div className="absolute top-[12%] right-2 sm:right-[-4%] md:right-[-8%] z-20 clay-card-navy py-2 px-3 sm:py-3 sm:px-4.5 flex flex-col items-end gap-0.5 pointer-events-none select-none">
              <span className="text-[7px] sm:text-[8px] font-sans font-bold tracking-[0.15em] text-[var(--color-navy)] uppercase leading-none">EXTRACT GRADE</span>
              <span className="text-[10px] sm:text-[11px] font-sans font-bold text-[var(--color-heading)] uppercase leading-none">KSM-66® LICENSED</span>
            </div>

            {/* Info badge 4 (Glassmorphic) - Bottom Left: Clinically Studied */}
            <div className="absolute bottom-[18%] left-2 sm:left-[-4%] md:left-[-8%] z-20 glass-card-navy py-2 px-3 sm:py-3 sm:px-4.5 flex flex-col items-start gap-0.5 pointer-events-none select-none">
              <span className="text-[7px] sm:text-[8px] font-sans font-bold tracking-[0.15em] text-[var(--color-navy)] uppercase leading-none font-semibold">EVIDENCE BASED</span>
              <span className="text-[10px] sm:text-[11px] font-sans font-bold text-[var(--color-heading)] uppercase leading-none font-bold">CLINICALLY STUDIED</span>
            </div>

            {/* Info badge 5 (Claymorphic) - Middle Left: Root Only Extract */}
            <div className="absolute left-2 sm:left-[-4%] md:left-[-8%] top-1/2 -translate-y-1/2 -mt-10 z-20 clay-card-navy py-2 px-3 sm:py-3 sm:px-4.5 flex flex-col items-start gap-0.5 pointer-events-none select-none">
              <span className="text-[7px] sm:text-[8px] font-sans font-bold tracking-[0.15em] text-[var(--color-navy)] uppercase leading-none">SOURCE</span>
              <span className="text-[10px] sm:text-[11px] font-sans font-bold text-[var(--color-heading)] uppercase leading-none">ROOT ONLY EXTRACT</span>
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
            className="w-full h-full flex items-center justify-center p-1 sm:p-2.5"
          >
            <div className="w-full h-full bg-white/95 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-2.5 sm:p-4 md:p-5 flex flex-col justify-between z-10 overflow-hidden text-[var(--color-heading)]">
              
              {/* Header Title */}
              <div className="w-full text-center pb-1 border-b border-gray-100 shrink-0">
                <h3 className="font-sans text-[10px] sm:text-xs md:text-sm font-extrabold tracking-wide uppercase text-gray-900">
                  KSM-66 ASHWAGANDHA: Root vs. Whole Plant
                </h3>
              </div>

              {/* Grid content */}
              <div className="flex-1 grid grid-cols-2 gap-2 sm:gap-4 my-1.5 items-stretch">
                
                {/* LEFT COLUMN: Vedah Vital (KSM-66) - Rich Navy/Gold Spotlight Card */}
                <div 
                  className="rounded-2xl p-2 sm:p-4.5 flex flex-col justify-between border relative overflow-hidden text-left"
                  style={{
                    background: 'linear-gradient(145deg, #1B365D 0%, #0A192F 100%)',
                    borderColor: 'rgba(255, 226, 150, 0.25)',
                    boxShadow: '0 8px 24px -10px rgba(10, 25, 47, 0.3)'
                  }}
                >
                  {/* Golden foil top edge line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D9A05B] via-[#FFE296] to-[#D9A05B]" />

                  <div className="flex flex-col gap-2 sm:gap-3 flex-1 justify-between">
                    
                    {/* Header Badge */}
                    <div className="flex items-center gap-1.5 border-b border-white/10 pb-1.5 sm:pb-3">
                      <div className="w-5.5 h-5.5 sm:w-8.5 sm:h-8.5 rounded bg-white/10 text-[#FFE296] flex items-center justify-center shadow-md shrink-0">
                        <Award className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 stroke-[1.5]" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-sans text-[6px] min-[380px]:text-[7px] sm:text-[8px] font-bold text-[#FFE296] tracking-[0.1em] block uppercase truncate">Standardized Root</span>
                        <h3 className="heading-condensed text-[9px] min-[380px]:text-[11px] sm:text-base text-white leading-none mt-0.5 truncate">Vedah Vital KSM-66</h3>
                      </div>
                    </div>

                    {/* Botanical Image */}
                    <div className={`${isEnlargedMode ? 'h-24 min-[380px]:h-32 sm:h-44 md:h-52' : 'h-16 min-[380px]:h-22 sm:h-38 md:h-44 lg:h-48'} w-full rounded-xl overflow-hidden relative border border-white/10 shadow-sm shrink-0`}>
                      <img 
                        src="/images/ashwagandha_root.png" 
                        alt="Organic Ashwagandha Tuberous Root" 
                        className="w-full h-full object-cover select-none"
                        draggable="false"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-1 left-1 bg-[#FFE296] text-[var(--color-navy-deep)] font-sans font-bold text-[6px] min-[380px]:text-[7.5px] sm:text-[9px] tracking-[0.1em] uppercase px-1.5 py-0.5 rounded shadow-sm">
                        100% Root Only
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="flex-1 flex flex-col justify-around py-1.5 sm:py-3.5">
                      {[
                        "Lowest Cytotoxicity (Safe)",
                        "Standardized & Bioactive",
                        "GRAS Affirmed & Certified",
                        "Traditional Wisdom"
                      ].map((title, idx) => (
                        <div key={idx} className="flex gap-1.5 sm:gap-2.5 items-center">
                          <div className="w-3.5 h-3.5 sm:w-5.5 sm:h-5.5 rounded-full bg-[#FFE296]/15 text-[#FFE296] flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 stroke-[3]" />
                          </div>
                          <span className="font-sans text-[8px] min-[380px]:text-[9px] sm:text-xs md:text-sm font-bold text-white leading-tight">{title}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

                {/* RIGHT COLUMN: Alternative (Whole Body) - Muted Grey Card */}
                <div 
                  className="rounded-2xl p-2 sm:p-4.5 flex flex-col justify-between border relative text-left"
                  style={{
                    background: 'linear-gradient(135deg, rgba(10, 25, 47, 0.01) 0%, rgba(10, 25, 47, 0.03) 100%)',
                    borderColor: 'rgba(10, 25, 47, 0.08)',
                    boxShadow: '0 8px 20px -10px rgba(10, 25, 47, 0.03)'
                  }}
                >
                  <div className="flex flex-col gap-2.5 sm:gap-3 flex-1 justify-between">
                    
                    {/* Header Badge */}
                    <div className="flex items-center gap-1.5 border-b border-gray-200 pb-1.5 sm:pb-3">
                      <div className="w-5.5 h-5.5 sm:w-8.5 sm:h-8.5 rounded bg-gray-200/50 text-gray-400 flex items-center justify-center shadow-inner shrink-0">
                        <ShieldAlert className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 stroke-[1.5]" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-sans text-[6px] min-[380px]:text-[7px] sm:text-[8px] font-bold text-gray-400 tracking-[0.1em] block uppercase truncate">Alternative</span>
                        <h3 className="heading-condensed text-[9px] min-[380px]:text-[11px] sm:text-base text-[var(--color-heading)] leading-none mt-0.5 opacity-65 truncate">Whole Body Powder</h3>
                      </div>
                    </div>

                    {/* Botanical Image */}
                    <div className={`${isEnlargedMode ? 'h-24 min-[380px]:h-32 sm:h-44 md:h-52' : 'h-16 min-[380px]:h-22 sm:h-38 md:h-44 lg:h-48'} w-full rounded-xl overflow-hidden relative border border-gray-200/50 shadow-sm shrink-0`}>
                      <img 
                        src="/images/ashwagandha_plant.png" 
                        alt="Ashwagandha Leaves and Berries" 
                        className="w-full h-full object-cover select-none"
                        draggable="false"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-1.5 left-1.5 bg-red-500 text-white font-sans font-bold text-[7px] sm:text-[9px] tracking-[0.1em] uppercase px-1.5 py-0.5 rounded shadow-sm">
                        Leaf & Stem Filler
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="flex-1 flex flex-col justify-around py-1.5 sm:py-3.5">
                      {[
                        "Elevated Cytotoxicity (Risk)",
                        "Variable Effects (Whole Plant)",
                        "Non-Traditional Use",
                        "Diluted Active Ingredients"
                      ].map((title, idx) => (
                        <div key={idx} className="flex gap-2 sm:gap-2.5 items-center">
                          <div className="w-3.5 h-3.5 sm:w-5.5 sm:h-5.5 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                            <X className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 stroke-[3]" />
                          </div>
                          <span className="font-sans text-[8px] min-[380px]:text-[9px] sm:text-xs md:text-sm font-bold text-[var(--color-heading)] opacity-80 leading-tight">{title}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

              </div>

              {/* Bottom footer specs */}
              <div className="w-full flex flex-col gap-1 shrink-0 mt-2">
                <div className="self-center bg-[#E1ECF7] border border-[#C6D9EC] rounded-full px-3 py-0.5 shadow-sm">
                  <span className="font-sans text-[6.5px] sm:text-[8px] font-extrabold tracking-wider uppercase text-gray-900">
                    KEY DIFFERENCES
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-0.5 border-t border-gray-100 pt-1.5 text-[5.5px] min-[380px]:text-[6.5px] sm:text-[7.5px] md:text-[8.5px] font-extrabold uppercase text-gray-800 tracking-wider text-center leading-normal">
                  <div className="border-r border-gray-200 pr-1 flex items-center justify-center">Active Compounds</div>
                  <div className="border-r border-gray-200 px-1 flex items-center justify-center">Purity & Potency</div>
                  <div className="border-r border-gray-200 px-1 flex items-center justify-center">Clinical Research</div>
                  <div className="pl-1 flex items-center justify-center">Safety Profile</div>
                </div>
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
      className="relative min-h-[100svh] md:min-h-[800px] lg:min-h-[850px] flex items-center justify-center pt-28 pb-16 overflow-clip bg-white"
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
          <div className="relative w-full max-w-[460px] md:max-w-[500px] h-[390px] min-[380px]:h-[420px] md:h-[580px] lg:h-[600px] flex items-center justify-center overflow-visible">
            
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
              onTap={() => {
                if (!isEnlarged) {
                  setIsEnlarged(true);
                  setIsPlaying(false);
                }
              }}
            >
              <AnimatePresence mode="wait">
                {renderSlideContent(currentSlide, false)}
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

      {/* Enlarged Slide Modal Overlay */}
      <AnimatePresence>
        {isEnlarged && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsEnlarged(false);
              setIsPlaying(true);
            }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            {/* Enlarged Card Wrapper */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-[500px] h-[520px] sm:h-[580px] md:h-[600px] cursor-default"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking card itself
            >
              {/* Close Button */}
              <button 
                onClick={() => {
                  setIsEnlarged(false);
                  setIsPlaying(true);
                }}
                className="absolute -top-12 right-2 text-white/80 hover:text-white flex items-center gap-1.5 font-sans text-xs uppercase tracking-wider bg-white/10 hover:bg-white/20 rounded-full px-3.5 py-1.5 transition-all cursor-pointer border border-white/15 focus:outline-none"
              >
                <X className="w-3.5 h-3.5" />
                Close
              </button>

              {renderSlideContent(currentSlide, true)}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );

};
export default Hero;

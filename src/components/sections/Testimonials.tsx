import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowLeft, ArrowRight, ShieldCheck, Quote } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../../lib/mockData';

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const activeReview = TESTIMONIALS_DATA[activeIndex];

  return (
    <section className="bg-white text-[var(--color-text)] py-14 md:py-18 relative overflow-hidden border-b border-[rgba(10, 25, 47,0.15)]">
      {/* Background watermark - darkened */}
      <div className="absolute left-[-10%] top-[30%] opacity-30 pointer-events-none select-none">
        <span className="text-watermark">vedah vital</span>
      </div>

      
      <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-12 relative z-10">

        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 pb-8 border-b border-[rgba(10, 25, 47,0.15)]">
          <div className="lg:col-span-7">
            <span className="eyebrow text-[var(--color-navy)] block mb-3">CONSCIOUS REVIEWS</span>
            <h2 className="heading-condensed text-4xl md:text-5xl text-[var(--color-heading)] tracking-wide">
              real results
            </h2>
            <h3 className="heading-condensed text-2xl md:text-3.5xl text-[var(--color-navy)] tracking-wide -mt-2">
              from real routines
            </h3>
          </div>
          <div className="lg:col-span-5">
            <p className="font-sans text-sm md:text-base text-[var(--color-text)] font-light leading-relaxed">
              Read how Vedah Vital Ashwagandha Root Extract supports the daily stress balance and sleep hygiene of our verified community.
            </p>
          </div>
        </div>

        {/* Content Layout: Left Aggregate, Right Review */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-4xl mx-auto">
          
          {/* Left Rating Box - Premium Rating Summary */}
          <div className="lg:col-span-4 p-8 flex flex-col gap-6 text-left relative clay-card-navy">
            
            {/* Main Score */}
            <div className="flex flex-col gap-1">
              <span className="font-display text-7xl font-bold text-[var(--color-navy)] leading-none">
                4.8
              </span>
              <div className="flex gap-0.5 text-[var(--color-navy)] mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current stroke-[1]" />
                ))}
              </div>
              <span className="font-sans text-[9px] font-bold uppercase tracking-widest text-[var(--color-heading)] opacity-60 mt-1">
                Verified Community Rating
              </span>
            </div>

            {/* Star Breakdown Bars */}
            <div className="flex flex-col gap-2 border-t border-[rgba(10, 25, 47,0.12)] pt-5">
              {[
                { stars: 5, pct: 82 },
                { stars: 4, pct: 12 },
                { stars: 3, pct: 4 },
                { stars: 2, pct: 1 },
                { stars: 1, pct: 1 },
              ].map(({ stars, pct }) => (
                <div key={stars} className="flex items-center gap-2">
                  <span className="font-sans text-[8px] font-bold text-[var(--color-text)] opacity-50 w-3 text-right">{stars}</span>
                  <Star className="w-2.5 h-2.5 fill-[var(--color-navy)] text-[var(--color-navy)] shrink-0" />
                  <div className="flex-1 h-1 rounded-full bg-[rgba(10, 25, 47,0.12)] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[var(--color-navy)]"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="font-sans text-[8px] text-[var(--color-text)] opacity-40 w-5 text-right">{pct}%</span>
                </div>
              ))}
            </div>

            {/* Footer badges */}
            <div className="flex flex-col gap-2 border-t border-[rgba(10, 25, 47,0.12)] pt-4">
              <span className="font-sans text-[8px] font-bold tracking-widest text-[var(--color-navy)] uppercase">
                100% Pure Organic Root
              </span>
              <span className="font-sans text-[8px] text-[var(--color-text)] opacity-40">
                Based on 2,400+ verified purchases
              </span>
            </div>

          </div>

          {/* Right Slideshow panel */}
          <div className="lg:col-span-8 flex flex-col justify-between gap-6 glass-card-navy border border-[rgba(10, 25, 47,0.18)] p-8 md:p-10 shadow-sm relative">
            
            <div className="min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                >
                  <Quote className="w-7 h-7 text-[var(--color-navy)]/30 mb-4" />
                  
                  {/* Active stars */}
                  <div className="flex gap-0.5 mb-4 text-[var(--color-navy)]">
                    {[...Array(activeReview.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current stroke-[1]" />
                    ))}
                  </div>

                  {/* Quote Body */}
                  <p className="font-display text-lg md:text-xl italic font-light leading-relaxed text-[var(--color-heading)] mb-6">
                    "{activeReview.text}"
                  </p>

                  {/* Author Row */}
                  <div className="flex items-center justify-between border-t border-[rgba(10, 25, 47,0.12)] pt-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-none border border-[rgba(10, 25, 47,0.25)] font-sans font-semibold text-xs flex items-center justify-center bg-[var(--color-navy)] text-white">
                        {activeReview.avatarInitials}
                      </div>
                      <div>
                        <h4 className="font-sans text-xs font-bold text-[var(--color-heading)] uppercase">
                          {activeReview.name}
                        </h4>
                        <span className="text-[9px] text-[var(--color-text)] opacity-70 block">
                          Reviewed {activeReview.date}
                        </span>
                      </div>
                    </div>

                    {activeReview.verified && (
                      <span className="inline-flex items-center gap-1.5 text-[8px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-none border border-[var(--color-navy)]/25 bg-[var(--color-navy)]/5 text-[var(--color-navy)]">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified Buyer
                      </span>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Navigation Row */}
            <div className="flex justify-between items-center border-t border-[rgba(10, 25, 47,0.12)] pt-5 mt-auto">
              
              {/* Slide Dot Indicators */}
              <div className="flex gap-1.5 items-center">
                {TESTIMONIALS_DATA.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className="h-1.5 transition-all duration-300 cursor-pointer focus:outline-none rounded-none"
                    style={{
                      width: activeIndex === idx ? '20px' : '6px',
                      background: activeIndex === idx ? 'var(--color-navy)' : 'rgba(10, 25, 47,0.25)',
                    }}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Square Navigation Buttons */}
              <div className="flex gap-2">
                {[
                  { fn: handlePrev, icon: ArrowLeft, label: 'Previous' },
                  { fn: handleNext, icon: ArrowRight, label: 'Next' }
                ].map(({ fn, icon: Icon, label }) => (
                  <button
                    key={label}
                    onClick={fn}
                    className="w-9 h-9 rounded-none border border-[rgba(10, 25, 47,0.25)] flex items-center justify-center transition-all duration-300 cursor-pointer focus:outline-none text-[var(--color-navy)] hover:bg-[var(--color-navy)] hover:text-white hover:border-[var(--color-navy)] bg-white shadow-sm"
                    aria-label={`${label} Review`}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
export default Testimonials;

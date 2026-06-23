import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export const FinalCTA: React.FC = () => {
  return (
    <section className="bg-white text-[var(--color-text)] py-14 md:py-18 relative overflow-hidden border-b border-[rgba(10, 25, 47,0.15)]">
      
      {/* Bottom wave backdrop decoration matching reference visual - darkened/more visible */}
      <div className="absolute right-0 bottom-0 w-full lg:w-[45%] h-[80vh] pointer-events-none z-0 opacity-50 text-[var(--color-navy)]">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-current">
          <path d="M0 100 C40 100, 60 70, 70 40 C80 15, 90 5, 100 0 L100 100 Z" />
        </svg>
      </div>

      
      <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">

        {/* LEFT COLUMN: Copy & CTA (replicates morning should be tasty copy) */}
        <div className="lg:col-span-6 flex flex-col items-start gap-6 text-left">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[var(--color-navy)]" />
            <span className="font-sans text-[0.75rem] font-bold tracking-[0.25em] text-[var(--color-navy)] uppercase">
              DAILY INTEGRATION
            </span>
          </motion.div>

          <div className="flex flex-col">
            <h2 className="heading-condensed text-5xl md:text-7xl text-[var(--color-heading)] tracking-wide">
              your daily ritual
            </h2>
            <h3 className="heading-condensed text-3xl md:text-5xl text-[var(--color-navy)] tracking-wide -mt-2">
              starts here
            </h3>
          </div>

          <p className="font-sans text-sm md:text-[0.95rem] font-light leading-relaxed max-w-md">
            Integrate Vedah Vital KSM-66® into your daily routine. Best results are realized through consistent usage over 30 to 60 days to help balance daily cortisol cycles.
          </p>

          <Link to="/" className="pt-2 w-full sm:w-auto">
            <Button variant="primary" className="w-full sm:w-auto py-3.5 px-9 gap-2">
              order your bottle
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* RIGHT COLUMN: Circular bottle visual on pedestal (replicates donut on plate) */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end items-center py-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-[300px] md:w-[380px] aspect-square rounded-full border border-[rgba(10, 25, 47,0.25)] bg-white flex items-center justify-center overflow-visible shadow-md"
          >
            {/* Soft inner plate backdrop */}
            <div className="absolute inset-4 rounded-full bg-[var(--color-navy-light)] border border-dashed border-[rgba(10, 25, 47,0.15)] overflow-hidden flex items-center justify-center">
              
              {/* Stone Pedestal graphic */}
              <div className="absolute bottom-6 w-[80%] h-16 bg-white border border-[var(--border-navy-ghost)] shadow-sm flex items-center justify-center text-[7px] font-sans font-bold tracking-widest text-[var(--color-navy)] uppercase">
                vedah vital apothecary
              </div>

            </div>

            {/* Product Bottle floating above pedestal */}
            <motion.img
              src="/images/isolated_bottle.png"
              alt="Vedah Vital Ashwagandha Bottle"
              className="w-[50%] h-auto object-contain select-none filter drop-shadow-[0_20px_35px_rgba(10, 25, 47,0.15)] animate-float z-10"
              draggable="false"
            />

          </motion.div>
        </div>

      </div>
    </section>
  );
};
export default FinalCTA;

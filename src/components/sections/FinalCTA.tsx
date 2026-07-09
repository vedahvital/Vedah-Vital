import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShoppingCart, Mail, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export const FinalCTA: React.FC = () => {
  return (
    <section className="bg-white text-[var(--color-text)] py-14 md:py-18 relative overflow-clip border-b border-[rgba(10, 25, 47,0.15)]">
      
      <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-12 flex flex-col gap-14 md:gap-18 relative z-10">
        
        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Copy & CTA */}
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
              <h3 className="heading-condensed text-3xl md:text-5xl text-[var(--color-navy)] tracking-wide mt-4">
                starts here
            </h3>
            </div>

            <p className="font-sans text-sm md:text-[0.95rem] font-light leading-relaxed max-w-md">
              Integrate Vedah Vital KSM-66® into your daily routine. Best results are realized through consistent usage over 30 to 60 days to help balance daily cortisol cycles.
            </p>

            <Link to="/" className="pt-2 w-full sm:w-auto">
              <Button variant="primary" className="w-full sm:w-auto py-3.5 px-9 gap-2.5">
                <ShoppingCart className="w-4 h-4" />
                order your bottle
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* RIGHT COLUMN: Circular bottle visual on pedestal */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end items-center py-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-[280px] min-[340px]:w-[300px] md:w-[380px] aspect-square rounded-full border border-[rgba(10, 25, 47,0.25)] bg-white flex items-center justify-center overflow-visible shadow-md"
            >
              {/* Soft inner plate backdrop */}
              <div className="absolute inset-4 rounded-full bg-[var(--color-navy-light)] border border-dashed border-[rgba(10, 25, 47,0.15)] overflow-hidden flex items-center justify-center">
                

              </div>

              {/* Product Bottle floating above pedestal */}
              <motion.img
                src="/images/isolated_bottle.webp"
                alt="Vedah Vital Ashwagandha Bottle"
                className="w-[50%] h-auto object-contain select-none filter drop-shadow-[0_20px_35px_rgba(10, 25, 47,0.15)] animate-float z-10"
                draggable="false"
              />

            </motion.div>
          </div>

        </div>

        {/* Shipping & Support Trust Bar */}
        <div className="w-full pt-8 border-t border-[rgba(10,25,47,0.12)] grid grid-cols-1 md:grid-cols-2 gap-8 items-start text-left">
          
          {/* Shipping & Logistics info */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[var(--color-navy-light)] text-[var(--color-navy)] flex items-center justify-center shrink-0 shadow-inner">
              <Truck className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-1 max-w-lg">
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-[var(--color-heading)]">
                Amazon FBA Shipping & Logistics
              </span>
              <span className="font-sans text-xs md:text-sm text-[var(--color-text)] opacity-85 font-light leading-relaxed">
                All inventory is stored, packed, and shipped directly from Amazon Fulfillment Centers (FBA) to guarantee rapid, secure, and pristine delivery. Eligible for Amazon Prime 1–2 day shipping with automatic tracking.
              </span>
            </div>
          </div>

          {/* Support email */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[var(--color-navy-light)] text-[var(--color-navy)] flex items-center justify-center shrink-0 shadow-inner">
              <Mail className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-1 max-w-lg">
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-[var(--color-heading)]">
                Direct Apothecary Support
              </span>
              <span className="font-sans text-xs md:text-sm text-[var(--color-text)] opacity-85 font-light leading-relaxed">
                Questions about chromatography reports, purity audits, or shipping? Reach our support desk directly at{" "}
                <a href="mailto:info@vedahvital.com" className="font-semibold text-[var(--color-navy)] underline hover:text-[var(--color-navy-deep)] transition-colors lowercase">
                  info@vedahvital.com
                </a>
                . We guarantee a response within 24 hours.
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
export default FinalCTA;

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import { Button } from '../ui/Button';
import { AnimatedSection } from '../ui/AnimatedSection';

export const Heritage: React.FC = () => {
  return (
    <section className="bg-[var(--color-navy-light)] text-[var(--color-text)] py-14 md:py-18 relative overflow-hidden border-b border-[rgba(10, 25, 47,0.15)]">

      <div className="absolute right-[-5%] top-[10%] opacity-30 pointer-events-none select-none">
        <span className="text-watermark">vedah vital</span>
      </div>

            
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center gap-8 p-8 md:p-14 relative glass-card-navy border border-white/40 shadow-md">
          
          {/* Structural grid corners */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[var(--color-navy)]/35" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[var(--color-navy)]/35" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[var(--color-navy)]/35" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[var(--color-navy)]/35" />

          {/* Compass ornament */}
          <div className="w-12 h-12 rounded-none border border-[rgba(10, 25, 47,0.25)] flex items-center justify-center text-[var(--color-navy)] animate-spin-slow">
            <Compass className="w-5 h-5 stroke-[1.25]" />
          </div>

          <AnimatedSection className="flex flex-col gap-4">
            <span className="eyebrow text-[var(--color-navy)]">OUR BOTANICAL ROOTS</span>
            <h2 className="heading-condensed text-4xl md:text-5xl text-[var(--color-heading)] tracking-wide">
              ancient wisdom
            </h2>
            <h3 className="heading-condensed text-2xl md:text-3.5xl text-[var(--color-navy)] tracking-wide -mt-2">
              refined by modern bio-science
            </h3>
          </AnimatedSection>

          <div className="w-16 h-[1px] bg-[var(--color-navy)]/30" />

          <AnimatedSection className="flex flex-col gap-6 max-w-2xl">
            <p className="font-display text-xl md:text-2xl font-light leading-relaxed text-[var(--color-heading)] italic">
              "Ayurveda is the oldest surviving healing system on Earth. We believe its adaptogenic teachings are more critical today than ever before."
            </p>
            <p className="font-sans text-sm text-[var(--color-text)] font-light leading-relaxed">
              Vedah Vital's flagship Ashwagandha Root Extract is crafted for the modern active lifestyle. Sourced from organic roots, our formula delivers pure ashwagandha in vegetable cellulose capsules. By incorporating advanced standardization and black pepper bioavailability boosters, we unite age-old apothecary wisdom with premium quality standards.
            </p>
          </AnimatedSection>

          <AnimatedSection className="pt-4">
            <Link to="/about">
              <Button variant="primary" className="group gap-2">
                Read Our Story
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
};
export default Heritage;

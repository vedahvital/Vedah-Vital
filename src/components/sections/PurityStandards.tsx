import React from 'react';
import { Leaf } from 'lucide-react';
import { AnimatedSection } from '../ui/AnimatedSection';
import ShieldCheck from '../ui/icons/shield-check';
import RosetteDiscountCheckIcon from '../ui/icons/rosette-discount-check-icon';
import type { AnimatedIconProps } from '../ui/icons/types';

export const PurityStandards: React.FC = () => {
  const standards = [
    {
      icon: (props: AnimatedIconProps) => <Leaf {...props} className={`${props.className || ''} stroke-[1.5]`} />,
      title: "100% Certified Organic",
      description: "Cultivated strictly in chemical-free soil without synthetic pesticides, chemical weed-killers, or toxic fertilizers."
    },
    {
      icon: (props: AnimatedIconProps) => <ShieldCheck {...props} strokeWidth={1.5} />,
      title: "HPLC Potency Verified",
      description: "Every batch undergoes chromatography testing to ensure active withanolide compounds reach the 5% therapeutic threshold."
    },
    {
      icon: (props: AnimatedIconProps) => <RosetteDiscountCheckIcon {...props} strokeWidth={1.5} />,
      title: "Double-Barrier Laboratory Check",
      description: "Tested at raw harvest and again post-bottling. We guarantee absolute safety against heavy metals and microbial toxins."
    }
  ];

  return (
    <section className="bg-gradient-to-r from-[rgba(10, 25, 47,0.22)] via-[rgba(10, 25, 47,0.06)] to-white text-[var(--color-text)] py-20 md:py-28 relative overflow-hidden border-b border-[rgba(10, 25, 47,0.15)]">
            
      <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* LEFT COLUMN: Narrative text (replicates history of creation left side) */}
        <div className="lg:col-span-6 flex flex-col items-start gap-6 text-left">
          <span className="eyebrow text-[var(--color-navy)]">OUR TRADITION</span>
          
          <h2 className="heading-condensed text-4xl md:text-5xl text-[var(--color-heading)] tracking-wide">
            history of purity
          </h2>

          <div className="font-sans text-sm md:text-[0.95rem] font-light leading-relaxed flex flex-col gap-4">
            <p>
              In Sanskrit, Ayurveda represents "The Science of Life". For thousands of years, adaptogenic roots were prepared with reverent precision to restore natural vitality.
            </p>
            <p className="font-semibold text-[var(--color-heading)]">
              At Vedah Vital, we preserve this botanical wisdom while validating it with modern high-performance analytical chemistry.
            </p>
            <p>
              We believe in absolute label integrity. By screening every batch in ISO-certified laboratories and printing batch codes on every bottle, we provide standard testing verification directly to your hands.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Value points with claymorphic circle icons */}
        <div className="lg:col-span-6 flex flex-col gap-8">
          {standards.map((std, idx) => {
            const Icon = std.icon;
            return (
              <AnimatedSection
                key={std.title}
                delay={idx * 0.1}
                className="flex items-start gap-5 group"
              >
                {/* Claymorphic Circle Icon Frame */}
                <div className="w-12 h-12 flex items-center justify-center text-[var(--color-navy)] shrink-0 shadow-sm clay-circle-navy transition-all duration-300 group-hover:scale-105">
                  <Icon size={20} color="var(--color-navy)" className="transition-transform duration-300" />
                </div>

                <div className="flex flex-col gap-1 text-left">
                  <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-[var(--color-heading)]">
                    {std.title}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-[var(--color-text)] opacity-80 font-light leading-relaxed max-w-md">
                    {std.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

      </div>
    </section>
  );
};
export default PurityStandards;

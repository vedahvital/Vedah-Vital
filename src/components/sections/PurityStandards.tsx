import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '../ui/AnimatedSection';
import { PurityIllustration } from '../ui/PurityIllustration';

export const PurityStandards: React.FC = () => {
  const guarantees = [
    {
      title: "cGMP Facility",
      description: "Manufactured in a certified cGMP (current Good Manufacturing Practices) facility. Rigorous production control ensures every stage of batching meets FDA sanitation and quality benchmarks.",
      illustration: () => (
        <svg viewBox="0 0 100 100" className="w-20 h-20 text-[var(--color-navy)]" fill="none">
          <defs>
            <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8FB3FF" />
              <stop offset="100%" stopColor="#1B365D" />
            </linearGradient>
          </defs>

          {/* Cleanroom background panel */}
          <rect x="20" y="25" width="60" height="50" rx="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 2" opacity="0.3" />
          
          {/* Sterilization air filters lines */}
          <line x1="28" y1="32" x2="72" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.2" />
          <line x1="28" y1="36" x2="72" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.2" />

          {/* Distillation container */}
          <rect x="28" y="45" width="16" height="24" rx="4" stroke="currentColor" strokeWidth="1.8" />
          <path d="M36,45 L36,35 L48,35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Liquid filling animation */}
          <motion.rect
            x="30"
            y="55"
            width="12"
            height="12"
            rx="2"
            fill="#8FB3FF"
            opacity="0.3"
            animate={{ height: [4, 12, 4], y: [63, 55, 63] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Gauge Dial */}
          <circle cx="58" cy="45" r="10" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="58" cy="45" r="2" fill="currentColor" />
          <motion.line
            x1="58"
            y1="45"
            x2="58"
            y2="39"
            stroke="#FFE296"
            strokeWidth="1.8"
            strokeLinecap="round"
            animate={{ rotate: [-40, 60, -40] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="origin-[58px_45px]"
          />

          {/* Sterile check shield overlay */}
          <motion.g
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d="M72,50 L60,54 L60,63 C60,70 72,75 72,75 C72,75 84,70 84,63 L84,54 Z"
              fill="url(#shieldGrad)"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M66,62 L70,66 L78,58"
              stroke="#FFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.g>
        </svg>
      )
    },
    {
      title: "Lab Tested",
      description: "Independently verified by third-party laboratories. Every batch undergoes gas chromatography and HPLC tests to screen for heavy metals, yeast, mold, and confirm active potency.",
      illustration: () => (
        <svg viewBox="0 0 100 100" className="w-20 h-20 text-[var(--color-navy)]" fill="none">
          <defs>
            <linearGradient id="molGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFE296" />
              <stop offset="100%" stopColor="#8FB3FF" />
            </linearGradient>
          </defs>

          {/* Hexagonal molecular bond (Benzene structure of Withanolide) */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="origin-[50px_45px]"
            style={{ willChange: 'transform' }}
          >
            {/* Hexagon bonds */}
            <polygon points="50,22 70,33 70,57 50,68 30,57 30,33" stroke="url(#molGrad)" strokeWidth="2" strokeLinejoin="round" />
            
            {/* Inner double bonds */}
            <line x1="66" y1="36" x2="66" y2="54" stroke="url(#molGrad)" strokeWidth="1.2" opacity="0.6" />
            <line x1="34" y1="54" x2="48" y2="62" stroke="url(#molGrad)" strokeWidth="1.2" opacity="0.6" />
            <line x1="48" y1="28" x2="34" y2="36" stroke="url(#molGrad)" strokeWidth="1.2" opacity="0.6" />

            {/* Atoms (spheres) */}
            <circle cx="50" cy="22" r="3.5" fill="#FFE296" stroke="currentColor" strokeWidth="1" />
            <circle cx="70" cy="33" r="3.5" fill="#8FB3FF" stroke="currentColor" strokeWidth="1" />
            <circle cx="70" cy="57" r="3.5" fill="#FFF" stroke="currentColor" strokeWidth="1" />
            <circle cx="50" cy="68" r="3.5" fill="#FFE296" stroke="currentColor" strokeWidth="1" />
            <circle cx="30" cy="57" r="3.5" fill="#8FB3FF" stroke="currentColor" strokeWidth="1" />
            <circle cx="30" cy="33" r="3.5" fill="#FFF" stroke="currentColor" strokeWidth="1" />
          </motion.g>

          {/* Magnifying Glass scanning the molecule */}
          <motion.g
            animate={{ x: [-10, 10, -10], y: [-4, 4, -4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <circle cx="45" cy="40" r="13" stroke="currentColor" strokeWidth="2.2" fill="rgba(255,255,255,0.45)" />
            <line x1="54" y1="49" x2="66" y2="61" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M38,35 A9,9 0 0,1 47,32" stroke="#FFF" strokeWidth="1.2" strokeLinecap="round" />
          </motion.g>

          {/* Scientific analysis laser line */}
          <motion.line
            x1="15"
            y1="82"
            x2="85"
            y2="82"
            stroke="#8FB3FF"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </svg>
      )
    }
  ];

  return (
    <section className="bg-gradient-to-r from-[rgba(10, 25, 47,0.22)] via-[rgba(10, 25, 47,0.06)] to-white text-[var(--color-text)] py-20 md:py-28 relative overflow-clip border-b border-[rgba(10, 25, 47,0.15)]">
      
      {/* Outer wrapper */}
      <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-12 flex flex-col gap-16 md:gap-20">
        
        {/* ROW 1: Title & Narrative + Illustration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* LEFT: Text */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
            <span className="eyebrow text-[var(--color-navy)]">OUR TRADITION</span>
            
            <h2 className="heading-condensed text-4xl md:text-5xl text-[var(--color-heading)] tracking-wide">
              history of purity
            </h2>

            <div className="font-sans text-sm md:text-[0.95rem] font-light leading-relaxed flex flex-col gap-4 max-w-xl">
              <p>
                In Sanskrit, Ayurveda represents "The Science of Life". For thousands of years, adaptogenic roots were prepared with reverent precision to restore natural vitality.
              </p>
              <p className="font-semibold text-[var(--color-heading)]">
                At Vedah Vital, we preserve this botanical wisdom while validating it with modern high-performance analytical chemistry.
              </p>
              <p>
                We believe in absolute label integrity. By screening every batch in ISO-certified laboratories and printing batch codes on every bottle, we provide standard testing verification directly to your hands. Every bottle carries a 100% purity and satisfaction money-back guarantee.
              </p>
            </div>
          </div>

          {/* RIGHT: HPLC Flask Illustration */}
          <div className="lg:col-span-5 flex justify-center items-center py-6 w-full">
            <PurityIllustration />
          </div>

        </div>

        {/* ROW 2: The Three Big Cards Purity Guarantee */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-start text-left gap-2">
            <span className="eyebrow text-[var(--color-navy)]">THE VEDAH VITAL GUARANTEE</span>
            <h3 className="heading-condensed text-3xl md:text-4xl text-[var(--color-heading)]">
              purity certified, quality assured
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {guarantees.map((g, idx) => {
              const Illustration = g.illustration;
              return (
                <AnimatedSection
                  key={g.title}
                  delay={idx * 0.15}
                  className="flex flex-col items-stretch p-6 rounded-3xl border border-[rgba(10,25,47,0.12)] bg-white/50 backdrop-blur-md shadow-sm hover:shadow-md hover:scale-[1.02] hover:bg-white/70 transition-all duration-300 group text-left"
                >
                  {/* Top Illustration Wrapper (Fills top of the card) */}
                  <div className="h-36 w-full flex items-center justify-center bg-[var(--color-navy-light)] rounded-2xl shadow-inner mb-5 relative overflow-hidden">
                    {/* Floating background graphic aura */}
                    <div className="absolute w-24 h-24 rounded-full bg-white opacity-25 blur-xl pointer-events-none" />
                    
                    <Illustration />
                  </div>

                  {/* Card Info */}
                  <div className="flex flex-col gap-2">
                    <h4 className="font-sans text-base font-bold uppercase tracking-wider text-[var(--color-heading)]">
                      {g.title}
                    </h4>
                    <p className="font-sans text-xs md:text-sm text-[var(--color-text)] opacity-85 font-light leading-relaxed">
                      {g.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
export default PurityStandards;

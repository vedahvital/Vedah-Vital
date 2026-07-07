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
        <svg viewBox="0 0 120 120" className="w-28 h-28 text-[var(--color-navy)] select-none" fill="none">
          <defs>
            <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4A90E2" />
              <stop offset="100%" stopColor="#1B365D" />
            </linearGradient>
            <linearGradient id="flaskGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E6F0FA" />
              <stop offset="100%" stopColor="#8FB3FF" />
            </linearGradient>
            <linearGradient id="liquidGradGmp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8FB3FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1B365D" stopOpacity="0.9" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Cleanroom Grid Backdrop */}
          <g opacity="0.15">
            <line x1="10" y1="20" x2="110" y2="20" stroke="currentColor" strokeWidth="0.8" />
            <line x1="10" y1="40" x2="110" y2="40" stroke="currentColor" strokeWidth="0.8" />
            <line x1="10" y1="60" x2="110" y2="60" stroke="currentColor" strokeWidth="0.8" />
            <line x1="10" y1="80" x2="110" y2="80" stroke="currentColor" strokeWidth="0.8" />
            <line x1="10" y1="100" x2="110" y2="100" stroke="currentColor" strokeWidth="0.8" />
            <line x1="20" y1="10" x2="20" y2="110" stroke="currentColor" strokeWidth="0.8" />
            <line x1="40" y1="10" x2="40" y2="110" stroke="currentColor" strokeWidth="0.8" />
            <line x1="60" y1="10" x2="60" y2="110" stroke="currentColor" strokeWidth="0.8" />
            <line x1="80" y1="10" x2="80" y2="110" stroke="currentColor" strokeWidth="0.8" />
            <line x1="100" y1="10" x2="100" y2="110" stroke="currentColor" strokeWidth="0.8" />
          </g>

          {/* Distillation Columns & Pipings (cGMP Industrial Setup) */}
          <rect x="15" y="90" width="90" height="4" rx="2" fill="currentColor" opacity="0.3" />
          <line x1="25" y1="90" x2="25" y2="30" stroke="currentColor" strokeWidth="2.5" opacity="0.4" />
          <line x1="95" y1="90" x2="95" y2="30" stroke="currentColor" strokeWidth="2.5" opacity="0.4" />
          <line x1="25" y1="35" x2="95" y2="35" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />

          {/* Industrial Bioreactor / Tank */}
          <rect x="32" y="45" width="22" height="42" rx="6" stroke="currentColor" strokeWidth="2" fill="url(#flaskGrad)" />
          {/* Glass view window on reactor */}
          <rect x="38" y="55" width="10" height="22" rx="2" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
          {/* Bubbling fluid inside window */}
          <motion.rect
            x="39"
            y="65"
            width="8"
            height="11"
            rx="1"
            fill="url(#liquidGradGmp)"
            animate={{ height: [4, 11, 4], y: [72, 65, 72] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Reactor Top Inlet & Vent */}
          <path d="M43,45 L43,38" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="43" cy="38" r="2.5" fill="currentColor" />

          {/* Interconnecting Pipes */}
          <path d="M43,38 L75,38 L75,45" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          
          {/* Flow pulse along pipe */}
          <motion.circle
            cx="43"
            cy="38"
            r="1.8"
            fill="#FFE296"
            animate={{
              cx: [43, 75, 75],
              cy: [38, 38, 45]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />

          {/* Secondary Distillation Column */}
          <rect x="68" y="45" width="14" height="35" rx="3" stroke="currentColor" strokeWidth="1.8" />
          {/* Internal trays */}
          <line x1="68" y1="52" x2="82" y2="52" stroke="currentColor" strokeWidth="1" />
          <line x1="68" y1="60" x2="82" y2="60" stroke="currentColor" strokeWidth="1" />
          <line x1="68" y1="68" x2="82" y2="68" stroke="currentColor" strokeWidth="1" />

          {/* Pressure Gauge dial */}
          <g transform="translate(88, 55)">
            <circle cx="0" cy="0" r="8" stroke="currentColor" strokeWidth="1.2" fill="white" />
            <circle cx="0" cy="0" r="1.5" fill="currentColor" />
            <motion.line
              x1="0"
              y1="0"
              x2="0"
              y2="-5"
              stroke="#FFE296"
              strokeWidth="1.5"
              strokeLinecap="round"
              animate={{ rotate: [-50, 40, -50] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="origin-[0px_0px]"
            />
          </g>

          {/* Sterile Check Shield Overlay */}
          <motion.g
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            filter="url(#glow)"
          >
            <path
              d="M60,65 L48,69 L48,78 C48,85 60,90 60,90 C60,90 72,85 72,78 L72,69 Z"
              fill="url(#shieldGrad)"
              stroke="#FFF"
              strokeWidth="1.5"
            />
            <path
              d="M55,77 L58.5,80.5 L65.5,73"
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
        <svg viewBox="0 0 120 120" className="w-28 h-28 text-[var(--color-navy)] select-none" fill="none">
          <defs>
            <linearGradient id="molGrad2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFE296" />
              <stop offset="50%" stopColor="#8FB3FF" />
              <stop offset="100%" stopColor="#4A90E2" />
            </linearGradient>
            <linearGradient id="laserGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8FB3FF" stopOpacity="0" />
              <stop offset="15%" stopColor="#8FB3FF" stopOpacity="0.8" />
              <stop offset="85%" stopColor="#FFE296" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFE296" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Circular radar / scan reticle background */}
          <circle cx="60" cy="55" r="45" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.25" />
          <circle cx="60" cy="55" r="32" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
          
          {/* Target reticle crosshairs */}
          <line x1="60" y1="5" x2="60" y2="105" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
          <line x1="10" y1="55" x2="110" y2="55" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />

          {/* Benzene molecular structure representing active skeleton */}
          <g transform="translate(10, 5)">
            <motion.g
              animate={{ rotate: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="origin-[50px_50px]"
              style={{ willChange: 'transform' }}
            >
              <polygon points="50,25 71,37 71,61 50,73 29,61 29,37" stroke="url(#molGrad2)" strokeWidth="2.2" strokeLinejoin="round" />
              <polygon points="71,37 92,25 113,37 113,61 92,73 71,61" stroke="url(#molGrad2)" strokeWidth="1.5" strokeLinejoin="round" opacity="0.4" />
              
              <line x1="67" y1="40" x2="67" y2="58" stroke="url(#molGrad2)" strokeWidth="1.5" opacity="0.85" />
              <polygon points="33,40 47,48 47,46" fill="url(#molGrad2)" opacity="0.7" />
              <line x1="47" y1="67" x2="33" y2="59" stroke="url(#molGrad2)" strokeWidth="1.5" opacity="0.85" />

              <line x1="50" y1="25" x2="50" y2="12" stroke="url(#molGrad2)" strokeWidth="2" />
              <line x1="53" y1="25" x2="53" y2="12" stroke="url(#molGrad2)" strokeWidth="2" />
              <circle cx="51.5" cy="10" r="2.5" fill="#FFE296" />

              <line x1="29" y1="37" x2="16" y2="29" stroke="url(#molGrad2)" strokeWidth="1.8" />
              <text x="7" y="27" fill="currentColor" className="text-[7px] font-sans font-bold opacity-60">CH₃</text>

              <circle cx="50" cy="25" r="4" fill="#FFE296" stroke="currentColor" strokeWidth="1" />
              <circle cx="71" cy="37" r="4" fill="#8FB3FF" stroke="currentColor" strokeWidth="1" />
              <circle cx="71" cy="61" r="4" fill="#FFF" stroke="currentColor" strokeWidth="1" />
              <circle cx="50" cy="73" r="4" fill="#FFE296" stroke="currentColor" strokeWidth="1" />
              <circle cx="29" cy="61" r="4" fill="#8FB3FF" stroke="currentColor" strokeWidth="1" />
              <circle cx="29" cy="37" r="4" fill="#FFF" stroke="currentColor" strokeWidth="1" />
            </motion.g>
          </g>

          {/* Scanning Magnifying Glass HUD */}
          <motion.g
            animate={{ x: [-8, 8, -8], y: [-6, 6, -6] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <circle cx="55" cy="50" r="16" stroke="currentColor" strokeWidth="2.5" fill="rgba(240, 246, 255, 0.4)" />
            <circle cx="55" cy="50" r="12" stroke="#8FB3FF" strokeWidth="0.8" strokeDasharray="2 4" fill="none" />
            <line x1="66" y1="61" x2="80" y2="75" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="66" y1="61" x2="80" y2="75" stroke="#FFE296" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M45,43 A11,11 0 0,1 55,40" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" />
          </motion.g>

          {/* Scanning Laser Beam */}
          <motion.g
            animate={{ y: [15, 95, 15] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <line
              x1="5"
              y1="0"
              x2="115"
              y2="0"
              stroke="url(#laserGrad)"
              strokeWidth="2.5"
            />
            <line
              x1="20"
              y1="0"
              x2="100"
              y2="0"
              stroke="#FFF"
              strokeWidth="1"
            />
          </motion.g>
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

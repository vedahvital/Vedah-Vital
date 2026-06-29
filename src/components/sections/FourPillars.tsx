import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '../ui/AnimatedSection';

// 1. Balance: Orbital Gravity System
const BalanceInfographic: React.FC = () => {
  return (
    <svg className="w-full h-full text-white" viewBox="0 0 100 100" fill="none">
      <motion.circle
        cx="50"
        cy="50"
        r="10"
        fill="white"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.circle
        cx="50"
        cy="50"
        r="10"
        stroke="white"
        strokeWidth="1"
        initial={{ scale: 1, opacity: 0.6 }}
        animate={{ scale: 3.5, opacity: 0 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.circle
        cx="50"
        cy="50"
        r="10"
        stroke="white"
        strokeWidth="0.75"
        initial={{ scale: 1, opacity: 0.4 }}
        animate={{ scale: 2.2, opacity: 0 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 1.25 }}
      />
      <g transform="translate(50, 50) rotate(45) translate(-50, -50)">
        <ellipse cx="50" cy="50" rx="34" ry="12" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" fill="none" />
        <motion.circle
          r="3.5"
          fill="white"
          animate={{
            cx: [84, 50, 16, 50, 84],
            cy: [50, 62, 50, 38, 50]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </g>
      <g transform="translate(50, 50) rotate(-45) translate(-50, -50)">
        <ellipse cx="50" cy="50" rx="34" ry="12" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" fill="none" />
        <motion.circle
          r="3.5"
          fill="white"
          animate={{
            cx: [16, 50, 84, 50, 16],
            cy: [50, 62, 50, 38, 50]
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </g>
    </svg>
  );
};

// 2. Potency: Particle Collider
const PotencyInfographic: React.FC = () => {
  return (
    <svg className="w-full h-full text-white" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="38" stroke="rgba(255,255,255,0.12)" strokeWidth="3" fill="none" />
      <motion.circle
        cx="50"
        cy="50"
        r="38"
        stroke="white"
        strokeWidth="3"
        fill="none"
        strokeDasharray={238.8}
        initial={{ strokeDashoffset: 238.8 }}
        animate={{ strokeDashoffset: 238.8 - (238.8 * 0.75) }}
        transition={{ duration: 2, ease: "easeOut" }}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
      <motion.circle
        cx="50"
        cy="50"
        r="14"
        fill="rgba(255, 255, 255, 0.15)"
        stroke="white"
        strokeWidth="1"
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <text x="50" y="53.5" textAnchor="middle" className="font-sans text-[9px] font-bold fill-white tracking-wider">5.0%</text>
      <motion.circle
        r="3"
        fill="white"
        animate={{
          cx: [50, 50],
          cy: [15, 50],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeIn",
          delay: 0
        }}
      />
      <motion.circle
        r="3"
        fill="white"
        animate={{
          cx: [20, 50],
          cy: [68, 50],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeIn",
          delay: 0.5
        }}
      />
      <motion.circle
        r="3"
        fill="white"
        animate={{
          cx: [80, 50],
          cy: [68, 50],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeIn",
          delay: 1.0
        }}
      />
    </svg>
  );
};

// 3. Purity: Molecular Extraction Loop
const PurityInfographic: React.FC = () => {
  return (
    <svg className="w-full h-full text-white" viewBox="0 0 100 100" fill="none">
      <rect x="40" y="15" width="20" height="28" rx="6" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
      <path d="M40,43 L48,58 L52,58 L60,43 Z" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
      <path d="M32,80 L36,86 L64,86 L68,80 Z" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
      <line x1="30" y1="86" x2="70" y2="86" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <motion.circle
        cx="46"
        cy="38"
        r="1.5"
        fill="white"
        animate={{
          y: [0, -16],
          opacity: [0, 0.6, 0]
        }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.2 }}
      />
      <motion.circle
        cx="54"
        cy="35"
        r="1.5"
        fill="white"
        animate={{
          y: [0, -14],
          opacity: [0, 0.6, 0]
        }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
      />
      <motion.circle
        cx="50"
        r="3"
        fill="white"
        animate={{
          cy: [60, 60, 83],
          scale: [0.1, 1.2, 0.8],
          opacity: [0, 1, 1]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          times: [0, 0.5, 1],
          ease: "easeInOut"
        }}
      />
      <motion.ellipse
        cx="50"
        cy="83"
        rx="3"
        ry="1"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="0.75"
        fill="none"
        animate={{
          scale: [0, 0, 4],
          opacity: [0, 0.8, 0]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          times: [0, 0.5, 1],
          ease: "easeOut"
        }}
      />
    </svg>
  );
};

// 4. Vitality: Cellular Mitochondria Pulse
const VitalityInfographic: React.FC = () => {
  return (
    <svg className="w-full h-full text-white" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="38" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
      <motion.path
        d="M38,44 C34,48 34,52 38,56 C42,60 58,60 62,56 C66,52 66,48 62,44 C58,40 42,40 38,44 Z"
        stroke="white"
        strokeWidth="1.5"
        fill="rgba(255,255,255,0.05)"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <path
        d="M40,50 Q43,45 46,50 T52,50 T58,50 T61,50"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1"
        fill="none"
      />
      <motion.circle
        cx="50"
        cy="50"
        r="38"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="0.75"
        initial={{ scale: 1, opacity: 0.5 }}
        animate={{ scale: 1.3, opacity: 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.text
        x="42"
        y="40"
        className="fill-white font-sans text-[8px]"
        animate={{
          y: [0, -18],
          opacity: [0, 1, 0]
        }}
        transition={{ duration: 2.2, repeat: Infinity, delay: 0.3 }}
      >
        ✦
      </motion.text>
      <motion.text
        x="55"
        y="43"
        className="fill-white font-sans text-[8px]"
        animate={{
          y: [0, -20],
          opacity: [0, 1, 0]
        }}
        transition={{ duration: 2.0, repeat: Infinity, delay: 1.1 }}
      >
        ✦
      </motion.text>
    </svg>
  );
};

export const FourPillars: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const pillars = [
    {
      title: "BALANCE",
      detail: "Daily Cortisol Regulator",
      description: "Quietens the nervous system and restores physical & mental equilibrium.",
      infographic: BalanceInfographic,
      tag: "100% natural",
      metrics: [
        { label: "Cortisol Reduction", value: "27.9%", note: "vs placebo at 60 days" },
        { label: "Stress Score (PSS)", value: "−41%", note: "validated scale improvement" },
        { label: "Serum DHEA-S", value: "+18%", note: "adrenal reserve support" },
      ]
    },
    {
      title: "POTENCY",
      detail: "HPLC Standardized 5%",
      description: "Full-spectrum KSM-66 root-only extract for consistent active strength.",
      infographic: PotencyInfographic,
      tag: "clinically proven",
      metrics: [
        { label: "Withanolides", value: "5.0%", note: "verified by HPLC analysis" },
        { label: "Clinical Trials", value: "70+", note: "independent peer-reviewed studies" },
        { label: "VO₂ Max Boost", value: "+11.9%", note: "athletic endurance support" },
      ]
    },
    {
      title: "PURITY",
      detail: "Clean Label Integrity",
      description: "Absolutely zero synthetic binders, leaf fillers, or coloring agents.",
      infographic: PurityInfographic,
      tag: "zero additives",
      metrics: [
        { label: "Heavy Metals", value: "ND", note: "non-detect on Pb, Cd, Hg, As" },
        { label: "Additives", value: "Zero", note: "no binders, fillers, or dyes" },
        { label: "Cert. Standard", value: "cGMP", note: "ISO-accredited facility audit" },
      ]
    },
    {
      title: "VITALITY",
      detail: "Cellular Energy Reserve",
      description: "Enhances oxygen uptake, muscle recovery, and stamina levels.",
      infographic: VitalityInfographic,
      tag: "piperine enhanced",
      metrics: [
        { label: "Muscle Recovery", value: "−17%", note: "post-exercise soreness score" },
        { label: "Testosterone", value: "+17%", note: "serum level increase" },
        { label: "Piperine Boost", value: "+30%", note: "bioavailability enhancement" },
      ]
    },
  ];

  return (
    <section className="bg-white text-[var(--color-text)] relative py-20 md:py-28 overflow-clip border-b border-[rgba(10, 25, 47,0.15)]">
      <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header (replicates reference style) */}
        <AnimatedSection className="text-center max-w-xl mx-auto flex flex-col items-center gap-3 mb-16">
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--color-navy)]">
            FORMULATION DIRECTIVES
          </span>
          <h2 className="heading-condensed text-4xl md:text-5xl text-[var(--color-heading)] tracking-wide">
            the four pillars
          </h2>
          <p className="font-sans text-xs md:text-sm text-[var(--color-text)] opacity-80 font-light max-w-sm mx-auto leading-relaxed">
            Four targeted biological pathways. Sourced with reverent integrity, verified by clinical analytics.
          </p>
        </AnimatedSection>

        {/* Pillars Circle Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 lg:gap-8 justify-items-center">
          {pillars.map((pillar, index) => {
            const InfographicComponent = pillar.infographic;
            return (
              <AnimatedSection
                key={pillar.title}
                delay={index * 0.08}
                className="flex flex-col items-center text-center gap-4 group w-full max-w-[240px]"
              >
                {/* Circular claymorphic frame - reversed: navy background, white content */}
                <div className="w-36 h-36 md:w-40 md:h-40 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-105 relative clay-circle-navy-blue">
                  
                  {/* Subtle ring path decoration inside circle */}
                  <svg className="absolute inset-2 text-white/10 animate-spin-slow pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
                    <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 4" />
                  </svg>

                  {/* Animated Infographic inside circle */}
                  <div className="w-24 h-24 md:w-28 md:h-28 z-10 flex items-center justify-center">
                    <InfographicComponent />
                  </div>

                  {/* Decorative circle outline stamp */}
                  <div className="absolute inset-3 rounded-full border border-dashed border-white/20 opacity-50 pointer-events-none" />
                </div>

                {/* Info Text */}
                <div className="flex flex-col items-center gap-1.5 mt-2">
                  <h3 className="heading-condensed text-xl text-[var(--color-heading)] tracking-wider">
                    {pillar.title}
                  </h3>
                  <span className="text-[9px] font-sans font-bold text-[var(--color-navy)] uppercase tracking-widest leading-none block">
                    {pillar.detail}
                  </span>
                  <p className="font-sans text-[0.8rem] text-[var(--color-text)] font-light leading-relaxed max-w-[190px] mt-1 h-14 overflow-hidden">
                    {pillar.description}
                  </p>
                </div>

                {/* Pill CTA Button */}
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="inline-flex items-center gap-1.5 py-2.5 px-6 mt-1 text-[9px] font-bold tracking-widest uppercase cursor-pointer rounded-full bg-[var(--color-navy)] text-white hover:bg-[var(--color-navy-deep)] transition-colors duration-300 select-none focus:outline-none"
                >
                  {openIndex === index
                    ? <><X className="w-3 h-3 stroke-[2.5]" /> close details</>   
                    : <><Check className="w-3 h-3 stroke-[2.5]" /> active target</>  
                  }
                </button>

                {/* Inline Expand Drawer */}
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      key={"drawer-" + pillar.title}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                      style={{ overflow: "hidden" }}
                      className="w-full"
                    >
                      <div className="mt-1 p-4 rounded-2xl border border-[rgba(10, 25, 47,0.15)] bg-[var(--color-navy-light)] flex flex-col gap-3 text-left">
                        {pillar.metrics.map((m) => (
                          <div key={m.label} className="flex items-start justify-between gap-2">
                            <span className="font-sans text-[9px] font-bold uppercase tracking-wider text-[var(--color-text)] opacity-60 leading-tight mt-0.5">{m.label}</span>
                            <div className="flex flex-col items-end">
                              <span className="font-display text-base font-bold text-[var(--color-navy)] leading-none">{m.value}</span>
                              <span className="font-sans text-[8px] text-[var(--color-text)] opacity-50 leading-tight text-right mt-0.5">{m.note}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Sub-label link */}
                <span className="text-[8px] font-sans font-bold tracking-widest text-[var(--color-text)] opacity-50 uppercase hover:text-[var(--color-navy)] transition-colors cursor-pointer">
                  {pillar.tag}
                </span>

              </AnimatedSection>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FourPillars;

import React from 'react';
import { motion } from 'framer-motion';

interface CorePhilosophyCardProps {
  title: string;
  description: string;
  illustration: React.FC;
  delay: number;
}

const CorePhilosophyCard: React.FC<CorePhilosophyCardProps> = ({
  title,
  description,
  illustration: Illustration,
  delay,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className="flex flex-col h-full rounded-2xl bg-white/60 backdrop-blur-sm border border-[rgba(10,25,47,0.15)] shadow-lg hover:shadow-xl hover:bg-white/80 transition-all duration-300 p-6 md:p-8"
    >
      {/* Illustration Area */}
      <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 flex items-center justify-center rounded-xl bg-[var(--color-navy-light)]/30">
        <Illustration />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center text-center">
        <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-[var(--color-heading)] mb-3">
          {title}
        </h3>
        <p className="font-sans text-xs md:text-sm text-[var(--color-text)] font-light leading-relaxed opacity-85">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// Clean-Label Integrity Illustration
export const CleanLabelIllustration: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
    <defs>
      <linearGradient id="cleanGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8FB3FF" />
        <stop offset="100%" stopColor="#1B365D" />
      </linearGradient>
      <filter id="glowClean" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="glow" />
        <feComposite in="SourceGraphic" in2="glow" mode="screen" />
      </filter>
    </defs>

    {/* Capsule bottle */}
    <motion.path
      d="M45,20 L55,20 L55,75 C55,82 45,82 45,75 Z"
      fill="url(#cleanGrad)"
      opacity="0.9"
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Capsule caps */}
    <motion.rect
      x="42" y="15" width="16" height="8" rx="4"
      fill="#FFE296"
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Capsules inside */}
    <motion.rect
      x="44" y="28" width="12" height="4" rx="2"
      fill="#FFF"
      animate={{ y: [28, 22, 28] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.rect
      x="44" y="36" width="12" height="4" rx="2"
      fill="#FFF"
      animate={{ y: [36, 30, 36] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
    />
    <motion.rect
      x="44" y="44" width="12" height="4" rx="2"
      fill="#FFF"
      animate={{ y: [44, 38, 44] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
    />

    {/* Leaf elements */}
    <motion.path
      d="M35,65 Q30,70 35,75 Q40,70 35,65"
      fill="#8FB3FF"
      opacity="0.6"
      animate={{ rotate: [-5, 5, -5] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.path
      d="M65,65 Q70,70 65,75 Q60,70 65,65"
      fill="#8FB3FF"
      opacity="0.6"
      animate={{ rotate: [5, -5, 5] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Check marks */}
    <motion.g stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      animate={{ opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 2, repeat: Infinity }}>
      <path d="M42,55 L48,60 L62,48" />
    </motion.g>
  </svg>
);

// Clinical Standards Illustration
export const ClinicalStandardsIllustration: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
    <defs>
      <linearGradient id="clinicalGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#8FB3FF" />
        <stop offset="100%" stopColor="#FFE296" />
      </linearGradient>
    </defs>

    {/* HPLC Machine */}
    <motion.rect
      x="25" y="30" width="50" height="30" rx="3"
      fill="#1B365D"
      opacity="0.8"
      animate={{ opacity: [0.8, 0.9, 0.8] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Screen display */}
    <motion.rect
      x="30" y="35" width="40" height="20" rx="2"
      fill="#FFF"
      animate={{ opacity: [0.9, 1, 0.9] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* HPLC graph */}
    <motion.path
      d="M35,45 L40,40 L45,48 L50,35 L55,50 L60,30 L65,55 L70,40"
      stroke="#8FB3FF"
      strokeWidth="2"
      fill="none"
      animate={{ stroke: ["#8FB3FF", "#FFE296", "#8FB3FF"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Molecule structure */}
    <motion.g transform="translate(50,75)" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }}>
      <circle cx="0" cy="0" r="4" fill="#FFE296" stroke="#1B365D" strokeWidth="1" />
      <circle cx="-8" cy="-8" r="3" fill="#8FB3FF" />
      <circle cx="8" cy="-8" r="3" fill="#8FB3FF" />
      <circle cx="0" cy="8" r="3" fill="#FFF" stroke="#1B365D" strokeWidth="0.5" />
      <line x1="0" y1="0" x2="-8" y2="-8" stroke="#1B365D" strokeWidth="1" />
      <line x1="0" y1="0" x2="8" y2="-8" stroke="#1B365D" strokeWidth="1" />
      <line x1="0" y1="0" x2="0" y2="8" stroke="#1B365D" strokeWidth="1" />
    </motion.g>

    {/* Percentage badge */}
    <motion.g transform="translate(75,20)" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2.5, repeat: Infinity }}>
      <circle cx="0" cy="0" r="12" fill="#FFE296" stroke="#1B365D" strokeWidth="1" />
      <text x="0" y="4" textAnchor="middle" fontSize="8" fill="#1B365D" fontWeight="bold">5%</text>
    </motion.g>
  </svg>
);

// Radical Transparency Illustration
export const RadicalTransparencyIllustration: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
    <defs>
      <linearGradient id="transparencyGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8FB3FF" />
        <stop offset="100%" stopColor="#1B365D" />
      </linearGradient>
    </defs>

    {/* Bottle with QR code */}
    <motion.path
      d="M40,20 L60,20 L65,80 L35,80 Z"
      fill="url(#transparencyGrad)"
      opacity="0.7"
      animate={{ opacity: [0.7, 0.85, 0.7] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* QR Code */}
    <motion.g transform="translate(42,35)" animate={{ opacity: [0.8, 1, 0.8] }} transition={{ duration: 2, repeat: Infinity }}>
      <rect x="0" y="0" width="6" height="6" fill="#FFF" />
      <rect x="6" y="0" width="6" height="6" fill="#FFF" />
      <rect x="12" y="0" width="2" height="6" fill="#FFF" />
      <rect x="0" y="6" width="6" height="2" fill="#FFF" />
      <rect x="12" y="6" width="6" height="2" fill="#FFF" />
      <rect x="0" y="12" width="14" height="2" fill="#FFF" />
      <rect x="18" y="12" width="2" height="6" fill="#FFF" />
      <rect x="6" y="12" width="2" height="14" fill="#FFF" />
      <rect x="18" y="12" width="6" height="6" fill="#FFF" />
    </motion.g>

    {/* Document with scan lines */}
    <motion.rect
      x="30" y="60" width="40" height="25" rx="2"
      fill="#FFF"
      stroke="#1B365D"
      strokeWidth="0.5"
      animate={{ opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Scan lines */}
    <motion.g stroke="#8FB3FF" strokeWidth="0.5"
      animate={{ opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
      <line x1="32" y1="65" x2="68" y2="65" />
      <line x1="32" y1="70" x2="68" y2="70" />
      <line x1="32" y1="75" x2="68" y2="75" />
    </motion.g>

    {/* Eye icon */}
    <motion.g transform="translate(50,15)" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
      <ellipse cx="0" cy="0" rx="8" ry="5" fill="none" stroke="#FFF" strokeWidth="1.5" />
      <circle cx="0" cy="0" r="2" fill="#FFF" />
      <motion.circle cx="0" cy="0" r="4" fill="none" stroke="#FFE296" strokeWidth="1"
        animate={{ opacity: [0, 0.8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.g>
  </svg>
);

const corePhilosophyCards = [
  {
    title: 'Clean-Label Integrity',
    description: 'Zero synthetic binders, zero coloring agents, zero leaf waste. Only organic root extracts, Piperine, and vegetable cellulose.',
    illustration: CleanLabelIllustration,
  },
  {
    title: 'Clinical Standards',
    description: 'Standardized to 5% Withanolides via HPLC to guarantee active strength in every single capsule.',
    illustration: ClinicalStandardsIllustration,
  },
  {
    title: 'Radical Transparency',
    description: 'Batch-level lab reports for every bottle. Input your batch code to view full heavy metal and purity audits.',
    illustration: RadicalTransparencyIllustration,
  },
];

export const CorePhilosophySection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-clip border-b border-[rgba(10, 25, 47,0.15)]">
      <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center gap-3 mb-16 text-center"
        >
          <span className="eyebrow text-[var(--color-navy)]">OUR CORE PHILOSOPHY</span>
          <h2 className="heading-condensed text-4xl md:text-5xl text-[var(--color-heading)] tracking-wide">
            purity redefined
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {corePhilosophyCards.map((card, idx) => (
            <CorePhilosophyCard
              key={card.title}
              title={card.title}
              description={card.description}
              illustration={card.illustration}
              delay={idx * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
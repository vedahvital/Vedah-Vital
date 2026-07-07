import React from 'react';
import { motion } from 'framer-motion';

interface CorePhilosophyCardProps {
  title: string;
  points: string[];
  illustration: string;
  delay: number;
}

const CorePhilosophyCard: React.FC<CorePhilosophyCardProps> = ({
  title,
  points,
  illustration,
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
      <motion.div 
        className="w-36 h-36 md:w-40 md:h-40 mx-auto mb-6 flex items-center justify-center overflow-hidden rounded-full border-2.5 border-[var(--color-navy)] shadow-md bg-white"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: delay * 1.5 }}
      >
        <img 
          src={illustration} 
          alt={title} 
          className="w-full h-full object-cover select-none"
          draggable="false"
        />
      </motion.div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center">
        <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-[var(--color-heading)] mb-4 text-center">
          {title}
        </h3>
        <ul className="text-left font-sans text-xs md:text-sm text-[var(--color-text)] font-light leading-relaxed opacity-85 space-y-2.5 max-w-[260px]">
          {points.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="text-[var(--color-navy)] font-bold mt-0.5">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const corePhilosophyCards = [
  {
    title: 'Clean-Label Integrity',
    points: [
      'Zero synthetics, coloring, leaf waste',
      'Organic root extracts, Piperine, vegetable cellulose'
    ],
    illustration: '/images/clean_label_icon.jpg',
  },
  {
    title: 'Clinical Standards',
    points: [
      'Standardized 5% Withanolides (HPLC)',
      'Guaranteed active strength in every capsule'
    ],
    illustration: '/images/clinical_standards_icon.jpg',
  },
  {
    title: 'Radical Transparency',
    points: [
      'Batch-level lab reports',
      'Full heavy metal & purity audits'
    ],
    illustration: '/images/radical_transparency_icon.jpg',
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
              points={card.points}
              illustration={card.illustration}
              delay={idx * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default CorePhilosophySection;
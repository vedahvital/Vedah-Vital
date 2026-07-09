import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { AnimatedSection } from '../ui/AnimatedSection';

interface FAQItemProps {
  index: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ index, question, answer, isOpen, onToggle }) => {
  const padIndex = String(index + 1).padStart(2, '0');
  
  return (
    <div className="border-b border-[rgba(10, 25, 47,0.15)] py-6">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between text-left gap-4 cursor-pointer focus:outline-none group"
      >
        <div className="flex gap-4 items-start">
          <span className="font-display text-lg md:text-xl text-[var(--color-navy)] font-medium mt-0.5">
            {padIndex}
          </span>
          <h3 className="font-sans text-base md:text-lg font-semibold text-[var(--color-heading)] group-hover:text-[var(--color-navy)] transition-colors duration-300">
            {question}
          </h3>
        </div>
        <span className="w-6 h-6 rounded-full bg-[rgba(10, 25, 47,0.03)] border border-[rgba(10, 25, 47,0.25)] flex items-center justify-center text-[var(--color-navy)] shrink-0 mt-1 transition-transform duration-300">
          {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: "hidden" }}
          >
            <div className="pl-10 pr-6 pt-3 pb-2 font-sans text-sm md:text-base text-[var(--color-text)] font-light leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What makes Vedah Vital \"Root-Only\" Ashwagandha superior to other extracts?",
      answer: "Vedah Vital exclusively uses a high-potency KSM-66® Root-Only Extract. While many brands include leaf waste to artificially inflate bulk powder weight, the most concentrated active adaptogens—withanolides—are scientifically and traditionally sourced from the root. This ensures a purer, more potent supplement that aligns with authentic Ayurvedic standards."
    },
    {
      question: "Why is Black Pepper extract included in a \"Modern Apothecary\" formula?",
      answer: "Purity is ineffective without absorption. We integrate a standardized dose of Black Pepper extract (95% Piperine) to act as a bio-enhancer. Piperine temporarily reduces enzyme activity in the digestive tract that would otherwise break down ashwagandha before it enters the bloodstream, boosting absorption rates by up to 30%."
    },
    {
      question: "Is this product third-party tested for purity and safety?",
      answer: "Yes, absolute transparency is a founding principle. Every batch of Vedah Vital Ashwagandha is tested by an independent, ISO-accredited laboratory. We screen for heavy metals (lead, cadmium, mercury, arsenic), yeast, mold, and verify that active withanolide levels exactly match our label's 5% claim. You can verify your specific bottle's report via our Verification page."
    },
    {
      question: "How long should I take Vedah Vital Ashwagandha before seeing results?",
      answer: "Ashwagandha is an adaptogen that works cumulatively. While some individuals experience a sense of calm and better sleep quality within the first week, clinical trials indicate the most significant balance in daily cortisol levels, resilience, and recovery peaks after 30 to 60 days of consistent, daily usage."
    },
    {
      question: "Are the capsules compatible with a vegan or vegetarian lifestyle?",
      answer: "Absolutely. Our capsules are made with 100% plant-based vegetable cellulose (derived from pine bark). Our formula contains zero bovine gelatin, synthetic binders, dairy, soy, or gluten, adhering strictly to conscious wellness standards."
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white text-[var(--color-text)] py-14 md:py-18 relative overflow-clip border-b border-[rgba(10, 25, 47,0.15)]">
      

      <div className="max-w-3xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <AnimatedSection className="text-center flex flex-col items-center gap-4 mb-12">
          <span className="eyebrow text-[var(--color-navy)]">KNOWLEDGE BASE</span>
          <h2 className="heading-condensed text-4xl md:text-5xl text-[var(--color-heading)] tracking-wide">
            frequently asked
          </h2>
          <h3 className="heading-condensed text-2xl md:text-3.5xl text-[var(--color-navy)] tracking-wide -mt-2">
            questions
          </h3>
          <div className="w-12 h-[1px] bg-[rgba(10, 25, 47,0.3)] my-1" />
          <p className="font-sans text-xs md:text-sm text-[var(--color-navy)] font-bold uppercase tracking-wider">
            5 answers to help you decide
          </p>
        </AnimatedSection>

        {/* FAQs list */}
        <AnimatedSection className="glass-card-navy border border-[rgba(10, 25, 47,0.18)] p-6 md:p-10 shadow-sm relative">
          {faqs.map((faq, idx) => (
            <FAQItem
              key={faq.question}
              index={idx}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx}
              onToggle={() => handleToggle(idx)}
            />
          ))}
        </AnimatedSection>

      </div>
    </section>
  );
};
export default FAQ;

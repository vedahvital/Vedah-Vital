import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { IngredientInfographic } from '../ui/IngredientInfographic';

export const IngredientScience: React.FC = () => {
  return (
    <section className="bg-[var(--color-navy)] text-white py-20 md:py-28 relative overflow-hidden border-b border-[rgba(10, 25, 47,0.15)] z-10 select-none">
      
      {/* Background watermark - subtle white */}
      <div className="absolute left-[-5%] top-[10%] text-white opacity-10 pointer-events-none select-none">
        <span className="text-watermark">vedah vital</span>
      </div>

      <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* LEFT COLUMN: Title & Sourcing info wrapped in liquid glass card */}
        <div className="lg:col-span-6 flex items-center justify-start py-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="py-8 px-8 md:px-10 rounded-3xl clay-card-white max-w-xl w-full flex flex-col items-start gap-6"
          >
            <span className="eyebrow text-[var(--color-navy-deep)]">BOTANICAL SCIENCE</span>
            
            <h2 className="heading-condensed text-4xl md:text-5xl text-[var(--color-heading)] tracking-wide">
              select your synergy
            </h2>

            <div className="flex flex-col gap-4 font-sans text-sm md:text-[0.95rem] font-light leading-relaxed text-[var(--color-text)]">
              <p>
                We source exclusively from certified organic KSM-66® Ashwagandha roots, avoiding foliage or leaf waste fillers that inflate bulk weights.
              </p>
              <p>
                To ensure peak therapeutic potency, our root extract is standardized to exactly 5% active Withanolides, and synergized with 5mg of Black Pepper extract (95% Piperine) for up to 30% enhanced absorption.
              </p>
            </div>

            {/* Quick list specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full pt-2">
              {[
                { icon: Leaf, label: "HPLC Standardized root" },
                { icon: Shield, label: "95% Piperine synergized" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 text-xs font-semibold text-[var(--color-heading)] uppercase">
                  <div className="w-6 h-6 border border-[rgba(10, 25, 47,0.25)] flex items-center justify-center text-[var(--color-navy)] bg-[var(--color-navy-light)]">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  {label}
                </div>
              ))}
            </div>

            <Link to="/about" className="pt-2 w-full sm:w-auto">
              <Button variant="primary" className="w-full sm:w-auto rounded-full py-3.5 px-9 gap-2">
                explore sourcing journey
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Premium Animated Infographics */}
        <div className="lg:col-span-6 flex justify-center items-center py-6 w-full">
          <IngredientInfographic />
        </div>

      </div>
    </section>
  );
};

export default IngredientScience;

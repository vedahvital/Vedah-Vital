import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import MagnifierIcon from '../ui/icons/magnifier-icon';
import { VerifyInfographic } from '../ui/VerifyInfographic';

export const HowItWorks: React.FC = () => {
  return (
    <section className="bg-[var(--color-navy)] text-white py-14 md:py-18 relative overflow-hidden border-b border-[rgba(10, 25, 47,0.15)] z-10">
      
      {/* Background watermark - subtle white */}
      <div className="absolute right-[-5%] top-[10%] text-white opacity-10 pointer-events-none select-none">
        <span className="text-watermark">vedah vital</span>
      </div>

      <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* LEFT COLUMN: Animated Verification Infographics */}
        <div className="lg:col-span-6 flex justify-center items-center py-6 w-full">
          <VerifyInfographic />
        </div>

        {/* RIGHT COLUMN: Title & Action wrapped in liquid glass card */}
        <div className="lg:col-span-6 flex items-center justify-end py-6">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="py-8 px-8 md:px-10 rounded-3xl clay-card-white max-w-xl w-full flex flex-col items-start gap-6"
          >
            <span className="eyebrow text-[var(--color-navy-deep)]">CERTIFIED TRANSPARENCY</span>
            
            <h2 className="heading-condensed text-4xl md:text-5xl text-[var(--color-heading)] tracking-wide">
              verify batch reports
            </h2>

            <div className="flex flex-col gap-4 font-sans text-sm md:text-[0.95rem] font-light leading-relaxed text-[var(--color-text)]">
              <p>
                We believe you have the right to know exactly what goes into your body. That's why every single bottle of Vedah Vital is tracked under a unique batch verification code.
              </p>
              <p>
                Locate the 15-character code printed near the barcode on your bottle container, and enter it in our portal to view the active HPLC potency certificate and heavy metals audit.
              </p>
            </div>

            <Link to="/verify" className="pt-2 w-full sm:w-auto">
              <Button variant="primary" className="w-full sm:w-auto py-3.5 px-9 gap-2 flex items-center justify-center rounded-full">
                <MagnifierIcon size={16} color="currentColor" strokeWidth={2.5} />
                open verification sheet
              </Button>
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
export default HowItWorks;

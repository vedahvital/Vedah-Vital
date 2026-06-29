import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ShieldAlert, Award } from 'lucide-react';
import { AnimatedSection } from '../ui/AnimatedSection';

// Custom Botanical Images with overlays
const PureRootImage = () => (
  <div className="h-24 sm:h-36 md:h-40 lg:h-48 w-full rounded-xl sm:rounded-2xl overflow-hidden mb-4 relative border border-white/10 group-hover:scale-[1.01] transition-transform duration-500 shadow-sm">
    <img 
      src="/images/ashwagandha_plant_root.webp" 
      alt="Organic Ashwagandha Tuberous Root" 
      className="w-full h-full object-cover"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-transparent to-transparent pointer-events-none" />
    <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-[#FFE296] text-[var(--color-navy-deep)] font-sans font-bold text-[7px] sm:text-[9px] tracking-[0.12em] uppercase px-2 py-0.5 sm:py-1 rounded shadow-sm">
      100% Root Only
    </div>
  </div>
);

const WholeBodyImage = () => (
  <div className="h-24 sm:h-36 md:h-40 lg:h-48 w-full rounded-xl sm:rounded-2xl overflow-hidden mb-4 relative border border-gray-200/50 group-hover:scale-[1.01] transition-transform duration-500 shadow-sm">
    <img 
      src="/images/ashwagandha_leaves.webp" 
      alt="Ashwagandha Leaves and Berries" 
      className="w-full h-full object-cover"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
    <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-red-500 text-white font-sans font-bold text-[7px] sm:text-[9px] tracking-[0.12em] uppercase px-2 py-0.5 sm:py-1 rounded shadow-sm">
      Leaf & Stem Filler
    </div>
  </div>
);

export const Comparison: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-white via-[#FAFBFD] to-white text-[var(--color-text)] py-20 md:py-28 relative overflow-clip border-b border-[rgba(10,25,47,0.1)] z-10">
      
      {/* Background Architectural Grid Overlay */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-[0.015] pointer-events-none">
        {Array.from({ length: 36 }).map((_, i) => (
          <div key={i} className="border-r border-b border-[var(--color-navy)]" />
        ))}
      </div>

      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-[-10%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-[#8FB3FF]/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-bl from-[#FFE296]/8 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-[var(--max-width)] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center flex flex-col items-center gap-4 mb-14 md:mb-20">
          <span className="eyebrow text-[var(--color-navy)] font-bold tracking-[0.25em]">
            INGESTION SAFETY ANALYSIS
          </span>
          <h2 className="heading-condensed text-3xl sm:text-4xl md:text-5xl text-[var(--color-heading)] tracking-wide">
            the purity comparison
          </h2>
          <h3 className="heading-condensed text-xl sm:text-2xl md:text-3.5xl text-[var(--color-navy)] tracking-wide -mt-2">
            root extract vs. whole plant
          </h3>
          <p className="font-sans text-xs md:text-sm text-[var(--color-text)] opacity-70 font-light max-w-md leading-relaxed mt-1">
            Ayurvedic tradition dictates root usage. Compare the clinical safety profiles of KSM-66® root extract versus generic whole plant formulations.
          </p>
        </div>

        {/* TOP SECTION: 2-Column Side-by-Side Comparison Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-8 items-stretch mb-8 sm:mb-12">
          
          {/* COLUMN 1: Vedah Vital (KSM-66) - Rich Navy/Gold spotlight Card */}
          <div className="flex col-span-1">
            <AnimatedSection 
              delay={0.1}
              className="w-full rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 lg:p-8 flex flex-col justify-between transition-all duration-400 group hover:-translate-y-1 hover:shadow-2xl border relative overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, #1B365D 0%, #0A192F 100%)',
                borderColor: 'rgba(255, 226, 150, 0.25)',
                boxShadow: '0 15px 35px -15px rgba(10, 25, 47, 0.3)'
              }}
            >
              {/* Golden foil top edge line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] sm:h-[2.5px] bg-gradient-to-r from-[#D9A05B] via-[#FFE296] to-[#D9A05B]" />

              <div className="flex flex-col gap-4 sm:gap-6">
                
                {/* Header Badge */}
                <div className="flex items-center gap-2 sm:gap-4 border-b border-white/10 pb-3 sm:pb-5">
                  <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-white/10 text-[#FFE296] flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <span className="font-sans text-[7px] sm:text-[8px] font-bold text-[#FFE296] tracking-[0.12em] sm:tracking-[0.2em] block uppercase">Standardized Root</span>
                    <h3 className="heading-condensed text-sm sm:text-xl lg:text-2xl text-white mt-0.5 leading-none">Vedah Vital KSM-66</h3>
                  </div>
                </div>

                {/* Root Image */}
                <PureRootImage />

                {/* Features List */}
                <div className="flex flex-col gap-4 sm:gap-5 text-left">
                  {[
                    {
                      title: "Lowest Cytotoxicity (Safe)",
                      desc: "Withaferin A minimized (often ≤ 0.1%). Proven safe for human consumption via multiple safety studies."
                    },
                    {
                      title: "Standardized & Bioactive",
                      desc: "Contains a full spectrum of withanolides, balanced for Calmness, Clarity, and cognitive support."
                    },
                    {
                      title: "GRAS Affirmed & Certified",
                      desc: "Rigorously third-party certified, meeting highest purity standards. Non-GMO Project Verified."
                    },
                    {
                      title: "Traditional Wisdom",
                      desc: "Matches traditional Ayurvedic root use, validated by over 20+ human clinical trials."
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-2 sm:gap-3">
                      <div className="w-4 h-4 sm:w-5.5 sm:h-5.5 rounded-full bg-[#FFE296]/15 text-[#FFE296] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 stroke-[3]" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-sans text-[10px] sm:text-xs font-bold text-white leading-tight">{item.title}</span>
                        <p className="font-sans text-[11px] text-[#A3C2F0] opacity-90 font-light leading-relaxed hidden sm:block">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* COLUMN 2: Alternative: Whole Body Powder - Muted Grey Card */}
          <div className="flex col-span-1">
            <AnimatedSection 
              delay={0.2}
              className="w-full rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 lg:p-8 flex flex-col justify-between transition-all duration-400 group hover:-translate-y-1 hover:shadow-xl border relative"
              style={{
                background: 'linear-gradient(135deg, rgba(10, 25, 47, 0.01) 0%, rgba(10, 25, 47, 0.03) 100%)',
                borderColor: 'rgba(10, 25, 47, 0.08)',
                boxShadow: '0 10px 30px -15px rgba(10, 25, 47, 0.03)'
              }}
            >
              <div className="flex flex-col gap-4 sm:gap-6">
                
                {/* Header Badge */}
                <div className="flex items-center gap-2 sm:gap-4 border-b border-gray-200 pb-3 sm:pb-5">
                  <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gray-200/50 text-gray-400 flex items-center justify-center shadow-inner shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <span className="font-sans text-[7px] sm:text-[8px] font-bold text-gray-400 tracking-[0.12em] sm:tracking-[0.2em] block uppercase">Alternative</span>
                    <h3 className="heading-condensed text-sm sm:text-xl lg:text-2xl text-[var(--color-heading)] mt-0.5 opacity-65 leading-none">Whole Body Powder</h3>
                  </div>
                </div>

                {/* Leaf/Berry Image */}
                <WholeBodyImage />

                {/* Features List */}
                <div className="flex flex-col gap-4 sm:gap-5 text-left">
                  {[
                    {
                      title: "Elevated Cytotoxicity (Risk)",
                      desc: "Leaf/stem inclusion spikes Withaferin A, presenting a toxicity risk at higher doses or for long-term use."
                    },
                    {
                      title: "Variable Effects (Leaf)",
                      desc: "Inconsistent withanolide profile; presence of leaf compounds can alter traditional root efficacy."
                    },
                    {
                      title: "Non-Traditional Use",
                      desc: "Historically, roots for internal wellness, leaves only for topical/poultice application."
                    },
                    {
                      title: "Market 'Filler' Option",
                      desc: "Often seen as a lower-cost 'whole plant' option, sacrificing purity and safety for a higher volume."
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-2 sm:gap-3">
                      <div className="w-4 h-4 sm:w-5.5 sm:h-5.5 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center shrink-0 mt-0.5">
                        <X className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-sans text-[10px] sm:text-xs font-bold text-gray-600 leading-tight">{item.title}</span>
                        <p className="font-sans text-[11px] text-gray-400 font-light leading-relaxed hidden sm:block">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

        </div>

        {/* BOTTOM SECTION: Full-Width Chart & Product Label Mockup */}
        <AnimatedSection 
          delay={0.3}
          className="rounded-3xl border bg-white/70 backdrop-blur-md p-5 sm:p-8"
          style={{
            borderColor: 'rgba(10, 25, 47, 0.08)',
            boxShadow: '0 15px 35px -15px rgba(10, 25, 47, 0.04)'
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full">
            
            {/* Chart Area (Left side on md+) */}
            <div className="md:col-span-7 flex flex-col gap-4">
              <span className="font-sans text-[9px] font-bold text-[var(--color-navy)] tracking-[0.25em] uppercase opacity-75">
                The Withaferin A Difference
              </span>
              
              {/* Visual Glass Chart */}
              <div className="w-full bg-white border border-[rgba(10,25,47,0.08)] rounded-2xl p-5 flex flex-col gap-4 relative shadow-sm">
                
                {/* Grid Lines */}
                <div className="absolute inset-x-5 top-[58px] border-t border-dashed border-gray-100" />
                <div className="absolute inset-x-5 top-[92px] border-t border-dashed border-gray-100" />
                <div className="absolute inset-x-5 top-[126px] border-t border-dashed border-gray-100" />

                {/* Chart Title / Y-Axis Label */}
                <div className="text-[8px] font-sans font-bold tracking-widest text-gray-400 uppercase text-left">
                  Withaferin A Concentration (%)
                </div>
                
                {/* Chart Core Grid */}
                <div className="h-36 flex items-end justify-around gap-2 pt-2 border-b border-gray-200 relative">
                  
                  {/* Grid Y-Axis Markers */}
                  <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[8px] font-sans text-gray-400 select-none">
                    <span>3.0%</span>
                    <span>2.0%</span>
                    <span>1.0%</span>
                    <span>0.0%</span>
                  </div>

                  {/* Bar 1: KSM-66 (<= 0.1%) */}
                  <div className="flex flex-col items-center gap-1.5 z-10 w-[35%]">
                    <span className="text-[9px] font-sans font-bold text-emerald-600">≤ 0.1%</span>
                    <div className="w-full h-28 flex items-end justify-center">
                      <motion.div 
                        initial={{ height: 0 }}
                        whileInView={{ height: '3.3%' }} // 0.1% out of 3% max
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-md shadow-[0_2px_8px_rgba(16,185,129,0.3)]"
                      />
                    </div>
                    <span className="text-[9px] font-sans font-bold text-[var(--color-heading)] tracking-wide uppercase mt-1">KSM-66</span>
                  </div>

                  {/* Bar 2: Whole Body Powder (2.5%) */}
                  <div className="flex flex-col items-center gap-1.5 z-10 w-[35%]">
                    <span className="text-[9px] font-sans font-bold text-gray-500">2.5%</span>
                    <div className="w-full h-28 flex items-end justify-center">
                      <motion.div 
                        initial={{ height: 0 }}
                        whileInView={{ height: '83.3%' }} // 2.5% out of 3% max
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="w-full bg-gradient-to-t from-gray-500 to-gray-300 rounded-t-md shadow-sm"
                      />
                    </div>
                    <span className="text-[9px] font-sans font-bold text-gray-400 tracking-wide uppercase mt-1">Whole Body</span>
                  </div>

                </div>

                {/* Footnote */}
                <p className="text-[8.5px] font-sans text-gray-400 text-left leading-normal italic">
                  *Note: Whole body powder is often high in toxic Withaferin A due to leaf/stem content; KSM-66 is root-only and controlled.
                </p>
              </div>
            </div>

            {/* Product Label Mockup (Right side on md+) */}
            <div className="md:col-span-5 flex flex-col items-center gap-4 justify-center">
              
              {/* Trusted Choice Gold Foil Badge */}
              <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#1B365D] to-[#0A192F] border border-[#FFE296]/30 px-4 py-1.5 rounded-full shadow-md">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-[#FFE296] text-xs leading-none"
                >
                  ✦
                  </motion.span>
                <span className="font-sans text-[8px] font-bold text-white uppercase tracking-[0.2em] leading-none">
                  Trusted Choice
                </span>
              </div>

              {/* Apothecary Product Details Box */}
              <div className="w-full bg-gradient-to-br from-[#FAFBFD] to-[#F3F4F6] border border-[#D9A05B]/30 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFE296] to-transparent" />
                <span className="font-sans text-xs sm:text-sm font-extrabold uppercase tracking-[0.3em] text-[var(--color-navy)]">
                  Vedah Vital
                </span>
                <span className="font-sans text-[9px] font-bold tracking-[0.12em] text-gray-400 uppercase mt-1">
                  Ashwagandha Root Extract, KSM-66
                </span>
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-navy)]/35 to-transparent my-2.5" />
                <span className="font-sans text-[8px] font-bold tracking-[0.15em] text-[var(--color-navy)] uppercase opacity-75 text-center leading-normal">
                  Informed Choice for the Conscious Consumer
                </span>
              </div>

            </div>

          </div>
        </AnimatedSection>

      </div>
    </section>
  );
};

export default Comparison;

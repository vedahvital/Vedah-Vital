import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const IngredientInfographic: React.FC = () => {
  const [strengthCount, setStrengthCount] = useState(0.0);
  const [absorptionCount, setAbsorptionCount] = useState(0);

  // Smooth counter animations
  useEffect(() => {
    let strengthStart = 0.0;
    const strengthEnd = 5.0;
    const strengthDuration = 1800;
    const strengthStepTime = Math.abs(Math.floor(strengthDuration / (strengthEnd * 10)));
    
    const strengthTimer = setInterval(() => {
      strengthStart += 0.1;
      if (strengthStart >= strengthEnd) {
        setStrengthCount(strengthEnd);
        clearInterval(strengthTimer);
      } else {
        setStrengthCount(parseFloat(strengthStart.toFixed(1)));
      }
    }, strengthStepTime);

    let absStart = 0;
    const absEnd = 30;
    const absDuration = 1800;
    const absStepTime = Math.abs(Math.floor(absDuration / absEnd));

    const absTimer = setInterval(() => {
      absStart += 1;
      if (absStart >= absEnd) {
        setAbsorptionCount(absEnd);
        clearInterval(absTimer);
      } else {
        setAbsorptionCount(absStart);
      }
    }, absStepTime);

    return () => {
      clearInterval(strengthTimer);
      clearInterval(absTimer);
    };
  }, []);

  return (
    <div className="w-full max-w-[500px] aspect-[4/3.8] flex flex-col gap-4 p-5 md:p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl relative">
      
      {/* Decorative background grid lines */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-[0.03] pointer-events-none">
        {Array.from({ length: 36 }).map((_, i) => (
          <div key={i} className="border-r border-b border-white" />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow relative z-10">
        
        {/* CARD 1: Sourcing Purity (Root vs Leaf) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col p-4 rounded-2xl bg-white/5 border border-white/10 items-center text-center justify-between min-h-[180px] relative"
        >
          <span className="text-[9px] font-sans font-bold tracking-[0.18em] text-white/60 uppercase">1. THE SOURCE</span>
          
          <div className="w-full h-24 flex items-center justify-center relative">
            {/* Elegant, organic, recognizable plant SVG */}
            <svg className="w-32 h-full text-white" viewBox="0 0 100 80" fill="none">
              {/* Leaves (Upper Plant) - Faded white outline with low opacity fill */}
              <g className="opacity-45">
                {/* Center stem link */}
                <path d="M50,15 L50,45" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" />
                
                {/* Top Leaf */}
                <path d="M50,15 C42,7 50,0 50,0 C50,0 58,7 50,15 Z" fill="currentColor" opacity="0.15" />
                <path d="M50,15 C42,7 50,0 50,0 C50,0 58,7 50,15 Z" stroke="currentColor" strokeWidth="1.6" />
                
                {/* Left Leaf 1 */}
                <path d="M50,23 C34,16 26,23 26,23 C26,23 34,31 50,27 Z" fill="currentColor" opacity="0.15" />
                <path d="M50,23 C34,16 26,23 26,23 C26,23 34,31 50,27 Z" stroke="currentColor" strokeWidth="1.6" />
                
                {/* Right Leaf 1 */}
                <path d="M50,25 C66,18 74,25 74,25 C74,25 66,33 50,29 Z" fill="currentColor" opacity="0.15" />
                <path d="M50,25 C66,18 74,25 74,25 C74,25 66,33 50,29 Z" stroke="currentColor" strokeWidth="1.6" />

                {/* Left Leaf 2 */}
                <path d="M50,32 C36,26 28,32 28,32 C28,32 36,40 50,36 Z" fill="currentColor" opacity="0.15" />
                <path d="M50,32 C36,26 28,32 28,32 C28,32 36,40 50,36 Z" stroke="currentColor" strokeWidth="1.6" />

                {/* Right Leaf 2 */}
                <path d="M50,34 C64,28 72,34 72,34 C72,34 64,42 50,38 Z" fill="currentColor" opacity="0.15" />
                <path d="M50,34 C64,28 72,34 72,34 C72,34 64,42 50,38 Z" stroke="currentColor" strokeWidth="1.6" />
              </g>

              {/* Roots (Underground) - Solid glowing white */}
              <g className="text-white">
                <path d="M50,45 C50,55 45,63 40,74" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M50,45 C52,57 58,65 64,72" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M49,52 C42,57 34,61 26,60" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M51,55 C58,61 68,62 76,59" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M46,62 C38,66 32,66 26,64" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M54,64 C62,68 68,68 74,66" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </g>

              {/* Nutrient pulses rising from root */}
              <motion.circle
                cx={26}
                cy={60}
                r="1.5"
                fill="#FFF"
                animate={{
                  cx: [26, 49, 50],
                  cy: [60, 52, 45],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.circle
                cx={76}
                cy={59}
                r="1.5"
                fill="#FFF"
                animate={{
                  cx: [76, 51, 50],
                  cy: [59, 55, 45],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
              />
              <motion.circle
                cx={40}
                cy={74}
                r="2"
                fill="#FFF"
                animate={{
                  cx: [40, 50],
                  cy: [74, 45],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.2 }}
              />
            </svg>
          </div>

          {/* Absolute labels placed cleanly at outer card edges */}
          <div className="absolute top-10 right-4 bg-white/10 text-white/80 border border-white/20 rounded-full px-2 py-0.5 text-[7px] font-sans font-bold uppercase tracking-wider">
            LEAVES DISCARDED
          </div>
          <div className="absolute bottom-14 left-4 bg-white/95 text-[var(--color-navy-deep)] rounded-full px-2 py-0.5 text-[7px] font-sans font-bold shadow-md uppercase tracking-wider">
            ROOT ONLY
          </div>
          
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-sans font-bold tracking-wide text-white uppercase">Pure Root Extraction</span>
            <span className="text-[9px] font-sans text-white/70">No leaf waste or fillers</span>
          </div>
        </motion.div>

        {/* CARD 2: Strength Dial (5.0% Standardized Potency) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col p-4 rounded-2xl bg-white/5 border border-white/10 items-center text-center justify-between min-h-[180px] relative"
        >
          <span className="text-[9px] font-sans font-bold tracking-[0.18em] text-white/60 uppercase">2. THE STRENGTH</span>
          
          <div className="w-full h-24 flex items-center justify-center relative">
            {/* Larger Standardized Strength Progress Ring */}
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="38"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="4.5"
                fill="transparent"
              />
              <motion.circle
                cx="48"
                cy="48"
                r="38"
                stroke="white"
                strokeWidth="4.5"
                fill="transparent"
                strokeDasharray={238.8}
                initial={{ strokeDashoffset: 238.8 }}
                animate={{ strokeDashoffset: 238.8 - (238.8 * 0.75) }}
                transition={{ duration: 1.8, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>
            
            {/* Center Dial Value - Centered exactly using absolute positioning */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-base font-condensed tracking-wide text-white font-bold leading-none">
                {strengthCount.toFixed(1)}%
              </span>
              <span className="text-[7px] font-sans tracking-widest text-white/60 uppercase leading-none mt-0.5">
                ACTIVE
              </span>
            </div>
          </div>

          {/* Absolute label placed cleanly at top right */}
          <div className="absolute top-10 right-4 bg-white/10 border border-white/20 rounded-full px-2 py-0.5 text-[7px] font-sans font-semibold text-white uppercase tracking-wider">
            LAB CERTIFIED
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-sans font-bold tracking-wide text-white uppercase">Consistent Potency</span>
            <span className="text-[9px] font-sans text-white/70">Exact active strength daily</span>
          </div>
        </motion.div>

      </div>

      {/* CARD 3: Enhanced Absorption Synergy (Black Pepper) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col p-4 rounded-2xl bg-white/5 border border-white/10 justify-between items-stretch min-h-[140px]"
      >
        <div className="flex justify-between items-center w-full">
          <span className="text-[9px] font-sans font-bold tracking-[0.18em] text-white/60 uppercase">3. THE ABSORPTION</span>
          <span className="text-[10px] font-sans font-bold text-white uppercase bg-white/10 px-2 py-0.5 rounded-full">
            +{absorptionCount}% FASTER
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-2">
          
          {/* Visual pill icon showing absorption */}
          <div className="md:col-span-5 h-14 flex items-center justify-center relative bg-white/5 rounded-xl border border-white/5 overflow-hidden">
            <div className="flex items-center gap-1.5 relative">
              {/* Standard capsule outline */}
              <div className="w-10 h-5 border border-white/30 rounded-full relative flex items-center justify-center overflow-hidden">
                {/* Filling progress */}
                <motion.div
                  initial={{ width: "30%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  className="h-full bg-white/20 absolute left-0"
                />
                <span className="text-[6px] font-sans font-bold text-white/80 z-10 tracking-[0.05em] uppercase">ABSORB</span>
              </div>
              
              {/* Absorption spark pulses */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-white text-xs font-sans font-bold"
              >
                ✦
              </motion.div>
            </div>
          </div>

          {/* Simple side-by-side comparison bars */}
          <div className="md:col-span-7 flex flex-col gap-2 justify-center">
            
            {/* Bar 1: Regular Ashwagandha */}
            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between text-[8px] font-sans text-white/70 uppercase tracking-wide">
                <span>Standard Ashwagandha</span>
                <span>Normal</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/15">
                <div className="h-full bg-white/40 rounded-full w-[70%]" />
              </div>
            </div>

            {/* Bar 2: Synergized Ashwagandha */}
            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between text-[8px] font-sans text-white uppercase tracking-wide font-bold">
                <span>Synergized with Black Pepper</span>
                <span>30% Faster</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden relative">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
                  className="h-full bg-white rounded-full"
                />
              </div>
            </div>

          </div>

        </div>

        <div className="flex justify-between items-center w-full">
          <span className="text-[11px] font-sans font-bold tracking-wide text-white uppercase">Optimal Bioavailability</span>
          <span className="text-[9px] font-sans text-white/70">With 5mg Black Pepper absorption catalyst</span>
        </div>
      </motion.div>

    </div>
  );
};

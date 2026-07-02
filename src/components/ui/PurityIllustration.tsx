import React from 'react';
import { motion } from 'framer-motion';

export const PurityIllustration: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-[400px] aspect-[4/4.5] rounded-3xl bg-white/40 border border-[rgba(10, 25, 47, 0.16)] backdrop-blur-md shadow-xl p-6 flex flex-col justify-between items-center relative overflow-hidden text-[var(--color-navy)]"
    >
      {/* ISO Certified Badge */}
      <div className="absolute top-2 right-4 flex items-center gap-1.5 bg-white/90 border border-[rgba(255, 226, 150, 0.8)] rounded-full px-3 py-1 shadow-sm z-20">
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="text-xs text-[#E6B800] leading-none"
        >
          ✦
        </motion.span>
        <span className="font-sans text-[8px] font-bold text-[var(--color-navy-deep)] uppercase tracking-widest leading-none">
          ISO Certified Audit
        </span>
      </div>

      {/* Title inside card */}
      <div className="w-full text-left z-10 flex flex-col gap-0.5 mt-2">
        <span className="font-sans text-[9px] font-bold tracking-[0.2em] text-[var(--color-navy)] uppercase">
          LABORATORY QUALITY CONTROL
        </span>
        <span className="font-sans text-[11px] text-[var(--color-text)] font-light">
          Batch chromatography & heavy metals scan
        </span>
      </div>

      {/* Main Illustration: Beaker + Dropper + Pulses */}
      <div className="w-full flex-grow flex items-center justify-center relative my-4">
        
        {/* Background circular glowing aura */}
        <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-[rgba(143,179,255,0.15)] to-[rgba(255,226,150,0.1)] blur-2xl pointer-events-none" />

        <svg viewBox="0 0 120 120" className="w-44 h-44 text-[var(--color-navy)]" fill="none">
          <defs>
            <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8FB3FF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1B365D" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="dropGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFE296" />
              <stop offset="100%" stopColor="#F5B041" />
            </linearGradient>
          </defs>

          {/* Liquid level inside flask */}
          <motion.path
            d="M33,85 C33,85 50,83 60,85 C70,87 87,85 87,85 A8,8 0 0,1 79,98 L41,98 A8,8 0 0,1 33,85 Z"
            fill="url(#liquidGrad)"
            animate={{
              d: [
                "M33,85 C33,85 50,83 60,85 C70,87 87,85 87,85 A8,8 0 0,1 79,98 L41,98 A8,8 0 0,1 33,85 Z",
                "M33,85 C33,85 50,87 60,85 C70,83 87,85 87,85 A8,8 0 0,1 79,98 L41,98 A8,8 0 0,1 33,85 Z",
                "M33,85 C33,85 50,83 60,85 C70,87 87,85 87,85 A8,8 0 0,1 79,98 L41,98 A8,8 0 0,1 33,85 Z"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Erlenmeyer Flask body outline */}
          <path
            d="M52,35 L52,15 L68,15 L68,35 L93,82 A10,10 0 0,1 84.5,98 L35.5,98 A10,10 0 0,1 27,82 Z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-70"
          />

          {/* Dropper Pipette */}
          <path
            d="M60,2 L60,20 L58,22 L58,26 L62,26 L62,22 L60,20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-80"
          />

          {/* Falling glowing drop */}
          <motion.circle
            cx="60"
            cy="27"
            r="2.5"
            fill="url(#dropGrad)"
            animate={{
              cy: [27, 85],
              opacity: [0, 1, 1, 0],
              scale: [1, 1, 0.8, 0.4]
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeIn",
              times: [0, 0.1, 0.8, 1]
            }}
          />

          {/* Ripple rings in the flask liquid when drop hits */}
          <motion.ellipse
            cx="60"
            cy="85"
            rx="5"
            ry="1.5"
            stroke="#FFE296"
            strokeWidth="1.2"
            fill="none"
            animate={{
              rx: [0, 15],
              ry: [0, 4],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeOut",
              delay: 1.6
            }}
          />

          {/* Rising purified molecular particles */}
          <motion.circle
            cx="48"
            cy="80"
            r="1.5"
            fill="#FFE296"
            animate={{
              y: [0, -40],
              x: [0, -5, 2, 0],
              opacity: [0, 0.9, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.5
            }}
          />
          <motion.circle
            cx="72"
            cy="78"
            r="1.5"
            fill="#8FB3FF"
            animate={{
              y: [0, -35],
              x: [0, 4, -3, 0],
              opacity: [0, 0.9, 0]
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeOut",
              delay: 1.2
            }}
          />
          <motion.circle
            cx="60"
            cy="75"
            r="2"
            fill="#FFF"
            animate={{
              y: [0, -42],
              x: [0, 2, -2, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeOut",
              delay: 1.8
            }}
          />
        </svg>
      </div>

      {/* HPLC Chromatography Wave Display */}
      <div className="w-full flex flex-col gap-1.5 z-10">
        <div className="flex justify-between items-center text-[7.5px] font-sans font-bold text-[var(--color-navy)] uppercase tracking-wider">
          <span>hplc spectrometry spectrum</span>
          <span className="text-[#2ECC71]">potency match: 100%</span>
        </div>
        <div className="w-full h-10 bg-white/50 border border-[rgba(10,25,47,0.1)] rounded-xl px-2 py-1 flex items-center justify-center relative overflow-hidden">
          <svg viewBox="0 0 100 24" className="w-full h-full" fill="none">
            <defs>
              <linearGradient id="hplcGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1B365D" />
                <stop offset="40%" stopColor="#8FB3FF" />
                <stop offset="60%" stopColor="#FFE296" />
                <stop offset="100%" stopColor="#1B365D" />
              </linearGradient>
            </defs>

            {/* Background Grid Lines in Graph */}
            <line x1="0" y1="6" x2="100" y2="6" stroke="rgba(10,25,47,0.04)" strokeWidth="0.5" />
            <line x1="0" y1="12" x2="100" y2="12" stroke="rgba(10,25,47,0.04)" strokeWidth="0.5" />
            <line x1="0" y1="18" x2="100" y2="18" stroke="rgba(10,25,47,0.04)" strokeWidth="0.5" />

            {/* Spectroscopy Waves */}
            <motion.path
              d="M 0,18 Q 15,18 20,18 T 32,8 T 40,20 T 48,15 T 56,4 T 66,20 T 75,18 T 100,18"
              stroke="url(#hplcGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="200"
              animate={{
                strokeDashoffset: [200, 0]
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </svg>
        </div>
      </div>

      {/* Metrics Footer */}
      <div className="w-full grid grid-cols-3 gap-2 border-t border-[rgba(10,25,47,0.1)] pt-3.5 mt-2 z-10">
        {[
          { label: "heavy metals", value: "<0.005 ppm", color: "text-[var(--color-navy-deep)]" },
          { label: "pesticides", value: "0.00% (nd)", color: "text-[var(--color-navy-deep)]" },
          { label: "withanolides", value: "5.0% hplc", color: "text-[#E6B800] font-bold" }
        ].map(({ label, value, color }) => (
          <div key={label} className="flex flex-col items-center justify-center text-center">
            <span className="text-[7px] font-sans font-bold uppercase tracking-wider text-white/70 bg-[var(--color-navy)] rounded-sm px-1 py-0.5 leading-none">
              {label}
            </span>
            <span className={`text-[9px] font-sans ${color} mt-1 font-semibold tracking-wide uppercase`}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

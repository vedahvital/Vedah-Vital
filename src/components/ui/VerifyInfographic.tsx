import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const VerifyInfographic: React.FC = () => {
  const [typedCode, setTypedCode] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('idle'); // idle -> typing -> verifying -> passed
  const [timelineStep, setTimelineStep] = useState(0);

  // Typing animation loop
  useEffect(() => {
    const fullCode = 'VV-ASH-2026-001';
    let index = 0;
    let timer: ReturnType<typeof setTimeout>;

    const startTyping = () => {
      setVerificationStatus('typing');
      setTypedCode('');
      index = 0;

      const typeNextChar = () => {
        if (index < fullCode.length) {
          const char = fullCode[index];
          setTypedCode((prev) => prev + char);
          index++;
          timer = setTimeout(typeNextChar, 120);
        } else {
          // Finished typing, start verification
          setVerificationStatus('verifying');
          timer = setTimeout(() => {
            setVerificationStatus('passed');
            // Animate timeline steps
            animateTimeline();
          }, 1200);
        }
      };

      timer = setTimeout(typeNextChar, 500);
    };

    const animateTimeline = () => {
      let step = 0;
      const nextStep = () => {
        if (step <= 3) {
          setTimelineStep(step);
          step++;
          timer = setTimeout(nextStep, 600);
        } else {
          // Wait and restart the whole loop
          timer = setTimeout(() => {
            setTimelineStep(0);
            startTyping();
          }, 3000);
        }
      };
      nextStep();
    };

    startTyping();

    return () => {
      clearTimeout(timer);
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
        
        {/* MODULE 1: Batch Search Input Box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col p-4 rounded-2xl bg-white/5 border border-white/10 items-center text-center justify-between min-h-[180px] relative"
        >
          <span className="text-[9px] font-sans font-bold tracking-[0.18em] text-white/60 uppercase">1. BATCH SEARCH</span>
          
          <div className="w-full flex flex-col gap-3.5 items-center justify-center py-2 flex-grow">
            {/* Input Bar Outline */}
            <motion.div
              animate={{
                borderColor: verificationStatus === 'verifying' ? 'rgba(255, 255, 255, 0.8)' : 
                             verificationStatus === 'passed' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.3)',
                boxShadow: verificationStatus === 'verifying' ? '0 0 12px rgba(255, 255, 255, 0.25)' :
                           verificationStatus === 'passed' ? '0 0 8px rgba(255, 255, 255, 0.15)' : 'none'
              }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-[190px] p-2 rounded-full border bg-white/5 flex items-center justify-start gap-2 relative"
            >
              <span className="text-[10px] text-white/40 shrink-0">🔍</span>
              <span className="text-[10px] font-mono font-bold tracking-wide text-white leading-none whitespace-nowrap shrink-0">
                {typedCode}
                {verificationStatus === 'typing' && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-1.5 h-3 bg-white ml-0.5"
                  />
                )}
              </span>
            </motion.div>

            {/* Status indicator badge */}
            <div className="min-h-[22px] flex items-center justify-center">
              {verificationStatus === 'typing' && (
                <span className="text-[8px] font-sans font-semibold text-white/60 uppercase tracking-widest animate-pulse">
                  Entering batch code...
                </span>
              )}
              {verificationStatus === 'verifying' && (
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 border border-white border-t-transparent rounded-full animate-spin shrink-0" />
                  <span className="text-[8px] font-sans font-semibold text-white uppercase tracking-widest animate-pulse">
                    Validating COA...
                  </span>
                </div>
              )}
              {verificationStatus === 'passed' && (
                <motion.span
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="bg-white/95 text-[var(--color-navy-deep)] px-2.5 py-0.5 rounded-full text-[8px] font-sans font-bold uppercase tracking-wider shadow-md"
                >
                  ✓ VERIFICATION PASSED
                </motion.span>
              )}
            </div>
          </div>
          
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-sans font-bold tracking-wide text-white uppercase">Batch Authenticity</span>
            <span className="text-[9px] font-sans text-white/70">Verified chromatography records</span>
          </div>
        </motion.div>

        {/* MODULE 2: Laboratory Certificate Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col p-4 rounded-2xl bg-white/5 border border-white/10 items-stretch text-left justify-between min-h-[180px] relative"
        >
          <span className="text-[9px] font-sans font-bold tracking-[0.18em] text-white/60 uppercase text-center">2. QUALITY AUDIT</span>
          
          <div className="flex flex-col gap-3 py-3 flex-grow justify-center font-sans text-[10px]">
            {[
              { label: 'HPLC POTENCY TEST', targetStatus: 'passed', value: '5.0% WITHANOLIDES' },
              { label: 'HEAVY METALS AUDIT', targetStatus: 'passed', value: '0% TOXINS DETECTED' },
              { label: 'MICROBIAL SCREEN', targetStatus: 'passed', value: '100% PURE & SAFE' }
            ].map(({ label, value }, i) => {
              const isChecked = verificationStatus === 'passed';
              return (
                <div key={label} className="flex items-start gap-2.5">
                  {/* Custom animated checkbox */}
                  <div className="w-4 h-4 border border-white/30 rounded-md flex items-center justify-center shrink-0 bg-white/5 mt-0.5 relative">
                    {isChecked && (
                      <motion.svg
                        className="w-3.5 h-3.5 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <motion.polyline
                          points="20 6 9 17 4 12"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.4, delay: i * 0.2 }}
                        />
                      </motion.svg>
                    )}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-white uppercase tracking-wider leading-none">{label}</span>
                    <span className="text-[8px] text-white/70 leading-none">{isChecked ? value : 'PENDING CHECK'}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-0.5 text-center">
            <span className="text-[11px] font-sans font-bold tracking-wide text-white uppercase">Certificate of Analysis</span>
            <span className="text-[9px] font-sans text-white/70">ISO-Accredited testing audits</span>
          </div>
        </motion.div>

      </div>

      {/* MODULE 3: Traceability Timeline Flow */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col p-4 rounded-2xl bg-white/5 border border-white/10 justify-between items-stretch min-h-[140px] relative"
      >
        <span className="text-[9px] font-sans font-bold tracking-[0.18em] text-white/60 uppercase">3. TRACEABILITY TIMELINE</span>

        {/* Timeline graphics */}
        <div className="w-full py-4 px-2 relative flex flex-col justify-center">
          {/* Main timeline axis line */}
          <div className="absolute left-6 right-6 h-[1.5px] bg-white/20 top-[28px] z-0" />
          
          {/* Flowing timeline progress bar */}
          <div className="absolute left-6 right-6 h-[1.5px] top-[28px] z-5 overflow-hidden">
            <motion.div
              className="h-full bg-white"
              initial={{ width: "0%" }}
              animate={{ 
                width: timelineStep === 0 ? "0%" :
                       timelineStep === 1 ? "33%" :
                       timelineStep === 2 ? "66%" : "100%"
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>

          {/* Timeline steps nodes */}
          <div className="grid grid-cols-4 w-full relative z-10">
            {[
              { step: 0, label: 'Harvest', desc: 'Organic roots' },
              { step: 1, label: 'Extract', desc: 'Standardization' },
              { step: 2, label: 'Analysis', desc: 'Purity audit' },
              { step: 3, label: 'Verified', desc: 'Unique COA' }
            ].map(({ step, label, desc }) => {
              const isActive = timelineStep >= step;
              return (
                <div key={label} className="flex flex-col items-center text-center gap-2">
                  {/* Step node circle */}
                  <div className="relative w-5 h-5 flex items-center justify-center">
                    <motion.div
                      animate={{
                        scale: isActive ? [1, 1.15, 1] : 1,
                        backgroundColor: isActive ? 'rgb(255,255,255)' : 'rgba(255,255,255,0.05)',
                        borderColor: isActive ? 'rgb(255,255,255)' : 'rgba(255,255,255,0.3)'
                      }}
                      className="w-3.5 h-3.5 rounded-full border bg-white/5 transition-all duration-300 z-10"
                    />
                    {isActive && (
                      <motion.div
                        animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        className="absolute w-4 h-4 rounded-full bg-white/30 z-0"
                      />
                    )}
                  </div>
                  {/* Step Label */}
                  <div className="flex flex-col gap-0.5">
                    <span className={`text-[9px] font-sans font-bold uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/40'}`}>
                      {label}
                    </span>
                    <span className="text-[7px] font-sans text-white/50 leading-none">
                      {desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between items-center w-full mt-1">
          <span className="text-[11px] font-sans font-bold tracking-wide text-white uppercase">Direct Farm-to-Bottle Traceability</span>
          <span className="text-[9px] font-sans text-white/70">Uncompromised quality validation</span>
        </div>
      </motion.div>

    </div>
  );
};

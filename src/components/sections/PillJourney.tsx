import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const stages = [
  { id: 1, time: '0 – 5 min',      title: 'Dissolution',  subtitle: 'Capsule breaks down in stomach',       detail: 'The vegetable cellulose capsule dissolves in stomach acid, releasing a precise 600mg dose of KSM-66® root extract (delivering 30mg of active withanolides) alongside 5mg of piperine from Black Pepper extract.', color: '#A9C2E3', region: 'stomach' },
  { id: 2, time: '5 – 30 min',     title: 'Absorption',   subtitle: 'Piperine unlocks bioavailability',     detail: 'Piperine temporarily inhibits digestive enzymes that would otherwise metabolize withanolides prematurely, boosting absorption into the intestinal wall by up to 30%.', color: '#8FB3FF', region: 'gut' },
  { id: 3, time: '30 – 90 min',    title: 'Circulation',  subtitle: 'Active compounds enter bloodstream',   detail: 'Withanolides are transported through the portal vein into systemic circulation, carried by plasma proteins to target tissues including the adrenal glands and brain.', color: '#A3C2F0', region: 'blood' },
  { id: 4, time: '90 min → ongoing', title: 'Regulation', subtitle: 'HPA axis modulation begins',          detail: 'Withanolides modulate the HPA axis, signaling the adrenal cortex to reduce cortisol secretion. Simultaneously, GABA-ergic pathways in the brain are activated, promoting calm alertness.', color: '#FFE296', region: 'brain' },
];

// ─────────────────────────────────────────────────────────────────
// ANATOMICAL BODY SVG — modelled after reference medical illustration
// ─────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────
// DYNAMIC REALISTIC HUMAN INFOGRAPHIC
// ─────────────────────────────────────────────────────────────────
const DynamicHumanInfographic: React.FC<{ activeStage: number }> = ({ activeStage }) => {
  const stageClass = `stage-${activeStage + 1}`;

  return (
    <div className={`relative w-full aspect-[136/359] ${stageClass} overflow-hidden`}>
      {/* Component-level CSS overrides for smooth zoom effects with WebKit GPU layers */}
      <style>{`
        .human-body-svg-container {
          width: 100%;
          height: 100%;
          position: relative;
          transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: 50% 25%;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .human-body-svg-container img,
        .human-body-svg-container svg {
          will-change: transform;
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /* -------------------------------------------------------------
           DYNAMIC DGN WINDOW SCANNER SCALING & PANNING (STAGE ZOOM)
           Fixed origin 50% 25% prevents layout recalculation reflows.
        ------------------------------------------------------------- */
        
        /* Stage 1: Dissolution (Zoom to Stomach region) */
        .stage-1 .human-body-svg-container {
          transform: scale(2.2) translate(0.11%, -4.28%);
        }

        /* Stage 2: Absorption (Zoom to Intestines region) */
        .stage-2 .human-body-svg-container {
          transform: scale(2.4) translate(0%, -16.68%);
        }

        /* Stage 3: Circulation (Zoom to Chest/Vessels region) */
        .stage-3 .human-body-svg-container {
          transform: scale(1.6) translate(0%, 0.09%);
        }

        /* Stage 4: Regulation (Zoom to HPA Axis Brain/Endocrine region) */
        .stage-4 .human-body-svg-container {
          transform: scale(1.4) translate(0%, 19.61%);
        }

        @keyframes pulse-circ {
          0% { opacity: 0.4; }
          100% { opacity: 0.95; }
        }
      `}</style>

      <div className="human-body-svg-container">
        {/* Static Background Silhouette Image - composited entirely on GPU */}
        <img 
          src="/images/human_silhouette.svg" 
          className="absolute inset-0 w-full h-full select-none pointer-events-none transition-all duration-800"
          style={{
            opacity: activeStage === 1 ? 0.95 : 0.8,
            filter: activeStage === 3 ? 'drop-shadow(0 0 3px #8FB3FF44) brightness(1.2)' : 'brightness(1.0)'
          }}
          alt="Anatomical body outline"
        />

        {/* Interactive Animations Overlay SVG (Matches coordinate space 1:1) */}
        <svg viewBox="0 0 136 359" className="absolute inset-0 w-full h-full pointer-events-none z-20">
          {/* Static gastric cavity glow indicator rendered inline for high performance */}
          <motion.ellipse
            cx="68"
            cy="98"
            rx="13"
            ry="10"
            className="transition-all duration-800"
            style={{
              fill: activeStage === 0 ? '#8FB3FF' : '#F4AAA3',
              opacity: activeStage === 0 ? 0.95 : 0.04,
              filter: activeStage === 0 ? 'drop-shadow(0 0 6px #8FB3FFcc)' : 'none'
            }}
          />
            {/* Stage 1: Dissolution (Esophagus travel, splitting capsule, releasing active ingredient cloud) */}
            {activeStage === 0 && (
              <>
                {/* Capsule group traveling down the esophagus */}
                <motion.g
                  animate={{
                    y: [15, 80, 80, 80],
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{
                    duration: 4.0,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    times: [0, 0.35, 0.55, 1.0]
                  }}
                >
                  {/* Capsule Cap (Navy Blue) */}
                  <motion.rect
                    x="65"
                    y="0"
                    width="6"
                    height="5"
                    rx="3"
                    fill="#1B365D"
                    stroke="rgba(255, 255, 255, 0.4)"
                    strokeWidth="0.4"
                    animate={{
                      y: [0, 0, -5, -5],
                      x: [0, 0, -4, -4],
                      rotate: [0, 0, -60, -60],
                      opacity: [1, 1, 0, 0]
                    }}
                    transition={{
                      duration: 4.0,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      times: [0, 0.35, 0.55, 1.0]
                    }}
                  />
                  {/* Capsule Body (Gold) */}
                  <motion.rect
                    x="65"
                    y="5"
                    width="6"
                    height="5"
                    rx="3"
                    fill="#ffe296"
                    stroke="rgba(255, 255, 255, 0.4)"
                    strokeWidth="0.4"
                    animate={{
                      y: [0, 0, 5, 5],
                      x: [0, 0, 4, 4],
                      rotate: [0, 0, 45, 45],
                      opacity: [1, 1, 0, 0]
                    }}
                    transition={{
                      duration: 4.0,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      times: [0, 0.35, 0.55, 1.0]
                    }}
                  />
                  {/* Esophagus trail lines */}
                  <line x1="68" y1="0" x2="68" y2="10" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="1,2" />
                </motion.g>

                {/* Stomach cavity warm glowing background pulse */}
                <motion.circle
                  cx="68"
                  cy="98"
                  r="14"
                  fill="rgba(143, 179, 255, 0.12)"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Dissolving active ingredient particle burst */}
                {[
                  { dx: -8, dy: -6, delay: 1.3 },
                  { dx: 8, dy: -6, delay: 1.4 },
                  { dx: -12, dy: 5, delay: 1.5 },
                  { dx: 12, dy: 5, delay: 1.6 },
                  { dx: -4, dy: 12, delay: 1.4 },
                  { dx: 4, dy: 12, delay: 1.5 },
                  { dx: -9, dy: -1, delay: 1.3 },
                  { dx: 9, dy: -1, delay: 1.5 },
                  { dx: -2, dy: 7, delay: 1.6 },
                  { dx: 2, dy: 7, delay: 1.4 },
                  { dx: -7, dy: 10, delay: 1.5 },
                  { dx: 7, dy: 10, delay: 1.7 }
                ].map((p, i) => (
                  <motion.circle
                    key={i}
                    cx="68"
                    cy="95"
                    r="1.2"
                    fill="#ffe296"
                    animate={{
                      x: [0, p.dx],
                      y: [0, p.dy],
                      scale: [0, 1.4, 0],
                      opacity: [0, 0.95, 0]
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      delay: p.delay,
                      ease: 'easeOut'
                    }}
                  />
                ))}
              </>
            )}

            {/* Stage 2: Absorption (Intestinal flow & blood vessel diffusion) */}
            {activeStage === 1 && (
              <>
                {/* Intestinal Loop path flow */}
                <path
                  d="M68,110 C62,118 74,124 68,132 C60,138 76,144 68,152 C60,158 76,164 68,170 C62,176 74,180 68,186"
                  fill="none"
                  stroke="rgba(143, 179, 255, 0.08)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                
                {/* Flowing nutrients along the gut loop */}
                <motion.path
                  d="M68,110 C62,118 74,124 68,132 C60,138 76,144 68,152 C60,158 76,164 68,170 C62,176 74,180 68,186"
                  fill="none"
                  stroke="#8FB3FF"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeDasharray="3, 15"
                  animate={{ strokeDashoffset: [0, 18] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                />

                {/* Diffusion particles (nutrients leaving gut loops and entering bloodstream) */}
                {[
                  { cy: 120, xStart: 66, xEnd: 52, delay: 0.0 },
                  { cy: 125, xStart: 70, xEnd: 84, delay: 0.4 },
                  { cy: 135, xStart: 65, xEnd: 50, delay: 0.8 },
                  { cy: 140, xStart: 71, xEnd: 86, delay: 0.2 },
                  { cy: 150, xStart: 66, xEnd: 48, delay: 0.6 },
                  { cy: 155, xStart: 70, xEnd: 88, delay: 1.0 },
                  { cy: 165, xStart: 65, xEnd: 50, delay: 1.4 },
                  { cy: 170, xStart: 71, xEnd: 86, delay: 0.5 },
                  { cy: 130, xStart: 68, xEnd: 53, delay: 1.2 },
                  { cy: 145, xStart: 68, xEnd: 83, delay: 1.6 },
                  { cy: 160, xStart: 68, xEnd: 52, delay: 0.9 },
                  { cy: 175, xStart: 68, xEnd: 84, delay: 1.3 }
                ].map((p, i) => (
                  <motion.circle
                    key={i}
                    cx={p.xStart}
                    cy={p.cy}
                    r="1.3"
                    fill="#8FB3FF"
                    animate={{
                      cx: [p.xStart, p.xEnd],
                      cy: [p.cy, p.cy + 10],
                      scale: [0.6, 1.3, 0.4],
                      opacity: [0, 0.9, 0]
                    }}
                    transition={{
                      duration: 2.0,
                      repeat: Infinity,
                      delay: p.delay,
                      ease: 'easeInOut'
                    }}
                  />
                ))}
              </>
            )}

            {/* Stage 3: Circulation (Double heartbeat pulse, vascular flow loops) */}
            {activeStage === 2 && (
              <>
                {/* Heart Center Double-Beat (lub-dub) Pulse */}
                <motion.circle
                  cx="68"
                  cy="88"
                  r="5"
                  fill="#8FB3FF"
                  animate={{
                    scale: [1, 1.35, 1.15, 1.45, 1]
                  }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    times: [0, 0.15, 0.3, 0.45, 1]
                  }}
                />
                <motion.circle
                  cx="68"
                  cy="88"
                  r="10"
                  fill="none"
                  stroke="rgba(143, 179, 255, 0.3)"
                  strokeWidth="0.6"
                  animate={{
                    scale: [1, 1.45, 1.2, 1.6, 1],
                    opacity: [0.3, 0.75, 0.5, 0.85, 0.3]
                  }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    times: [0, 0.15, 0.3, 0.45, 1]
                  }}
                />
                
                {/* Vascular loop pathways branching from the heart */}
                {[
                  { id: "brain-left",  d: "M68,88 C68,75 64,55 64,25" },
                  { id: "brain-right", d: "M68,88 C68,75 72,55 72,25" },
                  { id: "arm-left",    d: "M68,88 C58,88 44,105 28,145" },
                  { id: "arm-right",   d: "M68,88 C78,88 92,105 108,145" },
                  { id: "leg-left",    d: "M68,88 L68,145 C64,195 56,255 52,335" },
                  { id: "leg-right",   d: "M68,88 L68,145 C72,195 80,255 84,335" }
                ].map((p, i) => (
                  <g key={p.id}>
                    {/* Subtle structural trace path */}
                    <path
                      d={p.d}
                      fill="none"
                      stroke="rgba(143, 179, 255, 0.1)"
                      strokeWidth="0.6"
                      strokeLinecap="round"
                    />
                    {/* Active compound flow (dashed SVG flow animation) */}
                    <motion.path
                      d={p.d}
                      fill="none"
                      stroke="#8FB3FF"
                      strokeWidth="0.9"
                      strokeLinecap="round"
                      strokeDasharray="3, 18"
                      animate={{ strokeDashoffset: [0, 21] }}
                      transition={{
                        duration: 2.0,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: i * 0.25
                      }}
                    />
                  </g>
                ))}
              </>
            )}

            {/* Stage 4: Regulation (HPA Axis neural signaling & calming ripples) */}
            {activeStage === 3 && (
              <>
                {/* Brain Calming Slow Glow */}
                <motion.circle
                  cx="68"
                  cy="20"
                  r="9"
                  fill="rgba(143, 179, 255, 0.15)"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 3.0, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.circle
                  cx="68"
                  cy="20"
                  r="4"
                  fill="rgba(143, 179, 255, 0.3)"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 3.0, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                />
                
                {/* Adrenal cores (static tiny glowing nodes) */}
                <circle cx="60" cy="135" r="1.5" fill="#ffe296" />
                <circle cx="76" cy="135" r="1.5" fill="#ffe296" />

                {/* HPA Axis Paths: Down the spine, branching to adrenals */}
                <path
                  d="M68,20 L68,115 C68,120 63,125 60,135"
                  stroke="rgba(143, 179, 255, 0.2)"
                  strokeWidth="0.5"
                  strokeDasharray="1,2"
                  fill="none"
                />
                <path
                  d="M68,20 L68,115 C68,120 73,125 76,135"
                  stroke="rgba(143, 179, 255, 0.2)"
                  strokeWidth="0.5"
                  strokeDasharray="1,2"
                  fill="none"
                />
                
                {/* High-frequency neural signals down the HPA paths */}
                <motion.path
                  d="M68,20 L68,115 C68,120 63,125 60,135"
                  fill="none"
                  stroke="#ffe296"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeDasharray="4, 40"
                  animate={{ strokeDashoffset: [0, 44] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                />
                <motion.path
                  d="M68,20 L68,115 C68,120 73,125 76,135"
                  fill="none"
                  stroke="#ffe296"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeDasharray="4, 40"
                  animate={{ strokeDashoffset: [0, 44] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.75 }}
                />
                
                {/* Adrenal Calming Ripples (concentric wave ripples radiating outward) */}
                {/* Left Adrenal Calming waves */}
                <motion.circle
                  cx="60"
                  cy="135"
                  r="3"
                  fill="none"
                  stroke="#ffe296"
                  strokeWidth="0.5"
                  animate={{ scale: [1, 3.5], opacity: [0.8, 0] }}
                  transition={{ duration: 2.0, repeat: Infinity, ease: 'easeOut', delay: 0.0 }}
                />
                <motion.circle
                  cx="60"
                  cy="135"
                  r="3"
                  fill="none"
                  stroke="#ffe296"
                  strokeWidth="0.5"
                  animate={{ scale: [1, 3.5], opacity: [0.8, 0] }}
                  transition={{ duration: 2.0, repeat: Infinity, ease: 'easeOut', delay: 0.67 }}
                />
                <motion.circle
                  cx="60"
                  cy="135"
                  r="3"
                  fill="none"
                  stroke="#ffe296"
                  strokeWidth="0.5"
                  animate={{ scale: [1, 3.5], opacity: [0.8, 0] }}
                  transition={{ duration: 2.0, repeat: Infinity, ease: 'easeOut', delay: 1.33 }}
                />

                {/* Right Adrenal Calming waves */}
                <motion.circle
                  cx="76"
                  cy="135"
                  r="3"
                  fill="none"
                  stroke="#ffe296"
                  strokeWidth="0.5"
                  animate={{ scale: [1, 3.5], opacity: [0.8, 0] }}
                  transition={{ duration: 2.0, repeat: Infinity, ease: 'easeOut', delay: 0.0 }}
                />
                <motion.circle
                  cx="76"
                  cy="135"
                  r="3"
                  fill="none"
                  stroke="#ffe296"
                  strokeWidth="0.5"
                  animate={{ scale: [1, 3.5], opacity: [0.8, 0] }}
                  transition={{ duration: 2.0, repeat: Infinity, ease: 'easeOut', delay: 0.67 }}
                />
                <motion.circle
                  cx="76"
                  cy="135"
                  r="3"
                  fill="none"
                  stroke="#ffe296"
                  strokeWidth="0.5"
                  animate={{ scale: [1, 3.5], opacity: [0.8, 0] }}
                  transition={{ duration: 2.0, repeat: Infinity, ease: 'easeOut', delay: 1.33 }}
                />
              </>
            )}
          </svg>
        </div>
      </div>
    );
  };

// ─────────────────────────────────────────────────────────────────
// MAIN SECTION COMPONENT
// ─────────────────────────────────────────────────────────────────
export const PillJourney: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  useEffect(() => {
    if (!isAutoplay) return;
    const timer = setInterval(() => {
      setActiveStage(prev => (prev + 1) % stages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isAutoplay]);

  useEffect(() => {
    const container = document.getElementById('stage-selectors-container');
    const activeBtn = document.getElementById(`stage-btn-${activeStage}`);
    // Only auto-scroll if the container is in horizontal (mobile) layout mode.
    // We detect this by checking if the container's scrollWidth exceeds its clientWidth,
    // which only happens when overflow-x:auto is active (i.e. below lg breakpoint).
    if (container && activeBtn && container.scrollWidth > container.clientWidth) {
      const scrollLeft = activeBtn.offsetLeft - (container.clientWidth - activeBtn.clientWidth) / 2;
      const t = setTimeout(() => {
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }, 100);
      return () => clearTimeout(t);
    }
  }, [activeStage]);

  const stage = stages[activeStage];

  return (
    <section className="bg-[#0A192F] text-white py-14 md:py-20 relative overflow-clip border-b border-[rgba(255,255,255,0.06)]">

      {/* Watermark */}
      <div className="absolute right-[-5%] top-[10%] opacity-[0.04] pointer-events-none select-none">
        <span className="text-watermark text-white">vedah vital</span>
      </div>

      <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-12 relative z-10">

        {/* Section header */}
        <div className="text-center flex flex-col items-center gap-3 mb-12">
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-[rgba(255,255,255,0.45)]">
            BIOAVAILABILITY PATHWAY
          </span>
          <h2 className="heading-condensed text-4xl md:text-5xl text-white tracking-wide">
            inside one capsule
          </h2>
          <h3 className="heading-condensed text-2xl md:text-3xl text-[#8FB3FF] tracking-wide -mt-2">
            four stages of action
          </h3>
          <p className="font-sans text-xs md:text-sm text-white/50 font-light max-w-sm leading-relaxed">
            From ingestion to cortisol regulation — trace the precise biochemical journey of a single KSM-66® capsule through your body.
          </p>
        </div>

        {/* Three-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* LEFT — stage selector */}
          <div
            id="stage-selectors-container"
            className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible scrollbar-none snap-x snap-mandatory pb-3 lg:pb-0 px-2 lg:px-0 relative lg:static"
          >
            {stages.map((s, i) => (
              <button
                key={s.id}
                id={`stage-btn-${i}`}
                onClick={() => {
                  setActiveStage(i);
                  setIsAutoplay(false);
                }}
                className={`flex-shrink-0 snap-center w-[200px] lg:w-full text-left p-4 rounded-2xl border transition-all duration-400 cursor-pointer focus:outline-none ${
                  activeStage === i
                    ? 'border-[rgba(255,255,255,0.15)] bg-white/8'
                    : 'border-transparent bg-white/3 hover:bg-white/5 hover:border-white/8'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[9px] font-bold font-sans transition-all duration-400"
                    style={{ background: activeStage === i ? s.color : 'rgba(255,255,255,0.08)', color: 'white' }}>
                    {s.id}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-sans text-[8px] font-bold tracking-widest uppercase text-white/35">{s.time}</span>
                    <span className={`heading-condensed text-base tracking-wide transition-colors duration-400 ${activeStage === i ? 'text-white' : 'text-white/50'}`}>
                      {s.title}
                    </span>
                  </div>
                </div>
                {activeStage === i && (
                  <motion.div className="mt-3 h-[2px] rounded-full overflow-hidden bg-white/10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <motion.div className="h-full rounded-full" style={{ background: s.color }}
                      initial={{ width: '0%' }} animate={{ width: '100%' }}
                      transition={{ duration: 3.5, ease: 'linear' }}/>
                  </motion.div>
                )}
              </button>
            ))}
          </div>

          {/* CENTER — body infographic, height-fixed so the tall silhouette is never clipped */}
          <div className="lg:col-span-4 flex justify-center items-center py-2">
            <div className="relative w-[240px] md:w-[280px] lg:w-[300px] h-[360px] md:h-[420px] overflow-hidden">
              <motion.div className="absolute inset-0 rounded-full blur-3xl pointer-events-none opacity-10"
                style={{ background: stage.color }}
                animate={{ opacity: [0.05, 0.15, 0.05] }}
                transition={{ duration: 2.5, repeat: Infinity }}/>
              <DynamicHumanInfographic activeStage={activeStage} />
            </div>
          </div>

          {/* RIGHT — stage detail card */}
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div key={stage.id}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="p-7 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm flex flex-col gap-5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold font-sans text-sm shrink-0"
                    style={{ background: stage.color }}>{stage.id}</div>
                  <div>
                    <span className="font-sans text-[8px] font-bold tracking-widest uppercase text-white/35 block">{stage.time}</span>
                    <span className="heading-condensed text-2xl text-white tracking-wide leading-none">{stage.title}</span>
                  </div>
                </div>
                <div className="text-[10px] font-sans font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border self-start"
                  style={{ color: stage.color, borderColor: `${stage.color}55`, background: `${stage.color}18` }}>
                  {stage.subtitle}
                </div>
                <p className="font-sans text-sm text-white/60 font-light leading-relaxed">{stage.detail}</p>
                <div className="border-t border-white/8 pt-4 flex items-center gap-2">
                  <motion.div className="w-2 h-2 rounded-full shrink-0" style={{ background: stage.color }}
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity }}/>
                  <span className="font-sans text-[9px] uppercase font-bold tracking-widest text-white/30">
                    Active region: {stage.region === 'stomach' ? 'Gastric Cavity' : stage.region === 'gut' ? 'Small Intestine' : stage.region === 'blood' ? 'Cardiovascular System' : 'HPA Axis / Adrenal Cortex'}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PillJourney;

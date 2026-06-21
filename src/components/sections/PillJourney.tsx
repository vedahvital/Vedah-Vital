import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const stages = [
  { id: 1, time: '0 – 5 min',      title: 'Dissolution',  subtitle: 'Capsule breaks down in stomach',       detail: 'The vegetable cellulose capsule dissolves in stomach acid, releasing a precise 600mg dose of KSM-66® withanolides alongside 5mg of piperine from Black Pepper extract.', color: '#9DB2C9', region: 'stomach' },
  { id: 2, time: '5 – 30 min',     title: 'Absorption',   subtitle: 'Piperine unlocks bioavailability',     detail: 'Piperine temporarily inhibits digestive enzymes that would otherwise metabolize withanolides prematurely, boosting absorption into the intestinal wall by up to 30%.', color: '#1B365D', region: 'gut' },
  { id: 3, time: '30 – 90 min',    title: 'Circulation',  subtitle: 'Active compounds enter bloodstream',   detail: 'Withanolides are transported through the portal vein into systemic circulation, carried by plasma proteins to target tissues including the adrenal glands and brain.', color: '#5A7FA8', region: 'blood' },
  { id: 4, time: '90 min → ongoing', title: 'Regulation', subtitle: 'HPA axis modulation begins',          detail: 'Withanolides modulate the HPA axis, signaling the adrenal cortex to reduce cortisol secretion. Simultaneously, GABA-ergic pathways in the brain are activated, promoting calm alertness.', color: '#2E5B88', region: 'brain' },
];

// ─────────────────────────────────────────────────────────────────
// ANATOMICAL BODY SVG — modelled after reference medical illustration
// ─────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────
// DYNAMIC REALISTIC HUMAN INFOGRAPHIC
// ─────────────────────────────────────────────────────────────────
const DynamicHumanInfographic: React.FC<{ activeStage: number; stageColor: string }> = ({ activeStage, stageColor }) => {
  const [svgContent, setSvgContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/images/human1.svg')
      .then(res => res.text())
      .then(data => {
        const cleanSvg = data.replace(/<\?xml[^>]*\?>/i, '');
        setSvgContent(cleanSvg);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load human1 SVG:', err);
        setLoading(false);
      });
  }, []);

  const stageClass = `stage-${activeStage + 1}`;

  return (
    <div className={`relative w-full aspect-[136/359] ${stageClass} overflow-hidden`}>
      {/* Component-level CSS overrides for human1.svg paths & smooth zoom effects */}
      <style>{`
        .human-body-svg-container {
          width: 100%;
          height: 100%;
          position: relative;
          transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: center center;
        }

        .human-body-svg-container svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        /* -------------------------------------------------------------
           DYNAMIC DGN WINDOW SCANNER SCALING & PANNING (STAGE ZOOM)
        ------------------------------------------------------------- */
        
        /* Stage 1: Dissolution (Zoom to Stomach region) */
        .stage-1 .human-body-svg-container {
          transform: scale(2.2) translate(0.05%, -1.88%);
          transform-origin: 49.89% 29.40%;
        }

        /* Stage 2: Absorption (Zoom to Intestines region) */
        .stage-2 .human-body-svg-container {
          transform: scale(2.4) translate(0.00%, -6.89%);
          transform-origin: 50.00% 41.78%;
        }

        /* Stage 3: Circulation (Zoom to Chest/Vessels region) */
        .stage-3 .human-body-svg-container {
          transform: scale(1.6) translate(0.00%, 0.12%);
          transform-origin: 50.00% 25.07%;
        }

        /* Stage 4: Regulation (Zoom to HPA Axis Brain/Endocrine region) */
        .stage-4 .human-body-svg-container {
          transform: scale(1.4) translate(0.00%, 14.06%);
          transform-origin: 50.00% 5.57%;
        }

        /* -------------------------------------------------------------
           SVG INTERNAL SHAPE HIGHLIGHT OVERRIDES BY ACTIVE STAGE
        ------------------------------------------------------------- */

        .human-bg-rect {
          display: none !important;
        }

        /* Base silhouette stroke & fill overrides using XML attributes */
        .human-body-svg-container svg path[stroke="#3A644E"] {
          stroke: rgba(255, 255, 255, 0.08) !important;
          stroke-width: 0.35px !important;
          transition: all 0.8s ease;
        }

        .human-body-svg-container svg path[fill="#3A644E"] {
          fill: rgba(255, 255, 255, 0.04) !important;
          transition: all 0.8s ease;
        }

        /* Hide default red/blue cardiovascular paths by default */
        .human-body-svg-container svg path[fill="#E12349"],
        .human-body-svg-container svg path[fill="#951F32"],
        .human-body-svg-container svg path[fill="#B82740"],
        .human-body-svg-container svg path[fill="#A54C4B"],
        .human-body-svg-container svg path[fill="#6F1110"],
        .human-body-svg-container svg path[fill="#B05052"],
        .human-body-svg-container svg path[fill="#00A5DA"],
        .human-body-svg-container svg path[fill="#00457B"],
        .human-body-svg-container svg path[fill="#00367D"],
        .human-body-svg-container svg path[fill="#0099D3"],
        .human-body-svg-container svg path[fill="#F4AAA3"] {
          opacity: 0.04;
          transition: all 0.8s ease;
        }

        /* Stage 1 Highlight: Stomach */
        .stage-1 .human-body-svg-container svg path[fill="#F4AAA3"] {
          fill: #8FB3FF !important;
          opacity: 0.95 !important;
          filter: drop-shadow(0 0 5px #8FB3FFcc);
        }

        /* Stage 2 Highlight: Small Intestine (enhanced visibility of body outline) */
        .stage-2 .human-body-svg-container svg path[fill="#3A644E"] {
          fill: rgba(255, 255, 255, 0.08) !important;
        }

        /* Stage 3 Highlight: Blood vessels & heart */
        .stage-3 .human-body-svg-container svg path[fill="#E12349"],
        .stage-3 .human-body-svg-container svg path[fill="#951F32"],
        .stage-3 .human-body-svg-container svg path[fill="#B82740"],
        .stage-3 .human-body-svg-container svg path[fill="#A54C4B"],
        .stage-3 .human-body-svg-container svg path[fill="#6F1110"],
        .stage-3 .human-body-svg-container svg path[fill="#B05052"] {
          fill: #8FB3FF !important;
          opacity: 0.95 !important;
          filter: drop-shadow(0 0 4px #8FB3FFcc);
          animation: pulse-circ 1.5s infinite alternate ease-in-out;
        }

        .stage-3 .human-body-svg-container svg path[fill="#00A5DA"],
        .stage-3 .human-body-svg-container svg path[fill="#00457B"],
        .stage-3 .human-body-svg-container svg path[fill="#00367D"],
        .stage-3 .human-body-svg-container svg path[fill="#0099D3"] {
          fill: rgba(255, 255, 255, 0.45) !important;
          opacity: 0.75 !important;
        }

        /* Stage 4 Highlight: Brain & nervous system (glowing brand navy) */
        .stage-4 .human-body-svg-container svg path[stroke="#3A644E"] {
          stroke: #8FB3FF !important;
          stroke-opacity: 0.65 !important;
          filter: drop-shadow(0 0 2px #8FB3FF55);
        }

        @keyframes pulse-circ {
          0% { opacity: 0.4; }
          100% { opacity: 0.95; }
        }
      `}</style>

      {loading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-t-white border-white/20 animate-spin" />
          <span className="font-sans text-[9px] text-white/35 tracking-wider uppercase">Loading Infographic</span>
        </div>
      ) : (
        <div className="human-body-svg-container">
          {/* Main Anatomical Silhouette */}
          <div 
            className="human-body-svg-inner w-full h-full"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />

          {/* Interactive Animations Overlay SVG (Matches coordinate space 1:1) */}
          <svg viewBox="0 0 136 359" className="absolute inset-0 w-full h-full pointer-events-none z-20">
            {/* Stage 1: Dissolution (Capsule travel & stomach dissolve) */}
            {activeStage === 0 && (
              <>
                <motion.g
                  animate={{
                    y: [25, 95],
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <rect x="65" y="5" width="6" height="10" rx="3" fill={stageColor} stroke="white" strokeWidth="0.6"/>
                  <line x1="68" y1="5" x2="68" y2="15" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6"/>
                </motion.g>
                <motion.circle
                  cx="68"
                  cy="105"
                  r="12"
                  fill={`${stageColor}22`}
                  animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.6, 0.2] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.circle
                  cx="68"
                  cy="105"
                  r="6"
                  fill={`${stageColor}66`}
                  animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                />
              </>
            )}

            {/* Stage 2: Absorption (Intestine diffusion particles) */}
            {activeStage === 1 && (
              <>
                <motion.ellipse
                  cx="68"
                  cy="147.5"
                  rx="15"
                  ry="12"
                  fill={`${stageColor}15`}
                  animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                {[
                  { x: 68, y: 136, delay: 0.0 },
                  { x: 65, y: 140, delay: 0.3 },
                  { x: 71, y: 144, delay: 0.6 },
                  { x: 67, y: 148, delay: 0.9 },
                  { x: 72, y: 152, delay: 1.2 },
                  { x: 64, y: 156, delay: 1.5 },
                  { x: 69, y: 159, delay: 0.2 },
                  { x: 66, y: 142, delay: 0.5 },
                  { x: 70, y: 150, delay: 0.8 },
                  { x: 68, y: 155, delay: 1.1 }
                ].map((p, i) => (
                  <motion.circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r="1.4"
                    fill="#8FB3FF"
                    animate={{
                      x: [p.x, p.x + (p.x < 68 ? -7 : 7)],
                      y: [p.y, p.y + 6],
                      opacity: [0, 0.9, 0],
                      scale: [0.6, 1.2, 0.6]
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

            {/* Stage 3: Circulation (Blood vessel flow pulses) */}
            {activeStage === 2 && (
              <>
                {/* Heart Center Pulse */}
                <motion.circle
                  cx="68"
                  cy="88"
                  r="6"
                  fill={`${stageColor}33`}
                  animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.circle
                  cx="68"
                  cy="88"
                  r="3"
                  fill={`${stageColor}88`}
                  animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
                />
                
                {/* Downward Pulse Left */}
                <motion.circle
                  cx={68}
                  cy={88}
                  r="1.8"
                  fill="#8FB3FF"
                  animate={{
                    cx: [68, 66, 62],
                    cy: [88, 115, 145],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2.0,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
                {/* Downward Pulse Right */}
                <motion.circle
                  cx={68}
                  cy={88}
                  r="1.8"
                  fill="#8FB3FF"
                  animate={{
                    cx: [68, 70, 74],
                    cy: [88, 115, 145],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2.0,
                    repeat: Infinity,
                    delay: 1.0,
                    ease: 'easeInOut'
                  }}
                />
                {/* Upward Pulse Left */}
                <motion.circle
                  cx={68}
                  cy={88}
                  r="1.8"
                  fill="#8FB3FF"
                  animate={{
                    cx: [68, 66, 66],
                    cy: [88, 55, 30],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    delay: 0.5,
                    ease: 'easeInOut'
                  }}
                />
                {/* Upward Pulse Right */}
                <motion.circle
                  cx={68}
                  cy={88}
                  r="1.8"
                  fill="#8FB3FF"
                  animate={{
                    cx: [68, 70, 70],
                    cy: [88, 55, 30],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    delay: 1.5,
                    ease: 'easeInOut'
                  }}
                />
              </>
            )}

            {/* Stage 4: Regulation (HPA Axis Brain -> Adrenals signals) */}
            {activeStage === 3 && (
              <>
                {/* Brain Glow */}
                <motion.circle
                  cx="68"
                  cy="20"
                  r="8"
                  fill={`${stageColor}22`}
                  animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                
                {/* Adrenal/Kidney Glows */}
                <motion.circle
                  cx="60"
                  cy="135"
                  r="5"
                  fill="#ffe29622"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                />
                <motion.circle
                  cx="76"
                  cy="135"
                  r="5"
                  fill="#ffe29622"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                />

                {/* HPA Axis Paths: Straight down the spine then branching */}
                <path
                  d="M68,20 L68,115 L60,135"
                  stroke={stageColor}
                  strokeWidth="0.6"
                  strokeDasharray="1.5,2.5"
                  fill="none"
                  opacity="0.35"
                />
                <path
                  d="M68,20 L68,115 L76,135"
                  stroke={stageColor}
                  strokeWidth="0.6"
                  strokeDasharray="1.5,2.5"
                  fill="none"
                  opacity="0.35"
                />
                
                {/* Pulse 1: Left pathway */}
                <motion.circle
                  cx={68}
                  cy={20}
                  r="1.6"
                  fill="#ffe296"
                  animate={{
                    cx: [68, 68, 60],
                    cy: [20, 115, 135],
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: 'linear',
                    times: [0, 0.8, 0.95, 1]
                  }}
                />
                {/* Pulse 2: Right pathway */}
                <motion.circle
                  cx={68}
                  cy={20}
                  r="1.6"
                  fill="#ffe296"
                  animate={{
                    cx: [68, 68, 76],
                    cy: [20, 115, 135],
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    delay: 1.1,
                    ease: 'linear',
                    times: [0, 0.8, 0.95, 1]
                  }}
                />
              </>
            )}
          </svg>
        </div>
      )}
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
    const handleAutoScroll = () => {
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        const container = document.getElementById('stage-selectors-container');
        const activeBtn = document.getElementById(`stage-btn-${activeStage}`);
        if (container && activeBtn) {
          const scrollLeft = activeBtn.offsetLeft - (container.clientWidth - activeBtn.clientWidth) / 2;
          container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
      }
    };
    const t = setTimeout(handleAutoScroll, 100);
    return () => clearTimeout(t);
  }, [activeStage]);

  const stage = stages[activeStage];

  return (
    <section className="bg-[#0A192F] text-white py-14 md:py-20 relative overflow-hidden border-b border-[rgba(255,255,255,0.06)]">

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
          <h3 className="heading-condensed text-2xl md:text-3xl text-[var(--color-navy)] tracking-wide -mt-2">
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

          {/* CENTER — body infographic with larger borderless container (compact aspect-[3/4]) */}
          <div className="lg:col-span-4 flex justify-center items-center py-2">
            <div className="relative w-[240px] md:w-[280px] lg:w-[300px] aspect-[3/4] overflow-hidden">
              <motion.div className="absolute inset-0 rounded-full blur-3xl pointer-events-none opacity-10"
                style={{ background: stage.color }}
                animate={{ opacity: [0.05, 0.15, 0.05] }}
                transition={{ duration: 2.5, repeat: Infinity }}/>
              <DynamicHumanInfographic activeStage={activeStage} stageColor={stage.color} />
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

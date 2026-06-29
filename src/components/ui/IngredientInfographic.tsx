import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';


// Detailed representation of a Withanolide chemical skeleton structure
interface MoleculeProps {
  delay: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
}

const WithanolideMolecule: React.FC<MoleculeProps> = ({ delay, startX, startY, endX, endY, duration }) => {
  return (
    <motion.g
      initial={{ x: startX, y: startY, opacity: 0, scale: 0.08, rotate: 0 }}
      animate={{
        x: [startX, startX - 8, startX + 8, endX],
        y: [startY, startY - 35, startY - 70, endY],
        opacity: [0, 0.9, 0.9, 0],
        scale: [0.08, 0.16, 0.16, 0.08],
        rotate: [0, 45, 90, 180]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
    >
      {/* 3 fused hexagons, 1 pentagon, and lactone ring */}
      <path
        d="M 0,5 L 8,0 L 16,5 L 24,0 L 32,5 L 40,0 L 48,5 L 56,3 L 60,10 L 54,17 L 48,15 L 40,20 L 32,15 L 24,20 L 16,15 L 0,15 Z M 16,5 L 16,15 M 32,5 L 32,15 M 48,5 L 48,15 M 16,5 L 16,-1 M 32,5 L 32,-1 M 60,10 L 68,8 L 74,4 L 80,8 L 80,16 L 74,20 L 68,16 Z M 74,20 L 74,25 M 75,20 L 75,25"
        stroke="#FFE296"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Glowing atoms at vertices */}
      <circle cx="8" cy="0" r="1.5" fill="#FFF" className="filter drop-shadow-[0_0_2.5px_#FFE296]" />
      <circle cx="24" cy="0" r="1.5" fill="#FFF" className="filter drop-shadow-[0_0_2.5px_#FFE296]" />
      <circle cx="40" cy="0" r="1.5" fill="#FFF" className="filter drop-shadow-[0_0_2.5px_#FFE296]" />
      <circle cx="74" cy="4" r="1.5" fill="#FFF" className="filter drop-shadow-[0_0_2.5px_#FFE296]" />
    </motion.g>
  );
};

const MicroParticle: React.FC<MoleculeProps> = ({ delay, startX, startY, endX, endY, duration }) => {
  // Deterministic horizontal offset to remain pure across renders
  const driftOffset = ((startX * 17 + Math.round(delay * 100)) % 16) - 8;

  return (
    <motion.circle
      cx={startX}
      cy={startY}
      r="2.2"
      fill="#FFE296"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        x: [0, driftOffset, endX - startX],
        y: [0, -45, endY - startY],
        opacity: [0, 1, 1, 0],
        scale: [0.5, 1.3, 0.5]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeOut",
        delay: delay
      }}
      className="filter drop-shadow-[0_0_3px_#FFE296]"
    />
  );
};

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
    <div className="w-full max-w-[500px] min-h-[500px] md:min-h-[530px] flex flex-col gap-4 p-5 md:p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl relative">
      
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
          className="flex flex-col p-4 rounded-2xl bg-white/5 border border-white/10 items-center text-center justify-between min-h-[220px] relative"
        >
          <span className="text-[9px] font-sans font-bold tracking-[0.18em] text-[#8FB3FF] uppercase">1. THE SOURCE</span>
          
          <div className="w-full h-32 flex items-center justify-center relative">
            {/* Elegant, organic, recognizable plant SVG with gradient coloring */}
            <svg className="w-40 h-full" viewBox="0 0 200 160" fill="none">
              <defs>
                <linearGradient id="plantLeafGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8FB3FF" />
                  <stop offset="100%" stopColor="#5A7FA8" />
                </linearGradient>
                <linearGradient id="plantRootGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFE296" />
                  <stop offset="100%" stopColor="#D9A05B" />
                </linearGradient>
                <linearGradient id="berryGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF6B6B" />
                  <stop offset="100%" stopColor="#D92424" />
                </linearGradient>
                <linearGradient id="calyxGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E2EEF9" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#A3C2F0" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="soilGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(27, 54, 93, 0.35)" />
                  <stop offset="100%" stopColor="rgba(10, 25, 47, 0.85)" />
                </linearGradient>
                <linearGradient id="flaskGlow" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#8FB3FF" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#FFE296" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#8FB3FF" stopOpacity="0.5" />
                </linearGradient>
                <radialGradient id="liquidGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFE296" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#8FB3FF" stopOpacity="0.05" />
                </radialGradient>
              </defs>

              {/* Ground & Soil profile */}
              <path d="M 10 80 Q 100 76 190 80 L 190 155 L 10 155 Z" fill="url(#soilGrad)" />
              
              {/* Soil details */}
              <path d="M 20 95 Q 80 92 120 98" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
              <path d="M 70 120 Q 130 115 180 122" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
              
              <circle cx="30" cy="95" r="1.2" fill="rgba(217, 160, 91, 0.4)" />
              <circle cx="170" cy="110" r="1.5" fill="rgba(217, 160, 91, 0.4)" />
              <circle cx="50" cy="140" r="1" fill="rgba(217, 160, 91, 0.4)" />
              <circle cx="150" cy="135" r="1.2" fill="rgba(217, 160, 91, 0.4)" />

              {/* Extraction Liquid Menu (Meniscus) inside the flask base */}
              <path
                d="M 75.1 110 Q 100 113 124.9 110 L 155 145 C 158 149 155 152 150 152 L 50 152 C 45 152 42 149 45 145 Z"
                fill="url(#liquidGrad)"
              />

              {/* Soil Line overlay */}
              <line x1="10" y1="80" x2="190" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

              {/* Leaves & Stem (Upper Plant) - Faded blue outline with low opacity fill */}
              <motion.g
                animate={{ rotate: [-1.2, 1.2, -1.2] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="origin-[100px_80px]"
              >
                {/* Center stem */}
                <path d="M 99 80 L 99 28 C 99 26 101 26 101 28 L 101 80 Z" fill="url(#plantLeafGrad)" />
                
                {/* Leaf 1 (Bottom Left) */}
                <path d="M 99 65 C 75 60 60 70 48 65 C 65 80 85 75 99 65 Z" fill="url(#plantLeafGrad)" opacity="0.25" />
                <path d="M 99 65 C 75 60 60 70 48 65 C 65 80 85 75 99 65 Z" stroke="url(#plantLeafGrad)" strokeWidth="1.5" />
                <path d="M 99 65 Q 73.5 66 48 65" stroke="rgba(143, 179, 255, 0.4)" strokeWidth="1.2" fill="none" />
                <path d="M 85 65 Q 82 60 79 57" stroke="rgba(143, 179, 255, 0.3)" strokeWidth="0.8" fill="none" />
                <path d="M 70 65 Q 67 60 64 57" stroke="rgba(143, 179, 255, 0.3)" strokeWidth="0.8" fill="none" />
                <path d="M 85 65 Q 83 70 81 73" stroke="rgba(143, 179, 255, 0.3)" strokeWidth="0.8" fill="none" />
                <path d="M 70 65 Q 68 70 66 73" stroke="rgba(143, 179, 255, 0.3)" strokeWidth="0.8" fill="none" />
                
                {/* Leaf 2 (Bottom Right) */}
                <path d="M 101 60 C 125 55 140 65 152 60 C 135 75 115 70 101 60 Z" fill="url(#plantLeafGrad)" opacity="0.25" />
                <path d="M 101 60 C 125 55 140 65 152 60 C 135 75 115 70 101 60 Z" stroke="url(#plantLeafGrad)" strokeWidth="1.5" />
                <path d="M 101 60 Q 126.5 61 152 60" stroke="rgba(143, 179, 255, 0.4)" strokeWidth="1.2" fill="none" />
                <path d="M 115 60 Q 118 55 121 52" stroke="rgba(143, 179, 255, 0.3)" strokeWidth="0.8" fill="none" />
                <path d="M 130 60 Q 133 55 136 52" stroke="rgba(143, 179, 255, 0.3)" strokeWidth="0.8" fill="none" />
                <path d="M 115 60 Q 117 65 119 68" stroke="rgba(143, 179, 255, 0.3)" strokeWidth="0.8" fill="none" />
                <path d="M 130 60 Q 132 65 134 68" stroke="rgba(143, 179, 255, 0.3)" strokeWidth="0.8" fill="none" />

                {/* Leaf 3 (Middle Left) */}
                <path d="M 99 45 C 80 38 70 48 58 40 C 70 55 88 50 99 45 Z" fill="url(#plantLeafGrad)" opacity="0.2" />
                <path d="M 99 45 C 80 38 70 48 58 40 C 70 55 88 50 99 45 Z" stroke="url(#plantLeafGrad)" strokeWidth="1.5" />
                <path d="M 99 45 Q 78.5 44 58 40" stroke="rgba(143, 179, 255, 0.4)" strokeWidth="1.2" fill="none" />
                <path d="M 88 44 Q 85 39 82 37" stroke="rgba(143, 179, 255, 0.3)" strokeWidth="0.8" fill="none" />
                <path d="M 76 43 Q 73 39 70 37" stroke="rgba(143, 179, 255, 0.3)" strokeWidth="0.8" fill="none" />
                <path d="M 88 44 Q 86 48 84 51" stroke="rgba(143, 179, 255, 0.3)" strokeWidth="0.8" fill="none" />
                <path d="M 76 43 Q 74 48 72 51" stroke="rgba(143, 179, 255, 0.3)" strokeWidth="0.8" fill="none" />

                {/* Leaf 4 (Middle Right) */}
                <path d="M 101 40 C 120 33 130 43 142 35 C 130 50 112 45 101 40 Z" fill="url(#plantLeafGrad)" opacity="0.2" />
                <path d="M 101 40 C 120 33 130 43 142 35 C 130 50 112 45 101 40 Z" stroke="url(#plantLeafGrad)" strokeWidth="1.5" />
                <path d="M 101 40 Q 121.5 39 142 35" stroke="rgba(143, 179, 255, 0.4)" strokeWidth="1.2" fill="none" />
                <path d="M 112 40 Q 115 35 118 33" stroke="rgba(143, 179, 255, 0.3)" strokeWidth="0.8" fill="none" />
                <path d="M 124 39 Q 127 35 130 33" stroke="rgba(143, 179, 255, 0.3)" strokeWidth="0.8" fill="none" />
                <path d="M 112 40 Q 114 44 116 47" stroke="rgba(143, 179, 255, 0.3)" strokeWidth="0.8" fill="none" />
                <path d="M 124 39 Q 126 44 128 47" stroke="rgba(143, 179, 255, 0.3)" strokeWidth="0.8" fill="none" />

                {/* Leaf 5 (Top Terminal) */}
                <path d="M 100 25 C 90 10 100 2 100 2 C 100 2 110 10 100 25 Z" fill="url(#plantLeafGrad)" opacity="0.25" />
                <path d="M 100 25 C 90 10 100 2 100 2 C 100 2 110 10 100 25 Z" stroke="url(#plantLeafGrad)" strokeWidth="1.5" />
                <path d="M 100 25 L 100 2" stroke="rgba(143, 179, 255, 0.4)" strokeWidth="1.2" fill="none" />
                <path d="M 100 20 Q 96 15 94 13" stroke="rgba(143, 179, 255, 0.3)" strokeWidth="0.8" fill="none" />
                <path d="M 100 12 Q 96 8 94 6" stroke="rgba(143, 179, 255, 0.3)" strokeWidth="0.8" fill="none" />
                <path d="M 100 20 Q 104 15 106 13" stroke="rgba(143, 179, 255, 0.3)" strokeWidth="0.8" fill="none" />
                <path d="M 100 12 Q 104 8 106 6" stroke="rgba(143, 179, 255, 0.3)" strokeWidth="0.8" fill="none" />

                {/* Ashwagandha Berries hanging from Leaf Nodes (Detailed calyxes & red berries) */}
                
                {/* Left Berry Cluster */}
                <path d="M 99 45 Q 94 48 90 52" stroke="url(#plantLeafGrad)" strokeWidth="1" fill="none" />
                {/* Red Berry inside */}
                <circle cx="90" cy="58" r="4.2" fill="url(#berryGrad)" />
                {/* Lantern Calyx Envelope */}
                <path
                  d="M 90 52 C 84 54 82 60 86 66 C 90 70 94 66 94 60 C 94 54 92 52 90 52 Z"
                  fill="url(#calyxGrad)"
                  stroke="rgba(255, 226, 150, 0.65)"
                  strokeWidth="1"
                  opacity="0.7"
                />
                <path d="M 90 52 Q 85 59 86 66" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" fill="none" />
                <path d="M 90 52 Q 95 59 94 66" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" fill="none" />
                <path d="M 90 52 L 90 68" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" fill="none" />

                {/* Right Berry Cluster */}
                <path d="M 101 40 Q 106 44 110 48" stroke="url(#plantLeafGrad)" strokeWidth="1" fill="none" />
                {/* Red Berry inside */}
                <circle cx="110" cy="54" r="4.2" fill="url(#berryGrad)" />
                {/* Lantern Calyx Envelope */}
                <path
                  d="M 110 48 C 104 50 102 56 106 62 C 110 66 114 62 114 56 C 114 50 112 48 110 48 Z"
                  fill="url(#calyxGrad)"
                  stroke="rgba(255, 226, 150, 0.65)"
                  strokeWidth="1"
                  opacity="0.7"
                />
                <path d="M 110 48 Q 105 55 106 62" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" fill="none" />
                <path d="M 110 48 Q 115 55 114 62" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" fill="none" />
                <path d="M 110 48 L 110 64" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" fill="none" />
              </motion.g>

              {/* Scientific Laboratory Glass Flask outline enclosing roots */}
              <path
                d="M 88 75 L 84 75 L 84 71 L 116 71 L 116 75 L 112 75 L 112 95 L 155 145 C 158 149 155 152 150 152 L 50 152 C 45 152 42 149 45 145 L 88 95 Z"
                stroke="url(#flaskGlow)"
                strokeWidth="1.2"
                fill="none"
              />

              {/* Fleshy Taproot System (Creamy-tan gnarly Ashwagandha roots) */}
              <g className="filter drop-shadow-[0_2px_4px_rgba(217,160,91,0.2)]">
                {/* Main taproot body */}
                <path
                  d="M 95 80 C 95 90 92 100 95 112 C 98 122 96 128 100 135 C 104 128 102 122 105 112 C 108 100 105 90 105 80 Z"
                  fill="url(#plantRootGrad)"
                  stroke="rgba(10,25,47,0.15)"
                  strokeWidth="1"
                />
                
                {/* Shading highlight path to make roots look 3D cylindrical */}
                <path
                  d="M 96.5 82 C 96.5 90 94.5 100 97.5 112 C 99.5 120 98 126 100 133"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Horizontal growth striations (tuberous wrinkles) */}
                <path d="M 95 88 Q 100 90 105 88" stroke="rgba(10,25,47,0.18)" strokeWidth="0.8" fill="none" />
                <path d="M 94 96 Q 100 98 106 96" stroke="rgba(10,25,47,0.18)" strokeWidth="0.8" fill="none" />
                <path d="M 96 108 Q 100 110 104 108" stroke="rgba(10,25,47,0.18)" strokeWidth="0.8" fill="none" />
                <path d="M 97 118 Q 100 120 103 118" stroke="rgba(10,25,47,0.18)" strokeWidth="0.8" fill="none" />
                <path d="M 98 128 Q 100 130 102 128" stroke="rgba(10,25,47,0.18)" strokeWidth="0.8" fill="none" />

                {/* Thick secondary branch tuber (left) */}
                <path
                  d="M 94 98 C 84 103 76 108 74 115 C 73 118 75 119 76 117 C 82 112 88 107 95 103 Z"
                  fill="url(#plantRootGrad)"
                  stroke="rgba(10,25,47,0.15)"
                  strokeWidth="0.8"
                />
                <path d="M 86 104 Q 88 107 91 106" stroke="rgba(10,25,47,0.18)" strokeWidth="0.8" fill="none" />
                <path d="M 78 110 Q 80 113 83 112" stroke="rgba(10,25,47,0.18)" strokeWidth="0.8" fill="none" />

                {/* Thick secondary branch tuber (right) */}
                <path
                  d="M 106 101 C 115 106 124 112 130 120 C 132 122 133 121 131 119 C 124 112 116 107 106 102 Z"
                  fill="url(#plantRootGrad)"
                  stroke="rgba(10,25,47,0.15)"
                  strokeWidth="0.8"
                />
                <path d="M 112 108 Q 114 106 117 109" stroke="rgba(10,25,47,0.18)" strokeWidth="0.8" fill="none" />
                <path d="M 122 115 Q 124 113 127 116" stroke="rgba(10,25,47,0.18)" strokeWidth="0.8" fill="none" />

                {/* Thick lower branches (bottom) */}
                <path
                  d="M 98 122 C 92 128 86 135 80 142 C 78 143 80 145 81 144 C 88 137 94 130 99 125 Z"
                  fill="url(#plantRootGrad)"
                  stroke="rgba(10,25,47,0.15)"
                  strokeWidth="0.6"
                />
                <path
                  d="M 102 125 C 108 130 114 136 120 142 C 122 143 123 141 121 140 C 116 134 110 129 103 124 Z"
                  fill="url(#plantRootGrad)"
                  stroke="rgba(10,25,47,0.15)"
                  strokeWidth="0.6"
                />

                {/* Delicate fibrous root hairs tapping into the soil */}
                <path d="M 74 115 Q 67 118 63 125" stroke="url(#plantRootGrad)" strokeWidth="0.8" strokeLinecap="round" fill="none" />
                <path d="M 74 115 Q 69 112 65 110" stroke="url(#plantRootGrad)" strokeWidth="0.6" strokeLinecap="round" fill="none" />
                
                <path d="M 130 120 Q 137 123 141 130" stroke="url(#plantRootGrad)" strokeWidth="0.8" strokeLinecap="round" fill="none" />
                <path d="M 130 120 Q 135 117 139 116" stroke="url(#plantRootGrad)" strokeWidth="0.6" strokeLinecap="round" fill="none" />
                
                <path d="M 80 142 Q 74 148 70 151" stroke="url(#plantRootGrad)" strokeWidth="0.7" strokeLinecap="round" fill="none" />
                <path d="M 120 142 Q 126 148 130 151" stroke="url(#plantRootGrad)" strokeWidth="0.7" strokeLinecap="round" fill="none" />
                
                <path d="M 100 135 Q 99 145 97 153" stroke="url(#plantRootGrad)" strokeWidth="0.6" strokeLinecap="round" fill="none" />
                <path d="M 100 135 Q 101 145 103 153" stroke="url(#plantRootGrad)" strokeWidth="0.6" strokeLinecap="round" fill="none" />
              </g>

              {/* Extraction vapor field inside the neck */}
              <motion.path
                d="M 88 95 L 88 75 L 112 75 L 112 95"
                stroke="url(#plantLeafGrad)"
                strokeWidth="10"
                strokeLinecap="round"
                opacity="0.15"
                animate={{ opacity: [0.08, 0.22, 0.08], strokeWidth: [6, 12, 6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Highly detailed active chemical compound (Withanolide) animation */}
              <WithanolideMolecule delay={0.2} startX={74} startY={112} endX={100} endY={30} duration={3.8} />
              <WithanolideMolecule delay={1.4} startX={130} startY={120} endX={100} endY={20} duration={4.2} />
              <WithanolideMolecule delay={2.6} startX={100} startY={135} endX={100} endY={10} duration={4.0} />

              {/* Accompanying micro-particles rising along the flow */}
              <MicroParticle delay={0.5} startX={74} startY={112} endX={100} endY={40} duration={2.5} />
              <MicroParticle delay={0.9} startX={130} startY={120} endX={100} endY={35} duration={2.7} />
              <MicroParticle delay={1.7} startX={100} startY={135} endX={100} endY={25} duration={2.4} />
              <MicroParticle delay={2.1} startX={80} startY={142} endX={100} endY={30} duration={2.6} />
              <MicroParticle delay={2.8} startX={120} startY={142} endX={100} endY={20} duration={2.3} />
            </svg>
          </div>

          {/* Absolute labels placed cleanly at outer card edges */}
          <div className="absolute top-10 right-3 bg-white/10 text-white/80 border border-white/20 rounded-full px-2 py-0.5 text-[7px] font-sans font-bold uppercase tracking-wider">
            LEAVES DISCARDED
          </div>
          <div className="absolute bottom-14 left-3 bg-[#FFE296] text-[var(--color-navy-deep)] rounded-full px-2 py-0.5 text-[7px] font-sans font-bold shadow-md uppercase tracking-wider">
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
          className="flex flex-col p-4 rounded-2xl bg-white/5 border border-white/10 items-center text-center justify-between min-h-[220px] relative"
        >
          <span className="text-[9px] font-sans font-bold tracking-[0.18em] text-[#FFE296] uppercase">2. THE STRENGTH</span>
          
          <div className="w-full h-32 flex items-center justify-center relative">
            {/* Larger Standardized Strength Progress Ring */}
            <svg className="w-28 h-28 transform -rotate-90">
              <defs>
                <linearGradient id="dialGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#8FB3FF" />
                  <stop offset="50%" stopColor="#FFE296" />
                  <stop offset="100%" stopColor="#F5B041" />
                </linearGradient>
              </defs>
              <circle
                cx="56"
                cy="56"
                r="45"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="5.5"
                fill="transparent"
              />
              <motion.circle
                cx="56"
                cy="56"
                r="45"
                stroke="url(#dialGrad)"
                strokeWidth="5.5"
                fill="transparent"
                strokeDasharray={282.7}
                initial={{ strokeDashoffset: 282.7 }}
                animate={{ strokeDashoffset: 282.7 - (282.7 * 0.75) }}
                transition={{ duration: 1.8, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>
            
            {/* Center Dial Value */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-xl font-condensed tracking-wide text-white font-bold leading-none filter drop-shadow-[0_2px_4px_rgba(255,226,150,0.25)]">
                {strengthCount.toFixed(1)}%
              </span>
              <span className="text-[7.5px] font-sans tracking-widest text-[#FFE296] font-semibold uppercase leading-none mt-1">
                WITHANOLIDES
              </span>
            </div>
          </div>

          {/* Absolute label placed cleanly at top right */}
          <div className="absolute top-10 right-3 bg-white/10 border border-white/20 rounded-full px-2 py-0.5 text-[7px] font-sans font-semibold text-white uppercase tracking-wider">
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
        className="flex flex-col p-4 rounded-2xl bg-white/5 border border-white/10 justify-between items-stretch min-h-[160px] mt-4"
      >
        <div className="flex justify-between items-center w-full">
          <span className="text-[9px] font-sans font-bold tracking-[0.18em] text-[#8FB3FF] uppercase">3. THE ABSORPTION SYNERGY</span>
          <span className="text-[10px] font-sans font-bold text-[#FFE296] uppercase bg-white/10 px-2.5 py-0.5 rounded-full">
            +{absorptionCount}% FASTER
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-2">
          
          {/* Visual animated capsule illustration */}
          <div className="md:col-span-5 h-20 flex items-center justify-center relative bg-white/5 rounded-xl border border-white/5 overflow-hidden">
            
            <svg viewBox="0 0 160 50" className="w-full h-12" fill="none">
              <defs>
                <linearGradient id="capsuleNavy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1B365D" />
                  <stop offset="100%" stopColor="#0D1B2A" />
                </linearGradient>
                <linearGradient id="capsuleGold" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFE296" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#F5B041" stopOpacity="0.25" />
                </linearGradient>
              </defs>

              {/* Left Cap (Navy) - represents Ashwagandha */}
              <motion.g
                animate={{ x: [-2, 2, -2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <rect x="25" y="12" width="28" height="20" rx="10" fill="url(#capsuleNavy)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                <text x="31" y="24" fill="rgba(255,255,255,0.6)" fontSize="6" fontFamily="sans-serif" fontWeight="bold">KSM</text>
              </motion.g>

              {/* Right Cap (Clear Gold) - represents Piperine absorption catalyst */}
              <motion.g
                animate={{ x: [2, -2, 2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <rect x="55" y="12" width="28" height="20" rx="10" fill="url(#capsuleGold)" stroke="#FFE296" strokeWidth="1.5" />
                
                {/* Small floating molecular particles inside clear capsule */}
                <motion.circle cx="62" cy="18" r="1.5" fill="#FFE296" animate={{ y: [0, 4, 0], x: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }} />
                <motion.circle cx="72" cy="22" r="1.2" fill="#8FB3FF" animate={{ y: [0, -3, 0], x: [0, -1, 0] }} transition={{ duration: 2.2, repeat: Infinity, delay: 0.3 }} />
                <motion.circle cx="68" cy="26" r="1.5" fill="#FFF" animate={{ y: [0, -4, 0] }} transition={{ duration: 1.8, repeat: Infinity, delay: 0.6 }} />
                <text x="64" y="24" fill="#FFE296" fontSize="5" fontFamily="sans-serif" fontWeight="bold">95%</text>
              </motion.g>

              {/* Center Synergy Sparkle */}
              <motion.g
                animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path d="M54,6 L54,22 M46,14 L62,14" stroke="#FFE296" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="54" cy="14" r="3.5" fill="#FFF" className="blur-[0.5px]" opacity="0.8" />
              </motion.g>
            </svg>

            {/* Glowing caption */}
            <span className="absolute bottom-1 text-[7px] font-sans font-bold text-white/55 tracking-widest uppercase">
              active bonding
            </span>
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
                  className="h-full bg-gradient-to-r from-[#8FB3FF] to-[#FFE296] rounded-full"
                />
              </div>
            </div>

          </div>

        </div>

        <div className="flex justify-between items-center w-full border-t border-white/5 pt-2 mt-1">
          <span className="text-[11px] font-sans font-bold tracking-wide text-white uppercase">Optimal Bioavailability</span>
          <span className="text-[9px] font-sans text-white/70">With 5mg Black Pepper absorption catalyst</span>
        </div>
      </motion.div>

    </div>
  );
};

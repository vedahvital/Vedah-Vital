import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Play } from 'lucide-react';
import ShieldCheck from '../ui/icons/shield-check';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax scrolling layers
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 150]);
  const yBottle = useTransform(scrollY, [0, 1000], [0, -70]);

  // Interactive mouse tilt springs
  const xVal = useMotionValue(0.5);
  const yVal = useMotionValue(0.5);
  
  const rotateX = useSpring(useTransform(yVal, [0, 1], [8, -8]), { stiffness: 90, damping: 16 });
  const rotateY = useSpring(useTransform(xVal, [0, 1], [-8, 8]), { stiffness: 90, damping: 16 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    xVal.set(x);
    yVal.set(y);
  };

  const handleMouseLeave = () => {
    xVal.set(0.5);
    yVal.set(0.5);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-white select-none"
    >
      {/* 1. Full-Width Background Parallax Layer */}
      <motion.div 
        style={{ y: yBg }} 
        className="absolute inset-0 w-full h-[110vh] pointer-events-none z-0"
      >
        <img 
          src="/images/hero-bg.png?v=4" 
          alt="Natural Stone Backdrop" 
          className="w-full h-full object-cover opacity-100 select-none"
          draggable="false"
        />

        {/* Soft bottom blend to white background - restricted to bottom 25% to keep image crisp */}
        <div className="absolute bottom-0 left-0 w-full h-[25%] bg-gradient-to-t from-white to-transparent z-0" />
      </motion.div>

            
      {/* Main Grid Content */}
      <div className="w-full max-w-[var(--max-width)] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        <div className="lg:col-span-6 flex flex-col items-start gap-4.5 text-left py-5 md:py-6.5 px-6 md:px-8 rounded-3xl liquid-glass-card max-w-xl">
          
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-navy)]" />
            <span className="font-sans text-[0.75rem] font-bold tracking-[0.25em] text-[var(--color-navy)] uppercase">
              100% organic KSM-66®
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col"
          >
            <h1 className="heading-condensed text-6xl md:text-8xl text-[var(--color-heading)] tracking-wide">
              ashwagandha
            </h1>
            <h2 className="heading-condensed text-4xl md:text-6xl text-[var(--color-navy)] tracking-wide -mt-2">
              zero compromise
            </h2>
            <span className="font-sans font-bold text-[10px] tracking-[0.18em] text-[var(--color-heading)] opacity-80 uppercase mt-2">
              standardized root extract • 5% active withanolides
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans text-[0.95rem] text-[var(--color-text)] font-light leading-relaxed"
          >
            Experience authentic Ayurvedic science. Our formulation delivers clinical stress support, muscle recovery, and sleep depth with zero fillers or leaf waste.
          </motion.p>

          {/* Action Row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 w-full sm:w-auto pt-3"
          >
            <Link to="/" className="w-full sm:w-auto">
              <Button variant="primary" className="w-full sm:w-auto py-3.5 px-9">
                shop collection
              </Button>
            </Link>

            {/* Video Play link */}
            <a 
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-3.5 group cursor-pointer focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full border border-[var(--color-navy)] flex items-center justify-center text-[var(--color-navy)] group-hover:bg-[var(--color-navy)] group-hover:text-white transition-all duration-300">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
              <span className="font-sans text-xs font-semibold tracking-wider text-[var(--color-heading)] uppercase group-hover:text-[var(--color-navy)] transition-colors">
                Watch sourcing video
              </span>
            </a>
          </motion.div>

          {/* Socials & Amazon CTA Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex items-center justify-between w-full mt-5.5 pt-4.5 border-t border-white/20"
          >
            {/* Trust specs */}
            <div className="flex gap-4 text-xs font-sans font-medium text-white">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                cGMP
              </span>
              <span>•</span>
              <span>Non-GMO</span>
            </div>

            {/* Buy on Amazon Button */}
            <a 
              href="https://www.amazon.com" 
              target="_blank" 
              rel="noreferrer"
              className="focus:outline-none"
            >
              <Button variant="outline" className="py-2.5 px-6 text-[10px] uppercase tracking-wider font-semibold rounded-full border-white text-white hover:bg-white hover:text-[var(--color-navy-deep)] transition-all duration-300">
                buy on amazon
              </Button>
            </a>
          </motion.div>

        </div>

        {/* RIGHT COLUMN: Layered Floating Bottle (in front of text) */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end items-center relative py-8 lg:py-0 z-10">
          
          <motion.div
            style={{ y: yBottle, rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative w-[360px] md:w-[500px] aspect-square flex items-center justify-center overflow-visible"
          >
            {/* Circular soft halo glow - darkened/more visible */}
            <div className="absolute w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-[var(--color-navy)]/25 to-white/30 filter blur-2xl opacity-80 z-0" />

            {/* Floating info badge 1 (Claymorphic) */}
            <motion.div
              style={{ translateZ: 60 }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
              className="absolute top-[12%] left-[-8%] z-20 clay-card-navy py-3 px-4.5 flex flex-col items-start gap-0.5 pointer-events-none select-none"
            >
              <span className="text-[7px] font-sans font-bold tracking-[0.15em] text-[var(--color-navy)] uppercase leading-none">FORMULA TYPE</span>
              <span className="text-[10px] font-sans font-bold text-[var(--color-heading)] uppercase leading-none">5% WITHANOLIDES</span>
            </motion.div>

            {/* Floating info badge 2 (Glassmorphic) */}
            <motion.div
              style={{ translateZ: 80 }}
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
              className="absolute bottom-[18%] right-[-8%] z-20 glass-card-navy py-3 px-4.5 flex flex-col items-start gap-0.5 pointer-events-none select-none"
            >
              <span className="text-[7px] font-sans font-bold tracking-[0.15em] text-[var(--color-navy)] uppercase leading-none font-semibold">PURITY GUARANTEE</span>
              <span className="text-[10px] font-sans font-bold text-[var(--color-heading)] uppercase leading-none font-bold">99.8% BIO-ACTIVE</span>
            </motion.div>

            {/* Isolated floating bottle image - size decreased to 65% */}
            <motion.img
              src="/images/isolated_bottle.png"
              alt="Vedah Vital Ashwagandha Bottle"
              className="w-[65%] h-auto object-contain select-none filter drop-shadow-[0_30px_45px_rgba(10, 25, 47,0.22)] animate-float z-10"
              draggable="false"
              style={{ translateZ: 30 }}
            />

                      </motion.div>

        </div>

      </div>
    </section>
  );

};
export default Hero;

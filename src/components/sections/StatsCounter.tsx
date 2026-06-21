import React, { useEffect, useState, useRef } from 'react';

export const StatsCounter: React.FC = () => {
  const stats = [
    { target: 2400, suffix: '+', label: 'Wellness Users', description: 'Customers experiencing real adaptogenic benefits.' },
    { target: 70,   suffix: '+', label: 'Clinical Trials', description: 'Independent studies backing KSM-66® efficacy.' },
    { target: 14,   suffix: 'd', label: 'Avg. Response', description: 'Average days to first noticeable stress balance.' },
    { target: 5,    suffix: '%', label: 'Withanolides', description: 'Standardized active compounds, verified by HPLC.' },
  ];

  return (
    <section className="bg-white text-[var(--color-text)] py-14 md:py-18 relative overflow-hidden border-b border-[rgba(10, 25, 47,0.15)]">

      <div className="absolute left-[-5%] top-[10%] opacity-30 pointer-events-none select-none">
        <span className="text-watermark">vedah vital</span>
      </div>

      
      <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Statistics Grid with 1px borders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[rgba(10, 25, 47,0.15)] bg-white">
          {stats.map((stat) => (
            <div 
              key={stat.label} 
              className="p-8 md:p-10 border-r border-b border-[rgba(10, 25, 47,0.15)] flex flex-col items-start gap-4 transition-colors duration-500 hover:bg-[var(--color-navy-light)]/40"
            >
              <span className="font-display text-6xl md:text-7xl font-bold leading-none text-[var(--color-navy)]">
                <StatCount target={stat.target} suffix={stat.suffix} />
              </span>
              <div>
                <span className="font-sans text-[0.72rem] font-bold uppercase tracking-widest text-[var(--color-heading)] block mb-2">
                  {stat.label}
                </span>
                <p className="font-sans text-xs text-[var(--color-text)] opacity-80 font-light leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// Lightweight inline counter to avoid prop-drilling
const StatCount: React.FC<{ target: number; suffix: string }> = ({ target, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        let n = 0;
        const step = Math.ceil(target / 80);
        const t = setInterval(() => {
          n += step;
          if (n >= target) { setCount(target); clearInterval(t); }
          else setCount(n);
        }, 25);
      }
    }, { threshold: 0.1 });
    if (el) obs.observe(el);
    return () => { if (el) obs.unobserve(el); };
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

export default StatsCounter;

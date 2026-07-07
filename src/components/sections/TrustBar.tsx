import React from 'react';

export const TrustBar: React.FC = () => {
  const items = [
    "FSSAI Certified",
    "cGMP Manufactured",
    "Standardized 5% Withanolides",
    "Root-Only Extract",
    "Certified Vegan",
    "Gluten-Free Facility",
    "Third-Party Lab Tested",
  ];

  const marqueeItems = [...items, ...items, ...items];

  return (
    <section className="bg-white text-[var(--color-navy)] py-5 overflow-clip border-y border-[rgba(10, 25, 47,0.18)]">
      <div className="relative w-full flex items-center">
        <div className="flex gap-16 whitespace-nowrap animate-marquee">
          {marqueeItems.map((item, index) => (
            <div key={index} className="flex items-center gap-4 font-display text-sm md:text-base tracking-wide font-light">
              <span className="text-[var(--color-navy)] opacity-50 font-normal">✦</span>
              <span className="italic">{item.toLowerCase()}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default TrustBar;

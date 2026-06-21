import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Sparkles, Heart, Compass } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { AnimatedSection } from '../components/ui/AnimatedSection';

const philoPillars = [
  {
    icon: Sparkles,
    label: 'Clean-Label Integrity',
    desc: 'Zero synthetic binders, zero coloring agents, zero leaf waste. Only organic root extracts, Piperine, and vegetable cellulose.',
  },
  {
    icon: Shield,
    label: 'Clinical Standards',
    desc: 'Standardized to 5% Withanolides via HPLC to guarantee active strength in every single capsule.',
  },
  {
    icon: Heart,
    label: 'Radical Transparency',
    desc: 'Batch-level lab reports for every bottle. Input your batch code to view full heavy metal and purity audits.',
  },
];

export const About: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Our Story — Vedah Vital | The Intersection of Ayurveda and Modern Science</title>
        <meta
          name="description"
          content="Learn about Vedah Vital's commitment to clean-label transparency, ethical farming, KSM-66 root-only standardization, and laboratory testing."
        />
      </Helmet>

      <Navbar />

      <main className="flex-grow bg-white text-[var(--color-text)]">

        {/* ── Hero Banner ── */}
        <section className="pt-36 pb-24 text-center relative overflow-hidden bg-[var(--color-navy-light)] border-b border-[rgba(10, 25, 47,0.15)]">
          {/* Watermark - darkened */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-watermark pointer-events-none select-none opacity-65 whitespace-nowrap">
            our story
          </div>

                    
          <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-12 relative z-10">
            <AnimatedSection className="flex flex-col items-center gap-5 max-w-2xl mx-auto">
              <span className="eyebrow text-[var(--color-navy)]">OUR STORY</span>
              <h1 className="heading-condensed text-5xl md:text-7xl text-[var(--color-heading)] tracking-wide">
                wisdom cultivated
              </h1>
              <h2 className="heading-condensed text-3xl md:text-5xl text-[var(--color-navy)] tracking-wide -mt-2">
                through generations
              </h2>
            </AnimatedSection>
          </div>
        </section>

        {/* ── Brand Narrative ── */}
        <section className="py-20 md:py-28 relative overflow-hidden border-b border-[rgba(10, 25, 47,0.15)]">
                    <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            <AnimatedSection className="flex flex-col gap-6 text-left border-l border-[rgba(10, 25, 47,0.15)] pl-6 md:pl-10 py-4">
              <h2 className="heading-condensed text-4xl md:text-5xl text-[var(--color-heading)] tracking-wide">
                the soul of vedah vital
              </h2>
              <p className="font-sans text-sm md:text-base font-light leading-relaxed">
                Ayurveda is not merely a collection of herbal recipes; it is a profound philosophy that views human health as an integrated reflection of nature. For over three millennia, adaptogenic roots like Ashwagandha have been used to help the body resist environmental stress, stabilize daily energy reserves, and soothe the nervous system.
              </p>
              <p className="font-sans text-sm md:text-base font-light leading-relaxed">
                However, the modern world requires modern standards. Vedah Vital was founded to bridge the gap between traditional apothecary trust and scientific clinical rigor. We don't ask you to believe in heritage blindly—we verify every single claim in independent, ISO-accredited laboratories.
              </p>
            </AnimatedSection>

            {/* Core Philosophy Card with Glassmorphism - Standardized */}
            <AnimatedSection className="p-8 md:p-10 relative flex flex-col gap-6 glass-card-navy border border-white/40 shadow-sm">

              <div className="absolute right-6 top-6 opacity-10 pointer-events-none select-none text-[var(--color-navy)]">
                <Compass className="w-14 h-14 stroke-[1]" />
              </div>

              <h3 className="font-sans text-base font-semibold uppercase tracking-wider text-[var(--color-heading)]">
                Our Core Philosophy
              </h3>

              <div className="flex flex-col gap-6">
                {philoPillars.map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex gap-4 items-start">
                    <span className="w-8 h-8 rounded-none border border-[rgba(10, 25, 47,0.25)] flex items-center justify-center shrink-0 mt-0.5 text-[var(--color-navy)] bg-white">
                      <Icon className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="font-sans text-xs font-semibold uppercase tracking-wide text-[var(--color-heading)] mb-1">
                        {label}
                      </h4>
                      <p className="font-sans text-xs text-[var(--color-text)] opacity-85 font-light leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

          </div>
        </section>

        {/* ── Extraction Mastery ── */}
        <section className="py-20 md:py-28 bg-[var(--color-navy-light)] relative overflow-hidden border-b border-[rgba(10, 25, 47,0.15)]">
                              <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-12 text-center">
            
            <AnimatedSection className="max-w-2xl mx-auto flex flex-col items-center gap-4 mb-16">
              <span className="eyebrow text-[var(--color-navy)]">EXTRACTION MASTERY</span>
              <h2 className="heading-condensed text-4xl md:text-5xl text-[var(--color-heading)] tracking-wide">
                why root-only
              </h2>
              <h3 className="heading-condensed text-2xl md:text-3.5xl text-[var(--color-navy)] tracking-wide -mt-2">
                extraction matters
              </h3>
              <p className="font-sans text-sm md:text-base text-[var(--color-text)] opacity-85 font-light leading-relaxed mt-2">
                Many supplement manufacturers incorporate foliage and leaves into their powders because they are cheap and easy to harvest in bulk. However, according to both historical Ayurvedic textbooks and modern scientific consensus, the highest concentration of therapeutic active compounds resides within the root.
              </p>
            </AnimatedSection>

            {/* Split Details Cells (1px border style) */}
            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[rgba(10, 25, 47,0.15)] bg-white text-left max-w-4xl mx-auto">
              {[
                {
                  title: 'Traditional Sourcing',
                  body: 'Our ashwagandha roots are organic and harvested during optimal dry seasons in regions celebrated for rich mineral soils. Handled with reverence, the roots are carefully sun-dried, preserving their vital botanical compounds.',
                },
                {
                  title: 'KSM-66® Green Chemistry',
                  body: 'We employ a proprietary extraction process based on "Green Chemistry" principles. This avoids synthetic chemical solvents entirely, producing a full-spectrum root extract that retains the natural synergy of the plant.',
                },
              ].map(({ title, body }) => (
                <AnimatedSection
                  key={title}
                  className="p-8 md:p-10 border-r border-b border-[rgba(10, 25, 47,0.15)] flex flex-col gap-4 hover:bg-[var(--color-navy-light)]/40 transition-colors duration-500"
                >
                  <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-[var(--color-heading)]">
                    {title}
                  </h3>
                  <p className="font-sans text-sm text-[var(--color-text)] font-light leading-relaxed">
                    {body}
                  </p>
                </AnimatedSection>
              ))}
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};
export default About;

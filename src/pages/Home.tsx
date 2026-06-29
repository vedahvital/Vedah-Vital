import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '../components/layout/Navbar';
import { Hero } from '../components/sections/Hero';
import { TrustBar } from '../components/sections/TrustBar';
import { FourPillars } from '../components/sections/FourPillars';
import { IngredientScience } from '../components/sections/IngredientScience';
import { Comparison } from '../components/sections/Comparison';
import { PurityStandards } from '../components/sections/PurityStandards';
import { HowItWorks } from '../components/sections/HowItWorks';
import { PillJourney } from '../components/sections/PillJourney';
import { StatsCounter } from '../components/sections/StatsCounter';
import { Heritage } from '../components/sections/Heritage';
import { FAQ } from '../components/sections/FAQ';
import { Testimonials } from '../components/sections/Testimonials';
import { FinalCTA } from '../components/sections/FinalCTA';
import { Footer } from '../components/layout/Footer';

export const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Vedah Vital — Authentic Ayurvedic Wellness & Science-Backed Adaptogens</title>
        <meta 
          name="description" 
          content="Premium Organic Ashwagandha KSM-66 Root Extract standardized to 5% active Withanolides. Pure, traceable adaptogens synergized with Piperine." 
        />
        <meta property="og:title" content="Vedah Vital — Premium Organic Ashwagandha KSM-66" />
        <meta property="og:description" content="Discover natural cortisol balance, stress-relief, and deep sleep support backed by standard laboratory transparency." />
        <meta property="og:image" content="/images/hero-image.webp" />
      </Helmet>

      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <TrustBar />
        <FourPillars />
        <IngredientScience />
        <Comparison />
        <PurityStandards />
        <HowItWorks />
        <div className="optimize-render"><PillJourney /></div>
        <div className="optimize-render"><StatsCounter /></div>
        <div className="optimize-render"><Heritage /></div>
        <div className="optimize-render"><FAQ /></div>
        <div className="optimize-render"><Testimonials /></div>
        <div className="optimize-render"><FinalCTA /></div>
      </main>

      <Footer />
    </>
  );
};
export default Home;

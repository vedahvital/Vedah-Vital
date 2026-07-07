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
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Vedah Vital",
    "url": "https://vedahvital.com",
    "logo": "https://vedahvital.com/images/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-98765-43210",
      "contactType": "customer service",
      "email": "support@vedahvital.com",
      "areaServed": "IN",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "12 Ayurvedic Enclave, Sector 4",
      "addressLocality": "Bengaluru",
      "addressRegion": "Karnataka",
      "postalCode": "560001",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.facebook.com/vedahvital",
      "https://www.instagram.com/vedahvital",
      "https://www.linkedin.com/company/vedahvital"
    ]
  };

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Vedah Vital Organic KSM-66 Ashwagandha",
    "image": [
      "https://vedahvital.com/images/isolated_bottle.webp"
    ],
    "description": "Premium organic KSM-66 Ashwagandha Root Extract standardized to 5% withanolides. Combined with black pepper extract for maximum absorption. Medically reviewed. *These statements have not been evaluated by the FDA.",
    "sku": "VV-ASH-600",
    "mpn": "VV-ASH-600",
    "brand": {
      "@type": "Brand",
      "name": "Vedah Vital"
    },
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Priya Nair"
      },
      "reviewBody": "Outstanding quality. As someone who studies Ayurveda, I appreciate the root-only formulation without leaves. Medically reviewed, premium quality."
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "184"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://vedahvital.com",
      "priceCurrency": "INR",
      "price": "1299.00",
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Vedah Vital"
      }
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What makes Vedah Vital \"Root-Only\" Ashwagandha superior to other extracts?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vedah Vital exclusively uses a high-potency KSM-66® Root-Only Extract. While many brands include leaf waste to artificially inflate bulk powder weight, the most concentrated active adaptogens—withanolides—are scientifically and traditionally sourced from the root. This ensures a purer, more potent supplement that aligns with authentic Ayurvedic standards."
        }
      },
      {
        "@type": "Question",
        "name": "Why is Black Pepper extract included in a \"Modern Apothecary\" formula?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Purity is ineffective without absorption. We integrate a standardized dose of Black Pepper extract (95% Piperine) to act as a bio-enhancer. Piperine temporarily reduces enzyme activity in the digestive tract that would otherwise break down ashwagandha before it enters the bloodstream, boosting absorption rates by up to 30%."
        }
      },
      {
        "@type": "Question",
        "name": "Is this product third-party tested for purity and safety?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, absolute transparency is a founding principle. Every batch of Vedah Vital Ashwagandha is tested by an independent, ISO-accredited laboratory. We screen for heavy metals (lead, cadmium, mercury, arsenic), yeast, mold, and verify that active withanolide levels exactly match our label's 5% claim. You can verify your specific bottle's report via our Verification page."
        }
      },
      {
        "@type": "Question",
        "name": "How long should I take Vedah Vital Ashwagandha before seeing results?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ashwagandha is an adaptogen that works cumulatively. While some individuals experience a sense of calm and better sleep quality within the first week, clinical trials indicate the most significant balance in daily cortisol levels, resilience, and recovery peaks after 30 to 60 days of consistent, daily usage."
        }
      },
      {
        "@type": "Question",
        "name": "Are the capsules compatible with a vegan or vegetarian lifestyle?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Our capsules are made with 100% plant-based vegetable cellulose (derived from pine bark). Our formula contains zero bovine gelatin, synthetic binders, dairy, soy, or gluten, adhering strictly to conscious wellness standards."
        }
      }
    ]
  };

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
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
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

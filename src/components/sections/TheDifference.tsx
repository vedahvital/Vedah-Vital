import React from 'react';
import { Mail, ShieldCheck } from 'lucide-react';

export const TheDifference: React.FC = () => {
  return (
    <section className="bg-white text-[var(--color-text)] py-14 md:py-18 relative overflow-hidden border-b border-[rgba(10, 25, 47,0.15)]">
      
      <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
        {/* LEFT COLUMN: Shipping & Location (replicates delivery details left side) */}
        <div className="flex flex-col items-start gap-5 text-left border-l border-[rgba(10, 25, 47,0.15)] pl-6">
          <h3 className="heading-condensed text-3xl text-[var(--color-heading)] tracking-wide">
            shipping & logistics
          </h3>
          
          <div className="font-sans text-sm font-light leading-relaxed flex flex-col gap-3">
            <p>
              All Vedah Vital inventory is stored, packed, and shipped directly from Amazon Fulfillment Centers (FBA) to guarantee rapid, secure, and pristine delivery.
            </p>
            <p>
              All orders are eligible for Amazon Prime 1–2 day shipping. Tracking numbers and dispatch confirmations are automatically sent by Amazon once your bottle is shipped.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Certifications & Trust (replicates payment/discount details right side) */}
        <div className="flex flex-col items-start gap-5 text-left pl-0 md:pl-8">
          <h3 className="heading-condensed text-3xl text-[var(--color-heading)] tracking-wide">
            purity guarantees
          </h3>

          <div className="font-sans text-sm font-light leading-relaxed flex flex-col gap-3">
            <p>
              Every Vedah Vital bottle carries a 100% money-back guarantee. If you are unsatisfied with the purity or experience, contact our support desk.
            </p>
            <p>
              Our batch facilities adhere strictly to cGMP (current Good Manufacturing Practices) guidelines and USDA organic criteria.
            </p>
          </div>

          {/* Verification Badge icons row */}
          <div className="flex items-center gap-3 pt-3">
            {[
              "USDA Organic",
              "cGMP Facility",
              "Lab Tested"
            ].map((seal) => (
              <span 
                key={seal}
                className="inline-flex items-center gap-1.5 text-[8px] font-bold tracking-widest uppercase border border-[rgba(10, 25, 47,0.3)] bg-[var(--color-navy-light)] text-[var(--color-navy)] px-3 py-1.5 shadow-sm"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                {seal}
              </span>
            ))}
          </div>

          {/* Contact email block */}
          <div className="flex items-center gap-2.5 text-xs font-bold text-[var(--color-heading)] uppercase mt-2">
            <Mail className="w-4 h-4 text-[var(--color-navy)]" />
            <a href="mailto:info@vedahvital.com" className="hover:text-[var(--color-navy)] transition-colors lowercase">
              info@vedahvital.com
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
export default TheDifference;

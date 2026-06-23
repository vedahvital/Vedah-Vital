import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import InstagramIcon from '../ui/icons/instagram-icon';
import SendIcon from '../ui/icons/send-icon';
import MailFilledIcon from '../ui/icons/mail-filled-icon';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <footer className="relative bg-[var(--color-navy)] text-white overflow-hidden pt-20 pb-10 border-t border-[rgba(255,255,255,0.15)]">

      <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        
        {/* LEFT COLUMN: Brand & Navigation (replicates footer left side links) */}
        <div className="lg:col-span-4 flex flex-col gap-6 text-left">
          <Link to="/" className="flex items-center gap-2 group self-start focus:outline-none">
            <span className="heading-condensed text-3xl tracking-wide text-white group-hover:text-white/80 transition-colors">
              vedah vital
            </span>
          </Link>
 
          <nav className="flex flex-col gap-3 font-sans text-sm text-white/80">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/about" className="hover:text-white transition-colors">Our Story</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
            <Link to="/verify" className="hover:text-white transition-colors font-bold">Verify Your Product</Link>
          </nav>
        </div>

        {/* CENTER COLUMN: Newsletter Subscribe Form (replicates email newsletter input in reference center) */}
        <div className="lg:col-span-4 flex flex-col gap-4 text-left">
          <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-white/70">
            SUBSCRIBE FOR BATCH RELEASES
          </span>
          <form 
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center justify-between border-b border-white/30 py-2 w-full max-w-sm"
          >
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-transparent border-0 focus:outline-none font-sans text-sm text-white placeholder-white/50 w-full pr-4"
            />
            <button className="text-white hover:text-white/80 cursor-pointer">
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          <p className="font-sans text-xs text-white/60 leading-relaxed max-w-xs">
            Sign up to get notified of new laboratory certificate releases, batch audits, and adaptogen chemistry updates.
          </p>
        </div>

        {/* RIGHT COLUMN: Contact Phone & Socials (replicates phone and social links in reference right) */}
        <div className="lg:col-span-4 flex flex-col gap-6 items-start lg:items-end text-left lg:text-right w-full">
          <div className="flex flex-col gap-1">
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-white/70">
              Customer Support Email
            </span>
            <a href="mailto:info@vedahvital.com" className="heading-condensed text-2xl text-white tracking-wide block hover:text-white/80 transition-colors lowercase">
              info@vedahvital.com
            </a>
          </div>

          <div className="flex flex-col gap-2.5 items-start lg:items-end">
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-white/70">
              Connect With Apothecary
            </span>
            <div className="flex gap-4 items-center text-white/80">
              <a href="#" className="hover:text-white transition-colors flex items-center">
                <InstagramIcon size={18} color="currentColor" strokeWidth={1.75} />
              </a>
              <a href="#" className="hover:text-white transition-colors flex items-center">
                <SendIcon size={18} color="currentColor" strokeWidth={1.75} />
              </a>
              <a href="mailto:info@vedahvital.com" className="hover:text-white transition-colors flex items-center">
                <MailFilledIcon size={18} color="currentColor" strokeWidth={1.75} />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM ROW: Copyright & Back to Top */}
      <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        <p className="font-sans text-xs text-white/60">
          © {currentYear} Vedah Vital. Sourced and manufactured under strict cGMP guidelines.
        </p>

        <button 
          onClick={handleScrollToTop}
          className="font-sans text-xs font-semibold tracking-wider text-white/70 hover:text-white transition-colors cursor-pointer uppercase flex items-center gap-1.5 focus:outline-none"
        >
          back to top
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        </button>
      </div>

    </footer>
  );
};
export default Footer;

import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { Button } from '../ui/Button';
import MagnifierIcon from '../ui/icons/magnifier-icon';
import ShieldCheckIcon from '../ui/icons/shield-check';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Our Story', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-[rgba(10, 25, 47,0.15)] ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm'
            : 'bg-white/95 backdrop-blur-sm py-5'
        }`}
      >
        <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo (Vedah Vital style from client image) */}
          <Link to="/" className="flex items-center focus:outline-none">
            <img
              src="/image/logo3.svg"
              alt="Vedah Vital Logo"
              className="h-10 md:h-12 w-auto transition-transform duration-300 hover:scale-105"
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `font-sans text-[0.75rem] font-semibold tracking-widest uppercase transition-colors duration-300 relative py-1 focus:outline-none ${
                    isActive
                      ? 'text-[var(--color-navy)]'
                      : 'text-[var(--color-text)] hover:text-[var(--color-navy)]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavLine"
                        className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[var(--color-navy)]"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Utility Icons & Verification CTA */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-5 text-[var(--color-text)] mr-2">
              <button className="hover:text-[var(--color-navy)] transition-colors cursor-pointer flex items-center">
                <MagnifierIcon size={16} color="currentColor" strokeWidth={2.25} />
              </button>
              <button className="hover:text-[var(--color-navy)] transition-colors cursor-pointer">
                <User className="w-4 h-4 stroke-[2]" />
              </button>
              <button className="hover:text-[var(--color-navy)] transition-colors cursor-pointer relative">
                <ShoppingBag className="w-4 h-4 stroke-[2]" />
              </button>
            </div>

            <Link to="/verify">
              <Button variant="outline" className="py-2.5 px-6 gap-1.5 text-[9px] tracking-widest flex items-center justify-center">
                <ShieldCheckIcon size={14} color="currentColor" strokeWidth={2} />
                Verify
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1 text-[var(--color-heading)] hover:text-[var(--color-navy)] transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[60px] bottom-0 z-40 md:hidden bg-white text-[var(--color-text)] px-8 pt-8 flex flex-col justify-between pb-12 shadow-lg border-t border-[rgba(10, 25, 47,0.15)]"
          >
            {/* Nav List */}
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display text-xl font-medium tracking-wide border-b border-[rgba(10, 25, 47,0.1)] pb-3 hover:text-[var(--color-navy)] transition-colors lowercase"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/verify"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2.5 font-display text-xl font-medium tracking-wide border-b border-[rgba(10, 25, 47,0.1)] pb-3 text-[var(--color-navy)] lowercase"
              >
                <ShieldCheckIcon size={20} color="var(--color-navy)" strokeWidth={1.5} />
                verify batch
              </Link>
            </nav>

            {/* Bottom details */}
            <div className="flex flex-col gap-4 text-center">
              <p className="font-sans text-[9px] tracking-wider opacity-60 uppercase">
                authenticity & wellness
              </p>
              <div className="flex justify-center gap-4 text-xs opacity-50">
                <span>cGMP Manufactured</span>
                <span>•</span>
                <span>USDA Organic</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Navbar;

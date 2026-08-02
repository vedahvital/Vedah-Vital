import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ShieldCheck, Sparkles, FileText, Mail, Leaf } from 'lucide-react';
import MagnifierIcon from './icons/magnifier-icon';

interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: 'Product' | 'Verification' | 'Science' | 'Company' | 'Support';
  path: string;
  icon: React.ReactNode;
  tags: string[];
}

const SEARCH_ITEMS: SearchItem[] = [
  {
    id: 'product-ashwagandha',
    title: 'KSM-66® Organic Ashwagandha',
    description: '600mg full-spectrum root extract standardized to 5% withanolides with BioPerine®.',
    category: 'Product',
    path: '/',
    icon: <Leaf className="w-4 h-4 text-emerald-600" />,
    tags: ['ashwagandha', 'ksm66', 'root', 'extract', 'withanolides', 'bioperine', 'supplement', 'capsules']
  },
  {
    id: 'verify-batch',
    title: 'Verify Batch & Certificate of Analysis (CoA)',
    description: 'Check 3rd-party lab test results, heavy metal screening, and product authenticity.',
    category: 'Verification',
    path: '/verify',
    icon: <ShieldCheck className="w-4 h-4 text-[var(--color-navy)]" />,
    tags: ['verify', 'verification', 'batch', 'coa', 'lab', 'report', 'testing', 'authenticity', 'certificate', 'code']
  },
  {
    id: 'about-story',
    title: 'Our Story & Clinical Standards',
    description: 'Discover Vedah Vital commitment to evidence-based wellness and clean label principles.',
    category: 'Company',
    path: '/about',
    icon: <Sparkles className="w-4 h-4 text-amber-600" />,
    tags: ['about', 'story', 'standards', 'clinical', 'philosophy', 'clean label', 'evidence', 'research']
  },
  {
    id: 'contact-support',
    title: 'Contact Support & Inquiries',
    description: 'Reach out to our customer care team for orders, questions, or medical inquiries.',
    category: 'Support',
    path: '/contact',
    icon: <Mail className="w-4 h-4 text-blue-600" />,
    tags: ['contact', 'support', 'help', 'email', 'phone', 'customer care', 'faq']
  },
  {
    id: 'science-withanolides',
    title: '5% Withanolides Bioactive Potency',
    description: 'Learn why root-only extraction yields high-concentration active adaptogens.',
    category: 'Science',
    path: '/about',
    icon: <FileText className="w-4 h-4 text-purple-600" />,
    tags: ['withanolides', 'potency', 'bioactive', 'adaptogen', 'stress', 'cortisol', 'science']
  },
  {
    id: 'verify-cgmp',
    title: 'cGMP & ISO Facility Certifications',
    description: 'Manufactured under strict FDA-registered quality control standards.',
    category: 'Verification',
    path: '/verify',
    icon: <ShieldCheck className="w-4 h-4 text-[var(--color-navy)]" />,
    tags: ['cgmp', 'iso', 'fda', 'facility', 'quality', 'manufacturing', 'purity']
  }
];

const POPULAR_TAGS = ['Ashwagandha', 'Verify Batch', 'Lab Results', 'Withanolides', 'Contact Us'];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredItems = query.trim() === ''
    ? []
    : SEARCH_ITEMS.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q))
        );
      });

  const handleSelect = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 z-10 flex flex-col max-h-[80vh]"
          >
            {/* Input Bar */}
            <div className="relative flex items-center px-5 py-4 border-b border-gray-100 bg-gray-50/50">
              <div className="text-gray-400 mr-3.5 flex items-center">
                <MagnifierIcon size={20} color="currentColor" strokeWidth={2.2} />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, lab verification, ingredients..."
                className="w-full bg-transparent font-sans text-base text-[var(--color-heading)] placeholder:text-gray-400 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors mr-2 focus:outline-none"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="px-2.5 py-1 text-xs font-sans font-semibold text-gray-500 bg-gray-200/70 hover:bg-gray-200 rounded-md transition-colors focus:outline-none"
              >
                ESC
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-5">
              {query.trim() === '' ? (
                <div>
                  <p className="font-sans text-xs font-bold tracking-wider text-gray-400 uppercase mb-3">
                    Popular Searches
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {POPULAR_TAGS.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="font-sans text-xs font-medium text-[var(--color-navy)] bg-[var(--color-navy-light)] hover:bg-[var(--color-navy)] hover:text-white transition-colors px-3 py-1.5 rounded-full cursor-pointer"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  <p className="font-sans text-xs font-bold tracking-wider text-gray-400 uppercase mb-3">
                    Quick Navigation
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SEARCH_ITEMS.slice(0, 4).map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleSelect(item.path)}
                        className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm cursor-pointer transition-all group"
                      >
                        <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors">
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-sans text-xs font-bold text-[var(--color-heading)] truncate group-hover:text-[var(--color-navy)] transition-colors">
                            {item.title}
                          </p>
                          <p className="font-sans text-[11px] text-gray-400 truncate">
                            {item.category}
                          </p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[var(--color-navy)] group-hover:translate-x-0.5 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : filteredItems.length > 0 ? (
                <div className="space-y-2">
                  <p className="font-sans text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">
                    Search Results ({filteredItems.length})
                  </p>
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item.path)}
                      className="flex items-start gap-3.5 p-3.5 rounded-xl border border-gray-100 hover:border-[var(--color-navy)]/30 hover:bg-gray-50/70 cursor-pointer transition-all group"
                    >
                      <div className="p-2.5 rounded-lg bg-gray-100/80 group-hover:bg-[var(--color-navy-light)] transition-colors mt-0.5">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-sans text-sm font-bold text-[var(--color-heading)] group-hover:text-[var(--color-navy)] transition-colors truncate">
                            {item.title}
                          </h4>
                          <span className="font-sans text-[10px] font-semibold tracking-wider text-gray-400 uppercase px-2 py-0.5 rounded bg-gray-100 group-hover:bg-white transition-colors shrink-0">
                            {item.category}
                          </span>
                        </div>
                        <p className="font-sans text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="font-sans text-sm font-semibold text-gray-600">
                    No matching results for "{query}"
                  </p>
                  <p className="font-sans text-xs text-gray-400 mt-1">
                    Try searching for "ashwagandha", "verify", "lab results", or "standards".
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between text-[11px] font-sans text-gray-400">
              <span>Vedah Vital Search</span>
              <span>Press <kbd className="px-1.5 py-0.5 bg-white border rounded shadow-xs text-gray-600 font-mono text-[10px]">ESC</kbd> to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;

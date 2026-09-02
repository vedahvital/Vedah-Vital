import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  Mail, 
  Leaf, 
  FlaskConical, 
  HelpCircle, 
  Award, 
  Clock, 
  Compass, 
  Star,
  CheckCircle2,
  PackageCheck
} from 'lucide-react';
import MagnifierIcon from './icons/magnifier-icon';

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: 'Product' | 'Verification' | 'Science' | 'Company' | 'Support' | 'FAQ' | 'Usage';
  path: string;
  icon: React.ReactNode;
  tags: string[];
}

export const SEARCH_ITEMS: SearchItem[] = [
  {
    id: 'product-ashwagandha',
    title: 'KSM-66® Organic Ashwagandha',
    description: '600mg full-spectrum root extract standardized to 5% withanolides with BioPerine® for maximum bioavailability.',
    category: 'Product',
    path: '/',
    icon: <Leaf className="w-4 h-4 text-emerald-600" />,
    tags: [
      'ashwagandha', 'ksm66', 'ksm-66', 'root', 'extract', 'withanolides', 'bioperine', 
      'supplement', 'capsules', 'organic', 'stress', 'cortisol', 'sleep', 'anxiety', 
      'calm', 'energy', 'vitality', 'testosterone', 'mood', 'endurance', 'adaptogen', 
      'focus', 'memory', 'thyroid', 'buy', 'price', 'order'
    ]
  },
  {
    id: 'verify-batch',
    title: 'Verify Batch & Certificate of Analysis (CoA)',
    description: 'Check 3rd-party lab test results, heavy metal screening, purity, and product authenticity with your lot number.',
    category: 'Verification',
    path: '/verify',
    icon: <ShieldCheck className="w-4 h-4 text-[var(--color-navy)]" />,
    tags: [
      'verify', 'verification', 'batch', 'coa', 'lab', 'report', 'testing', 'authenticity', 
      'certificate', 'code', 'lot number', 'qr code', 'scanner', 'serial', 'genuine', 'check'
    ]
  },
  {
    id: 'science-withaferin',
    title: 'Withaferin A Difference & Root Purity',
    description: 'Why root-only extraction keeps cytotoxic Withaferin A ≤ 0.1% for human safety versus toxic leaf-based powders.',
    category: 'Science',
    path: '/#comparison',
    icon: <FileText className="w-4 h-4 text-purple-600" />,
    tags: [
      'withaferin', 'withaferin a', 'withanolides', 'potency', 'comparison', 'safety', 
      'root', 'leaf', 'toxicity', 'cytotoxicity', 'standard root', 'whole body', 'clean'
    ]
  },
  {
    id: 'science-ingredients',
    title: 'Ingredients & BioPerine® Absorption Synergy',
    description: 'Standardized 95% Piperine black pepper extract boosts active withanolide absorption by up to 30%.',
    category: 'Science',
    path: '/#ingredients',
    icon: <FlaskConical className="w-4 h-4 text-teal-600" />,
    tags: [
      'ingredients', 'bioperine', 'black pepper', 'piperine', 'absorption', 'synergy', 
      'formulation', 'bioavailability', 'digestive', 'formula', 'ratio'
    ]
  },
  {
    id: 'science-clinical',
    title: 'Clinical Studies & Scientific Evidence',
    description: 'Backed by 20+ gold-standard double-blind human clinical trials on stress, sleep architecture, and cortisol balance.',
    category: 'Science',
    path: '/#purity-standards',
    icon: <Award className="w-4 h-4 text-indigo-600" />,
    tags: [
      'clinical', 'trials', 'studies', 'research', 'evidence', 'science', 'human studies', 
      'double blind', 'placebo', 'validated', 'efficacy', 'published', 'data', 'standards'
    ]
  },
  {
    id: 'product-capsules',
    title: '100% Plant-Based Cellulose Capsules (Vegan)',
    description: 'Allergen-free vegetable capsules derived from pine cellulose. Zero bovine gelatin, gluten, soy, dairy, or binders.',
    category: 'Product',
    path: '/#purity-standards',
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
    tags: [
      'vegan', 'vegetarian', 'capsules', 'plant based', 'cellulose', 'gluten free', 
      'dairy free', 'soy free', 'non-gmo', 'non gmo', 'allergens', 'kosher', 'halal', 
      'clean label', 'pine bark', 'hypoallergenic'
    ]
  },
  {
    id: 'verify-cgmp',
    title: 'cGMP & ISO Facility Certifications',
    description: 'Manufactured under strict FDA-registered, ISO 9001 and cGMP pharmaceutical-grade quality control standards.',
    category: 'Verification',
    path: '/verify',
    icon: <ShieldCheck className="w-4 h-4 text-[var(--color-navy)]" />,
    tags: [
      'cgmp', 'iso', 'fda', 'facility', 'quality', 'manufacturing', 'purity', 
      'certified', 'certification', 'standards', 'clean room', 'inspection'
    ]
  },
  {
    id: 'verify-heavymetals',
    title: 'Heavy Metal & Microbial Screening',
    description: 'Independent ISO 17025 lab screening for lead, mercury, arsenic, cadmium, yeast, and pathogenic mold.',
    category: 'Verification',
    path: '/verify',
    icon: <FlaskConical className="w-4 h-4 text-amber-600" />,
    tags: [
      'heavy metals', 'lead', 'mercury', 'arsenic', 'cadmium', 'microbial', 
      'yeast', 'mold', 'bacteria', 'lab test', 'safety', 'purity', 'icp-ms', 'contaminants'
    ]
  },
  {
    id: 'usage-dosage',
    title: 'Recommended Dosage & How to Use',
    description: 'Take 1 to 2 capsules daily with water or warm milk after meals. Adaptogenic effects build cumulatively.',
    category: 'Usage',
    path: '/#faq',
    icon: <Clock className="w-4 h-4 text-blue-600" />,
    tags: [
      'dosage', 'how to use', 'how to take', 'directions', 'instructions', 'serving', 
      'capsules per day', 'morning', 'night', 'evening', 'timing', 'usage', 'when to take', 
      'side effects', 'safety'
    ]
  },
  {
    id: 'faq-results',
    title: 'Timeline to See Results (30–60 Days)',
    description: 'Noticeable relaxation and sleep quality within week 1; peak cortisol and cognitive resilience in 30-60 days.',
    category: 'FAQ',
    path: '/#faq',
    icon: <HelpCircle className="w-4 h-4 text-rose-600" />,
    tags: [
      'results', 'timeline', 'how long', 'benefits', 'working', 'effective', 
      'cumulative', 'expectations', 'days', 'weeks', 'faq', 'questions'
    ]
  },
  {
    id: 'about-story',
    title: 'Our Story & Clinical Standards',
    description: 'Discover Vedah Vital commitment to evidence-based wellness, ancient Ayurvedic heritage, and clean label principles.',
    category: 'Company',
    path: '/about',
    icon: <Sparkles className="w-4 h-4 text-amber-600" />,
    tags: [
      'about', 'story', 'standards', 'clinical', 'philosophy', 'clean label', 
      'evidence', 'research', 'heritage', 'ayurveda', 'origins', 'mission', 'founder'
    ]
  },
  {
    id: 'about-pillars',
    title: 'The Four Pillars of Vedah Vital',
    description: 'Radical Transparency, Pure Botanical Sourcing, Clinical Validation, and Clean Formulation.',
    category: 'Company',
    path: '/#pillars',
    icon: <Compass className="w-4 h-4 text-[var(--color-navy)]" />,
    tags: [
      'four pillars', 'pillars', 'principles', 'transparency', 'sourcing', 
      'validation', 'formulation', 'values', 'core', 'philosophy'
    ]
  },
  {
    id: 'about-pilljourney',
    title: 'Farm-to-Bottle Pill Journey',
    description: 'Follow our sustainable sourcing from Rajasthan organic farms, green extraction, to lab verification.',
    category: 'Company',
    path: '/#journey',
    icon: <PackageCheck className="w-4 h-4 text-emerald-600" />,
    tags: [
      'journey', 'pill journey', 'farm to bottle', 'traceability', 'farming', 
      'rajasthan', 'sustainable', 'supply chain', 'origins', 'harvest'
    ]
  },
  {
    id: 'company-reviews',
    title: 'Customer Reviews & Real Experiences',
    description: 'Rated 4.9/5 stars by 180+ verified buyers, wellness practitioners, and Ayurvedic experts.',
    category: 'Company',
    path: '/#testimonials',
    icon: <Star className="w-4 h-4 text-amber-500" />,
    tags: [
      'reviews', 'testimonials', 'ratings', 'feedback', 'customer reviews', 
      'stars', 'experiences', 'verified buyer', 'opinions'
    ]
  },
  {
    id: 'contact-support',
    title: 'Contact Support & Care Team',
    description: 'Reach out to our customer care team for orders, questions, batch assistance, or medical inquiries.',
    category: 'Support',
    path: '/contact',
    icon: <Mail className="w-4 h-4 text-blue-600" />,
    tags: [
      'contact', 'support', 'help', 'email', 'phone', 'customer care', 'faq', 
      'assistance', 'orders', 'shipping', 'returns', 'refund', 'inquiry'
    ]
  }
];

const POPULAR_TAGS = [
  { label: 'Ashwagandha', path: '/', query: 'ashwagandha' },
  { label: 'Verify Batch', path: '/verify', query: 'verify' },
  { label: 'Lab Results', path: '/verify', query: 'lab' },
  { label: 'Withanolides', path: '/#comparison', query: 'withanolides' },
  { label: 'Dosage & Usage', path: '/#faq', query: 'dosage' },
  { label: 'Sleep & Stress', path: '/', query: 'sleep' },
  { label: 'Vegan / Capsules', path: '/#purity-standards', query: 'vegan' },
  { label: 'Our Standards', path: '/about', query: 'standards' }
];

const CATEGORIES = ['All', 'Product', 'Verification', 'Science', 'FAQ', 'Company', 'Support'] as const;

// Text normalization helper
const normalize = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[number]>('All');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      document.body.style.overflow = 'hidden';
      setSelectedIndex(0);
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setSelectedCategory('All');
      setSelectedIndex(0);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSelect = (path: string) => {
    onClose();
    if (path.includes('#')) {
      const [targetPath, hash] = path.split('#');
      const route = targetPath || '/';
      navigate(route);
      setTimeout(() => {
        const element = document.getElementById(hash) || document.querySelector(`#${hash}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      navigate(path);
    }
  };

  // Smart multi-token scoring & filtering
  const filteredItems = useMemo(() => {
    const rawTrimmed = query.trim();
    if (!rawTrimmed) return [];

    const normQuery = normalize(rawTrimmed);
    const tokens = normQuery.split(' ').filter(Boolean);
    if (tokens.length === 0) return [];

    const scored = SEARCH_ITEMS.map((item) => {
      // Category filter check
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return { item, score: 0 };
      }

      const normTitle = normalize(item.title);
      const normDesc = normalize(item.description);
      const normCat = normalize(item.category);
      const normTags = item.tags.map(normalize).join(' ');

      let score = 0;
      let matchedTokens = 0;

      // Exact phrase matches
      if (normTitle.includes(normQuery)) score += 150;
      if (normTags.includes(normQuery)) score += 120;
      if (normDesc.includes(normQuery)) score += 60;

      // Token-level scoring
      for (const token of tokens) {
        let matched = false;

        // Exact token in title
        if (normTitle.split(' ').includes(token)) {
          score += 45;
          matched = true;
        } else if (normTitle.includes(token)) {
          score += 30;
          matched = true;
        }

        // Tags matching
        if (item.tags.some(t => normalize(t) === token)) {
          score += 40;
          matched = true;
        } else if (normTags.includes(token)) {
          score += 25;
          matched = true;
        }

        // Description match
        if (normDesc.split(' ').includes(token)) {
          score += 20;
          matched = true;
        } else if (normDesc.includes(token)) {
          score += 15;
          matched = true;
        }

        // Category match
        if (normCat.includes(token)) {
          score += 20;
          matched = true;
        }

        // Prefix / Stem matching (e.g., 'withan' matches 'withanolides')
        if (!matched && token.length >= 3) {
          if (normTitle.split(' ').some(w => w.startsWith(token))) {
            score += 25;
            matched = true;
          } else if (normTags.split(' ').some(w => w.startsWith(token))) {
            score += 20;
            matched = true;
          } else if (normDesc.split(' ').some(w => w.startsWith(token))) {
            score += 10;
            matched = true;
          }
        }

        if (matched) matchedTokens++;
      }

      // Bonus for matching all search tokens
      if (matchedTokens === tokens.length) {
        score += 60;
      }

      return { item, score: matchedTokens > 0 ? score : 0 };
    });

    return scored
      .filter(entry => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(entry => entry.item);
  }, [query, selectedCategory]);

  // Reset selected index when query or results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, selectedCategory]);

  // Keyboard navigation
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredItems.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = filteredItems[selectedIndex] || filteredItems[0];
      if (target) {
        handleSelect(target.path);
      }
    }
  };

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Auto-scroll selected item into view
  useEffect(() => {
    if (resultsContainerRef.current) {
      const activeElement = resultsContainerRef.current.querySelector('[data-selected="true"]');
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-start justify-center pt-12 sm:pt-20 px-4"
          onClick={onClose}
          onTouchEnd={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 z-10 flex flex-col max-h-[85vh]"
          >
            {/* Input Bar */}
            <div className="relative flex items-center px-5 py-4 border-b border-gray-100 bg-gray-50/70">
              <div className="text-gray-400 mr-3.5 flex items-center shrink-0">
                <MagnifierIcon size={20} color="currentColor" strokeWidth={2.2} />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Search products, lab verification, ingredients, FAQs..."
                className="w-full bg-transparent font-sans text-base text-[var(--color-heading)] placeholder:text-gray-400 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors mr-1 focus:outline-none cursor-pointer shrink-0"
                  aria-label="Clear search query"
                  title="Clear text"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              {/* Close Modal Cross Button */}
              <button
                onClick={onClose}
                className="p-1.5 text-gray-400 hover:text-[var(--color-navy)] hover:bg-gray-200/60 rounded-full transition-colors focus:outline-none cursor-pointer shrink-0 ml-1"
                aria-label="Close search"
                title="Close"
              >
                <X className="w-5 h-5 stroke-[2.2]" />
              </button>
            </div>

            {/* Category Filter Tabs (visible when searching) */}
            {query.trim() !== '' && (
              <div className="flex items-center gap-1.5 px-5 py-2.5 bg-gray-50/40 border-b border-gray-100 overflow-x-auto no-scrollbar text-xs">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[var(--color-navy)] text-white shadow-xs'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200/70'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {/* Content Body */}
            <div ref={resultsContainerRef} className="flex-1 overflow-y-auto p-5">
              {query.trim() === '' ? (
                <div>
                  <p className="font-sans text-xs font-bold tracking-wider text-gray-400 uppercase mb-3">
                    Popular Searches
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {POPULAR_TAGS.map((tag) => (
                      <button
                        key={tag.label}
                        onClick={() => handleSelect(tag.path)}
                        className="font-sans text-xs font-medium text-[var(--color-navy)] bg-[var(--color-navy-light)] hover:bg-[var(--color-navy)] hover:text-white transition-colors px-3 py-1.5 rounded-full cursor-pointer flex items-center gap-1.5 group"
                      >
                        <span>{tag.label}</span>
                        <ArrowRight className="w-3 h-3 text-[var(--color-navy)] group-hover:text-white transition-colors opacity-70" />
                      </button>
                    ))}
                  </div>

                  <p className="font-sans text-xs font-bold tracking-wider text-gray-400 uppercase mb-3">
                    Quick Navigation
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SEARCH_ITEMS.slice(0, 6).map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleSelect(item.path)}
                        className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-xs cursor-pointer transition-all group"
                      >
                        <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors shrink-0">
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
                        <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[var(--color-navy)] group-hover:translate-x-0.5 transition-all shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : filteredItems.length > 0 ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-sans text-xs font-bold tracking-wider text-gray-400 uppercase">
                      Search Results ({filteredItems.length})
                    </p>
                    <span className="text-[10px] text-gray-400 hidden sm:inline">Use ↑ ↓ and ↵ to navigate</span>
                  </div>
                  {filteredItems.map((item, index) => {
                    const isSelected = index === selectedIndex;
                    return (
                      <div
                        key={item.id}
                        data-selected={isSelected}
                        onClick={() => handleSelect(item.path)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`flex items-start gap-3.5 p-3.5 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[var(--color-navy)] bg-blue-50/40 shadow-xs'
                            : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50/70'
                        }`}
                      >
                        <div className={`p-2.5 rounded-lg shrink-0 mt-0.5 transition-colors ${
                          isSelected ? 'bg-white shadow-xs' : 'bg-gray-100/80'
                        }`}>
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className={`font-sans text-sm font-bold truncate transition-colors ${
                              isSelected ? 'text-[var(--color-navy)]' : 'text-[var(--color-heading)]'
                            }`}>
                              {item.title}
                            </h4>
                            <span className="font-sans text-[10px] font-semibold tracking-wider text-gray-400 uppercase px-2 py-0.5 rounded bg-gray-100 shrink-0">
                              {item.category}
                            </span>
                          </div>
                          <p className="font-sans text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <ArrowRight className={`w-4 h-4 shrink-0 mt-2 transition-all ${
                          isSelected ? 'text-[var(--color-navy)] translate-x-1' : 'text-gray-300'
                        }`} />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-10 text-center">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3 text-gray-400">
                    <MagnifierIcon size={22} color="currentColor" strokeWidth={1.8} />
                  </div>
                  <p className="font-sans text-sm font-semibold text-gray-700">
                    No matching results for "{query}"
                  </p>
                  <p className="font-sans text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                    Try searching for terms like "ashwagandha", "verify batch", "dosage", "sleep", "withanolides", or "vegan".
                  </p>

                  <div className="mt-6 pt-5 border-t border-gray-100">
                    <p className="font-sans text-xs font-bold tracking-wider text-gray-400 uppercase mb-3">
                      Try One of These Suggestions:
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {['Ashwagandha', 'Verify Batch', 'Dosage', 'Sleep & Stress', 'Certifications'].map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => setQuery(suggestion.toLowerCase())}
                          className="font-sans text-xs text-gray-600 bg-gray-100 hover:bg-[var(--color-navy)] hover:text-white px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/70 flex items-center justify-between text-[11px] font-sans text-gray-400">
              <span>Vedah Vital Search</span>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline">Navigate <kbd className="px-1.5 py-0.5 bg-white border rounded shadow-2xs text-gray-600 font-mono text-[10px]">↑</kbd> <kbd className="px-1.5 py-0.5 bg-white border rounded shadow-2xs text-gray-600 font-mono text-[10px]">↓</kbd></span>
                <span>Select <kbd className="px-1.5 py-0.5 bg-white border rounded shadow-2xs text-gray-600 font-mono text-[10px]">↵</kbd></span>
                <span>Close <kbd className="px-1.5 py-0.5 bg-white border rounded shadow-2xs text-gray-600 font-mono text-[10px]">ESC</kbd></span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { Button } from '../components/ui/Button';

const contactDetails = [
  {
    icon: Mail,
    label: 'Email Us',
    value: 'info@vedahvital.com',
    isLink: true,
    href: 'mailto:info@vedahvital.com',
  },
];

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', batchCode: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', batchCode: '', message: '' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const inputCls = `w-full py-3.5 px-4 font-sans text-sm transition-all focus:outline-none border border-[rgba(10, 25, 47,0.18)] bg-white/45 backdrop-blur-md focus:bg-white focus:border-[var(--color-navy)]/50 rounded-xl placeholder-[rgba(10, 25, 47,0.4)] text-[var(--color-heading)]`;

  return (
    <>
      <Helmet>
        <title>Contact Us — Vedah Vital | Customer Support & Batch Queries</title>
        <meta
          name="description"
          content="Get in touch with Vedah Vital support for batch reports, purity certifications, bulk inquiries, or product guidance."
        />
      </Helmet>

      <Navbar />

      <main className="flex-grow bg-white text-[var(--color-text)]">

        {/* Hero Banner */}
        <section className="pt-36 pb-20 text-center relative overflow-clip bg-[var(--color-navy-light)] border-b border-[rgba(10, 25, 47,0.15)]">

                              <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-12 relative z-10">
            <AnimatedSection className="flex flex-col items-center gap-4">
              <span className="eyebrow text-[var(--color-navy)]">GET IN TOUCH</span>
              <h1 className="heading-condensed text-5xl md:text-7xl text-[var(--color-heading)] tracking-wide">
                contact us
              </h1>
              <p className="font-sans text-sm md:text-base text-[var(--color-text)] opacity-85 font-light leading-relaxed max-w-xl mx-auto mt-2">
                Have questions about our batch reports, dosage, or sourcing methods? Send us a message, and our Apothecary support team will respond within 24 hours.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 md:py-28 relative overflow-clip">
                    
          <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-12 relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 max-w-5xl mx-auto items-stretch glass-card-navy border border-white/40 shadow-md overflow-hidden rounded-3xl">

              {/* Left Column: Contact Details */}
              <AnimatedSection className="lg:col-span-5 p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-[rgba(10, 25, 47,0.15)] bg-[var(--color-navy-light)]/40 flex flex-col justify-between gap-8">
                <div>
                  <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-[var(--color-heading)] mb-8">
                    Information & Support
                  </h3>

                  <div className="flex flex-col gap-8">
                    {contactDetails.map(({ icon: Icon, label, value, isLink, href }) => (
                      <div key={label} className="flex items-start gap-4">
                        <span className="w-10 h-10 flex items-center justify-center shrink-0 mt-0.5 text-[var(--color-navy)] clay-circle-navy transition-all duration-300 shadow-sm">
                          <Icon className="w-4 h-4" />
                        </span>
                        <div>
                          <span className="text-[9px] font-sans font-semibold uppercase tracking-widest block text-[var(--color-navy)] mb-1">
                            {label}
                          </span>
                          {isLink ? (
                            <a
                              href={href}
                              className="font-sans text-sm font-semibold text-[var(--color-heading)] hover:text-[var(--color-navy)] transition-colors"
                            >
                              {value}
                            </a>
                          ) : (
                            <p className="font-sans text-sm font-light text-[var(--color-text)] whitespace-pre-line leading-relaxed">
                              {value}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[rgba(10, 25, 47,0.15)] pt-6">
                  <span className="text-[9px] font-sans font-semibold tracking-widest uppercase block text-[var(--color-navy)] mb-2">
                    Batch Verification Support
                  </span>
                  <p className="text-xs font-light leading-relaxed text-[var(--color-text)] opacity-80">
                    For issues regarding COA reports or missing batch numbers, please specify your batch code directly in the form message.
                  </p>
                </div>
              </AnimatedSection>

              {/* Right Column: Form Panel */}
              <AnimatedSection className="lg:col-span-7 p-8 md:p-10 bg-white/20 flex flex-col justify-center relative">

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="contact-form"
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-6 text-left"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {[
                        { id: 'name', label: 'Full Name *', type: 'text', required: true, placeholder: 'John Doe', maxLength: 100 },
                        { id: 'email', label: 'Email Address *', type: 'email', required: true, placeholder: 'john@example.com', maxLength: 100 },
                        { id: 'batchCode', label: 'Bottle Batch Code (Optional)', type: 'text', required: false, placeholder: 'e.g. VV-ASH-2026-001', maxLength: 20 },
                      ].map(({ id, label, type, required, placeholder, maxLength }) => (
                        <div key={id}>
                          <label
                            htmlFor={id}
                            className="block text-[10px] font-sans font-semibold uppercase tracking-widest text-[var(--color-navy)] mb-2"
                          >
                            {label}
                          </label>
                          <input
                            type={type}
                            id={id}
                            name={id}
                            required={required}
                            value={(formData as Record<string, string>)[id]}
                            onChange={handleChange}
                            maxLength={maxLength}
                            className={inputCls}
                            placeholder={placeholder}
                          />
                        </div>
                      ))}

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-[10px] font-sans font-semibold uppercase tracking-widest text-[var(--color-navy)] mb-2"
                        >
                          Your Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={4}
                          maxLength={1000}
                          value={formData.message}
                          onChange={handleChange}
                          className={inputCls + ' resize-none'}
                          placeholder="Type your question or request here..."
                        />
                      </div>

                      <Button
                        type="submit"
                        variant="primary"
                        disabled={isSubmitting}
                        className="mt-2 w-full sm:w-auto self-start"
                      >
                        {isSubmitting ? (
                          <span>Sending message...</span>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success-message"
                      className="flex flex-col items-center justify-center text-center py-12 gap-4"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <CheckCircle2 className="w-14 h-14 stroke-[1.25] text-[var(--color-navy)]" />
                      <h3 className="font-display text-2xl font-medium text-[var(--color-heading)] lowercase">
                        message sent successfully.
                      </h3>
                      <p className="font-sans text-sm font-light leading-relaxed max-w-sm text-[var(--color-text)] opacity-85">
                        Thank you for contacting Vedah Vital. Our Apothecary support specialists will review your submission and contact you shortly.
                      </p>
                      <Button variant="outline" onClick={() => setIsSubmitted(false)} className="mt-4">
                        Send Another Message
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </AnimatedSection>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};
export default Contact;

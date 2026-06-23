import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ShieldCheck, Search, Download, AlertCircle, FileSpreadsheet, FlaskConical, Award, QrCode, Camera, X } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { LAB_REPORTS, type LabTestReport } from '../lib/mockData';
import { AnimatedSection } from '../components/ui/AnimatedSection';

export const Verify: React.FC = () => {
  const [code, setCode] = useState(() => {
    if (typeof window === 'undefined') return '';
    const params = new URLSearchParams(window.location.search);
    const batchParam = params.get('batch');
    const sourceParam = params.get('source');
    if (sourceParam === 'qr' && batchParam) {
      return batchParam.trim().toUpperCase();
    }
    return '';
  });
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<LabTestReport | null>(() => {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(window.location.search);
    const batchParam = params.get('batch');
    const sourceParam = params.get('source');
    if (sourceParam === 'qr' && batchParam) {
      const query = batchParam.trim().toUpperCase();
      return LAB_REPORTS[query] || null;
    }
    return null;
  });
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    const batchParam = params.get('batch');
    const sourceParam = params.get('source');
    if (sourceParam === 'qr' && batchParam) {
      const query = batchParam.trim().toUpperCase();
      return !!LAB_REPORTS[query];
    }
    return false;
  });
  const [showScanner, setShowScanner] = useState(false);
  const [qrModalStatus, setQrModalStatus] = useState<'genuine' | 'fake' | null>(() => {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(window.location.search);
    const batchParam = params.get('batch');
    const sourceParam = params.get('source');
    if (sourceParam === 'qr' && batchParam) {
      const query = batchParam.trim().toUpperCase();
      return LAB_REPORTS[query] ? 'genuine' : 'fake';
    }
    return null;
  });
  const [qrScannedBatch, setQrScannedBatch] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(window.location.search);
    const batchParam = params.get('batch');
    const sourceParam = params.get('source');
    if (sourceParam === 'qr' && batchParam) {
      return batchParam.trim().toUpperCase();
    }
    return null;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const batchParam = params.get('batch');
    const sourceParam = params.get('source');

    if (sourceParam === 'qr' && batchParam) {
      // Clean query params from address bar
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = code.trim().toUpperCase();
    if (!query) return;

    setLoading(true);
    setError(null);
    setReport(null);
    setHasSearched(true);

    setTimeout(() => {
      setLoading(false);
      const foundReport = LAB_REPORTS[query];
      if (foundReport) {
        setReport(foundReport);
      } else {
        setError('Batch code not found. Please double-check the code printed near the barcode on your bottle (e.g. VV-ASH-2026-001).');
      }
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Batch Verification — Vedah Vital | Certificate of Analysis Portal</title>
        <meta
          name="description"
          content="Verify the purity and potency of your Vedah Vital Ashwagandha bottle. Input your batch number to access third-party lab analysis reports."
        />
      </Helmet>

      <Navbar />

      <main className="flex-grow bg-white text-[var(--color-text)]">

        {/* Hero Banner */}
        <section className="pt-36 pb-20 text-center relative overflow-hidden bg-[var(--color-navy-light)] border-b border-[rgba(10, 25, 47,0.15)]">
          {/* Watermark - darkened */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-watermark pointer-events-none select-none opacity-65 whitespace-nowrap">
            verify your product
          </div>

                              <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-12 relative z-10">
            <AnimatedSection className="flex flex-col items-center gap-4">
              <span className="eyebrow text-[var(--color-navy)]">LABORATORY TRANSPARENCY</span>
              <h1 className="heading-condensed text-5xl md:text-7xl text-[var(--color-heading)] tracking-wide">
                verify authenticity
              </h1>
              <p className="font-sans text-sm md:text-base text-[var(--color-text)] opacity-85 font-light leading-relaxed max-w-xl mx-auto mt-2">
                We test every single production batch in an independent laboratory. Enter the batch code printed on your bottle to retrieve the active potency and heavy metals analysis.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Search & Results Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
                    
          <div className="max-w-[var(--max-width)] mx-auto px-6 md:px-12 relative z-10">

            {/* Search Bar Panel - Pill styled for visual consistency */}
            <AnimatedSection className="max-w-xl mx-auto mb-12">
              <form
                onSubmit={handleSearch}
                className="flex gap-2 p-1.5 border border-white/40 bg-white/45 backdrop-blur-md glass-card-navy rounded-full shadow-sm items-center overflow-hidden"
              >
                <div className="flex items-center gap-2.5 flex-grow pl-3">
                  <Search className="w-5 h-5 shrink-0 text-[var(--color-navy)]" />
                  <input
                    type="text"
                    id="batch-code-input"
                    name="batchCode"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="e.g. VV-ASH-2026-001"
                    className="w-full bg-transparent font-sans text-sm focus:outline-none text-[var(--color-heading)] placeholder-[rgba(10, 25, 47,0.4)]"
                  />
                  <button
                    type="button"
                    title="Scan QR Code"
                    onClick={() => setShowScanner(true)}
                    className="p-1.5 hover:bg-[rgba(10,25,47,0.05)] text-[var(--color-navy)] rounded-full transition-colors shrink-0 mr-1 focus:outline-none flex items-center justify-center"
                  >
                    <QrCode className="w-5 h-5" />
                  </button>
                </div>
                <Button type="submit" variant="primary" className="py-2.5 px-6 shrink-0">
                  Verify
                </Button>
              </form>
              <div className="text-center mt-3">
                <span className="text-[11px] font-sans tracking-wider text-[var(--color-text)] opacity-70">
                  Try:{' '}
                  <span
                    className="underline cursor-pointer font-semibold text-[var(--color-navy)]"
                    onClick={() => setCode('VV-ASH-2026-001')}
                  >
                    VV-ASH-2026-001
                  </span>{' '}
                  or{' '}
                  <span
                    className="underline cursor-pointer font-semibold text-[var(--color-navy)]"
                    onClick={() => setCode('VV-ASH-2026-002')}
                  >
                    VV-ASH-2026-002
                  </span>
                </span>
              </div>
            </AnimatedSection>

            {/* Results Grid Container */}
            <div className="max-w-4xl mx-auto min-h-[150px]">

              {/* Loading State */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-14 gap-4"
                >
                  <div className="w-9 h-9 border-2 border-[var(--color-navy)] border-t-transparent animate-spin rounded-none" />
                  <p className="font-sans text-xs font-semibold uppercase tracking-widest text-[var(--color-navy)] animate-pulse">
                    Consulting Laboratory Reports...
                  </p>
                </motion.div>
              )}

              {/* Error State */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-red-200 p-8 text-center flex flex-col items-center gap-4 bg-red-50/20"
                >
                  <AlertCircle className="w-12 h-12 text-red-500 stroke-[1.25]" />
                  <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-red-700">Batch Not Recognized</h3>
                  <p className="font-sans text-sm text-red-600 font-light max-w-md leading-relaxed">{error}</p>
                </motion.div>
              )}

              {/* COA Found */}
              {report && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="glass-card-navy p-6 md:p-10 relative overflow-hidden text-left shadow-sm rounded-3xl"
                >

                  <div className="absolute right-6 top-6 pointer-events-none select-none opacity-[0.05] text-[var(--color-navy)]">
                    <Award className="w-28 h-28 stroke-[1]" />
                  </div>

                  {/* Status header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(10, 25, 47,0.15)] pb-6 mb-8">
                    <div>
                      <span className="inline-flex items-center gap-1.5 text-[8px] font-semibold tracking-widest uppercase border border-[var(--color-navy)]/25 bg-[var(--color-navy)]/5 text-[var(--color-navy)] px-3 py-1.5 mb-3">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Authenticity Verified
                      </span>
                      <h2 className="font-sans text-xl font-semibold uppercase tracking-wide text-[var(--color-heading)]">
                        Certificate of Analysis (COA)
                      </h2>
                      <span className="font-sans text-xs font-semibold uppercase tracking-widest block mt-1 text-[var(--color-navy)]">
                        Batch Code: {report.batchCode}
                      </span>
                    </div>

                    <a href={report.certificateUrl} className="focus:outline-none shrink-0">
                      <Button variant="outline" className="py-2.5 px-6 gap-2 text-xs">
                        <Download className="w-4 h-4" />
                        Download Lab PDF
                      </Button>
                    </a>
                  </div>

                  {/* Batch Info Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 border-b border-[rgba(10, 25, 47,0.15)] pb-8">
                    {[
                      { k: 'MFG Date', v: report.mfgDate },
                      { k: 'Exp Date', v: report.expDate },
                      { k: 'Test Date', v: report.analysisDate },
                      { k: 'Organic Purity', v: report.organicPurity.split(' ')[0] + ' Verified' },
                    ].map(({ k, v }) => (
                      <div key={k}>
                        <span className="text-[9px] font-sans font-semibold uppercase tracking-widest block mb-1 text-[var(--color-navy)]">
                          {k}
                        </span>
                        <span className="font-sans text-sm font-semibold text-[var(--color-heading)]">
                          {v}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Assay Results */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Active Potency */}
                    <div className="flex flex-col gap-4">
                      <h3 className="font-sans text-xs tracking-widest font-semibold uppercase border-b border-[rgba(10, 25, 47,0.15)] pb-2 flex items-center gap-2 text-[var(--color-heading)]">
                        <FlaskConical className="w-4 h-4 text-[var(--color-navy)]" />
                        1. Active Potency Assay
                      </h3>
                      {[
                        { k: 'Ashwagandha Withanolides', v: report.withanolides, highlight: true },
                        { k: 'Piperine Absorption Booster', v: report.piperine, highlight: true },
                        { k: 'Organic Purity Certification', v: report.organicPurity, highlight: false },
                      ].map(({ k, v, highlight }) => (
                        <div
                          key={k}
                          className="flex justify-between items-center text-sm py-2 border-t border-[rgba(10, 25, 47,0.1)]"
                        >
                          <span className="font-sans text-xs text-[var(--color-text)] opacity-90">{k}</span>
                          <span className={`font-semibold font-sans text-xs ${highlight ? 'text-[var(--color-navy)]' : 'text-[var(--color-heading)]'}`}>
                            {v}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Heavy Metals */}
                    <div className="flex flex-col gap-4">
                      <h3 className="font-sans text-xs tracking-widest font-semibold uppercase border-b border-[rgba(10, 25, 47,0.15)] pb-2 flex items-center gap-2 text-[var(--color-heading)]">
                        <ShieldCheck className="w-4 h-4 text-[var(--color-navy)]" />
                        2. Heavy Metals & Toxins Audit
                      </h3>
                      <div className="flex justify-between items-center text-sm py-1">
                        <span className="font-sans text-xs text-[var(--color-text)] opacity-90">Heavy Metals Test Status</span>
                        <span className="text-[9px] font-sans font-semibold uppercase bg-[var(--color-navy)]/10 text-[var(--color-navy)] border border-[var(--color-navy)]/25 px-3 py-1">
                          {report.heavyMetals.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs font-sans pl-2 border-t border-[rgba(10, 25, 47,0.1)] pt-3 text-[var(--color-text)] opacity-80">
                        <div>Lead: <span className="font-semibold text-[var(--color-heading)]">{report.heavyMetals.lead.split(' ')[0]}</span></div>
                        <div>Mercury: <span className="font-semibold text-[var(--color-heading)]">{report.heavyMetals.mercury.split(' ')[0]}</span></div>
                        <div>Cadmium: <span className="font-semibold text-[var(--color-heading)]">{report.heavyMetals.cadmium.split(' ')[0]}</span></div>
                        <div>Arsenic: <span className="font-semibold text-[var(--color-heading)]">{report.heavyMetals.arsenic.split(' ')[0]}</span></div>
                      </div>
                    </div>
                  </div>

                  {/* Microbial */}
                  <div className="p-6 border border-[rgba(10, 25, 47,0.15)] bg-[var(--color-navy-light)]/40 relative">
                    <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-[var(--color-navy)]/25" />
                    <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-[var(--color-navy)]/25" />

                    <h4 className="font-sans text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-1.5 text-[var(--color-heading)]">
                      <FileSpreadsheet className="w-4 h-4 text-[var(--color-navy)]" />
                      3. Microbial Screening
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-sans text-[var(--color-text)] opacity-95">
                      <div>Status: <span className="font-semibold text-[var(--color-navy)]">{report.microbial.status}</span></div>
                      <div>E. Coli: <span className="font-semibold text-[var(--color-heading)]">{report.microbial.ecoli.split(' ')[0]}</span></div>
                      <div>Salmonella: <span className="font-semibold text-[var(--color-heading)]">{report.microbial.salmonella.split(' ')[0]}</span></div>
                      <div>Yeast & Mold: <span className="font-semibold text-[var(--color-heading)]">{report.microbial.yeastMold.split(' ')[0]}</span></div>
                    </div>
                  </div>

                  {/* Footer seal */}
                  <div className="mt-8 text-center border-t border-[rgba(10, 25, 47,0.15)] pt-6 text-[9px] font-sans uppercase tracking-[0.2em] text-[var(--color-text)] opacity-70">
                    Verified by Eurofins Accredited Laboratories • cGMP Compliant Facility
                  </div>
                </motion.div>
              )}

              {/* No search yet */}
              {!hasSearched && !loading && (
                <AnimatedSection className="text-center py-14 border border-dashed border-[rgba(10, 25, 47,0.35)] p-8 bg-white shadow-sm">
                  <FlaskConical className="w-10 h-10 mx-auto mb-4 stroke-[1.25] text-[var(--color-navy)] opacity-60 animate-pulse-slow" />
                  <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-[var(--color-heading)] mb-1">
                    Ready for Validation
                  </h3>
                  <p className="font-sans text-xs font-light max-w-sm mx-auto leading-relaxed text-[var(--color-text)] opacity-80">
                    Please enter your 15-character bottle batch number above (usually printed on the back panel or bottom rim of the container).
                  </p>
                </AnimatedSection>
              )}

            </div>
          </div>
        </section>

      </main>

      {renderQrStatusModal()}
      {renderQrScannerModal()}

      <Footer />
    </>
  );

  // Popup verified/fake modal overlay
  function renderQrStatusModal() {
  if (!qrModalStatus) return null;

  const isGenuine = qrModalStatus === 'genuine';
  const reportData = isGenuine && qrScannedBatch ? LAB_REPORTS[qrScannedBatch] : null;

  return (
    <div className="fixed inset-0 bg-black/35 backdrop-blur-[3px] flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white/95 border border-[rgba(10,25,47,0.15)] max-w-md w-full p-8 rounded-3xl relative shadow-2xl text-left"
      >
        {isGenuine ? (
          <>
            {/* Decorative background icon */}
            <div className="absolute right-4 top-4 pointer-events-none opacity-[0.05] text-[var(--color-navy)]">
              <Award className="w-24 h-24 stroke-[1.25]" />
            </div>

            <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/25 flex items-center justify-center mb-6 text-green-600">
              <ShieldCheck className="w-8 h-8 stroke-[1.5]" />
            </div>

            <h3 className="heading-condensed text-3xl text-[var(--color-heading)] tracking-wide mb-2 uppercase">
              Genuine Product Verified
            </h3>
            
            <div className="font-sans text-xs text-[var(--color-navy)] uppercase tracking-widest mb-4 font-semibold">
              Batch: {qrScannedBatch}
            </div>

            <p className="font-sans text-sm font-light text-[var(--color-text)] opacity-90 leading-relaxed mb-6">
              This Vedah Vital product is officially verified as authentic. It matches our laboratory database records and has been manufactured in compliance with strict cGMP safety guidelines.
            </p>

            <div className="flex flex-col gap-3">
              {reportData && (
                <a href={reportData.certificateUrl} className="w-full focus:outline-none">
                  <Button variant="primary" className="w-full py-3 gap-2 justify-center">
                    <Download className="w-4 h-4" />
                    Download Lab Report (PDF)
                  </Button>
                </a>
              )}
              <Button
                variant="outline"
                className="w-full border-[var(--color-navy)]/20 text-[var(--color-navy)] hover:bg-[var(--color-navy-light)]"
                onClick={() => {
                  setQrModalStatus(null);
                  // Scroll to results
                  setTimeout(() => {
                    const el = document.getElementById('batch-code-input');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              >
                View Detailed Lab Analysis
              </Button>
              <Button
                variant="outline"
                className="w-full border-transparent bg-transparent text-[var(--color-text)] opacity-70 hover:opacity-100 hover:bg-[var(--color-navy-light)]"
                onClick={() => setQrModalStatus(null)}
              >
                Explore Website
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/25 flex items-center justify-center mb-6 text-red-600">
              <AlertCircle className="w-8 h-8 stroke-[1.5]" />
            </div>

            <h3 className="heading-condensed text-3xl text-[var(--color-heading)] tracking-wide mb-2 uppercase">
              Product Not Verified
            </h3>

            <div className="font-sans text-xs text-red-600 uppercase tracking-widest mb-4 font-semibold">
              Unrecognized Code: {qrScannedBatch}
            </div>

            <p className="font-sans text-sm font-light text-[var(--color-text)] opacity-90 leading-relaxed mb-6">
              We could not locate this batch number in our database. This QR code may be counterfeit, or there may have been a scanning error. Please verify the code printed near the barcode on the bottle.
            </p>

            <div className="flex flex-col gap-3">
              <Button
                variant="primary"
                className="w-full bg-red-600 hover:bg-red-500 border-transparent py-3 text-white justify-center shadow-lg"
                onClick={() => {
                  setQrModalStatus(null);
                  setCode(qrScannedBatch || '');
                  // Focus input
                  const el = document.getElementById('batch-code-input');
                  el?.focus();
                }}
              >
                Edit and Verify Manually
              </Button>
              <a href={`mailto:info@vedahvital.com?subject=Unverified QR Code Alert: ${qrScannedBatch}`} className="w-full focus:outline-none">
                <Button
                  variant="outline"
                  className="w-full border-[var(--color-navy)]/20 text-[var(--color-navy)] hover:bg-[var(--color-navy-light)] justify-center"
                >
                  Report Counterfeit to Support
                </Button>
              </a>
              <Button
                variant="outline"
                className="w-full border-transparent bg-transparent text-[var(--color-text)] opacity-70 hover:opacity-100 hover:bg-[var(--color-navy-light)]"
                onClick={() => setQrModalStatus(null)}
              >
                Explore Website
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
  }

  // QR Code Scanner Modal
  function renderQrScannerModal() {
  if (!showScanner) return null;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="glass-card-navy border border-white/30 max-w-md w-full p-8 rounded-3xl relative shadow-xl text-center"
      >
        <button
          onClick={() => setShowScanner(false)}
          className="absolute top-4 right-4 text-white/60 hover:text-white cursor-pointer focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center gap-2 mb-6">
          <QrCode className="w-6 h-6 text-[var(--color-navy)]" />
          <h3 className="heading-condensed text-2xl text-white tracking-wide uppercase">
            Scan Bottle QR Code
          </h3>
        </div>

        <p className="font-sans text-xs font-light text-white/70 leading-relaxed mb-6 max-w-xs mx-auto">
          Align the QR code printed on the side label of your Vedah Vital bottle inside the scanning viewport.
        </p>

        {/* Animated Viewport */}
        <div className="relative w-52 h-52 mx-auto mb-8 bg-black/40 border border-white/20 overflow-hidden flex items-center justify-center rounded-2xl">
          {/* Viewport scan frame brackets */}
          <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[var(--color-navy)]" />
          <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[var(--color-navy)]" />
          <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[var(--color-navy)]" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[var(--color-navy)]" />

          {/* Glowing Laser line */}
          <motion.div
            animate={{ y: [-70, 70] }}
            transition={{ duration: 2.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            className="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-[var(--color-navy)] to-transparent shadow-[0_0_8px_rgba(27,54,93,0.8)] z-10"
          />

          {/* Video camera feedback placeholder */}
          <div className="flex flex-col items-center gap-2 text-white/40">
            <Camera className="w-8 h-8 animate-pulse" />
            <span className="font-sans text-[8px] uppercase tracking-widest">Awaiting feed...</span>
          </div>
        </div>

        {/* Simulation Help Panel */}
        <div className="border border-white/10 bg-white/5 rounded-2xl p-4 text-left">
          <span className="font-sans text-[9px] font-bold uppercase tracking-wider text-white/50 block mb-2">
            Developer QR Simulation
          </span>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="primary"
              className="py-2 px-3 text-[9px] justify-center"
              onClick={() => {
                setShowScanner(false);
                setQrScannedBatch('VV-ASH-2026-001');
                setQrModalStatus('genuine');
                setReport(LAB_REPORTS['VV-ASH-2026-001']);
                setCode('VV-ASH-2026-001');
                setHasSearched(true);
              }}
            >
              Simulate Valid QR
            </Button>
            <Button
              variant="outline"
              className="py-2 px-3 text-[9px] justify-center text-white border-white/20 hover:bg-white/10"
              onClick={() => {
                setShowScanner(false);
                setQrScannedBatch('VV-FAKE-9999');
                setQrModalStatus('fake');
              }}
            >
              Simulate Fake QR
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
  }
}

export default Verify;

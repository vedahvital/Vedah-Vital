import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ShieldCheck, Search, Download, AlertCircle, FileSpreadsheet, FlaskConical, Award, QrCode, Camera, Upload, X, Loader2 } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { type LabTestReport } from '../lib/mockData';
import { AnimatedSection } from '../components/ui/AnimatedSection';

import { verifyCodeOnline, verifyQrImageOnline, type VerificationResult } from '../services/api';

export const Verify: React.FC = () => {
  const [code, setCode] = useState(() => {
    if (typeof window === 'undefined') return '';
    const params = new URLSearchParams(window.location.search);
    const batchParam = params.get('batch');
    return batchParam ? batchParam.trim() : '';
  });
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<LabTestReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const [showScanner, setShowScanner] = useState(false);
  const [qrModalResult, setQrModalResult] = useState<VerificationResult | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

  // Initialize and verify from QR or direct batch URL on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const batchParam = params.get('batch');

    if (batchParam) {
      const targetCode = batchParam.trim();
      setLoading(true);
      setHasSearched(true);
      // Execute online verification against backend
      verifyCodeOnline(targetCode).then((res) => {
        setLoading(false);
        setQrModalResult(res);
        if (res.report) {
          setReport(res.report);
        }
      }).catch((err) => {
        setLoading(false);
        setError(err?.message || 'Verification failed.');
      });

      // Clean query params from address bar
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, []);

  // Cleanup camera scanner on unmount or modal close
  useEffect(() => {
    if (!showScanner && html5QrCodeRef.current) {
      if (html5QrCodeRef.current.isScanning) {
        html5QrCodeRef.current.stop().catch(() => {}).finally(() => {
          html5QrCodeRef.current?.clear();
          html5QrCodeRef.current = null;
        });
      } else {
        html5QrCodeRef.current.clear();
        html5QrCodeRef.current = null;
      }
      setCameraActive(false);
      setCameraError(null);
    }
  }, [showScanner]);

  // Handle successful code extracted from live camera or image
  const handleDecodedCode = async (decodedText: string) => {
    let cleanCode = decodedText.trim();
    // If it's a URL (e.g. https://vedahvital.com/verify?batch=VV-XXX&source=qr), parse the batch parameter
    try {
      if (cleanCode.includes('?')) {
        const url = new URL(cleanCode, window.location.origin);
        const b = url.searchParams.get('batch');
        if (b) cleanCode = b.trim();
      }
    } catch {
      // not a URL, use decoded string directly
    }

    cleanCode = cleanCode.toUpperCase();
    setCode(cleanCode);
    setShowScanner(false);
    setLoading(true);
    setError(null);
    setReport(null);
    setHasSearched(true);

    try {
      const res = await verifyCodeOnline(cleanCode);
      setLoading(false);
      setQrModalResult(res);
      if (res.report) setReport(res.report);
    } catch (err: any) {
      setLoading(false);
      setError(err?.message || 'Verification failed.');
    }
  };

  // Start real camera stream
  const startCameraScanner = async () => {
    setCameraError(null);
    try {
      const scannerId = 'qr-reader-viewport';
      if (!html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode(scannerId);
      }

      await html5QrCodeRef.current.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 220, height: 220 },
        },
        (decodedText) => {
          // Success callback
          if (html5QrCodeRef.current?.isScanning) {
            html5QrCodeRef.current.stop().catch(() => {}).finally(() => {
              handleDecodedCode(decodedText);
            });
          } else {
            handleDecodedCode(decodedText);
          }
        },
        () => {
          // ignore scan frame misses
        }
      );
      setCameraActive(true);
    } catch (err: any) {
      console.warn('Camera scanner initialization error:', err);
      setCameraActive(false);
      setCameraError(
        err?.message || 'Could not access device camera. Please check camera permissions or upload a QR image.'
      );
    }
  };

  // Handle uploading and decoding a QR photo
  const handleQrImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    setCameraError(null);

    // 1. First attempt fast in-browser decoding using html5-qrcode file scanner
    try {
      const scanner = new Html5Qrcode('qr-reader-viewport-temp');
      const decodedResult = await scanner.scanFile(file, true);
      scanner.clear();
      setImageUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
      await handleDecodedCode(decodedResult);
      return;
    } catch (browserDecodeErr) {
      console.log('Client-side QR decode attempt, falling back to server decode:', browserDecodeErr);
    }

    // 2. Fallback to backend OCR / Jimp QR image reader endpoint
    try {
      const res = await verifyQrImageOnline(file);
      setImageUploading(false);
      setShowScanner(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (res.code) {
        setCode(res.code);
      }
      setQrModalResult(res);
      if (res.report) {
        setReport(res.report);
      }
      setHasSearched(true);
    } catch (serverErr: any) {
      setImageUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setCameraError(
        serverErr?.message || 'Could not detect a valid QR code in this image. Please upload a clear photo of the bottle QR code.'
      );
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = code.trim().toUpperCase();
    if (!query) return;

    setLoading(true);
    setError(null);
    setReport(null);
    setHasSearched(true);

    try {
      const res = await verifyCodeOnline(query);
      setLoading(false);
      setQrModalResult(res);
      if (res.report) {
        setReport(res.report);
      }
    } catch (err: any) {
      setLoading(false);
      setError(err?.message || 'Batch verification failed.');
    }
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
        <section className="pt-36 pb-20 text-center relative overflow-clip bg-[var(--color-navy-light)] border-b border-[rgba(10, 25, 47,0.15)]">


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
        <section className="py-16 md:py-24 relative overflow-clip">
                    
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
                    maxLength={32}
                    placeholder="e.g. VV-ASH-2026-001 or QR Code"
                    className="w-full bg-transparent font-sans text-sm focus:outline-none text-[var(--color-heading)] placeholder-[rgba(10, 25, 47,0.4)]"
                  />
                  {/* Hidden File Input for Direct QR Photo Upload */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleQrImageUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    title="Upload QR Image"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={imageUploading}
                    className="p-1.5 hover:bg-[rgba(10,25,47,0.05)] text-[var(--color-navy)] rounded-full transition-colors shrink-0 mr-1 focus:outline-none flex items-center justify-center disabled:opacity-50"
                  >
                    {imageUploading ? (
                      <Loader2 className="w-5 h-5 animate-spin text-[var(--color-navy)]" />
                    ) : (
                      <Upload className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    type="button"
                    title="Open Camera Scanner"
                    onClick={() => {
                      setShowScanner(true);
                      setTimeout(() => {
                        startCameraScanner();
                      }, 150);
                    }}
                    className="p-1.5 hover:bg-[rgba(10,25,47,0.05)] text-[var(--color-navy)] rounded-full transition-colors shrink-0 mr-1 focus:outline-none flex items-center justify-center"
                  >
                    <Camera className="w-5 h-5" />
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
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10 border-b border-[rgba(10, 25, 47,0.15)] pb-8">
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

              {/* Lab Reports Images Section (Uploaded via CMS: Potency, Heavy Metals, Microbial) */}
              {qrModalResult?.labReports && (
                (qrModalResult.labReports.potency?.length > 0 ||
                 qrModalResult.labReports.heavyMetals?.length > 0 ||
                 qrModalResult.labReports.microbial?.length > 0)
              ) && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                  className="mt-8 glass-card-navy p-6 md:p-10 text-left shadow-sm rounded-3xl"
                >
                  <div className="border-b border-[rgba(10,25,47,0.15)] pb-4 mb-6">
                    <span className="eyebrow text-[var(--color-navy)] block text-xs">OFFICIAL LABORATORY CERTIFICATES</span>
                    <h3 className="font-sans text-xl font-bold uppercase tracking-wide text-[var(--color-heading)] mt-1">
                      Scanned Lab Test Documents & Assays
                    </h3>
                    <p className="font-sans text-xs text-slate-600 mt-1">
                      High-resolution third-party lab documentation for batch verification. Click on any certificate to view or download.
                    </p>
                  </div>

                  <div className="space-y-8">
                    {/* 1. Potency */}
                    {qrModalResult.labReports.potency?.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <FlaskConical className="w-4 h-4 text-[var(--color-navy)]" />
                          <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[var(--color-heading)]">
                            1. Active Potency Assay Certificate ({qrModalResult.labReports.potency.length} images)
                          </h4>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                          {qrModalResult.labReports.potency.map((imgUrl, i) => (
                            <a
                              key={i}
                              href={imgUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-[rgba(10,25,47,0.15)] bg-slate-100 hover:shadow-md transition-shadow"
                            >
                              <img
                                src={imgUrl}
                                alt={`Potency assay certificate page ${i + 1}`}
                                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-semibold gap-1">
                                <Search className="w-3.5 h-3.5" /> View
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 2. Heavy Metals */}
                    {qrModalResult.labReports.heavyMetals?.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <ShieldCheck className="w-4 h-4 text-[var(--color-navy)]" />
                          <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[var(--color-heading)]">
                            2. Heavy Metals & Toxins Audit Certificate ({qrModalResult.labReports.heavyMetals.length} images)
                          </h4>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                          {qrModalResult.labReports.heavyMetals.map((imgUrl, i) => (
                            <a
                              key={i}
                              href={imgUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-[rgba(10,25,47,0.15)] bg-slate-100 hover:shadow-md transition-shadow"
                            >
                              <img
                                src={imgUrl}
                                alt={`Heavy metals test page ${i + 1}`}
                                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-semibold gap-1">
                                <Search className="w-3.5 h-3.5" /> View
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 3. Microbial */}
                    {qrModalResult.labReports.microbial?.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <FileSpreadsheet className="w-4 h-4 text-[var(--color-navy)]" />
                          <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[var(--color-heading)]">
                            3. Microbial Screening Certificate ({qrModalResult.labReports.microbial.length} images)
                          </h4>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                          {qrModalResult.labReports.microbial.map((imgUrl, i) => (
                            <a
                              key={i}
                              href={imgUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-[rgba(10,25,47,0.15)] bg-slate-100 hover:shadow-md transition-shadow"
                            >
                              <img
                                src={imgUrl}
                                alt={`Microbial screening page ${i + 1}`}
                                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-semibold gap-1">
                                <Search className="w-3.5 h-3.5" /> View
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
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

  // Popup verified/fake/repeat modal overlay according to exact Scenario A, B, and C
  function renderQrStatusModal() {
    if (!qrModalResult) return null;

    const { status, code: targetCode, product, firstVerificationDate, currentScanDate, report: matchedReport } = qrModalResult;

    const formatDateStr = (d?: string | Date) => {
      if (!d) return '—';
      try {
        const dateObj = new Date(d);
        if (isNaN(dateObj.getTime())) return String(d);
        return dateObj.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      } catch {
        return String(d);
      }
    };

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-white border border-[rgba(10,25,47,0.15)] max-w-lg w-full p-8 rounded-3xl relative shadow-2xl text-left"
        >
          {/* Close button */}
          <button
            onClick={() => setQrModalResult(null)}
            className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-full"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Scenario A: Genuine product */}
          {status === 'GENUINE' && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🟢</span>
                <span className="font-sans font-bold text-sm tracking-wider uppercase text-emerald-700">
                  AUTHENTIC PRODUCT VERIFIED
                </span>
              </div>

              <div className="border-b border-gray-100 pb-3 mb-4">
                <span className="eyebrow text-[var(--color-navy)] block text-xs tracking-widest font-semibold">
                  VEDAH VITAL
                </span>
                <p className="font-sans text-sm text-gray-600 mt-1">
                  Your product has been successfully verified.
                </p>
              </div>

              <div className="space-y-2 py-3 bg-slate-50/80 rounded-2xl p-5 border border-slate-100 text-sm font-sans mb-6">
                <div className="font-semibold text-slate-900 border-b border-slate-200/60 pb-2">
                  Product: {product?.name || 'KSM-66® Ashwagandha Root Extract'}
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 pt-1">
                  <li className="flex justify-between">
                    <span className="text-slate-500">• Brand:</span>
                    <span className="font-medium text-slate-900">{product?.brand || 'VEDAH VITAL'}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-500">• Strength:</span>
                    <span className="font-medium text-slate-900">{product?.strength || '500 mg'}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-500">• Black Pepper Extract:</span>
                    <span className="font-medium text-slate-900">{product?.blackPepperExtract || '5 mg'}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-500">• Pack Size:</span>
                    <span className="font-medium text-slate-900">{product?.packSize || '60 Vegan Capsules'}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-500">• Batch Number:</span>
                    <span className="font-mono font-semibold text-slate-900">{product?.batchNumber || targetCode}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-500">• Manufacturing Date:</span>
                    <span className="font-medium text-slate-900">{product?.mfgDate || '—'}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-500">• Expiry Date:</span>
                    <span className="font-medium text-slate-900">{product?.expDate || '—'}</span>
                  </li>
                </ul>
              </div>

              <div className="text-center font-sans text-xs text-slate-500 mb-6 border-t border-slate-100 pt-3">
                <p className="font-medium text-slate-700">Thank you for choosing VEDAH VITAL.</p>
                <p className="italic text-slate-400 mt-0.5">Rooted in Nature. Made with Intention.</p>
              </div>

              <div className="flex flex-col gap-2.5">
                {qrModalResult.labReports && (
                  qrModalResult.labReports.potency?.length > 0 ||
                  qrModalResult.labReports.heavyMetals?.length > 0 ||
                  qrModalResult.labReports.microbial?.length > 0
                ) && (
                  <Button
                    variant="outline"
                    className="w-full border-[var(--color-navy)]/30 text-[var(--color-navy)] hover:bg-[var(--color-navy-light)] py-2.5 text-xs font-semibold"
                    onClick={() => {
                      setQrModalResult(null);
                      setTimeout(() => {
                        window.scrollTo({ top: 600, behavior: 'smooth' });
                      }, 100);
                    }}
                  >
                    View Attached Lab Report Certificates ({
                      (qrModalResult.labReports.potency?.length || 0) +
                      (qrModalResult.labReports.heavyMetals?.length || 0) +
                      (qrModalResult.labReports.microbial?.length || 0)
                    } images)
                  </Button>
                )}
                {matchedReport && (
                  <a href={matchedReport.certificateUrl} className="w-full focus:outline-none">
                    <Button variant="primary" className="w-full py-2.5 gap-2 justify-center text-xs">
                      <Download className="w-4 h-4" />
                      Download Lab Report (COA PDF)
                    </Button>
                  </a>
                )}
                <Button
                  variant="outline"
                  className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 py-2.5 text-xs"
                  onClick={() => setQrModalResult(null)}
                >
                  Close & Explore Website
                </Button>
              </div>
            </div>
          )}

          {/* Scenario B: Code already scanned */}
          {status === 'ALREADY_SCANNED' && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🟠</span>
                <span className="font-sans font-bold text-sm tracking-wider uppercase text-amber-700">
                  VERIFICATION NOTICE
                </span>
              </div>

              <div className="border-b border-gray-100 pb-3 mb-4">
                <p className="font-sans text-sm text-gray-700 leading-relaxed">
                  This product's QR code has previously been scanned.
                </p>
              </div>

              <div className="space-y-2 py-3 bg-amber-50/60 rounded-2xl p-5 border border-amber-200/60 text-sm font-sans mb-5">
                <ul className="space-y-2 text-xs sm:text-sm text-amber-950">
                  <li className="flex justify-between">
                    <span className="text-amber-800">• First verification date:</span>
                    <span className="font-semibold">{formatDateStr(firstVerificationDate)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-amber-800">• Current scan date:</span>
                    <span className="font-semibold">{formatDateStr(currentScanDate || new Date())}</span>
                  </li>
                  {product?.batchNumber && (
                    <li className="flex justify-between border-t border-amber-200/50 pt-2 text-xs">
                      <span className="text-amber-800">• Batch Number:</span>
                      <span className="font-mono font-medium">{product.batchNumber}</span>
                    </li>
                  )}
                </ul>
              </div>

              <div className="text-xs font-sans text-slate-600 space-y-2 mb-6">
                <p>If you have just purchased this product, please contact VEDAH VITAL customer support.</p>
                <p className="text-[11px] text-slate-500 italic">
                  Note: A repeat scan does not automatically mean the product is counterfeit.
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <a
                  href={`mailto:info@vedahvital.com?subject=${encodeURIComponent(`Repeat QR Code Notice: ${targetCode}`)}`}
                  className="w-full focus:outline-none"
                >
                  <Button variant="primary" className="w-full bg-amber-700 hover:bg-amber-600 text-white py-2.5 text-xs justify-center shadow-md">
                    Contact Customer Support
                  </Button>
                </a>
                <Button
                  variant="outline"
                  className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 py-2.5 text-xs"
                  onClick={() => setQrModalResult(null)}
                >
                  Dismiss Notice
                </Button>
              </div>
            </div>
          )}

          {/* Scenario C: Invalid QR code */}
          {(status === 'NOT_FOUND' || status === 'INVALID') && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🔴</span>
                <span className="font-sans font-bold text-sm tracking-wider uppercase text-red-700">
                  PRODUCT NOT VERIFIED
                </span>
              </div>

              <div className="border-b border-gray-100 pb-3 mb-4">
                <p className="font-sans text-sm text-gray-700 leading-relaxed">
                  We could not verify this product's identification code.
                </p>
                {targetCode && (
                  <div className="font-mono text-xs text-red-600 mt-2 bg-red-50 p-2 rounded-lg inline-block border border-red-100">
                    Code: {targetCode}
                  </div>
                )}
              </div>

              <div className="p-4 bg-red-50/50 border border-red-200/60 rounded-2xl mb-6">
                <p className="font-sans text-xs text-red-800 leading-relaxed font-medium">
                  Please contact VEDAH VITAL customer support before using the product.
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <a
                  href={`mailto:info@vedahvital.com?subject=${encodeURIComponent(`Unverified Product Alert: ${targetCode}`)}`}
                  className="w-full focus:outline-none"
                >
                  <Button variant="primary" className="w-full bg-red-600 hover:bg-red-500 text-white py-2.5 text-xs justify-center shadow-md">
                    Contact VEDAH VITAL Support
                  </Button>
                </a>
                <Button
                  variant="outline"
                  className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 py-2.5 text-xs"
                  onClick={() => {
                    setQrModalResult(null);
                    setCode(targetCode || '');
                    const el = document.getElementById('batch-code-input');
                    el?.focus();
                  }}
                >
                  Edit & Retry Code
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  // QR Code Scanner & Image Upload Modal
  function renderQrScannerModal() {
    if (!showScanner) return null;

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="glass-card-navy border border-white/30 max-w-md w-full p-6 sm:p-8 rounded-3xl relative shadow-2xl text-center"
        >
          <button
            onClick={() => setShowScanner(false)}
            className="absolute top-4 right-4 text-white/60 hover:text-white cursor-pointer focus:outline-none p-1 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-center gap-2 mb-2">
            <QrCode className="w-6 h-6 text-white" />
            <h3 className="heading-condensed text-2xl text-white tracking-wide uppercase">
              Scan Bottle QR Code
            </h3>
          </div>

          <p className="font-sans text-xs font-light text-white/70 leading-relaxed mb-6 max-w-xs mx-auto">
            Point your device camera at the QR code on your Vedah Vital bottle or upload a saved photo.
          </p>

          {/* Real Camera Viewport Container */}
          <div className="relative w-64 h-64 mx-auto mb-4 bg-black/60 border border-white/20 overflow-hidden flex items-center justify-center rounded-2xl">
            {/* HTML5 QR Code Real Video Element is mounted here */}
            <div id="qr-reader-viewport" className="w-full h-full object-cover [&>video]:h-full [&>video]:w-full [&>video]:object-cover" />
            {/* Hidden scratchpad container for file scans */}
            <div id="qr-reader-viewport-temp" className="hidden" />

            {!cameraActive && !cameraError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/60 bg-black/70">
                <Camera className="w-10 h-10 animate-pulse text-white/80" />
                <span className="font-sans text-[10px] uppercase tracking-wider">Starting camera feed...</span>
              </div>
            )}

            {/* Glowing Laser line animation when active */}
            {cameraActive && (
              <motion.div
                animate={{ y: [-90, 90] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                className="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_10px_rgba(52,211,153,0.9)] z-10 pointer-events-none"
              />
            )}
          </div>

          {/* Camera Error / Permission Notice */}
          {cameraError && (
            <div className="mb-4 rounded-xl bg-red-950/60 border border-red-500/40 p-3 text-left flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <p className="text-[11px] font-sans text-red-200 leading-relaxed">
                {cameraError}
              </p>
            </div>
          )}

          {/* Alternative: Direct Upload QR Photo Option */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white/40 text-xs font-sans my-2">
              <div className="flex-1 border-t border-white/10" />
              <span>OR</span>
              <div className="flex-1 border-t border-white/10" />
            </div>

            <label className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs font-medium cursor-pointer transition-colors shadow-sm">
              {imageUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Decoding QR Image...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 text-white" />
                  <span>Upload Photo from Gallery / Device</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                disabled={imageUploading}
                onChange={handleQrImageUpload}
                className="hidden"
              />
            </label>

            {!cameraActive && (
              <Button
                variant="outline"
                className="w-full text-white border-white/20 hover:bg-white/10 text-xs py-2 justify-center"
                onClick={() => startCameraScanner()}
              >
                Retry Starting Camera
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }
}

export default Verify;

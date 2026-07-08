import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

// Retry chunk load on failure (common on new deployments)
const lazyWithRetry = (componentImport: () => Promise<any>) => {
  return lazy(() =>
    componentImport().catch((error) => {
      console.error("Chunk load failed:", error);
      const hasReloaded = window.sessionStorage.getItem('chunk-reload');
      if (!hasReloaded) {
        window.sessionStorage.setItem('chunk-reload', 'true');
        window.location.reload();
        return new Promise(() => {});
      }
      throw error;
    })
  );
};

const Home = lazyWithRetry(() => import('./pages/Home'))
const About = lazyWithRetry(() => import('./pages/About'))
const Contact = lazyWithRetry(() => import('./pages/Contact'))
const Verify = lazyWithRetry(() => import('./pages/Verify'))

// Scroll restoration helper
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-white">
    <div className="w-10 h-10 border-2 border-[var(--color-navy)] border-t-transparent animate-spin rounded-full" />
    <p className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--color-navy)] mt-4 animate-pulse">
      Vedah Vital
    </p>
  </div>
)

function App() {
  // Clear chunk reload flag after successful load
  useEffect(() => {
    window.sessionStorage.removeItem('chunk-reload');
  }, []);

  return (
    <>
      <ScrollToTop />
      <Helmet>
        <title>Vedah Vital — Premium Organic Wellness</title>
        <meta name="description" content="Vedah Vital — authentic Ayurvedic wellness backed by transparency and lab-science." />
      </Helmet>

      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/verify" element={<Verify />} />
          {/* Fallback wildcard redirect to safe route home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App

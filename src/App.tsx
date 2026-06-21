import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Verify = lazy(() => import('./pages/Verify'))

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
  return (
    <>
      <ScrollToTop />
      <Helmet>
        <title>Vedah Vital — Premium Organic Wellness</title>
        <meta name="description" content="Vedah Vital — authentic Ayurvedic wellness backed by transparency and lab-science." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Outfit:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/verify" element={<Verify />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App

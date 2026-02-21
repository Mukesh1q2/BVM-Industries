import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navigation from './components/Navigation';
import Footer from './sections/Footer';
import AIChatbot from './components/AIChatbot';
import './App.css';

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const QuotationPage = lazy(() => import('./pages/QuotationPage'));
const MachinesPage = lazy(() => import('./pages/MachinesPage'));
const MachineDetailsPage = lazy(() => import('./pages/MachineDetailsPage')); // Unified Template
const TurnkeyPage = lazy(() => import('./pages/TurnkeyPage'));
const RefurbishmentPage = lazy(() => import('./pages/RefurbishmentPage'));
const QualityPage = lazy(() => import('./pages/QualityPage'));
const MouldsPage = lazy(() => import('./pages/MouldsPage'));
const CareerPage = lazy(() => import('./pages/CareerPage'));
const BuildYourLinePage = lazy(() => import('./pages/BuildYourLinePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Loading fallback
const PageLoader = () => (
  <div className="fixed inset-0 bg-bvm-navy flex items-center justify-center z-50">
    <div className="w-16 h-16 border-4 border-bvm-blue border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <Router>
            <ScrollToTop />
            <div className="relative min-h-screen bg-bvm-navy">
              {/* Grain overlay REMOVED for cleaner professional look */}
              {/* <div className="grain-overlay" /> */}

              {/* Navigation */}
              <Navigation />

              {/* Main content */}
              <main className="relative">
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/quotation" element={<QuotationPage />} />
                    <Route path="/machines" element={<MachinesPage />} />

                    {/* Dynamic Machine Route replaces hardcoded pages */}
                    <Route path="/machines/:slug" element={<MachineDetailsPage />} />

                    {/* New Service Pages */}
                    <Route path="/services/turnkey" element={<TurnkeyPage />} />
                    <Route path="/services/refurbishment" element={<RefurbishmentPage />} />
                    <Route path="/quality" element={<QualityPage />} />

                    <Route path="/moulds" element={<MouldsPage />} />
                    <Route path="/career" element={<CareerPage />} />
                    <Route path="/build-your-line" element={<BuildYourLinePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </main>

              {/* Footer */}
              <Footer />

              {/* AI Chatbot */}
              <AIChatbot />
            </div>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;

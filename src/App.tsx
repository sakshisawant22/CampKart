import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CampusKartProvider } from './context/CampusKartContext';

// Components
import { Navbar } from './components/layout/Navbar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Footer } from './components/layout/Footer';
import { DemoHelperWidget } from './components/layout/DemoHelperWidget';
import { ToastContainer } from './components/common/ToastContainer';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Pages
import { LandingPage } from './pages/LandingPage';
import { AuthVerifyPage } from './pages/AuthVerifyPage';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { KartSwapPage } from './pages/KartSwapPage';
import { WishlistPage } from './pages/WishlistPage';
import { MessagesPage } from './pages/MessagesPage';
import { SellItemPage } from './pages/SellItemPage';
import { MyCampusKartPage } from './pages/MyCampusKartPage';
import { ProfilePage } from './pages/ProfilePage';
import { PartnershipPage } from './pages/PartnershipPage';
import { AdminPage } from './pages/AdminPage';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/verify';

  return (
    <div className="min-h-screen flex flex-col bg-pastel-warm selection:bg-pastel-mint selection:text-pastel-mint-dark">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/verify" element={<AuthVerifyPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/swap" element={<KartSwapPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/sell" element={<SellItemPage />} />
          <Route path="/my-campuskart" element={<MyCampusKartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/partner" element={<PartnershipPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      {!isAuthPage && <Footer />}

      {/* Mobile Sticky Bottom Nav */}
      <MobileBottomNav />

      {/* Floating Demo Helper Controller for Hackathon Judges */}
      <DemoHelperWidget />

      {/* Real-time Toasts & Feedback */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <CampusKartProvider>
        <Router basename={import.meta.env.BASE_URL || '/'}>
          <AppLayout />
        </Router>
      </CampusKartProvider>
    </ErrorBoundary>
  );
}

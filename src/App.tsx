import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { LivePrices } from './components/LivePrices';
import { Products } from './components/Products';
import { Charts } from './components/Charts';
import { News } from './components/News';
import { TradingTerminal } from './components/TradingTerminal';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';
import { KYCPage } from './pages/KYCPage';
import { TDSCalculatorPage } from './pages/TDSCalculatorPage';
import { BankDetailsPage } from './pages/BankDetailsPage';
import { EconomicCalendarPage } from './pages/EconomicCalendarPage';
import { MessagePage } from './pages/MessagePage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentPage, setCurrentPage] = useState<'home' | 'kyc' | 'tds' | 'bank' | 'calendar' | 'message'>('home');
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [showSymbolProperty, setShowSymbolProperty] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('home');
  };
  
  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleNavigate = (page: 'home' | 'kyc' | 'tds' | 'bank' | 'calendar' | 'message') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const scrollToLivePrices = () => {
    const element = document.getElementById('live-prices');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      <Header 
        onLoginClick={handleLogin} 
        theme={theme} 
        onThemeToggle={handleThemeToggle}
        onNavigate={handleNavigate}
        currentPage={currentPage}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onShowAccountDetails={() => setShowAccountDetails(true)}
        onShowSymbolProperty={() => setShowSymbolProperty(true)}
        onShowProfile={() => setShowProfile(true)}
      />
      
      {!isLoggedIn ? (
        <>
          {currentPage === 'home' && (
            <>
              {/* Important Notice Marquees */}
              <div className="fixed top-16 left-0 right-0 z-40 space-y-0.5">
                {/* First Marquee - Alert/Warning (Dark Charcoal Gradient) */}
                <div className="bg-gradient-to-r from-[#1a1a1a]/95 via-[#2a2a2a]/95 to-[#1a1a1a]/95 backdrop-blur-sm text-white py-1.5 sm:py-2 overflow-hidden border-b border-white/10">
                  <div className="animate-marquee whitespace-nowrap inline-block">
                    <span className="mx-4 sm:mx-8 text-xs sm:text-sm">🔴 IMPORTANT UPDATE: New GST regulations applicable from January 1st, 2025 for precious metal transactions</span>
                    <span className="mx-4 sm:mx-8 text-xs sm:text-sm">⚠️ MARKET ALERT: Gold prices showing high volatility - Trade with caution</span>
                    <span className="mx-4 sm:mx-8 text-xs sm:text-sm">📢 NOTICE: KYC verification mandatory for all transactions above ₹2 lakhs</span>
                    <span className="mx-4 sm:mx-8 text-xs sm:text-sm">🔴 IMPORTANT UPDATE: New GST regulations applicable from January 1st, 2025 for precious metal transactions</span>
                    <span className="mx-4 sm:mx-8 text-xs sm:text-sm">⚠️ MARKET ALERT: Gold prices showing high volatility - Trade with caution</span>
                    <span className="mx-4 sm:mx-8 text-xs sm:text-sm">📢 NOTICE: KYC verification mandatory for all transactions above ₹2 lakhs</span>
                  </div>
                </div>
                
                {/* Second Marquee - Positive/Info (Gold Gradient) */}
                <div className="bg-gradient-to-r from-[#1a1506] via-[#2a2008] to-[#1a1506] backdrop-blur-sm text-[#FFD700] py-1.5 sm:py-2 overflow-hidden border-b border-[#FFD700]/20">
                  <div className="animate-marquee-reverse whitespace-nowrap inline-block">
                    <span className="mx-4 sm:mx-8 text-xs sm:text-sm">💎 NEW LAUNCH: Introducing GoldJar Premium Membership with exclusive benefits</span>
                    <span className="mx-4 sm:mx-8 text-xs sm:text-sm">🎉 SPECIAL OFFER: Zero TDS on first transaction - Limited time offer</span>
                    <span className="mx-4 sm:mx-8 text-xs sm:text-sm">📊 RATE UPDATE: Live spot prices updated every 30 seconds for accurate trading</span>
                    <span className="mx-4 sm:mx-8 text-xs sm:text-sm">💎 NEW LAUNCH: Introducing GoldJar Premium Membership with exclusive benefits</span>
                    <span className="mx-4 sm:mx-8 text-xs sm:text-sm">🎉 SPECIAL OFFER: Zero TDS on first transaction - Limited time offer</span>
                    <span className="mx-4 sm:mx-8 text-xs sm:text-sm">📊 RATE UPDATE: Live spot prices updated every 30 seconds for accurate trading</span>
                  </div>
                </div>
              </div>
              
              {/* Add padding to prevent content from hiding under marquees */}
              <div className="pt-16 sm:pt-20">
                <Hero theme={theme} onViewLiveRates={scrollToLivePrices} />
                <LivePrices />
                <Products />
                <Charts />
                <News />
                <FAQ />
                <AboutUs />
              </div>
            </>
          )}
          {currentPage === 'kyc' && <KYCPage theme={theme} />}
          {currentPage === 'tds' && <TDSCalculatorPage theme={theme} />}
          {currentPage === 'bank' && <BankDetailsPage theme={theme} />}
          {currentPage === 'calendar' && <EconomicCalendarPage theme={theme} />}
          {currentPage === 'message' && <MessagePage theme={theme} />}
        </>
      ) : (
        <TradingTerminal 
          theme={theme}
          showAccountDetails={showAccountDetails}
          setShowAccountDetails={setShowAccountDetails}
          showSymbolProperty={showSymbolProperty}
          setShowSymbolProperty={setShowSymbolProperty}
          showProfile={showProfile}
          setShowProfile={setShowProfile}
        />
      )}
      
      {!isLoggedIn && <Footer />}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
        onLoginSuccess={handleLoginSuccess}
        theme={theme}
      />
    </div>
  );
}
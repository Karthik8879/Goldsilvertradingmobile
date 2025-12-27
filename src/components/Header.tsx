import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Sun, Moon, Menu, X, LogOut, User, Settings, Bell, BarChart3 } from 'lucide-react';
import logoImage from 'figma:asset/d208c619cae16192db73abf599e54a94f3d40496.png';
import { WorldClock } from './WorldClock';

interface HeaderProps {
  onLoginClick?: () => void;
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
  onNavigate: (page: 'home' | 'kyc' | 'tds' | 'bank' | 'calendar' | 'message') => void;
  currentPage: string;
  isLoggedIn?: boolean;
  onLogout?: () => void;
  onShowAccountDetails?: () => void;
  onShowSymbolProperty?: () => void;
  onShowProfile?: () => void;
}

export function Header({ 
  onLoginClick, 
  theme, 
  onThemeToggle, 
  onNavigate, 
  currentPage, 
  isLoggedIn = false, 
  onLogout,
  onShowAccountDetails,
  onShowSymbolProperty,
  onShowProfile
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  const menuItems = [
    { label: 'Live Rate', page: 'home' },
    { label: 'KYC', page: 'kyc' },
    { label: 'TDS Calculator', page: 'tds' },
    { label: 'Bank Details', page: 'bank' },
    { label: 'Economic Calendar', page: 'calendar' },
    { label: 'FAQ', page: 'home' },
    { label: 'Message', page: 'message' },
    { label: 'About Us', page: 'home' }
  ];
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
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

  const handleMenuClick = (item: any) => {
    setMobileMenuOpen(false);
    if (item.page === 'home') {
      onNavigate('home');
      // If on home page and clicking FAQ, About Us, or Live Rate, scroll to section
      if (item.label === 'FAQ' || item.label === 'About Us' || item.label === 'Live Rate') {
        setTimeout(() => {
          const sectionId = item.label === 'FAQ' ? 'faq' : item.label === 'About Us' ? 'about-us' : 'live-prices';
          scrollToSection(sectionId);
        }, 100);
      }
    } else {
      onNavigate(item.page as any);
    }
  };
  
  return (
    <header className="sticky top-0 z-50 glass-card border-b border-white/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => !isLoggedIn && onNavigate('home')}>
          <img src={logoImage} alt="GoldJar Logo" className="h-7 sm:h-8" />
        </div>
        
        {/* Desktop Navigation - Hidden when logged in */}
        {!isLoggedIn && (
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {menuItems.map((item) => {
              const isActiveSpecialItem = ['Live Rate', 'FAQ', 'About Us'].includes(item.label);
              const isActive = (item.page === currentPage) || (currentPage === 'home' && item.label === 'Live Rate');
              
              return (
                <button 
                  key={item.label}
                  onClick={() => handleMenuClick(item)}
                  className={`${
                    // Don't highlight Live Rate, FAQ, About Us - keep them white/black
                    isActiveSpecialItem
                      ? theme === 'dark' ? 'text-white/80' : 'text-black'
                      : isActive
                      ? 'text-[#FFD700]'
                      : theme === 'dark' ? 'text-white/80' : 'text-black'
                  } hover:text-[#FFD700] transition-colors relative group text-sm xl:text-base`}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FFD700] to-[#FFA500] group-hover:w-full transition-all duration-300"></span>
                </button>
              );
            })}
          </nav>
        )}
        
        {/* Right Side - Different layouts for logged in vs logged out */}
        <div className="flex items-center gap-2 sm:gap-4">
          {isLoggedIn ? (
            <>
              {/* Client Name & Profile - Shown when logged in */}
              <div className="hidden sm:flex items-center gap-3">
                <span className={`text-sm ${theme === 'dark' ? 'text-white/80' : 'text-black'}`}>
                  Rajesh Kumar
                </span>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center text-white border-2 border-[#FFD700]/50">
                  <img 
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh" 
                    alt="Profile" 
                    className="w-full h-full rounded-full"
                  />
                </div>
              </div>
              
              {/* Theme Toggle */}
              <button 
                onClick={onThemeToggle} 
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl glass-card border ${
                  theme === 'dark' ? 'border-white/10 text-white/80' : 'border-gray-300 text-black'
                } hover:text-[#FFD700] hover:border-[#FFD700]/50 transition-all duration-300 flex items-center justify-center`}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
              
              {/* Hamburger Menu - Always visible when logged in */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl glass-card border ${
                    theme === 'dark' ? 'border-white/10 text-white/80' : 'border-gray-300 text-black'
                  } hover:text-[#FFD700] hover:border-[#FFD700]/50 transition-all duration-300 flex items-center justify-center`}
                >
                  {userMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
                
                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <div className={`absolute right-0 mt-2 w-64 rounded-2xl border shadow-2xl overflow-hidden ${
                    theme === 'dark' 
                      ? 'bg-[#1a1a1a] border-white/10' 
                      : 'bg-white border-gray-200'
                  }`}>
                    {/* Mobile: Profile Info */}
                    <div className={`sm:hidden px-4 py-4 border-b ${
                      theme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center text-white border-2 border-[#FFD700]/50">
                          <img 
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh" 
                            alt="Profile" 
                            className="w-full h-full rounded-full"
                          />
                        </div>
                        <div>
                          <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                            Rajesh Kumar
                          </p>
                          <p className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
                            rajesh@email.com
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          onShowAccountDetails && onShowAccountDetails();
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all ${
                          theme === 'dark' ? 'text-white/80' : 'text-black'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        </div>
                        <span className="text-sm">Account Details</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          onShowSymbolProperty && onShowSymbolProperty();
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all ${
                          theme === 'dark' ? 'text-white/80' : 'text-black'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                          <BarChart3 className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm">Symbol Property</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          onShowProfile && onShowProfile();
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all ${
                          theme === 'dark' ? 'text-white/80' : 'text-black'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <span className="text-sm">Profile</span>
                      </button>
                      
                      <div className={`my-2 border-t ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}></div>
                      
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          onLogout && onLogout();
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 transition-all text-red-500`}
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Theme Toggle */}
              <button 
                onClick={onThemeToggle} 
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl glass-card border ${
                  theme === 'dark' ? 'border-white/10 text-white/80' : 'border-gray-300 text-black'
                } hover:text-[#FFD700] hover:border-[#FFD700]/50 transition-all duration-300 flex items-center justify-center`}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
              
              <div className="hidden sm:flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={onLoginClick}>
                  Login
                </Button>
              </div>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-xl glass-card border ${
                  theme === 'dark' ? 'border-white/10 text-white/80' : 'border-gray-300 text-black'
                } hover:text-[#FFD700] hover:border-[#FFD700]/50 transition-all duration-300 flex items-center justify-center`}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Mobile Menu - Only shown when NOT logged in */}
      {!isLoggedIn && mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10">
          <nav className="px-4 py-4 space-y-2">
            {menuItems.map((item) => {
              const isActiveSpecialItem = ['Live Rate', 'FAQ', 'About Us'].includes(item.label);
              const isActive = (item.page === currentPage) || (currentPage === 'home' && item.label === 'Live Rate');
              
              return (
                <button
                  key={item.label}
                  onClick={() => handleMenuClick(item)}
                  className={`w-full text-left px-4 py-3 rounded-xl ${
                    isActiveSpecialItem
                      ? theme === 'dark' ? 'text-white/80' : 'text-black'
                      : isActive
                      ? 'text-[#FFD700] bg-[#FFD700]/10'
                      : theme === 'dark' ? 'text-white/80' : 'text-black'
                  } hover:bg-white/5 transition-all`}
                >
                  {item.label}
                </button>
              );
            })}
            
            <div className="sm:hidden pt-4 border-t border-white/10 space-y-2">
              <Button variant="outline" size="sm" onClick={onLoginClick} className="w-full">
                Login
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

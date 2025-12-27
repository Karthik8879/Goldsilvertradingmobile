'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon, Menu, X, LogOut, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface HeaderProps {
  onLoginClick?: () => void;
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
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
  isLoggedIn = false, 
  onLogout,
  onShowAccountDetails,
  onShowSymbolProperty,
  onShowProfile
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const menuItems = [
    { label: 'Live Rate', href: '/#live-prices' },
    { label: 'KYC', href: '/kyc' },
    { label: 'TDS Calculator', href: '/tds' },
    { label: 'Bank Details', href: '/bank-details' },
    { label: 'Economic Calendar', href: '/calendar' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Message', href: '/messages' },
    { label: 'About Us', href: '/#about-us' }
  ];
  
  return (
    <header className="sticky top-0 z-50 glass-card border-b border-white/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center">
              <span className="text-black text-xl">G</span>
            </div>
            <span className="gold-text text-xl font-bold">GoldJar</span>
          </div>
        </Link>
        
        {/* Desktop Navigation - Hidden when logged in */}
        {!isLoggedIn && (
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || (pathname === '/' && item.href.startsWith('/#'));
              
              return (
                <Link 
                  key={item.label}
                  href={item.href}
                  className={`${
                    isActive
                      ? 'text-[#FFD700]'
                      : theme === 'dark' ? 'text-white/80' : 'text-black'
                  } hover:text-[#FFD700] transition-colors relative group text-sm xl:text-base`}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FFD700] to-[#FFA500] group-hover:w-full transition-all duration-300"></span>
                </Link>
              );
            })}
          </nav>
        )}
        
        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-4">
          {isLoggedIn ? (
            <>
              {/* Client Name & Profile */}
              <div className="hidden sm:flex items-center gap-3">
                <span className={`text-sm ${theme === 'dark' ? 'text-white/80' : 'text-black'}`}>
                  Rajesh Kumar
                </span>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center border-2 border-[#FFD700]/50">
                  <span className="text-black font-bold">RK</span>
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
              
              {/* Hamburger Menu */}
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
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center border-2 border-[#FFD700]/50">
                          <span className="text-black font-bold">RK</span>
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
      
      {/* Mobile Menu */}
      {!isLoggedIn && mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10">
          <nav className="px-4 py-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block w-full text-left px-4 py-3 rounded-xl ${
                    isActive
                      ? 'text-[#FFD700] bg-[#FFD700]/10'
                      : theme === 'dark' ? 'text-white/80' : 'text-black'
                  } hover:bg-white/5 transition-all`}
                >
                  {item.label}
                </Link>
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

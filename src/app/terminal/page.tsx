'use client';

import { useState } from 'react';
import { redirect } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { TradingTerminal } from '@/components/terminal/TradingTerminal';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';

export default function TerminalPage() {
  const { theme, toggleTheme } = useTheme();
  const { isLoggedIn, logout } = useAuth();
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [showSymbolProperty, setShowSymbolProperty] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  if (!isLoggedIn) {
    redirect('/');
  }

  return (
    <div className={theme === 'dark' ? 'dark' : 'light'}>
      <Header 
        theme={theme}
        onThemeToggle={toggleTheme}
        isLoggedIn={isLoggedIn}
        onLogout={logout}
        onShowAccountDetails={() => setShowAccountDetails(true)}
        onShowSymbolProperty={() => setShowSymbolProperty(true)}
        onShowProfile={() => setShowProfile(true)}
      />
      
      <TradingTerminal 
        theme={theme}
        showAccountDetails={showAccountDetails}
        setShowAccountDetails={setShowAccountDetails}
        showSymbolProperty={showSymbolProperty}
        setShowSymbolProperty={setShowSymbolProperty}
        showProfile={showProfile}
        setShowProfile={setShowProfile}
      />
    </div>
  );
}

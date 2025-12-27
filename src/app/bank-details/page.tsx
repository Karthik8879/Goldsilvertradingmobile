'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BankDetails } from '@/components/pages/BankDetails';
import { useTheme } from '@/hooks/useTheme';

export default function BankDetailsPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={theme === 'dark' ? 'dark' : 'light'}>
      <Header 
        theme={theme}
        onThemeToggle={toggleTheme}
      />
      
      <main className="min-h-screen">
        <BankDetails theme={theme} />
      </main>

      <Footer theme={theme} />
    </div>
  );
}

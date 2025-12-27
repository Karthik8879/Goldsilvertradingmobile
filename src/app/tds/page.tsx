'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TDSCalculator } from '@/components/pages/TDSCalculator';
import { useTheme } from '@/hooks/useTheme';

export default function TDSPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={theme === 'dark' ? 'dark' : 'light'}>
      <Header 
        theme={theme}
        onThemeToggle={toggleTheme}
      />
      
      <main className="min-h-screen">
        <TDSCalculator theme={theme} />
      </main>

      <Footer theme={theme} />
    </div>
  );
}

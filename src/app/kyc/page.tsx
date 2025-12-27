'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { KYC } from '@/components/pages/KYC';
import { useTheme } from '@/hooks/useTheme';

export default function KYCPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={theme === 'dark' ? 'dark' : 'light'}>
      <Header 
        theme={theme}
        onThemeToggle={toggleTheme}
      />
      
      <main className="min-h-screen">
        <KYC theme={theme} />
      </main>

      <Footer theme={theme} />
    </div>
  );
}

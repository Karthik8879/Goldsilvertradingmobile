'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Messages } from '@/components/pages/Messages';
import { useTheme } from '@/hooks/useTheme';

export default function MessagesPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={theme === 'dark' ? 'dark' : 'light'}>
      <Header 
        theme={theme}
        onThemeToggle={toggleTheme}
      />
      
      <main className="min-h-screen">
        <Messages theme={theme} />
      </main>

      <Footer theme={theme} />
    </div>
  );
}

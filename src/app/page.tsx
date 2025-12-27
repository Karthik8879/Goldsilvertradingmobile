'use client';

import { useTheme } from '@/hooks/useTheme';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/home/Hero';
import { LivePrices } from '@/components/home/LivePrices';
import { Products } from '@/components/home/Products';
import { Charts } from '@/components/home/Charts';
import { News } from '@/components/home/News';
import { FAQ } from '@/components/home/FAQ';
import { AboutUs } from '@/components/home/AboutUs';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={theme}>
      <div className={theme === 'dark' ? 'bg-[#0a0a0a] text-white' : 'bg-gray-50 text-black'}>
        <Header theme={theme} onThemeToggle={toggleTheme} />
        
        <main>
          <Hero theme={theme} />
          <LivePrices theme={theme} />
          <Products theme={theme} />
          <Charts theme={theme} />
          <News theme={theme} />
          <FAQ theme={theme} />
          <AboutUs theme={theme} />
        </main>

        <Footer theme={theme} />
      </div>
    </div>
  );
}
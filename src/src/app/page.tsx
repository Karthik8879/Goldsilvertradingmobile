import { Hero } from '@/components/home/Hero';
import { RunningMarquee } from '@/components/home/RunningMarquee';
import { ProductTabs } from '@/components/home/ProductTabs';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Running Marquee */}
      <RunningMarquee />
      
      {/* Product Table with Live Prices */}
      <ProductTabs />
      
      {/* Additional sections can be added here */}
    </main>
  );
}

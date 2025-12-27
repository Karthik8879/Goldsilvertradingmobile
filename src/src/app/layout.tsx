import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GoldJar - Premium Gold & Silver Bullion Trading',
  description: 'Experience luxury precious metals trading with real-time prices, secure transactions, and expert guidance.',
  keywords: 'gold, silver, bullion, trading, precious metals, investment',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
        <Toaster 
          position="top-right" 
          theme="dark"
          richColors
          closeButton
        />
      </body>
    </html>
  );
}

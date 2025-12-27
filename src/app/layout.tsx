import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GoldJar - Premium Gold & Silver Bullion Trading',
  description: 'Trade premium gold and silver bullion with GoldJar. Real-time pricing, secure transactions, and professional trading terminal.',
  keywords: 'gold trading, silver trading, bullion, precious metals, online trading',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

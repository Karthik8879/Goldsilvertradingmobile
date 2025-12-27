'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { TrendingUp, BarChart3, Apple, Smartphone } from 'lucide-react';
import logoImage from 'figma:asset/d208c619cae16192db73abf599e54a94f3d40496.png';
import appDashboardImage from 'figma:asset/3e93317dcc170a7c94f6b227f25f7104c52b25e0.png';

interface HeroProps {
  theme?: 'dark' | 'light';
  onGetStarted?: () => void;
}

export function Hero({ theme = 'dark', onGetStarted }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background with gold particles */}
      <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-b from-black via-[#0a0a0a] to-[#0a0a0a]' : 'bg-gradient-to-b from-gray-50 via-white to-white'}`}>
        <div className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 165, 0, 0.15) 0%, transparent 50%)'
          }}
        ></div>
      </div>
      
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className={`text-sm ${theme === 'dark' ? 'text-white/80' : 'text-black'}`}>Live Trading Active</span>
            </div>
            
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              Trade Gold & Silver Live with{' '}
              <span className="gold-text">Confidence</span>
            </h1>
            
            <p className={`text-lg sm:text-xl ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
              Real-time bullion prices, advanced charts & secure transactions
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full sm:w-auto"
                onClick={onGetStarted}
              >
                <BarChart3 className="w-5 h-5" />
                View Live Rates
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
              <div>
                <div className="gold-text">$50M+</div>
                <p className="text-sm text-white/60">Trading Volume</p>
              </div>
              <div>
                <div className="gold-text">24/7</div>
                <p className="text-sm text-white/60">Live Support</p>
              </div>
              <div>
                <div className="gold-text">10K+</div>
                <p className="text-sm text-white/60">Active Traders</p>
              </div>
            </div>
          </div>
          
          {/* Right Visual - Mobile Phone Mockup */}
          <div className="relative flex items-center justify-center mt-12 lg:mt-0">
            {/* Warm Light Reflection Behind Phone */}
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] rounded-full bg-gradient-to-br from-[#FFD700]/30 via-[#FFA500]/20 to-[#FF8C00]/10 blur-[80px] sm:blur-[100px] lg:blur-[120px] animate-pulse"></div>
            </div>
            
            {/* Animated Circular Arrows - Green (Buy) */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <div className="animate-spin-slow-ccw">
                <svg width="400" height="400" viewBox="0 0 400 400" className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[400px] lg:h-[400px]">
                  {/* Green Arrow Circle Path */}
                  <defs>
                    <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0.8 }} />
                      <stop offset="100%" style={{ stopColor: '#22c55e', stopOpacity: 0.4 }} />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 200 50 A 150 150 0 0 1 350 200"
                    fill="none"
                    stroke="url(#greenGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Green Arrow Head */}
                  <path
                    d="M 350 200 L 340 185 L 355 195 L 365 200 Z"
                    fill="#10b981"
                    opacity="0.8"
                  />
                </svg>
              </div>
            </div>
            
            {/* Animated Circular Arrows - Red (Sell) */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <div className="animate-spin-slow-cw">
                <svg width="400" height="400" viewBox="0 0 400 400" className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[400px] lg:h-[400px]">
                  {/* Red Arrow Circle Path */}
                  <defs>
                    <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 0.8 }} />
                      <stop offset="100%" style={{ stopColor: '#f87171', stopOpacity: 0.4 }} />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 200 350 A 150 150 0 0 1 50 200"
                    fill="none"
                    stroke="url(#redGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Red Arrow Head */}
                  <path
                    d="M 50 200 L 60 215 L 45 205 L 35 200 Z"
                    fill="#ef4444"
                    opacity="0.8"
                  />
                </svg>
              </div>
            </div>
            
            {/* Phone Frame */}
            <div className="relative z-10">
              {/* Phone Device */}
              <div className="w-[260px] h-[520px] sm:w-[300px] sm:h-[600px] lg:w-[320px] lg:h-[650px] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-[2.5rem] lg:rounded-[3rem] p-2 sm:p-3 shadow-2xl border-2 sm:border-4 border-[#2a2a2a]">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-5 sm:h-7 bg-black rounded-b-2xl sm:rounded-b-3xl"></div>
                
                {/* Screen */}
                <div className="w-full h-full bg-black rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden relative">
                  {/* Animated Video Background */}
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="https://cdn.pixabay.com/video/2020/07/08/44447-437940113_large.mp4" type="video/mp4" />
                  </video>
                  
                  {/* App Dashboard Image Overlay */}
                  <img 
                    src={appDashboardImage} 
                    alt="GoldJar App Dashboard" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Additional Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#FFD700]/20 to-transparent blur-3xl -z-10"></div>
            </div>
            
            {/* Download Section */}
            <div className="absolute -bottom-12 sm:-bottom-16 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] sm:w-full max-w-md z-20 px-4 sm:px-0">
              <div className="glass-card px-4 sm:px-8 py-4 sm:py-6 rounded-2xl text-center">
                <h3 className={`text-base sm:text-xl ${theme === 'dark' ? 'text-white' : 'text-black'} mb-2 sm:mb-3`}>Download GoldJar App</h3>
                <p className={`${theme === 'dark' ? 'text-white/70' : 'text-black'} text-xs sm:text-sm mb-3 sm:mb-4`}>Trade gold & silver on the go</p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                  <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/20 justify-center">
                    <Apple className={`w-4 sm:w-5 h-4 sm:h-5 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
                    <div className="text-left">
                      <div className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-black'}`}>Download on</div>
                      <div className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-white' : 'text-black'}`}>App Store</div>
                    </div>
                  </button>
                  <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/20 justify-center">
                    <Smartphone className={`w-4 sm:w-5 h-4 sm:h-5 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
                    <div className="text-left">
                      <div className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-black'}`}>Get it on</div>
                      <div className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Google Play</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

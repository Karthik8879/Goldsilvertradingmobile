'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import logoImage from 'figma:asset/d208c619cae16192db73abf599e54a94f3d40496.png';

interface FooterProps {
  theme: 'dark' | 'light';
}

export function Footer({ theme }: FooterProps) {
  return (
    <footer className={`border-t ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'} mt-12 sm:mt-16 lg:mt-20`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-10 lg:mb-12">
          {/* Brand */}
          <div>
            <div className="space-y-4 sm:space-y-6">
              <img src={logoImage} alt="GoldJar Logo" className="h-7 sm:h-8" />
              <p className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'} mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base`}>
                Your trusted platform for premium gold and silver trading with real-time market rates.
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <a href="#" className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-white/60' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'} hover:text-[#FFD700] flex items-center justify-center transition-all`}>
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-white/60' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'} hover:text-[#FFD700] flex items-center justify-center transition-all`}>
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-white/60' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'} hover:text-[#FFD700] flex items-center justify-center transition-all`}>
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-white/60' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'} hover:text-[#FFD700] flex items-center justify-center transition-all`}>
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className={`${theme === 'dark' ? 'text-white' : 'text-black'} mb-4 sm:mb-6 text-base sm:text-lg`}>Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { name: 'About Us', href: '/#about-us' },
                { name: 'Live Rates', href: '/#live-prices' },
                { name: 'Products', href: '/#products' },
                { name: 'Charts', href: '/#charts' },
                { name: 'News', href: '/#news' },
                { name: 'Contact', href: '/#contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'} hover:text-[#FFD700] transition-colors text-sm sm:text-base`}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className={`${theme === 'dark' ? 'text-white' : 'text-black'} mb-4 sm:mb-6 text-base sm:text-lg`}>Services</h4>
            <ul className="space-y-2 sm:space-y-3">
              {['Gold Trading', 'Silver Trading', 'Portfolio Management', 'Market Analysis', 'Investment Advisory', 'Secure Storage'].map((service) => (
                <li key={service}>
                  <a href="#" className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'} hover:text-[#FFD700] transition-colors text-sm sm:text-base`}>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className={`${theme === 'dark' ? 'text-white' : 'text-black'} mb-4 sm:mb-6 text-base sm:text-lg`}>Contact Details</h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-2 sm:gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD700] mt-1 flex-shrink-0" />
                <div>
                  <p className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'} text-xs sm:text-sm mb-1`}>Email</p>
                  <a href="mailto:support@goldjar.com" className={`${theme === 'dark' ? 'text-white' : 'text-black'} hover:text-[#FFD700] transition-colors text-sm sm:text-base`}>
                    support@goldjar.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD700] mt-1 flex-shrink-0" />
                <div>
                  <p className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'} text-xs sm:text-sm mb-1`}>Phone</p>
                  <a href="tel:+911234567890" className={`${theme === 'dark' ? 'text-white' : 'text-black'} hover:text-[#FFD700] transition-colors text-sm sm:text-base`}>
                    +91 123 456 7890
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD700] mt-1 flex-shrink-0" />
                <div>
                  <p className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'} text-xs sm:text-sm mb-1`}>Address</p>
                  <p className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-sm sm:text-base`}>
                    123 Bullion Street<br />
                    Mumbai, India 400001
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* App Download */}
        <div className="glass-card rounded-2xl p-4 sm:p-6 lg:p-8 mb-8 sm:mb-10 lg:mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
            <div>
              <h4 className={`${theme === 'dark' ? 'text-white' : 'text-black'} mb-2 text-base sm:text-lg lg:text-xl`}>Trade on the Go</h4>
              <p className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'} text-sm sm:text-base`}>Download our mobile app for seamless trading</p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 lg:gap-4 w-full sm:w-auto">
              <button className={`px-4 sm:px-6 py-2.5 sm:py-3 ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white' : 'bg-gray-100 hover:bg-gray-200 border-gray-200 text-black'} border rounded-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base`}>
                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <span className="hidden sm:inline">App Store</span>
                <span className="sm:hidden">iOS</span>
              </button>
              <button className={`px-4 sm:px-6 py-2.5 sm:py-3 ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white' : 'bg-gray-100 hover:bg-gray-200 border-gray-200 text-black'} border rounded-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base`}>
                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <span className="hidden sm:inline">Play Store</span>
                <span className="sm:hidden">Android</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom */}
        <div className={`pt-6 sm:pt-8 border-t ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            <p className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'} text-xs sm:text-sm`}>
              © 2024 GoldJar. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8">
              <a href="#" className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'} hover:text-[#FFD700] text-xs sm:text-sm transition-colors`}>
                Privacy Policy
              </a>
              <a href="#" className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'} hover:text-[#FFD700] text-xs sm:text-sm transition-colors`}>
                Terms of Service
              </a>
              <a href="#" className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'} hover:text-[#FFD700] text-xs sm:text-sm transition-colors`}>
                Disclaimer
              </a>
            </div>
          </div>
          
          <div className={`mt-4 sm:mt-6 p-3 sm:p-4 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-gray-200'} rounded-lg border`}>
            <p className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'} text-xs leading-relaxed`}>
              <strong className={theme === 'dark' ? 'text-white' : 'text-black'}>Disclaimer:</strong> Trading in gold and silver involves market risks. Past performance is not indicative of future results. 
              Please read all scheme related documents carefully before investing. The price of precious metals can fluctuate and you may not get back the amount you invested. 
              This platform is not meant for collecting PII or securing sensitive personal data.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: 'trading' | 'kyc' | 'payment' | 'general';
}

interface FAQProps {
  theme: 'dark' | 'light';
}

export function FAQ({ theme }: FAQProps) {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'trading' | 'kyc' | 'payment' | 'general'>('all');
  
  const faqData: FAQItem[] = [
    {
      id: 1,
      question: 'How do I start trading on GoldJar?',
      answer: 'To start trading on GoldJar, first register for an account by clicking the "Register" button. Complete your KYC verification by submitting required documents (PAN, Aadhar, and photo). Once verified, you can fund your account and start buying/selling gold, silver, and coins.',
      category: 'trading'
    },
    {
      id: 2,
      question: 'What documents are required for KYC verification?',
      answer: 'You need to submit three documents: 1) PAN Card (mandatory for all transactions), 2) Aadhar Card for identity verification, and 3) A recent passport-size photograph. All documents should be clear and readable.',
      category: 'kyc'
    },
    {
      id: 3,
      question: 'How long does KYC verification take?',
      answer: 'KYC verification typically takes 24-48 hours. You will receive an email notification once your verification is complete. In some cases, additional documents may be requested.',
      category: 'kyc'
    },
    {
      id: 4,
      question: 'What are the payment methods accepted?',
      answer: 'GoldJar accepts multiple payment methods including: Net Banking, UPI, RTGS/NEFT, and Debit Cards. For high-value transactions above ₹2 lakhs, we recommend using RTGS for faster processing.',
      category: 'payment'
    },
    {
      id: 5,
      question: 'Are there any transaction limits?',
      answer: 'Without KYC, transactions are limited to ₹50,000 per day. After completing KYC verification, you can trade up to ₹10 lakhs per day. For higher limits, please contact our support team.',
      category: 'trading'
    },
    {
      id: 6,
      question: 'How is the live price determined?',
      answer: 'Our live prices are based on international spot prices from major bullion exchanges (LBMA, COMEX) and updated every 30 seconds during market hours. Prices include applicable GST and transaction charges.',
      category: 'trading'
    },
    {
      id: 7,
      question: 'What is TDS and when is it applicable?',
      answer: 'TDS (Tax Deducted at Source) of 1% is applicable on sale transactions exceeding ₹1 lakh. This is automatically deducted from your proceeds. You can use our TDS Calculator to estimate your tax liability.',
      category: 'payment'
    },
    {
      id: 8,
      question: 'Can I get physical delivery of gold/silver?',
      answer: 'Yes, physical delivery is available for all purchases. Delivery charges apply based on location and quantity. Delivery typically takes 3-5 business days. Insurance is included for all shipments.',
      category: 'general'
    },
    {
      id: 9,
      question: 'What is the difference between 995 and 999 purity?',
      answer: '999 purity means 99.9% pure gold/silver (also called 24K for gold). 995 purity means 99.5% pure (approximately 23.8K for gold). 999 purity products are priced higher due to higher metal content.',
      category: 'general'
    },
    {
      id: 10,
      question: 'How secure is my investment?',
      answer: 'All physical gold/silver is stored in highly secure, insured vaults. Your holdings are segregated and audited regularly. GoldJar uses bank-grade encryption for all transactions and personal data.',
      category: 'general'
    },
    {
      id: 11,
      question: 'What are the charges for buying and selling?',
      answer: 'Buy transactions include GST (3% on gold, 3% on silver) and a nominal processing fee. Sell transactions have no additional charges, but TDS may apply on profits. Check the "Bank Details" section for complete fee structure.',
      category: 'payment'
    },
    {
      id: 12,
      question: 'How do I track my portfolio?',
      answer: 'Once logged in, visit your Dashboard to view real-time portfolio value, profit/loss, transaction history, and holdings breakdown. You can also download detailed reports for tax purposes.',
      category: 'trading'
    }
  ];
  
  const filteredFAQs = activeCategory === 'all' 
    ? faqData 
    : faqData.filter(faq => faq.category === activeCategory);
  
  const toggleFAQ = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'trading':
        return 'text-[#FFD700]';
      case 'kyc':
        return 'text-blue-400';
      case 'payment':
        return 'text-green-400';
      default:
        return 'text-purple-400';
    }
  };
  
  return (
    <section id="faq" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="text-center mb-8 sm:mb-10 lg:mb-12">
        <h2 className={`mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}>
          Frequently Asked Questions
        </h2>
        <p className={`text-sm sm:text-base lg:text-lg px-4 ${
          theme === 'dark' ? 'text-white/60' : 'text-gray-600'
        }`}>
          Find answers to common questions about trading, KYC, payments, and more
        </p>
      </div>
      
      {/* Category Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 lg:gap-4 mb-8 sm:mb-10 lg:mb-12 px-4">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 rounded-xl transition-all duration-300 text-xs sm:text-sm lg:text-base whitespace-nowrap ${
            activeCategory === 'all'
              ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black'
              : theme === 'dark'
              ? 'glass-card text-white/80 hover:text-white'
              : 'bg-gray-100 text-gray-700 hover:text-black'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveCategory('trading')}
          className={`px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 rounded-xl transition-all duration-300 text-xs sm:text-sm lg:text-base whitespace-nowrap ${
            activeCategory === 'trading'
              ? 'bg-[#FFD700]/20 border border-[#FFD700]/50 text-[#FFD700]'
              : theme === 'dark'
              ? 'glass-card text-white/80 hover:text-white'
              : 'bg-gray-100 text-gray-700 hover:text-black'
          }`}
        >
          Trading
        </button>
        <button
          onClick={() => setActiveCategory('kyc')}
          className={`px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 rounded-xl transition-all duration-300 text-xs sm:text-sm lg:text-base whitespace-nowrap ${
            activeCategory === 'kyc'
              ? 'bg-blue-500/20 border border-blue-500/50 text-blue-400'
              : theme === 'dark'
              ? 'glass-card text-white/80 hover:text-white'
              : 'bg-gray-100 text-gray-700 hover:text-black'
          }`}
        >
          KYC
        </button>
        <button
          onClick={() => setActiveCategory('payment')}
          className={`px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 rounded-xl transition-all duration-300 text-xs sm:text-sm lg:text-base whitespace-nowrap ${
            activeCategory === 'payment'
              ? 'bg-green-500/20 border border-green-500/50 text-green-400'
              : theme === 'dark'
              ? 'glass-card text-white/80 hover:text-white'
              : 'bg-gray-100 text-gray-700 hover:text-black'
          }`}
        >
          Payment
        </button>
        <button
          onClick={() => setActiveCategory('general')}
          className={`px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 rounded-xl transition-all duration-300 text-xs sm:text-sm lg:text-base whitespace-nowrap ${
            activeCategory === 'general'
              ? 'bg-purple-500/20 border border-purple-500/50 text-purple-400'
              : theme === 'dark'
              ? 'glass-card text-white/80 hover:text-white'
              : 'bg-gray-100 text-gray-700 hover:text-black'
          }`}
        >
          General
        </button>
      </div>
      
      {/* FAQ List */}
      <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
        {filteredFAQs.map((faq) => (
          <Card 
            key={faq.id} 
            className={`transition-all duration-300 cursor-pointer ${
              theme === 'dark' ? 'border-white/10' : 'border-gray-200'
            } ${activeId === faq.id ? 'border-[#FFD700]/30' : ''}`}
            onClick={() => toggleFAQ(faq.id)}
          >
            <div>
              <div className="flex items-start justify-between gap-3 sm:gap-4">
                <div className="flex items-start gap-2 sm:gap-3 flex-1">
                  <HelpCircle className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 sm:mt-1 ${getCategoryColor(faq.category)}`} />
                  <div className="flex-1">
                    <h4 className={`mb-2 text-sm sm:text-base lg:text-lg ${
                      theme === 'dark' ? 'text-white' : 'text-black'
                    }`}>
                      {faq.question}
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(faq.category)} ${
                      theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'
                    }`}>
                      {faq.category.toUpperCase()}
                    </span>
                  </div>
                </div>
                <button className="text-[#FFD700] transition-transform duration-300 flex-shrink-0">
                  {activeId === faq.id ? (
                    <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
              
              {activeId === faq.id && (
                <div className={`mt-3 sm:mt-4 pt-3 sm:pt-4 border-t animate-fadeIn ${
                  theme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}>
                  <p className={`leading-relaxed text-sm sm:text-base ${
                    theme === 'dark' ? 'text-white/70' : 'text-gray-700'
                  }`}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
      
      {/* Contact Support */}
      <div className="mt-8 sm:mt-10 lg:mt-12 text-center px-4">
        <Card className={`max-w-2xl mx-auto border-[#FFD700]/20 ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-[#FFD700]/5 to-transparent' 
            : 'bg-gradient-to-br from-[#FFD700]/10 to-transparent'
        }`}>
          <div className="text-center">
            <h3 className={`mb-2 sm:mb-3 text-lg sm:text-xl lg:text-2xl ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}>
              Still have questions?
            </h3>
            <p className={`mb-4 sm:mb-6 text-sm sm:text-base ${
              theme === 'dark' ? 'text-white/70' : 'text-gray-700'
            }`}>
              Our support team is here to help you 24/7
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a 
                href="#message" 
                className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black rounded-xl hover:shadow-lg hover:shadow-[#FFD700]/20 transition-all duration-300 text-sm sm:text-base"
              >
                Send Message
              </a>
              <a 
                href="tel:+911800123456" 
                className={`w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-300 text-sm sm:text-base ${
                  theme === 'dark'
                    ? 'glass-card border border-white/10 text-white hover:border-[#FFD700]/50'
                    : 'bg-white border border-gray-200 text-black hover:border-[#FFD700]/50'
                }`}
              >
                Call Support
              </a>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

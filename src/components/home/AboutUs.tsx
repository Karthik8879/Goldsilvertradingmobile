import React from 'react';
import { Card } from '@/components/ui/Card';
import { Shield, Award, TrendingUp, Users, Lock, Clock } from 'lucide-react';

interface AboutUsProps {
  theme: 'dark' | 'light';
}

export function AboutUs({ theme }: AboutUsProps) {
  const features = [
    {
      icon: Shield,
      title: 'Secure Trading',
      description: 'Bank-grade security with encrypted transactions and insured vault storage for all physical holdings.'
    },
    {
      icon: Award,
      title: 'Certified Purity',
      description: 'All products are certified for 995 and 999 purity with hallmark guarantees from accredited institutions.'
    },
    {
      icon: TrendingUp,
      title: 'Live Pricing',
      description: 'Real-time price updates based on international markets (LBMA, COMEX) updated every 30 seconds.'
    },
    {
      icon: Users,
      title: '50,000+ Customers',
      description: 'Trusted by thousands of investors across India for secure gold and silver trading since 2015.'
    },
    {
      icon: Lock,
      title: 'KYC Compliant',
      description: 'Fully compliant with RBI and SEBI regulations ensuring transparent and lawful transactions.'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer support via phone, email, and live chat for all your queries.'
    }
  ];
  
  return (
    <section id="about-us" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="text-center mb-8 sm:mb-10 lg:mb-12">
        <h2 className={`mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}>
          About GoldJar
        </h2>
        <p className={`text-base sm:text-lg max-w-3xl mx-auto px-4 ${
          theme === 'dark' ? 'text-white/60' : 'text-gray-600'
        }`}>
          India's premier digital platform for trading gold, silver, and precious metal coins with complete transparency, security, and trust
        </p>
      </div>
      
      {/* Hero Section */}
      <Card className={`border-[#FFD700]/20 mb-8 sm:mb-10 lg:mb-12 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-[#FFD700]/5 to-transparent' 
          : 'bg-gradient-to-br from-[#FFD700]/10 to-transparent'
      }`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          <div>
            <h3 className={`mb-4 sm:mb-6 text-xl sm:text-2xl lg:text-3xl ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}>
              Your Trusted Partner in Precious Metals Trading
            </h3>
            <div className={`space-y-3 sm:space-y-4 text-sm sm:text-base ${
              theme === 'dark' ? 'text-white/70' : 'text-gray-700'
            }`}>
              <p>
                GoldJar is India's leading digital bullion trading platform, established in 2015 with a mission to make gold and silver investment accessible, transparent, and secure for everyone.
              </p>
              <p>
                We combine traditional bullion trading expertise with cutting-edge technology to provide real-time pricing, instant transactions, and secure vault storage. Whether you're a first-time investor or an experienced trader, GoldJar offers the tools and support you need.
              </p>
              <p>
                With over 50,000 satisfied customers and ₹500+ crores in transactions, we've built a reputation for trust, transparency, and exceptional service in the precious metals industry.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <Card className="border-[#FFD700]/30 text-center">
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl text-[#FFD700] mb-1 sm:mb-2">50K+</div>
                <p className={`text-xs sm:text-sm ${
                  theme === 'dark' ? 'text-white/60' : 'text-gray-600'
                }`}>
                  Active Customers
                </p>
              </div>
            </Card>
            <Card className="border-[#FFD700]/30 text-center">
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl text-[#FFD700] mb-1 sm:mb-2">₹500Cr+</div>
                <p className={`text-xs sm:text-sm ${
                  theme === 'dark' ? 'text-white/60' : 'text-gray-600'
                }`}>
                  Transactions
                </p>
              </div>
            </Card>
            <Card className="border-[#FFD700]/30 text-center">
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl text-[#FFD700] mb-1 sm:mb-2">10+</div>
                <p className={`text-xs sm:text-sm ${
                  theme === 'dark' ? 'text-white/60' : 'text-gray-600'
                }`}>
                  Years Experience
                </p>
              </div>
            </Card>
            <Card className="border-[#FFD700]/30 text-center">
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl text-[#FFD700] mb-1 sm:mb-2">99.9%</div>
                <p className={`text-xs sm:text-sm ${
                  theme === 'dark' ? 'text-white/60' : 'text-gray-600'
                }`}>
                  Purity Guarantee
                </p>
              </div>
            </Card>
          </div>
        </div>
      </Card>
      
      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {features.map((feature, index) => (
          <Card 
            key={index} 
            className={`transition-all duration-300 ${
              theme === 'dark' 
                ? 'border-white/10 hover:border-[#FFD700]/30' 
                : 'border-gray-200 hover:border-[#FFD700]/30'
            }`}
            glowOnHover
          >
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#FFD700]" />
              </div>
              <h4 className={`mb-2 sm:mb-3 text-base sm:text-lg ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                {feature.title}
              </h4>
              <p className={`text-xs sm:text-sm leading-relaxed ${
                theme === 'dark' ? 'text-white/60' : 'text-gray-600'
              }`}>
                {feature.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Mission & Vision */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 mt-8 sm:mt-10 lg:mt-12">
        <Card className="border-[#FFD700]/20">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD700]" />
              </div>
              <h3 className={`text-lg sm:text-xl ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                Our Mission
              </h3>
            </div>
            <p className={`leading-relaxed text-sm sm:text-base ${
              theme === 'dark' ? 'text-white/70' : 'text-gray-700'
            }`}>
              To democratize precious metal investing by providing a secure, transparent, and user-friendly platform that empowers every Indian to build wealth through gold and silver investments.
            </p>
          </div>
        </Card>
        
        <Card className="border-[#FFD700]/20">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD700]" />
              </div>
              <h3 className={`text-lg sm:text-xl ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                Our Vision
              </h3>
            </div>
            <p className={`leading-relaxed text-sm sm:text-base ${
              theme === 'dark' ? 'text-white/70' : 'text-gray-700'
            }`}>
              To become India's most trusted and innovative digital bullion platform, setting new standards in transparency, security, and customer experience in the precious metals industry.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}

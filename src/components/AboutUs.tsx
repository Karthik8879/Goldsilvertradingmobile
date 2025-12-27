import React from 'react';
import { Card } from './ui/Card';
import { Shield, Award, TrendingUp, Users, Lock, Clock } from 'lucide-react';

export function AboutUs() {
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
    <section id="about-us" className="max-w-[1440px] mx-auto px-8 py-20">
      <div className="text-center mb-12">
        <h2 className="text-white mb-4">
          About GoldJar
        </h2>
        <p className="text-white/60 text-lg max-w-3xl mx-auto">
          India's premier digital platform for trading gold, silver, and precious metal coins with complete transparency, security, and trust
        </p>
      </div>
      
      {/* Hero Section */}
      <Card className="border-[#FFD700]/20 mb-12 bg-gradient-to-br from-[#FFD700]/5 to-transparent">
        <div className="grid grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-white mb-6">
              Your Trusted Partner in Precious Metals Trading
            </h3>
            <div className="space-y-4 text-white/70">
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
          
          <div className="grid grid-cols-2 gap-6">
            <Card className="border-[#FFD700]/30 text-center">
              <div>
                <div className="text-4xl text-[#FFD700] mb-2">50K+</div>
                <p className="text-white/60">Active Customers</p>
              </div>
            </Card>
            <Card className="border-[#FFD700]/30 text-center">
              <div>
                <div className="text-4xl text-[#FFD700] mb-2">₹500Cr+</div>
                <p className="text-white/60">Transactions</p>
              </div>
            </Card>
            <Card className="border-[#FFD700]/30 text-center">
              <div>
                <div className="text-4xl text-[#FFD700] mb-2">10+</div>
                <p className="text-white/60">Years Experience</p>
              </div>
            </Card>
            <Card className="border-[#FFD700]/30 text-center">
              <div>
                <div className="text-4xl text-[#FFD700] mb-2">99.9%</div>
                <p className="text-white/60">Purity Guarantee</p>
              </div>
            </Card>
          </div>
        </div>
      </Card>
      
      {/* Features Grid */}
      <div className="grid grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="border-white/10 hover:border-[#FFD700]/30 transition-all duration-300" glowOnHover>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/10 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-[#FFD700]" />
              </div>
              <h4 className="text-white mb-3">{feature.title}</h4>
              <p className="text-white/60 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Mission & Vision */}
      <div className="grid grid-cols-2 gap-6 mt-12">
        <Card className="border-[#FFD700]/20">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#FFD700]" />
              </div>
              <h3 className="text-white">Our Mission</h3>
            </div>
            <p className="text-white/70 leading-relaxed">
              To democratize precious metal investing by providing a secure, transparent, and user-friendly platform that empowers every Indian to build wealth through gold and silver investments.
            </p>
          </div>
        </Card>
        
        <Card className="border-[#FFD700]/20">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                <Award className="w-5 h-5 text-[#FFD700]" />
              </div>
              <h3 className="text-white">Our Vision</h3>
            </div>
            <p className="text-white/70 leading-relaxed">
              To become India's most trusted and innovative digital bullion platform, setting new standards in transparency, security, and customer experience in the precious metals industry.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}

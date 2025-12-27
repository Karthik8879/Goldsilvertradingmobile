'use client';

import React, { useState } from 'react';
import { X, Mail, Lock, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import logoImage from 'figma:asset/d208c619cae16192db73abf599e54a94f3d40496.png';

interface LoginModalProps {
  onClose: () => void;
  theme: 'dark' | 'light';
}

export function LoginModal({ onClose, theme }: LoginModalProps) {
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const { login } = useAuth();

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('otp');
  };

  const handleVerifyOTP = () => {
    // Verify OTP and login
    login(email, password);
    onClose();
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
      ></div>
      
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className={`w-full max-w-md rounded-2xl border shadow-2xl ${
          theme === 'dark' ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-gray-200'
        }`}>
          {/* Header */}
          <div className={`flex items-center justify-between p-6 border-b ${
            theme === 'dark' ? 'border-white/10' : 'border-gray-200'
          }`}>
            <div className="flex items-center gap-3">
              <img src={logoImage} alt="GoldJar" className="h-8" />
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-all ${
                theme === 'dark' ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-black'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {step === 'details' ? (
              <form onSubmit={handleSendOTP} className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className={`text-2xl mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    Welcome Back
                  </h2>
                  <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
                    Login to access your trading account
                  </p>
                </div>

                {/* Email */}
                <div>
                  <label className={`block text-sm mb-2 ${
                    theme === 'dark' ? 'text-white/70' : 'text-gray-700'
                  }`}>
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                      theme === 'dark' ? 'text-white/40' : 'text-gray-400'
                    }`} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all ${
                        theme === 'dark'
                          ? 'bg-white/5 border-white/10 text-white placeholder-white/40'
                          : 'bg-gray-50 border-gray-200 text-black placeholder-gray-400'
                      } outline-none focus:border-[#FFD700]/50`}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className={`block text-sm mb-2 ${
                    theme === 'dark' ? 'text-white/70' : 'text-gray-700'
                  }`}>
                    Password
                  </label>
                  <div className="relative">
                    <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                      theme === 'dark' ? 'text-white/40' : 'text-gray-400'
                    }`} />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all ${
                        theme === 'dark'
                          ? 'bg-white/5 border-white/10 text-white placeholder-white/40'
                          : 'bg-gray-50 border-gray-200 text-black placeholder-gray-400'
                      } outline-none focus:border-[#FFD700]/50`}
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button type="submit" variant="primary" className="w-full">
                  Send OTP
                </Button>

                <p className={`text-center text-sm ${
                  theme === 'dark' ? 'text-white/60' : 'text-gray-600'
                }`}>
                  Don't have an account?{' '}
                  <a href="#" className="text-[#FFD700] hover:underline">
                    Sign up
                  </a>
                </p>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-black" />
                  </div>
                  <h2 className={`text-2xl mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    Verify OTP
                  </h2>
                  <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
                    Enter the 6-digit code sent to<br />
                    <span className="text-[#FFD700]">{email}</span>
                  </p>
                </div>

                {/* OTP Inputs */}
                <div className="flex gap-2 justify-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className={`w-12 h-12 text-center text-xl rounded-xl border transition-all ${
                        theme === 'dark'
                          ? 'bg-white/5 border-white/10 text-white'
                          : 'bg-gray-50 border-gray-200 text-black'
                      } outline-none focus:border-[#FFD700]/50`}
                    />
                  ))}
                </div>

                {/* Verify Button */}
                <Button 
                  onClick={handleVerifyOTP} 
                  variant="primary" 
                  className="w-full"
                  disabled={otp.some(d => !d)}
                >
                  <Check className="w-5 h-5" />
                  Verify & Login
                </Button>

                <p className={`text-center text-sm ${
                  theme === 'dark' ? 'text-white/60' : 'text-gray-600'
                }`}>
                  Didn't receive the code?{' '}
                  <button className="text-[#FFD700] hover:underline">
                    Resend OTP
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

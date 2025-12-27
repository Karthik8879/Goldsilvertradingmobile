import React, { useState } from 'react';
import { X, User, Building2, Phone, Lock } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
  onLoginSuccess: () => void;
}

export function LoginModal({ isOpen, onClose, theme, onLoginSuccess }: LoginModalProps) {
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [formData, setFormData] = useState({
    authorisedName: '',
    companyName: '',
    mobileNumber: ''
  });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.authorisedName && formData.companyName && formData.mobileNumber) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        setStep('otp');
      }, 1000);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        onLoginSuccess();
        onClose();
        // Reset form
        setStep('details');
        setFormData({ authorisedName: '', companyName: '', mobileNumber: '' });
        setOtp(['', '', '', '', '', '']);
      }, 1000);
    }
  };

  const handleResendOtp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('OTP resent successfully!');
    }, 1000);
  };

  const handleClose = () => {
    setStep('details');
    setFormData({ authorisedName: '', companyName: '', mobileNumber: '' });
    setOtp(['', '', '', '', '', '']);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div 
        className={`relative w-full max-w-md rounded-2xl border p-6 sm:p-8 ${
          theme === 'dark' 
            ? 'bg-[#1a1a1a] border-white/10' 
            : 'bg-white border-gray-200'
        } shadow-2xl`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className={`absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
            theme === 'dark'
              ? 'hover:bg-white/10 text-white/60 hover:text-white'
              : 'hover:bg-gray-100 text-gray-600 hover:text-black'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className={`text-2xl mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            {step === 'details' ? 'Login to GoldJar' : 'Verify OTP'}
          </h2>
          <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
            {step === 'details' 
              ? 'Enter your details to continue' 
              : `OTP sent to ${formData.mobileNumber}`}
          </p>
        </div>

        {/* Details Form */}
        {step === 'details' && (
          <form onSubmit={handleMobileSubmit} className="space-y-4">
            {/* Authorised Name */}
            <div>
              <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-gray-700'}`}>
                Authorised Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  theme === 'dark' ? 'text-white/40' : 'text-gray-400'
                }`} />
                <input
                  type="text"
                  name="authorisedName"
                  value={formData.authorisedName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter authorised person name"
                  className={`w-full pl-11 pr-4 py-3 rounded-lg border transition-all ${
                    theme === 'dark'
                      ? 'bg-white/5 border-white/10 text-white placeholder-white/40 focus:border-[#FFD700]/50 focus:bg-white/10'
                      : 'bg-gray-50 border-gray-200 text-black placeholder-gray-400 focus:border-[#FFD700] focus:bg-white'
                  } outline-none`}
                />
              </div>
            </div>

            {/* Company Name */}
            <div>
              <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-gray-700'}`}>
                Company Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Building2 className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  theme === 'dark' ? 'text-white/40' : 'text-gray-400'
                }`} />
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter company name"
                  className={`w-full pl-11 pr-4 py-3 rounded-lg border transition-all ${
                    theme === 'dark'
                      ? 'bg-white/5 border-white/10 text-white placeholder-white/40 focus:border-[#FFD700]/50 focus:bg-white/10'
                      : 'bg-gray-50 border-gray-200 text-black placeholder-gray-400 focus:border-[#FFD700] focus:bg-white'
                  } outline-none`}
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div>
              <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-gray-700'}`}>
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  theme === 'dark' ? 'text-white/40' : 'text-gray-400'
                }`} />
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  required
                  maxLength={10}
                  pattern="[0-9]{10}"
                  placeholder="Enter 10-digit mobile number"
                  className={`w-full pl-11 pr-4 py-3 rounded-lg border transition-all ${
                    theme === 'dark'
                      ? 'bg-white/5 border-white/10 text-white placeholder-white/40 focus:border-[#FFD700]/50 focus:bg-white/10'
                      : 'bg-gray-50 border-gray-200 text-black placeholder-gray-400 focus:border-[#FFD700] focus:bg-white'
                  } outline-none`}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black rounded-lg hover:shadow-xl hover:shadow-yellow-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        )}

        {/* OTP Form */}
        {step === 'otp' && (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            {/* OTP Input */}
            <div>
              <label className={`block text-sm mb-3 ${theme === 'dark' ? 'text-white/70' : 'text-gray-700'}`}>
                Enter 6-Digit OTP <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2 justify-between">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className={`w-12 h-12 sm:w-14 sm:h-14 text-center text-xl rounded-lg border transition-all ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/10 text-white focus:border-[#FFD700]/50 focus:bg-white/10'
                        : 'bg-gray-50 border-gray-200 text-black focus:border-[#FFD700] focus:bg-white'
                    } outline-none`}
                  />
                ))}
              </div>
            </div>

            {/* Resend OTP */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={loading}
                className={`text-sm ${
                  theme === 'dark' ? 'text-[#FFD700] hover:text-[#FFA500]' : 'text-[#FFA500] hover:text-[#FFD700]'
                } transition-colors disabled:opacity-50`}
              >
                Resend OTP
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || otp.some(d => !d)}
              className="w-full py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black rounded-lg hover:shadow-xl hover:shadow-yellow-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify & Login'}
            </button>

            {/* Back Button */}
            <button
              type="button"
              onClick={() => setStep('details')}
              className={`w-full py-3 rounded-lg border transition-all ${
                theme === 'dark'
                  ? 'border-white/10 text-white/70 hover:bg-white/5'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Change Mobile Number
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

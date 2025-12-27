'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Upload, CheckCircle, AlertCircle, User, Mail, Phone, MapPin } from 'lucide-react';

interface KYCProps {
  theme: 'dark' | 'light';
}

export function KYC({ theme }: KYCProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    panCard: '',
    aadharCard: ''
  });
  
  const [uploadedDocs, setUploadedDocs] = useState({
    pan: false,
    aadhar: false,
    photo: false
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleFileUpload = (docType: 'pan' | 'aadhar' | 'photo') => {
    setUploadedDocs({
      ...uploadedDocs,
      [docType]: true
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('KYC verification submitted successfully! You will receive an email within 24-48 hours.');
  };
  
  return (
    <section id="kyc" className={`max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 ${
      theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'
    }`}>
      <div className="text-center mb-8 sm:mb-10 lg:mb-12">
        <h2 className={`mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}>
          KYC Verification
        </h2>
        <p className={`text-base sm:text-lg ${
          theme === 'dark' ? 'text-white/60' : 'text-gray-600'
        }`}>
          Complete your Know Your Customer verification for secure trading
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <Card className="border-[#FFD700]/20">
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Status Banner */}
            <div className={`glass-card border border-[#FFD700]/30 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 ${
              theme === 'dark' ? '' : 'bg-amber-50'
            }`}>
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD700] flex-shrink-0" />
              <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-white/80' : 'text-gray-800'}`}>
                KYC verification is mandatory for transactions above ₹50,000
              </p>
            </div>
            
            {/* Personal Information */}
            <div>
              <h3 className={`mb-4 sm:mb-6 flex items-center gap-2 text-lg sm:text-xl ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD700]" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className={`block mb-2 text-sm sm:text-base ${
                    theme === 'dark' ? 'text-white/80' : 'text-gray-700'
                  }`}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-xl transition-colors text-sm sm:text-base ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#FFD700]/50'
                        : 'bg-white border-gray-200 text-black placeholder:text-gray-400 focus:border-[#FFD700]/50'
                    } focus:outline-none`}
                  />
                </div>
                
                <div>
                  <label className={`block mb-2 text-sm sm:text-base flex items-center gap-2 ${
                    theme === 'dark' ? 'text-white/80' : 'text-gray-700'
                  }`}>
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-xl transition-colors text-sm sm:text-base ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#FFD700]/50'
                        : 'bg-white border-gray-200 text-black placeholder:text-gray-400 focus:border-[#FFD700]/50'
                    } focus:outline-none`}
                  />
                </div>
                
                <div>
                  <label className={`block mb-2 text-sm sm:text-base flex items-center gap-2 ${
                    theme === 'dark' ? 'text-white/80' : 'text-gray-700'
                  }`}>
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    required
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-xl transition-colors text-sm sm:text-base ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#FFD700]/50'
                        : 'bg-white border-gray-200 text-black placeholder:text-gray-400 focus:border-[#FFD700]/50'
                    } focus:outline-none`}
                  />
                </div>
                
                <div>
                  <label className={`block mb-2 text-sm sm:text-base flex items-center gap-2 ${
                    theme === 'dark' ? 'text-white/80' : 'text-gray-700'
                  }`}>
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your full address"
                    rows={3}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-xl transition-colors text-sm sm:text-base ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#FFD700]/50'
                        : 'bg-white border-gray-200 text-black placeholder:text-gray-400 focus:border-[#FFD700]/50'
                    } focus:outline-none`}
                  />
                </div>
              </div>
            </div>
            
            {/* Document Upload */}
            <div>
              <h3 className={`mb-4 sm:mb-6 text-lg sm:text-xl ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                Upload Documents
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {/* PAN Card */}
                <div className={`border-2 border-dashed rounded-xl p-4 sm:p-6 text-center transition-colors ${
                  uploadedDocs.pan
                    ? 'border-green-500/50 bg-green-500/5'
                    : theme === 'dark'
                    ? 'border-white/20 hover:border-[#FFD700]/50'
                    : 'border-gray-300 hover:border-[#FFD700]/50'
                }`}>
                  <input
                    type="file"
                    id="pan-upload"
                    className="hidden"
                    accept="image/*,.pdf"
                    onChange={() => handleFileUpload('pan')}
                  />
                  <label htmlFor="pan-upload" className="cursor-pointer">
                    {uploadedDocs.pan ? (
                      <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-500 mx-auto mb-2 sm:mb-3" />
                    ) : (
                      <Upload className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 ${
                        theme === 'dark' ? 'text-white/40' : 'text-gray-400'
                      }`} />
                    )}
                    <p className={`mb-1 text-sm sm:text-base ${
                      theme === 'dark' ? 'text-white' : 'text-black'
                    }`}>
                      PAN Card *
                    </p>
                    <p className={`text-xs ${
                      theme === 'dark' ? 'text-white/60' : 'text-gray-600'
                    }`}>
                      {uploadedDocs.pan ? 'Uploaded ✓' : 'Click to upload'}
                    </p>
                  </label>
                </div>

                {/* Aadhar Card */}
                <div className={`border-2 border-dashed rounded-xl p-4 sm:p-6 text-center transition-colors ${
                  uploadedDocs.aadhar
                    ? 'border-green-500/50 bg-green-500/5'
                    : theme === 'dark'
                    ? 'border-white/20 hover:border-[#FFD700]/50'
                    : 'border-gray-300 hover:border-[#FFD700]/50'
                }`}>
                  <input
                    type="file"
                    id="aadhar-upload"
                    className="hidden"
                    accept="image/*,.pdf"
                    onChange={() => handleFileUpload('aadhar')}
                  />
                  <label htmlFor="aadhar-upload" className="cursor-pointer">
                    {uploadedDocs.aadhar ? (
                      <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-500 mx-auto mb-2 sm:mb-3" />
                    ) : (
                      <Upload className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 ${
                        theme === 'dark' ? 'text-white/40' : 'text-gray-400'
                      }`} />
                    )}
                    <p className={`mb-1 text-sm sm:text-base ${
                      theme === 'dark' ? 'text-white' : 'text-black'
                    }`}>
                      Aadhar Card *
                    </p>
                    <p className={`text-xs ${
                      theme === 'dark' ? 'text-white/60' : 'text-gray-600'
                    }`}>
                      {uploadedDocs.aadhar ? 'Uploaded ✓' : 'Click to upload'}
                    </p>
                  </label>
                </div>

                {/* Photo */}
                <div className={`border-2 border-dashed rounded-xl p-4 sm:p-6 text-center transition-colors ${
                  uploadedDocs.photo
                    ? 'border-green-500/50 bg-green-500/5'
                    : theme === 'dark'
                    ? 'border-white/20 hover:border-[#FFD700]/50'
                    : 'border-gray-300 hover:border-[#FFD700]/50'
                }`}>
                  <input
                    type="file"
                    id="photo-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={() => handleFileUpload('photo')}
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    {uploadedDocs.photo ? (
                      <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-500 mx-auto mb-2 sm:mb-3" />
                    ) : (
                      <Upload className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 ${
                        theme === 'dark' ? 'text-white/40' : 'text-gray-400'
                      }`} />
                    )}
                    <p className={`mb-1 text-sm sm:text-base ${
                      theme === 'dark' ? 'text-white' : 'text-black'
                    }`}>
                      Photograph *
                    </p>
                    <p className={`text-xs ${
                      theme === 'dark' ? 'text-white/60' : 'text-gray-600'
                    }`}>
                      {uploadedDocs.photo ? 'Uploaded ✓' : 'Click to upload'}
                    </p>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <Button 
                type="submit" 
                variant="primary" 
                className="w-full sm:flex-1 text-sm sm:text-base"
              >
                Submit for Verification
              </Button>
              <Button 
                type="button" 
                variant="secondary" 
                className="w-full sm:flex-1 text-sm sm:text-base"
                onClick={() => {
                  setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    address: '',
                    panCard: '',
                    aadharCard: ''
                  });
                  setUploadedDocs({ pan: false, aadhar: false, photo: false });
                }}
              >
                Reset Form
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}

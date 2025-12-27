import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Upload, CheckCircle, AlertCircle, User, Mail, Phone, MapPin } from 'lucide-react';

export function KYC() {
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
  
  return (
    <section id="kyc" className="max-w-[1440px] mx-auto px-8 py-20">
      <div className="text-center mb-12">
        <h2 className="text-white mb-4">
          KYC Verification
        </h2>
        <p className="text-white/60 text-lg">
          Complete your Know Your Customer verification for secure trading
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <Card className="border-[#FFD700]/20">
          <div className="space-y-8">
            {/* Status Banner */}
            <div className="glass-card border border-[#FFD700]/30 rounded-xl p-4 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-[#FFD700]" />
              <p className="text-white/80">
                KYC verification is mandatory for transactions above ₹50,000
              </p>
            </div>
            
            {/* Personal Information */}
            <div>
              <h3 className="text-white mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-[#FFD700]" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/80 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FFD700]/50 transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FFD700]/50 transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FFD700]/50 transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 mb-2">PAN Card Number *</label>
                  <input
                    type="text"
                    name="panCard"
                    value={formData.panCard}
                    onChange={handleInputChange}
                    placeholder="ABCDE1234F"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FFD700]/50 transition-colors uppercase"
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-white/80 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your complete address"
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FFD700]/50 transition-colors resize-none"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 mb-2">Aadhar Card Number *</label>
                  <input
                    type="text"
                    name="aadharCard"
                    value={formData.aadharCard}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FFD700]/50 transition-colors"
                  />
                </div>
              </div>
            </div>
            
            {/* Document Upload */}
            <div>
              <h3 className="text-white mb-6 flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#FFD700]" />
                Upload Documents
              </h3>
              
              <div className="grid grid-cols-3 gap-6">
                {/* PAN Card */}
                <div className="glass-card border border-white/10 rounded-xl p-6 text-center">
                  <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    uploadedDocs.pan ? 'bg-green-500/20' : 'bg-white/5'
                  }`}>
                    {uploadedDocs.pan ? (
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    ) : (
                      <Upload className="w-8 h-8 text-white/40" />
                    )}
                  </div>
                  <p className="text-white mb-2">PAN Card</p>
                  <p className="text-sm text-white/60 mb-4">PDF or Image</p>
                  <Button 
                    variant={uploadedDocs.pan ? "outline" : "primary"} 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleFileUpload('pan')}
                  >
                    {uploadedDocs.pan ? 'Uploaded' : 'Upload'}
                  </Button>
                </div>
                
                {/* Aadhar Card */}
                <div className="glass-card border border-white/10 rounded-xl p-6 text-center">
                  <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    uploadedDocs.aadhar ? 'bg-green-500/20' : 'bg-white/5'
                  }`}>
                    {uploadedDocs.aadhar ? (
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    ) : (
                      <Upload className="w-8 h-8 text-white/40" />
                    )}
                  </div>
                  <p className="text-white mb-2">Aadhar Card</p>
                  <p className="text-sm text-white/60 mb-4">PDF or Image</p>
                  <Button 
                    variant={uploadedDocs.aadhar ? "outline" : "primary"} 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleFileUpload('aadhar')}
                  >
                    {uploadedDocs.aadhar ? 'Uploaded' : 'Upload'}
                  </Button>
                </div>
                
                {/* Photo */}
                <div className="glass-card border border-white/10 rounded-xl p-6 text-center">
                  <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    uploadedDocs.photo ? 'bg-green-500/20' : 'bg-white/5'
                  }`}>
                    {uploadedDocs.photo ? (
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    ) : (
                      <Upload className="w-8 h-8 text-white/40" />
                    )}
                  </div>
                  <p className="text-white mb-2">Passport Photo</p>
                  <p className="text-sm text-white/60 mb-4">JPG or PNG</p>
                  <Button 
                    variant={uploadedDocs.photo ? "outline" : "primary"} 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleFileUpload('photo')}
                  >
                    {uploadedDocs.photo ? 'Uploaded' : 'Upload'}
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="flex items-center justify-center pt-6">
              <Button variant="primary" className="px-12">
                Submit KYC Application
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

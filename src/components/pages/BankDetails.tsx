'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Copy, CheckCircle, Building2, CreditCard, Info } from 'lucide-react';

interface BankDetailsProps {
  theme: 'dark' | 'light';
}

export function BankDetails({ theme }: BankDetailsProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const bankInfo = {
    accountName: 'GoldJar Trading Pvt Ltd',
    accountNumber: '1234567890',
    ifscCode: 'HDFC0001234',
    bankName: 'HDFC Bank',
    branch: 'Mumbai Main Branch',
    accountType: 'Current Account',
    upiId: 'goldjar@hdfcbank'
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section className={`max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 ${
      theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'
    }`}>
      <div className="text-center mb-8 sm:mb-10 lg:mb-12">
        <h2 className={`mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}>
          Bank Account Details
        </h2>
        <p className={`text-base sm:text-lg ${
          theme === 'dark' ? 'text-white/60' : 'text-gray-600'
        }`}>
          Use these details to transfer funds for your gold and silver purchases
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        {/* Alert Banner */}
        <Card className={`border-[#FFD700]/20 ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-[#FFD700]/10 to-transparent' 
            : 'bg-gradient-to-r from-amber-50 to-transparent'
        }`}>
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFD700] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className={`mb-2 text-base sm:text-lg ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                Important Information
              </h3>
              <ul className={`space-y-1 text-xs sm:text-sm ${
                theme === 'dark' ? 'text-white/70' : 'text-gray-700'
              }`}>
                <li>• Always use your registered email/phone as reference</li>
                <li>• RTGS/NEFT transfers are processed within 1-2 hours</li>
                <li>• UPI transfers are credited instantly</li>
                <li>• Keep transaction screenshot for record</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Bank Details Card */}
        <Card className="border-[#FFD700]/20">
          <div className="space-y-6 sm:space-y-8">
            <div className={`flex items-center gap-3 pb-4 sm:pb-6 border-b ${
              theme === 'dark' ? 'border-white/10' : 'border-gray-200'
            }`}>
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFD700]" />
              <h3 className={`text-lg sm:text-xl ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                Transfer Funds To
              </h3>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {/* Account Name */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <p className={`text-xs sm:text-sm mb-1 ${
                    theme === 'dark' ? 'text-white/60' : 'text-gray-600'
                  }`}>
                    Account Name
                  </p>
                  <p className={`text-base sm:text-lg ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`}>
                    {bankInfo.accountName}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(bankInfo.accountName, 'accountName')}
                  className={`p-2 sm:p-3 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'hover:bg-white/10'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {copiedField === 'accountName' ? (
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  ) : (
                    <Copy className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      theme === 'dark' ? 'text-white/40' : 'text-gray-400'
                    }`} />
                  )}
                </button>
              </div>

              {/* Account Number */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <p className={`text-xs sm:text-sm mb-1 ${
                    theme === 'dark' ? 'text-white/60' : 'text-gray-600'
                  }`}>
                    Account Number
                  </p>
                  <p className={`text-xl sm:text-2xl ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`}>
                    {bankInfo.accountNumber}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(bankInfo.accountNumber, 'accountNumber')}
                  className={`p-2 sm:p-3 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'hover:bg-white/10'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {copiedField === 'accountNumber' ? (
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  ) : (
                    <Copy className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      theme === 'dark' ? 'text-white/40' : 'text-gray-400'
                    }`} />
                  )}
                </button>
              </div>

              {/* IFSC Code */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <p className={`text-xs sm:text-sm mb-1 ${
                    theme === 'dark' ? 'text-white/60' : 'text-gray-600'
                  }`}>
                    IFSC Code
                  </p>
                  <p className={`text-xl sm:text-2xl ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`}>
                    {bankInfo.ifscCode}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(bankInfo.ifscCode, 'ifscCode')}
                  className={`p-2 sm:p-3 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'hover:bg-white/10'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {copiedField === 'ifscCode' ? (
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  ) : (
                    <Copy className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      theme === 'dark' ? 'text-white/40' : 'text-gray-400'
                    }`} />
                  )}
                </button>
              </div>

              <div className={`h-px ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`}></div>

              {/* Bank Name & Branch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <p className={`text-xs sm:text-sm mb-1 ${
                    theme === 'dark' ? 'text-white/60' : 'text-gray-600'
                  }`}>
                    Bank Name
                  </p>
                  <p className={`text-base sm:text-lg ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`}>
                    {bankInfo.bankName}
                  </p>
                </div>
                <div>
                  <p className={`text-xs sm:text-sm mb-1 ${
                    theme === 'dark' ? 'text-white/60' : 'text-gray-600'
                  }`}>
                    Branch
                  </p>
                  <p className={`text-base sm:text-lg ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`}>
                    {bankInfo.branch}
                  </p>
                </div>
              </div>

              {/* Account Type */}
              <div>
                <p className={`text-xs sm:text-sm mb-1 ${
                  theme === 'dark' ? 'text-white/60' : 'text-gray-600'
                }`}>
                  Account Type
                </p>
                <p className={`text-base sm:text-lg ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>
                  {bankInfo.accountType}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* UPI Details */}
        <Card className="border-[#FFD700]/20">
          <div className="space-y-4 sm:space-y-6">
            <div className={`flex items-center gap-3 pb-4 border-b ${
              theme === 'dark' ? 'border-white/10' : 'border-gray-200'
            }`}>
              <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFD700]" />
              <h3 className={`text-lg sm:text-xl ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                UPI Payment
              </h3>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className={`text-xs sm:text-sm mb-1 ${
                  theme === 'dark' ? 'text-white/60' : 'text-gray-600'
                }`}>
                  UPI ID
                </p>
                <p className={`text-xl sm:text-2xl ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>
                  {bankInfo.upiId}
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(bankInfo.upiId, 'upiId')}
                className={`p-2 sm:p-3 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'hover:bg-white/10'
                    : 'hover:bg-gray-100'
                }`}
              >
                {copiedField === 'upiId' ? (
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                ) : (
                  <Copy className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    theme === 'dark' ? 'text-white/40' : 'text-gray-400'
                  }`} />
                )}
              </button>
            </div>

            <p className={`text-xs sm:text-sm ${
              theme === 'dark' ? 'text-white/60' : 'text-gray-600'
            }`}>
              Scan QR code in your UPI app or use the UPI ID above for instant payment
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}

import React from 'react';
import { Card } from './ui/Card';
import { Building2, Copy, CheckCircle, CreditCard, Smartphone, Landmark } from 'lucide-react';
import { useState } from 'react';

export function BankDetails() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  const bankAccounts = [
    {
      bankName: 'HDFC Bank',
      accountName: 'GoldJar Bullion Pvt Ltd',
      accountNumber: '50200012345678',
      ifsc: 'HDFC0001234',
      branch: 'Mumbai Main Branch',
      accountType: 'Current Account'
    },
    {
      bankName: 'ICICI Bank',
      accountName: 'GoldJar Bullion Pvt Ltd',
      accountNumber: '602301234567',
      ifsc: 'ICIC0006023',
      branch: 'Delhi Connaught Place',
      accountType: 'Current Account'
    }
  ];
  
  const upiDetails = {
    upiId: 'goldjar@hdfcbank',
    qrCode: true
  };
  
  const charges = [
    { type: 'Gold Purchase', charge: '3% GST + ₹50 processing fee' },
    { type: 'Silver Purchase', charge: '3% GST + ₹30 processing fee' },
    { type: 'Coin Purchase', charge: '3% GST + ₹100 processing fee' },
    { type: 'Sale Transaction', charge: 'No charges (TDS applicable on profit)' },
    { type: 'Physical Delivery', charge: '₹200 - ₹500 (based on location)' },
    { type: 'RTGS Transfer', charge: 'As per bank charges' },
    { type: 'UPI Payment', charge: 'Free' }
  ];
  
  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };
  
  return (
    <section id="bank-details" className="max-w-[1440px] mx-auto px-8 py-20">
      <div className="text-center mb-12">
        <h2 className="text-white mb-4">
          Bank Details & Payment Methods
        </h2>
        <p className="text-white/60 text-lg">
          Secure payment options and transparent fee structure
        </p>
      </div>
      
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Bank Accounts */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Landmark className="w-6 h-6 text-[#FFD700]" />
            <h3 className="text-white">Bank Account Details</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {bankAccounts.map((bank, index) => (
              <Card key={index} className="border-[#FFD700]/20">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                    <Building2 className="w-6 h-6 text-[#FFD700]" />
                    <h4 className="text-white">{bank.bankName}</h4>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-white/60 mb-1">Account Name</p>
                      <p className="text-white">{bank.accountName}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-white/60 mb-1">Account Number</p>
                      <div className="flex items-center justify-between glass-card border border-white/10 rounded-lg px-3 py-2">
                        <span className="text-white font-mono">{bank.accountNumber}</span>
                        <button
                          onClick={() => copyToClipboard(bank.accountNumber, `acc-${index}`)}
                          className="text-[#FFD700] hover:text-[#FFA500] transition-colors"
                        >
                          {copiedField === `acc-${index}` ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-white/60 mb-1">IFSC Code</p>
                      <div className="flex items-center justify-between glass-card border border-white/10 rounded-lg px-3 py-2">
                        <span className="text-white font-mono">{bank.ifsc}</span>
                        <button
                          onClick={() => copyToClipboard(bank.ifsc, `ifsc-${index}`)}
                          className="text-[#FFD700] hover:text-[#FFA500] transition-colors"
                        >
                          {copiedField === `ifsc-${index}` ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-white/60 mb-1">Branch</p>
                        <p className="text-white text-sm">{bank.branch}</p>
                      </div>
                      <div>
                        <p className="text-sm text-white/60 mb-1">Type</p>
                        <p className="text-white text-sm">{bank.accountType}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* UPI Payment */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Smartphone className="w-6 h-6 text-[#FFD700]" />
            <h3 className="text-white">UPI Payment</h3>
          </div>
          
          <Card className="border-[#FFD700]/20">
            <div className="grid grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-white/60 mb-2">UPI ID</p>
                  <div className="flex items-center justify-between glass-card border border-white/10 rounded-lg px-4 py-3">
                    <span className="text-white text-lg font-mono">{upiDetails.upiId}</span>
                    <button
                      onClick={() => copyToClipboard(upiDetails.upiId, 'upi')}
                      className="text-[#FFD700] hover:text-[#FFA500] transition-colors"
                    >
                      {copiedField === 'upi' ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="glass-card border border-green-500/30 rounded-xl p-4">
                  <p className="text-sm text-green-400 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Instant payment confirmation
                  </p>
                  <p className="text-sm text-white/60 mt-2">
                    UPI payments are processed instantly with zero transaction fees
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="w-48 h-48 bg-white rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-40 h-40 bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/20 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-16 h-16 text-[#FFD700]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Charges & Fees */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <CreditCard className="w-6 h-6 text-[#FFD700]" />
            <h3 className="text-white">Charges & Fees</h3>
          </div>
          
          <Card className="border-[#FFD700]/20">
            <div className="space-y-3">
              {charges.map((charge, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-white/10 last:border-0"
                >
                  <span className="text-white/80">{charge.type}</span>
                  <span className="text-[#FFD700]">{charge.charge}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        {/* Important Notes */}
        <Card className="border-blue-500/30 bg-blue-500/5">
          <div className="space-y-3">
            <h4 className="text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-400" />
              Important Payment Guidelines
            </h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Always mention your registered mobile number or Order ID in payment remarks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Payments from third-party accounts will not be accepted as per KYC norms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>RTGS/NEFT transfers may take 2-4 hours for confirmation during banking hours</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>For transactions above ₹2 lakhs, RTGS is mandatory</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>All prices are inclusive of GST unless mentioned otherwise</span>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </section>
  );
}

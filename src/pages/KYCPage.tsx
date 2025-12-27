import React, { useState } from 'react';
import { Upload, CheckCircle, FileText, User, MapPin, Phone, Mail, Camera, Plus, Trash2, Building2, Download, CreditCard, Shield, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface KYCPageProps {
  theme?: 'dark' | 'light';
}

interface Director {
  id: number;
  name: string;
  designation: string;
  email: string;
  phone: string;
  panNumber: string;
  photo?: string;
}

interface AuthorisedPerson {
  id: number;
  name: string;
  designation: string;
  email: string;
  phone: string;
  idProof: string;
  photo?: string;
}

interface BankDetail {
  id: number;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountType: string;
  branch: string;
}

export function KYCPage({ theme = 'dark' }: KYCPageProps) {
  const [step, setStep] = useState(0); // Start from 0 for GST verification
  const [sameAsCompanyAddress, setSameAsCompanyAddress] = useState(false);
  const [gstNumber, setGstNumber] = useState('');
  const [gstVerified, setGstVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  
  const [companyForm, setCompanyForm] = useState({
    companyName: '',
    companyType: '',
    businessType: '',
    registeredMobile: '',
    landlineNo: '',
    registeredEmail: '',
    addressLine: '',
    gstNo: '',
    tanNo: '',
    panNo: '',
    country: 'India',
    state: '',
    district: '',
    town: '',
    pinCode: '',
    turnoverMoreThan10Cr: 'no'
  });

  const [directors, setDirectors] = useState<Director[]>([
    { id: 1, name: '', designation: '', email: '', phone: '', panNumber: '', photo: '' }
  ]);

  const [authorisedPersons, setAuthorisedPersons] = useState<AuthorisedPerson[]>([
    { id: 1, name: '', designation: '', email: '', phone: '', idProof: '', photo: '' }
  ]);

  const [bankDetails, setBankDetails] = useState<BankDetail[]>([
    { id: 1, bankName: '', accountNumber: '', ifscCode: '', accountType: 'Savings', branch: '' }
  ]);

  const [deliveryAddress, setDeliveryAddress] = useState({
    addressLine: '',
    country: 'India',
    state: '',
    district: '',
    town: '',
    pinCode: ''
  });

  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: string}>({});

  const handleGSTVerification = async () => {
    setIsVerifying(true);
    // Simulate API call - In production, this would call GST API
    setTimeout(() => {
      setGstVerified(true);
      setIsVerifying(false);
      // Auto-populate company form with GST data
      setCompanyForm({
        ...companyForm,
        gstNo: gstNumber,
        companyName: 'Example Company Pvt Ltd', // This would come from API
        state: 'Gujarat', // This would come from API
      });
      alert('GST Number Verified Successfully! Company details auto-filled.');
    }, 2000);
  };

  const handleCompanyFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCompanyForm({
      ...companyForm,
      [e.target.name]: e.target.value
    });
  };

  const handleDirectorChange = (id: number, field: string, value: string) => {
    setDirectors(directors.map(dir => 
      dir.id === id ? { ...dir, [field]: value } : dir
    ));
  };

  const handleDirectorPhotoUpload = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileName = e.target.files[0].name;
      setDirectors(directors.map(dir => 
        dir.id === id ? { ...dir, photo: fileName } : dir
      ));
    }
  };

  const addDirector = () => {
    const newId = Math.max(...directors.map(d => d.id)) + 1;
    setDirectors([...directors, { id: newId, name: '', designation: '', email: '', phone: '', panNumber: '', photo: '' }]);
  };

  const removeDirector = (id: number) => {
    if (directors.length > 1) {
      setDirectors(directors.filter(dir => dir.id !== id));
    }
  };

  const handleAuthorisedPersonChange = (id: number, field: string, value: string) => {
    setAuthorisedPersons(authorisedPersons.map(person => 
      person.id === id ? { ...person, [field]: value } : person
    ));
  };

  const handleAuthorisedPersonPhotoUpload = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileName = e.target.files[0].name;
      setAuthorisedPersons(authorisedPersons.map(person => 
        person.id === id ? { ...person, photo: fileName } : person
      ));
    }
  };

  const addAuthorisedPerson = () => {
    const newId = Math.max(...authorisedPersons.map(p => p.id)) + 1;
    setAuthorisedPersons([...authorisedPersons, { id: newId, name: '', designation: '', email: '', phone: '', idProof: '', photo: '' }]);
  };

  const removeAuthorisedPerson = (id: number) => {
    if (authorisedPersons.length > 1) {
      setAuthorisedPersons(authorisedPersons.filter(person => person.id !== id));
    }
  };

  const handleBankDetailChange = (id: number, field: string, value: string) => {
    setBankDetails(bankDetails.map(bank => 
      bank.id === id ? { ...bank, [field]: value } : bank
    ));
  };

  const addBankDetail = () => {
    const newId = Math.max(...bankDetails.map(b => b.id)) + 1;
    setBankDetails([...bankDetails, { id: newId, bankName: '', accountNumber: '', ifscCode: '', accountType: 'Savings', branch: '' }]);
  };

  const removeBankDetail = (id: number) => {
    if (bankDetails.length > 1) {
      setBankDetails(bankDetails.filter(bank => bank.id !== id));
    }
  };

  const handleDeliveryAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDeliveryAddress({
      ...deliveryAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleSameAsCompanyAddress = (checked: boolean) => {
    setSameAsCompanyAddress(checked);
    if (checked) {
      setDeliveryAddress({
        addressLine: companyForm.addressLine,
        country: companyForm.country,
        state: companyForm.state,
        district: companyForm.district,
        town: companyForm.town,
        pinCode: companyForm.pinCode
      });
    }
  };

  const handleFileUpload = (docName: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFiles({
        ...uploadedFiles,
        [docName]: e.target.files[0].name
      });
    }
  };

  const handleSubmit = () => {
    alert('KYC Registration Application submitted successfully!');
  };

  const totalSteps = 8; // Updated to include GST verification step

  const documents = [
    { name: 'COMPLIANCE AND INDEMINITY DECLARATION FORMAT', required: true, allowDownload: true },
    { name: 'PMLA DECLARATION FORMAT - SEC194Q', required: true, allowDownload: true },
    { name: 'DECLARATION FORMAT - SEC194Q - TDS', required: true, allowDownload: true },
    { name: 'Company Registration Certificate', required: true, allowDownload: false },
    { name: 'GST Certificate', required: true, allowDownload: false },
    { name: 'PAN Card', required: true, allowDownload: false },
    { name: 'TAN Certificate', required: true, allowDownload: false },
  ];

  return (
    <div className={`min-h-screen pt-24 pb-16 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl ${theme === 'dark' ? 'text-white' : 'text-black'} mb-4`}>
            CLIENT REGISTRATION <span className="gold-text">APPLICATION FORM</span>
          </h1>
          <p className={`text-lg sm:text-xl ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
            Complete all steps to register your company account
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8 sm:mb-12 overflow-x-auto pb-4">
          <div className="flex items-center gap-2 min-w-max px-4">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((s) => (
              <React.Fragment key={s}>
                <div className={`flex items-center gap-2 px-2 sm:px-3 py-2 rounded-xl ${
                  step >= s 
                    ? 'glass-card gold-glow' 
                    : theme === 'dark' ? 'bg-white/5' : 'bg-gray-200'
                }`}>
                  {step > s ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                      step === s 
                        ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black' 
                        : theme === 'dark' ? 'bg-white/10 text-white/50' : 'bg-gray-300 text-black'
                    }`}>
                      {s}
                    </div>
                  )}
                  <span className={`text-xs hidden sm:block ${
                    step >= s 
                      ? theme === 'dark' ? 'text-white' : 'text-black'
                      : theme === 'dark' ? 'text-white/40' : 'text-black'
                  }`}>
                    {s === 0 ? 'GST' : s === 1 ? 'Company' : s === 2 ? 'Directors' : s === 3 ? 'Delivery' : s === 4 ? 'Auth Person' : s === 5 ? 'Bank' : s === 6 ? 'Documents' : 'Review'}
                  </span>
                </div>
                {s < totalSteps - 1 && (
                  <div className={`w-4 sm:w-6 h-0.5 ${
                    step > s 
                      ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500]' 
                      : theme === 'dark' ? 'bg-white/10' : 'bg-gray-300'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8">
          
          {/* Step 0: GST Verification */}
          {step === 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Search className="w-6 h-6 text-[#FFD700]" />
                <h2 className={`text-xl sm:text-2xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  GST NUMBER VERIFICATION
                </h2>
              </div>

              <div className="max-w-2xl mx-auto">
                <div className={`p-6 rounded-xl mb-6 ${
                  theme === 'dark' ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'
                }`}>
                  <p className={`text-sm ${theme === 'dark' ? 'text-white/80' : 'text-black'}`}>
                    <strong>Quick Registration:</strong> Enter your GST number to auto-fetch and populate your company details instantly. This will save you time by automatically filling company name, address, and other registered information.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                      Enter GST Number: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={gstNumber}
                      onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                      disabled={gstVerified}
                      className={`w-full px-4 py-3 rounded-lg ${
                        theme === 'dark' 
                          ? 'bg-white/5 border border-white/10 text-white' 
                          : 'bg-white border border-gray-300 text-black'
                      } focus:border-[#FFD700] outline-none transition-all disabled:opacity-50 text-lg`}
                      placeholder="22AAAAA0000A1Z5"
                      maxLength={15}
                    />
                  </div>

                  {gstVerified && (
                    <div className={`p-4 rounded-lg ${
                      theme === 'dark' ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-200'
                    }`}>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-green-500">GST Number Verified Successfully!</span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    {!gstVerified ? (
                      <Button 
                        variant="primary" 
                        size="lg" 
                        onClick={handleGSTVerification}
                        disabled={!gstNumber || gstNumber.length !== 15 || isVerifying}
                      >
                        {isVerifying ? 'Verifying...' : 'Verify GST Number'}
                      </Button>
                    ) : (
                      <Button 
                        variant="primary" 
                        size="lg" 
                        onClick={() => setStep(1)}
                      >
                        Continue to Company Form
                      </Button>
                    )}
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <button
                      onClick={() => setStep(1)}
                      className={`text-sm ${theme === 'dark' ? 'text-white/50 hover:text-white' : 'text-black hover:text-black'} transition-all underline`}
                    >
                      Skip GST Verification and Fill Manually
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Company Form */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="w-6 h-6 text-[#FFD700]" />
                <h2 className={`text-xl sm:text-2xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  COMPANY FORM
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {/* Company Name */}
                <div>
                  <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                    Company Name: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={companyForm.companyName}
                    onChange={handleCompanyFormChange}
                    className={`w-full px-4 py-2.5 rounded-lg ${
                      theme === 'dark' 
                        ? 'bg-white/5 border border-white/10 text-white' 
                        : 'bg-white border border-gray-300 text-black'
                    } focus:border-[#FFD700] outline-none transition-all`}
                    placeholder="Enter company name"
                  />
                </div>

                {/* Company Type */}
                <div>
                  <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                    Company Type: <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="companyType"
                    value={companyForm.companyType}
                    onChange={handleCompanyFormChange}
                    className={`w-full px-4 py-2.5 rounded-lg ${
                      theme === 'dark' 
                        ? 'bg-white/5 border border-white/10 text-white' 
                        : 'bg-white border border-gray-300 text-black'
                    } focus:border-[#FFD700] outline-none transition-all`}
                  >
                    <option value="">Select</option>
                    <option value="private_limited">Private Limited Company</option>
                    <option value="public_limited">Public Limited Company</option>
                    <option value="partnership">Partnership</option>
                    <option value="proprietorship">Proprietorship</option>
                    <option value="llp">LLP</option>
                  </select>
                </div>

                {/* Business Type */}
                <div>
                  <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                    Business Type: <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="businessType"
                    value={companyForm.businessType}
                    onChange={handleCompanyFormChange}
                    className={`w-full px-4 py-2.5 rounded-lg ${
                      theme === 'dark' 
                        ? 'bg-white/5 border border-white/10 text-white' 
                        : 'bg-white border border-gray-300 text-black'
                    } focus:border-[#FFD700] outline-none transition-all`}
                  >
                    <option value="">Select</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="trading">Trading</option>
                    <option value="services">Services</option>
                    <option value="retail">Retail</option>
                    <option value="wholesale">Wholesale</option>
                  </select>
                </div>

                {/* Registered Mobile */}
                <div>
                  <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                    Registered Mobile No: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="registeredMobile"
                    value={companyForm.registeredMobile}
                    onChange={handleCompanyFormChange}
                    className={`w-full px-4 py-2.5 rounded-lg ${
                      theme === 'dark' 
                        ? 'bg-white/5 border border-white/10 text-white' 
                        : 'bg-white border border-gray-300 text-black'
                    } focus:border-[#FFD700] outline-none transition-all`}
                    placeholder="+91 98765 43210"
                  />
                </div>

                {/* Landline No */}
                <div>
                  <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                    Landline No (With STD Code):
                  </label>
                  <input
                    type="tel"
                    name="landlineNo"
                    value={companyForm.landlineNo}
                    onChange={handleCompanyFormChange}
                    className={`w-full px-4 py-2.5 rounded-lg ${
                      theme === 'dark' 
                        ? 'bg-white/5 border border-white/10 text-white' 
                        : 'bg-white border border-gray-300 text-black'
                    } focus:border-[#FFD700] outline-none transition-all`}
                    placeholder="022-12345678"
                  />
                </div>

                {/* Registered Email */}
                <div>
                  <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                    Registered Email Id:
                  </label>
                  <input
                    type="email"
                    name="registeredEmail"
                    value={companyForm.registeredEmail}
                    onChange={handleCompanyFormChange}
                    className={`w-full px-4 py-2.5 rounded-lg ${
                      theme === 'dark' 
                        ? 'bg-white/5 border border-white/10 text-white' 
                        : 'bg-white border border-gray-300 text-black'
                    } focus:border-[#FFD700] outline-none transition-all`}
                    placeholder="company@email.com"
                  />
                </div>

                {/* Address Line */}
                <div className="sm:col-span-2">
                  <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                    Address Line: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="addressLine"
                    value={companyForm.addressLine}
                    onChange={handleCompanyFormChange}
                    className={`w-full px-4 py-2.5 rounded-lg ${
                      theme === 'dark' 
                        ? 'bg-white/5 border border-white/10 text-white' 
                        : 'bg-white border border-gray-300 text-black'
                    } focus:border-[#FFD700] outline-none transition-all`}
                    placeholder="Street address"
                  />
                </div>

                {/* GST No */}
                <div>
                  <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                    GST No.: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="gstNo"
                    value={companyForm.gstNo}
                    onChange={handleCompanyFormChange}
                    className={`w-full px-4 py-2.5 rounded-lg ${
                      theme === 'dark' 
                        ? 'bg-white/5 border border-white/10 text-white' 
                        : 'bg-white border border-gray-300 text-black'
                    } focus:border-[#FFD700] outline-none transition-all`}
                    placeholder="22AAAAA0000A1Z5"
                  />
                </div>

                {/* TAN No */}
                <div>
                  <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                    TAN No.: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="tanNo"
                    value={companyForm.tanNo}
                    onChange={handleCompanyFormChange}
                    className={`w-full px-4 py-2.5 rounded-lg ${
                      theme === 'dark' 
                        ? 'bg-white/5 border border-white/10 text-white' 
                        : 'bg-white border border-gray-300 text-black'
                    } focus:border-[#FFD700] outline-none transition-all`}
                    placeholder="ABCD12345E"
                  />
                </div>

                {/* PAN No */}
                <div>
                  <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                    PAN No.: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="panNo"
                    value={companyForm.panNo}
                    onChange={handleCompanyFormChange}
                    className={`w-full px-4 py-2.5 rounded-lg ${
                      theme === 'dark' 
                        ? 'bg-white/5 border border-white/10 text-white' 
                        : 'bg-white border border-gray-300 text-black'
                    } focus:border-[#FFD700] outline-none transition-all`}
                    placeholder="ABCDE1234F"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                    Country: <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="country"
                    value={companyForm.country}
                    onChange={handleCompanyFormChange}
                    className={`w-full px-4 py-2.5 rounded-lg ${
                      theme === 'dark' 
                        ? 'bg-white/5 border border-white/10 text-white' 
                        : 'bg-white border border-gray-300 text-black'
                    } focus:border-[#FFD700] outline-none transition-all`}
                  >
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                  </select>
                </div>

                {/* State */}
                <div>
                  <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                    State: <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="state"
                    value={companyForm.state}
                    onChange={handleCompanyFormChange}
                    className={`w-full px-4 py-2.5 rounded-lg ${
                      theme === 'dark' 
                        ? 'bg-white/5 border border-white/10 text-white' 
                        : 'bg-white border border-gray-300 text-black'
                    } focus:border-[#FFD700] outline-none transition-all`}
                  >
                    <option value="">Select</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Karnataka">Karnataka</option>
                  </select>
                </div>

                {/* District/City */}
                <div>
                  <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                    District/City: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={companyForm.district}
                    onChange={handleCompanyFormChange}
                    className={`w-full px-4 py-2.5 rounded-lg ${
                      theme === 'dark' 
                        ? 'bg-white/5 border border-white/10 text-white' 
                        : 'bg-white border border-gray-300 text-black'
                    } focus:border-[#FFD700] outline-none transition-all`}
                    placeholder="Enter district/city"
                  />
                </div>

                {/* Town */}
                <div>
                  <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                    Town: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="town"
                    value={companyForm.town}
                    onChange={handleCompanyFormChange}
                    className={`w-full px-4 py-2.5 rounded-lg ${
                      theme === 'dark' 
                        ? 'bg-white/5 border border-white/10 text-white' 
                        : 'bg-white border border-gray-300 text-black'
                    } focus:border-[#FFD700] outline-none transition-all`}
                    placeholder="Enter town"
                  />
                </div>

                {/* Pin Code */}
                <div>
                  <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                    Pin Code: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="pinCode"
                    value={companyForm.pinCode}
                    onChange={handleCompanyFormChange}
                    className={`w-full px-4 py-2.5 rounded-lg ${
                      theme === 'dark' 
                        ? 'bg-white/5 border border-white/10 text-white' 
                        : 'bg-white border border-gray-300 text-black'
                    } focus:border-[#FFD700] outline-none transition-all`}
                    placeholder="380001"
                  />
                </div>
              </div>

              {/* Turnover Question */}
              <div className="pt-4">
                <label className={`block text-sm mb-3 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                  Turnover More Than 10 Crore?
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="turnoverMoreThan10Cr"
                      value="yes"
                      checked={companyForm.turnoverMoreThan10Cr === 'yes'}
                      onChange={handleCompanyFormChange}
                      className="w-4 h-4 text-[#FFD700] focus:ring-[#FFD700]"
                    />
                    <span className={theme === 'dark' ? 'text-white' : 'text-black'}>Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="turnoverMoreThan10Cr"
                      value="no"
                      checked={companyForm.turnoverMoreThan10Cr === 'no'}
                      onChange={handleCompanyFormChange}
                      className="w-4 h-4 text-[#FFD700] focus:ring-[#FFD700]"
                    />
                    <span className={theme === 'dark' ? 'text-white' : 'text-black'}>No</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-between pt-6 border-t border-white/10">
                <Button variant="outline" size="lg" onClick={() => setStep(0)}>
                  Back
                </Button>
                <Button variant="primary" size="lg" onClick={() => setStep(2)}>
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Owner/Partner/Directors Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <User className="w-6 h-6 text-[#FFD700]" />
                  <h2 className={`text-xl sm:text-2xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    OWNER/PARTNER/DIRECTORS DETAILS
                  </h2>
                </div>
                <button
                  onClick={addDirector}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Add More
                </button>
              </div>

              {directors.map((director, index) => (
                <div key={director.id} className={`p-6 rounded-xl ${
                  theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                      Director {index + 1}
                    </h3>
                    {directors.length > 1 && (
                      <button
                        onClick={() => removeDirector(director.id)}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                        Name: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={director.name}
                        onChange={(e) => handleDirectorChange(director.id, 'name', e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-lg ${
                          theme === 'dark' 
                            ? 'bg-white/5 border border-white/10 text-white' 
                            : 'bg-white border border-gray-300 text-black'
                        } focus:border-[#FFD700] outline-none transition-all`}
                        placeholder="Enter full name"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                        Designation: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={director.designation}
                        onChange={(e) => handleDirectorChange(director.id, 'designation', e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-lg ${
                          theme === 'dark' 
                            ? 'bg-white/5 border border-white/10 text-white' 
                            : 'bg-white border border-gray-300 text-black'
                        } focus:border-[#FFD700] outline-none transition-all`}
                        placeholder="Director/Partner"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                        Email: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={director.email}
                        onChange={(e) => handleDirectorChange(director.id, 'email', e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-lg ${
                          theme === 'dark' 
                            ? 'bg-white/5 border border-white/10 text-white' 
                            : 'bg-white border border-gray-300 text-black'
                        } focus:border-[#FFD700] outline-none transition-all`}
                        placeholder="email@example.com"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                        Phone: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={director.phone}
                        onChange={(e) => handleDirectorChange(director.id, 'phone', e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-lg ${
                          theme === 'dark' 
                            ? 'bg-white/5 border border-white/10 text-white' 
                            : 'bg-white border border-gray-300 text-black'
                        } focus:border-[#FFD700] outline-none transition-all`}
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                        PAN Number: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={director.panNumber}
                        onChange={(e) => handleDirectorChange(director.id, 'panNumber', e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-lg ${
                          theme === 'dark' 
                            ? 'bg-white/5 border border-white/10 text-white' 
                            : 'bg-white border border-gray-300 text-black'
                        } focus:border-[#FFD700] outline-none transition-all`}
                        placeholder="ABCDE1234F"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                        Upload Photo: <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-all cursor-pointer">
                          <Camera className="w-4 h-4" />
                          <span className="text-sm">Choose Photo</span>
                          <input
                            type="file"
                            onChange={(e) => handleDirectorPhotoUpload(director.id, e)}
                            className="hidden"
                            accept="image/*"
                          />
                        </label>
                      </div>
                      {director.photo && (
                        <p className="text-xs text-green-500 mt-1">{director.photo}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-between pt-6 border-t border-white/10">
                <Button variant="outline" size="lg" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button variant="primary" size="lg" onClick={() => setStep(3)}>
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Delivery Address */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-[#FFD700]" />
                <h2 className={`text-xl sm:text-2xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  DELIVERY ADDRESS
                </h2>
              </div>

              {/* Same as Company Address Checkbox */}
              <div className="mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sameAsCompanyAddress}
                    onChange={(e) => handleSameAsCompanyAddress(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-[#FFD700] focus:ring-[#FFD700]"
                  />
                  <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    Same As Company Address
                  </span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {/* Address Line */}
                <div className="sm:col-span-2 lg:col-span-4">
                  <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                    Address Line:
                  </label>
                  <input
                    type="text"
                    name="addressLine"
                    value={deliveryAddress.addressLine}
                    onChange={handleDeliveryAddressChange}
                    disabled={sameAsCompanyAddress}
                    className={`w-full px-4 py-2.5 rounded-lg ${
                      theme === 'dark' 
                        ? 'bg-white/5 border border-white/10 text-white' 
                        : 'bg-white border border-gray-300 text-black'
                    } focus:border-[#FFD700] outline-none transition-all disabled:opacity-50`}
                    placeholder="Street address"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                    Country:
                  </label>
                  <select
                    name="country"
                    value={deliveryAddress.country}
                    onChange={handleDeliveryAddressChange}
                    disabled={sameAsCompanyAddress}
                    className={`w-full px-4 py-2.5 rounded-lg ${
                      theme === 'dark' 
                        ? 'bg-white/5 border border-white/10 text-white' 
                        : 'bg-white border border-gray-300 text-black'
                    } focus:border-[#FFD700] outline-none transition-all disabled:opacity-50`}
                  >
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                  </select>
                </div>

                {/* State */}
                <div>
                  <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                    State:
                  </label>
                  <select
                    name="state"
                    value={deliveryAddress.state}
                    onChange={handleDeliveryAddressChange}
                    disabled={sameAsCompanyAddress}
                    className={`w-full px-4 py-2.5 rounded-lg ${
                      theme === 'dark' 
                        ? 'bg-white/5 border border-white/10 text-white' 
                        : 'bg-white border border-gray-300 text-black'
                    } focus:border-[#FFD700] outline-none transition-all disabled:opacity-50`}
                  >
                    <option value="">Select</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Karnataka">Karnataka</option>
                  </select>
                </div>

                {/* District/City */}
                <div>
                  <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                    District/City:
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={deliveryAddress.district}
                    onChange={handleDeliveryAddressChange}
                    disabled={sameAsCompanyAddress}
                    className={`w-full px-4 py-2.5 rounded-lg ${
                      theme === 'dark' 
                        ? 'bg-white/5 border border-white/10 text-white' 
                        : 'bg-white border border-gray-300 text-black'
                    } focus:border-[#FFD700] outline-none transition-all disabled:opacity-50`}
                    placeholder="Enter district/city"
                  />
                </div>

                {/* Town */}
                <div>
                  <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                    Town:
                  </label>
                  <input
                    type="text"
                    name="town"
                    value={deliveryAddress.town}
                    onChange={handleDeliveryAddressChange}
                    disabled={sameAsCompanyAddress}
                    className={`w-full px-4 py-2.5 rounded-lg ${
                      theme === 'dark' 
                        ? 'bg-white/5 border border-white/10 text-white' 
                        : 'bg-white border border-gray-300 text-black'
                    } focus:border-[#FFD700] outline-none transition-all disabled:opacity-50`}
                    placeholder="Enter town"
                  />
                </div>

                {/* Pin Code */}
                <div>
                  <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                    Pin Code:
                  </label>
                  <input
                    type="text"
                    name="pinCode"
                    value={deliveryAddress.pinCode}
                    onChange={handleDeliveryAddressChange}
                    disabled={sameAsCompanyAddress}
                    className={`w-full px-4 py-2.5 rounded-lg ${
                      theme === 'dark' 
                        ? 'bg-white/5 border border-white/10 text-white' 
                        : 'bg-white border border-gray-300 text-black'
                    } focus:border-[#FFD700] outline-none transition-all disabled:opacity-50`}
                    placeholder="380001"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-6 border-t border-white/10">
                <Button variant="outline" size="lg" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button variant="primary" size="lg" onClick={() => setStep(4)}>
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Authorised Person */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-[#FFD700]" />
                  <h2 className={`text-xl sm:text-2xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    AUTHORISED PERSON (FOR DELIVERY)
                  </h2>
                </div>
                <button
                  onClick={addAuthorisedPerson}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Add More
                </button>
              </div>

              {authorisedPersons.map((person, index) => (
                <div key={person.id} className={`p-6 rounded-xl ${
                  theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                      Authorised Person {index + 1}
                    </h3>
                    {authorisedPersons.length > 1 && (
                      <button
                        onClick={() => removeAuthorisedPerson(person.id)}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                        Name: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={person.name}
                        onChange={(e) => handleAuthorisedPersonChange(person.id, 'name', e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-lg ${
                          theme === 'dark' 
                            ? 'bg-white/5 border border-white/10 text-white' 
                            : 'bg-white border border-gray-300 text-black'
                        } focus:border-[#FFD700] outline-none transition-all`}
                        placeholder="Enter full name"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                        Designation:
                      </label>
                      <input
                        type="text"
                        value={person.designation}
                        onChange={(e) => handleAuthorisedPersonChange(person.id, 'designation', e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-lg ${
                          theme === 'dark' 
                            ? 'bg-white/5 border border-white/10 text-white' 
                            : 'bg-white border border-gray-300 text-black'
                        } focus:border-[#FFD700] outline-none transition-all`}
                        placeholder="Manager/Supervisor"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                        Email:
                      </label>
                      <input
                        type="email"
                        value={person.email}
                        onChange={(e) => handleAuthorisedPersonChange(person.id, 'email', e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-lg ${
                          theme === 'dark' 
                            ? 'bg-white/5 border border-white/10 text-white' 
                            : 'bg-white border border-gray-300 text-black'
                        } focus:border-[#FFD700] outline-none transition-all`}
                        placeholder="email@example.com"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                        Phone: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={person.phone}
                        onChange={(e) => handleAuthorisedPersonChange(person.id, 'phone', e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-lg ${
                          theme === 'dark' 
                            ? 'bg-white/5 border border-white/10 text-white' 
                            : 'bg-white border border-gray-300 text-black'
                        } focus:border-[#FFD700] outline-none transition-all`}
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                        ID Proof Type:
                      </label>
                      <select
                        value={person.idProof}
                        onChange={(e) => handleAuthorisedPersonChange(person.id, 'idProof', e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-lg ${
                          theme === 'dark' 
                            ? 'bg-white/5 border border-white/10 text-white' 
                            : 'bg-white border border-gray-300 text-black'
                        } focus:border-[#FFD700] outline-none transition-all`}
                      >
                        <option value="">Select</option>
                        <option value="aadhaar">Aadhaar Card</option>
                        <option value="pan">PAN Card</option>
                        <option value="driving_license">Driving License</option>
                        <option value="passport">Passport</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                        Upload Photo: <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-all cursor-pointer">
                          <Camera className="w-4 h-4" />
                          <span className="text-sm">Choose Photo</span>
                          <input
                            type="file"
                            onChange={(e) => handleAuthorisedPersonPhotoUpload(person.id, e)}
                            className="hidden"
                            accept="image/*"
                          />
                        </label>
                      </div>
                      {person.photo && (
                        <p className="text-xs text-green-500 mt-1">{person.photo}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-between pt-6 border-t border-white/10">
                <Button variant="outline" size="lg" onClick={() => setStep(3)}>
                  Back
                </Button>
                <Button variant="primary" size="lg" onClick={() => setStep(5)}>
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 5: Bank Details */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-[#FFD700]" />
                  <h2 className={`text-xl sm:text-2xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    BANK DETAILS
                  </h2>
                </div>
                <button
                  onClick={addBankDetail}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Add More
                </button>
              </div>

              {bankDetails.map((bank, index) => (
                <div key={bank.id} className={`p-6 rounded-xl ${
                  theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                      Bank Account {index + 1}
                    </h3>
                    {bankDetails.length > 1 && (
                      <button
                        onClick={() => removeBankDetail(bank.id)}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                        Bank Name: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={bank.bankName}
                        onChange={(e) => handleBankDetailChange(bank.id, 'bankName', e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-lg ${
                          theme === 'dark' 
                            ? 'bg-white/5 border border-white/10 text-white' 
                            : 'bg-white border border-gray-300 text-black'
                        } focus:border-[#FFD700] outline-none transition-all`}
                        placeholder="Enter bank name"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                        Account Number: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={bank.accountNumber}
                        onChange={(e) => handleBankDetailChange(bank.id, 'accountNumber', e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-lg ${
                          theme === 'dark' 
                            ? 'bg-white/5 border border-white/10 text-white' 
                            : 'bg-white border border-gray-300 text-black'
                        } focus:border-[#FFD700] outline-none transition-all`}
                        placeholder="Enter account number"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                        IFSC Code: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={bank.ifscCode}
                        onChange={(e) => handleBankDetailChange(bank.id, 'ifscCode', e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-lg ${
                          theme === 'dark' 
                            ? 'bg-white/5 border border-white/10 text-white' 
                            : 'bg-white border border-gray-300 text-black'
                        } focus:border-[#FFD700] outline-none transition-all`}
                        placeholder="ABCD0123456"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                        Account Type: <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={bank.accountType}
                        onChange={(e) => handleBankDetailChange(bank.id, 'accountType', e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-lg ${
                          theme === 'dark' 
                            ? 'bg-white/5 border border-white/10 text-white' 
                            : 'bg-white border border-gray-300 text-black'
                        } focus:border-[#FFD700] outline-none transition-all`}
                      >
                        <option value="Savings">Savings</option>
                        <option value="Current">Current</option>
                        <option value="Overdraft">Overdraft</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                        Branch:
                      </label>
                      <input
                        type="text"
                        value={bank.branch}
                        onChange={(e) => handleBankDetailChange(bank.id, 'branch', e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-lg ${
                          theme === 'dark' 
                            ? 'bg-white/5 border border-white/10 text-white' 
                            : 'bg-white border border-gray-300 text-black'
                        } focus:border-[#FFD700] outline-none transition-all`}
                        placeholder="Enter branch name"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-between pt-6 border-t border-white/10">
                <Button variant="outline" size="lg" onClick={() => setStep(4)}>
                  Back
                </Button>
                <Button variant="primary" size="lg" onClick={() => setStep(6)}>
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 6: Upload Documents */}
          {step === 6 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-[#FFD700]" />
                <h2 className={`text-xl sm:text-2xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  UPLOAD DOCUMENTS
                </h2>
              </div>

              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.name} className={`p-4 sm:p-6 rounded-xl ${
                    theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Document Name */}
                      <div className="flex-1">
                        <p className={`${theme === 'dark' ? 'text-white' : 'text-black'} mb-1`}>
                          {doc.name}: {doc.required && <span className="text-red-500">*</span>}
                        </p>
                        {uploadedFiles[doc.name] && (
                          <p className="text-sm text-blue-500">
                            {uploadedFiles[doc.name]}
                          </p>
                        )}
                        {!uploadedFiles[doc.name] && (
                          <p className="text-sm text-blue-500">
                            No file available
                          </p>
                        )}
                      </div>

                      {/* Download and Upload Buttons */}
                      <div className="flex items-center gap-3">
                        {doc.allowDownload && (
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                            <span className={`text-sm ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                              DOWNLOAD FILE: {doc.required && <span className="text-red-500">*</span>}
                            </span>
                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-all text-sm">
                              <Download className="w-4 h-4" />
                              Download
                            </button>
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                          <span className={`text-sm ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                            UPLOAD FILE: {doc.required && <span className="text-red-500">*</span>}
                          </span>
                          <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-all text-sm cursor-pointer">
                            <Upload className="w-4 h-4" />
                            Choose File
                            <input
                              type="file"
                              onChange={(e) => handleFileUpload(doc.name, e)}
                              className="hidden"
                              accept=".pdf,.jpg,.jpeg,.png"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-6 border-t border-white/10">
                <Button variant="outline" size="lg" onClick={() => setStep(5)}>
                  Back
                </Button>
                <Button variant="primary" size="lg" onClick={() => setStep(7)}>
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 7: Review & Submit */}
          {step === 7 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-black" />
                </div>
                <h2 className={`text-2xl sm:text-3xl ${theme === 'dark' ? 'text-white' : 'text-black'} mb-4`}>
                  Review Your Application
                </h2>
                <p className={`${theme === 'dark' ? 'text-white/70' : 'text-black'} mb-4 max-w-2xl mx-auto`}>
                  Please review all the information you've provided before submitting. Make sure all details are accurate.
                </p>
              </div>
              
              {/* GST Verification Details */}
              <div className={`glass-card rounded-xl p-6 ${theme === 'dark' ? 'border border-white/10' : 'border border-gray-200'}`}>
                <h3 className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-black'} mb-4 flex items-center gap-2`}>
                  <Search className="w-5 h-5 text-[#FFD700]" />
                  GST Verification
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>GST Number</p>
                    <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>{companyForm.gstNo || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Verification Status</p>
                    <p className="text-green-500 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      {gstVerified ? 'Verified' : 'Pending'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div className={`glass-card rounded-xl p-6 ${theme === 'dark' ? 'border border-white/10' : 'border border-gray-200'}`}>
                <h3 className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-black'} mb-4 flex items-center gap-2`}>
                  <Building2 className="w-5 h-5 text-[#FFD700]" />
                  Company Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Company Name</p>
                    <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>{companyForm.companyName || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Company Type</p>
                    <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>{companyForm.companyType || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Business Type</p>
                    <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>{companyForm.businessType || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Registered Mobile</p>
                    <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>{companyForm.registeredMobile || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Landline</p>
                    <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>{companyForm.landlineNo || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Email</p>
                    <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>{companyForm.registeredEmail || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>PAN Number</p>
                    <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>{companyForm.panNo || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>TAN Number</p>
                    <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>{companyForm.tanNo || 'Not provided'}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Registered Address</p>
                    <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                      {companyForm.addressLine || 'Not provided'}, {companyForm.town}, {companyForm.district}, {companyForm.state} - {companyForm.pinCode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Directors Information */}
              <div className={`glass-card rounded-xl p-6 ${theme === 'dark' ? 'border border-white/10' : 'border border-gray-200'}`}>
                <h3 className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-black'} mb-4 flex items-center gap-2`}>
                  <User className="w-5 h-5 text-[#FFD700]" />
                  Directors ({directors.length})
                </h3>
                <div className="space-y-4">
                  {directors.map((director, index) => (
                    <div key={director.id} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'}`}>
                      <p className={`${theme === 'dark' ? 'text-white' : 'text-black'} mb-2`}>Director {index + 1}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        <div>
                          <p className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Name</p>
                          <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>{director.name || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Designation</p>
                          <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>{director.designation || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>PAN</p>
                          <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>{director.panNumber || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Email</p>
                          <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>{director.email || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Phone</p>
                          <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>{director.phone || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Photo</p>
                          <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                            {director.photo ? <span className="text-green-500 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Uploaded</span> : 'Not uploaded'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address */}
              <div className={`glass-card rounded-xl p-6 ${theme === 'dark' ? 'border border-white/10' : 'border border-gray-200'}`}>
                <h3 className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-black'} mb-4 flex items-center gap-2`}>
                  <MapPin className="w-5 h-5 text-[#FFD700]" />
                  Delivery Address
                </h3>
                <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  {deliveryAddress.addressLine || 'Not provided'}, {deliveryAddress.town}, {deliveryAddress.district}, {deliveryAddress.state} - {deliveryAddress.pinCode}
                </p>
              </div>

              {/* Authorised Persons */}
              <div className={`glass-card rounded-xl p-6 ${theme === 'dark' ? 'border border-white/10' : 'border border-gray-200'}`}>
                <h3 className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-black'} mb-4 flex items-center gap-2`}>
                  <Shield className="w-5 h-5 text-[#FFD700]" />
                  Authorised Persons ({authorisedPersons.length})
                </h3>
                <div className="space-y-4">
                  {authorisedPersons.map((person, index) => (
                    <div key={person.id} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'}`}>
                      <p className={`${theme === 'dark' ? 'text-white' : 'text-black'} mb-2`}>Person {index + 1}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        <div>
                          <p className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Name</p>
                          <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>{person.name || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Designation</p>
                          <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>{person.designation || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>ID Proof</p>
                          <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>{person.idProof || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Email</p>
                          <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>{person.email || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Phone</p>
                          <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>{person.phone || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Photo</p>
                          <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                            {person.photo ? <span className="text-green-500 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Uploaded</span> : 'Not uploaded'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bank Details */}
              <div className={`glass-card rounded-xl p-6 ${theme === 'dark' ? 'border border-white/10' : 'border border-gray-200'}`}>
                <h3 className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-black'} mb-4 flex items-center gap-2`}>
                  <CreditCard className="w-5 h-5 text-[#FFD700]" />
                  Bank Accounts ({bankDetails.length})
                </h3>
                <div className="space-y-4">
                  {bankDetails.map((bank, index) => (
                    <div key={bank.id} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'}`}>
                      <p className={`${theme === 'dark' ? 'text-white' : 'text-black'} mb-2`}>Bank Account {index + 1}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        <div>
                          <p className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Bank Name</p>
                          <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>{bank.bankName || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Account Number</p>
                          <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>{bank.accountNumber || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>IFSC Code</p>
                          <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>{bank.ifscCode || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Account Type</p>
                          <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>{bank.accountType || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Branch</p>
                          <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>{bank.branch || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Uploaded Documents */}
              <div className={`glass-card rounded-xl p-6 ${theme === 'dark' ? 'border border-white/10' : 'border border-gray-200'}`}>
                <h3 className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-black'} mb-4 flex items-center gap-2`}>
                  <FileText className="w-5 h-5 text-[#FFD700]" />
                  Uploaded Documents
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {documents.map((doc) => (
                    <div key={doc.name} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'} flex items-center justify-between`}>
                      <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{doc.name}</span>
                      {uploadedFiles[doc.name] ? (
                        <span className="text-green-500 text-sm flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          Uploaded
                        </span>
                      ) : (
                        <span className="text-red-500 text-sm">Not uploaded</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Warning Message */}
              <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-yellow-50 border border-yellow-200'}`}>
                <p className={`text-sm ${theme === 'dark' ? 'text-yellow-200' : 'text-yellow-800'}`}>
                  ⚠️ <strong>Important:</strong> Please verify all information is correct before submitting. Once submitted, you cannot edit the application. Our team will review and activate your account within 24-48 hours.
                </p>
              </div>
              
              <div className="flex gap-4 justify-center pt-4">
                <Button variant="outline" size="lg" onClick={() => setStep(6)}>
                  Back to Documents
                </Button>
                <Button variant="primary" size="lg" onClick={handleSubmit}>
                  <CheckCircle className="w-5 h-5" />
                  Submit Application
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

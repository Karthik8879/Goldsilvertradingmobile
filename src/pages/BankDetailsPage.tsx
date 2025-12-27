import React, { useState } from 'react';
import { Building2, CreditCard, Copy, CheckCircle, Plus, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface BankDetailsPageProps {
  theme?: 'dark' | 'light';
}

interface BankAccount {
  id: number;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountType: string;
  isPrimary: boolean;
}

export function BankDetailsPage({ theme = 'dark' }: BankDetailsPageProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
    {
      id: 1,
      bankName: 'HDFC Bank',
      accountNumber: '1234567890',
      ifscCode: 'HDFC0001234',
      accountType: 'Savings',
      isPrimary: true
    },
    {
      id: 2,
      bankName: 'ICICI Bank',
      accountNumber: '9876543210',
      ifscCode: 'ICIC0009876',
      accountType: 'Current',
      isPrimary: false
    }
  ]);

  const [newAccount, setNewAccount] = useState({
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    accountType: 'Savings'
  });

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleAddAccount = () => {
    if (!newAccount.bankName || !newAccount.accountNumber || !newAccount.ifscCode) {
      alert('Please fill all fields');
      return;
    }

    const account: BankAccount = {
      id: Date.now(),
      ...newAccount,
      isPrimary: bankAccounts.length === 0
    };

    setBankAccounts([...bankAccounts, account]);
    setNewAccount({ bankName: '', accountNumber: '', ifscCode: '', accountType: 'Savings' });
    setShowAddForm(false);
  };

  const handleDeleteAccount = (id: number) => {
    setBankAccounts(bankAccounts.filter(acc => acc.id !== id));
  };

  const handleSetPrimary = (id: number) => {
    setBankAccounts(bankAccounts.map(acc => ({
      ...acc,
      isPrimary: acc.id === id
    })));
  };

  return (
    <div className={`min-h-screen pt-24 pb-16 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-12">
          <div>
            <h1 className={`text-3xl sm:text-4xl lg:text-5xl ${theme === 'dark' ? 'text-white' : 'text-black'} mb-4`}>
              Bank <span className="gold-text">Details</span>
            </h1>
            <p className={`text-lg sm:text-xl ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}>
              Manage your bank accounts for seamless transactions
            </p>
          </div>
          <Button variant="primary" size="lg" onClick={() => setShowAddForm(true)} className="w-full sm:w-auto">
            <Plus className="w-5 h-5" />
            Add Bank Account
          </Button>
        </div>

        {/* Add Bank Form */}
        {showAddForm && (
          <div className="glass-card rounded-3xl p-8 mb-8">
            <h2 className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-black'} mb-6`}>
              Add New Bank Account
            </h2>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}>
                  Bank Name
                </label>
                <input
                  type="text"
                  value={newAccount.bankName}
                  onChange={(e) => setNewAccount({ ...newAccount, bankName: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl ${
                    theme === 'dark'
                      ? 'bg-white/5 border border-white/10 text-white'
                      : 'bg-white border border-gray-300 text-black'
                  } focus:border-[#FFD700] outline-none transition-all`}
                  placeholder="Enter bank name"
                />
              </div>

              <div>
                <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}>
                  Account Type
                </label>
                <select
                  value={newAccount.accountType}
                  onChange={(e) => setNewAccount({ ...newAccount, accountType: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl ${
                    theme === 'dark'
                      ? 'bg-white/5 border border-white/10 text-white'
                      : 'bg-white border border-gray-300 text-black'
                  } focus:border-[#FFD700] outline-none transition-all`}
                >
                  <option value="Savings">Savings</option>
                  <option value="Current">Current</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}>
                  Account Number
                </label>
                <input
                  type="text"
                  value={newAccount.accountNumber}
                  onChange={(e) => setNewAccount({ ...newAccount, accountNumber: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl ${
                    theme === 'dark'
                      ? 'bg-white/5 border border-white/10 text-white'
                      : 'bg-white border border-gray-300 text-black'
                  } focus:border-[#FFD700] outline-none transition-all`}
                  placeholder="Enter account number"
                />
              </div>

              <div>
                <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}>
                  IFSC Code
                </label>
                <input
                  type="text"
                  value={newAccount.ifscCode}
                  onChange={(e) => setNewAccount({ ...newAccount, ifscCode: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl ${
                    theme === 'dark'
                      ? 'bg-white/5 border border-white/10 text-white'
                      : 'bg-white border border-gray-300 text-black'
                  } focus:border-[#FFD700] outline-none transition-all`}
                  placeholder="Enter IFSC code"
                />
              </div>
            </div>

            <div className="flex gap-4 justify-end">
              <Button variant="outline" size="lg" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="lg" onClick={handleAddAccount}>
                Add Account
              </Button>
            </div>
          </div>
        )}

        {/* Bank Accounts List */}
        <div className="grid gap-6">
          {bankAccounts.map((account) => (
            <div key={account.id} className="glass-card rounded-3xl p-8 relative">
              {account.isPrimary && (
                <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black text-xs">
                  Primary Account
                </div>
              )}

              <div className="flex gap-6">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#FFD700] to-[#FFA500] flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-8 h-8 text-black" />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-black'} mb-4`}>
                    {account.bankName}
                  </h3>

                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'} mb-2`}>
                        Account Number
                      </p>
                      <div className="flex items-center gap-2">
                        <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                          {'*'.repeat(6)}{account.accountNumber.slice(-4)}
                        </p>
                        <button
                          onClick={() => copyToClipboard(account.accountNumber, `acc-${account.id}`)}
                          className={`p-1.5 rounded-lg ${
                            theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-gray-200'
                          } transition-all`}
                        >
                          {copiedField === `acc-${account.id}` ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className={`w-4 h-4 ${theme === 'dark' ? 'text-white/60' : 'text-gray-500'}`} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'} mb-2`}>
                        IFSC Code
                      </p>
                      <div className="flex items-center gap-2">
                        <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                          {account.ifscCode}
                        </p>
                        <button
                          onClick={() => copyToClipboard(account.ifscCode, `ifsc-${account.id}`)}
                          className={`p-1.5 rounded-lg ${
                            theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-gray-200'
                          } transition-all`}
                        >
                          {copiedField === `ifsc-${account.id}` ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className={`w-4 h-4 ${theme === 'dark' ? 'text-white/60' : 'text-gray-500'}`} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'} mb-2`}>
                        Account Type
                      </p>
                      <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                        {account.accountType}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    {!account.isPrimary && (
                      <Button variant="outline" size="sm" onClick={() => handleSetPrimary(account.id)}>
                        Set as Primary
                      </Button>
                    )}
                    <button
                      onClick={() => handleDeleteAccount(account.id)}
                      className={`px-4 py-2 rounded-xl ${
                        theme === 'dark'
                          ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                          : 'bg-red-50 text-red-600 hover:bg-red-100'
                      } transition-all flex items-center gap-2`}
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {bankAccounts.length === 0 && (
          <div className="glass-card rounded-3xl p-16 text-center">
            <CreditCard className={`w-16 h-16 mx-auto mb-4 ${theme === 'dark' ? 'text-white/20' : 'text-gray-300'}`} />
            <p className={`text-xl ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'} mb-6`}>
              No bank accounts added yet
            </p>
            <Button variant="primary" size="lg" onClick={() => setShowAddForm(true)}>
              <Plus className="w-5 h-5" />
              Add Your First Account
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Calculator, TrendingUp, Info, Trash2, Plus } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface TDSCalculatorPageProps {
  theme?: 'dark' | 'light';
}

interface CalculatorRow {
  id: number;
  weight: string;
  tdsPercent: string;
  rate: string;
  payable: number;
}

export function TDSCalculatorPage({ theme = 'dark' }: TDSCalculatorPageProps) {
  const [calculatorType, setCalculatorType] = useState<'TDS' | 'TCS'>('TDS');
  const [rows, setRows] = useState<CalculatorRow[]>([
    { id: 1, weight: '', tdsPercent: '0.1', rate: '', payable: 0 }
  ]);

  const calculatePayable = (weight: string, tdsPercent: string, rate: string): number => {
    const w = parseFloat(weight) || 0;
    const tds = parseFloat(tdsPercent) || 0;
    const r = parseFloat(rate) || 0;
    
    const amount = w * r;
    const tdsAmount = amount * (tds / 100);
    return amount - tdsAmount;
  };

  const handleInputChange = (id: number, field: 'weight' | 'tdsPercent' | 'rate', value: string) => {
    setRows(rows.map(row => {
      if (row.id === id) {
        const updatedRow = { ...row, [field]: value };
        updatedRow.payable = calculatePayable(updatedRow.weight, updatedRow.tdsPercent, updatedRow.rate);
        return updatedRow;
      }
      return row;
    }));
  };

  const addRow = () => {
    const newId = Math.max(...rows.map(r => r.id)) + 1;
    setRows([...rows, { id: newId, weight: '', tdsPercent: '0.1', rate: '', payable: 0 }]);
  };

  const removeRow = (id: number) => {
    if (rows.length > 1) {
      setRows(rows.filter(row => row.id !== id));
    }
  };

  // Calculate totals
  const totalWeight = rows.reduce((sum, row) => sum + (parseFloat(row.weight) || 0), 0);
  const totalAmount = rows.reduce((sum, row) => {
    const w = parseFloat(row.weight) || 0;
    const r = parseFloat(row.rate) || 0;
    return sum + (w * r);
  }, 0);
  const totalTDS = rows.reduce((sum, row) => {
    const w = parseFloat(row.weight) || 0;
    const r = parseFloat(row.rate) || 0;
    const tds = parseFloat(row.tdsPercent) || 0;
    return sum + ((w * r) * (tds / 100));
  }, 0);
  const totalPayable = rows.reduce((sum, row) => sum + row.payable, 0);
  
  // Calculate GST (3% on total amount)
  const gstAmount = totalAmount * 0.03;
  const totalWithGST = totalPayable + gstAmount;

  return (
    <div className={`min-h-screen pt-24 pb-16 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl ${theme === 'dark' ? 'text-white' : 'text-black'} mb-4`}>
            {calculatorType} <span className="gold-text">Calculator</span>
          </h1>
          <p className={`text-lg sm:text-xl ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
            Calculate your {calculatorType === 'TDS' ? 'Tax Deducted at Source' : 'Tax Collected at Source'} on precious metals
          </p>
        </div>

        {/* Calculator Type Toggle */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="calculatorType"
                value="TDS"
                checked={calculatorType === 'TDS'}
                onChange={(e) => setCalculatorType('TDS')}
                className="w-5 h-5 text-[#FFD700] focus:ring-[#FFD700]"
              />
              <span className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                TDS Calculator
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="calculatorType"
                value="TCS"
                checked={calculatorType === 'TCS'}
                onChange={(e) => setCalculatorType('TCS')}
                className="w-5 h-5 text-[#FFD700] focus:ring-[#FFD700]"
              />
              <span className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                TCS Calculator
              </span>
            </label>
          </div>

          {/* Calculator Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`${theme === 'dark' ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500]' : 'bg-gradient-to-r from-[#FFD700] to-[#FFA500]'}`}>
                  <th className="px-4 py-4 text-left text-black font-semibold">Weight</th>
                  <th className="px-4 py-4 text-left text-black font-semibold">{calculatorType}(%)</th>
                  <th className="px-4 py-4 text-left text-black font-semibold">Rate(₹)</th>
                  <th className="px-4 py-4 text-left text-black font-semibold">Payable</th>
                  <th className="px-4 py-4 text-center text-black font-semibold">Option</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className={`${
                    theme === 'dark' ? 'bg-white/5 border-b border-white/10' : 'bg-white border-b border-gray-200'
                  }`}>
                    <td className="px-4 py-4">
                      <input
                        type="number"
                        value={row.weight}
                        onChange={(e) => handleInputChange(row.id, 'weight', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg ${
                          theme === 'dark' 
                            ? 'bg-white/10 border border-white/20 text-white' 
                            : 'bg-white border border-gray-300 text-black'
                        } focus:border-[#FFD700] outline-none transition-all`}
                        placeholder="0"
                        step="0.01"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <input
                        type="number"
                        value={row.tdsPercent}
                        onChange={(e) => handleInputChange(row.id, 'tdsPercent', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg ${
                          theme === 'dark' 
                            ? 'bg-white/10 border border-white/20 text-white' 
                            : 'bg-white border border-gray-300 text-black'
                        } focus:border-[#FFD700] outline-none transition-all`}
                        placeholder="0.1"
                        step="0.1"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <input
                        type="number"
                        value={row.rate}
                        onChange={(e) => handleInputChange(row.id, 'rate', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg ${
                          theme === 'dark' 
                            ? 'bg-white/10 border border-white/20 text-white' 
                            : 'bg-white border border-gray-300 text-black'
                        } focus:border-[#FFD700] outline-none transition-all`}
                        placeholder="0"
                        step="1"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <span className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                        ₹{row.payable.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => removeRow(row.id)}
                        disabled={rows.length === 1}
                        className={`p-2 rounded-lg transition-all ${
                          rows.length === 1 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:bg-red-500/10 text-red-500'
                        }`}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add More Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={addRow}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:opacity-90 text-black transition-all"
            >
              <Plus className="w-5 h-5" />
              Add More
            </button>
          </div>

          {/* Summary Section */}
          <div className={`mt-8 p-6 rounded-2xl ${
            theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'
          }`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                  Total Weight
                </p>
                <p className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  : {totalWeight.toFixed(2)}
                </p>
              </div>

              <div>
                <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                  Total Amount
                </p>
                <p className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  : ₹{totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </p>
              </div>

              <div>
                <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                  Total {calculatorType}
                </p>
                <p className={`text-2xl text-red-500`}>
                  : ₹{totalTDS.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </p>
              </div>

              <div>
                <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                  Payable
                </p>
                <p className={`text-2xl gold-text`}>
                  : ₹{totalPayable.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </p>
              </div>

              <div>
                <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                  GST (3%)
                </p>
                <p className={`text-2xl text-blue-500`}>
                  : ₹{gstAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </p>
              </div>

              <div>
                <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
                  Total with GST
                </p>
                <p className={`text-2xl gold-text`}>
                  : ₹{totalWithGST.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Info Card */}
          <div className="glass-card rounded-3xl p-8">
            <h3 className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-black'} mb-4`}>
              {calculatorType} on Precious Metals
            </h3>
            <ul className={`space-y-3 text-sm ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD700] mt-1">•</span>
                <span>{calculatorType === 'TDS' ? 'TDS of 1% is deducted if purchase exceeds ₹1 lakh' : 'TCS is applicable on sale of goods exceeding certain thresholds'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD700] mt-1">•</span>
                <span>Standard {calculatorType} rate is 0.1% for gold and silver transactions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD700] mt-1">•</span>
                <span>Rates may vary based on transaction type and amount</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD700] mt-1">•</span>
                <span>This is an indicative calculation for reference purposes</span>
              </li>
            </ul>
          </div>

          {/* Important Note */}
          <div className={`p-8 rounded-3xl ${
            theme === 'dark' ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'
          }`}>
            <div className="flex gap-3">
              <Info className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className={`text-lg mb-3 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  Important Note
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-white/80' : 'text-black'}`}>
                  <strong>Disclaimer:</strong> This calculator provides indicative {calculatorType} calculations. Actual {calculatorType} may vary based on your income tax slab, applicable deductions, and current tax regulations. Please consult a tax advisor or chartered accountant for accurate calculations and tax planning.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Formula Guide */}
        <div className="glass-card rounded-3xl p-8 mt-6">
          <h3 className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-black'} mb-4`}>
            How to Use This Calculator
          </h3>
          <div className={`space-y-3 text-sm ${theme === 'dark' ? 'text-white/70' : 'text-black'}`}>
            <p><strong>1. Weight:</strong> Enter the weight of gold/silver in grams</p>
            <p><strong>2. {calculatorType} (%):</strong> Enter the applicable {calculatorType} percentage (default: 0.1%)</p>
            <p><strong>3. Rate (₹):</strong> Enter the rate per gram in rupees</p>
            <p><strong>4. Payable:</strong> Automatically calculated as: (Weight × Rate) - {calculatorType} Amount</p>
            <p className="pt-2 border-t border-white/10">
              <strong>Formula:</strong> {calculatorType} Amount = (Weight × Rate) × ({calculatorType}% ÷ 100)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
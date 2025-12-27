import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'spot' | 'gold' | 'silver' | 'purity';
  className?: string;
}

export function Badge({ children, variant = 'spot', className = '' }: BadgeProps) {
  const variants = {
    spot: 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black',
    gold: 'bg-[#FFD700] text-black',
    silver: 'bg-[#C0C0C0] text-black',
    purity: 'bg-white/10 text-[#FFD700] border border-[#FFD700]'
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

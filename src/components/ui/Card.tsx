import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glowOnHover?: boolean;
}

export function Card({ children, className = '', glowOnHover = false }: CardProps) {
  return (
    <div 
      className={`glass-card rounded-2xl p-6 ${glowOnHover ? 'hover:border-[#FFD700]/50 hover:shadow-[0_0_30px_rgba(255,215,0,0.2)] transition-all duration-300' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

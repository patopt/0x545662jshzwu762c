import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, hoverEffect = true }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-sm border border-white/60 overflow-hidden
        ${hoverEffect ? 'hover:scale-[1.02] hover:shadow-lg cursor-pointer' : ''}
        transition-all duration-300 ease-out
        ${className}
      `}
    >
      {children}
    </div>
  );
};

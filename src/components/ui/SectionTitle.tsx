import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionTitle({ children, className = "" }: SectionTitleProps) {
  return (
    <div className={`flex items-center justify-center gap-6 mb-12 ${className}`}>
      {/* Left Decoration */}
      <div className="hidden md:flex gap-1.5" aria-hidden="true">
        <div className="w-1.5 h-6 bg-brand/20 -skew-x-12 rounded-[1px]"></div>
        <div className="w-1.5 h-6 bg-brand/40 -skew-x-12 rounded-[1px]"></div>
        <div className="w-1.5 h-6 bg-brand/60 -skew-x-12 rounded-[1px]"></div>
        <div className="w-1.5 h-6 bg-brand -skew-x-12 rounded-[1px] shadow-[0_0_10px_rgba(0,194,80,0.4)]"></div>
      </div>
      
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white relative z-10">
        {children}
      </h2>

      {/* Right Decoration */}
      <div className="hidden md:flex gap-1.5" aria-hidden="true">
        <div className="w-1.5 h-6 bg-brand -skew-x-12 rounded-[1px] shadow-[0_0_10px_rgba(0,194,80,0.4)]"></div>
        <div className="w-1.5 h-6 bg-brand/60 -skew-x-12 rounded-[1px]"></div>
        <div className="w-1.5 h-6 bg-brand/40 -skew-x-12 rounded-[1px]"></div>
        <div className="w-1.5 h-6 bg-brand/20 -skew-x-12 rounded-[1px]"></div>
      </div>
    </div>
  );
}

import React from 'react';

interface DisplayProps {
  value: string;
  previousValue: string | null;
  operation: string | null;
}

export const Display: React.FC<DisplayProps> = ({ value, previousValue, operation }) => {
  return (
    <div className="relative w-full rounded-lg overflow-hidden flex flex-col zen-shadow-inset bg-[#c8cdcf] border-[3px] border-[#f0f2f5]/50">
      
      {/* Top Black Bar */}
      <div className="bg-[#1a1a1a] text-[#888] px-3 py-1 flex justify-between items-center text-[0.65rem] font-bold tracking-widest uppercase z-20">
        <span>Stream: Hex-01</span>
        <span>No. 8894-X</span>
      </div>

      {/* Main LCD Area */}
      <div className="flex-1 flex flex-col justify-end items-end p-4 min-h-[110px] text-right relative z-10">
        {/* Small history text */}
        <div className="text-gray-500 text-xs font-mono h-4 mb-1 pr-1">
          {previousValue} {operation}
        </div>
        
        {/* LCD Container */}
        <div className="relative w-full h-[70px] flex items-center justify-end overflow-hidden">
           {/* Ghost Digits (Background 8s) - Perfectly positioned to match Digital-7 Mono */}
           <div className="absolute top-0 right-0 text-[5rem] leading-none text-[#1a1a1a] font-digital opacity-[0.08] select-none pointer-events-none transform translate-y-[2px]">
             8888888888
           </div>
           
           {/* Active Digits */}
           <div className="relative text-[5rem] leading-none text-[#1a1a1a] font-digital overflow-hidden whitespace-nowrap transform translate-y-[2px]">
             {value}
           </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="flex text-[0.65rem] font-bold uppercase tracking-wider border-t border-gray-400/30 z-20 bg-[#c8cdcf]">
        <div className="flex-1 bg-[#1a1a1a] text-white py-1 text-center">
          Dec
        </div>
        <div className="flex-1 bg-transparent text-gray-600 py-1 text-center border-r border-gray-400/30">
          Float
        </div>
        <div className="flex-1 bg-transparent text-gray-600 py-1 text-center">
          Mem: 0
        </div>
      </div>
      
      {/* Screen Shine/Reflection Effect (Subtle) */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/30 to-transparent pointer-events-none z-30"></div>
      
      {/* Inner Shadow for depth */}
      <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] pointer-events-none z-30 rounded-lg"></div>
    </div>
  );
};
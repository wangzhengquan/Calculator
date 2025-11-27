import React from 'react';

interface DisplayProps {
  value: string;
  previousValue: string | null;
  operation: string | null;
}

export const Display: React.FC<DisplayProps> = ({ value, previousValue, operation }) => {
  return (
    <div className="relative w-full rounded-lg overflow-hidden flex flex-col zen-shadow-inset bg-[#e8ecef] border-[3px] border-[#f0f2f5]/50">
      
      {/* Top Black Bar */}
      <div className="bg-[#1a1a1a] text-[#888] px-3 py-1 flex justify-between items-center text-[0.65rem] font-bold tracking-widest uppercase">
        <span>Stream: Hex-01</span>
        <span>No. 8894-X</span>
      </div>

      {/* Main LCD Area */}
      <div className="flex-1 flex flex-col justify-end items-end p-4 min-h-[100px] text-right">
        <div className="text-gray-400 text-xs font-mono h-4 mb-1">
          {previousValue} {operation}
        </div>
        {/* We use a monospace font that resembles 7-segment or dot matrix simply by being clean mono */}
        <div className="text-5xl text-[#1a1a1a] font-mono-display tracking-tight overflow-hidden whitespace-nowrap w-full">
          {value}
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="flex text-[0.65rem] font-bold uppercase tracking-wider border-t border-gray-300">
        <div className="flex-1 bg-[#1a1a1a] text-white py-1 text-center">
          Dec
        </div>
        <div className="flex-1 bg-transparent text-gray-500 py-1 text-center border-r border-gray-300">
          Float
        </div>
        <div className="flex-1 bg-transparent text-gray-500 py-1 text-center">
          Mem: 0
        </div>
      </div>
      
      {/* Screen Shine/Reflection Effect (Subtle) */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
    </div>
  );
};
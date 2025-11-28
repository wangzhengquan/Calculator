import React from 'react';

interface DisplayProps {
  value: string;
  previousValue: string | null;
  operation: string | null;
}

export const Display: React.FC<DisplayProps> = ({ value, previousValue, operation }) => {
  // Configuration for the display slots
  // We use 12 slots to mimic a physical LCD layout
  const MAX_DIGITS = 12;

  // Prepare the digits array
  // 1. Split current value into characters
  const valueChars = value.split('');
  
  // 2. Create an array of 12 items. 
  // We want to fill from the right.
  // If value is "123", and MAX is 12, we need 9 empty slots then '1', '2', '3'.
  const slots = Array(MAX_DIGITS).fill(null);
  
  // 3. Fill the end of the slots array with the value characters
  // We take the last N chars if value exceeds MAX (though App.tsx limits it)
  const startIndex = MAX_DIGITS - valueChars.length;
  
  // Map to create the final renderable slots
  const renderSlots = slots.map((_, index) => {
    // Determine what character (if any) goes in this slot
    // If the index is before the start of our number, it's empty (just ghost 8)
    const charIndex = index - startIndex;
    const activeChar = charIndex >= 0 ? valueChars[charIndex] : '';
    
    return {
      id: index,
      active: activeChar
    };
  });

  return (
    <div className="relative w-full rounded-lg overflow-hidden flex flex-col bg-[#c8cdcf] border-[3px] border-[#f0f2f5]/50">
      
      {/* Top Black Bar */}
      <div className="bg-[#1a1a1a] text-[#888] px-3 py-1 flex justify-between items-center text-[0.65rem] font-bold tracking-widest uppercase z-20">
        <span>Stream: Hex-01</span>
        <span>No. 8894-X</span>
      </div>

      {/* Main LCD Area */}
      <div className="flex-1 flex flex-col justify-end items-end p-4 pb-2 min-h-[110px] relative z-10">
        {/* Small history text */}
        <div className="text-gray-500 text-xs font-mono h-4 mb-1 pr-1 w-full text-right">
          {previousValue} {operation}
        </div>
        
        {/* LCD Digits Container */}
        {/* We use flex-row to line up our 'Digit Slots' */}
        <div className="flex justify-end items-end w-full overflow-hidden pr-1">
           {renderSlots.map((slot) => (
             <div key={slot.id} className="relative flex justify-center items-end">
                {/* 
                  Ghost Digit Layer:
                  This layer is 'relative' and 'visible'. 
                  It dictates the width/height of the slot based on the font character '8'.
                  Since Digital-7 Mono is monospaced, every slot will be identical width.
                */}
                <span className="text-[4rem] leading-none text-[#1a1a1a] font-digital opacity-[0.06] select-none">
                  8
                </span>
                
                {/* 
                  Active Digit Layer:
                  Absolutely positioned to perfectly overlay the Ghost Digit.
                  Since parent is relative, inset-0 puts it exactly on top.
                */}
                <span className="absolute inset-0 flex justify-center items-end text-[4rem] leading-none text-[#1a1a1a] font-digital z-10">
                  {slot.active}
                </span>
             </div>
           ))}
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
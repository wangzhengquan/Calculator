import React, { useState } from 'react';
import { ButtonConfig } from '../types';

interface ZenButtonProps {
  config: ButtonConfig;
  onClick: (value: string) => void;
}

export const ZenButton: React.FC<ZenButtonProps> = ({ config, onClick }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);
  const handleMouseLeave = () => setIsPressed(false);

  // Base styles
  const baseClasses = "relative flex flex-col items-center justify-center rounded-2xl transition-all duration-150 select-none cursor-pointer";
  
  // Width calculation
  const widthClass = config.width === 'double' ? 'col-span-2 w-full aspect-[2/1]' : 'aspect-square w-full';
  
  // Color variants
  let colorClasses = "text-gray-700";
  if (config.color === 'red') colorClasses = "text-red-800";
  if (config.color === 'black') colorClasses = "text-white";

  // Background & Shadow logic
  let bgClasses = "bg-[#f0f2f5]";
  let shadowClasses = "zen-shadow"; // Removed hover:translate-y-[-1px]
  
  if (config.color === 'black') {
    bgClasses = "bg-[#111]";
    shadowClasses = "shadow-[4px_4px_10px_#a3b1c6,-4px_-4px_10px_#ffffff]"; // Slightly different shadow for black button to stand out
  }

  if (isPressed) {
    if (config.color === 'black') {
      shadowClasses = "shadow-[inset_2px_2px_5px_rgba(255,255,255,0.2),inset_-2px_-2px_5px_rgba(0,0,0,0.5)] translate-y-[1px]";
    } else {
      shadowClasses = "zen-shadow-inset translate-y-[1px]";
    }
  }

  return (
    <button
      className={`${baseClasses} ${widthClass} ${bgClasses} ${shadowClasses} ${colorClasses}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(config.value)}
      // Touch events for mobile responsiveness
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      {/* Tiny Sub-label (top left) */}
      <span className={`absolute top-2 left-3 text-[0.6rem] font-bold opacity-40 uppercase tracking-widest ${config.color === 'black' ? 'text-gray-400' : 'text-gray-500'}`}>
        {config.subLabel}
      </span>

      {/* Main Label */}
      <span className={`text-2xl font-semibold z-10 font-mono-display ${config.color === 'black' ? 'text-gray-100' : ''}`}>
        {config.label}
      </span>
    </button>
  );
};
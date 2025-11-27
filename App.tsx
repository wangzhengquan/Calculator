import React, { useState } from 'react';
import { Menu, Settings, Trash2, Save } from 'lucide-react';
import { ZenButton } from './components/ZenButton';
import { Display } from './components/Display';
import { BUTTONS } from './constants';
import { ButtonType, CalculatorState, Operation } from './types';

export default function App() {
  const [state, setState] = useState<CalculatorState>({
    currentOperand: '0',
    previousOperand: null,
    operation: null,
  });

  const handleButtonClick = (value: string) => {
    // Find button config to know type
    const btnConfig = BUTTONS.find(b => b.value === value);
    if (!btnConfig) return;

    switch (btnConfig.type) {
      case ButtonType.NUMBER:
        handleNumber(value);
        break;
      case ButtonType.OPERATION:
        handleOperation(value as Operation);
        break;
      case ButtonType.ACTION:
        if (value === 'AC') handleClear();
        if (value === 'DEL') handleDelete();
        break;
      case ButtonType.EQUALS:
        handleCompute();
        break;
    }
  };

  const handleNumber = (number: string) => {
    if (number === '.' && state.currentOperand.includes('.')) return;
    if (state.currentOperand === '0' && number !== '.') {
      setState(prev => ({ ...prev, currentOperand: number }));
    } else {
      setState(prev => ({ ...prev, currentOperand: prev.currentOperand + number }));
    }
  };

  const handleOperation = (operation: Operation) => {
    if (state.currentOperand === '') return;
    if (state.previousOperand !== null) {
      const result = compute(state.previousOperand, state.currentOperand, state.operation);
      setState({
        currentOperand: '0',
        previousOperand: result,
        operation: operation,
      });
    } else {
      setState(prev => ({
        operation: operation,
        previousOperand: prev.currentOperand,
        currentOperand: '0',
      }));
    }
  };

  const compute = (prev: string, current: string, op: Operation): string => {
    const p = parseFloat(prev);
    const c = parseFloat(current);
    if (isNaN(p) || isNaN(c)) return '';
    
    let computation = 0;
    switch (op) {
      case '+': computation = p + c; break;
      case '-': computation = p - c; break;
      case '*': computation = p * c; break;
      case '/': computation = p / c; break;
      case '%': computation = p % c; break;
    }
    
    // Formatting to avoid long decimals
    return computation.toString().slice(0, 10);
  };

  const handleCompute = () => {
    if (state.operation === null || state.previousOperand === null) return;
    const result = compute(state.previousOperand, state.currentOperand, state.operation);
    setState({
      currentOperand: result,
      previousOperand: null,
      operation: null,
    });
  };

  const handleClear = () => {
    setState({
      currentOperand: '0',
      previousOperand: null,
      operation: null,
    });
  };

  const handleDelete = () => {
    if (state.currentOperand.length === 1) {
      setState(prev => ({ ...prev, currentOperand: '0' }));
    } else {
      setState(prev => ({ ...prev, currentOperand: prev.currentOperand.slice(0, -1) }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#e4e8ef]">
      {/* Main Container - The "Phone/Device" Body */}
      <div className="relative w-full max-w-[400px] bg-[#f0f2f5] rounded-[3rem] p-8 zen-shadow border border-white/40">
        
        {/* Header Branding */}
        <div className="flex justify-between items-center mb-6 px-2">
          <div className="w-8 h-8 rounded-full zen-shadow-sm flex items-center justify-center text-gray-400">
             <Settings size={14} />
          </div>
          <h1 className="text-gray-500 font-bold tracking-[0.2em] text-sm font-mono">KEYBOX.IO</h1>
          <div className="w-8 h-8 rounded-full zen-shadow-sm flex items-center justify-center text-gray-400">
             <Menu size={14} />
          </div>
        </div>

        {/* Display Screen */}
        <div className="mb-8">
          <Display 
            value={state.currentOperand} 
            previousValue={state.previousOperand}
            operation={state.operation}
          />
        </div>

        {/* Keypad Grid */}
        <div className="grid grid-cols-4 gap-4">
          {BUTTONS.map((btn, index) => (
            <ZenButton 
              key={`${btn.value}-${index}`} 
              config={btn} 
              onClick={handleButtonClick} 
            />
          ))}
        </div>

        {/* Bottom Footer Area (Decorative) */}
        <div className="mt-8 flex justify-between items-center px-4 opacity-30">
          <div className="flex gap-4">
             <div className="w-4 h-4 rounded bg-gray-400"></div>
             <div className="w-4 h-4 rounded border-2 border-gray-400"></div>
          </div>
          <div className="flex gap-4">
             <Save size={16} />
             <Trash2 size={16} />
          </div>
        </div>
        
        {/* Soft Highlight for 3D feel on the casing */}
        <div className="absolute top-4 left-4 right-4 h-24 bg-gradient-to-b from-white/30 to-transparent rounded-[2.5rem] pointer-events-none"></div>

      </div>
    </div>
  );
}
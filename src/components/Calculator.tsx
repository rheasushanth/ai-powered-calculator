import React, { useState } from 'react';
import type { CalculationHistory } from '../types';
import { evaluateExpression, formatNumber } from '../utils/calculator';

export const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState('');
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [history, setHistory] = useState<CalculationHistory[]>([]);

  const handleNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op: string) => {
    const currentValue = display;

    if (previousValue === '') {
      setPreviousValue(currentValue);
    } else if (operation) {
      handleEquals(true, op);
      return;
    }

    setOperation(op);
    setWaitingForNewValue(true);
  };

  const handleEquals = (chainOperation = false, nextOp: string | null = null) => {
    if (!operation || previousValue === '') return;

    try {
      const expression = `${previousValue}${operation}${display}`;
      const result = evaluateExpression(expression);

      // Add to history
      const newHistory: CalculationHistory = {
        id: Date.now().toString(),
        expression,
        result,
        timestamp: new Date(),
        type: 'standard',
      };
      setHistory([newHistory, ...history]);

      setDisplay(result);
      setPreviousValue(result);
      setOperation(chainOperation ? nextOp : null);
      setWaitingForNewValue(true);
    } catch (error) {
      setDisplay('Error');
      setPreviousValue('');
      setOperation(null);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue('');
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const handlePercentage = () => {
    try {
      const value = parseFloat(display);
      const percentage = value / 100;
      setDisplay(formatNumber(percentage));
    } catch {
      setDisplay('Error');
    }
  };

  const buttons = [
    { label: 'AC', onClick: handleClear, className: 'col-span-2 bg-red-500 hover:bg-red-600' },
    { label: '%', onClick: handlePercentage, className: 'bg-orange-500 hover:bg-orange-600' },
    { label: '÷', onClick: () => handleOperation('/'), className: 'bg-orange-500 hover:bg-orange-600' },
    
    { label: '7', onClick: () => handleNumber('7'), className: 'bg-gray-300 hover:bg-gray-400' },
    { label: '8', onClick: () => handleNumber('8'), className: 'bg-gray-300 hover:bg-gray-400' },
    { label: '9', onClick: () => handleNumber('9'), className: 'bg-gray-300 hover:bg-gray-400' },
    { label: '×', onClick: () => handleOperation('*'), className: 'bg-orange-500 hover:bg-orange-600' },
    
    { label: '4', onClick: () => handleNumber('4'), className: 'bg-gray-300 hover:bg-gray-400' },
    { label: '5', onClick: () => handleNumber('5'), className: 'bg-gray-300 hover:bg-gray-400' },
    { label: '6', onClick: () => handleNumber('6'), className: 'bg-gray-300 hover:bg-gray-400' },
    { label: '−', onClick: () => handleOperation('-'), className: 'bg-orange-500 hover:bg-orange-600' },
    
    { label: '1', onClick: () => handleNumber('1'), className: 'bg-gray-300 hover:bg-gray-400' },
    { label: '2', onClick: () => handleNumber('2'), className: 'bg-gray-300 hover:bg-gray-400' },
    { label: '3', onClick: () => handleNumber('3'), className: 'bg-gray-300 hover:bg-gray-400' },
    { label: '+', onClick: () => handleOperation('+'), className: 'bg-orange-500 hover:bg-orange-600' },
    
    { label: '0', onClick: () => handleNumber('0'), className: 'col-span-2 bg-gray-300 hover:bg-gray-400' },
    { label: '.', onClick: handleDecimal, className: 'bg-gray-300 hover:bg-gray-400' },
    { label: '=', onClick: () => handleEquals(), className: 'bg-green-500 hover:bg-green-600' },
  ];

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="bg-gray-800 text-white text-right p-4 rounded mb-4 text-4xl font-bold overflow-hidden">
        {display}
      </div>
      
      <div className="grid grid-cols-4 gap-2 mb-4">
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            onClick={btn.onClick}
            className={`p-4 rounded text-white font-bold text-lg transition-colors ${btn.className}`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {history.length > 0 && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-sm font-bold mb-2">History</h3>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {history.slice(0, 5).map((item) => (
              <div key={item.id} className="text-xs text-gray-600">
                {item.expression} = <span className="font-bold">{item.result}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

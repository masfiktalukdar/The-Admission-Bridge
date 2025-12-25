'use client';

import { DollarSign } from 'lucide-react';

interface TuitionSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const TuitionSlider = ({ value, onChange }: TuitionSliderProps) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-green-600" />
          Max Tuition Fee
        </label>
        <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
          ${value.toLocaleString()}
        </span>
      </div>
      <input 
        type="range" 
        min="0" 
        max="60000" 
        step="1000" 
        value={value} 
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      />
      <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
        <span>Free</span>
        <span>$60,000+</span>
      </div>
    </div>
  );
};

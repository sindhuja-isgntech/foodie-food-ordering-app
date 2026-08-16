import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  max?: number;
}

export const Rating: React.FC<RatingProps> = ({ value, max = 5 }) => {
  return (
    <div className="flex items-center gap-1 text-amber-500 font-semibold text-sm">
      <Star className="w-4 h-4 fill-amber-400" />
      <span>{value.toFixed(1)}</span>
      <span className="text-gray-400 text-xs">/ {max}</span>
    </div>
  );
};

export default Rating;

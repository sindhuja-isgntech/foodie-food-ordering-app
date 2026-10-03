import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  onReset?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No restaurants found',
  message = 'Try searching for something else or clear your active filters.',
  onReset,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-stone-50 rounded-2xl border border-dashed border-stone-300">
      <div className="p-4 bg-orange-100 text-orange-500 rounded-full mb-4">
        <UtensilsCrossed className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-stone-800">{title}</h3>
      <p className="text-stone-500 text-sm mt-1 max-w-md">{message}</p>
      {onReset && (
        <button
          onClick={onReset}
          className="mt-6 bg-orange-600 text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-orange-700 transition"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
};

export default EmptyState;

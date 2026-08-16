import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Something went wrong while fetching data.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-red-50 rounded-2xl border border-red-200">
      <div className="p-4 bg-red-100 text-red-500 rounded-full mb-4">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-red-800">Oops! Failed to Load</h3>
      <p className="text-red-600 text-sm mt-1 max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 bg-red-600 text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-red-700 transition"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;

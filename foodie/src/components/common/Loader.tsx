import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-500 font-medium">Loading delicious options...</p>
    </div>
  );
};

export default Loader;

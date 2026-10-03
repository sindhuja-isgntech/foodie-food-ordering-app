import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass } from 'lucide-react';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="mb-4 rounded-2xl bg-orange-50 p-4 text-orange-700 ring-1 ring-orange-100">
        <Compass className="w-12 h-12" />
      </div>
      <h1 className="text-4xl font-extrabold text-stone-900 mb-2">404 - Page Not Found</h1>
      <p className="text-stone-500 max-w-md mb-6">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate('/')}
        className="rounded-lg bg-orange-600 px-5 py-2.5 font-semibold text-white shadow-sm hover:bg-orange-700"
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;

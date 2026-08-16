import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass } from 'lucide-react';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="p-4 bg-orange-100 text-orange-500 rounded-full mb-4">
        <Compass className="w-12 h-12" />
      </div>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">404 - Page Not Found</h1>
      <p className="text-gray-500 max-w-md mb-6">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate('/')}
        className="bg-orange-500 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-orange-600 transition"
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;

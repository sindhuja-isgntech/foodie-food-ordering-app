import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export const FoodDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-orange-500 mb-6 font-medium transition"
      >
        <ArrowLeft className="w-5 h-5" /> Go Back
      </button>

      <div className="bg-white rounded-3xl border p-6 md:p-8 grid md:grid-cols-2 gap-8 shadow-sm">
        <img
          src="https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80"
          alt="Food item"
          className="w-full h-72 md:h-full object-cover rounded-2xl"
        />
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
              Item #{id}
            </span>
            <h1 className="text-3xl font-extrabold text-gray-900 mt-3">
              Signature Pepperoni Pizza
            </h1>
            <p className="text-2xl font-bold text-orange-500 mt-2">$14.99</p>
            <p className="text-gray-600 mt-4 leading-relaxed">
              Loaded with premium pepperoni slices, fresh mozzarella cheese, and authentic Italian
              tomato sauce on a crispy hand-tossed crust.
            </p>
          </div>

          <button
            onClick={() => alert('Item added to cart!')}
            className="mt-8 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition"
          >
            <ShoppingBag className="w-5 h-5" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;

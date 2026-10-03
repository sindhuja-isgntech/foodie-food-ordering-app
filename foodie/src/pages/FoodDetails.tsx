import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Leaf,
  ShoppingBag,
  XCircle,
} from 'lucide-react';
import { useCart } from '../context/useCart';
import { useRestaurants } from '../hooks/useRestaurants';
import type { FoodItem } from '../types/foodie';

const getDietaryStatus = (item: FoodItem): boolean => {
  if (item.isVegetarian !== undefined) return item.isVegetarian;

  const nonVegetarianTerms = /chicken|beef|bacon|pork|lamb|pepperoni|salmon|tuna|sashimi|eel|meat|fish/i;
  return !nonVegetarianTerms.test(`${item.name} ${item.description}`);
};

export const FoodDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const { data: restaurants, isLoading, isError } = useRestaurants();

  const foodId = Number(id);
  const foodFromNavigation = (location.state as { food?: FoodItem } | null)?.food;
  const foodFromService = restaurants
    ?.flatMap((restaurant) => restaurant.menu?.items ?? [])
    .find((item) => item.id === foodId);
  const food = foodFromNavigation?.id === foodId ? foodFromNavigation : foodFromService;

  if (isLoading) {
    return <p className="max-w-4xl mx-auto px-4 py-12 text-center text-stone-500">Loading food details...</p>;
  }

  if (isError || !food) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-12 text-center" aria-labelledby="food-error-heading">
        <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" aria-hidden="true" />
        <h1 id="food-error-heading" className="text-2xl font-bold text-stone-900">
          Food item not found
        </h1>
        <p className="mt-2 text-stone-500">This item is no longer available in the menu.</p>
      </section>
    );
  }

  const isVegetarian = getDietaryStatus(food);
  const isAvailable = food.isAvailable ?? true;

  return (
    <section className="max-w-4xl mx-auto px-4 py-8" aria-labelledby="food-heading">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-stone-600 hover:text-orange-500 mb-6 font-medium transition"
      >
        <ArrowLeft className="w-5 h-5" /> Go Back
      </button>

      <article className="grid gap-8 rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm sm:p-6 md:grid-cols-2 md:p-8">
        <img
          src={food.img}
          alt={food.name}
          className="h-72 w-full rounded-xl object-cover md:h-full"
        />
        <div className="flex flex-col justify-between">
          <div>
            <span className="rounded-md bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700">
              {food.category}
            </span>
            <h1 id="food-heading" className="text-3xl font-extrabold text-stone-900 mt-3">
              {food.name}
            </h1>
            <p className="mt-2 text-2xl font-bold text-orange-700">{food.price}</p>
            <div className="flex flex-wrap gap-2 mt-4" aria-label="Food attributes">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                  isVegetarian ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                }`}
              >
                <Leaf className="w-4 h-4" aria-hidden="true" />
                {isVegetarian ? 'Vegetarian' : 'Non-vegetarian'}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                  isAvailable ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-100 text-stone-600'
                }`}
              >
                {isAvailable ? (
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <XCircle className="w-4 h-4" aria-hidden="true" />
                )}
                {isAvailable ? 'Available' : 'Unavailable'}
              </span>
            </div>
            <p className="text-stone-600 mt-4 leading-relaxed">
              {food.description}
            </p>
          </div>

          <button
            type="button"
            onClick={() => addToCart(food)}
            disabled={!isAvailable}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-orange-600 py-3.5 font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-stone-300"
          >
            <ShoppingBag className="w-5 h-5" aria-hidden="true" />
            {isAvailable ? 'Add to Cart' : 'Currently Unavailable'}
          </button>
        </div>
      </article>
    </section>
  );
};

export default FoodDetails;

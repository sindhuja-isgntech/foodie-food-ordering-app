import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Input } from '../../components/ui/Input';
import Loader from '../../components/common/Loader';
import ErrorState from '../../components/common/ErrorState';
import {
  AdminPageHeader,
  AdminTable,
  CheckboxField,
  EmptyRow,
  ErrorBanner,
  FormCard,
  RowActions,
  SelectField,
} from '../../components/admin/AdminUi';
import { emptyToNull, toNullableNumber } from '../../components/admin/formUtils';
import { adminApi, adminKeys } from '../../services/adminService';
import type {
  AdminCategory,
  AdminFoodItem,
  AdminRestaurant,
  FoodItemInput,
} from '../../services/adminService';
import { getErrorMessage } from '../../services/orderService';

const foodSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  description: z.string(),
  price: z
    .number({ invalid_type_error: 'Price is required' })
    .positive('Price must be greater than 0'),
  restaurantId: z.number({ invalid_type_error: 'Choose a restaurant' }),
  categoryId: z.number().nullable(),
  imageUrl: z.string(),
  isVeg: z.boolean(),
  isAvailable: z.boolean(),
});

type FoodFormValues = z.infer<typeof foodSchema>;

interface FoodFormProps {
  food: AdminFoodItem | null;
  restaurants: AdminRestaurant[];
  categories: AdminCategory[];
  defaultRestaurantId: number | null;
  onSave: (input: FoodItemInput) => void;
  onCancel: () => void;
  isSaving: boolean;
  error?: string;
}

const FoodForm: React.FC<FoodFormProps> = ({
  food,
  restaurants,
  categories,
  defaultRestaurantId,
  onSave,
  onCancel,
  isSaving,
  error,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FoodFormValues>({
    resolver: zodResolver(foodSchema),
    defaultValues: {
      name: food?.name ?? '',
      description: food?.description ?? '',
      // react-hook-form keeps number inputs as numbers; NaN renders as an empty field
      price: food?.price ?? Number.NaN,
      restaurantId: (food?.restaurantId ?? defaultRestaurantId) as number,
      categoryId: food?.categoryId ?? null,
      imageUrl: food?.imageUrl ?? '',
      isVeg: food?.isVeg ?? false,
      isAvailable: food?.isAvailable ?? true,
    },
  });

  const onSubmit = (values: FoodFormValues) =>
    onSave({
      ...values,
      description: emptyToNull(values.description),
      imageUrl: emptyToNull(values.imageUrl),
    });

  return (
    <FormCard
      title={food ? `Edit ${food.name}` : 'Add Food Item'}
      onSubmit={handleSubmit(onSubmit)}
      onCancel={onCancel}
      isSaving={isSaving}
      error={error}
    >
      <Input label="Name" required {...register('name')} error={errors.name?.message} />
      <Input
        label="Price ($)"
        type="number"
        step="0.01"
        min="0"
        required
        {...register('price', { valueAsNumber: true })}
        error={errors.price?.message}
      />
      <SelectField
        label="Restaurant"
        required
        {...register('restaurantId', { setValueAs: toNullableNumber })}
        error={errors.restaurantId?.message}
      >
        <option value="">Select a restaurant</option>
        {restaurants.map((restaurant) => (
          <option key={restaurant.id} value={restaurant.id}>
            {restaurant.name}
          </option>
        ))}
      </SelectField>
      <SelectField label="Category" {...register('categoryId', { setValueAs: toNullableNumber })}>
        <option value="">No category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </SelectField>
      <div className="md:col-span-2">
        <Input label="Description" {...register('description')} />
      </div>
      <Input label="Image URL" type="url" {...register('imageUrl')} />
      <div className="flex flex-wrap gap-x-6">
        <CheckboxField label="Vegetarian" {...register('isVeg')} />
        <CheckboxField label="Available" {...register('isAvailable')} />
      </div>
    </FormCard>
  );
};

export const ManageFoods: React.FC = () => {
  const queryClient = useQueryClient();
  // undefined = form closed, null = adding a new food item
  const [editing, setEditing] = useState<AdminFoodItem | null | undefined>(undefined);
  const [restaurantFilter, setRestaurantFilter] = useState<number | null>(null);
  const [actionError, setActionError] = useState('');

  const foodsQuery = useQuery({ queryKey: adminKeys.foods, queryFn: adminApi.fetchFoods });
  const restaurantsQuery = useQuery({
    queryKey: adminKeys.restaurants,
    queryFn: adminApi.fetchRestaurants,
  });
  const categoriesQuery = useQuery({
    queryKey: adminKeys.categories,
    queryFn: adminApi.fetchCategories,
  });

  const restaurants = restaurantsQuery.data ?? [];
  const categories = categoriesQuery.data ?? [];
  const foods = (foodsQuery.data ?? []).filter(
    (food) => restaurantFilter === null || food.restaurantId === restaurantFilter,
  );
  const isLoading = foodsQuery.isLoading || restaurantsQuery.isLoading || categoriesQuery.isLoading;
  const error = foodsQuery.error ?? restaurantsQuery.error ?? categoriesQuery.error;

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: adminKeys.foods });
    queryClient.invalidateQueries({ queryKey: adminKeys.publicRestaurants });
    // Restaurant detail pages cache menus under ['restaurant', id]
    queryClient.invalidateQueries({ queryKey: ['restaurant'] });
  };

  const saveMutation = useMutation({
    mutationFn: (input: FoodItemInput) =>
      editing ? adminApi.updateFood(editing.id, input) : adminApi.createFood(input),
    onSuccess: () => {
      refresh();
      setEditing(undefined);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: adminApi.deleteFood,
    onSuccess: refresh,
    onError: (err) => setActionError(getErrorMessage(err, 'Could not delete food item.')),
  });

  const openForm = (food: AdminFoodItem | null) => {
    saveMutation.reset();
    setEditing(food);
  };

  const handleDelete = (food: AdminFoodItem) => {
    if (window.confirm(`Delete "${food.name}" from ${food.restaurantName ?? 'the menu'}?`)) {
      setActionError('');
      deleteMutation.mutate(food.id);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <AdminPageHeader
        title="Food Items"
        description="Manage each restaurant's menu, prices and availability."
        actionLabel="Add Food Item"
        onAction={() => openForm(null)}
      />

      {editing !== undefined && (
        <FoodForm
          key={editing?.id ?? 'new'}
          food={editing}
          restaurants={restaurants}
          categories={categories}
          defaultRestaurantId={restaurantFilter}
          onSave={(input) => saveMutation.mutate(input)}
          onCancel={() => setEditing(undefined)}
          isSaving={saveMutation.isPending}
          error={
            saveMutation.error
              ? getErrorMessage(saveMutation.error, 'Could not save food item.')
              : undefined
          }
        />
      )}

      {actionError && <ErrorBanner message={actionError} />}

      <div className="mb-4 max-w-xs">
        <SelectField
          label="Filter by restaurant"
          value={restaurantFilter ?? ''}
          onChange={(e) => setRestaurantFilter(toNullableNumber(e.target.value))}
        >
          <option value="">All restaurants</option>
          {restaurants.map((restaurant) => (
            <option key={restaurant.id} value={restaurant.id}>
              {restaurant.name}
            </option>
          ))}
        </SelectField>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorState
          message={getErrorMessage(error, error.message)}
          onRetry={() => {
            foodsQuery.refetch();
            restaurantsQuery.refetch();
            categoriesQuery.refetch();
          }}
        />
      ) : (
        <AdminTable headers={['Item', 'Restaurant', 'Category', 'Price', 'Status', '']}>
          {foods.length === 0 ? (
            <EmptyRow colSpan={6} message="No food items found." />
          ) : (
            foods.map((food) => (
              <tr key={food.id} className="hover:bg-gray-50/60">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {food.imageUrl ? (
                      <img
                        src={food.imageUrl}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-orange-50" />
                    )}
                    <div>
                      <p className="font-bold text-gray-900">{food.name}</p>
                      {food.isVeg && <p className="text-xs font-semibold text-green-600">Veg</p>}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-700">{food.restaurantName ?? '—'}</td>
                <td className="px-4 py-3 text-gray-700">{food.categoryName ?? '—'}</td>
                <td className="px-4 py-3 font-semibold text-gray-900">
                  ${food.price.toFixed(2)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                      food.isAvailable === false
                        ? 'bg-gray-100 text-gray-600'
                        : 'bg-green-50 text-green-700'
                    }`}
                  >
                    {food.isAvailable === false ? 'Unavailable' : 'Available'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <RowActions
                    itemName={food.name}
                    onEdit={() => openForm(food)}
                    onDelete={() => handleDelete(food)}
                    isDeleting={deleteMutation.isPending}
                  />
                </td>
              </tr>
            ))
          )}
        </AdminTable>
      )}
    </section>
  );
};

export default ManageFoods;

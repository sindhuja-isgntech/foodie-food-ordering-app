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
  AdminPagination,
  AdminTable,
  CheckboxField,
  EmptyRow,
  ErrorBanner,
  FormCard,
  RowActions,
} from '../../components/admin/AdminUi';
import { emptyToNull, toNullableNumber } from '../../components/admin/formUtils';
import { adminApi, adminKeys } from '../../services/adminService';
import type { AdminRestaurant, RestaurantInput } from '../../services/adminService';
import { getErrorMessage } from '../../services/orderService';
import { useFeedback } from '../../context/useFeedback';

const restaurantSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  cuisine: z.string().trim().min(2, 'Cuisine is required'),
  rating: z.number().min(0, 'Rating must be 0–5').max(5, 'Rating must be 0–5').nullable(),
  deliveryTime: z.string(),
  priceRange: z.string(),
  location: z.string(),
  imageUrl: z.string(),
  isOpen: z.boolean(),
});

type RestaurantFormValues = z.infer<typeof restaurantSchema>;

interface RestaurantFormProps {
  restaurant: AdminRestaurant | null;
  onSave: (input: RestaurantInput) => void;
  onCancel: () => void;
  isSaving: boolean;
  error?: string;
}

const RestaurantForm: React.FC<RestaurantFormProps> = ({
  restaurant,
  onSave,
  onCancel,
  isSaving,
  error,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RestaurantFormValues>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      name: restaurant?.name ?? '',
      cuisine: restaurant?.cuisine ?? '',
      rating: restaurant?.rating ?? null,
      deliveryTime: restaurant?.deliveryTime ?? '',
      priceRange: restaurant?.priceRange ?? '',
      location: restaurant?.location ?? '',
      imageUrl: restaurant?.imageUrl ?? '',
      isOpen: restaurant?.isOpen ?? true,
    },
  });

  const onSubmit = (values: RestaurantFormValues) =>
    onSave({
      ...values,
      deliveryTime: emptyToNull(values.deliveryTime),
      priceRange: emptyToNull(values.priceRange),
      location: emptyToNull(values.location),
      imageUrl: emptyToNull(values.imageUrl),
    });

  return (
    <FormCard
      title={restaurant ? `Edit ${restaurant.name}` : 'Add Restaurant'}
      onSubmit={handleSubmit(onSubmit)}
      onCancel={onCancel}
      isSaving={isSaving}
      error={error}
    >
      <Input label="Name" required {...register('name')} error={errors.name?.message} />
      <Input
        label="Cuisine"
        required
        placeholder="e.g. Indian"
        {...register('cuisine')}
        error={errors.cuisine?.message}
      />
      <Input
        label="Rating"
        type="number"
        step="0.1"
        min="0"
        max="5"
        {...register('rating', { setValueAs: toNullableNumber })}
        error={errors.rating?.message}
      />
      <Input label="Delivery Time" placeholder="20-30 min" {...register('deliveryTime')} />
      <Input label="Price Range" placeholder="$$" {...register('priceRange')} />
      <Input label="Location" {...register('location')} />
      <Input label="Image URL" type="url" {...register('imageUrl')} />
      <CheckboxField label="Open for orders" {...register('isOpen')} />
    </FormCard>
  );
};

export const ManageRestaurants: React.FC = () => {
  const queryClient = useQueryClient();
  const { showToast, confirm } = useFeedback();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  // undefined = form closed, null = adding a new restaurant
  const [editing, setEditing] = useState<AdminRestaurant | null | undefined>(undefined);
  const [actionError, setActionError] = useState('');

  const {
    data: restaurantPage,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [...adminKeys.restaurants, page, pageSize],
    queryFn: () => adminApi.fetchRestaurants(page, pageSize),
  });
  const restaurants = restaurantPage?.content ?? [];

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: adminKeys.restaurants });
    queryClient.invalidateQueries({ queryKey: adminKeys.restaurantOptions });
    queryClient.invalidateQueries({ queryKey: adminKeys.publicRestaurants });
    queryClient.invalidateQueries({ queryKey: adminKeys.foods });
  };

  const saveMutation = useMutation({
    mutationFn: (input: RestaurantInput) =>
      editing ? adminApi.updateRestaurant(editing.id, input) : adminApi.createRestaurant(input),
    onSuccess: (saved) => {
      refresh();
      showToast({
        title: editing ? 'Restaurant updated successfully' : 'Restaurant added successfully',
        description: `"${saved.name}" has been saved.`,
      });
      setEditing(undefined);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (item: AdminRestaurant) => adminApi.deleteRestaurant(item.id),
    onSuccess: (_result, item) => {
      showToast({ title: 'Restaurant deleted', description: `"${item.name}" has been removed.` });
      if (page > 0 && restaurantPage?.content.length === 1) setPage(page - 1);
      refresh();
    },
    onError: (err) => setActionError(getErrorMessage(err, 'Could not delete restaurant.')),
  });

  const openForm = (restaurant: AdminRestaurant | null) => {
    saveMutation.reset();
    setEditing(restaurant);
  };

  const handleDelete = async (item: AdminRestaurant) => {
    const confirmed = await confirm({
      title: 'Delete restaurant?',
      message: `"${item.name}" and all of its food items will be permanently deleted. This cannot be undone.`,
      confirmLabel: 'Delete restaurant',
    });
    if (confirmed) {
      setActionError('');
      deleteMutation.mutate(item);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <AdminPageHeader
        title="Restaurants"
        description="Add, update or remove restaurants shown to customers."
        actionLabel="Add Restaurant"
        onAction={() => openForm(null)}
      />

      {editing !== undefined && (
        <RestaurantForm
          key={editing?.id ?? 'new'}
          restaurant={editing}
          onSave={(input) => saveMutation.mutate(input)}
          onCancel={() => setEditing(undefined)}
          isSaving={saveMutation.isPending}
          error={
            saveMutation.error
              ? getErrorMessage(saveMutation.error, 'Could not save restaurant.')
              : undefined
          }
        />
      )}

      {actionError && <ErrorBanner message={actionError} />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorState message={getErrorMessage(error, error.message)} onRetry={() => refetch()} />
      ) : (
        <>
          <AdminTable headers={['Restaurant', 'Cuisine', 'Rating', 'Delivery', 'Status', '']}>
            {restaurants.length === 0 ? (
              <EmptyRow colSpan={6} message="No restaurants yet." />
            ) : (
              restaurants.map((restaurant) => (
                <tr key={restaurant.id} className="hover:bg-gray-50/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {restaurant.imageUrl ? (
                        <img
                          src={restaurant.imageUrl}
                          alt=""
                          className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-orange-50" />
                      )}
                      <div>
                        <p className="font-bold text-gray-900">{restaurant.name}</p>
                        <p className="text-xs text-gray-500">{restaurant.location ?? '—'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{restaurant.cuisine}</td>
                  <td className="px-4 py-3 text-gray-700">{restaurant.rating ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                    {restaurant.deliveryTime ?? '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        restaurant.isOpen === false
                          ? 'bg-gray-100 text-gray-600'
                          : 'bg-green-50 text-green-700'
                      }`}
                    >
                      {restaurant.isOpen === false ? 'Closed' : 'Open'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <RowActions
                      itemName={restaurant.name}
                      onEdit={() => openForm(restaurant)}
                      onDelete={() => handleDelete(restaurant)}
                      isDeleting={deleteMutation.isPending}
                    />
                  </td>
                </tr>
              ))
            )}
          </AdminTable>
          <AdminPagination
            page={page}
            pageSize={pageSize}
            totalPages={restaurantPage?.totalPages ?? 0}
            totalElements={restaurantPage?.totalElements ?? 0}
            itemLabel="restaurants"
            onPageChange={setPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setPage(0);
            }}
          />
        </>
      )}
    </section>
  );
};

export default ManageRestaurants;

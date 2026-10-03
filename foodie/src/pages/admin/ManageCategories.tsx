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
  EmptyRow,
  ErrorBanner,
  FormCard,
  RowActions,
} from '../../components/admin/AdminUi';
import { emptyToNull } from '../../components/admin/formUtils';
import { adminApi, adminKeys } from '../../services/adminService';
import type { AdminCategory, CategoryInput } from '../../services/adminService';
import { getErrorMessage } from '../../services/orderService';
import { useFeedback } from '../../context/useFeedback';

const categorySchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  imageUrl: z.string(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  category: AdminCategory | null;
  onSave: (input: CategoryInput) => void;
  onCancel: () => void;
  isSaving: boolean;
  error?: string;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  category,
  onSave,
  onCancel,
  isSaving,
  error,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: category?.name ?? '', imageUrl: category?.imageUrl ?? '' },
  });

  return (
    <FormCard
      title={category ? `Edit ${category.name}` : 'Add Category'}
      onSubmit={handleSubmit((values) =>
        onSave({ name: values.name, imageUrl: emptyToNull(values.imageUrl) }),
      )}
      onCancel={onCancel}
      isSaving={isSaving}
      error={error}
    >
      <Input label="Name" required {...register('name')} error={errors.name?.message} />
      <Input label="Image URL" type="url" {...register('imageUrl')} />
    </FormCard>
  );
};

export const ManageCategories: React.FC = () => {
  const queryClient = useQueryClient();
  const { showToast, confirm } = useFeedback();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  // undefined = form closed, null = adding a new category
  const [editing, setEditing] = useState<AdminCategory | null | undefined>(undefined);
  const [actionError, setActionError] = useState('');

  const {
    data: categoryPage,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [...adminKeys.categories, page, pageSize],
    queryFn: () => adminApi.fetchCategories(page, pageSize),
  });
  const categories = categoryPage?.content ?? [];

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: adminKeys.categories });
    queryClient.invalidateQueries({ queryKey: adminKeys.categoryOptions });
    queryClient.invalidateQueries({ queryKey: adminKeys.foods });
    queryClient.invalidateQueries({ queryKey: adminKeys.publicRestaurants });
  };

  const saveMutation = useMutation({
    mutationFn: (input: CategoryInput) =>
      editing ? adminApi.updateCategory(editing.id, input) : adminApi.createCategory(input),
    onSuccess: (saved) => {
      refresh();
      showToast({
        title: editing ? 'Category updated successfully' : 'Category added successfully',
        description: `"${saved.name}" has been saved.`,
      });
      setEditing(undefined);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (item: AdminCategory) => adminApi.deleteCategory(item.id),
    onSuccess: (_result, item) => {
      showToast({ title: 'Category deleted', description: `"${item.name}" has been removed.` });
      if (page > 0 && categoryPage?.content.length === 1) setPage(page - 1);
      refresh();
    },
    onError: (err) => setActionError(getErrorMessage(err, 'Could not delete category.')),
  });

  const openForm = (category: AdminCategory | null) => {
    saveMutation.reset();
    setEditing(category);
  };

  const handleDelete = async (item: AdminCategory) => {
    const confirmed = await confirm({
      title: 'Delete category?',
      message: `"${item.name}" will be deleted. Food items in this category stay on the menu without a category.`,
      confirmLabel: 'Delete category',
    });
    if (confirmed) {
      setActionError('');
      deleteMutation.mutate(item);
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <AdminPageHeader
        title="Categories"
        description="Organise food items into menu categories."
        actionLabel="Add Category"
        onAction={() => openForm(null)}
      />

      {editing !== undefined && (
        <CategoryForm
          key={editing?.id ?? 'new'}
          category={editing}
          onSave={(input) => saveMutation.mutate(input)}
          onCancel={() => setEditing(undefined)}
          isSaving={saveMutation.isPending}
          error={
            saveMutation.error
              ? getErrorMessage(saveMutation.error, 'Could not save category.')
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
          <AdminTable headers={['Category', 'Image', '']}>
            {categories.length === 0 ? (
              <EmptyRow colSpan={3} message="No categories yet." />
            ) : (
              categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50/60">
                  <td className="px-4 py-3 font-bold text-gray-900">{category.name}</td>
                  <td className="px-4 py-3">
                    {category.imageUrl ? (
                      <img
                        src={category.imageUrl}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                      />
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <RowActions
                      itemName={category.name}
                      onEdit={() => openForm(category)}
                      onDelete={() => handleDelete(category)}
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
            totalPages={categoryPage?.totalPages ?? 0}
            totalElements={categoryPage?.totalElements ?? 0}
            itemLabel="categories"
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

export default ManageCategories;

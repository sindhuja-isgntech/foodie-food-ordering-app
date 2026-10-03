import React from 'react';
import { ChevronLeft, ChevronRight, Pencil, Plus, Trash2 } from 'lucide-react';

// Small building blocks shared by the admin management pages.

interface AdminPageHeaderProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const AdminPageHeader: React.FC<AdminPageHeaderProps> = ({
  title,
  description,
  actionLabel,
  onAction,
}) => (
  <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
    <div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{title}</h1>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
    {actionLabel && onAction && (
      <button
        type="button"
        onClick={onAction}
        className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-700"
      >
        <Plus className="w-4 h-4" />
        {actionLabel}
      </button>
    )}
  </div>
);

interface FormCardProps {
  title: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  isSaving: boolean;
  error?: string;
  children: React.ReactNode;
}

export const FormCard: React.FC<FormCardProps> = ({
  title,
  onSubmit,
  onCancel,
  isSaving,
  error,
  children,
}) => (
  <form
    onSubmit={onSubmit}
    className="mb-8 rounded-xl border border-gray-200/80 bg-white p-5 shadow-sm sm:p-6"
    noValidate
  >
    <h2 className="text-lg font-bold text-gray-800 mb-4">{title}</h2>
    {error && <ErrorBanner message={error} />}
    <div className="grid md:grid-cols-2 gap-4">{children}</div>
    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6">
      <button
        type="button"
        onClick={onCancel}
        className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={isSaving}
        className="rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 disabled:cursor-wait disabled:bg-gray-300"
      >
        {isSaving ? 'Saving...' : 'Save'}
      </button>
    </div>
  </form>
);

export const ErrorBanner: React.FC<{ message: string }> = ({ message }) => (
  <p
    role="alert"
    className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl"
  >
    {message}
  </p>
);

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
}

export const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, error, children, ...props }, ref) => (
    <label className="w-full flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-gray-700">
        {label} {props.required && <span className="text-red-500">*</span>}
      </span>
      <select
        ref={ref}
        className={`w-full rounded-lg border bg-gray-50/60 px-3 py-2.5 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-500 focus:ring-red-200'
            : 'border-gray-200 focus:ring-orange-500/20 focus:border-orange-500'
        }`}
        {...props}
      >
        {children}
      </select>
      {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
    </label>
  ),
);
SelectField.displayName = 'SelectField';

interface CheckboxFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const CheckboxField = React.forwardRef<HTMLInputElement, CheckboxFieldProps>(
  ({ label, ...props }, ref) => (
    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 self-end py-2.5">
      <input ref={ref} type="checkbox" className="w-4 h-4 rounded accent-orange-500" {...props} />
      {label}
    </label>
  ),
);
CheckboxField.displayName = 'CheckboxField';

// Horizontally scrollable table wrapper so wide tables don't break the page on phones.
export const AdminTable: React.FC<{ headers: string[]; children: React.ReactNode }> = ({
  headers,
  children,
}) => (
  <div className="overflow-x-auto rounded-xl border border-gray-200/80 bg-white shadow-sm">
    <table className="w-full min-w-[40rem] text-sm text-left">
      <thead className="bg-gray-50/80 text-xs uppercase tracking-wide text-gray-500">
        <tr>
          {headers.map((header) => (
            <th key={header} scope="col" className="px-4 py-3 font-bold whitespace-nowrap">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">{children}</tbody>
    </table>
  </div>
);

interface AdminPaginationProps {
  page: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  itemLabel: string;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export const AdminPagination: React.FC<AdminPaginationProps> = ({
  page,
  pageSize,
  totalPages,
  totalElements,
  itemLabel,
  onPageChange,
  onPageSizeChange,
}) => {
  const firstItem = totalElements === 0 ? 0 : page * pageSize + 1;
  const lastItem = Math.min((page + 1) * pageSize, totalElements);

  return (
    <div className="flex flex-col gap-3 border-t border-gray-200/80 px-4 py-3 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
      <p>
        Showing{' '}
        <span className="font-semibold text-gray-900">
          {firstItem}-{lastItem}
        </span>{' '}
        of <span className="font-semibold text-gray-900">{totalElements}</span> {itemLabel}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-xs font-medium text-gray-500">
          Rows
          <select
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            className="rounded-md border border-gray-200 bg-white px-2 py-1.5 text-sm text-gray-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-500/15"
            aria-label={`Rows per page for ${itemLabel}`}
          >
            {[10, 25, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
        <span className="min-w-20 text-center text-xs font-medium text-gray-500">
          Page {totalPages === 0 ? 0 : page + 1} of {totalPages}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 0}
            aria-label="Previous page"
            className="rounded-md border border-gray-200 p-1.5 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={totalPages === 0 || page >= totalPages - 1}
            aria-label="Next page"
            className="rounded-md border border-gray-200 p-1.5 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const EmptyRow: React.FC<{ colSpan: number; message: string }> = ({ colSpan, message }) => (
  <tr>
    <td colSpan={colSpan} className="px-4 py-10 text-center text-gray-400">
      {message}
    </td>
  </tr>
);

interface RowActionsProps {
  itemName: string;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
}

export const RowActions: React.FC<RowActionsProps> = ({
  itemName,
  onEdit,
  onDelete,
  isDeleting,
}) => (
  <div className="flex items-center justify-end gap-1">
    <button
      type="button"
      onClick={onEdit}
      aria-label={`Edit ${itemName}`}
      className="p-2 rounded-lg text-gray-500 hover:text-orange-600 hover:bg-orange-50 transition"
    >
      <Pencil className="w-4 h-4" />
    </button>
    <button
      type="button"
      onClick={onDelete}
      disabled={isDeleting}
      aria-label={`Delete ${itemName}`}
      className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 disabled:opacity-40 transition"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  </div>
);

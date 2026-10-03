import { createContext } from 'react';

export type ToastVariant = 'success' | 'error' | 'info';

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
}

export interface ConfirmOptions {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Red confirm button for destructive actions such as deleting. Defaults to true. */
  destructive?: boolean;
}

export interface FeedbackContextType {
  showToast: (options: ToastOptions) => void;
  /** Opens a confirmation dialog and resolves to true when the user confirms. */
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

export const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

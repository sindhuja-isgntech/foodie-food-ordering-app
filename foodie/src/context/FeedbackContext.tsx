import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { FeedbackContext } from './feedback-context';
import type { ConfirmOptions, ToastOptions, ToastVariant } from './feedback-context';

const TOAST_DURATION_MS = 4000;

interface Toast extends ToastOptions {
  id: number;
}

interface PendingConfirm extends ConfirmOptions {
  resolve: (confirmed: boolean) => void;
}

const TOAST_STYLES: Record<ToastVariant, { icon: typeof Info; accent: string }> = {
  success: { icon: CheckCircle2, accent: 'text-emerald-600' },
  error: { icon: XCircle, accent: 'text-red-600' },
  info: { icon: Info, accent: 'text-orange-600' },
};

// App-wide success/error toasts and a styled replacement for window.confirm.
export const FeedbackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [pendingConfirm, setPendingConfirm] = useState<PendingConfirm | null>(null);
  const nextId = useRef(0);

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (options: ToastOptions) => {
      const id = nextId.current++;
      setToasts((current) => [...current, { id, variant: 'success', ...options }]);
      window.setTimeout(() => dismissToast(id), TOAST_DURATION_MS);
    },
    [dismissToast],
  );

  const confirm = useCallback(
    (options: ConfirmOptions) =>
      new Promise<boolean>((resolve) => setPendingConfirm({ ...options, resolve })),
    [],
  );

  // Stable per dialog so the dialog's focus/keyboard effect doesn't re-run on unrelated renders.
  const closeConfirm = useCallback(
    (confirmed: boolean) => {
      pendingConfirm?.resolve(confirmed);
      setPendingConfirm(null);
    },
    [pendingConfirm],
  );

  const value = useMemo(() => ({ showToast, confirm }), [showToast, confirm]);

  return (
    <FeedbackContext.Provider value={value}>
      {children}

      {/* Toasts: bottom-centre on phones, top-right on larger screens */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex flex-col items-center gap-3 px-4 sm:inset-x-auto sm:bottom-auto sm:right-4 sm:top-24 sm:items-end"
      >
        {toasts.map(({ id, title, description, variant = 'success' }) => {
          const { icon: Icon, accent } = TOAST_STYLES[variant];
          return (
            <div
              key={id}
              role={variant === 'error' ? 'alert' : 'status'}
              className="animate-fadeInUp pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-lg shadow-stone-900/10"
            >
              <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${accent}`} aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-stone-900">{title}</p>
                {description && <p className="mt-0.5 text-sm text-stone-500">{description}</p>}
              </div>
              <button
                type="button"
                onClick={() => dismissToast(id)}
                aria-label="Dismiss notification"
                className="-m-1 rounded-lg p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>

      {pendingConfirm && <ConfirmDialog options={pendingConfirm} onClose={closeConfirm} />}
    </FeedbackContext.Provider>
  );
};

const ConfirmDialog: React.FC<{
  options: ConfirmOptions;
  onClose: (confirmed: boolean) => void;
}> = ({ options, onClose }) => {
  const {
    title,
    message,
    confirmLabel = 'Delete',
    cancelLabel = 'Cancel',
    destructive = true,
  } = options;
  const cancelRef = useRef<HTMLButtonElement>(null);

  // Focus the safe choice first and let Escape cancel.
  useEffect(() => {
    cancelRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center">
      <div
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm"
        onClick={() => onClose(false)}
        aria-hidden="true"
      />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
        className="animate-fadeInUp relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="flex items-start gap-4">
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
              destructive ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'
            }`}
          >
            <AlertTriangle className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h2 id="confirm-title" className="text-lg font-semibold text-stone-900">
              {title}
            </h2>
            <p id="confirm-message" className="mt-1 text-sm text-stone-600">
              {message}
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            ref={cancelRef}
            type="button"
            onClick={() => onClose(false)}
            className="rounded-xl border border-stone-300 px-5 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={() => onClose(true)}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              destructive
                ? 'bg-red-600 hover:bg-red-700 focus-visible:ring-red-500'
                : 'bg-orange-600 hover:bg-orange-700 focus-visible:ring-orange-500'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

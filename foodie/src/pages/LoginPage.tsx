import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { isAxiosError } from 'axios';
import {
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  Clock,
  Eye,
  EyeOff,
  LoaderCircle,
  Lock,
  Mail,
  Star,
  Truck,
} from 'lucide-react';
import { loginApi, requestPasswordReset, resetPassword } from '../services/api';
import { useAuth } from '../context/AuthContext';

const highlights = [
  { icon: Truck, title: 'Fast delivery', text: 'Hot meals at your door in minutes' },
  { icon: Star, title: 'Top-rated kitchens', text: 'Handpicked restaurants near you' },
  { icon: Clock, title: 'Live order tracking', text: 'Know exactly when food arrives' },
];

const inputClass =
  'w-full rounded-xl border border-stone-200 bg-stone-50 py-3 pl-11 pr-4 text-stone-900 placeholder:text-stone-400 transition focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/15';

const getAuthError = (error: unknown, fallback: string) =>
  (isAxiosError<{ message?: string }>(error) && error.response?.data?.message) || fallback;

export default function LoginPage(): React.JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const resetToken = searchParams.get('resetToken');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [recoverySent, setRecoverySent] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);
  const [error, setError] = useState('');
  const [recoveryError, setRecoveryError] = useState('');
  const [resetError, setResetError] = useState('');
  const [loading, setLoading] = useState(false);
  const [recoveryLoading, setRecoveryLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginApi({ email, password });
      login(data);
      if (data.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(getAuthError(err, 'Invalid credentials'));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryError('');
    setRecoveryLoading(true);

    try {
      await requestPasswordReset(email);
      setRecoverySent(true);
    } catch (err) {
      setRecoveryError(
        getAuthError(err, 'We could not send reset instructions. Please try again.'),
      );
    } finally {
      setRecoveryLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError('');

    if (newPassword !== confirmPassword) {
      setResetError('Passwords do not match.');
      return;
    }

    if (!resetToken) {
      setResetError('This password reset link is invalid or expired.');
      return;
    }

    setResetLoading(true);
    try {
      await resetPassword(resetToken, newPassword);
      setResetComplete(true);
      setNewPassword('');
      setConfirmPassword('');
      setSearchParams({}, { replace: true });
    } catch (err) {
      setResetError(
        getAuthError(err, 'We could not reset your password. Request a new link and try again.'),
      );
    } finally {
      setResetLoading(false);
    }
  };

  const isResetFlow = Boolean(resetToken) && !resetComplete;
  const isForgotFlow = showForgotPassword && !resetToken && !resetComplete;
  const activeError = isResetFlow ? resetError : isForgotFlow ? recoveryError : error;

  const returnToSignIn = () => {
    setShowForgotPassword(false);
    setRecoverySent(false);
    setResetComplete(false);
    setRecoveryError('');
    setResetError('');
    setError('');
    setSearchParams({}, { replace: true });
  };

  return (
    <div className="w-full bg-gradient-to-b from-orange-50/60 to-stone-50 px-4 py-10 sm:py-16">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-orange-900/5 ring-1 ring-stone-100 lg:grid-cols-2">
        {/* Brand panel */}
        <aside className="relative hidden overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-white/10" />

          <div className="relative">
            <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur">
              Welcome back
            </span>
            <h1 className="mt-6 text-3xl font-extrabold leading-tight xl:text-4xl">
              Your next favourite meal is just a sign-in away.
            </h1>
            <p className="mt-4 text-orange-50/90">
              Pick up where you left off — your cart, saved addresses and past orders are waiting.
            </p>
          </div>

          <ul className="relative mt-10 space-y-5">
            {highlights.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="text-sm text-orange-50/80">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        {/* Form panel */}
        <section className="p-6 sm:p-10 lg:p-12">
          <div className="mx-auto max-w-sm">
            <h2 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
              {isResetFlow
                ? 'Choose a new password'
                : isForgotFlow
                  ? 'Forgot your password?'
                  : resetComplete
                    ? 'Password updated'
                    : 'Sign in to Foodie'}
            </h2>
            <p className="mt-2 text-sm text-stone-500">
              {isResetFlow
                ? 'Choose a new password with at least 8 characters.'
                : isForgotFlow
                  ? 'Enter the email address associated with your account.'
                  : resetComplete
                    ? 'Your password has been changed. You can sign in now.'
                    : 'Enter your details below to access your account.'}
            </p>

            {activeError && (
              <div
                role="alert"
                className="mt-6 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{activeError}</span>
              </div>
            )}

            {resetComplete ? (
              <div
                className="mt-8 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
                role="status"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                <span>Your password has been reset successfully.</span>
              </div>
            ) : isForgotFlow && recoverySent ? (
              <div
                className="mt-8 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
                role="status"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                <span>
                  If an account exists for that email, password reset instructions have been sent.
                </span>
              </div>
            ) : isResetFlow ? (
              <form onSubmit={handleResetPassword} className="mt-8 space-y-5">
                <div>
                  <label
                    htmlFor="new-password"
                    className="mb-1.5 block text-sm font-medium text-stone-700"
                  >
                    New password
                  </label>
                  <div className="relative">
                    <Lock
                      className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400"
                      aria-hidden="true"
                    />
                    <input
                      id="new-password"
                      type="password"
                      required
                      minLength={8}
                      autoComplete="new-password"
                      className={inputClass}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="At least 8 characters"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="mb-1.5 block text-sm font-medium text-stone-700"
                  >
                    Confirm new password
                  </label>
                  <div className="relative">
                    <Lock
                      className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400"
                      aria-hidden="true"
                    />
                    <input
                      id="confirm-password"
                      type="password"
                      required
                      minLength={8}
                      autoComplete="new-password"
                      className={inputClass}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Enter your new password again"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={resetLoading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 py-3 font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:from-orange-600 hover:to-orange-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {resetLoading ? (
                    <>
                      <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
                      Updating password...
                    </>
                  ) : (
                    <>
                      Update password
                      <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            ) : isForgotFlow ? (
              <form onSubmit={handleForgotPassword} className="mt-8 space-y-5">
                <div>
                  <label
                    htmlFor="recovery-email"
                    className="mb-1.5 block text-sm font-medium text-stone-700"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <Mail
                      className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400"
                      aria-hidden="true"
                    />
                    <input
                      id="recovery-email"
                      type="email"
                      required
                      autoComplete="email"
                      className={inputClass}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={recoveryLoading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 py-3 font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:from-orange-600 hover:to-orange-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {recoveryLoading ? (
                    <>
                      <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
                      Sending link...
                    </>
                  ) : (
                    <>
                      Send reset link
                      <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-stone-700">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail
                      className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400"
                      aria-hidden="true"
                    />
                    <input
                      id="email"
                      type="email"
                      required
                      autoComplete="email"
                      className={inputClass}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-sm font-medium text-stone-700"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400"
                      aria-hidden="true"
                    />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete="current-password"
                      className={`${inputClass} pr-12`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-stone-400 transition hover:bg-stone-100 hover:text-stone-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForgotPassword(true);
                        setError('');
                        setRecoveryError('');
                      }}
                      className="text-sm font-semibold text-orange-700 hover:text-orange-800 hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 py-3 font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:from-orange-600 hover:to-orange-700 hover:shadow-orange-500/40 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-500/30 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight
                        className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </>
                  )}
                </button>
              </form>
            )}

            {!isResetFlow && !resetComplete && !isForgotFlow && (
              <div className="my-8 flex items-center gap-3 text-xs uppercase tracking-wider text-stone-400">
                <span className="h-px flex-1 bg-stone-200" />
                New to Foodie?
                <span className="h-px flex-1 bg-stone-200" />
              </div>
            )}

            {isForgotFlow || isResetFlow || resetComplete ? (
              <button
                type="button"
                onClick={returnToSignIn}
                className="mt-8 flex w-full items-center justify-center rounded-xl border border-stone-200 py-3 font-semibold text-stone-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
              >
                Back to sign in
              </button>
            ) : (
              <Link
                to="/register"
                className="flex w-full items-center justify-center rounded-xl border border-stone-200 py-3 font-semibold text-stone-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
              >
                Create an account
              </Link>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

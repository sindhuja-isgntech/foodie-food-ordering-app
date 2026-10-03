import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Check, ShoppingBag } from 'lucide-react';
import { Input } from '../components/ui/Input';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import { useAuth } from '../context/AuthContext';
import { fetchMyProfile, updateMyProfile } from '../services/profileService';
import type { UserProfile } from '../services/profileService';
import { getErrorMessage } from '../services/orderService';

const PROFILE_KEY = ['profile'];

const profileSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  address: z
    .string()
    .trim()
    .refine((value) => value === '' || value.length >= 5, 'Address must be at least 5 characters'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

interface ProfileFormProps {
  profile: UserProfile;
  onLogout: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ profile, onLogout }) => {
  const queryClient = useQueryClient();
  const { updateUser } = useAuth();
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile.name,
      phone: profile.mobile,
      address: profile.defaultAddress ?? '',
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setSaveError('');
    try {
      const updated = await updateMyProfile({
        name: data.name,
        mobile: data.phone,
        defaultAddress: data.address || null,
      });
      queryClient.setQueryData(PROFILE_KEY, updated);
      updateUser({ name: updated.name, mobile: updated.mobile });
      reset({ name: updated.name, phone: updated.mobile, address: updated.defaultAddress ?? '' });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (error) {
      setSaveError(getErrorMessage(error, 'Could not save your profile. Please try again.'));
    }
  };

  return (
    <>
      {saveSuccess && (
        <div
          role="status"
          className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl flex items-center gap-2"
        >
          <Check className="w-5 h-5" /> Profile updated successfully!
        </div>
      )}
      {saveError && (
        <p
          role="alert"
          className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl"
        >
          {saveError}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Input label="Full Name" {...register('name')} error={errors.name?.message} />
          {/* Email is the login identity, so it can't be changed here */}
          <Input
            label="Email Address"
            type="email"
            value={profile.email}
            readOnly
            aria-readonly="true"
            className="text-stone-500 cursor-not-allowed"
          />
          <Input
            label="Phone Number"
            inputMode="numeric"
            maxLength={10}
            {...register('phone')}
            error={errors.phone?.message}
          />
          <Input
            label="Default Address"
            placeholder="Add a delivery address"
            {...register('address')}
            error={errors.address?.message}
          />
        </div>

        <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onLogout}
            className="rounded-xl border border-stone-300 px-6 py-3 font-bold text-stone-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600"
          >
            Log out
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !isDirty}
            className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition shadow-md disabled:bg-stone-300"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </>
  );
};

export const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const {
    data: profile,
    isLoading,
    error,
    refetch,
  } = useQuery({ queryKey: PROFILE_KEY, queryFn: fetchMyProfile });

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const displayName = profile?.name ?? user?.name ?? '';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link
          to="/orders"
          className="rounded-xl border border-stone-200/80 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-orange-50 text-orange-700">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900">My Orders</h3>
              <p className="text-sm text-stone-600">Track your orders</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-sm md:p-8">
        <div className="flex items-center gap-4 mb-8">
          <div
            aria-hidden="true"
            className="w-16 h-16 shrink-0 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-extrabold text-2xl"
          >
            {getInitials(displayName) || '?'}
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold text-stone-900 truncate">
              {displayName || 'User Profile'}
            </h1>
            <p className="text-sm text-stone-500">
              Manage your personal information and delivery preferences
            </p>
          </div>
        </div>

        {isLoading ? (
          <Loader />
        ) : error || !profile ? (
          <ErrorState
            message={getErrorMessage(error, 'Could not load your profile.')}
            onRetry={() => refetch()}
          />
        ) : (
          <ProfileForm key={profile.id} profile={profile} onLogout={handleLogout} />
        )}
      </div>
    </div>
  );
};

export default Profile;

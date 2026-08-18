import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Check, ShoppingBag } from 'lucide-react';
import { Input } from '../components/ui/Input';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export const Profile: React.FC = () => {
  const [saveSuccess, setSaveSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      phone: '9876543210',
      address: '742 Evergreen Terrace, Springfield',
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Profile updated:', data);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link
          to="/orders"
          className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">My Orders</h3>
              <p className="text-sm text-gray-600">Track your orders</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-extrabold text-2xl">
            AJ
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">User Profile</h1>
            <p className="text-sm text-gray-500">
              Manage your personal information and delivery preferences
            </p>
          </div>
        </div>

        {saveSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl flex items-center gap-2">
            <Check className="w-5 h-5" /> Profile updated successfully!
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Input label="Full Name" {...register('name')} error={errors.name?.message} />
            <Input
              label="Email Address"
              type="email"
              {...register('email')}
              error={errors.email?.message}
            />
            <Input label="Phone Number" {...register('phone')} error={errors.phone?.message} />
            <Input
              label="Default Address"
              {...register('address')}
              error={errors.address?.message}
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition shadow-md disabled:bg-gray-300"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;

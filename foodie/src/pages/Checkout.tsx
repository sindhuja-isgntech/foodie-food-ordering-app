import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  CreditCard,
  Smartphone,
  Banknote,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { Input } from '../components/ui/Input';
import { useCart } from '../context/useCart';
import { useOrders } from '../context/useOrders';

const checkoutSchema = z
  .object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
    address: z.string().min(5, 'Street address is required'),
    city: z.string().min(2, 'City is required'),
    zipCode: z.string().min(5, 'Valid ZIP code required'),
    paymentMethod: z.enum(['card', 'upi', 'cod']),
    cardNumber: z.string().optional(),
    cardExpiry: z.string().optional(),
    cardCvc: z.string().optional(),
    upiId: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.paymentMethod === 'card') {
        return (
          !!data.cardNumber &&
          /^[0-9]{16}$/.test(data.cardNumber) &&
          !!data.cardExpiry &&
          !!data.cardCvc
        );
      }
      if (data.paymentMethod === 'upi') {
        return !!data.upiId && data.upiId.includes('@');
      }
      return true;
    },
    {
      message: 'Please complete your payment details correctly',
      path: ['paymentMethod'],
    },
  );

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export const Checkout: React.FC = () => {
  const { cart, clearCart, subtotal, deliveryFee, tax, total } = useCart();
  const { addOrder } = useOrders();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'card',
    },
  });

  const selectedPayment = useWatch({ control, name: 'paymentMethod' });

  const onSubmit = async (data: CheckoutFormValues) => {
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Order submitted successfully:', data);

    addOrder({
      restaurantName: 'Foodie Restaurant',
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: parseFloat(item.price.replace(/[^0-9.-]+/g, '')) || 0,
        quantity: item.quantity,
      })),
      totalAmount: total,
    });
    clearCart();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl border border-gray-100 shadow-xl text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Order Confirmed!</h2>
        <p className="text-gray-500 text-sm mb-6">
          Thank you for your order. We've sent a confirmation email with your order tracking
          details.
        </p>
        <button
          onClick={() => (window.location.href = '/')}
          className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-lg transition"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-12 gap-8">
        {/* Left Column - Forms */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* Shipping Address Section */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">1. Delivery Address</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                placeholder="John Doe"
                required
                {...register('fullName')}
                error={errors.fullName?.message}
              />
              <Input
                label="Phone Number"
                placeholder="9876543210"
                required
                {...register('phone')}
                error={errors.phone?.message}
              />
              <div className="md:col-span-2">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                  required
                  {...register('email')}
                  error={errors.email?.message}
                />
              </div>
              <div className="md:col-span-2">
                <Input
                  label="Street Address"
                  placeholder="123 Main St, Apt 4B"
                  required
                  {...register('address')}
                  error={errors.address?.message}
                />
              </div>
              <Input
                label="City"
                placeholder="New York"
                required
                {...register('city')}
                error={errors.city?.message}
              />
              <Input
                label="ZIP Code"
                placeholder="10001"
                required
                {...register('zipCode')}
                error={errors.zipCode?.message}
              />
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">2. Payment Method</h2>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {([
                { id: 'card', name: 'Card', icon: CreditCard },
                { id: 'upi', name: 'UPI', icon: Smartphone },
                { id: 'cod', name: 'Cash', icon: Banknote },
              ] as const).map((method) => {
                const Icon = method.icon;
                const active = selectedPayment === method.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setValue('paymentMethod', method.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition ${
                      active
                        ? 'border-orange-500 bg-orange-50/50 text-orange-600'
                        : 'border-gray-100 hover:border-gray-200 text-gray-600'
                    }`}
                  >
                    <Icon className="w-6 h-6 mb-2" />
                    <span className="text-xs font-bold">{method.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Payment Fields */}
            {selectedPayment === 'card' && (
              <div className="grid md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="md:col-span-2">
                  <Input
                    label="Card Number"
                    placeholder="1234 5678 9101 1121"
                    maxLength={16}
                    {...register('cardNumber')}
                    error={errors.cardNumber?.message}
                  />
                </div>
                <Input
                  label="Expiry Date"
                  placeholder="MM/YY"
                  maxLength={5}
                  {...register('cardExpiry')}
                  error={errors.cardExpiry?.message}
                />
                <Input
                  label="CVC / CVV"
                  placeholder="123"
                  maxLength={4}
                  {...register('cardCvc')}
                  error={errors.cardCvc?.message}
                />
              </div>
            )}

            {selectedPayment === 'upi' && (
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <Input
                  label="UPI ID"
                  placeholder="username@upi"
                  {...register('upiId')}
                  error={errors.upiId?.message}
                />
              </div>
            )}

            {selectedPayment === 'cod' && (
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-amber-800 text-sm">
                Pay with cash upon delivery. Please keep exact change ready.
              </div>
            )}

            {errors.paymentMethod && (
              <p className="mt-2 text-xs text-red-500 font-medium">
                {errors.paymentMethod.message}
              </p>
            )}
          </div>
        </div>

        {/* Right Column - Summary */}
        <div className="lg:col-span-5">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

            <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto mb-4">
              {cart.length === 0 ? (
                <p className="py-4 text-sm text-gray-400 text-center">Your cart is empty.</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="py-3 flex justify-between items-center text-sm">
                    <div>
                      <span className="font-semibold text-gray-800">{item.name}</span>
                      <span className="text-gray-400 text-xs block">Qty: {item.quantity}</span>
                    </div>
                    <span className="font-bold text-gray-700">
                      $
                      {(parseFloat(item.price.replace(/[^0-9.-]+/g, '')) * item.quantity).toFixed(
                        2,
                      )}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="border-t pt-4 flex flex-col gap-2 text-sm text-gray-600 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-gray-900 border-t pt-2">
                <span>Total</span>
                <span className="text-orange-600">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Processing...</span>
              ) : (
                <>
                  <span>Place Order (${total.toFixed(2)})</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-4">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span>256-bit SSL Encrypted & Secure Checkout</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;

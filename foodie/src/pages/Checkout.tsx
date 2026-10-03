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
import { Link } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { useCart } from '../context/useCart';
import { useOrders } from '../context/useOrders';
import { useFeedback } from '../context/useFeedback';
import { formatOrderId } from '../types/order';
import type { Order } from '../types/order';
import { getErrorMessage } from '../services/orderService';

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
  const { showToast } = useFeedback();
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [submitError, setSubmitError] = useState('');

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
    setSubmitError('');
    try {
      const order = await addOrder({
        items: cart.map((item) => ({
          foodItemId: item.id,
          name: item.name,
          price: parseFloat(item.price.replace(/[^0-9.-]+/g, '')) || 0,
          quantity: item.quantity,
        })),
        totalAmount: Number(total.toFixed(2)),
        deliveryAddress: `${data.address}, ${data.city} ${data.zipCode}`,
      });
      clearCart();
      setPlacedOrder(order);
      showToast({
        title: 'Order placed successfully',
        description: `${formatOrderId(order.id)} is being sent to the restaurant.`,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setSubmitError(getErrorMessage(error, 'Could not place your order. Please try again.'));
    }
  };

  if (placedOrder) {
    return (
      <div className="mx-4 my-10 max-w-md rounded-3xl border border-stone-100 bg-white p-6 text-center shadow-xl sm:mx-auto sm:my-16 sm:p-8">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h2 className="mb-2 text-2xl font-extrabold text-stone-900">Order placed successfully!</h2>
        <p className="mb-6 text-sm text-stone-500">
          Thank you for your order. You can follow its progress on your Orders page.
        </p>

        <dl className="mb-6 divide-y divide-stone-100 rounded-2xl bg-stone-50 px-4 text-sm">
          <div className="flex justify-between py-3">
            <dt className="text-stone-500">Order number</dt>
            <dd className="font-semibold text-stone-900">{formatOrderId(placedOrder.id)}</dd>
          </div>
          <div className="flex justify-between py-3">
            <dt className="text-stone-500">Total paid</dt>
            <dd className="font-semibold text-stone-900">${placedOrder.totalAmount.toFixed(2)}</dd>
          </div>
        </dl>

        <div className="flex flex-col gap-3">
          <Link
            to="/orders"
            className="w-full rounded-xl bg-orange-600 py-3 font-semibold text-white shadow-lg transition hover:bg-orange-700"
          >
            Track my order
          </Link>
          <Link
            to="/"
            className="w-full rounded-xl border border-stone-200 py-3 font-semibold text-stone-700 transition hover:bg-stone-50"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-6 sm:mb-8">Checkout</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-12 gap-5 sm:gap-8">
        {/* Left Column - Forms */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* Shipping Address Section */}
          <div className="rounded-xl border border-stone-200/80 bg-white p-4 shadow-sm sm:p-6">
            <h2 className="text-xl font-bold text-stone-800 mb-4">1. Delivery Address</h2>
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
          <div className="rounded-xl border border-stone-200/80 bg-white p-4 shadow-sm sm:p-6">
            <h2 className="text-xl font-bold text-stone-800 mb-4">2. Payment Method</h2>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {(
                [
                  { id: 'card', name: 'Card', icon: CreditCard },
                  { id: 'upi', name: 'UPI', icon: Smartphone },
                  { id: 'cod', name: 'Cash', icon: Banknote },
                ] as const
              ).map((method) => {
                const Icon = method.icon;
                const active = selectedPayment === method.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setValue('paymentMethod', method.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition ${
                      active
                        ? 'border-orange-600 bg-orange-50/50 text-orange-600'
                        : 'border-stone-100 hover:border-stone-200 text-stone-600'
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
              <div className="grid md:grid-cols-2 gap-4 bg-stone-50 p-4 rounded-xl border border-stone-100">
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
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
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
          <div className="rounded-xl border border-stone-200/80 bg-white p-4 shadow-sm sm:p-6 lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-stone-800 mb-4">Order Summary</h2>

            <div className="divide-y divide-stone-100 max-h-64 overflow-y-auto mb-4">
              {cart.length === 0 ? (
                <p className="py-4 text-sm text-stone-400 text-center">Your cart is empty.</p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.cartKey}
                    className="py-3 flex justify-between items-center gap-3 text-sm"
                  >
                    <div className="min-w-0">
                      <span className="font-semibold text-stone-800">{item.name}</span>
                      <span className="text-stone-400 text-xs block">Qty: {item.quantity}</span>
                    </div>
                    <span className="shrink-0 font-bold text-stone-700">
                      $
                      {(parseFloat(item.price.replace(/[^0-9.-]+/g, '')) * item.quantity).toFixed(
                        2,
                      )}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="border-t pt-4 flex flex-col gap-2 text-sm text-stone-600 mb-6">
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
              <div className="flex justify-between text-base font-extrabold text-stone-900 border-t pt-2">
                <span>Total</span>
                <span className="text-orange-600">${total.toFixed(2)}</span>
              </div>
            </div>

            {submitError && (
              <p
                role="alert"
                className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl"
              >
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 disabled:bg-stone-300 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2"
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

            <div className="flex items-center justify-center gap-2 text-xs text-stone-400 mt-4">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>256-bit SSL Encrypted & Secure Checkout</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;

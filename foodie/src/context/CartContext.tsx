import React, { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { FoodItem } from '../types/foodie';
import { CartContext } from './cart-context';
import type { CartItem } from './cart-context';
import { useAuth } from './AuthContext';

const DELIVERY_FEE = 3.99;
const TAX_RATE = 0.08; // 8%

const getCartKey = (item: FoodItem) => `${item.id}:${item.name}`;

// Parse string price formatted as "$12.99" to number 12.99
const parsePrice = (priceStr: string): number => {
  return parseFloat(priceStr.replace(/[^0-9.-]+/g, '')) || 0;
};

const loadCart = (storageKey: string): CartItem[] => {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved ? (JSON.parse(saved) as CartItem[]) : [];
  } catch {
    return [];
  }
};

const CartStore: React.FC<{ storageKey: string; children: ReactNode }> = ({
  storageKey,
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => loadCart(storageKey));
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Keep the cart across page reloads
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(cart));
    } catch {
      // Storage unavailable (e.g. private mode) — the cart still works for this session
    }
  }, [storageKey, cart]);

  const addToCart = (item: FoodItem) => {
    const cartKey = getCartKey(item);
    setCart((prevCart) =>
      prevCart.some((cartItem) => cartItem.cartKey === cartKey)
        ? prevCart.map((cartItem) =>
            cartItem.cartKey === cartKey
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem,
          )
        : [...prevCart, { ...item, cartKey, quantity: 1 }],
    );
    setIsCartOpen(true);
  };

  const removeFromCart = (cartKey: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartKey !== cartKey));
  };

  const increaseQuantity = (cartKey: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartKey === cartKey ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (cartKey: string) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.cartKey === cartKey ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Cart Calculations
  const subtotal = cart.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);
  const deliveryFee = cart.length > 0 ? DELIVERY_FEE : 0;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + deliveryFee + tax;
  const totalItemsCount = cart.length;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        subtotal,
        deliveryFee,
        tax,
        total,
        totalItemsCount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Each user gets their own saved cart; remounting on user change swaps it in (and closes the drawer).
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const storageKey = `foodie_cart_${user?.id ?? 'guest'}`;

  return (
    <CartStore key={storageKey} storageKey={storageKey}>
      {children}
    </CartStore>
  );
};

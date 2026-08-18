import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export const CartDrawer: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    subtotal,
    deliveryFee,
    tax,
    total,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false); // Close the cart drawer
    navigate('/checkout'); // Redirect to checkout page
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-orange-500" />
              <h2 className="text-xl font-bold text-gray-800">Your Order</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg font-medium">Your cart is empty</p>
                <p className="text-sm mt-1">Add items from the menu to start ordering.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl border border-gray-100"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg shrink-0"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
                    <p className="text-orange-500 font-semibold text-xs mt-0.5">{item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="p-1 bg-white border rounded hover:bg-gray-100"
                      >
                        <Minus className="w-3 h-3 text-gray-600" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="p-1 bg-white border rounded hover:bg-gray-100"
                      >
                        <Plus className="w-3 h-3 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-600 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Pricing Summary Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t bg-gray-50 space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Estimated Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-gray-900 text-lg">
                <span>Total</span>
                <span className="text-orange-500">${total.toFixed(2)}</span>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition"
                >
                  Checkout (${total.toFixed(2)})
                </button>
                <button
                  onClick={clearCart}
                  className="w-full text-xs text-gray-500 hover:text-red-500 py-1 transition"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;

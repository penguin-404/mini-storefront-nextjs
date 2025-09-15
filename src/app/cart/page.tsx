'use client';

import { useCart } from '@/context/CartContext';
import { CartItemComponent } from '@/components/CartItem';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export default function CartPage() {
  const { cartItems, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <ShoppingCart size={64} className="text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty.</h2>
        <p className="text-gray-600 mb-4">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 mt-6">Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="divide-y divide-gray-200">
          {cartItems.map(item => (
            <CartItemComponent key={item.id} item={item} />
          ))}
        </div>
        <div className="mt-6 flex justify-between items-center font-bold text-lg">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <button className="mt-6 w-full py-3 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700 transition-colors">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
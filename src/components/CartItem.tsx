'use client';

import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product';

interface CartItemProps {
  item: Product & { quantity: number };
}

export const CartItemComponent = ({ item }: CartItemProps) => {
  const { removeFromCart, updateQuantity } = useCart();
  const subtotal = (item.price * item.quantity).toFixed(2);

  return (
    <div className="flex items-center justify-between py-4 border-b last:border-b-0">
      <div className="flex items-center gap-4">
        <Image src={item.image} alt={item.title} width={80} height={80} className="rounded-md" />
        <div>
          <h3 className="font-semibold text-lg">{item.title}</h3>
          <p className="text-gray-600">${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center border rounded-md">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="px-2 py-1 text-gray-600 hover:text-gray-800"
          >
            -
          </button>
          <span className="px-2">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="px-2 py-1 text-gray-600 hover:text-gray-800"
          >
            +
          </button>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-bold">${subtotal}</span>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 text-sm hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useFilters } from '@/context/FilterContext';
import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

export const Header = () => {
  const { totalItems } = useCart();
  const { search, setSearch } = useFilters();

  const [inputValue, setInputValue] = useState(search);

  const debouncedSearchTerm = useDebounce(inputValue, 500); 

  useEffect(() => {
    setSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearch]);


  return (
    <header className="shadow-md">
      <div className="container mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <Link href="/" className="text-2xl font-bold text-shadow-orange-800">
          Storify
        </Link>
        
        <div className="flex-1 max-w-lg w-full md:w-auto">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <nav>
          <Link href="/cart" className="relative text-gray-600 hover:text-gray-800 transition-colors">
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};
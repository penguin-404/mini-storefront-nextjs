'use client';

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface NavbarProps {
  categories: string[];
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  sort: "" | "low" | "high";
  setSort: (value: "" | "low" | "high") => void;
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
}

export default function Navbar({
  categories,
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
  priceRange,
  setPriceRange,
}: NavbarProps) {
  const { totalItems } = useCart();

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newMin = Math.max(0, Number(value));
    setPriceRange([newMin, priceRange[1]]);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newMax = Math.max(0, Number(value));
    setPriceRange([priceRange[0], newMax || Infinity]);
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          MyStore
        </Link>
        
        <div className="flex-1 flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-64 px-3 py-2 border rounded-md"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full md:w-40 px-3 py-2 border rounded-md"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="number"
              placeholder="Min"
              value={priceRange[0] === 0 ? "" : priceRange[0]}
              onChange={handleMinPriceChange}
              className="w-1/2 px-3 py-2 border rounded-md"
            />
            <input
              type="number"
              placeholder="Max"
              value={priceRange[1] === Infinity ? "" : priceRange[1]}
              onChange={handleMaxPriceChange}
              className="w-1/2 px-3 py-2 border rounded-md"
            />
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "" | "low" | "high")}
            className="w-full md:w-40 px-3 py-2 border rounded-md"
          >
            <option value="">Sort by Price</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>

        <div className="relative">
          <Link href="/cart">
            <ShoppingCart className="h-6 w-6 text-gray-700" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
'use client';

import { useFilters } from '@/context/FilterContext';

export default function Navbar() {
  const { categories, category, setCategory, sort, setSort, priceRange, setPriceRange } = useFilters();

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
    <nav className="bg-white shadow-md p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full md:w-62 px-3 py-2 border rounded-md"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.toUpperCase()}
          </option>
        ))}
      </select>
      
      <div className="flex gap-8 w-fit md:w-auto">
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
    </nav>
  );
}
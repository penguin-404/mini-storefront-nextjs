import { FiltersProps } from "@/types/FilterProps";

export default function Filters({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
}: FiltersProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="border px-3 py-2 rounded w-full md:w-1/3"
      />

      <div className="flex gap-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as "low" | "high" | "")}
          className="border px-3 py-2 rounded"
        >
          <option value="">Sort by Price</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>
      </div>
    </div>
  );
}

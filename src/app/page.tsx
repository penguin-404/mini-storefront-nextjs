'use client';

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import { Product } from "@/types/product";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import { useProductFilters } from "@/hooks/useProductFilters";

const ITEMS_PER_PAGE = 8;

export default function CataloguePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, Infinity]);
  const [sort, setSort] = useState<"" | "low" | "high">("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProducts();
        setProducts(data);
        const uniqueCategories = Array.from(new Set(data.map((p) => p.category)));
        setCategories(["All", ...uniqueCategories]);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filtered = useProductFilters(products, search, category, sort, priceRange);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <main className="p-6">
      <Navbar
        categories={categories}
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />

      {currentItems.length === 0 ? (
        <p className="text-center text-lg text-gray-500 mt-8">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {currentItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </main>
  );
}
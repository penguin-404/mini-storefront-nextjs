'use client';

import { useMemo, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import { useFilters } from "@/context/FilterContext";

const ITEMS_PER_PAGE = 8;

export default function CataloguePage() {
  const { products, categories, loading, category, setCategory, priceRange, setPriceRange, sort, setSort, search } = useFilters();
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    let current = [...products];

    if (search) {
      current = current.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (category && category !== "All") {
      current = current.filter((product) => product.category === category);
    }
    
    const [min, max] = priceRange;
    current = current.filter((product) => {
        const productPrice = product.price;
        return productPrice >= min && productPrice <= max;
    });

    if (sort === "low") {
      current.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      current.sort((a, b) => b.price - a.price);
    }
    return current;
  }, [products, search, category, sort, priceRange]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, priceRange, sort]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <main className="p-10">
      <Navbar
        categories={categories}
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
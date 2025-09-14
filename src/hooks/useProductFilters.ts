import { useMemo } from "react";
import { Product } from "@/types/product";

export const useProductFilters = (
  products: Product[],
  search: string,
  category: string,
  sort: "" | "low" | "high",
  priceRange: [number, number]
) => {
  return useMemo(() => {
    let filtered = [...products];

    // Filter by search query
    if (search) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by category
    if (category && category !== "All") {
      filtered = filtered.filter((product) => product.category === category);
    }
    
    // Filter by price range
    const [min, max] = priceRange;
    if (min > 0 || max < Infinity) {
      filtered = filtered.filter((product) => {
          const productPrice = product.price;
          return productPrice >= min && productPrice <= max;
      });
    }

    // Sort products
    if (sort === "low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, search, category, sort, priceRange]);
};
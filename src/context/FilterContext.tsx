'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { getProducts } from "@/lib/api";
import { Product } from "@/types/product";

type SortOptions = "" | "low" | "high";

interface FilterContextType {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  sort: SortOptions;
  setSort: (value: SortOptions) => void;
  products: Product[];
  categories: string[];
  loading: boolean;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, Infinity]);
  const [sort, setSort] = useState<SortOptions>("");

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

  return (
    <FilterContext.Provider value={{ 
      search, setSearch,
      category, setCategory,
      priceRange, setPriceRange,
      sort, setSort,
      products,
      categories,
      loading
    }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};
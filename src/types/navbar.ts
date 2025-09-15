export interface NavbarProps {
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
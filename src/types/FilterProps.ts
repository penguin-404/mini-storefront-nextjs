export type FiltersProps = {
  search: string;
  setSearch: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  sort: "" | "low" | "high";
  setSort: (val: "" | "low" | "high") => void;
};
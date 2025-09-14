import { Product } from "@/types/product";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://fakestoreapi.com/products');
  const data: Omit<Product, 'stock'>[] = await res.json();

  const productsWithStock: Product[] = data.map(product => {
    // Generate a random stock value from 0 to 20
    const stockCount = Math.floor(Math.random() * 21);
    
    return {
      ...product,
      stock: stockCount,
    };
  });

  return productsWithStock;
}
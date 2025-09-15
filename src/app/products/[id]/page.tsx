'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProducts } from "@/lib/api";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { notFound } from "next/navigation";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const all = await getProducts();
        const found = all.find((p) => p.id === Number(id));
        
        if (!found) {
          notFound();
        }
        setProduct(found);

        const relatedItems = all
          .filter((p) => p.category === found.category && p.id !== found.id)
          .slice(0, 4);
        setRelated(relatedItems);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!product) return <p className="p-6">Product not found.</p>;

  return (
    <main className="p-6">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="flex justify-center items-start">
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className="max-h-[400px] object-contain"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-700">{product.description}</p>
          <div className="flex items-center gap-6 mt-4">
            <span className="text-xl font-semibold text-green-800">
              ${product.price}
            </span>
            <span className="px-3 py-1 bg-gray-200 rounded text-sm">
              {product.category.toUpperCase()}
            </span>
          </div>

          <button
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={product.stock === 0}
            onClick={() => addToCart(product)}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
      {related.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
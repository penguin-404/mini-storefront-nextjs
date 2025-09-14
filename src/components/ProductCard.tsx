import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="block border border-gray-200 rounded-lg p-4 transition-shadow hover:shadow-lg">
      <div className="relative w-full h-48 mb-4">
        <Image src={product.image} alt={product.title} layout="fill" objectFit="cover" className="rounded-md" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
      <p className="text-gray-600">${product.price.toFixed(2)}</p>
      <span className="text-sm text-gray-500">{product.category}</span>
    </Link>
  );
}
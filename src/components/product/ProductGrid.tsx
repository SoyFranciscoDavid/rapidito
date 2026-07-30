import type { Product } from "@/types/product.types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export default function ProductGrid({
  products,
  emptyMessage = "No se encontraron productos",
}: ProductGridProps) {
  if (products.length === 0) {
    return <p className="text-center text-text-muted py-12">{emptyMessage}</p>;
  }

  return (
    <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 md:gap-8 mb-12">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

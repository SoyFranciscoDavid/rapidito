import ProductGrid from "@/components/product/ProductGrid";
import products from "@/app/api/products.json";
import type { Product } from "@/types/product.types";

export default async function CategoryPage({
  params: { name },
}: {
  params: { name: string };
}) {
  const typed = products as Product[];
  const filtered = typed.filter(
    (p) => p.category.toLowerCase() === name.toLowerCase(),
  );
  return <ProductGrid products={filtered} />;
}

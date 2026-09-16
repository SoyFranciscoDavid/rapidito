import ProductGrid from "@/components/product/ProductGrid";
import { getProductsByCategory } from "@/lib/products";

export default async function CategoryPage({
  params: { name },
}: {
  params: { name: string };
}) {
  const filtered = getProductsByCategory(name);
  return <ProductGrid products={filtered} />;
}

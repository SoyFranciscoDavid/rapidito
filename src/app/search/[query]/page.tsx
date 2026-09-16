import ProductGrid from "@/components/product/ProductGrid";
import { searchProducts } from "@/lib/products";

export default async function SearchPage({
  params: { query },
}: {
  params: { query: string };
}) {
  const filtered = searchProducts(query);

  return (
    <main className="container-app pt-24 pb-8">
      <h2 className="text-2xl font-semibold mb-8">
        Resultados para &quot;{query}&quot;
      </h2>
      <ProductGrid
        products={filtered}
        emptyMessage="No se encontraron coincidencias"
      />
    </main>
  );
}

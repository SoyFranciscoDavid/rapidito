import ProductGrid from "@/components/product/ProductGrid";
import products from "@/app/api/products.json";
import type { Product } from "@/types/product.types";

export default async function SearchPage({
  params: { query },
}: {
  params: { query: string };
}) {
  const typed = products as Product[];
  const search = query.toLowerCase();
  const filtered = typed.filter((p) => p.name.toLowerCase().includes(search));

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

import Hero from "@/components/hero/Hero";
import CategoryGrid from "@/components/product/CategoryGrid";
import ProductGrid from "@/components/product/ProductGrid";
import products from "@/app/api/products.json";
import type { Product } from "@/types/product.types";

export default async function Home() {
  const typed = products as Product[];
  const featured = typed.filter((p) => p.featured);
  const recommended = typed.filter((p) => p.recommended);

  return (
    <>
      <Hero />
      <main className="container-app pt-24 pb-8 overflow-x-hidden">
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">Categorías</h2>
          <CategoryGrid />
        </section>
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">Productos Destacados</h2>
          <ProductGrid products={featured} />
        </section>
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">
            Productos Recomendados
          </h2>
          <ProductGrid products={recommended} />
        </section>
      </main>
    </>
  );
}

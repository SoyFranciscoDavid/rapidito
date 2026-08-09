import ProductGrid from "@/components/product/ProductGrid";
import products from "@/app/api/products.json";
import type { Product } from "@/types/product.types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Productos | Rapidito",
  description:
    "Explora todos nuestros productos: hamburguesas, pizzas, empanadas, tacos y más. Comida rápida de calidad.",
};

export default async function ProductsPage() {
  const typed = products as Product[];
  return (
    <>
      {/* Hero interno */}
      <section className="bg-foreground pt-24 pb-16 md:pb-24 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="container-app relative z-10 text-center">
          <h1 className="font-display text-5xl md:text-7xl text-white font-bold">
            Productos
          </h1>
          <p className="text-secondary text-base md:text-lg mt-4 mx-auto">
            Descubre nuestra variedad de comidas rápidas, preparadas con
            ingredientes frescos y mucho sabor.
          </p>
        </div>
      </section>

      <main className="container-app py-12 md:py-16">
        <h2 className="text-2xl font-semibold mb-8">Todos los Productos</h2>
        <ProductGrid products={typed} />
      </main>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import products from "@/app/api/products.json";
import type { Product } from "@/types/product.types";
import Badge from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Ofertas | Rapidito - FastFood",
  description:
    "Aprovecha nuestras ofertas y promociones especiales en hamburguesas, pizzas, empanadas y más. ¡Los mejores precios en comida rápida!",
};

const PROMOS = [
  {
    title: "2x1 en Hamburguesas",
    desc: "Todos los martes y jueves. Compra una hamburguesa y llévate la segunda gratis.",
    bg: "from-red-900/80 to-foreground",
    img: "/assets/slider-1.png",
  },
  {
    title: "Combo Familiar",
    desc: "4 hamburguesas, 4 papas grandes y 4 bebidas por solo $2,500. ¡Ahorra $800!",
    bg: "from-amber-900/80 to-foreground",
    img: "/assets/slider-2.png",
  },
  {
    title: "Happy Hour",
    desc: "De 17:00 a 19:00 todos los días, 30% de descuento en todas las pizzas.",
    bg: "from-rose-900/80 to-foreground",
    img: "/assets/slider-3.png",
  },
];

export default function OfertasPage() {
  const typed = products as Product[];
  const ofertas = typed.filter((p) => p.featured || p.recommended);

  return (
    <>
      {/* Hero interno */}
      <section className="bg-foreground pt-24 pb-16 md:pb-24 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="container-app relative z-10 text-center">
          <Badge variant="featured" className="mb-4">
            🏷️ Promociones limitadas
          </Badge>
          <h1 className="font-display text-5xl md:text-7xl text-white font-bold">
            Ofertas
          </h1>
          <p className="text-secondary text-base md:text-lg mt-4  mx-auto">
            Descuentos imperdibles y combos especiales que solo encontrarás
            aquí. ¡Aprovecha antes de que se acaben!
          </p>
        </div>
      </section>

      <main className="container-app py-12 md:py-16">
        {/* Promos destacadas */}
        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8 text-center">
            Promociones Destacadas
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {PROMOS.map((promo) => (
              <div
                key={promo.title}
                className={`relative rounded-xl overflow-hidden bg-linear-to-br ${promo.bg} p-6 md:p-8 flex flex-col justify-between min-h-70 group`}
              >
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2">
                    {promo.title}
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed">
                    {promo.desc}
                  </p>
                </div>
                <div className="relative z-10 mt-4">
                  <Link
                    href="/products"
                    className="inline-block px-5 py-2 bg-primary text-white text-sm rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    Lo quiero
                  </Link>
                </div>
                {/* Imagen decorativa */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 md:w-40 md:h-40 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                  <Image
                    src={promo.img}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="160px"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Productos en oferta */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Productos con Descuento
            </h2>
            <p className="text-text-muted text-sm mt-2">
              Los favoritos de nuestros clientes ahora con precios especiales.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {ofertas.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group bg-surface border border-border rounded-xl overflow-hidden hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-square bg-muted">
                  <Image
                    src={product.image01}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.featured && (
                      <Badge variant="featured">Destacado</Badge>
                    )}
                    {product.recommended && (
                      <Badge variant="recommended">Recomendado</Badge>
                    )}
                  </div>
                  {/* Descuento simulado */}
                  <div className="absolute top-2 right-2 bg-destructive text-white text-[0.5rem] font-bold uppercase tracking-wide rounded-md px-2 py-0.5">
                    -15%
                  </div>
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="font-semibold text-foreground text-sm md:text-base truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm md:text-base font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-xs text-text-muted line-through">
                      {formatPrice(
                        product.price + Math.round(product.price * 0.15),
                      )}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section className="mt-20 bg-linear-to-r from-primary/10 via-background to-primary/10 rounded-xl p-8 md:p-12 text-center border border-border">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-text-muted mt-2  mx-auto">
            Revisa nuestro catálogo completo con todos los productos
            disponibles.
          </p>
          <Link
            href="/products"
            className="inline-block mt-6 px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Ver Catálogo Completo
          </Link>
        </section>
      </main>
    </>
  );
}

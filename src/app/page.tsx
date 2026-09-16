import Hero from "@/components/hero/Hero";
import CategoryGrid from "@/components/product/CategoryGrid";
import ProductGrid from "@/components/product/ProductGrid";
import ProductMarquee from "@/components/product/ProductMarquee";
import ServicesSection from "@/components/services/ServicesSection";
import Reveal from "@/components/animations/Reveal";
import { getFeaturedProducts, getRecommendedProducts } from "@/lib/products";
import bg1 from "@/assets/images/bg1.jpg";

export default async function Home() {
  const featured = getFeaturedProducts();
  const recommended = getRecommendedProducts();

  return (
    <>
      <div className="home-textured-sections">
        <div
          className="texture-layer"
          aria-hidden="true"
          style={{ backgroundImage: `url(${bg1.src})` }}
        />
        <div className="relative z-2">
          <Hero />
          <ProductMarquee />
          <section className="container-app pt-24 pb-8 overflow-x-hidden">
            <Reveal>
              <h2 className="mb-8 font-display text-4xl font-bold uppercase tracking-wide">
                Categorías
              </h2>
            </Reveal>
            <Reveal stagger>
              <CategoryGrid />
            </Reveal>
          </section>

          {/* Sección Servicios - bento con fondo negro a ancho completo */}
          <ServicesSection />
        </div>
      </div>
      {/* Grupo: Productos Destacados + Recomendados con textura de fondo */}
      <div className="home-textured-sections">
        <div
          className="texture-layer"
          aria-hidden="true"
          style={{ backgroundImage: `url(${bg1.src})` }}
        />
        <div className="relative z-2">
          {/* Sección Productos Destacados - ancho completo con fondo negro */}
          <section className="w-full ">
            <div className="container-app py-16">
              <Reveal>
                <h2 className="mb-8 font-display text-4xl font-bold uppercase tracking-wide ">
                  Productos Destacados
                </h2>
              </Reveal>
              <Reveal stagger>
                <ProductGrid products={featured} />
              </Reveal>
            </div>
          </section>

          {/* Sección Productos Recomendados */}
          <main className="container-app pt-24 pb-8 overflow-x-hidden">
            <section className="mb-16">
              <Reveal>
                <h2 className="mb-8 font-display text-4xl font-bold uppercase tracking-wide">
                  Productos Recomendados
                </h2>
              </Reveal>
              <Reveal stagger>
                <ProductGrid products={recommended} />
              </Reveal>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

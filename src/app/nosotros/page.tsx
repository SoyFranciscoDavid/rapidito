import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nosotros | Rapidito - FastFood",
  description:
    "Conoce nuestra historia, misión y valores. Rapidito nació para ofrecer la mejor comida rápida con ingredientes de calidad.",
};

const VALUES = [
  {
    title: "Calidad",
    desc: "Seleccionamos los mejores ingredientes para cada uno de nuestros platos. La frescura es nuestra prioridad.",
    icon: "🥩",
  },
  {
    title: "Rapidez",
    desc: "Sabemos que tu tiempo es valioso. Por eso servimos cada pedido en tiempo récord sin sacrificar sabor.",
    icon: "⚡",
  },
  {
    title: "Pasión",
    desc: "Amamos lo que hacemos. Cada receta está hecha con dedicación para brindarte una experiencia única.",
    icon: "❤️",
  },
  {
    title: "Confianza",
    desc: "Más de 10 años sirviendo a nuestra comunidad nos respaldan. Tu satisfacción es nuestra mejor recompensa.",
    icon: "🤝",
  },
];

const TEAM = [
  {
    name: "Carlos Méndez",
    role: "Chef Ejecutivo",
    img: "https://images.unsplash.com/photo-1550954529-74e0f10efb0a?w=384&h=384&fit=crop&crop=face",
  },
  {
    name: "Ana Lucía Ríos",
    role: "Gerente General",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=384&h=384&fit=crop&crop=face",
  },
  {
    name: "Pedro Castillo",
    role: "Maestro Pizzero",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=384&h=384&fit=crop&crop=face",
  },
];

export default function NosotrosPage() {
  return (
    <>
      {/* Hero interno */}
      <section className="bg-foreground pt-24 pb-16 md:pb-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="container-app relative z-10 text-center">
          <h1 className="font-display text-5xl md:text-7xl text-white font-bold">
            Nosotros
          </h1>
          <p className="text-secondary text-base md:text-lg mt-4  mx-auto">
            Descubre la historia detrás de Rapidito y por qué somos tu mejor
            opción en comida rápida.
          </p>
        </div>
      </section>

      <main className="container-app py-12 md:py-16">
        {/* Historia */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-muted">
            <Image
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop"
              alt="Nuestro local"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              Nuestra Historia
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 text-foreground">
              Más de 10 años sirviendo con pasión
            </h2>
            <p className="text-text-muted mt-6 leading-relaxed">
              Rapidito nació en 2014 como un pequeño emprendimiento familiar en
              el corazón de la ciudad. Con una receta secreta de hamburguesas y
              un sueño enorme, comenzamos a ganar el paladar de nuestros
              vecinos.
            </p>
            <p className="text-text-muted mt-4 leading-relaxed">
              Hoy, somos una de las cadenas de comida rápida más queridas del
              país, con más de 15 locales y cientos de colaboradores que
              comparten nuestra pasión por la buena comida. Cada plato que
              servimos lleva el mismo cariño artesanal de nuestros inicios.
            </p>
          </div>
        </section>

        {/* Valores */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              Filosofía
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 text-foreground">
              Nuestros Valores
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="bg-surface border border-border rounded-xl p-6 text-center hover:shadow-medium transition-shadow duration-300"
              >
                <span className="text-4xl block mb-4">{v.icon}</span>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Equipo */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              Equipo
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 text-foreground">
              Conoce a nuestro equipo
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8  mx-auto">
            {TEAM.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden bg-muted mb-4 ring-2 ring-border group-hover:ring-primary transition-all duration-300">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="192px"
                  />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {member.name}
                </h3>
                <p className="text-sm text-text-muted">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-foreground rounded-xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
              ¿Listo para probar lo mejor?
            </h2>
            <p className="text-secondary mt-4  mx-auto">
              Ven a visitarnos o haz tu pedido en línea. Te esperamos con los
              brazos abiertos.
            </p>
            <div className="flex gap-4 justify-center mt-8">
              <Link
                href="/products"
                className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Ver Menú
              </Link>
              <Link
                href="/contacto"
                className="inline-block px-8 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20"
              >
                Contáctanos
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { BiMap, BiPhone, BiEnvelope, BiTime } from "react-icons/bi";

export const metadata: Metadata = {
  title: "Contacto | Rapidito - FastFood",
  description:
    "Ponte en contacto con nosotros. Estamos ubicados en Willowbrook, CA. Llámanos, escríbenos o visítanos.",
};

const CONTACT_INFO = [
  {
    icon: BiMap,
    title: "Dirección",
    content: "3252 Winding Way, Central Plaza\nWillowbrook, CA 90210",
    href: "https://maps.google.com",
  },
  {
    icon: BiPhone,
    title: "Teléfono",
    content: "+1 234 567 890",
    href: "tel:+1234567890",
  },
  {
    icon: BiEnvelope,
    title: "Email",
    content: "hello@rapidito.com",
    href: "mailto:hello@rapidito.com",
  },
  {
    icon: BiTime,
    title: "Horarios",
    content: "Lun - Sáb: 10:00 - 22:00\nDom: 11:00 - 20:00",
    href: null,
  },
];

export default function ContactoPage() {
  return (
    <>
      {/* Hero interno */}
      <section className="bg-foreground pt-24 pb-16 md:pb-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="container-app relative z-10 text-center">
          <h1 className="font-display text-5xl md:text-7xl text-white font-bold">
            Contacto
          </h1>
          <p className="text-secondary text-base md:text-lg mt-4  mx-auto">
            Estamos aquí para ayudarte. No dudes en escribirnos o visitarnos.
          </p>
        </div>
      </section>

      <main className="container-app py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Formulario */}
          <section>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
              Envíanos un mensaje
            </h2>
            <p className="text-text-muted text-sm mb-8">
              Completa el formulario y te responderemos a la brevedad.
            </p>

            <form className="flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Asunto *
                </label>
                <input
                  type="text"
                  id="subject"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm"
                  placeholder="¿Sobre qué deseas consultar?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm resize-y"
                  placeholder="Escribe tu mensaje aquí..."
                />
              </div>

              <button
                type="submit"
                className="self-start px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity cursor-pointer"
              >
                Enviar mensaje
              </button>
            </form>
          </section>

          {/* Información de contacto */}
          <section>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
              Información de contacto
            </h2>
            <p className="text-text-muted text-sm mb-8">
              También puedes contactarnos por estos medios.
            </p>

            <div className="flex flex-col gap-6">
              {CONTACT_INFO.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex gap-4 items-start group">
                    <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon className="text-primary text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">
                        {item.title}
                      </h3>
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="text-text-muted text-sm hover:text-primary transition-colors whitespace-pre-line"
                        >
                          {item.content}
                        </Link>
                      ) : (
                        <p className="text-text-muted text-sm whitespace-pre-line">
                          {item.content}
                        </p>
                      )}
                    </div>
                  </div>
                );
                return <div key={item.title}>{content}</div>;
              })}
            </div>

            {/* Mapa estático simulado */}
            <div className="mt-8 rounded-xl overflow-hidden bg-muted aspect-video relative border border-border">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <BiMap className="text-4xl text-primary mx-auto mb-2" />
                  <p className="text-sm text-text-muted font-medium">
                    Willowbrook, California
                  </p>
                  <p className="text-xs text-text-muted mt-1">
                    3252 Winding Way, Central Plaza
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Redes Sociales */}
        <section className="mt-20 text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">
            Síguenos en redes
          </h2>
          <p className="text-text-muted text-sm mb-6">
            Mantente al tanto de nuestras promociones y novedades.
          </p>
          <div className="flex justify-center gap-4">
            {[
              { label: "Facebook", href: "#" },
              { label: "Instagram", href: "#" },
              { label: "YouTube", href: "#" },
              { label: "Pinterest", href: "#" },
            ].map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="px-6 py-2.5 bg-surface border border-border rounded-lg text-sm font-medium text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
              >
                {social.label}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

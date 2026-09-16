"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import service1 from "@/assets/images/service-1.png";
import service2 from "@/assets/images/service-2.png";
import service3 from "@/assets/images/service-3.png";
import service4 from "@/assets/images/service-4.png";

gsap.registerPlugin(ScrollTrigger);

interface Service {
  number: string;
  title: string;
  description: string;
  image: StaticImageData;
  alt: string;
  size: "featured" | "square" | "wide";
}

const SERVICES: Service[] = [
  {
    number: "01",
    title: "Calidad",
    description:
      "Ingredientes frescos y seleccionados para que cada bocado sea una experiencia.",
    image: service1,
    alt: "Icono de calidad",
    size: "featured",
  },
  {
    number: "02",
    title: "Variedad",
    description:
      "Sandwichs, pizzas, empanadas y tacos. Siempre algo nuevo para probar.",
    image: service2,
    alt: "Icono de variedad",
    size: "square",
  },
  {
    number: "03",
    title: "Delivery",
    description: "Llegamos a tu puerta rápido y con el pedido caliente.",
    image: service3,
    alt: "Icono de delivery",
    size: "square",
  },
  {
    number: "04",
    title: "Precios",
    description: "Precios accesibles sin sacrificar el sabor.",
    image: service4,
    alt: "Icono de precios",
    size: "wide",
  },
];

const SIZE_CLASSES: Record<Service["size"], string> = {
  featured: "services-bento__card--featured lg:col-span-2 lg:row-span-2",
  square: "services-bento__card--square",
  wide: "services-bento__card--wide lg:col-span-2",
};

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (
      !section ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const cards = gsap.utils.toArray<HTMLElement>(".services-bento__card");

    const context = gsap.context(() => {
      // Ocultar las tarjetas al inicio para el reveal al hacer scroll
      gsap.set(cards, { autoAlpha: 0, y: 48 });

      // Reveal escalonado cuando las tarjetas entran al viewport
      ScrollTrigger.batch(cards, {
        start: "top 85%",
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
            overwrite: true,
          }),
      });
    }, section);

    // Hover: elevar la tarjeta con GSAP (evita conflicto con el transform
    // inline que deja la animación de reveal)
    const hoverHandlers = cards.map((card) => {
      const enter = () =>
        gsap.to(card, { y: -6, duration: 0.3, ease: "power2.out" });
      const leave = () =>
        gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
      card.addEventListener("mouseenter", enter);
      card.addEventListener("mouseleave", leave);
      return { card, enter, leave };
    });

    return () => {
      context.revert();
      hoverHandlers.forEach(({ card, enter, leave }) => {
        card.removeEventListener("mouseenter", enter);
        card.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-black"
      aria-labelledby="services-title"
    >
      <div className="container-app py-20 md:py-24">
        {/* Encabezado de la sección */}
        <div className="mb-12 md:mb-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            Nuestros servicios
          </p>
          <h2
            id="services-title"
            className="font-display text-4xl font-bold uppercase tracking-wide text-white md:text-5xl"
          >
            Servicios
          </h2>
          <p className="mt-4 max-w-full text-sm text-white/60 md:text-base">
            Calidad, variedad, delivery y precios pensados para que disfrutes
            sin moverte de casa.
          </p>
        </div>

        {/* Grid bento */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(190px,auto)]">
          {SERVICES.map((service) => {
            const isWide = service.size === "wide";
            return (
              <article
                key={service.number}
                className={`services-bento__card ${SIZE_CLASSES[service.size]}`}
              >
                <span className="services-bento__number" aria-hidden="true">
                  {service.number}
                </span>
                <div className="services-bento__glow" aria-hidden="true" />

                <div
                  className={`relative z-1 flex h-full ${
                    isWide
                      ? "flex-col lg:flex-row lg:items-center lg:gap-8"
                      : "flex-col"
                  }`}
                >
                  <div
                    className={`services-bento__image-wrap ${
                      isWide ? "lg:flex-1" : ""
                    }`}
                  >
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="services-bento__image"
                    />
                  </div>

                  <div
                    className={`services-bento__body ${
                      isWide ? "lg:flex-1" : ""
                    }`}
                  >
                    <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {service.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

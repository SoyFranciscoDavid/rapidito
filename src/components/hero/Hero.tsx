"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
  img: string;
  price: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    title: "Sandwicht",
    subtitle: "6 variedades",
    desc: "Carne angus, panceta crocante, cheddar y nuestra salsa especial en pan artesanal.",
    img: "/assets/slider-1.png",
    price: "$700",
  },
  {
    id: 2,
    title: "Pizzas",
    subtitle: "8 variedades",
    desc: "Masa madre 48 hs, mozzarella di bufala y los mejores ingredientes italianos.",
    img: "/assets/slider-2.png",
    price: "$800",
  },
  {
    id: 3,
    title: "Empanadas",
    subtitle: "5 variedades",
    desc: "Tapas artesanales horneadas a la parrilla, rellenos tradicionales y gourmet.",
    img: "/assets/slider-3.png",
    price: "$750",
  },
  {
    id: 4,
    title: "Tacos",
    subtitle: "4 variedades",
    desc: "Tortilla de maíz azul, pastor, birria y opciones vegetarianas con guacamole.",
    img: "/assets/slider-4.png",
    price: "$850",
  },
];

export default function Hero() {
  const [rotation, setRotation] = useState(0);
  const [baseOffset, setBaseOffset] = useState(280);
  const total = slides.length;
  const activeIndex = (((rotation / 90) % total) + total) % total;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setBaseOffset(mq.matches ? 60 : 280);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const CROSS_POSITIONS = [
    { x: -baseOffset, y: 0 },
    { x: 0, y: baseOffset },
    { x: baseOffset, y: 0 },
    { x: 0, y: -baseOffset },
  ];

  const handleNext = () => setRotation((r) => r + 90);
  const handlePrev = () => setRotation((r) => r - 90);

  return (
    <section className="relative w-full h-dvh overflow-hidden bg-foreground">
      {/* Background glow */}
      <div className="absolute  left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />

      {/*
        ─── LAYOUT ───
        Mobile: texto arriba (h-[55%]), slider abajo (h-[45%])
        Desktop: texto izquierda (md:w-1/2), slider derecha (md:w-1/2)
      */}
      <div className="relative h-full flex flex-col md:flex-row">
        {/* ═══════ LADO IZQUIERDO: Texto con efecto Reveal ═══════ */}
        <div className="relative w-full md:w-1/2 h-[40%] md:h-full overflow-hidden">
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className={`absolute inset-0 flex flex-col items-center justify-end px-6 md:px-16 pb-0 transition-all duration-500 ease-out md:justify-center md:items-start ${
                i === activeIndex
                  ? "opacity-100 visible z-10"
                  : "opacity-0 invisible z-0"
              }`}
            >
              {/* Subtítulo */}
              <div className="overflow-hidden">
                <div
                  className={`transition-all duration-700 ease-out delay-100 ${
                    i === activeIndex ? "translate-y-0" : "translate-y-full"
                  }`}
                >
                  <span className="text-secondary font-semibold text-xs md:text-base uppercase tracking-widest">
                    {slide.subtitle}
                  </span>
                </div>
              </div>

              {/* Título */}
              <div className="overflow-hidden mt-1 md:mt-2">
                <div
                  className={`transition-all duration-700 ease-out delay-200 ${
                    i === activeIndex ? "translate-y-0" : "translate-y-full"
                  }`}
                >
                  <h2 className="font-display text-4xl md:text-8xl text-white font-bold leading-none">
                    {slide.title}
                  </h2>
                </div>
              </div>

              {/* Descripción */}
              <div className="overflow-hidden mt-0.75 md:mt-6">
                <div
                  className={`transition-all duration-700 ease-out delay-300 ${
                    i === activeIndex ? "translate-y-0" : "translate-y-full"
                  }`}
                >
                  <p className="text-xs text-center text-secondary leading-relaxed max-w-[35ch] md:text-lg md:text-left">
                    {slide.desc}
                  </p>
                </div>
              </div>

              {/* Botón + Precio */}
              <div className="overflow-hidden mt-1 md:mt-10">
                <div
                  className={`transition-all duration-700 ease-out delay-400 ${
                    i === activeIndex ? "translate-y-0" : "translate-y-full"
                  }`}
                >
                  <div className="mt-1">
                    <button className="px-5 md:px-8 py-2.5 md:py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity cursor-pointer text-sm md:text-base">
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ═══════ LADO DERECHO: Slider Orbital ═══════ */}
        <div className="relative w-full md:w-1/2 h-[55%] md:h-full flex items-center justify-center overflow-hidden">
          {/* Desplazamiento para centrar slide activo (izquierda del orbita) */}
          <div className="max-md:translate-x-0 md:translate-x-[200px] transition-transform duration-700 ease-out">
            {/* Contenedor orbital — rota */}
            <div
              className="relative w-[920px] h-[920px] max-md:w-[400px] max-md:h-[400px]"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: "transform 0.7s cubic-bezier(0.65, 0, 0.35, 1)",
              }}
            >
              {slides.map((slide, i) => {
                const isActive = i === activeIndex;
                const offset = CROSS_POSITIONS[i];
                const isMobileMode = baseOffset < 100;

                // En mobile: solo el slide activo es visible, centrado y grande
                // En desktop: orbital con todos los slides visibles en cruz
                const pos = isMobileMode ? { x: 0, y: 0 } : offset;
                const visual = isActive
                  ? {
                      scale: isMobileMode ? 1.2 : 1,
                      opacity: 1,
                      z: 20,
                    }
                  : {
                      scale: isMobileMode
                        ? 0.5
                        : i === 1 || i === 3
                          ? 0.55
                          : 0.35,
                      opacity: isMobileMode
                        ? 0
                        : i === 1 || i === 3
                          ? 0.35
                          : 0.4,
                      z: isMobileMode ? 0 : i === 1 || i === 3 ? 10 : 5,
                    };
                const counterRotation = -rotation;

                return (
                  <div
                    key={slide.id}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px) rotate(${counterRotation}deg) scale(${visual.scale})`,
                      opacity: visual.opacity,
                      zIndex: visual.z,
                      transition:
                        "transform 0.7s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.7s ease-out",
                    }}
                  >
                    <div
                      className={`overflow-hidden rounded-full transition-shadow duration-700 ease-out ${
                        visual.scale === 1
                          ? "shadow-2xl shadow-primary/30 ring-2 ring-white/20"
                          : "ring-1 ring-white/10"
                      }`}
                    >
                      <Image
                        src={slide.img}
                        alt={slide.title}
                        width={380}
                        height={380}
                        className="w-[240px] h-[240px] md:w-[380px] md:h-[380px] object-cover"
                        priority={isActive}
                        loading={isActive ? undefined : "lazy"}
                      />
                    </div>

                    {/* Etiqueta precio solo activo */}
                    {isActive && (
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex  flex-col items-baseline justify-start px-4 bg-white/95 backdrop-blur-sm text-primary shadow-clay-lg border-clay-lg  md:px-8 py-2 md:py-3 rounded-xl md:-bottom-6  md:rounded-2xl whitespace-nowrap z-30 gap-1.5 md:gap-2.5 select-none">
                        <span className="text-primary/50 text-[10px] md:text-sm font-semibold tracking-[0.12em] md:tracking-[0.15em] uppercase leading-none">
                          Desde
                        </span>
                        <span className="text-primary text-xl pl-3 md:text-4xl font-black tracking-tight leading-none">
                          {slide.price}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ Controles de navegación ═══════ */}
      <button
        onClick={handlePrev}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-9 h-9 md:w-12 md:h-12 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white text-xl md:text-3xl z-30 transition-all cursor-pointer"
        aria-label="Anterior"
      >
        <BiChevronLeft />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-9 h-9 md:w-12 md:h-12 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white text-xl md:text-3xl z-30 transition-all cursor-pointer"
        aria-label="Siguiente"
      >
        <BiChevronRight />
      </button>
    </section>
  );
}

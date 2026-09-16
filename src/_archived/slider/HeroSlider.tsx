"use client";

import { useState, useEffect } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import slider1 from "@/assets/images/slider-1.png";
import slider2 from "@/assets/images/slider-2.png";
import slider3 from "@/assets/images/slider-3.png";
import slider4 from "@/assets/images/slider-4.png";

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
  img: StaticImageData;
  href: string;
  price: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    title: "Sandwicht",
    subtitle: "6 variedades",
    desc: "Carne angus, panceta crocante, cheddar y nuestra salsa especial en pan artesanal.",
    img: slider1,
    href: "/category/Sandwichs",
    price: "$700",
  },
  {
    id: 2,
    title: "Pizzas",
    subtitle: "8 variedades",
    desc: "Masa madre 48 hs, mozzarella di bufala y los mejores ingredientes italianos.",
    img: slider2,
    href: "/category/Pizzas",
    price: "$800",
  },
  {
    id: 3,
    title: "Empanadas",
    subtitle: "5 variedades",
    desc: "Tapas artesanales horneadas a la parrilla, rellenos tradicionales y gourmet.",
    img: slider3,
    href: "/category/Empanadas",
    price: "$750",
  },
  {
    id: 4,
    title: "Tacos",
    subtitle: "4 variedades",
    desc: "Tortilla de maíz azul, pastor, birria y opciones vegetarianas con guacamole.",
    img: slider4,
    href: "/category/Tacos",
    price: "$850",
  },
];

export default function HeroSlider() {
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
    <section className="relative h-dvh w-full overflow-hidden bg-foreground">
      <div className="absolute left-1/3 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[150px]" />
      <div className="relative flex h-full flex-col md:flex-row">
        <div className="relative h-[40%] w-full overflow-hidden md:h-full md:w-1/2">
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className={`absolute inset-0 flex flex-col items-center justify-end px-6 pb-0 transition-all duration-500 ease-out md:items-start md:justify-center md:px-16 ${i === activeIndex ? "visible z-10 opacity-100" : "invisible z-0 opacity-0"}`}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-secondary md:text-base">
                {slide.subtitle}
              </span>
              <h2 className="mt-1 font-display text-4xl font-bold leading-none text-white md:mt-2 md:text-8xl">
                {slide.title}
              </h2>
              <p className="mt-0.75 max-w-[35ch] text-center text-xs leading-relaxed text-secondary md:mt-6 md:text-left md:text-lg">
                {slide.desc}
              </p>
              <Link
                href={slide.href}
                className="mt-4 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 md:mt-10 md:px-8 md:py-3 md:text-base"
              >
                Ver más
              </Link>
            </div>
          ))}
        </div>
        <div className="relative flex h-[55%] w-full items-center justify-center overflow-hidden md:h-full md:w-1/2">
          <div className="max-md:translate-x-0 md:translate-x-50">
            <div
              className="relative h-100 w-100 md:h-230 md:w-230"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: "transform 0.7s cubic-bezier(0.65, 0, 0.35, 1)",
              }}
            >
              {slides.map((slide, i) => {
                const isActive = i === activeIndex;
                const offset = CROSS_POSITIONS[i];
                const isMobileMode = baseOffset < 100;
                const pos = isMobileMode ? { x: 0, y: 0 } : offset;
                const visual = isActive
                  ? { scale: isMobileMode ? 1.2 : 1, opacity: 1, z: 20 }
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
                return (
                  <div
                    key={slide.id}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px) rotate(${-rotation}deg) scale(${visual.scale})`,
                      opacity: visual.opacity,
                      zIndex: visual.z,
                      transition:
                        "transform 0.7s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.7s ease-out",
                    }}
                  >
                    <div
                      className={`overflow-hidden rounded-full ${visual.scale === 1 ? "shadow-2xl shadow-primary/30 ring-2 ring-white/20" : "ring-1 ring-white/10"}`}
                    >
                      <Image
                        src={slide.img}
                        alt={slide.title}
                        width={380}
                        height={380}
                        className="h-60 w-60 object-cover md:h-95 md:w-95"
                        priority={isActive}
                        loading={isActive ? undefined : "lazy"}
                      />
                    </div>
                    {isActive && (
                      <div className="absolute -bottom-4 left-1/2 z-30 flex -translate-x-1/2 select-none flex-col items-baseline gap-1.5 whitespace-nowrap rounded-xl border-clay-lg bg-white/95 px-4 py-2 text-primary shadow-clay-lg backdrop-blur-sm md:-bottom-6 md:gap-2.5 md:rounded-2xl md:px-8 md:py-3">
                        <span className="text-[10px] font-semibold uppercase leading-none tracking-[0.12em] text-primary/50 md:text-sm md:tracking-[0.15em]">
                          Desde
                        </span>
                        <span className="pl-3 text-xl font-black leading-none tracking-tight text-primary md:text-4xl">
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
      <button
        type="button"
        onClick={handlePrev}
        className="absolute left-2 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-xl text-white transition-all hover:bg-black/50 md:left-4 md:h-12 md:w-12 md:text-3xl"
        aria-label="Anterior"
      >
        <BiChevronLeft />
      </button>
      <button
        type="button"
        onClick={handleNext}
        className="absolute right-2 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-xl text-white transition-all hover:bg-black/50 md:right-4 md:h-12 md:w-12 md:text-3xl"
        aria-label="Siguiente"
      >
        <BiChevronRight />
      </button>
    </section>
  );
}

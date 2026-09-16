"use client";

import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import type { Category } from "@/types/product.types";

interface CategoryCardProps {
  category: Category;
}

const watermarkRows = Array.from({ length: 3 }, (_, index) => index);
const watermarkCopies = Array.from({ length: 4 }, (_, index) => index);

export default function CategoryCard({ category }: CategoryCardProps) {
  const watermarkRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (!watermarkRef.current) return;

    const context = gsap.context(() => {
      gsap.set(watermarkRef.current, { autoAlpha: 0 });
      gsap.set(rowRefs.current, { xPercent: 0 });
    }, watermarkRef);

    return () => context.revert();
  }, []);

  const showWatermark = () => {
    if (!watermarkRef.current) return;

    // Cancelar animaciones en curso para evitar conflictos al entrar/salir rápido
    gsap.killTweensOf(watermarkRef.current);
    gsap.killTweensOf(rowRefs.current);

    gsap.to(watermarkRef.current, {
      autoAlpha: 1,
      duration: 0.35,
      ease: "power2.out",
    });
    gsap.to(rowRefs.current, {
      xPercent: (index) => (index % 2 === 0 ? -8 : 8),
      duration: 0.75,
      ease: "power3.out",
      stagger: 0.06,
    });
  };

  const hideWatermark = () => {
    if (!watermarkRef.current) return;

    // Cancelar animaciones en curso para evitar conflictos al entrar/salir rápido
    gsap.killTweensOf(watermarkRef.current);
    gsap.killTweensOf(rowRefs.current);

    gsap.to(watermarkRef.current, {
      autoAlpha: 0,
      duration: 0.25,
      ease: "power2.in",
    });
    gsap.to(rowRefs.current, {
      xPercent: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <Link
      href={`/category/${category.name.toLowerCase()}`}
      className="group relative flex min-h-[340px] flex-col overflow-hidden rounded-lg border border-border bg-surface text-foreground shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-medium focus-visible:-translate-y-1"
      onMouseEnter={showWatermark}
      onMouseLeave={hideWatermark}
      onFocus={showWatermark}
      onBlur={hideWatermark}
    >
      <div
        ref={watermarkRef}
        className="category-card__watermark"
        aria-hidden="true"
      >
        {watermarkRows.map((row) => (
          <div
            key={row}
            ref={(element) => {
              rowRefs.current[row] = element;
            }}
            className={`category-card__watermark-row category-card__watermark-row--${row + 1}`}
          >
            {watermarkCopies.map((copy) => (
              <span className="category-card__watermark-word" key={copy}>
                {category.name.toUpperCase()}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="relative z-2 flex items-center justify-center gap-3 px-6 py-5">
        <div className="relative h-10 w-10 shrink-0">
          <Image
            src={category.img}
            alt={category.name}
            fill
            sizes="40px"
            className="object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <h2 className="text-center text-2xl font-semibold">{category.name}</h2>
      </div>
      <div className="relative z-1 min-h-[210px] shrink-0 overflow-hidden">
        <Image
          src={category.backgroundImage}
          alt={`Imagen de ${category.name}`}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-contain p-8 origin-bottom transition-transform duration-500 group-hover:scale-110"
        />
      </div>
    </Link>
  );
}

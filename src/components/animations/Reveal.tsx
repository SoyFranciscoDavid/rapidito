"use client";

import {
  useLayoutEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface RevealProps {
  children: ReactNode;
  /** Etiqueta del elemento contenedor. Por defecto "div". */
  as?: ElementType;
  className?: string;
  /** Desplazamiento vertical inicial (px). Por defecto 40. */
  y?: number;
  /** Si es true, anima los hijos directos con stagger. */
  stagger?: boolean;
  /** Retraso inicial (s). */
  delay?: number;
  /** Punto de inicio del trigger. Por defecto "top 85%". */
  start?: string;
}

/**
 * Wrapper reutilizable que aplica un reveal "fade-up" al entrar al viewport
 * usando GSAP ScrollTrigger. Respeta prefers-reduced-motion.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className,
  y = 40,
  stagger = false,
  delay = 0,
  start = "top 85%",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Si stagger, animar los ítems. Si el wrapper tiene un único hijo que es
    // un contenedor (ej: un grid), animar los hijos de ese contenedor para
    // lograr el stagger por tarjeta. Si no, animar los hijos directos.
    let targets: HTMLElement[];
    if (stagger) {
      const children = Array.from(el.children) as HTMLElement[];
      const singleContainer =
        children.length === 1 && children[0].children.length > 0;
      targets = singleContainer
        ? (Array.from(children[0].children) as HTMLElement[])
        : children;
    } else {
      targets = [el];
    }

    const context = gsap.context(() => {
      gsap.set(targets, { autoAlpha: 0, y });

      ScrollTrigger.batch(targets, {
        start,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: stagger ? 0.12 : 0,
            delay,
            overwrite: true,
          }),
      });
    }, el);

    return () => context.revert();
  }, [y, stagger, delay, start]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

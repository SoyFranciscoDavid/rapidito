"use client";

import {
  useLayoutEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";
import { gsap } from "@/lib/gsap";

interface ParallaxProps {
  children: ReactNode;
  /** Etiqueta del elemento contenedor. Por defecto "div". */
  as?: ElementType;
  className?: string;
  /** Velocidad del parallax (0 = fijo, mayor = más movimiento). Por defecto 0.2. */
  speed?: number;
}

/**
 * Wrapper reutilizable que aplica un efecto parallax vertical con scrub
 * según el scroll. Respeta prefers-reduced-motion.
 */
export default function Parallax({
  children,
  as: Tag = "div",
  className,
  speed = 0.2,
}: ParallaxProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -speed * 100 },
        {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, el);

    return () => context.revert();
  }, [speed]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

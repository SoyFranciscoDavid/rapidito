"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import bg from "../../assets/images/bg.2.avif";

const marqueeItems = Array.from({ length: 4 }, (_, index) => index);
const MARQUEE_DURATION = 70;

export default function ProductMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (
      !track ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const context = gsap.context(() => {
      gsap.to(track, {
        xPercent: -50,
        duration: MARQUEE_DURATION,
        ease: "none",
        repeat: -1,
      });
    }, track);

    return () => context.revert();
  }, []);

  return (
    <Link
      href="/products"
      className="product-marquee relative"
      aria-labelledby="product-marquee-title"
    >
      <Image
        src={bg}
        alt="imagen background"
        className="absolute mix-blend-plus-lighter w-full h-full object-cover"
      />
      <h2 id="product-marquee-title" className="sr-only">
        Ver todos nuestros productos
      </h2>
      <div className="product-marquee__window relative z-1">
        <div ref={trackRef} className="product-marquee__track">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <div
              className="product-marquee__content"
              key={`${item}-${index}`}
              aria-hidden={index >= marqueeItems.length}
              tabIndex={index >= marqueeItems.length ? -1 : undefined}
            >
              <span>Ver todos nuestros productos</span>
              <svg
                className="product-marquee__mark"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M5 19L19 5M8 5H19V16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}

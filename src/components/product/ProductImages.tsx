"use client";

import { useState } from "react";
import Image from "next/image";
import type { SerializableProduct } from "@/types/product.types";

export default function ProductImages({
  product,
}: {
  product: SerializableProduct;
}) {
  const [activeIndex, setActiveIndex] = useState(1);

  const images = [product.image01, product.image02, product.image03];

  return (
    <div className="flex flex-col items-center">
      {/* Main Image */}
      <div className="mt-8 w-72 h-72 relative">
        <Image
          src={images[activeIndex - 1]}
          alt={product.name}
          fill
          sizes="288px"
          className="object-cover rounded-lg"
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="mt-8 flex justify-center gap-12 w-full">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ver imagen ${i + 1} de ${product.name}`}
            aria-pressed={activeIndex === i + 1}
            onClick={() => setActiveIndex(i + 1)}
            className={`w-24 h-24 relative cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
              activeIndex === i + 1
                ? "ring-2 ring-primary shadow-medium"
                : "shadow-soft opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={img}
              alt={`${product.name} ${i + 1}`}
              fill
              sizes="96px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/types/product.types";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${category.name.toLowerCase()}`}
      className="relative rounded-lg overflow-hidden group cursor-pointer min-h-[100px] bg-cover bg-center"
      style={{ backgroundImage: `url(${category.backgroundImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 z-1 group-hover:bg-black/50 transition-all duration-300" />

      {/* Content */}
      <div className="relative z-2 flex flex-col items-center justify-center h-full ">
        <div className="mt-2 w-10 h-10 relative">
          <Image
            src={category.img}
            alt={category.name}
            fill
            sizes="40px"
            className="object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <h2 className="text-2xl text-white font-semibold mb-2 ">
          {category.name}
        </h2>
      </div>
    </Link>
  );
}

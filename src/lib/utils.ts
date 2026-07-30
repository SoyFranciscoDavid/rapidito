import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with clsx
 * Handles conditional classes and deduplication
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price to currency string
 */
export function formatPrice(price: number): string {
  return `$ ${price.toLocaleString("es-AR")}`;
}

/**
 * Get image URL based on index
 */
export function getProductImage(
  product: { image01: string; image02: string; image03: string },
  index: number,
): string {
  switch (index) {
    case 2:
      return product.image02;
    case 3:
      return product.image03;
    default:
      return product.image01;
  }
}

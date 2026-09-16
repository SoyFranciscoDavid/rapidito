import productsJson from "@/app/api/products.json";
import type { StaticImageData } from "next/image";
import type { Product, SerializableProduct } from "@/types/product.types";

const imageContext = (
  require as unknown as {
    context: (
      directory: string,
      useSubdirectories: boolean,
      pattern: RegExp,
    ) => (path: string) => StaticImageData;
  }
).context("@/assets/images/products", false, /\.jpg$/);

type ProductJson = Omit<Product, "image01" | "image02" | "image03"> & {
  image01: string;
  image02: string;
  image03: string;
};

function resolveProductImage(path: string): StaticImageData {
  const filename = path.split("/").pop();
  if (!filename) throw new Error(`Invalid product image path: ${path}`);
  return imageContext(`./${filename}`);
}

export const products = (productsJson as ProductJson[]).map((product) => ({
  ...product,
  image01: resolveProductImage(product.image01),
  image02: resolveProductImage(product.image02),
  image03: resolveProductImage(product.image03),
}));

export function getProducts(): Product[] {
  return products;
}

export function getProductById(productId: string): Product | undefined {
  return products.find((product) => product.id === productId);
}

export function getProductsByCategory(category: string): Product[] {
  const normalizedCategory = category.trim().toLowerCase();
  return products.filter(
    (product) => product.category.toLowerCase() === normalizedCategory,
  );
}

export function searchProducts(query: string): Product[] {
  const normalizedQuery = query.trim().toLowerCase();
  return products.filter((product) =>
    product.name.toLowerCase().includes(normalizedQuery),
  );
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

export function getRecommendedProducts(): Product[] {
  return products.filter((product) => product.recommended);
}

/** Extrae la ruta string de una imagen que puede ser string o StaticImageData. */
function imageToPath(image: string | StaticImageData): string {
  if (typeof image === "string") return image;
  // `require.context` devuelve un objeto Module `{ default: StaticImageData }`.
  const data = (image as { default?: StaticImageData }).default ?? image;
  return data.src;
}

/**
 * Convierte un `Product` (con `StaticImageData`) a `SerializableProduct`
 * (con rutas string), apto para pasar a través del límite Server -> Client.
 */
export function toSerializableProduct(product: Product): SerializableProduct {
  return {
    ...product,
    image01: imageToPath(product.image01),
    image02: imageToPath(product.image02),
    image03: imageToPath(product.image03),
  };
}

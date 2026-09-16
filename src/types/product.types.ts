import type { StaticImageData } from "next/image";

export interface Product {
  id: string;
  name: string;
  image01: string | StaticImageData;
  image02: string | StaticImageData;
  image03: string | StaticImageData;
  price: number;
  category: string;
  desc: string;
  like: number;
  stock: number;
  featured: boolean;
  recommended: boolean;
}

/**
 * Versión serializable de `Product` con las imágenes como rutas string.
 * Se usa para pasar datos a través del límite Server -> Client, ya que
 * `StaticImageData` (objeto de módulo) no es serializable por React.
 */
export interface SerializableProduct {
  id: string;
  name: string;
  image01: string;
  image02: string;
  image03: string;
  price: number;
  category: string;
  desc: string;
  like: number;
  stock: number;
  featured: boolean;
  recommended: boolean;
}

export type Sauce =
  | "mayonesa"
  | "savora"
  | "ketchup"
  | "golf"
  | "criolla"
  | "picante";

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  stock: number;
  quantity: number;
  sauces?: Sauce[];
}

export interface Category {
  name: string;
  img: string | StaticImageData;
  backgroundImage: string | StaticImageData;
}

export interface Product {
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

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  stock: number;
  quantity: number;
}

export interface Category {
  name: string;
  img: string;
  backgroundImage: string;
}

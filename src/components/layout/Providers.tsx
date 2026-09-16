"use client";

import { Provider } from "react-redux";
import { useEffect, useRef } from "react";
import { makeStore, type AppStore } from "@/features/store";
import {
  hydrateCart,
  CART_STORAGE_KEY,
  type PersistedCartItem,
} from "@/features/cart/cartSlice";
import { getProductById, toSerializableProduct } from "@/lib/products";
import { SAUCE_OPTIONS } from "@/lib/constants";
import type { CartItem, Sauce } from "@/types/product.types";

function restoreCartItems(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((entry: PersistedCartItem) => {
    if (
      !entry ||
      typeof entry.id !== "string" ||
      !Number.isInteger(entry.quantity) ||
      entry.quantity < 1
    ) {
      return [];
    }

    const product = getProductById(entry.id);
    if (!product || product.stock < 1) return [];

    const serializableProduct = toSerializableProduct(product);

    const availableSauces = new Set(
      (SAUCE_OPTIONS[product.category] ?? []).map((option) => option.value),
    );
    const sauces = Array.isArray(entry.sauces)
      ? entry.sauces.filter((sauce): sauce is Sauce =>
          availableSauces.has(sauce),
        )
      : [];

    return [
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: serializableProduct.image01,
        stock: product.stock,
        quantity: Math.min(entry.quantity, product.stock),
        sauces,
      },
    ];
  });
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  /* Rehidrata el carrito guardado en localStorage al montar (solo cliente) */
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        storeRef.current?.dispatch(
          hydrateCart(restoreCartItems(JSON.parse(stored))),
        );
      }
    } catch {
      // Datos corruptos o sin acceso: ignorar y arrancar con carrito vacío
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}

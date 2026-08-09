"use client";

import { Provider } from "react-redux";
import { useEffect, useRef } from "react";
import { makeStore, type AppStore } from "@/features/store";
import { hydrateCart, CART_STORAGE_KEY } from "@/features/cart/cartSlice";

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
        const items = JSON.parse(stored);
        if (Array.isArray(items)) {
          storeRef.current?.dispatch(hydrateCart(items));
        }
      }
    } catch {
      // Datos corruptos o sin acceso: ignorar y arrancar con carrito vacío
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}

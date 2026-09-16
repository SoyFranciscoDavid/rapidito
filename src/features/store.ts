import { configureStore, type Middleware } from "@reduxjs/toolkit";
import cartReducer, {
  CART_STORAGE_KEY,
  type PersistedCartItem,
} from "./cart/cartSlice";
import type { CartItem } from "@/types/product.types";

/**
 * Persiste el carrito en localStorage cada vez que cambia.
 * Solo corre en el cliente (typeof window !== "undefined"),
 * así no rompe el SSR / build de Vercel.
 */
const cartPersistenceMiddleware: Middleware =
  (storeAPI) => (next) => (action) => {
    const result = next(action);

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          CART_STORAGE_KEY,
          JSON.stringify(
            storeAPI.getState().cart.items.map(
              ({ id, quantity, sauces }: CartItem): PersistedCartItem => ({
                id,
                quantity,
                sauces,
              }),
            ),
          ),
        );
      } catch {
        // localStorage no disponible (modo privado, etc.): ignorar
      }
    }

    return result;
  };

export const makeStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cartPersistenceMiddleware),
  });

type Store = ReturnType<typeof makeStore>;
export type AppStore = Store;
export type RootState = ReturnType<Store["getState"]>;
export type AppDispatch = Store["dispatch"];

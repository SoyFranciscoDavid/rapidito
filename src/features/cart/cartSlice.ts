import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { CartItem } from "@/types/product.types";
import type { RootState } from "../store";

/** Clave usada para persistir el carrito en localStorage */
export const CART_STORAGE_KEY = "rapidito-cart";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export type CartItemReference = Pick<CartItem, "id" | "sauces">;

export interface PersistedCartItem extends CartItemReference {
  quantity: number;
}

export const getCartItemKey = ({ id, sauces }: CartItemReference) =>
  `${id}:${[...(sauces ?? [])].sort().join(",")}`;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(
        (item) => getCartItemKey(item) === getCartItemKey(action.payload),
      );
      if (existing) {
        existing.quantity = Math.min(
          existing.quantity + action.payload.quantity,
          existing.stock,
        );
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<CartItemReference>) => {
      state.items = state.items.filter(
        (item) => getCartItemKey(item) !== getCartItemKey(action.payload),
      );
    },
    incrementQuantity: (state, action: PayloadAction<CartItemReference>) => {
      const item = state.items.find(
        (item) => getCartItemKey(item) === getCartItemKey(action.payload),
      );
      if (item && item.quantity < item.stock) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<CartItemReference>) => {
      const item = state.items.find(
        (item) => getCartItemKey(item) === getCartItemKey(action.payload),
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    /** Restaura el carrito guardado en localStorage (cliente) */
    hydrateCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
});

/* Selectors */
export const selectCartItems = (state: RootState): CartItem[] =>
  state.cart.items;

export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0),
);

export const selectCartItemCount = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0),
);

export const {
  addItem,
  removeItem,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  hydrateCart,
} = cartSlice.actions;

export default cartSlice.reducer;

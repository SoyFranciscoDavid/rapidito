import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

type Store = ReturnType<typeof makeStore>;
export type AppStore = Store;
export type RootState = ReturnType<Store["getState"]>;
export type AppDispatch = Store["dispatch"];

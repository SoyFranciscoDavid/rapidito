"use client";

import { useAppDispatch } from "@/features/hooks";
import { addItem } from "@/features/cart/cartSlice";
import type { SerializableProduct } from "@/types/product.types";

export default function QuickAddToCart({
  product,
}: {
  product: SerializableProduct;
}) {
  const dispatch = useAppDispatch();
  const isOutOfStock = product.stock < 1;

  const handleAdd = () => {
    if (isOutOfStock) return;

    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image01,
        stock: product.stock,
        quantity: 1,
      }),
    );
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={isOutOfStock}
      className="self-start rounded-full border border-primary px-4 py-2 text-xs text-primary transition-all duration-300 hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:border-border disabled:text-text-muted disabled:hover:bg-transparent"
    >
      {isOutOfStock ? "Agotado" : "Agregar"}
    </button>
  );
}

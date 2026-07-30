"use client";

import { useState } from "react";
import { useAppDispatch } from "@/features/hooks";
import { addItem } from "@/features/cart/cartSlice";
import QuantitySelector from "@/components/ui/QuantitySelector";
import type { Product } from "@/types/product.types";

export default function AddToCart({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image01,
        stock: product.stock,
        quantity,
      }),
    );
  };

  return (
    <div>
      <h4 className="text-sm font-medium">Elige una cantidad</h4>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-4">
          <QuantitySelector
            quantity={quantity}
            onIncrement={() =>
              setQuantity((q) => Math.min(q + 1, product.stock))
            }
            onDecrement={() => setQuantity((q) => Math.max(q - 1, 1))}
          />
          {product.stock < 1 ? (
            <p className="text-sm">Producto agotado</p>
          ) : (
            <p className="text-sm">
              ¡Quedan solo{" "}
              <span className="text-primary font-semibold">
                {product.stock}
              </span>
              !
              <br />
              ¡No te lo pierdas!
            </p>
          )}
        </div>
        <button
          onClick={handleAdd}
          className="border border-primary text-primary rounded-full px-6 py-2.5 text-sm cursor-pointer hover:bg-primary hover:text-white transition-all duration-300"
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}

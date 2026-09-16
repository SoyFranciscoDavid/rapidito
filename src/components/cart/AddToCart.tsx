"use client";

import { useState } from "react";
import { useAppDispatch } from "@/features/hooks";
import { addItem } from "@/features/cart/cartSlice";
import QuantitySelector from "@/components/ui/QuantitySelector";
import { SAUCE_OPTIONS } from "@/lib/constants";
import type { SerializableProduct, Sauce } from "@/types/product.types";

export default function AddToCart({
  product,
}: {
  product: SerializableProduct;
}) {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedSauces, setSelectedSauces] = useState<Sauce[]>([]);
  const sauceOptions = SAUCE_OPTIONS[product.category] ?? [];

  const toggleSauce = (sauce: Sauce) => {
    setSelectedSauces((current) =>
      current.includes(sauce)
        ? current.filter((item) => item !== sauce)
        : [...current, sauce],
    );
  };

  const handleAdd = () => {
    if (product.stock < 1) return;

    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image01,
        stock: product.stock,
        quantity,
        sauces: selectedSauces,
      }),
    );
  };

  return (
    <div>
      <h4 className="text-sm font-medium">Elige una cantidad</h4>
      {sauceOptions.length > 0 && (
        <fieldset className="mt-6">
          <legend className="text-sm font-medium">Elegí tus aderezos</legend>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {sauceOptions.map((sauce) => (
              <label
                key={sauce.value}
                className="flex cursor-pointer items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={selectedSauces.includes(sauce.value)}
                  onChange={() => toggleSauce(sauce.value)}
                  className="h-4 w-4 accent-primary"
                />
                {sauce.label}
              </label>
            ))}
          </div>
        </fieldset>
      )}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-4">
          <QuantitySelector
            quantity={quantity}
            onIncrement={() =>
              setQuantity((q) => Math.min(q + 1, product.stock))
            }
            onDecrement={() => setQuantity((q) => Math.max(q - 1, 1))}
            disabled={product.stock < 1}
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
          type="button"
          onClick={handleAdd}
          disabled={product.stock < 1}
          className="border border-primary text-primary rounded-full px-6 py-2.5 text-sm cursor-pointer hover:bg-primary hover:text-white transition-all duration-300 disabled:cursor-not-allowed disabled:border-border disabled:text-text-muted disabled:hover:bg-transparent"
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}

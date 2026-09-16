"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import {
  selectCartItems,
  selectCartTotal,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart,
  getCartItemKey,
} from "@/features/cart/cartSlice";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleCheckout = () => {
    dispatch(clearCart());
    setOrderPlaced(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Hero interno */}
      <section className="bg-foreground pt-24 pb-16 md:pb-24 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="container-app relative z-10 text-center">
          <h1 className="font-display text-5xl md:text-7xl text-white font-bold">
            Carrito de Compras
          </h1>
          <p className="text-secondary text-base md:text-lg mt-4 mx-auto">
            Revisa tus productos y finaliza tu pedido en un clic.
          </p>
        </div>
      </section>

      <main className="container-app py-12 md:py-16 min-h-[50vh]">
        {/* Confirmación de pedido */}
        {orderPlaced ? (
          <div className="max-w-lg mx-auto text-center bg-white rounded-xl shadow-soft p-10">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">¡Gracias por tu compra!</h2>
            <p className="text-text-muted mb-8">
              Tu pedido fue registrado correctamente. Te contactaremos muy
              pronto para coordinar la entrega.
            </p>
            <Link
              href="/products"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors"
            >
              Seguir comprando
            </Link>
          </div>
        ) : items.length === 0 ? (
          /* Carrito vacío */
          <div className="max-w-lg mx-auto text-center bg-white rounded-xl shadow-soft p-10">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold mb-2">Tu carrito está vacío</h2>
            <p className="text-text-muted mb-8">
              Todavía no agregaste productos. Explorá nuestro menú y elegí tus
              favoritos.
            </p>
            <Link
              href="/products"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors"
            >
              Explorar productos
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Lista de items */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-soft p-6">
              <h2 className="text-xl font-semibold mb-6">
                Productos ({items.length})
              </h2>
              <div className="flex flex-col gap-6">
                {items.map((item) => (
                  <div
                    key={getCartItemKey(item)}
                    className="flex gap-4 pb-6 border-b border-border last:border-0 last:pb-0"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={90}
                      height={90}
                      className="rounded-md object-cover shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between gap-4">
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-xs text-text-muted mt-1">
                            {formatPrice(item.price)} c/u
                          </p>
                          {item.sauces && item.sauces.length > 0 && (
                            <p className="text-xs text-text-muted mt-1">
                              Aderezos: {item.sauces.join(", ")}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => dispatch(removeItem(item))}
                          aria-label={`Eliminar ${item.name}`}
                          className="text-red-500 cursor-pointer hover:text-red-700 transition-colors self-start"
                        >
                          <BiTrash className="text-lg" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            aria-label={`Disminuir cantidad de ${item.name}`}
                            onClick={() => dispatch(decrementQuantity(item))}
                            className="w-8 h-8 bg-muted rounded-md cursor-pointer font-medium hover:bg-border transition-colors"
                          >
                            -
                          </button>
                          <span className="font-semibold w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label={`Aumentar cantidad de ${item.name}`}
                            onClick={() => dispatch(incrementQuantity(item))}
                            disabled={item.quantity >= item.stock}
                            className="w-8 h-8 bg-muted rounded-md cursor-pointer font-medium hover:bg-border transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-bold">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resumen */}
            <aside className="bg-white rounded-xl shadow-soft p-6 lg:sticky lg:top-24">
              <h2 className="text-xl font-semibold mb-6">Resumen</h2>
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-text-muted">Subtotal</span>
                <span className="font-semibold">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-text-muted">Envío</span>
                <span className="font-semibold">A calcular</span>
              </div>
              <div className="flex justify-between mt-4 pt-4 border-t border-border text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full mt-6 bg-primary text-white rounded-lg py-3 font-semibold hover:bg-primary-hover transition-colors cursor-pointer"
              >
                Finalizar compra
              </button>
              <p className="text-xs text-text-muted text-center mt-3">
                Pagos seguros y envíos a todo el país.
              </p>
            </aside>
          </div>
        )}
      </main>
    </>
  );
}

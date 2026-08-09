"use client";

import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import {
  selectCartItems,
  selectCartTotal,
  incrementQuantity,
  decrementQuantity,
  removeItem,
} from "@/features/cart/cartSlice";
import { formatPrice } from "@/lib/utils";
import { BiTrash } from "react-icons/bi";

interface CartModalProps {
  onClose?: () => void;
}

export default function CartModal({ onClose }: CartModalProps) {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);

  if (items.length === 0) {
    return (
      <div className="absolute top-full right-0 mt-2 w-72 bg-white text-foreground rounded-lg shadow-hard p-4 z-50 animate-fade-in">
        <p className="text-center text-text-muted py-4">Carrito vacío</p>
      </div>
    );
  }

  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-white text-foreground rounded-lg shadow-hard p-4 z-50 animate-fade-in">
      <h3 className="font-semibold text-base mb-3">Carrito de Compras</h3>

      <div className="max-h-64 overflow-y-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 mb-4 pb-4 border-b border-border last:border-0"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={60}
              height={60}
              className="rounded-md object-cover"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex justify-between font-semibold text-sm">
                <h4>{item.name}</h4>
                <span>{formatPrice(item.price)}</span>
              </div>
              <span className="text-xs text-text-muted">Disponible</span>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => dispatch(decrementQuantity(item.id))}
                    className="font-bold cursor-pointer text-base"
                  >
                    -
                  </button>
                  <span className="font-semibold text-sm">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(incrementQuantity(item.id))}
                    disabled={item.quantity >= item.stock}
                    className="font-semibold cursor-pointer text-sm disabled:opacity-20 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => dispatch(removeItem(item.id))}
                  className="text-red-500 cursor-pointer flex items-center gap-1 text-sm"
                >
                  <BiTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-3 mt-2">
        <div className="flex justify-between font-semibold mb-1">
          <span>Subtotal</span>
          <span>{formatPrice(total)}</span>
        </div>
        <p className="text-xs text-text-muted mb-3">
          Envío y descuentos calculados al finalizar.
        </p>
        <div className="flex justify-between gap-2">
          <Link
            href="/cart"
            onClick={onClose}
            className="flex-1 px-3 py-2.5 border border-border rounded-md text-sm text-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            Ver Carrito
          </Link>
          <Link
            href="/cart"
            onClick={onClose}
            className="flex-1 px-3 py-2.5 bg-gray-900 text-white rounded-md text-sm text-center cursor-pointer hover:bg-gray-800 transition-colors"
          >
            Finalizar compra
          </Link>
        </div>
      </div>
    </div>
  );
}

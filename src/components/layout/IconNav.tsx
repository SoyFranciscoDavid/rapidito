"use client";

import { useState } from "react";
import { BiBell, BiCart, BiUser } from "react-icons/bi";
import Link from "next/link";
import CartModal from "@/components/cart/CartModal";
import { useAppSelector } from "@/features/hooks";
import { selectCartItemCount } from "@/features/cart/cartSlice";

interface IconNavProps {
  variant?: "light" | "dark";
}

export default function IconNav({ variant = "dark" }: IconNavProps) {
  const itemCount = useAppSelector(selectCartItemCount);
  const [openUser, setOpenUser] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  return (
    <div
      className={`hidden lg:flex w-40 items-center justify-end gap-6 relative ${
        variant === "light" ? "text-white" : "text-primary"
      }`}
    >
      <button
        aria-label="Notificaciones"
        className="text-xl cursor-pointer hover:opacity-80 transition-opacity"
      >
        <BiBell />
      </button>

      <button
        aria-label="Usuario"
        onClick={() => {
          setOpenUser((p) => !p);
          setOpenCart(false);
        }}
        className="text-xl cursor-pointer hover:opacity-80 transition-opacity relative"
      >
        <BiUser />
      </button>

      {openUser && (
        <div className="absolute top-16 -left-2 flex flex-col gap-4 bg-white text-foreground shadow-hard p-4 rounded-md z-50 animate-fade-in">
          <Link
            href="/"
            className="hover:text-primary transition-colors text-sm"
          >
            Perfil
          </Link>
          <button className="text-sm text-left cursor-pointer hover:text-primary transition-colors">
            Cerrar sesión
          </button>
        </div>
      )}

      <button
        aria-label="Carrito de compras"
        onClick={() => {
          setOpenCart((p) => !p);
          setOpenUser(false);
        }}
        className="text-xl cursor-pointer hover:opacity-80 transition-opacity relative"
      >
        <BiCart />
        {itemCount > 0 && (
          <span className="absolute -top-3.5 -right-2 bg-primary text-white rounded-full w-4.5 h-4.5 text-[0.65rem] flex items-center justify-center font-bold">
            {itemCount}
          </span>
        )}
      </button>

      {openCart && <CartModal onClose={() => setOpenCart(false)} />}
    </div>
  );
}

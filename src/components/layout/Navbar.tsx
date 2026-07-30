"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import IconNav from "./IconNav";
import { BiX } from "react-icons/bi";
import { useAppSelector } from "@/features/hooks";
import { selectCartItemCount } from "@/features/cart/cartSlice";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/products", label: "Productos" },
  { href: "/ofertas", label: "Ofertas" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const itemCount = useAppSelector(selectCartItemCount);
  const pathname = usePathname();

  /** Rutas que tienen hero/banner con fondo oscuro (bg-foreground) */
  const DARK_HERO_ROUTES = [
    "/",
    "/products",
    "/nosotros",
    "/contacto",
    "/ofertas",
  ];
  const hasDarkHero =
    DARK_HERO_ROUTES.includes(pathname) || pathname.startsWith("/category/");
  const useLightNav = hasDarkHero && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/10 shadow-soft"
          : "bg-transparent"
      }`}
    >
      {/* Safe-area inset for notched devices */}
      <div
        className={`container-app flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-14" : "h-20"
        }`}
      >
        {/* Logo */}
        <Logo color={useLightNav ? "contrast" : "primary"} />

        {/* Desktop Menu */}
        <div className="hidden lg:flex flex-1 items-center justify-between">
          <div
            className={`flex items-center gap-6 ml-10 ${
              useLightNav || scrolled ? "text-white" : "text-foreground"
            }`}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-primary transition-colors duration-300 text-sm tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <SearchBar variant={useLightNav || scrolled ? "light" : "dark"} />
        </div>

        {/* Icons */}
        <IconNav variant={useLightNav ? "light" : "dark"} />

        {/* Mobile Menu Button — Touch target ≥44×44pt */}
        <button
          onClick={() => setMobileOpen((p) => !p)}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
          className={`flex lg:hidden items-center justify-center z-50 cursor-pointer w-11 h-11 ${
            mobileOpen ? "fixed top-5 right-5" : "relative"
          }`}
        >
          {mobileOpen ? (
            <BiX
              className={`text-2xl ${
                useLightNav ? "text-white" : "text-primary"
              }`}
            />
          ) : (
            <div className="flex flex-col gap-1">
              <span
                className={`w-5 h-0.5 ${
                  useLightNav ? "bg-white" : "bg-primary"
                } transition-all duration-300 rounded-full`}
              />
              <span
                className={`w-5 h-0.5 ${
                  useLightNav ? "bg-white" : "bg-primary"
                } transition-all duration-300 rounded-full`}
              />
              <span
                className={`w-5 h-0.5 ${
                  useLightNav ? "bg-white" : "bg-primary"
                } transition-all duration-300 rounded-full`}
              />
            </div>
          )}
        </button>

        {/* Mobile Overlay */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 flex flex-col items-center justify-start gap-6 pt-20 bg-foreground/95 backdrop-blur-lg z-40 animate-fade-in">
            {/* Decorative glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 bg-[radial-gradient(circle,var(--color-primary)_0%,transparent_100%)] rounded-full blur-[100px] opacity-20 pointer-events-none" />

            <nav className="relative z-10 flex flex-col items-center gap-1 w-full px-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeMobile}
                  className="w-full text-center text-white text-lg py-3 border-b border-white/10 hover:text-primary hover:border-primary/30 transition-all duration-300 last:border-0"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="relative z-10 flex flex-col items-center gap-4 w-full px-8">
              <div className="w-48 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
              <SearchBar
                onSearch={closeMobile}
                className="w-full"
                variant="light"
              />
              <Link
                href="/cart"
                onClick={closeMobile}
                className="text-white text-lg hover:text-primary transition-colors duration-300 flex items-center gap-2"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                Carrito{" "}
                {itemCount > 0 && (
                  <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

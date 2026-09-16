"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";

interface SearchBarProps {
  onSearch?: () => void;
  className?: string;
  variant?: "light" | "dark";
}

export default function SearchBar({
  onSearch,
  className,
  variant = "light",
}: SearchBarProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = inputRef.current?.value.trim();
    if (query) {
      onSearch?.();
      router.push(`/search/${query}`);
    }
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={`flex items-center gap-2 rounded-xl px-3 h-9 w-full lg:w-72 backdrop-blur-sm focus-within:ring-2 ${className} ${
        variant === "light"
          ? "bg-white/10 text-white placeholder:text-white/60 focus-within:ring-white/50"
          : "bg-black/5 text-foreground placeholder:text-text-muted focus-within:ring-primary/50"
      }`}
    >
      <label htmlFor="site-search" className="sr-only">
        Buscar productos
      </label>
      <input
        ref={inputRef}
        id="site-search"
        name="query"
        type="text"
        placeholder="Buscar..."
        className={`flex-1 h-full bg-transparent outline-none text-sm ${
          variant === "light"
            ? "text-white placeholder:text-white/60"
            : "text-foreground placeholder:text-text-muted"
        }`}
      />
      <button
        type="submit"
        aria-label="Buscar productos"
        className={`text-lg cursor-pointer ${
          variant === "light" ? "text-white" : "text-foreground"
        }`}
      >
        <BiSearch />
      </button>
    </form>
  );
}

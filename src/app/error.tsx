"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error capturado:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center">
        {/* Ilustración SVG */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto mb-8 opacity-80"
        >
          <circle
            cx="60"
            cy="60"
            r="58"
            stroke="#DC2626"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          <path
            d="M40 45L80 75M80 45L40 75"
            stroke="#DC2626"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle
            cx="60"
            cy="60"
            r="20"
            stroke="#DC2626"
            strokeWidth="1.5"
            fill="#DC2626"
            fillOpacity="0.05"
          />
        </svg>

        <h1 className="font-display text-4xl md:text-5xl text-foreground font-bold mb-4">
          ¡Ups!
        </h1>
        <p className="text-text-muted text-lg mb-2">
          Algo salió mal al cargar esta página.
        </p>
        <p className="text-text-muted text-sm mb-8">
          No te preocupes, ya estamos al tanto. Podés intentar de nuevo o volver
          al inicio.
        </p>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="px-6 py-3 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-hover transition-colors duration-300 cursor-pointer"
          >
            Intentar de nuevo
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-border text-foreground rounded-full text-sm font-medium hover:bg-surface-alt transition-colors duration-300"
          >
            Volver al inicio
          </Link>
        </div>

        {process.env.NODE_ENV === "development" && (
          <p className="mt-8 text-xs text-text-muted/50 font-mono">
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
}

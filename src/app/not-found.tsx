import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center">
        {/* SVG 404 ilustración */}
        <svg
          width="140"
          height="100"
          viewBox="0 0 140 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto mb-8 opacity-80"
        >
          <text
            x="70"
            y="68"
            textAnchor="middle"
            fontSize="72"
            fontWeight="700"
            fontFamily="Playfair Display SC, serif"
            fill="#DC2626"
            fillOpacity="0.15"
            stroke="#DC2626"
            strokeWidth="1"
          >
            404
          </text>
          <path
            d="M30 85L110 85"
            stroke="#DC2626"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="6 4"
          />
          <circle
            cx="70"
            cy="42"
            r="12"
            stroke="#DC2626"
            strokeWidth="1.5"
            fill="#DC2626"
            fillOpacity="0.05"
          />
          <path
            d="M62 38L78 46M78 38L62 46"
            stroke="#DC2626"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>

        <h1 className="font-display text-4xl md:text-5xl text-foreground font-bold mb-4">
          Página no encontrada
        </h1>
        <p className="text-text-muted text-lg mb-8">
          La página que buscas no existe o fue movida.
        </p>

        <Link
          href="/"
          className="inline-block px-8 py-3 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-hover transition-colors duration-300"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

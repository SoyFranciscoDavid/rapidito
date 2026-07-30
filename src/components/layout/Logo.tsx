import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md";
  showText?: boolean;
  color?: "primary" | "white" | "contrast";
}

export default function Logo({
  size = "sm",
  showText = true,
  color = "primary",
}: LogoProps) {
  const iconSize = size === "sm" ? 28 : 36;
  const textSize = size === "sm" ? "text-xl" : "text-2xl";

  const colorClass =
    color === "white"
      ? "text-white"
      : color === "contrast"
        ? "text-contrast"
        : "text-primary";

  return (
    <Link href="/" className={`flex items-center gap-2 group ${colorClass}`}>
      {/* Sandwich SVG Logo */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Top bun */}
        <path
          d="M3 9C3 6.5 25 6.5 25 9V10H3V9Z"
          fill="currentColor"
          fillOpacity="0.15"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        {/* Sesame dots */}
        <circle cx="9" cy="8" r="0.8" fill="currentColor" fillOpacity="0.3" />
        <circle
          cx="14"
          cy="7.5"
          r="0.8"
          fill="currentColor"
          fillOpacity="0.3"
        />
        <circle cx="19" cy="8" r="0.8" fill="currentColor" fillOpacity="0.3" />
        {/* Lettuce */}
        <rect x="3" y="11" width="22" height="2" rx="0.6" fill="#22C55E" />
        {/* Tomato */}
        <rect x="3" y="13.5" width="22" height="2" rx="0.6" fill="#EF4444" />
        {/* Cheese */}
        <rect x="3" y="16" width="22" height="1.8" rx="0.6" fill="#FBBF24" />
        {/* Meat */}
        <rect
          x="3"
          y="18.3"
          width="22"
          height="2"
          rx="0.6"
          fill="currentColor"
          fillOpacity="0.2"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        {/* Bottom bun */}
        <path
          d="M3 21C3 23.5 25 23.5 25 21V20H3V21Z"
          fill="currentColor"
          fillOpacity="0.15"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>

      {/* Text */}
      {showText && (
        <span
          className={`font-bold ${textSize} tracking-tight group-hover:opacity-80 transition-opacity duration-300`}
        >
          Rapidito
        </span>
      )}
    </Link>
  );
}

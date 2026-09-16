import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/logo_2.svg";

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
  const logoWidth = size === "sm" ? 90 : 160;
  const logoHeight = size === "sm" ? 31 : 55;

  const colorClass =
    color === "white"
      ? "text-white"
      : color === "contrast"
        ? "text-contrast"
        : "text-primary";

  return (
    <Link href="/" className={`flex items-center gap-2 group ${colorClass}`}>
      {/* Logo */}
      <Image
        src={logo}
        alt="Rapidito"
        width={logoWidth}
        height={logoHeight}
        className="shrink-0 group-hover:opacity-80 transition-opacity duration-300"
        priority
      />
    </Link>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product.types";
import Badge from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="flex flex-col items-center relative border border-border p-4 rounded-lg bg-white hover:shadow-medium transition-all duration-300 group"
    >
      {/* Image */}
      <div className="w-40 h-40 relative flex items-center justify-center">
        <Image
          src={product.image01}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 40vw, 160px"
          className="object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Badges */}
      {product.featured && (
        <Badge
          variant="featured"
          className="absolute top-2 left-2 rotate-[-15deg] opacity-70"
        >
          Destacados
        </Badge>
      )}
      {product.recommended && (
        <Badge
          variant="recommended"
          className={`absolute top-2 ${product.featured ? "left-16" : "left-2"} rotate-[-15deg] opacity-70`}
        >
          Recomendados
        </Badge>
      )}

      {/* Info */}
      <div className="flex flex-col w-full mt-4">
        <div className="flex justify-between font-semibold mb-2">
          <span className="text-sm">{product.name}</span>
          <span className="text-sm">{formatPrice(product.price)}</span>
        </div>
        <p className="text-xs text-text-muted mt-1 mb-6 line-clamp-2">
          {product.desc}
        </p>
        <button className="border border-primary text-primary rounded-full px-4 py-2 text-xs cursor-pointer hover:bg-primary hover:text-white transition-all duration-300 self-start">
          Agregar
        </button>
      </div>
    </Link>
  );
}

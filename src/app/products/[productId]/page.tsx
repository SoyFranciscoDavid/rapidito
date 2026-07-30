import ProductImages from "@/components/product/ProductImages";
import AddToCart from "@/components/cart/AddToCart";
import products from "@/app/api/products.json";
import type { Product } from "@/types/product.types";
import { formatPrice } from "@/lib/utils";

export default async function ProductPage({
  params: { productId },
}: {
  params: { productId: string };
}) {
  const typed = products as Product[];
  const product = typed.find((p) => p.id === productId) ?? null;

  if (!product) {
    return (
      <div className="container-app py-8 text-center">
        <p className="text-text-muted">Producto no encontrado</p>
      </div>
    );
  }

  return (
    <div className="container-app pt-24 pb-8">
      <div className="flex justify-between gap-8 max-md:flex-col">
        {/* Images */}
        <div className="w-[48%] max-md:w-full">
          <ProductImages product={product} />
        </div>

        {/* Details */}
        <div className="w-[48%] max-md:w-full flex flex-col">
          <h1 className="text-4xl font-normal">{product.name}</h1>
          <p className="mt-4">{product.desc}</p>

          <div className="line-divider" />

          <div className="flex gap-4 items-center">
            <span className="text-lg opacity-50 line-through">
              {formatPrice(product.price + 100)}
            </span>
            <h2 className="text-2xl font-semibold">
              {formatPrice(product.price)}
            </h2>
          </div>

          <div className="line-divider" />

          <AddToCart product={product} />

          <div className="line-divider" />

          <div className="flex flex-col">
            <h4 className="font-medium mb-2">Descripción</h4>
            <p className="text-sm text-text-muted leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
              unde dolore ex nisi deleniti vel laudantium atque, obcaecati,
              ipsum, magnam labore expedita doloribus inventore rerum suscipit
              dolorem architecto. Qui, placeat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

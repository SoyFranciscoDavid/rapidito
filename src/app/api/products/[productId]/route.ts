import { NextResponse } from "next/server";
import { getProductById } from "@/lib/products";

export async function GET(
  request: Request,
  { params }: { params: { productId: string } },
) {
  const product = getProductById(params.productId);
  if (!product) {
    return NextResponse.json(
      { error: "Producto no encontrado" },
      { status: 404 },
    );
  }
  return NextResponse.json(product);
}

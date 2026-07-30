import { NextResponse } from "next/server";
import products from "../../products.json";

export async function GET(
  request: Request,
  { params }: { params: { productId: string } },
) {
  const product = products.find((p) => params.productId === p.id);
  if (!product) {
    return NextResponse.json(
      { error: "Producto no encontrado" },
      { status: 404 },
    );
  }
  return NextResponse.json(product);
}

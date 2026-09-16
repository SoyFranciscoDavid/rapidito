import { NextResponse } from "next/server";
import { searchProducts } from "@/lib/products";

export async function GET(
  request: Request,
  { params }: { params: { query: string } },
) {
  const results = searchProducts(params.query);

  return NextResponse.json(results);
}

import { NextResponse } from "next/server";
import { getProductsByCategory } from "@/lib/products";

export async function GET(
  request: Request,
  { params }: { params: { name: string } },
) {
  const category = getProductsByCategory(params.name);

  return NextResponse.json(category);
}

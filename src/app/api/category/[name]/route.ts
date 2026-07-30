import { NextResponse } from "next/server";
import products from "../../products.json";

export async function GET(
  request: Request,
  { params }: { params: { name: string } },
) {
  const category = products.filter(
    (p) => params.name === p.category.toLowerCase(),
  );

  return NextResponse.json(category);
}

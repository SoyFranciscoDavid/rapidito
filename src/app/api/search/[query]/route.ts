import { NextResponse } from "next/server";
import products from "../../products.json";

export async function GET(
  request: Request,
  { params }: { params: { query: string } },
) {
  const search = params.query.toLowerCase() || "";
  const results = products.filter((p) => p.name.toLowerCase().includes(search));

  return NextResponse.json(results);
}

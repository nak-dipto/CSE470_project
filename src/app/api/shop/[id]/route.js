import { NextResponse } from "next/server";
import Product from "@/models/product.model";

export async function GET(_, { params }) {
  const { id } = params;

  try {
    const product = await Product.findById(id);
    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get product" },
      { status: 500 }
    );
  }
}

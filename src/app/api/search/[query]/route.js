import { NextResponse } from "next/server";
import Product from "@/models/product.model";

export async function GET(_, { params }) {
  const { query } = await params;
  console.log(query);
  try {
    const products = await Product.find({
      name: { $regex: query, $options: "i" },
    });
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get product" },
      { status: 500 }
    );
  }
}

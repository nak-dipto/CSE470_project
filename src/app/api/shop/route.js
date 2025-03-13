import { NextResponse } from "next/server";
import Product from "@/models/product.model";

export async function GET() {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ products });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { error: "Failed to get products" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import Cart from "@/models/cart.model";
import Product from "@/models/product.model";

export async function POST(request) {
  const body = await request.json();
  const { productId, user } = body;

  if (!productId || !user) {
    return NextResponse.json(
      { error: "You must fill all the required fields!" },
      { status: 200 }
    );
  }

  try {
    const newCart = await Cart.create({
      productId,
      user,
    });

    return NextResponse.json(newCart, { status: 201 });
  } catch (error) {
    console.error(error.message);
    return NextResponse.json(
      { error: "Failed to create cart" },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const cart = await Cart.find({}).sort({ createdAt: -1 });
    const products = await Product.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ cart, products });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { error: "Failed to get products" },
      { status: 500 }
    );
  }
}

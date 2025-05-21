import { NextResponse } from "next/server";
import Product from "@/models/product.model";
// import Bookmark from "@/models/bookmark.model";

import dbConnect from "@/lib/dbConnect";
await dbConnect();
export async function GET() {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    // const bookmarks = await Bookmark.find({}).sort({ createdAt: -1 });
    // return NextResponse.json({ products, bookmarks });
    return NextResponse.json({ products });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { error: "Failed to get products" },
      { status: 500 }
    );
  }
}
export async function POST(request) {
  const body = await request.json();

  const { name, description, price, stock, image, category } = body;
  if (!name || !description || !price || !stock || !image || !category) {
    console.log(name, description, price, stock, image, category);
    return NextResponse.json(
      { error: "You must fill all the required fields!" },
      { status: 200 }
    );
  }

  try {
    const product = await Product.create({
      name,
      description,
      category,
      price: parseInt(price),
      stock: parseInt(stock),
      image,
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { error: "Failed to add the product" },
      { status: 500 }
    );
  }
}

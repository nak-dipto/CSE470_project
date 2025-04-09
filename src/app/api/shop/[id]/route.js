import { NextResponse } from "next/server";
import Product from "@/models/product.model";

export async function GET(_, { params }) {
  const { id } = await params;

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
export async function DELETE(_, { params }) {
  const { id } = await params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  const body = await request.json();
  console.log(body);
  const { _id, name, description, price, stock, image, category } = body;
  if (
    !_id ||
    !name ||
    !description ||
    !price ||
    !stock ||
    !image ||
    !category
  ) {
    console.log(_id, name, description, price, stock, image, category);
    return NextResponse.json(
      { error: "You must fill all the required fields!" },
      { status: 200 }
    );
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      {
        name,
        description,
        price,
        stock,
        image,
        category,
      },
      { new: true }
    );

    return NextResponse.json(updatedProduct, { status: 201 });
  } catch (error) {
    console.log(error.message);

    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

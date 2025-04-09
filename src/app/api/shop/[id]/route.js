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
    // Attempt to find and delete the product by its ID
    const deletedProduct = await Product.findByIdAndDelete(id);

    // If the product wasn't found, return a 404 response
    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // If successful, return a success message
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    // In case of any error, return a 500 response
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import Cart from "@/models/cart.model";

export async function DELETE(_, { params }) {
  const { id } = await params;
  console.log(id);
  try {
    const deletedCart = await Cart.findByIdAndDelete(id);

    if (!deletedCart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Cart deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete Cart" },
      { status: 500 }
    );
  }
}

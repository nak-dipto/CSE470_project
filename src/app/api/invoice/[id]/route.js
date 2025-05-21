import { NextResponse } from "next/server";
import Order from "@/models/order.model";
import dbConnect from "@/lib/dbConnect";
await dbConnect();
export async function GET(_, { params }) {
  const { id } = await params;

  try {
    const order = await Order.findById(id);
    return NextResponse.json({ order });
  } catch (error) {
    return NextResponse.json({ error: "Failed to get order" }, { status: 500 });
  }
}
export async function DELETE(_, { params }) {
  const { id } = await params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Order deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete order" },
      { status: 500 }
    );
  }
}

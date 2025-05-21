import { NextResponse } from "next/server";
import Order from "@/models/order.model";
import dbConnect from "@/lib/dbConnect";
await dbConnect();

export async function POST(request) {
  const body = await request.json();
  const { user, shippingAddress, isGift, items } = body;
  if (!user || !shippingAddress || !isGift.toString() || !items) {
    return NextResponse.json(
      { error: "You must fill all the required fields!" },
      { status: 200 }
    );
  }

  try {
    const newOrder = await Order.create({
      user,
      shippingAddress,
      isGift,
      items,
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error(error.message);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ orders });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { error: "Failed to get orders" },
      { status: 500 }
    );
  }
}

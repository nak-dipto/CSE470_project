import { NextResponse } from "next/server";
import Review from "@/models/review.model";

export async function POST(request) {
  const body = await request.json();
  const { productId, userId, comment } = body;

  if (!productId || !userId || !comment) {
    
    return NextResponse.json(
      { error: "You must fill all the required fields!" },
      { status: 200 }
    );
  }

  try {
    const newReview = await Review.create({
      productId,
      userId,
      comment,
    });

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error(error.message);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}

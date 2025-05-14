import { NextResponse } from "next/server";
import Bookmark from "@/models/bookmark.model";

export async function GET() {
  try {
    const bookmarks = await Bookmark.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ bookmarks });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { error: "Failed to get bookmarks" },
      { status: 500 }
    );
  }
}

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
    const newBookmark = await Bookmark.create({
      productId,
      user,
    });

    return NextResponse.json(newBookmark, { status: 201 });
  } catch (error) {
    console.error(error.message);
    return NextResponse.json(
      { error: "Failed to create bookmark" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import Bookmark from "@/models/bookmark.model";

export async function DELETE(_, { params }) {
  const { id } = await params;
  console.log(id);
  try {
    const deletedBookmark = await Bookmark.findByIdAndDelete(id);

    if (!deletedBookmark) {
      return NextResponse.json(
        { error: "Bookmark not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Bookmark deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete Bookmark" },
      { status: 500 }
    );
  }
}

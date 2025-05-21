import User from "@/models/user.model";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
await dbConnect();

export async function POST(request) {
  const body = await request.json();
  const { name, email, password } = body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "The email address has been used before!" },
        { status: 200 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name: name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });
    if (!newUser) {
      return NextResponse.json(
        { error: "An error occurred, please try again later!" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: "User Registered Successfully!",
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred, please try again later!" },
      { status: 500 }
    );
  }
}

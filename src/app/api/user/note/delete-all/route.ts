import connectDB from "@/db/dbConfig";
import { decodedCookie } from "@/helpers/decodedCookie";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function DELETE(req: NextRequest) {
  try {
    // Fetching decoded cookie data
    const cookieData = await decodedCookie(req);

    // If cookie data not found, return failed response
    if (!cookieData) {
      return NextResponse.json(
        {
          message: "Please login or signup",
          success: false,
        },
        { status: 400 }
      );
    }

    // Fetching user from db
    const user = await User.findById(cookieData.id);

    // If user not found, return failed response
    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
          success: false,
        },
        { status: 404 }
      );
    }

    // Deleting note from db
    user.trashNotes = [];

    // Saving data
    await user.save();

    // Success response
    return NextResponse.json(
      {
        message: "All notes deleted successfully",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    // If there is an error, return failed response
    console.log(error);

    return NextResponse.json(
      {
        message: "Bad request",
        success: false,
      },
      { status: 400 }
    );
  }
}

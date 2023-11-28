import connectDB from "@/db/dbConfig";
import { decodedCookie } from "@/helpers/decodedCookie";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function DELETE(req: NextRequest, { params }: any) {
  try {
    // Fetching id from params
    const { id } = params;

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

    // Fetching note data from notes array inside User schema
    const trashNotes = user.trashNotes.id(id);

    // If note not found, return failed response
    if (!trashNotes) {
      return NextResponse.json(
        {
          message: "Note not found",
          success: false,
        },
        { status: 404 }
      );
    }

    // Fetching search parameters
    const mode = req.nextUrl.searchParams.get("mode");

    if (!mode || mode === "" || (mode !== "delete" && mode !== "restore")) {
      return NextResponse.json(
        {
          message: "Plese enter mode delete or restore",
          success: false,
        },
        { status: 400 }
      );
    }

    // Deleting note from db
    trashNotes.deleteOne();

    // If search params is restore then it will restore
    if (mode === "restore") {
      const trashNoteData = {
        title: trashNotes.title,
        content: trashNotes.content,
      };
      user.notes.push(trashNoteData);
    }

    // Saving data
    await user.save();

    // Success response
    return NextResponse.json(
      {
        message:
          mode === "delete"
            ? "Note deleted successfully"
            : "Note restored successfully",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    // If there is an error, return failed response
    return NextResponse.json(
      {
        message: "Bad request",
        success: false,
      },
      { status: 400 }
    );
  }
}

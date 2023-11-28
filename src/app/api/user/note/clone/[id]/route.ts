import connectDB from "@/db/dbConfig";
import { decodedCookie } from "@/helpers/decodedCookie";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(req: NextRequest, { params }: any) {
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
    const note = user.notes.id(id);

    // If note not found, return failed response
    if (!note) {
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
    const newId = req.nextUrl.searchParams.get("newid");

    if (!mode || mode === "" || mode !== "clone" || !newId || newId === "") {
      return NextResponse.json(
        {
          message: "Plese enter mode clone and newId",
          success: false,
        },
        { status: 400 }
      );
    }

    // Creating notes object for db
    const newNote = {
      title: note.title,
      content: note.content,
      _id: newId,
    };

    // Add and save note data in db
    user.notes.push(newNote);

    // Saving data
    await user.save();

    // Success response
    return NextResponse.json(
      {
        message: "Note cloned successfully",
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

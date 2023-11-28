import connectDB from "@/db/dbConfig";
import { decodedCookie } from "@/helpers/decodedCookie";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
connectDB();

export async function GET(req: NextRequest, { params }: any) {
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

    // Fetching id from params
    const { id } = params;

    // Fetching user from db
    const user = await User.findById(cookieData?.id);

    // Fetching search parameters
    const mode = req.nextUrl.searchParams.get("mode");

    if (!mode || mode === "" || (mode !== "new" && mode !== "trash")) {
      return NextResponse.json(
        {
          message: "Plese enter mode new or trash",
          success: false,
        },
        { status: 400 }
      );
    }

    // Fetching note data from notes array inside User schema
    const fetchMode = () => {
      if (mode === "new") {
        return user.notes.id(id);
      } else if (mode === "trash") {
        return user.trashNotes.id(id);
      }
    };

    // Success response with noteData
    return NextResponse.json(
      {
        message: "Fetched data successfully",
        success: true,
        noteData: fetchMode(),
      },
      { status: 200 }
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

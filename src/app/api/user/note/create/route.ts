import connectDB from "@/db/dbConfig";
import { decodedCookie } from "@/helpers/decodedCookie";
import User from "@/models/user";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
connectDB();

export async function POST(req: NextRequest) {
  try {
    // Fetching note input from body
    const bodyData = await req.json();
    const { title, content, _id } = bodyData;

    // If data is empty, return failsed response
    if (!title || !content) {
      return NextResponse.json(
        {
          message: "Please enter all fields",
          success: false,
        },
        { status: 400 }
      );
    }

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

    // Creating notes object for db
    const newNote = {
      title,
      content,
      _id: _id || new mongoose.Types.ObjectId(),
    };

    // Add and save note data in db
    user.notes.push(newNote);
    await user.save();

    // Success response
    return NextResponse.json(
      {
        message: "Note created successfully",
        success: true,
      },
      { status: 201 }
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

import connectDB from "@/db/dbConfig";
import type { JWT } from "@/helpers/Interfaces";
import User from "@/models/user";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
connectDB();

export async function POST(req: NextRequest) {
  try {
    // Fetching body data
    const bodyData = await req.json();
    let { email, password } = bodyData;

    // If body data is empty, return failed response
    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Please fill all fields",
          success: false,
        },
        { status: 400 }
      );
    }

    // Converting email in lower case
    email = email.toLowerCase().trim().trimEnd();

    // Finding user from db
    const user = await User.findOne({ email });

    // If no user found, return failed response
    if (!user) {
      return NextResponse.json(
        {
          message: "User not exist",
          success: false,
        },
        { status: 400 }
      );
    }

    // Matching body password to db encrypted password using bcryptjs
    const matchPassword: boolean = await bcryptjs.compare(
      password,
      user.password
    );

    // If not match, return failed response
    if (!matchPassword) {
      return NextResponse.json(
        {
          message: "Invalid details",
          success: false,
        },
        { status: 400 }
      );
    }

    // User data
    const jwtObj: JWT = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    // Encrypting cookie with jwt
    const token: string = jwt.sign(jwtObj, process.env.JWT_SECRET as string);

    // Success response
    const response = NextResponse.json(
      {
        message: "Login successfull",
        success: true,
      },
      { status: 200 }
    );

    // Adding cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
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

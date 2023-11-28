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
    let { name, email, password } = bodyData;

    // If body data is empty, return failed response
    if (!name || !email || !password) {
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

    // If user found, return failed response
    if (user) {
      return NextResponse.json(
        {
          message: "User already exist",
          success: false,
        },
        { status: 400 }
      );
    }

    // Encrypting password using bcryptjs
    const hashedPassword: string = await bcryptjs.hash(password, 10);

    // Creating and saving new user in db
    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
    }).save();

    // User data
    const jwtObj: JWT = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    };

    // Encrypting cookie with jwt
    const token: string = jwt.sign(jwtObj, process.env.JWT_SECRET as string);

    // Success response
    const response = NextResponse.json(
      {
        message: "User created successfully",
        success: true,
      },
      { status: 201 }
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

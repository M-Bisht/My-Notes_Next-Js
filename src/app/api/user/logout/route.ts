import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Fetching cookie
    const hasCookie = req.cookies.get("token");

    // If no cookie found, return failed response
    if (!hasCookie) {
      return NextResponse.json(
        {
          message: "Please login or signup",
          success: false,
        },
        { status: 400 }
      );
    }

    // Success response
    const response = NextResponse.json(
      { message: "Logged out successfully", success: true },
      { status: 200 }
    );

    // Deleting cookie
    response.cookies.delete("token");
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

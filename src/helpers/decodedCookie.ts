import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import type { JWT } from "./Interfaces";

// Function to decode cookie
export async function decodedCookie(req: NextRequest) {
  try {
    const cookieJwtData = req.cookies.get("token")?.value;
    return jwt.verify(
      cookieJwtData as string,
      process.env.JWT_SECRET as string
    ) as JWT;
  } catch (error: any) {
    console.log("Failed to decode cookie", error.message);
  }
}

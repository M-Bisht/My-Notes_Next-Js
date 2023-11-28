import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/signup" || path === "/login";
  const isLoggedIn = request.cookies.get("token");

  if (isLoggedIn && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!isLoggedIn && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/login", "/signup", "/recycle-bin"],
};

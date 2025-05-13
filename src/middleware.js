// File: middleware.js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if the path is protected (requires authentication)
  const isProtectedRoute =
    pathname.startsWith("/shop") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/bookmarks") ||
    pathname.startsWith("/cart") ||
    pathname.startsWith("/invoice") ||
    pathname.startsWith("/search");
  pathname.startsWith("/orders");

  // Check if path is an admin route
  const isAdminRoute = pathname.startsWith("/admin");
  const isCustomerRoute =
    pathname.startsWith("/bookmarks") ||
    pathname.startsWith("/cart") ||
    pathname.startsWith("/orders") ||
    pathname.startsWith("/search") ||
    pathname.startsWith("/shop");

  // Check if path is auth related
  const isAuthRoute =
    pathname.startsWith("/api/auth/signin") ||
    pathname.startsWith("/auth/signup");

  // Get the NextAuth session token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Redirect logic
  if (isProtectedRoute) {
    // If not authenticated, redirect to login
    if (!token) {
      const url = new URL("/api/auth/signin", request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }

    // If admin route but user is not admin, redirect to home
    if (isAdminRoute && token.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (isCustomerRoute && token.role !== "user") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else if (isAuthRoute && token) {
    // If already logged in and trying to access auth pages, redirect to dashboard
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Configure middleware to run only on specific paths
export const config = {
  matcher: [
    // Protected routes
    "/shop/:path*",
    "/admin/:path*",
    "/bookmarks/:path*",
    "/cart/:path*",
    "/invoice/:path*",
    "/search/:path*",
    "/orders/:path*",
    // Auth routes
    "/api/auth/signin",
    "/auth/signup",
  ],
};

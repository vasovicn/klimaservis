import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");
  return new TextEncoder().encode(secret);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login page and login API without auth
  if (
    pathname === "/admin/login" ||
    pathname === "/api/auth/login"
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_token")?.value;

  if (!token) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Niste prijavljeni" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(token, getSecret());
    const role = payload.role as string;

    // /admin/users requires admin role
    if (
      (pathname.startsWith("/admin/users") ||
        pathname.startsWith("/api/admin/users")) &&
      role !== "admin"
    ) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Nemate pristup" }, { status: 403 });
      }
      return NextResponse.redirect(new URL("/admin/schedule", request.url));
    }

    // Pass user info via headers
    const response = NextResponse.next();
    response.headers.set("x-user-id", payload.userId as string);
    response.headers.set("x-user-role", role);
    response.headers.set("x-user-email", payload.email as string);
    return response;
  } catch {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Niste prijavljeni" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

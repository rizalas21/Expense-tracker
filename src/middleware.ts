import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.SECRET_AUTH });
  const url = await req.nextUrl.pathname;
  if (url.includes("/api/register") || url.includes("/api/auth"))
    return NextResponse.next();

  if (!token) return NextResponse.redirect(new URL("/login", req.url));
  // if (token?.id) {
  //   const id = token.id;
  //   const user = await axios.get(`/api/users/${id}`);
  //   if (!user) return NextResponse.redirect(new URL("/login", req.url));
  // }
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("user-id", token.id as string);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/api/:path*", "/categories", "/budgets", "/transactions"],
};

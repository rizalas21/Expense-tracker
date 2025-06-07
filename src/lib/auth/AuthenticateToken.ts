import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export default function AuthenticateToken(req: any) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return NextResponse.json({ message: "Unauthorized" });

  try {
    const verif = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET ?? "");
    req.user = verif;
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }
}

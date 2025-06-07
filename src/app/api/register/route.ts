import { prisma } from "@/app/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body.password, body.password.length);
    if (!body.password || body.password.length <= 8)
      return NextResponse.json("Password must be at least 8 characters long", {
        status: 400,
      });
    const hashPassword = await bcrypt.hash(body.password, 10);
    const checkUser = await prisma.users.findUnique({
      where: { email: body.email },
    });
    const data = { ...body, password: hashPassword };
    if (checkUser)
      return NextResponse.json("Email is already taken", { status: 409 });
    console.log(data, hashPassword);
    const res = await prisma.users.create({ data });
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}

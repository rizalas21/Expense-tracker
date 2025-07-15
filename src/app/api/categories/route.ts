import { prisma } from "@/lib/auth/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get("user-id");
    if (!userId) {
      return NextResponse.json(
        {
          message: "User ID tidak ditemukan di headers",
        },
        { status: 400 }
      );
    }
    const rows = await prisma.categories.findMany({ where: { userId } });
    if (rows.length === 0) {
      return NextResponse.json(
        {
          message: "Users tidak ditemukan",
          data: [],
        },
        { status: 200 }
      );
    }

    console.log("rows back end -> ", rows);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const userId = req.headers.get("user-id");
  if (!userId) {
    return NextResponse.json(
      { message: "User ID tidak ditemukan di headers" },
      { status: 400 }
    );
  }
  const { data } = await req.json();
  console.log("data na bro -> ", data);
  try {
    const existingCategories = await prisma.categories.findFirst({
      where: {
        name: data,
        userId,
      },
    });
    console.log("existing category -> ", existingCategories);
    if (existingCategories)
      return NextResponse.json(
        { message: "Category already exists" },
        { status: 400 }
      );
    const category = await prisma.categories.create({
      data: { name: data, userId: userId as string },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.error("POST Category Error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

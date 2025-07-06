import { prisma } from "@/lib/auth/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const rows = await prisma.categories.findMany();
    if (rows.length === 0) {
      return NextResponse.json(
        {
          message: "Users tidak ditemukan",
          data: [],
        },
        { status: 404 }
      );
    }

    console.log("rows back end -> ", rows);
    return NextResponse.json(rows);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function POST(req: NextRequest) {
  const userId = req.headers.get("user-id");
  const { data } = await req.json();
  console.log("data na bro -> ", data);
  try {
    const existingCategories = await prisma.categories.findFirst({
      where: {
        name: data,
      },
    });
    console.log("existing category -> ", existingCategories);
    if (existingCategories)
      return NextResponse.json({ message: "Category already exists" });
    const category = await prisma.categories.create({
      data: { name: data, userId: userId as string },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

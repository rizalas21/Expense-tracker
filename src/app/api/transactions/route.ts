import { prisma } from "@/lib/auth/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get("user-id");
    if (!userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const rows = await prisma.transactions.findMany({
      where: { userId },
      include: { category: true },
    });

    console.log("rows backend transactions ini teh bro -> ", rows);

    return NextResponse.json(rows);
  } catch (error) {}
}

export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get("user-id");
    if (!userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { data } = await req.json();
    const category = await prisma.categories.findFirst({
      where: { id: data.categoryId },
    });
    console.log("ini category bro -> ", category);
    console.log("data yang di terima => ", data, "tanggal nya bro => ", userId);
    const newDate = new Date(data.date);

    const { categoryId, ...dataWithoutCategoryId } = data;

    const res = await prisma.transactions.create({
      data: {
        ...data,
        date: newDate,
        userId,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(res);
  } catch (error) {
    console.error("POST Transactions Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

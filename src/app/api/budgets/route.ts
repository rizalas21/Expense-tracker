import { prisma } from "@/lib/auth/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const keyword = req.nextUrl.searchParams.get("keyword");
    console.log("keyword nya nihh bro => ", keyword);

    const whereClause = keyword
      ? {
          OR: [
            {
              categoryId: keyword,
            },
          ],
        }
      : {};

    const budgets = await prisma.budgets.findMany({
      where: whereClause,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!budgets.length) {
      return NextResponse.json(
        { message: "No budgets found", data: [] },
        { status: 200 }
      );
    }

    return NextResponse.json({ message: "Success", data: budgets });
  } catch (error) {
    console.error("GET Budgets Error:", error);
    return NextResponse.json(
      {
        message: "Server error",
        error: error instanceof Error ? error.message : "Unexpected error",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get("user-id");
    const data = await req.json();
    console.log("userId -> ", userId, "data nya bos -> ", data);
    const budget = await prisma.budgets.create({
      data: { ...data, userId },
    });
    return NextResponse.json(budget);
  } catch (error) {
    console.error("POST Budgets Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

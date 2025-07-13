import { prisma } from "@/lib/auth/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const categoryId = req.nextUrl.searchParams.get("categoryId");
    const month = req.nextUrl.searchParams.get("month");
    const year = req.nextUrl.searchParams.get("year");
    const userId = req.headers.get("user-id");

    const whereClause: any = {
      userId,
    };

    if (categoryId) whereClause.categoryId = categoryId;
    if (month) whereClause.month = Number(month);
    if (year) whereClause.year = Number(year);

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
    const { data } = await req.json();

    const checkBudget = await prisma.budgets.findFirst({
      where: {
        categoryId: data.categoryId,
        month: data.month,
        year: data.year,
        userId: userId as string,
      },
    });

    console.log("hasil check budget bro -> ", checkBudget);

    if (checkBudget) {
      return NextResponse.json(
        { message: "❌ Budget already exists" },
        { status: 400 }
      );
    }
    console.log("userId -> ", userId, "data nya bos -> ", data);
    const budget = await prisma.budgets.create({
      data: { ...data, userId },
    });

    const category = await prisma.categories.findFirst({
      where: { id: budget.categoryId },
    });
    console.log({
      ...budget,
      categoryName: category?.name || null,
    });
    return NextResponse.json({
      ...budget,
      categoryName: category?.name || null,
    });
  } catch (error) {
    console.error("POST Budgets Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

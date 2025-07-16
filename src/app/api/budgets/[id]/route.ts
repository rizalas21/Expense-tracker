import { prisma } from "@/lib/auth/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/")[3];

    if (!id) {
      return NextResponse.json(
        { error: "Budget ID is required in the URL." },
        { status: 400 }
      );
    }

    const data = await prisma.budgets.findUnique({ where: { id } });
    console.log("masuk sini bro => ", data);

    if (!data) {
      return NextResponse.json(
        { error: `Budget with ID '${id}' not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.log("errornya bro -> ", error);
    console.error("GET /api/budgets/[id] error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while fetching the category.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { error: "Budget ID is required in the URL." },
        { status: 400 }
      );
    }

    const res = await prisma.budgets.delete({ where: { id } });

    return NextResponse.json(res);
  } catch (error) {
    console.log("errornya bro -> ", error);
    console.error("DELETE /api/budgets/[id] error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while fetching the category.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const data = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Budget ID is required in the URL." },
        { status: 400 }
      );
    }

    const res = await prisma.budgets.update({
      where: { id },
      data,
      include: { category: true },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log("errornya bro -> ", error);
    console.error("PUT /api/budgets/[id] error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while fetching the category.",
      },
      { status: 500 }
    );
  }
}

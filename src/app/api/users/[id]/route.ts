import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/auth/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    if (!id) {
      return NextResponse.json(
        { error: "Category ID is required in the URL." },
        { status: 400 }
      );
    }

    const data = await prisma.users.findUnique({ where: { id } });
    if (!data) {
      return NextResponse.json(
        { error: `Category with ID '${id}' not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/categories/[id] error:", error);

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

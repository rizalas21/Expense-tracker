import { prisma } from "@/lib/auth/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/")[3];

    if (!id) {
      return NextResponse.json(
        { error: "Category ID is required in the URL." },
        { status: 400 }
      );
    }

    const data = await prisma.categories.findUnique({ where: { id } });

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

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/")[3];
    const checkCategory = await prisma.categories.findFirst({
      where: {
        id: id,
      },
    });
    if (!checkCategory) return NextResponse.json("Category not found");
    const res = await prisma.categories.delete({
      where: {
        id: id,
      },
    });
    console.log(res);
    return NextResponse.json(res);
  } catch (error) {
    console.log("error be -> ", error);
    return NextResponse.json("gagal hapus bro");
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const { data } = await req.json();
    const res = await prisma.categories.update({
      where: { id },
      data,
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log("error be -> ", error);
    return NextResponse.json("gagal hapus bro");
  }
}

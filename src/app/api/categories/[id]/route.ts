import { prisma } from "@/lib/auth/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("ini req nya bro -> ", req);
  return NextResponse.json("liat console aja");
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/")[3];
    console.log("harusnya id -> ", id);
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

export async function PUT(req: NextRequest) {
  try {
    const { data } = await req.json();
    const res = await prisma.categories.update({
      where: { id: data.id },
      data,
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log("error be -> ", error);
    return NextResponse.json("gagal hapus bro");
  }
}

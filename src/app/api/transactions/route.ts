import { prisma } from "@/lib/auth/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword");
  const category = searchParams.get("category");
  const type = searchParams.get("type");
  const page = searchParams.get("page") || 1;
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const limit = 8;
  const skip = (Number(page) - 1) * limit;

  const where: any = {};

  if (keyword) {
    where.title = {
      contains: keyword,
      mode: "insensitive",
    };
  }

  if (category) {
    where.category = {
      name: {
        contains: category,
        mode: "insensitive",
      },
    };
  }

  if (type) {
    where.type = {
      name: {
        contains: type,
        mode: "insensitive",
      },
    };
  }

  if (startDate || endDate) {
    where.date = {};
    if (startDate) where.date.gte = new Date(startDate);
    if (endDate) where.date.lte = new Date(endDate);
  }

  const total = await prisma.transactions.count({ where });
  const pages = Math.ceil(total / limit);

  const rows = await prisma.transactions.findMany({
    where,
    skip,
    take: limit,
  });

  return NextResponse.json({ data: rows, pages });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log("data be nihh bro -> ", data.user);
  try {
    const row = await prisma.users.findUnique({
      where: {
        email: data?.user,
      },
      select: { id: true },
    });
    console.log(row);
    if (!row) return NextResponse.json("gaada user bro");
    console.log({ data: { ...data, userid: row?.id } });
    const res = await prisma.transactions.create({
      data: {
        ...data,
        user: row?.id,
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

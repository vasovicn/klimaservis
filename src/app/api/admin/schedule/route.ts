import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");
  if (!date) {
    return NextResponse.json({ error: "Datum je obavezan" }, { status: 400 });
  }

  const role = request.headers.get("x-user-role");
  const userId = request.headers.get("x-user-id");

  const serviserWhere = role === "serviser"
    ? { role: "serviser" as const, active: true, id: userId! }
    : { role: "serviser" as const, active: true };

  const servisers = await prisma.user.findMany({
    where: serviserWhere,
    orderBy: { sequence: "asc" },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      phone: true,
      sequence: true,
    },
  });

  let bookings;
  if (role === "serviser") {
    bookings = await prisma.booking.findMany({
      where: { date, userId: userId!, status: { not: "cancelled" } },
      include: { user: { select: { firstName: true, lastName: true } } },
    });
  } else {
    bookings = await prisma.booking.findMany({
      where: { date, status: { not: "cancelled" } },
      include: { user: { select: { firstName: true, lastName: true } } },
    });
  }

  return NextResponse.json({ servisers, bookings });
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateDuration, validateServiceIds } from "@/lib/services";
import { calculateEndTime } from "@/lib/slots";

export async function GET(request: NextRequest) {
  const role = request.headers.get("x-user-role");
  const userId = request.headers.get("x-user-id");
  const showPast = request.nextUrl.searchParams.get("showPast");
  const pastDate = request.nextUrl.searchParams.get("pastDate");

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const where: Record<string, unknown> = {};

  if (role === "serviser") {
    where.userId = userId!;
  }

  if (showPast === "true" && pastDate) {
    where.date = pastDate;
  } else {
    where.date = { gte: todayStr };
  }

  const bookings = await prisma.booking.findMany({
    where,
    include: { user: { select: { firstName: true, lastName: true } } },
    orderBy: [{ date: "asc" }, { startTime: "asc" }],
  });

  return NextResponse.json({ bookings });
}

export async function POST(request: NextRequest) {
  const role = request.headers.get("x-user-role");
  const currentUserId = request.headers.get("x-user-id");
  if (role !== "admin" && role !== "serviser") {
    return NextResponse.json({ error: "Nemate pristup" }, { status: 403 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Neispravan JSON" }, { status: 400 });
  }

  const { services, date, startTime, customerName, customerPhone, customerAddress, userId, customDuration } = body;

  if (!services?.length || !date || !startTime || !customerName || !customerPhone || !customerAddress || !userId) {
    return NextResponse.json({ error: "Sva polja su obavezna" }, { status: 400 });
  }

  // Serviser can only create bookings for themselves
  if (role === "serviser" && userId !== currentUserId) {
    return NextResponse.json({ error: "Možete kreirati termine samo za sebe" }, { status: 403 });
  }

  // Check if "ostalo" is used — allow custom duration
  const hasOstalo = services.includes("ostalo");
  const knownServices = services.filter((s: string) => s !== "ostalo");

  if (knownServices.length > 0 && !validateServiceIds(knownServices)) {
    return NextResponse.json({ error: "Nepoznata usluga" }, { status: 400 });
  }

  let duration: number;
  if (hasOstalo && customDuration && customDuration > 0) {
    // For "ostalo", use customDuration. If mixed with known services, take max.
    const knownDuration = knownServices.length > 0 ? calculateDuration(knownServices) : 0;
    duration = Math.max(knownDuration, customDuration);
  } else if (knownServices.length > 0) {
    duration = calculateDuration(knownServices);
  } else {
    return NextResponse.json({ error: "Izaberite uslugu ili unesite trajanje" }, { status: 400 });
  }

  const endTime = calculateEndTime(startTime, duration);

  const booking = await prisma.booking.create({
    data: {
      customerName,
      customerPhone,
      customerAddress,
      services: JSON.stringify(services),
      duration,
      date,
      startTime,
      endTime,
      userId,
    },
  });

  return NextResponse.json({ booking }, { status: 201 });
}

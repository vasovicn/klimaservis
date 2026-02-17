import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const BUFFER = 30;

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const role = request.headers.get("x-user-role");

  if (role !== "admin") {
    return NextResponse.json({ error: "Nemate pristup" }, { status: 403 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Neispravan JSON" }, { status: 400 });
  }

  const { userId } = body;
  if (!userId) {
    return NextResponse.json({ error: "userId je obavezan" }, { status: 400 });
  }

  const booking = await prisma.booking.findUnique({ where: { id } });
  if (!booking) {
    return NextResponse.json({ error: "Termin nije pronađen" }, { status: 404 });
  }

  // Check if new serviser has overlapping bookings on same date
  const startMin = timeToMinutes(booking.startTime);
  const endMin = timeToMinutes(booking.endTime);

  const existingBookings = await prisma.booking.findMany({
    where: {
      userId,
      date: booking.date,
      status: { not: "cancelled" },
      id: { not: id },
    },
  });

  const hasConflict = existingBookings.some((b) => {
    const bStart = timeToMinutes(b.startTime);
    const bEnd = timeToMinutes(b.endTime);
    return !(endMin + BUFFER <= bStart || startMin >= bEnd + BUFFER);
  });

  if (hasConflict) {
    return NextResponse.json({ available: false });
  }

  return NextResponse.json({ available: true });
}

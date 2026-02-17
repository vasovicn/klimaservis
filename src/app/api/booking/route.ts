import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateDuration, validateServiceIds } from "@/lib/services";
import { assignServiser, calculateEndTime } from "@/lib/slots";

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Neispravan JSON" }, { status: 400 });
  }

  const { services, date, startTime, customerName, customerPhone, customerAddress } = body;

  // Validate required fields
  if (!services?.length || !date || !startTime || !customerName || !customerPhone || !customerAddress) {
    return NextResponse.json(
      { error: "Sva polja su obavezna" },
      { status: 400 }
    );
  }

  if (!validateServiceIds(services)) {
    return NextResponse.json({ error: "Nepoznata usluga" }, { status: 400 });
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Neispravan datum" }, { status: 400 });
  }

  if (!/^\d{2}:\d{2}$/.test(startTime)) {
    return NextResponse.json({ error: "Neispravno vreme" }, { status: 400 });
  }

  const duration = calculateDuration(services);
  const endTime = calculateEndTime(startTime, duration);

  // Find available serviser
  const userId = await assignServiser(date, startTime, endTime);
  if (!userId) {
    return NextResponse.json(
      { error: "Izabrani termin je zauzet" },
      { status: 409 }
    );
  }

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

  return NextResponse.json({ id: booking.id }, { status: 201 });
}

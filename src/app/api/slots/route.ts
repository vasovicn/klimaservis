import { NextRequest, NextResponse } from "next/server";
import { calculateDuration, validateServiceIds } from "@/lib/services";
import { getAvailableSlots } from "@/lib/slots";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const date = searchParams.get("date");
  const servicesParam = searchParams.get("services");

  if (!date || !servicesParam) {
    return NextResponse.json(
      { error: "Potrebni su parametri date i services" },
      { status: 400 }
    );
  }

  // Validate date format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: "Neispravan format datuma" },
      { status: 400 }
    );
  }

  // Validate date is today or future
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const requestDate = new Date(date + "T00:00:00");
  if (requestDate < today) {
    return NextResponse.json(
      { error: "Datum mora biti danas ili u budućnosti" },
      { status: 400 }
    );
  }

  const serviceIds = servicesParam.split(",").filter(Boolean);
  if (!validateServiceIds(serviceIds)) {
    return NextResponse.json(
      { error: "Nepoznata usluga" },
      { status: 400 }
    );
  }

  const duration = calculateDuration(serviceIds);
  const slots = await getAvailableSlots(date, duration);

  return NextResponse.json({ slots });
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Neispravan JSON" }, { status: 400 });
  }

  const data: Record<string, unknown> = {};

  if (body.status !== undefined) {
    if (!["confirmed", "completed", "cancelled"].includes(body.status)) {
      return NextResponse.json({ error: "Neispravan status" }, { status: 400 });
    }

    // Prevent cancelling past bookings
    if (body.status === "cancelled") {
      const existing = await prisma.booking.findUnique({ where: { id } });
      if (existing) {
        const today = new Date();
        const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
        if (existing.date < todayStr) {
          return NextResponse.json({ error: "Ne možete otkazati prošle termine" }, { status: 400 });
        }
      }
    }

    data.status = body.status;
  }

  if (body.customerName !== undefined) data.customerName = body.customerName;
  if (body.customerPhone !== undefined) data.customerPhone = body.customerPhone;
  if (body.customerAddress !== undefined) data.customerAddress = body.customerAddress;
  if (body.services !== undefined) data.services = body.services;
  if (body.startTime !== undefined) data.startTime = body.startTime;
  if (body.endTime !== undefined) data.endTime = body.endTime;
  if (body.date !== undefined) data.date = body.date;
  if (body.duration !== undefined) data.duration = body.duration;
  if (body.userId !== undefined) data.userId = body.userId;

  const booking = await prisma.booking.update({
    where: { id },
    data,
  });

  return NextResponse.json({ booking });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Prevent deleting past bookings
  const existing = await prisma.booking.findUnique({ where: { id } });
  if (existing) {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    if (existing.date < todayStr) {
      return NextResponse.json({ error: "Ne možete obrisati prošle termine" }, { status: 400 });
    }
  }

  const booking = await prisma.booking.update({
    where: { id },
    data: { status: "cancelled" },
  });

  return NextResponse.json({ booking });
}

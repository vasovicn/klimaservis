import { prisma } from "./prisma";

const DAY_START = 7 * 60; // 07:00 in minutes
const DAY_END = 22 * 60; // 22:00 in minutes
const SLOT_INTERVAL = 30; // minutes
const BUFFER = 30; // minutes before and after each booking

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

export function calculateEndTime(startTime: string, duration: number): string {
  return minutesToTime(timeToMinutes(startTime) + duration);
}

export async function getAvailableSlots(
  date: string,
  duration: number
): Promise<string[]> {
  const servisers = await prisma.user.findMany({
    where: { role: "serviser", active: true },
  });

  if (servisers.length === 0) return [];

  const bookings = await prisma.booking.findMany({
    where: { date, status: { not: "cancelled" } },
  });

  const slots: string[] = [];

  for (let slotStart = DAY_START; slotStart + duration <= DAY_END; slotStart += SLOT_INTERVAL) {
    const slotEnd = slotStart + duration;

    // Check if ANY serviser is free for this slot
    const anyFree = servisers.some((serviser) => {
      const serviserBookings = bookings.filter((b) => b.userId === serviser.id);
      return serviserBookings.every((b) => {
        const bStart = timeToMinutes(b.startTime);
        const bEnd = timeToMinutes(b.endTime);
        // Slot must not overlap with booking + buffer
        return slotEnd + BUFFER <= bStart || slotStart >= bEnd + BUFFER;
      });
    });

    if (anyFree) {
      slots.push(minutesToTime(slotStart));
    }
  }

  return slots;
}

export async function assignServiser(
  date: string,
  startTime: string,
  endTime: string
): Promise<string | null> {
  const startMin = timeToMinutes(startTime);
  const endMin = timeToMinutes(endTime);

  const servisers = await prisma.user.findMany({
    where: { role: "serviser", active: true },
    orderBy: { sequence: "asc" },
  });

  const bookings = await prisma.booking.findMany({
    where: { date, status: { not: "cancelled" } },
  });

  for (const serviser of servisers) {
    const serviserBookings = bookings.filter((b) => b.userId === serviser.id);
    const isFree = serviserBookings.every((b) => {
      const bStart = timeToMinutes(b.startTime);
      const bEnd = timeToMinutes(b.endTime);
      return endMin + BUFFER <= bStart || startMin >= bEnd + BUFFER;
    });

    if (isFree) {
      return serviser.id;
    }
  }

  return null;
}

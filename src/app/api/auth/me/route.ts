import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const tokenUser = await getCurrentUser();
  if (!tokenUser) {
    return NextResponse.json({ error: "Niste prijavljeni" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: tokenUser.userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      phone: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Korisnik ne postoji" }, { status: 401 });
  }

  return NextResponse.json({ user });
}

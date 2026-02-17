import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      message: "Online zakazivanje će uskoro biti dostupno. Pozovite nas na 064 078 5469.",
      status: "coming_soon",
    },
    { status: 501 }
  );
}

export async function GET() {
  return NextResponse.json(
    {
      message: "Online zakazivanje će uskoro biti dostupno.",
      status: "coming_soon",
    },
    { status: 501 }
  );
}

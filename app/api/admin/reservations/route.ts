import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json([]);
    }

    const reservations = await prisma.reservation.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return NextResponse.json(
      { error: "Failed to fetch reservations" },
      { status: 500 }
    );
  }
}


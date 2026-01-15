import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const reservationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  date: z.string(),
  time: z.string(),
  partySize: z.string(),
  specialRequests: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "Database not configured. Please set DATABASE_URL environment variable." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const validated = reservationSchema.parse(body);

    const reservation = await prisma.reservation.create({
      data: {
        name: validated.name,
        email: validated.email,
        phone: validated.phone,
        date: new Date(validated.date),
        time: validated.time,
        partySize: parseInt(validated.partySize),
        specialRequests: validated.specialRequests || null,
        status: "pending",
      },
    });

    // In production, send confirmation email here

    return NextResponse.json(
      { message: "Reservation created successfully", reservation },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Error creating reservation:", error);
    return NextResponse.json(
      { error: "Failed to create reservation" },
      { status: 500 }
    );
  }
}


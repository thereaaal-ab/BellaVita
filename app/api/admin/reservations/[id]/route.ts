import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const updateSchema = z.object({
  status: z.enum(["pending", "confirmed", "cancelled"]),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 500 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const validated = updateSchema.parse(body);

    const reservation = await prisma.reservation.update({
      where: { id },
      data: { status: validated.status },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Error updating reservation:", error);
    return NextResponse.json(
      { error: "Failed to update reservation" },
      { status: 500 }
    );
  }
}


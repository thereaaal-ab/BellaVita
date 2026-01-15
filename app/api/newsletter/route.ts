import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = newsletterSchema.parse(body);

    // Check if email already exists
    const existing = await prisma.newsletter.findUnique({
      where: { email: validated.email },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Email already subscribed" },
        { status: 200 }
      );
    }

    await prisma.newsletter.create({
      data: {
        email: validated.email,
        subscribed: true,
      },
    });

    return NextResponse.json(
      { message: "Successfully subscribed to newsletter" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid email", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Error subscribing to newsletter:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}


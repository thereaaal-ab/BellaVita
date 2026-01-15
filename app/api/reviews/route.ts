import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const reviewSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional(),
  rating: z.string(),
  comment: z.string().min(10),
});

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = reviewSchema.parse(body);

    const review = await prisma.review.create({
      data: {
        name: validated.name,
        email: validated.email || null,
        rating: parseInt(validated.rating),
        comment: validated.comment,
        source: "website",
        approved: false, // Require admin approval
      },
    });

    return NextResponse.json(
      { message: "Review submitted successfully", review },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}


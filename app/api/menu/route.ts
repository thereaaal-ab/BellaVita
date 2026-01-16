import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      console.error("DATABASE_URL is not configured in environment variables");
      return NextResponse.json(
        { error: "Database not configured", items: [] },
        { status: 503 }
      );
    }

    const menuItems = await prisma.menuItem.findMany({
      orderBy: [
        { category: "asc" },
        { name: "asc" },
      ],
    });

    // Parse allergens JSON strings
    const items = menuItems.map((item: { allergens: string | null }) => ({
      ...item,
      allergens: item.allergens ? JSON.parse(item.allergens) : [],
    }));

    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching menu:", error);
    // Return error details for debugging
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "Database connection failed",
        items: [] 
      },
      { status: 500 }
    );
  }
}


import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      // Return empty array if database is not configured
      return NextResponse.json([]);
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
    // Return empty array on error instead of 500
    return NextResponse.json([]);
  }
}


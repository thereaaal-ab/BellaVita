import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
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
    return NextResponse.json(
      { error: "Failed to fetch menu" },
      { status: 500 }
    );
  }
}


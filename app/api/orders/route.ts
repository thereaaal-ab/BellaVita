import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const orderSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
    })
  ),
  total: z.number(),
  customerName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = orderSchema.parse(body);

    const order = await prisma.order.create({
      data: {
        customerName: validated.customerName || "Guest",
        email: validated.email || "guest@example.com",
        phone: validated.phone || "",
        items: JSON.stringify(validated.items),
        total: validated.total,
        status: "pending",
      },
    });

    // In production, send confirmation email and process payment here

    return NextResponse.json(
      { message: "Order placed successfully", order },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to place order" },
      { status: 500 }
    );
  }
}


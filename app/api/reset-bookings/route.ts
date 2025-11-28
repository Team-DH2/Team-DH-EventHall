import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Delete all bookings
    const deletedBookings = await prisma.booking.deleteMany({});

    return NextResponse.json({
      message: "All bookings reset successfully",
    });
  } catch (error) {
    console.error("Error resetting bookings:", error);
    return NextResponse.json(
      { error: "Failed to reset bookings" },
      { status: 500 }
    );
  }
}

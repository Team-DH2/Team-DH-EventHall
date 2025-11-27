import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Delete all bookings
    const deletedBookings = await prisma.bookings.deleteMany({});

    // Set all time slots to available
    const updatedSlots = await prisma.time_slots.updateMany({
      where: { is_available: false },
      data: { is_available: true },
    });

    return NextResponse.json({
      message: "All bookings reset successfully",
      deletedBookings: deletedBookings.count,
      availableSlots: updatedSlots.count,
    });
  } catch (error) {
    console.error("Error resetting bookings:", error);
    return NextResponse.json(
      { error: "Failed to reset bookings" },
      { status: 500 }
    );
  }
}

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { slotId } = await req.json();

  if (!slotId) {
    return NextResponse.json({ error: "slotId is required" }, { status: 400 });
  }

  try {
    // Get the slot details first
    const slot = await prisma.time_slots.findUnique({
      where: { id: Number(slotId) },
    });

    if (!slot) {
      return NextResponse.json({ error: "Slot not found" }, { status: 404 });
    }

    if (!slot.is_available) {
      return NextResponse.json(
        { error: "Slot already booked" },
        { status: 400 }
      );
    }

    // Update slot to booked
    const updated = await prisma.time_slots.update({
      where: { id: Number(slotId) },
      data: { is_available: false },
    });

    // Create booking record
    const booking = await prisma.bookings.create({
      data: {
        event_hall_id: slot.event_hall_id,
        booking_date: slot.slot_date || new Date(),
        booking_time: slot.slot_start,
        status: "confirmed",
      },
    });

    return NextResponse.json({
      message: "Slot booked successfully",
      updated,
      booking,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to book slot" }, { status: 500 });
  }
}

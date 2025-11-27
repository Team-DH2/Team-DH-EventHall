
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { slotIds } = await req.json();

  if (!slotIds || !Array.isArray(slotIds) || slotIds.length === 0) {
    return NextResponse.json(
      { error: "slotIds array is required" },
      { status: 400 }
    );
  }

  try {
    // Fetch all slots
    const slots = await prisma.time_slots.findMany({
      where: { id: { in: slotIds } }
    });

    if (slots.length !== slotIds.length) {
      return NextResponse.json(
        { error: "Some slots not found" },
        { status: 404 }
      );
    }

    // Check availability
    const alreadyBooked = slots.filter((s) => !s.is_available);
    if (alreadyBooked.length > 0) {
      return NextResponse.json(
        {
          error: "Some slots are already booked",
          bookedIds: alreadyBooked.map((s) => s.id),
        },
        { status: 400 }
      );
    }

    // Update all slots as booked
    await prisma.time_slots.updateMany({
      where: { id: { in: slotIds } },
      data: { is_available: false },
    });

    // Create bookings for each slot
   const bookingRecords = await prisma.$transaction(
  slots.map((slot) =>
    prisma.bookings.create({
      data: {
        event_hall_id: slot.event_hall_id,

        // Fix booking_date issue
        booking_date: slot.slot_date
          ? new Date(slot.slot_date)
          : new Date(), // fallback to today

        booking_time: slot.slot_start,
        status: "confirmed",
      },
    })
  )
);


    return NextResponse.json({
      message: "All slots booked successfully",
      bookedSlots: slotIds,
      bookings: bookingRecords,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to book multiple slots" },
      { status: 500 }
    );
  }
}

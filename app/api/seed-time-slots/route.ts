import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Get all event halls
    const eventHalls = await prisma.event_halls.findMany();
    console.log(`Found ${eventHalls.length} event halls`);

    if (eventHalls.length === 0) {
      return NextResponse.json(
        { error: "No event halls found. Please add event halls first." },
        { status: 404 }
      );
    }

    // Define time slots (9 AM to 11 PM, 1-hour intervals)
    const timeSlots = [
      { start: "09:00:00", end: "10:00:00" },
      { start: "10:00:00", end: "11:00:00" },
      { start: "11:00:00", end: "12:00:00" },
      { start: "12:00:00", end: "13:00:00" },
      { start: "13:00:00", end: "14:00:00" },
      { start: "14:00:00", end: "15:00:00" },
      { start: "15:00:00", end: "16:00:00" },
      { start: "16:00:00", end: "17:00:00" },
      { start: "17:00:00", end: "18:00:00" },
      { start: "18:00:00", end: "19:00:00" },
      { start: "19:00:00", end: "20:00:00" },
      { start: "20:00:00", end: "21:00:00" },
      { start: "21:00:00", end: "22:00:00" },
      { start: "22:00:00", end: "23:00:00" },
    ];

    let created = 0;
    let existing = 0;

    // Generate next 7 days
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      date.setHours(0, 0, 0, 0);
      dates.push(date);
    }

    // Add time slots for each event hall and each day
    for (const hall of eventHalls) {
      console.log(`Adding time slots for: ${hall.name}`);

      for (const date of dates) {
        for (const slot of timeSlots) {
          // Check if slot already exists
          const existingSlot = await prisma.time_slots.findFirst({
            where: {
              event_hall_id: hall.id,
              slot_date: date,
              slot_start: new Date(`1970-01-01T${slot.start}`),
              slot_end: new Date(`1970-01-01T${slot.end}`),
            },
          });

          if (!existingSlot) {
            await prisma.time_slots.create({
              data: {
                event_hall_id: hall.id,
                slot_date: date,
                slot_start: new Date(`1970-01-01T${slot.start}`),
                slot_end: new Date(`1970-01-01T${slot.end}`),
                is_available: true,
              },
            });
            created++;
          } else {
            existing++;
          }
        }
      }
    }

    return NextResponse.json({
      message: "Time slots seeding completed for 7 days with 1-hour intervals",
      created,
      existing,
      eventHalls: eventHalls.length,
      days: dates.length,
    });
  } catch (error) {
    console.error("Error seeding time slots:", error);
    return NextResponse.json(
      { error: "Failed to seed time slots" },
      { status: 500 }
    );
  }
}

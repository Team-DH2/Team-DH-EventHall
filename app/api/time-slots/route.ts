import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { hallId } = await req.json();
    console.log("Received hallId:", hallId);

    if (!hallId) {
      return NextResponse.json(
        { error: "hallId is required" },
        { status: 400 }
      );
    }

    const slots = await prisma.time_slots.findMany({
      where: { event_hall_id: Number(hallId) },
      orderBy: [{ slot_date: "asc" }, { slot_start: "asc" }],
    });
    console.log(`Found ${slots.length} slots for hall ${hallId}`);

    if (slots.length === 0) {
      return NextResponse.json([]);
    }

    const formatted = slots.map((s) => ({
      id: s.id,
      date: s.slot_date
        ? s.slot_date.toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      time: `${s.slot_start.toTimeString().slice(0, 5)}-${s.slot_end
        .toTimeString()
        .slice(0, 5)}`,
      status: s.is_available ? "sale" : "booked",
    }));
    console.log(
      "Formatted slots with statuses:",
      formatted.filter((f) => f.status === "booked")
    );
    console.log("Total formatted slots:", formatted.length);
    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Error fetching time slots:", error);
    return NextResponse.json(
      { error: "Failed to fetch time slots" },
      { status: 500 }
    );
  }
}

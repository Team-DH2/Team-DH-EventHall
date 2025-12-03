// app/api/bookings/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const event_hall_id = searchParams.get("event_hall_id");
    const date = searchParams.get("date");
    const status = searchParams.get("status");

    // Query conditions
    const filters: any = {};

    if (event_hall_id) filters.hallid = Number(event_hall_id);
    if (status) filters.status = status;
    if (date) filters.date = new Date(date);

    const results = await prisma.booking.findMany({
      where: filters,
      include: {
        event_halls: true,
        hosts: true,
      },
      orderBy: { id: "desc" },
    });

    return NextResponse.json({ bookings: results });
  } catch (error) {
    console.error("GET bookings error:", error);
    return NextResponse.json({ error: "Серверийн алдаа" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log({ body });

    const { hallId, date, type } = body;

    if (!hallId || !date || !type) {
      return NextResponse.json(
        { error: "Танхим, өдөр, цаг шаардлагатай" },
        { status: 400 }
      );
    }

    // AM / PM → эхлэх/дуусах цаг
    let starttime = "";
    let endtime = "";

    if (type === "am") {
      starttime = "08:00";
      endtime = "14:00";
    } else if (type === "pm") {
      starttime = "18:00";
      endtime = "23:00";
    } else {
      starttime = "09:00";
      endtime = "24:00";
    }

    const userId = 1;
    const hostId = 1;

    const booking = await prisma.booking.create({
      data: {
        userid: userId,
        hallid: Number(hallId),
        hostid: hostId,

        ordereddate: new Date(), // захиалга өгсөн огноо
        date: new Date(date),

        starttime,
        endtime,

        status: "pending",
      },
    });

    return NextResponse.json(
      { message: "Захиалга амжилттай хадгалагдлаа", booking },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json({ error: "Серверийн алдаа" }, { status: 500 });
  }
}

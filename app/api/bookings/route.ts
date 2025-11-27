// app/api/bookings/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
// app/api/bookings/route.ts

// GET - All bookings or filtered
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const event_hall_id = searchParams.get("event_hall_id");
    const date = searchParams.get("date");
    const status = searchParams.get("status");

    // Query conditions
    const filters: any = {};

    if (event_hall_id) filters.event_hall_id = Number(event_hall_id);
    if (status) filters.status = status;
    if (date) filters.booking_date = new Date(date);

    const results = await prisma.bookings.findMany({
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

    const { hallId, date, type, eventType, menu, additionalInfo } = body;

    if (!hallId || !date || !type) {
      return NextResponse.json(
        { error: "Танхим, өдөр, цаг шаардлагатай" },
        { status: 400 }
      );
    }

    // AM / PM-ийг бодит цаг болгон хөрвүүлэх:
    const booking_time = type === "am" ? "08:00:00" : "18:00:00"; // хүсвэл өөрчилж болно

    // Шинэ захиалга үүсгэх
    const booking = await prisma.bookings.create({
      data: {
        event_hall_id: Number(hallId),
        host_id: null, // Хэрвээ login хийсэн хүн байвал энд ID тавина
        booking_date: new Date(date),
        booking_time: new Date(`${date}T${booking_time}`),
        event_description: `${eventType ?? ""} | ${menu ?? ""} | ${
          additionalInfo ?? ""
        }`,
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

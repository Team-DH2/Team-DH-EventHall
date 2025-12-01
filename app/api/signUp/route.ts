import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { body } = await request.json();
    const { email, password, phone, name } = body;
    const result = prisma.User.create({
      data: { email, password, phone, name },
    });

    return NextResponse.json({ data: result, message: "working" });
  } catch (error) {
    console.error("Error fetching event user:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch user",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "Date is required" }, { status: 400 });
  }

  const data = {
    "2025-11-27": { am: true, pm: false },
    "2025-11-28": { am: true, pm: true },
    "2025-11-29": { am: false, pm: true },
  }[date] ?? { am: true, pm: true };

  return NextResponse.json(data);
}

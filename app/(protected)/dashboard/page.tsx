"use client";

import { useEffect, useState } from "react";

export default function BookingPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data.bookings));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-5">Таны захиалсан Event hall</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {bookings.slice(0, 1).map((b: any) => (
          <div
            key={b.id}
            className="rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200"
          >
            {/* IMAGE */}
            <img
              src={b.event_halls?.images?.[0] ?? "/placeholder.jpg"}
              alt="hall"
              className="h-48 w-full object-cover"
            />

            {/* CONTENT */}
            <div className="p-4 space-y-3">
              <h2 className="text-xl font-semibold">
                {b.event_halls?.name ?? "Event Hall"}
              </h2>

              {/* DATE & TIME */}
              <div className="flex justify-between text-sm text-gray-600">
                <div>
                  <span className="font-medium">Өдөр:</span>{" "}
                  {new Date(b.booking_date).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium">Цаг:</span>{" "}
                  {new Date(b.booking_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              {/* DESCRIPTION */}
              <p className="text-gray-700 text-sm">{b.event_description}</p>

              {/* STATUS BADGE */}
              <div>
                <span
                  className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${
                      b.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : b.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }
                  `}
                >
                  {b.status}
                </span>
              </div>

              {/* LOCATION */}
              <p className="text-gray-500 text-sm">
                📍 {b.event_halls?.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

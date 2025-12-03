"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function BookingPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data.bookings));
  }, []);
  console.log({ bookings });
  const DeleteBooking = async (id: string | number) => {
    try {
      const response = await fetch("/api/reset-bookings", {
        // таны API замыг зөв тохируулна
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Failed to delete booking:", data.error);
        alert("Failed to delete booking: " + data.error);
        return;
      }

      console.log(data.message);
      alert(data.message);
      setBookings((prev) => prev.filter((booking: any) => booking.id !== id));

      // Хэрэв React state-д bookings байгаа бол шинэчлэх боломжтой:
      // setBookings(prev => prev.filter(booking => booking.id !== id));
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Error deleting booking");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-5">Таны захиалсан Event hall</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {bookings.map((b: any) => (
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
                  <span className="font-medium">Өдөр:</span>
                  {new Date(b.date).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium">Эхлэх цаг:</span> {b.starttime}
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
              <Button onClick={() => DeleteBooking(b.id)}>
                Zahialaga tsutslah
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

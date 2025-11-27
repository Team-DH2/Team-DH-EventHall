"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const EventHallsListing = () => {
  const [eventHalls, setEventHalls] = React.useState<any[]>([]);
  const getEventHallData = async () => {
    try {
      const res = await fetch("/api/event-halls");
      if (!res.ok) {
        console.error("API error:", res.status, res.statusText);
        return;
      }
      const data = await res.json();

      console.log("eventHallsData", data);
      setEventHalls(data.data || []);
    } catch (error) {
      console.error("Error fetching event halls:", error);
    }
  };
  useEffect(() => {
    getEventHallData();
  }, []);

  const router = useRouter();

  const eventHallOnclick = (eventHall: any) => {
    console.log("Clicked event hall:", eventHall);
    if (!eventHall?.id) {
      console.error("Event hall ID is missing:", eventHall);
      return;
    }
    router.push(`/event-halls/${eventHall.id}`);
  };
  return (
    <div className="text-black">
      {eventHalls.map((eventHall) => (
        <div
          key={eventHall.id}
          onClick={() => eventHallOnclick(eventHall)}
          style={{
            cursor: "pointer",
            padding: "10px",
            border: "1px solid #ccc",
            margin: "5px",
          }}
        >
          <p>
            <strong>ID:</strong> {eventHall.id}
          </p>
          <p>
            <strong>Name:</strong> {eventHall.name}
          </p>
        </div>
      ))}
    </div>
  );
};
export default EventHallsListing;

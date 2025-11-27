"use client";
import { useState } from "react";
import { MapPin, Star, Users } from "lucide-react";
import { mockEventHalls } from "./Mock";
import { Button } from "@/components/ui/button";
import EventHallsPage from "./Chat";

export default function EventHalls() {
  const [filteredHalls, setFilteredHalls] = useState(mockEventHalls);

  return (
    <div className="w-full min-h-screen bg-black text-white p-10 flex gap-10 mt-20">
      {/* Filter */}
      <EventHallsPage onFilterChange={setFilteredHalls} />

      {/* Event Halls */}
      <div className="flex flex-wrap gap-8">
        {filteredHalls.map((hall) => (
          <div
            key={hall.id}
            className="w-[300px] h-[500px] bg-neutral-900 rounded-2xl overflow-hidden shadow-xl hover:scale-[1.02] duration-200"
          >
            <img
              className="w-full h-[230px] object-cover"
              src={hall.image}
              alt={hall.name}
            />
            <div className="p-4 flex flex-col gap-3">
              <h2 className="text-xl font-semibold">{hall.name}</h2>

              <div className="flex items-center gap-2 text-gray-400">
                <MapPin size={18} />
                <p>{hall.location}</p>
              </div>

              <div className="flex items-center text-gray-400 justify-between">
                <div className="flex items-center gap-2">
                  <Users size={18} />
                  <p>{hall.capacity} хүн</p>
                </div>
                <div>
                  <p>{hall.price} $</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-yellow-400">
                <Star size={18} />
                <p className="text-white">{hall.rating}</p>
              </div>

              <Button className="mt-6 border py-2 rounded-xl font-semibold hover:bg-white hover:text-black transition-all duration-300">
                Дэлгэрэнгүй
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, Star, Users, SlidersHorizontal } from "lucide-react";

import { mockEventHalls } from "./Mock";
import { Button } from "@/components/ui/button";
import EventHallsPage from "./Chat";

export default function EventHalls() {
  const [filteredHalls, setFilteredHalls] = useState(mockEventHalls);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Close mobile filter overlay when filters are applied
  useEffect(() => {
    if (isFilterOpen) {
      setIsFilterOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredHalls]);

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col md:flex-row gap-8 mt-16 md:mt-27 md:px-10">
      {/* Filter Section */}
      <div className="w-full md:w-70 lg:w-100  shrink-0">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden px-4">
          <Button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700"
          >
            <SlidersHorizontal size={16} />
            Show Filters
          </Button>
        </div>

        {/* Mobile Filter Overlay */}
        {isFilterOpen && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex justify-center items-start pt-24 md:hidden"
            onClick={() => setIsFilterOpen(false)} // Close on overlay click
          >
            <div
              className=" p-6 rounded-lg shadow-lg w-11/12 max-w-sm max-h-[75vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()} // Prevent closing on inner click
            >
              <EventHallsPage onFilterChange={setFilteredHalls} />
            </div>
          </div>
        )}

        {/* Desktop Filter */}
        <div className="hidden md:block sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
          <EventHallsPage onFilterChange={setFilteredHalls} />
        </div>
      </div>

      {/* Event Halls */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 flex-1 px-4 md:px-0 self-start">
        {filteredHalls.map((hall) => (
          <div
            key={hall.id}
            className="w-[calc(50%-0.5rem)] md:w-full lg:w-[calc(33.33%-1rem)] xl:w-[calc(25%-1.125rem)] bg-neutral-900 rounded-2xl overflow-hidden shadow-xl hover:scale-[1.02] transition-transform duration-200 flex flex-col"
          >
            <div className="relative w-full h-56">
              <Image
                src={
                  hall.image ||
                  "https://img.freepik.com/premium-vector/image-icon-design-vector-template_1309674-943.jpg"
                }
                alt={hall.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-4 flex flex-col gap-3 grow">
              <h2 className="text-xl font-semibold">{hall.name}</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin size={18} />
                  <p>{hall.location}</p>
                </div>
                <div className="flex items-center gap-2 text-yellow-400">
                  <Star size={18} />
                  <p className="text-white">{hall.rating}</p>
                </div>
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
              <Button className="mt-auto border py-2 rounded-xl font-semibold hover:bg-white hover:text-black transition-all duration-300">
                Дэлгэрэнгүй
              </Button>
            </div>
          </div>
        ))}
        {filteredHalls.length === 0 && (
          <div className="col-span-full text-center text-neutral-400 py-10">
            <p>No event halls match the current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

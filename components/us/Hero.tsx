"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Users, DollarSign, Star } from "lucide-react";

export const Hero = () => {
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

  return (
    <section className="bg-black text-white w-full min-h-screen flex flex-col justify-start snap-start overflow-hidden py-16 lg:py-24">
      <div className="container mx-auto px-4 text-center">
        {/* Main Hero Text */}
        <h2
          className="font-extrabold text-5xl lg:text-8xl mb-4 animate-fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          Our Featured Event Halls
        </h2>
        <p
          className="max-w-3xl mx-auto text-lg text-blue-600 animate-fade-in-up"
          style={{ animationDelay: "400ms" }}
        >
          Discover a variety of stunning venues perfect for any occasion. From
          grand ballrooms to intimate garden courts, we have the perfect space
          for your next event.
        </p>
      </div>

      {/* Featured Cards Grid */}
      <div className="container mx-auto px-4 mt-12 lg:mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventHalls.slice(0, 6).map((hall, index) => (
            <div
              key={hall.id}
              className="bg-neutral-900 rounded-lg overflow-hidden transform hover:shadow-xl hover:scale-[1.02] transition-transform duration-200"
              style={{ animationDelay: `${600 + index * 100}ms` }}
            >
              <div className="relative h-48 w-full">
                <Image
                  src={
                    hall.images[0] ||
                    "https://via.placeholder.com/400x300?text=No+Image"
                  }
                  alt={hall.name || "Event hall image"}
                  fill={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover opacity-80"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-white">{hall.name}</h3>
                <p className="text-sm text-neutral-400 mt-1">{hall.location}</p>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-neutral-800 text-sm text-neutral-300">
                  <div className="flex items-center gap-1.5" title="Capacity">
                    <Users className="w-4 h-4 text-neutral-400" />
                    <span>{hall.capacity}</span>
                  </div>
                  <div
                    className="flex items-center gap-1.5"
                    title="Hourly Rate"
                  >
                    <DollarSign className="w-4 h-4 text-neutral-400" />
                    <span>{hall.rate}/hr</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="Rating">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{hall.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

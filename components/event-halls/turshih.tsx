import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, MapPin } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-6 bg-[#0d0f16] text-white min-h-screen space-y-10">
      {/* Dashboard Overview */}
      <Card className="bg-[#1a1d29] border border-[#2a2e3d] shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-[#11131b] border border-[#2a2e3d] rounded-2xl p-4">
            <p className="text-sm text-gray-400">Total Upcoming Events</p>
            <h3 className="text-3xl font-bold text-blue-400">12</h3>
          </Card>
          <Card className="bg-[#11131b] border border-[#2a2e3d] rounded-2xl p-4">
            <p className="text-sm text-gray-400">Pending Requests</p>
            <h3 className="text-3xl font-bold text-yellow-400">5</h3>
          </Card>
          <Card className="bg-[#11131b] border border-[#2a2e3d] rounded-2xl p-4">
            <p className="text-sm text-gray-400">Total Booked Revenue</p>
            <h3 className="text-3xl font-bold text-blue-300">$85,000</h3>
          </Card>
        </div>
      </Card>

      {/* Upcoming Events */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* Event Card Example */}
          <Card className="bg-[#1a1d29] border border-[#2a2e3d] rounded-2xl p-5">
            <div className="flex justify-between mb-2">
              <h3 className="text-lg font-semibold">Annual Corporate Gala</h3>
              <span className="text-xs bg-blue-600 px-2 py-1 rounded">
                Confirmed
              </span>
            </div>
            <div className="space-y-2 text-sm text-gray-300">
              <p className="flex items-center gap-2">
                <CalendarDays size={16} /> December 15, 2024
              </p>
              <p className="flex items-center gap-2">
                <Clock size={16} /> 7:00 PM – 11:00 PM
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} /> Grand Ballroom
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Booking Requests */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Booking Requests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <Card className="bg-[#1a1d29] border border-[#2a2e3d] rounded-2xl p-5">
            <h3 className="text-lg font-semibold">Sarah Miller</h3>
            <p className="text-gray-300 text-sm">
              Wedding Reception – January 20, 2025
            </p>

            <div className="flex gap-3 mt-4">
              <Button
                variant="outline"
                className="border-blue-500 text-blue-400"
              >
                Review
              </Button>
              <Button className="bg-blue-600">Approve</Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Right Side Panel (Calendar + Recent Activities) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="bg-[#1a1d29] border border-[#2a2e3d] rounded-2xl p-5">
          <h2 className="text-lg font-semibold mb-3">November 2025</h2>
          <div className="grid grid-cols-7 text-center text-gray-400 text-sm gap-2">
            {"Sun Mon Tue Wed Thu Fri Sat".split(" ").map((d) => (
              <div key={d}>{d}</div>
            ))}
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg ${
                  i + 1 === 19 ? "bg-blue-600 text-white" : "bg-[#11131b]"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activities */}
        <Card className="bg-[#1a1d29] border border-[#2a2e3d] rounded-2xl p-5 xl:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
          <ul className="space-y-4 text-gray-300 text-sm">
            <li>Sarah Miller sent a new booking request – 2 hours ago</li>
            <li>Annual Corporate Gala booking confirmed – 1 day ago</li>
            <li>Reminder: Product Launch Event next week – 3 days ago</li>
            <li>New message from venue manager – 5 days ago</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

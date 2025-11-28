"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import DateForm from "./DateForm";
function generateCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const prevLastDay = new Date(year, month, 0).getDate();

  // ☑️ Sunday=0 → Monday=0 болгох
  const startDay = (firstDay.getDay() + 6) % 7;

  const weeks: { day: number; current: boolean }[][] = [];
  let currentWeek: { day: number; current: boolean }[] = [];

  // ----- ӨМНӨХ САРЫН ӨДРҮҮД -----
  for (let i = 0; i < startDay; i++) {
    currentWeek.push({
      day: prevLastDay - (startDay - 1 - i),
      current: false,
    });
  }

  // ----- Одоогийн сар -----
  for (let d = 1; d <= lastDay.getDate(); d++) {
    currentWeek.push({ day: d, current: true });

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  // ----- ДАРААГИЙН САРЫН ӨДРҮҮД -----
  if (currentWeek.length > 0) {
    let nextDay = 1;
    while (currentWeek.length < 7) {
      currentWeek.push({ day: nextDay++, current: false });
    }
    weeks.push(currentWeek);
  }

  return weeks;
}

export default function BookingCalendar({
  hallId,
}: {
  hallId: number | string;
}) {
  const [bookings, setBookings] = useState<any[]>([]);
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selected, setSelected] = useState<{
    date: string | null;
    type: "am" | "pm" | "udur" | null;
  }>({ date: null, type: null });

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data.bookings));
  }, []);

  const handleSelect = (day: number, type: "am" | "pm" | "udur") => {
    if (!day) return;
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    setSelected({ date: dateStr, type });
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const TimeBox = ({
    label,
    type,
    day,
    disabled = false,
  }: {
    label: string;
    type: "am" | "pm" | "udur";
    day: number;
    disabled?: boolean;
  }) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;

    let isAvailable = true;

    if (!disabled && bookings.length > 0) {
      const dayBookings = bookings.filter(
        (b) => new Date(b.date).toISOString().split("T")[0] === dateStr
      );

      isAvailable = !dayBookings.some((b) => {
        const startHour = parseInt(b.starttime.split(":")[0], 10);
        if (type === "am" && startHour === 8) return true;
        if (type === "udur" && startHour === 9) return true;
        if (type === "pm" && startHour === 18) return true;
        return false;
      });
    }

    isAvailable = isAvailable && !disabled;

    const isSelected = selected.date === dateStr && selected.type === type;

    return !isAvailable ? (
      <div className="text-red-700 w-full rounded-xl border p-3 text-center text-sm font-medium transition-all">
        Захиалгатай
      </div>
    ) : (
      <button
        onClick={() => handleSelect(day, type)}
        disabled={!isAvailable}
        className={`
          w-full rounded-xl border p-3 text-center text-sm font-medium transition-all
          ${
            isSelected
              ? "bg-blue-600 text-white shadow-md scale-[1.02]"
              : "bg-white hover:bg-blue-50"
          }
          ${
            !isAvailable
              ? "opacity-50 cursor-not-allowed border-red-400 text-red-700"
              : "border-gray-300 hover:border-blue-400"
          }
        `}
      >
        {label}
      </button>
    );
  };

  const daysOfWeek = [
    "Даваа",
    "Мягмар",
    "Лхагва",
    "Пүрэв",
    "Баасан",
    "Бямба",
    "Ням",
  ];
  const weeks = generateCalendar(currentYear, currentMonth);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      <div className="w-full md:w-2/3 border-2 rounded-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">
            {currentYear} – {currentMonth + 1} сар
          </h2>
          <div className="flex gap-3 items-center">
            <Button variant="outline" onClick={prevMonth}>
              ‹
            </Button>
            <Button variant="outline" onClick={nextMonth}>
              ›
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 text-center font-semibold text-gray-700 mb-2">
          {daysOfWeek.map((d) => (
            <div key={d} className="text-white">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weeks.map((week, i) => (
            <React.Fragment key={i}>
              {week.map((dayObj, j) => {
                const { day, current } = dayObj;

                // Одоогийн сар биш бол disabled хийж өгнө
                if (!current) {
                  return (
                    <div
                      key={j}
                      className="min-h-[110px] bg-gray-200/60 rounded-xl text-white p-2"
                    >
                      {day}
                    </div>
                  );
                }

                const dateStr = `${currentYear}-${String(
                  currentMonth + 1
                ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

                const isDayBooked = bookings.some(
                  (b) =>
                    new Date(b.date).toISOString().split("T")[0] === dateStr &&
                    parseInt(b.starttime.split(":")[0], 10) === 9
                );

                return (
                  <div
                    key={j}
                    className={`min-h-[110px] border rounded-xl p-2 flex flex-col gap-2 ${
                      isDayBooked ? "bg-red-200" : "bg-gray-50"
                    }`}
                  >
                    <div
                      className={`text-sm font-medium ${
                        isDayBooked ? "text-red-700" : "text-gray-700"
                      }`}
                    >
                      {day}
                    </div>

                    <TimeBox
                      label="Үдээс өмнө"
                      type="am"
                      day={day}
                      disabled={isDayBooked}
                    />
                    <TimeBox
                      label="Үдээс хойш"
                      type="pm"
                      day={day}
                      disabled={isDayBooked}
                    />
                    <TimeBox
                      label="Өдөрөөр нь"
                      type="udur"
                      day={day}
                      disabled={isDayBooked}
                    />
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      <DateForm selected={selected} hallId={hallId} />
    </div>
  );
}

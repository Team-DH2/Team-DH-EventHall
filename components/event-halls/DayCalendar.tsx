"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import DateForm from "./DateForm";

function generateCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0).getDate();
  const startDay = (firstDay.getDay() + 6) % 7;

  const weeks: { day: number; current: boolean }[][] = [];
  let currentWeek: { day: number; current: boolean }[] = [];

  for (let i = 0; i < startDay; i++) {
    currentWeek.push({
      day: prevLastDay - (startDay - 1 - i),
      current: false,
    });
  }

  for (let d = 1; d <= lastDay.getDate(); d++) {
    currentWeek.push({ day: d, current: true });
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

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
  const todayStr = today.toISOString().split("T")[0];

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selected, setSelected] = useState<
    { date: string; type: "am" | "pm" | "udur" }[]
  >([]);

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        const hallBookings = data.bookings.filter(
          (b: any) => b.hallid == hallId
        );
        setBookings(hallBookings);
      });
  }, [hallId]);

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else setCurrentMonth(currentMonth + 1);
  };

  // const prevMonth = () => {
  //   if (currentMonth === 0) {
  //     setCurrentMonth(11);
  //     setCurrentYear(currentYear - 1);
  //   } else setCurrentMonth(currentMonth - 1);
  // };

  // Time Box Component
  const TimeBox = ({
    type,
    day,
    disabled = false,
  }: {
    type: "am" | "pm" | "udur";
    day: number;
    disabled?: boolean;
  }) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;

    const labelMap = {
      am: "08:00 - 12:00",
      pm: "18:00 - 22:00",
      udur: "09:00 - 18:00",
    };

    const label = labelMap[type];
    const isPast = new Date(dateStr).getTime() < new Date(todayStr).getTime();

    // ✨ Check bookings for this exact date
    const dayBookings = bookings.filter(
      (b) => new Date(b.date).toISOString().split("T")[0] === dateStr
    );

    let isAvailable = !isPast;

    if (!disabled && dayBookings.length > 0 && !isPast) {
      const isBooked = dayBookings.some((b) => {
        const startHour = parseInt(b.starttime.split(":")[0], 10);
        return (
          (type === "am" && startHour === 8) ||
          (type === "udur" && startHour === 9) ||
          (type === "pm" && startHour === 18)
        );
      });

      if (isBooked) isAvailable = false;
    }

    const isSelected = selected.some(
      (sel) => sel.date === dateStr && sel.type === type
    );

    const handleSelect = (day: number, type: "am" | "pm" | "udur") => {
      const newDate = `${currentYear}-${String(currentMonth + 1).padStart(
        2,
        "0"
      )}-${String(day).padStart(2, "0")}`;

      setSelected((prev) => {
        const removed = prev.filter((s) => s.date !== newDate);
        return [...removed, { date: newDate, type }];
      });
    };

    if (!isAvailable) {
      return (
        <div className="text-red-700 bg-red-400 w-full rounded-xl border p-2 text-center text-sm font-medium">
          Захиалгатай
        </div>
      );
    }

    return (
      <button
        onClick={() => handleSelect(day, type)}
        disabled={!isAvailable}
        className={`w-full rounded-xl border p-2 text-center text-sm font-medium transition-all
          ${
            isSelected
              ? "bg-blue-600 text-white shadow-md scale-[1.05]"
              : "bg-white hover:bg-blue-50"
          }`}
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
      <div className="w-full md:w-2/3 border-2 rounded-md p-4 bg-neutral-800">
        <div className="flex justify-between items-center mb-4 text-white">
          <h2 className="text-2xl font-bold">
            {currentYear} – {currentMonth + 1} сар
          </h2>
          <div className="flex gap-3 items-center">
            <Button
              variant="outline"
              className="text-black"
              onClick={nextMonth}
            >
              ›
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 text-center font-semibold text-white mb-2">
          {daysOfWeek.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weeks.map((week, i) => (
            <React.Fragment key={i}>
              {week.map((dayObj, j) => {
                const { day, current } = dayObj;

                if (!current) {
                  return (
                    <div
                      key={j}
                      className="min-h-[110px] bg-gray-300 rounded-xl p-2"
                    >
                      {day}
                    </div>
                  );
                }

                const dateStr = `${currentYear}-${String(
                  currentMonth + 1
                ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

                const isPast =
                  new Date(dateStr).getTime() < new Date(todayStr).getTime();

                const dayBookings = bookings.filter(
                  (b) =>
                    new Date(b.date).toISOString().split("T")[0] === dateStr
                );

                const isAmBooked = dayBookings.some(
                  (b) => parseInt(b.starttime.split(":")[0], 10) === 8
                );
                const isPmBooked = dayBookings.some(
                  (b) => parseInt(b.starttime.split(":")[0], 10) === 18
                );
                const isDayBooked = dayBookings.some(
                  (b) => parseInt(b.starttime.split(":")[0], 10) === 9
                );

                const isPartial = isAmBooked || isPmBooked;

                return (
                  <div
                    key={j}
                    className={`min-h-[110px] border rounded-xl p-2 flex flex-col gap-2 
                      ${
                        isPast
                          ? "bg-gray-300"
                          : isDayBooked
                          ? "bg-red-300"
                          : "bg-gray-50"
                      }`}
                  >
                    <div
                      className={`text-sm font-medium ${
                        isPast
                          ? "text-gray-400"
                          : isDayBooked
                          ? "text-red-700"
                          : "text-gray-800"
                      }`}
                    >
                      {day}
                    </div>

                    <TimeBox
                      type="am"
                      day={day}
                      disabled={isDayBooked || isPast}
                    />
                    <TimeBox
                      type="pm"
                      day={day}
                      disabled={isDayBooked || isPast}
                    />
                    <TimeBox
                      type="udur"
                      day={day}
                      disabled={isDayBooked || isPartial || isPast}
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

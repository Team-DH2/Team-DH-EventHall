"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

import DateForm from "./DateForm";

function generateCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const weeks: (number | null)[][] = [];
  let currentWeek: (number | null)[] = [];

  const startDay = firstDay.getDay();
  for (let i = 0; i < startDay; i++) currentWeek.push(null);

  for (let d = 1; d <= lastDay.getDate(); d++) {
    currentWeek.push(d);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null);
    weeks.push(currentWeek);
  }
  return weeks;
}

export default function BookingCalendar({
  hallId,
}: {
  hallId: number | string;
}) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selected, setSelected] = useState<{
    date: string | null;
    type: "am" | "pm" | "udur" | undefined | null;
  }>({ date: null, type: null });
  const [availableTimes, setAvailableTimes] = useState<
    Record<string, { am: boolean; pm: boolean }>
  >({});

  const daysOfWeek = [
    "Ням",
    "Даваа",
    "Мягмар",
    "Лхагва",
    "Пүрэв",
    "Баасан",
    "Бямба",
  ];
  const weeks = generateCalendar(currentYear, currentMonth);

  const handleSelect = (
    day: number,
    type: "am" | "pm" | "udur" | undefined
  ) => {
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
  }: {
    label: string;
    type: "am" | "pm" | "udur" | undefined;
    day: number;
  }) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;

    const dayAvailability = availableTimes[dateStr];
    const isSelected = selected.date === dateStr && selected.type === type;

    const isAvailable =
      type === undefined
        ? dayAvailability
          ? dayAvailability.am && dayAvailability.pm
          : true
        : dayAvailability
        ? dayAvailability[type as "am" | "pm"]
        : true;
    return (
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

        {isSelected && type === "am" && (
          <div className="text-xs text-white mt-1">
            Эхлэх: 08:00 — Дуусах: 14:00
          </div>
        )}

        {type === "pm" && isSelected && (
          <div className="text-xs text-white mt-1">
            Эхлэх: 14:00 — Дуусах: 20:00
          </div>
        )}

        {type === "udur" && isSelected && (
          <div className="text-xs text-white mt-1">
            Эхлэх: 08:00 — Дуусах: 22:00
          </div>
        )}
      </button>
    );
  };

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
            <div className="text-white" key={d}>
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weeks.map((week, i) => (
            <React.Fragment key={i}>
              {week.map((day, j) => (
                <div
                  key={j}
                  className={`min-h-[110px] border rounded-xl p-2 flex flex-col gap-2 ${
                    day ? "bg-gray-50" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`text-sm font-medium ${
                      day ? "text-gray-700" : "text-gray-400"
                    }`}
                  >
                    {day ?? ""}
                  </div>
                  {day && (
                    <>
                      <TimeBox label="Үдээс өмнө" type="am" day={day} />
                      <TimeBox label="Үдээс хойш" type="pm" day={day} />
                      <TimeBox label="Өдөрөөр нь" type="udur" day={day} />
                    </>
                  )}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      <DateForm selected={selected} hallId={hallId} />
    </div>
  );
}

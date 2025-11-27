"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const DateForm = ({
  hallId,
  selected,
}: {
  hallId: string | number;
  selected: any;
}) => {
  const [guestCount, setGuestCount] = useState<number | "">("");
  const [eventType, setEventType] = useState<string>("");
  const [menuType, setMenuType] = useState<string>("");
  const [additionalInfo, setAdditionalInfo] = useState<string>("");
  const router = useRouter();
  const handleSubmit = async () => {
    if (!selected.date) return alert("Өдөр сонгоно уу");
    if (!eventType) return alert("Хүлээн авалтын төрлийг сонгоно уу");
    if (!menuType) return alert("Меню-г сонгоно уу");

    const bookingData = {
      hallId,
      date: selected.date,
      type: selected.type,
      eventType,
      menu: menuType,
      additionalInfo,
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (res.ok)
        alert("Захиалга амжилттай илгээгдлээ"), router.push(`/dashboard`);
      else alert("Алдаа гарлаа");
    } catch (error) {
      console.error(error);
      alert("Серверийн алдаа гарлаа");
    }
  };
  return (
    <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-sm border">
      <h1 className="text-3xl font-bold text-[#0A1633] mb-6">
        Захиалгын хүсэлт
      </h1>

      <div className="mb-4">
        <label className="text-lg font-semibold text-[#0A1633]">
          Захиалгын өдөр
        </label>
        <div className="mt-2 p-4 border rounded-lg bg-gray-50 text-[#0A1633] text-lg">
          {selected.date
            ? `${selected.date} (${selected.type || "Өдөрөөр нь"})`
            : "Өдөр сонгоогүй"}
        </div>
      </div>

      <div className="mb-4">
        <label className="text-lg font-semibold text-[#0A1633]">
          Хүлээн авалтын төрөл
        </label>
        <select
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          className="mt-2 p-4 w-full border rounded-lg text-lg text-[#0A1633] bg-white"
        >
          <option value="">Сонгох</option>
          <option>Үдийн цай</option>
          <option>Хурим</option>
          <option>Тэмдэглэлт өдөр</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="text-lg font-semibold text-[#0A1633]">
          Хүлээн авалтын меню
        </label>
        <select
          value={menuType}
          onChange={(e) => setMenuType(e.target.value)}
          className="mt-2 p-4 w-full border rounded-lg text-lg text-[#0A1633] bg-white"
        >
          <option value="">Сонгох</option>
          <option>Стандарт меню</option>
          <option>Премиум меню</option>
          <option>VIP меню</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="text-lg font-semibold text-[#0A1633]">
          Нэмэлт мэдээлэл
        </label>
        <textarea
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          rows={4}
          className="mt-2 p-4 w-full border rounded-lg text-lg bg-white"
          placeholder="Тусгай шаардлага, нэмэлт хүсэлт..."
        ></textarea>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-4 text-white bg-[#3B5BDB] hover:bg-[#314CC7] rounded-lg text-xl font-semibold transition"
      >
        Илгээх
      </button>
    </div>
  );
};

export default DateForm;

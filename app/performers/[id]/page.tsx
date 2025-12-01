"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaStar, FaEnvelope, FaPhone, FaArrowLeft } from "react-icons/fa";

export default function PerformerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [performer, setPerformer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPerformer();
  }, [params.id]);

  const fetchPerformer = async () => {
    try {
      console.log("Fetching performer with ID:", params.id);
      const res = await fetch(`/api/performers/${params.id}`);
      const data = await res.json();
      setPerformer(data.performer);
    } catch (error) {
      console.error("Error fetching performer:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Боломжтой":
        return "bg-green-600";
      case "Хүлээгдэж байна":
        return "bg-yellow-600";
      case "Захиалагдсан":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Уншиж байна...</div>
      </div>
    );
  }

  if (!performer) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Уран бүтээлч олдсонгүй</h1>
          <button
            onClick={() => router.push("/performers")}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors"
          >
            Буцах
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.push("/performers")}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <FaArrowLeft /> Буцах
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image and Quick Info */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-lg overflow-hidden sticky top-8">
              <div className="relative h-96 bg-gray-800">
                <img
                  src={performer.image || "https://via.placeholder.com/400x600"}
                  alt={performer.name}
                  className="w-full h-full object-cover"
                />
                <div
                  className={`absolute top-4 right-4 ${getAvailabilityColor(
                    performer.availability || "Available"
                  )} text-white px-4 py-2 rounded-full text-sm font-semibold`}
                >
                  {performer.availability || "Боломжтой"}
                </div>
              </div>

              <div className="p-6">
                <h1 className="text-3xl font-bold mb-2">{performer.name}</h1>
                <p className="text-gray-400 mb-4">
                  {performer.performance_type || performer.genre}
                </p>

                {/* Viberate Popularity */}
                <div className="flex items-center gap-2 mb-6">
                  <FaStar className="text-yellow-400 text-xl" />
                  <span className="text-2xl font-semibold">
                    {performer.popularity
                      ? Number(performer.popularity).toLocaleString()
                      : "N/A"}
                  </span>
                  <span className="text-gray-400 text-sm">Viberate</span>
                </div>

                {/* Book Now Button */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors font-semibold text-lg">
                  Захиалах
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-lg p-8">
              {/* About Section */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Танилцуулга</h2>
                <p className="text-gray-300 leading-relaxed">
                  {performer.bio ||
                    "Энэ уран бүтээлчийн талаар мэдээлэл байхгүй байна."}
                </p>
              </section>

              {/* Genre Section */}
              {performer.genre && (
                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Төрөл</h2>
                  <div className="flex flex-wrap gap-2">
                    {performer.genre
                      .split(",")
                      .map((g: string, index: number) => (
                        <span
                          key={index}
                          className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm"
                        >
                          {g.trim()}
                        </span>
                      ))}
                  </div>
                </section>
              )}

              {/* Performance Type */}
              {performer.performance_type && (
                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Тоглолтын төрөл</h2>
                  <p className="text-gray-300">{performer.performance_type}</p>
                </section>
              )}

              {/* Contact Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  Холбоо барих мэдээлэл
                </h2>
                <div className="space-y-4">
                  {performer.contact_email && (
                    <div className="flex items-center gap-3">
                      <FaEnvelope className="text-blue-500 text-xl" />
                      <a
                        href={`mailto:${performer.contact_email}`}
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        {performer.contact_email}
                      </a>
                    </div>
                  )}
                  {performer.contact_phone && (
                    <div className="flex items-center gap-3">
                      <FaPhone className="text-blue-500 text-xl" />
                      <a
                        href={`tel:${performer.contact_phone}`}
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        {performer.contact_phone}
                      </a>
                    </div>
                  )}
                </div>
              </section>

              {/* Additional Details */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Дэлгэрэнгүй</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-gray-400 text-sm mb-1">
                      Боломжтой эсэх
                    </h3>
                    <p className="font-semibold">
                      {performer.availability || "Боломжтой"}
                    </p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-gray-400 text-sm mb-1">Элссэн огноо</h3>
                    <p className="font-semibold">
                      {performer.created_at
                        ? new Date(performer.created_at).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

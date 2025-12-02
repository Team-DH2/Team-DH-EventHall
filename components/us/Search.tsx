"use client";

import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { FaArrowRight } from "react-icons/fa";

export default function SearchFunction() {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Debounce search
  useEffect(() => {
    if (!searchValue) {
      setResults(null);
      return;
    }

    const timeout = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchValue]);

  const handleSearch = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        body: JSON.stringify({ searchValue }),
      });

      const data = await res.json();
      if (data) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
    }

    setLoading(false);
  };

  return (
    <div>
      <Popover
        open={isOpen}
        onOpenChange={() => {
          setIsOpen(false);
        }}
      >
        <PopoverTrigger>
          <Input
            type="text"
            placeholder="Хайх..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full p-3 border rounded-lg text-white"
          />
        </PopoverTrigger>
        <PopoverContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          {loading && <p className="mt-3 text-gray-400">Хайж байна...</p>}
          {results && (
            <div className="mt-4 space-y-6 h-fit max-h-200 overflow-scroll text-black">
              {/* Event Halls */}
              {results?.halls?.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-2 text-black">
                    🏛 Event Halls
                  </h2>
                  <div className="space-y-2">
                    {results.halls.map((hall: any) => (
                      <div
                        key={hall.id}
                        className="p-3 bg-white rounded shadow"
                      >
                        <div className="flex items-center gap-4">
                          <img className="h-15 w-15" src={hall.images[0]}></img>
                          <h3 className="font-semibold">{hall.name}</h3>
                          <Button
                            onClick={() =>
                              router.push(`/event-halls/${hall.id}`)
                            }
                            className="bg-white"
                          >
                            <FaArrowRight color="black" />
                          </Button>
                        </div>

                        <p className="text-sm text-gray-600">{hall.location}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Performers */}
              {results?.performers?.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-2">🎤 Performers</h2>
                  <div className="space-y-2">
                    {results.performers.map((p: any) => (
                      <div key={p.id} className="p-3 bg-white rounded shadow">
                        <h3 className="font-semibold">{p.name}</h3>
                        <p className="text-sm text-gray-600">{p.genre}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hosts */}
              {results?.hosts?.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-2">🎙 Hosts</h2>
                  <div className="space-y-2">
                    {results.hosts.map((h: any) => (
                      <div key={h.id} className="p-3 bg-white rounded shadow">
                        <h3 className="font-semibold">{h.name}</h3>
                        <p className="text-sm text-gray-600">
                          {h.contact_phone}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No results */}
              {results?.halls?.length === 0 &&
                results?.performers?.length === 0 &&
                results?.hosts?.length === 0 && (
                  <p className="text-gray-400">Илэрц олдсонгүй.</p>
                )}
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}

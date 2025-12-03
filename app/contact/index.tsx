"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { TrashIcon } from "lucide-react";

export default function EventHallForm() {
  const [name, setName] = useState("");
  const [hallName, setHallName] = useState("");
  const [location, setLocation] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  // Image нэмэх
  const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImages([...images, file]);
  };

  // Image устгах
  const deleteImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return alert("Email буруу байна!");

    setLoading(true);

    try {
      // Зургуудыг base64 болгон frontend дээр хадгалж явуулна
      const base64Images = await Promise.all(
        images.map(async (img) => {
          const arrayBuffer = await img.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          return `data:${img.type};base64,${buffer.toString("base64")}`;
        })
      );

      const response = await fetch("/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          hallName,
          location,
          number,
          email,
          images: base64Images,
        }),
      });

      const data = await response.json();
      alert(data.message);

      // Амжилттай хадгалагдсаны дараа form-г цэвэрлэх
      setName("");
      setHallName("");
      setLocation("");
      setNumber("");
      setEmail("");
      setImages([]);
    } catch (error) {
      console.log(error);
      alert("Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-neutral-900">
      <div className="p-10 rounded-3xl bg-neutral-800/70 backdrop-blur-2xl w-full max-w-xl space-y-8">
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-linear-to-r from-rose-300 to-purple-300">
          ✨ Event Hall
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            placeholder="Холбоо барих хүний нэр"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Заалны нэр"
            value={hallName}
            onChange={(e) => setHallName(e.target.value)}
          />
          <Textarea
            placeholder="Хаяг / Байршил"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Input
            placeholder="Утас"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <Input
            placeholder="И-мэйл"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Зургууд */}
          <div className="space-y-2">
            {images.map((img, i) => (
              <div key={i} className="flex items-center gap-2">
                <Image
                  src={URL.createObjectURL(img)}
                  alt="image"
                  width={100}
                  height={70}
                  className="rounded-lg"
                />
                <TrashIcon
                  size={20}
                  onClick={() => deleteImage(i)}
                  className="cursor-pointer text-red-500"
                />
              </div>
            ))}
            <Input type="file" accept="image/*" onChange={handleAddImage} />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Илгээж байна..." : "Бүртгэх"}
          </Button>
        </form>

        <div className="text-center text-neutral-300">эсвэл</div>
        <Link href="/home">
          <Button variant="outline" className="w-full">
            🏠 Нүүр хуудас руу буцах
          </Button>
        </Link>
      </div>
    </div>
  );
}

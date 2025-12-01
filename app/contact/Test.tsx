"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function InputBox({ label, placeholder }: any) {
  return (
    <div className="space-y-2">
      <label className="text-neutral-300 font-medium text-sm">{label} *</label>
      <Input
        className="h-12 rounded-xl bg-neutral-700/30 border-neutral-500/40 text-neutral-200"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

function TextareaBox({ label, placeholder }: any) {
  return (
    <div className="space-y-2">
      <label className="text-neutral-300 font-medium text-sm">{label} *</label>
      <Textarea
        className="rounded-xl bg-neutral-700/30 border-neutral-500/40 text-neutral-200"
        placeholder={placeholder}
        rows={3}
        required
      />
    </div>
  );
}

export default function EventHallForm() {
  return (
    <div className="min-h-screen flex items-center justify-center  from-neutral-900 via-neutral-800 to-neutral-900 p-6 gap-10">
      <div className="relative p-1 rounded-3xl bg-linear-to-r from-rose-500/50 via-purple-500/50 to-indigo-500/50 shadow-[0_0_40px_-10px_rgba(255,0,150,0.5)]">
        <div className="bg-neutral-900/70 backdrop-blur-2xl rounded-3xl p-10 w-full max-w-2xl space-y-8">
          <h1 className="text-4xl font-bold text-center bg-linear-to-r from-rose-300 to-purple-300 bg-clip-text text-transparent drop-shadow">
            ✨ Event Hall
          </h1>

          <form className="space-y-6">
            <InputBox label="Холбоо барих хүний нэр" placeholder="Батболд" />
            <InputBox label="Заалны нэр" placeholder="Royal Hall" />
            <TextareaBox label="Хаяг / Байршил" placeholder="УБ, ХУД…" />
            <InputBox label="Холбоо барих утас" placeholder="9999-9999" />
            <InputBox label="И-мэйл хаяг" placeholder="example@gmail.com" />

            <Button className="w-full h-12 rounded-xl bg-linear-to-r from-rose-600 to-purple-600 hover:brightness-110 hover:scale-[1.02] transition-all shadow-xl">
              Бүртгүүлэх
            </Button>
          </form>

          <div className="text-center text-neutral-300">эсвэл</div>

          <Button
            variant="outline"
            className="w-full h-12 rounded-xl text-black text-lg border-neutral-500/40 hover:bg-neutral-700/40 transition"
          >
            🏠 Нүүр хуудас руу
          </Button>
        </div>
      </div>
    </div>
  );
}

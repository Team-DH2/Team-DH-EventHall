"use client";

import { Footer } from "@/components/us/Footer";
import { CarouselMy } from "@/components/us/CarouselMy";
import { Hero } from "@/components/us/Hero";
import { WhyChooseUs } from "@/components/us/WhyChooseUs";

interface Hall {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  vote_average: number;
}

export default function Page() {
  // Sample halls data - replace backdrop_path with your own paths

  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory">
      <CarouselMy />
      <Hero />
      <WhyChooseUs />
      {/* <Footer /> */}
    </main>
  );
}

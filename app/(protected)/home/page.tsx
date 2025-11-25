"use client";

import { Footer } from "@/components/us/Footer";
import { CarouselMy } from "@/components/us/CarouselMy";
import { Hero } from "@/components/us/Hero";

interface Hall {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  vote_average: number;
}

export default function Page() {
  // Sample halls data - replace backdrop_path with your own paths
  const halls: Hall[] = [
    {
      id: 1,
      title: "Grand Ballroom",
      overview:
        "Elegant ballroom with stunning chandeliers and spacious dance floor.",
      backdrop_path:
        "https://wallpapers.com/images/hd/beautiful-nature-and-a-path-c6vstan9nvd7so4m.jpg", // Replace with your image path
      vote_average: 4.8,
    },
    {
      id: 2,
      title: "Riverside Hall",
      overview: "Beautiful venue overlooking the river with modern amenities.",
      backdrop_path:
        "https://www.baltana.com/files/wallpapers-33/Path-Photography-Background-Wallpaper-116652.jpg", // Replace with your image path
      vote_average: 4.9,
    },
    {
      id: 3,
      title: "Crystal Palace",
      overview: "Luxurious wedding venue with crystal decor and garden views.",
      backdrop_path:
        "https://media.istockphoto.com/id/1156310672/photo/vertical-empty-park-path-landscape-background.jpg?s=612x612&w=0&k=20&c=85t-oBY8Ejdb_Ny_fKAaC3ehXwSbHEUxFT7_suwm4EU=", // Replace with your image path
      vote_average: 4.7,
    },
    {
      id: 4,
      title: "Garden Court",
      overview: "Charming outdoor venue perfect for intimate celebrations.",
      backdrop_path:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7xZiAGJYmf5GRiihHxpcD3WeTHVSpfpF7fxto_kEcWAX-40KRiDo3OvY9b_3JW8shuBw&usqp=CAU", // Replace with your image path
      vote_average: 4.6,
    },
    {
      id: 5,
      title: "Urban Lofts",
      overview: "Modern industrial-style venue in the heart of the city.",
      backdrop_path:
        "https://thumbs.dreamstime.com/b/landscape-background-path-urkiola-sunset-139943640.jpg", // Replace with your image path
      vote_average: 4.5,
    },
  ];

  return (
    <>
      <CarouselMy halls={halls} />
      <Hero />
      <Footer />
    </>
  );
}

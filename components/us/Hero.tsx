import React from "react";

export const Hero = () => {
  return (
    <section className="bg-black text-white w-full h-screen flex flex-col justify-start snap-start overflow-hidden">
      <div className="container mx-auto px-4 text-center pt-32">
        <h2
          className="font-extrabold text-6xl md:text-8xl mb-4 animate-fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          Our Featured Event Halls
        </h2>
        <p
          className="max-w-3xl mx-auto text-lg text-blue-200 animate-fade-in-up"
          style={{ animationDelay: "400ms" }}
        >
          Discover a variety of stunning venues perfect for any occasion. From
          grand ballrooms to intimate garden courts, we have the perfect space
          for your next event.
        </p>
      </div>
    </section>
  );
};

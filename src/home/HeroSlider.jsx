import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Typewriter } from "react-simple-typewriter";
import { FaArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "Build Habits, Build Life",
    description: "Small steps every day lead to massive results.",
    image: "https://images.unsplash.com/photo-1564510714747-69c3bc1fab41?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Track Your Progress",
    description: "Stay motivated with daily habit tracking.",
    image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Join the Community",
    description: "See public habits and get inspired.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
  },
];

const HeroSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop
      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      className="relative"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="h-[60vh] md:h-[70vh] flex flex-col items-center justify-center
                       text-white text-center bg-cover bg-center relative"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Content */}
            <div className="relative z-10 max-w-3xl px-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                {activeIndex === index ? (
                  <Typewriter
                    words={[slide.title]}
                    loop={false}
                    cursor
                    cursorStyle="|"
                    typeSpeed={80}
                    deleteSpeed={40}
                    delaySpeed={1500}
                  />
                ) : (
                  slide.title
                )}
              </h2>

              <p className="text-lg md:text-xl mb-6">
                {slide.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex justify-center gap-4">
                <Link
                  to="/add-habit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700
                             rounded-md font-semibold transition"
                >
                  Get Started
                </Link>

                <Link
                  to="/publichabit"
                  className="px-6 py-3 border border-white
                             hover:bg-white hover:text-black
                             rounded-md font-semibold transition"
                >
                  Explore Habits
                </Link>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2
                            animate-bounce text-white/80">
              <FaArrowDown size={22} />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;

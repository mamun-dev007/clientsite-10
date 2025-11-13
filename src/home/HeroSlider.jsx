import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Typewriter } from "react-simple-typewriter";

const slides = [
  {
    title: "Build Habits, Build Life",
    description: "Small steps every day lead to massive results.",
    image: "https://images.unsplash.com/photo-1564510714747-69c3bc1fab41?q=80&w=870&auto=format&fit=crop",
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
      autoplay={{ delay: 4000 }}
      loop={true}
      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="max-w-7xl mx-auto  h-64 md:h-96 flex flex-col items-center justify-center text-white text-center bg-cover bg-center relative"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-3">
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
                  <span>{slide.title}</span>
                )}
              </h2>
              <p className="text-lg md:text-xl">{slide.description}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;

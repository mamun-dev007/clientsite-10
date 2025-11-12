import React from 'react';
import { Swiper, SwiperSlide  } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Typewriter } from "react-simple-typewriter";
const slides = [
  { title: "Build Habits, Build Life", description: "Small steps every day lead to massive results.", bg: "bg-blue-500" },
  { title: "Track Your Progress", description: "Stay motivated with daily habit tracking.", bg: "bg-green-500" },
  { title: "Join the Community", description: "See public habits and get inspired.", bg: "bg-purple-500" },
];

const HeroSlider = () => {
  return (
    <>
      <Swiper
      modules={[Pagination, Autoplay]}  
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      loop={true}
      className="my-8"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className={`${slide.bg} h-64 md:h-96 flex flex-col items-center justify-center text-white text-center`}>
            <h2 className="text-3xl md:text-5xl font-bold mb-3">{<Typewriter
          words={[
            "Build Habits, Build Life",
            "Track Your Progress",
            "Join the Community",
          ]}
          loop={true}
          cursor
          cursorStyle="|"
          typeSpeed={80}
          deleteSpeed={30}
          delaySpeed={1500}
        />}</h2>
            <p className="text-lg md:text-xl">{slide.description}</p>
                       
          </div>
          
        </SwiperSlide>
      ))}
    </Swiper>
    </>
  );
};

export default HeroSlider;


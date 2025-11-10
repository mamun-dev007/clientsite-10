import React from "react";
import HeroSlider from "../home/HeroSlider";
import FeaturedSection from "../home/FeaturedSection";
import WhyBuildHabits from "../home/WhyBuildHabits";
import ExtraSection from "../home/ExtraSection";
// import ExtraSection2 from "../home/HeroSlider";

const Home = () => {
  return (
    <div>
      <HeroSlider />
      <FeaturedSection />
      <WhyBuildHabits />
      <ExtraSection />
      {/* <ExtraSection2 /> */}
    </div>
  );
};

export default Home;

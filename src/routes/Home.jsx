import React from "react";
import HeroSlider from "../home/HeroSlider";
import FeaturedSection from "../home/FeaturedSection";
import WhyBuildHabits from "../home/WhyBuildHabits";
import SuccessStories from "../home/SuccessStories";
// import ExtraSection2 from "../home/HeroSlider";

const Home = () => {
  return (
    <div>
      <HeroSlider></HeroSlider>
      <FeaturedSection></FeaturedSection>
      <WhyBuildHabits></WhyBuildHabits>
      <SuccessStories></SuccessStories> 
    </div>
  );
};

export default Home;

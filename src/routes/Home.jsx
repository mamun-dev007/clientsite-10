import React from "react";
import HeroSlider from "../home/HeroSlider";
import FeaturedSection from "../home/FeaturedSection";
import WhyBuildHabits from "../home/WhyBuildHabits";
import SuccessStories from "../home/SuccessStories";
import Community from "../home/Community";
import Educatonal from "../home/Educatonal";

const Home = () => {
  return (
    <div>
      <HeroSlider></HeroSlider>
      <FeaturedSection></FeaturedSection>
      <WhyBuildHabits></WhyBuildHabits>
      <Educatonal></Educatonal>
      <SuccessStories></SuccessStories> 
      <Community></Community>
    </div>
  );
};

export default Home;

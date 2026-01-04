import React from "react";
import HeroSlider from "../home/HeroSlider";
import FeaturedSection from "../home/FeaturedSection";
import WhyBuildHabits from "../home/WhyBuildHabits";
import SuccessStories from "../home/SuccessStories";
import Community from "../home/Community";
import Educatonal from "../home/Educatonal";
import StatisticsSection from "../home/StatisticsSection";
import DashboardPreview from "../layouts/DashboardPreview";
import HabitInsights from "../home/HabitInsights";
import FAQ from "../home/FAQ";
import Newsletter from "../home/Newsletter";
import FinalCTA from "../home/FinalCTA";

const Home = () => {
  return (
    <div>
      <HeroSlider></HeroSlider>
      <FeaturedSection></FeaturedSection>
      <WhyBuildHabits></WhyBuildHabits>
      <Educatonal></Educatonal>
      <StatisticsSection></StatisticsSection>
      <SuccessStories></SuccessStories>
      <DashboardPreview></DashboardPreview>
      <HabitInsights></HabitInsights>
      <Community></Community>
      <FAQ></FAQ>
      <Newsletter></Newsletter>
      <FinalCTA></FinalCTA>
    </div>
  );
};

export default Home;

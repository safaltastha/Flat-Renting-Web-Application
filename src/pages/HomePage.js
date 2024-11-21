import React from "react";
import FeaturedProperties from "../components/Homepage/FeaturedProperty";
import HeroSection from "../components/Homepage/HeroSection";
import WhyChooseUs from "../components/Homepage/WhyChooseUs";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedProperties />
      <WhyChooseUs />
    </div>
  );
};

export default HomePage;

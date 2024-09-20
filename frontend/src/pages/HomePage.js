import React from "react";
import FeaturedProperties from "./FeaturedProperties";
import HeroSection from "./Homepage/HeroSection";
import WhyChooseUs from "./Homepage/WhyChooseUs";

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

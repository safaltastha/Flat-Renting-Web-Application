import React from "react";
import FeaturedProperties from "./Homepage/FeaturedProperty";
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

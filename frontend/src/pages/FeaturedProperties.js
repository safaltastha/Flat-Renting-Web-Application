import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const FeaturedProperties = () => {
  // Custom Left Arrow Component
  const PrevArrow = ({ onClick }) => {
    return (
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 p-2 bg-purple-600 border-2 border-transparent text-white rounded-full hover:bg-white hover:border-purple-500 hover:text-black"
        onClick={onClick}
      >
        <FaArrowLeft />
      </button>
    );
  };

  // Custom Right Arrow Component
  const NextArrow = ({ onClick }) => {
    return (
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 p-2 bg-purple-600 border-2 border-transparent text-white rounded-full hover:bg-white hover:border-purple-500 hover:text-black"
        onClick={onClick}
      >
        <FaArrowRight />
      </button>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />, // Using the custom right arrow
    prevArrow: <PrevArrow />, // Using the custom left arrow
    responsive: [
      {
        breakpoint: 1024, // Tablet and medium screens
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // Mobile screens
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const properties = [
    {
      id: 1,
      title: "Spacious Apartment",
      location: "New York, USA",
      price: "$2000 / month",
      image: "/images/room4.jpg",
    },
    {
      id: 2,
      title: "Modern Condo",
      location: "Los Angeles, USA",
      price: "$1500 / month",
      image: "/images/room3.jpg",
    },
    {
      id: 3,
      title: "Cozy Flat",
      location: "London, UK",
      price: "$1800 / month",
      image: "/images/room2.jpg",
    },
    {
      id: 4,
      title: "Luxury Villa",
      location: "Miami, USA",
      price: "$5000 / month",
      image: "/images/room.jpg",
    },
  ];
  return (
    <div className="container mx-auto py-8 relative">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Featured Properties
      </h2>
      <Slider {...settings}>
        {properties.map((property) => (
          <div key={property.id} className="px-8 ">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{property.title}</h3>
                <p className="text-gray-600">{property.location}</p>
                <p className="text-indigo-600 font-bold">{property.price}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedProperties;

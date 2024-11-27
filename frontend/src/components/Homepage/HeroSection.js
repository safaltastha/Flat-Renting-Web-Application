import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RiArrowDownSLine } from "react-icons/ri";
import axios from "axios";

const HeroSection = () => {
  // State variables for dropdown selections
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const [inputLocation, setInputLocation] = useState("");

  // Handle search button click
  const handleSearch = async() => {
    console.log("Selected Category:", category);
    console.log("Selected Location:", inputLocation);
    console.log("Selected Price Range:", priceRange);

    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (inputLocation) params.append("locationCity", inputLocation);
    if (priceRange) params.append("priceRange", priceRange);

    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        `http://localhost:3002/properties/search?category=${category}&locationCity=${sanitizedLocation}&priceRange${priceRange}`,

        {
          withCredentials: true,
        }
      );

      const properties = response.data;

      // Navigate to PropertyListing and pass fetched properties in state
      navigate("/properties", { state: { properties } });
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <div>
      {/* Purple Transparent Overlay for large screen*/}
      <div
        className="relative lg:h-screen bg-cover bg-center hidden lg:flex"
        style={{ backgroundImage: "url('/herosection/im1.jpg')" }}
      >
        <div className="absolute hidden  inset-0 lg:flex items-center justify-center p-8">
          <div className="bg-white bg-opacity-40 p-8 rounded-lg shadow-lg w-screen">
            {/* Dropdowns and Search Button */}
            <div className="space-y-4 md:space-y-0 md:flex md:space-x-4">
              {/* Category Dropdown */}
              <div className="relative w-full">
                <select
                  className="block w-full p-2 bg-white text-black rounded-md outline-none ring-0 focus:ring-0 appearance-none"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="Flat">Flat</option>
                  <option value="Room">Room</option>
                  <option value="apartment">Apartment</option>
                </select>

                {/* Custom Dropdown Icon */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <RiArrowDownSLine className="w-5 h-5 text-gray-500" />
                </div>
              </div>

              {/* Location Dropdown */}
              <input
                type="text"
                className="block w-full p-2 bg-white text-black rounded-md placeholder-black focus:outline-none"
                placeholder="Enter Location"
                value={inputLocation}
                onChange={(e) => setInputLocation(e.target.value)}
              />

              {/* Price Range Dropdown */}
              <div className="relative w-full">
                <select
                  className="block w-full p-2 bg-white text-black rounded-md outline-none ring-0 focus:ring-0 appearance-none"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  <option value="" disabled>
                    Select Price Range
                  </option>
                  <option value="5k-10k">5k-10k</option>
                  <option value="10k-15k">10k-15k</option>
                  <option value="15k-20k">15k-20k</option>
                  <option value="20k-25k">20k-25k</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <RiArrowDownSLine className="w-5 h-5 text-gray-500" />
                </div>
              </div>
              {/* Search Button */}
              <button
                className="w-full md:w-auto px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-800"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* 
        for small screen */}
      <div className="flex lg:hidden">
        <section
          className="w-full relative"
          //   className="h-screen bg-cover bg-center w-full flex items-center justify-center"
          //   style={{ backgroundImage: "url('/herosection/im2.jpg')" }}
        >
          <img
            src="/herosection/im1.jpg"
            className="w-full h-[1000px] sm:w-[768px] 
                md:w-[1024px]  
                lg:w-[1280px] 
                xl:w-[1536px] 
                2xl:w-[1920px] md:object-cover"
          />
          <div className="w-[700px]  absolute top-[20%] left-[17%]  ">
            <div className="bg-gray-800 bg-opacity-40  rounded-lg shadow-lg  max-w-2xl p-5 h-[600px]">
              <div className="flex flex-col gap-8 my-12  ">
                {/*Category */}
                <div className="">
                  <label className="text-3xl font-bold text-white">
                    Category{" "}
                    <span className="text-red-600 text-3xl ml-1 "> *</span>
                  </label>
                  <div className="relative">
                    <select
                      className="block w-full h-12 p-2 bg-gray-300 text-black rounded-md outline-none ring-0 focus:ring-0 text-2xl mt-2 appearance-none"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="Flat">Flat</option>
                      <option value="Room">Room</option>
                      <option value="apartment">Apartment</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <RiArrowDownSLine className="w-8 h-8 text-gray-500" />
                    </div>
                  </div>
                </div>

                {/* Input Text Field */}
                <div>
                  <label className="text-3xl font-bold text-white">
                    Location{" "}
                    <span className="text-red-600 text-3xl ml-1 "> *</span>
                  </label>
                  <input
                    type="text"
                    className="block w-full h-12 text-2xl p-2 bg-gray-300 text-black rounded-md placeholder-black"
                    placeholder="Enter Location"
                    value={inputLocation}
                    onChange={(e) => setInputLocation(e.target.value)}
                  />
                </div>

                {/* Price Dropdown */}
                <div>
                  <label className="text-3xl font-bold text-white">
                    Price Range{" "}
                    <span
                      className="text-red-600 text-3xl ml-1
                    "
                    >
                      {" "}
                      *
                    </span>
                  </label>
                  <div className="relative">
                    <select
                      className="block w-full text-2xl h-12  p-2 bg-gray-300 text-black rounded-md outline-none ring-0 focus:ring-0 appearance-none"
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value)}
                    >
                      <option value="" disabled>
                        Select Price Range
                      </option>
                      <option value="5k-10k">5k-10k</option>
                      <option value="10k-15k">10k-15k</option>
                      <option value="15k-20k">15k-20k</option>
                      <option value="20k-25k">20k-25k</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <RiArrowDownSLine className="w-8 h-8 text-gray-500" />
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <div className="flex justify-center my-16">
                  <button className="w-[20%] p-2 h-12 text-2xl bg-purple-600 text-white rounded-md hover:bg-purple-700 flex justify-center items-center gap-3">
                    <span>
                      <FiSearch />
                    </span>{" "}
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HeroSection;

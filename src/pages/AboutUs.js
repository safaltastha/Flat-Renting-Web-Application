import React from "react";
import {
  FaHandsHelping,
  FaThumbsUp,
  FaLightbulb,
  FaHeart,
} from "react-icons/fa";
import { FaCommentDots, FaUsers } from "react-icons/fa";

function AboutUs() {
  return (
    <div className="relative bg-cover bg-center  p-12">
      {/* Content */}
      <div className="relative z-10 ">
        {/* Title */}
        <div className="font-bold text-5xl md:text-3xl underline text-center mb-6">
          About Us
        </div>

        {/* Introduction */}
        <p className="text-center text-4xl lg:text-xl mt-12 md:mt-2 mb-8 leading-relaxed">
          Welcome to Basai Sarai, your premier platform for finding the ideal
          rental property. We are committed to making the process of renting a
          flat as seamless and enjoyable as possible.
        </p>

        {/* Our Mission * */}
        <div className="flex flex-col md:flex-row items-center justify-center p-6 bg-white mb-16 md:mb-2">
          {/* Image Section */}
          <div className="w-full md:w-1/2  flex justify-center">
            <img
              src="/aboutus/mission.jpg"
              alt="Flat Renting Mission"
              className="rounded-lg shadow-lg w-full md:w-auto h-auto object-cover"
            />
          </div>

          {/* Text Section */}
          <div className="w-full md:w-1/2 mt-12 md:mt-2  ">
            <h2 className="text-5xl md:text-2xl mt-8 md:mt-2 font-bold md:mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 text-4xl md:text-xl mt-12  md:mt-2 leading-relaxed">
              At Basai Sarai, our mission is to streamline the rental experience
              for both tenants and landlords. We strive to provide a
              user-friendly platform that simplifies the process of finding and
              listing rental properties.
            </p>
          </div>
        </div>

        {/* Our Vision */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-center p-6 bg-white mb-16 md:mb-2">
          {/* Text Section */}
          <div className="w-full md:w-1/2  ">
            <h2 className="text-5xl md:text-2xl mt-12 md:mt-2 font-bold md:mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600 text-4xl md:text-xl mt-12  md:mt-2 leading-relaxed">
              We envision becoming the leading rental platform by continuously
              enhancing our services and incorporating innovative features. Our
              goal is to foster connections between tenants and landlords,
              making the rental process straightforward and enjoyable for
              everyone.
            </p>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-8 text-center md:text-left">
            <img
              src="/aboutus/vision.jpg"
              alt="Flat Renting vision"
              className="rounded-lg shadow-lg w-full md:w-auto h-auto object-cover"
            />
          </div>
        </div>
        {/* Our Core Values and Principles */}
        <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 py-10 px-4">
          <h2 className="text-5xl md:text-3xl font-bold text-center mb-8 py-6">
            Our Core Values and Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Customer Centricity */}
            <div className="flex items-center bg-white shadow-md rounded-lg p-6 space-x-4">
              <div className="text-7xl md:text-4xl text-blue-500">
                <FaHandsHelping /> {/* Icon for customer care */}
              </div>
              <p className="text-gray-700 p-4 text-4xl md:text-base leading-normal">
                Our customers are at the center of everything we do. We are
                committed to providing seamless rental experiences and ensuring
                satisfaction at every step.
              </p>
            </div>

            {/* Card 2: Trust and Transparency */}
            <div className="flex items-center bg-white shadow-md rounded-lg p-6 space-x-4">
              <div className="text-7xl md:text-4xl text-purple-500">
                <FaThumbsUp /> {/* Icon for trust */}
              </div>
              <p className="text-gray-700 p-4 text-4xl md:text-base leading-normal">
                We believe in building long-term relationships based on trust,
                transparency, and clear communication with both tenants and
                landlords.
              </p>
            </div>

            {/* Card 3: Innovation and Efficiency */}
            <div className="flex items-center bg-white shadow-md rounded-lg p-6 space-x-4">
              <div className="text-7xl md:text-4xl text-yellow-500">
                <FaLightbulb /> {/* Icon for innovation */}
              </div>
              <p className="text-gray-700 p-4 text-4xl md:text-base leading-normal">
                We continuously innovate to offer cutting-edge technology and
                efficient solutions that simplify the flat rental process for
                all parties involved.
              </p>
            </div>

            {/* Card 4: Diversity and Respect */}
            <div className="flex items-center bg-white shadow-md rounded-lg p-6 space-x-4">
              <div className="text-7xl md:text-4xl text-pink-500">
                <FaHeart /> {/* Icon for diversity */}
              </div>
              <p className="text-gray-700 p-4 text-4xl md:text-base leading-normal">
                We value diversity, inclusivity, and respect for everyone,
                ensuring equal opportunities for all renters and property
                owners.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white py-10 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* Who We Are */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="text-purple-500 text-8xl md:text-5xl">
                <FaUsers /> {/* Icon */}
              </div>
              <h3 className="text-3xl md:text-lg font-bold">Who We Are</h3>
              <p className="text-gray-700 text-3xl md:text-lg leading-relaxed">
                Basai Sarai is made up of a dedicated team of real estate and
                technology professionals. We are passionate about creating
                solutions that connect tenants with landlords efficiently. Our
                team works tirelessly to ensure that our platform meets your
                needs and expectations.
              </p>
              <a
                href="/aboutus"
                className="text-purple-500 text-2xl md:text-lg font-medium flex items-center justify-center space-x-1"
              >
                <span>LEARN MORE ABOUT US</span>
                <span>&rarr;</span>
              </a>
            </div>

            {/* Contact Us */}
            <div className="flex flex-col items-center text-center space-y-4 mt-12 md:mt-2">
              <div className="text-purple-500 text-8xl md:text-5xl">
                <FaCommentDots /> {/* Icon */}
              </div>
              <h3 className="text-3xl md:text-lg font-bold">Contact Us</h3>
              <p className="text-gray-700 text-3xl md:text-lg leading-relaxed">
                If you have any questions or need further assistance, please
                don’t hesitate to reach out. We are here to support you and
                ensure that your experience with Basai Sarai is exceptional.
              </p>
              <a
                href="/contactus"
                className="text-purple-500 text-2xl md:text-lg font-medium flex items-center justify-center space-x-1"
              >
                <span>SPEAK TO OUR TEAM</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;

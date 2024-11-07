import React from "react";

function AboutUs() {
  return (
    <div
      className="relative bg-cover bg-center  p-8"
      style={{ backgroundImage: "url('/aboutus/bg.jpg')" }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-70"></div>

      {/* Content */}
      <div className="relative z-10 ">
        {/* Title */}
        <div className="font-bold text-3xl underline text-center mb-6">
          About Us
        </div>

        {/* Introduction */}
        <p className="text-center text-2xl lg:text-xl mb-8">
          Welcome to Basai Sarai, your premier platform for finding the ideal
          rental property. We are committed to making the process of renting a
          flat as seamless and enjoyable as possible.
        </p>
        <div className="flex justify-center">
          <ul className="flex flex-col sm:items-center lg:flex-row lg:justify-center p-8 gap-8">
            <li className="bg-purple-200 rounded-xl  w-[42rem] h-[42rem] md:w-[32rem] md:h-[32rem] lg:w-[18rem] lg:h-[20rem] flex justify-center ">
              <ul className="flex flex-col gap-9 md:gap-6 lg:gap-2 items-center text-[10px]  mt-2 md:mt-4 lg:mt-2">
                <li className="">
                  <img
                    src="/aboutus/mission1.png"
                    width={200}
                    height={200}
                    className="flex md:hidden text-white"
                  ></img>
                  <img
                    src="/aboutus/mission1.png"
                    width={90}
                    height={90}
                    className=" hidden md:flex lg:hidden "
                  ></img>
                  <img
                    src="/aboutus/mission1.png"
                    width={70}
                    height={70}
                    className="hidden lg:flex"
                  ></img>
                </li>
                <li className="text-5xl md:text-3xl lg:text-lg font-bold">
                  Our Mission
                </li>
                <li className="text-4xl  md:text-2xl lg:text-base text-center px-6">
                  At Basai Sarai, our mission is to streamline the rental
                  experience for both tenants and landlords. We strive to
                  provide a user-friendly platform that simplifies the process
                  of finding and listing rental properties.
                </li>
              </ul>
            </li>
            <li className="bg-purple-200 w-[42rem] h-[42rem] md:w-[32rem] md:h-[32rem] lg:w-[22rem] lg:h-[20rem] flex justify-center rounded-xl ">
              <ul className="flex flex-col gap-9 md:gap-6 lg:gap-2 items-center text-[10px]  mt-2 md:mt-10 lg:mt-2">
                <li className="">
                  <img
                    src="/aboutus/vision1.png"
                    width={120}
                    height={120}
                    className="flex md:hidden "
                  ></img>
                  <img
                    src="/aboutus/vision1.png"
                    width={90}
                    height={90}
                    className=" hidden md:flex lg:hidden "
                  ></img>
                  <img
                    src="/aboutus/vision1.png"
                    width={60}
                    height={60}
                    className="hidden lg:flex"
                  ></img>
                </li>
                <li className="text-5xl md:text-3xl lg:text-lg font-bold">
                  Our Vision
                </li>
                <li className="text-4xl  md:text-2xl lg:text-base text-center px-6">
                  We envision becoming the leading rental platform by
                  continuously enhancing our services and incorporating
                  innovative features. Our goal is to foster connections between
                  tenants and landlords, making the rental process
                  straightforward and enjoyable for everyone.
                </li>
              </ul>
            </li>
          </ul>
        </div>
        {/* Our Mission */}
        {/* <div className="mb-8">
          <h2 className=" text-2xl lg:text-xl underline mb-2">Our Mission</h2>
          <p className="text-2xl lg:text-base">
            At Basai Sarai, our mission is to streamline the rental experience
            for both tenants and landlords. We strive to provide a user-friendly
            platform that simplifies the process of finding and listing rental
            properties.
          </p>
        </div> */}

        {/* Who We Are */}
        <div className="mb-8">
          <h2 className=" text-2xl lg:text-xl  underline mb-2">Who We Are</h2>
          <p className="text-2xl lg:text-base">
            Basai Sarai is made up of a dedicated team of real estate and
            technology professionals. We are passionate about creating solutions
            that connect tenants with landlords efficiently. Our team works
            tirelessly to ensure that our platform meets your needs and
            expectations.
          </p>
        </div>

        {/* Our Vision */}
        {/* <div className="mb-8">
          <h2 className=" text-2xl lg:text-xl underline mb-2">Our Vision</h2>
          <p className="text-2xl lg:text-base">
            We envision becoming the leading rental platform by continuously
            enhancing our services and incorporating innovative features. Our
            goal is to foster connections between tenants and landlords, making
            the rental process straightforward and enjoyable for everyone.
          </p>
        </div> */}

        {/* Contact Us */}
        <div className="mb-8">
          <h2 className=" text-2xl lg:text-xl underline mb-2">Contact Us</h2>
          <p className="text-2xl lg:text-base">
            If you have any questions or need further assistance, please don’t
            hesitate to reach out. We are here to support you and ensure that
            your experience with Basai Sarai is exceptional.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;

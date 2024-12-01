import React from "react";
import RoomTest from "../../components/Property/RoomTest";

const WhyChooseUs = () => {
  return (
    <div className="py-12 md:py-4 lg:py-6 bg-[#E0D6F425]">
      <p className="underline text-6xl md:text-4xl lg:text-3xl text-center font-bold">
        Why Choose Us ?
      </p>

      <div className=" py-14 md:py-10 lg:py-7">
        {/* advance search and filter */}
        <div className="flex justify-center ">
          <div className="bg-[#79679A30] text-black w-[42rem] h-[42rem] md:w-[32rem] md:h-[32rem] lg:w-[18rem] lg:h-[18rem] flex justify-center rounded-full">
            <ul className="flex flex-col gap-9 md:gap-6 lg:gap-2 items-center text-[10px] py-5 mt-16 md:mt-10 lg:mt-2">
              <li className="">
                <img
                  src="/whychooseus/advancesearchn.png"
                  width={120}
                  height={120}
                  className="flex md:hidden "
                  alt="searchicon"
                ></img>
                <img
                  src="/whychooseus/advancesearchn.png"
                  width={90}
                  height={90}
                  className=" hidden md:flex lg:hidden "
                ></img>
                <img
                  src="/whychooseus/advancesearchn.png"
                  width={40}
                  height={40}
                  className="hidden lg:flex"
                ></img>
              </li>
              <li className="text-5xl md:text-3xl lg:text-lg font-bold">
                Advanced Search & Filters
              </li>
              <li className="text-4xl  md:text-2xl lg:text-base text-center px-6">
                Our smart search feature allows you to filter properties by
                price, location, amenities, and more, helping you quickly find a
                place that fits your needs.
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center">
          <ul className="flex flex-col sm:items-center lg:flex-row lg:justify-center p-8 gap-8">
            <li className="bg-[#79679A30] text-black w-[42rem] h-[42rem] md:w-[32rem] md:h-[32rem] lg:w-[18rem] lg:h-[18rem] flex justify-center rounded-full">
              <ul className="flex flex-col gap-9 md:gap-6 lg:gap-2 items-center text-[10px] py-5 mt-16 md:mt-10 lg:mt-2">
                <li className="">
                  <img
                    src="/whychooseus/reliable.png"
                    width={120}
                    height={120}
                    className="flex md:hidden "
                  ></img>
                  <img
                    src="/whychooseus/reliable.png"
                    width={90}
                    height={90}
                    className=" hidden md:flex lg:hidden "
                  ></img>
                  <img
                    src="/whychooseus/reliable.png"
                    width={40}
                    height={40}
                    className="hidden lg:flex"
                  ></img>
                </li>
                <li className="text-5xl md:text-3xl lg:text-lg font-bold">
                  Reliable Support
                </li>
                <li className="text-4xl  md:text-2xl lg:text-base text-center px-6">
                  Our dedicated customer support team is always available to
                  assist you with any queries or issues during your flat renting
                  journey.
                </li>
              </ul>
            </li>
            <li className="bg-[#79679A30] text-black w-[42rem] h-[42rem] md:w-[32rem] md:h-[32rem] lg:w-[18rem] lg:h-[18rem] flex justify-center rounded-full">
              <ul className="flex flex-col gap-9 md:gap-6 lg:gap-2 items-center text-[10px] py-5 mt-16 md:mt-10 lg:mt-2">
                <li className="">
                  <img
                    src="/whychooseus/booking.png"
                    width={210}
                    height={210}
                    className="flex md:hidden "
                  ></img>
                  <img
                    src="/whychooseus/booking.png"
                    width={90}
                    height={90}
                    className=" hidden md:flex lg:hidden "
                  ></img>
                  <img
                    src="/whychooseus/booking.png"
                    width={70}
                    height={70}
                    className="hidden lg:flex"
                  ></img>
                </li>
                <li className="text-5xl md:text-3xl lg:text-lg font-bold">
                  Booking request
                </li>
                <li className="text-4xl  md:text-2xl lg:text-base text-center px-6">
                  Booking request Tenants can easily submit booking requests
                  directly through the platform, ensuring a smooth process from
                  inquiry to securing a rental.
                </li>
              </ul>
            </li>
            <li className="bg-[#79679A30] text-black w-[42rem] h-[42rem] md:w-[32rem] md:h-[32rem] lg:w-[18rem] lg:h-[18rem] flex justify-center rounded-full">
              <ul className="flex flex-col gap-9 md:gap-6 lg:gap-2 items-center text-[10px] py-5 mt-16 md:mt-10 lg:mt-2">
                <li className="">
                  <img
                    src="/whychooseus/shifting.png"
                    width={120}
                    height={120}
                    className="flex md:hidden "
                  ></img>
                  <img
                    src="/whychooseus/shifting.png"
                    width={90}
                    height={90}
                    className=" hidden md:flex lg:hidden "
                  ></img>
                  <img
                    src="/whychooseus/shifting.png"
                    width={40}
                    height={40}
                    className="hidden lg:flex  "
                  ></img>
                </li>
                <li className="text-5xl md:text-3xl lg:text-lg font-bold">
                  Shifting Facility
                </li>
                <li className="text-4xl  md:text-2xl lg:text-base text-center px-6">
                  We offer a hassle-free shifting service, making your move to a
                  new flat smooth and stress-free. Whether it’s packing or
                  transportation, we’ve got you covered.
                </li>
              </ul>
            </li>
          </ul>
        </div>
        {/* userfriendly */}
        <div className="flex justify-center">
          <div className="bg-[#79679A30] text-black w-[42rem] h-[42rem] md:w-[32rem] md:h-[32rem] lg:w-[18rem] lg:h-[18rem] flex justify-center rounded-full">
            <ul className="flex flex-col gap-9 md:gap-6 lg:gap-2 items-center text-[10px] py-5 mt-16 md:mt-10 lg:mt-2">
              <li className="">
                <img
                  src="/whychooseus/userfriendly.png"
                  width={120}
                  height={120}
                  className="flex md:hidden "
                ></img>
                <img
                  src="/whychooseus/userfriendly.png"
                  width={90}
                  height={90}
                  className=" hidden md:flex lg:hidden "
                ></img>
                <img
                  src="/whychooseus/userfriendly.png"
                  width={40}
                  height={40}
                  className="hidden lg:flex"
                ></img>
              </li>
              <li className="text-5xl md:text-3xl lg:text-lg font-bold">
                User-Friendly Interface
              </li>
              <li className="text-4xl  md:text-2xl lg:text-base text-center px-6">
                Our platform is designed to be simple and intuitive, making your
                search for a rental property smooth and hassle-free, whether
                you’re on desktop or mobile.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <RoomTest />
    </div>
  );
};

export default WhyChooseUs;

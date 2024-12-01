import React, { useEffect, useRef, useState } from "react";

const WhyChooseUs = () => {
  const [inView, setInView] = useState(false);

  const boxesRef = useRef([]);

  useEffect(() => {
    const options = {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.1, // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Apply the dramatic animation when in view
          entry.target.classList.add(
            "opacity-100",
            "scale-110",

            "translate-y-24"
          );
        } else {
          // Reset the animation when out of view
          entry.target.classList.remove(
            "opacity-100",
            "scale-110",

            "translate-y-24"
          );
        }
      });
    }, options);

    // Attach observer to each box element
    boxesRef.current.forEach((box) => observer.observe(box));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="py-12 md:py-4 lg:py-6 bg-[#E0D6F425] min-h-screen">
      {" "}
      {/* min-height to prevent overlap */}
      <p className="underline text-6xl md:text-4xl lg:text-3xl text-center font-bold">
        Why Choose Us ?
      </p>
      <div className="py-14 md:py-10 lg:py-7 mb-24">
        {" "}
        {/* Added margin-bottom */}
        <div className="flex justify-center">
          <div
            ref={(el) => (boxesRef.current[0] = el)}
            className="bg-[#79679A30] text-black w-[42rem] h-[42rem] md:w-[32rem] md:h-[32rem] lg:w-[18rem] lg:h-[18rem] flex justify-center rounded-full opacity-0 transform translate-y-24 transition-all duration-1000 ease-out"
          >
            <ul className="flex flex-col gap-9 md:gap-6 lg:gap-2 items-center text-[10px] py-5 mt-16 md:mt-10 lg:mt-2">
              <li>
                <img
                  src="/whychooseus/advancesearchn.png"
                  width={120}
                  height={120}
                  className="flex md:hidden"
                  alt="searchicon"
                ></img>
                <img
                  src="/whychooseus/advancesearchn.png"
                  width={90}
                  height={90}
                  className="hidden md:flex lg:hidden"
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
              <li className="text-4xl md:text-2xl lg:text-base text-center px-3">
                Our smart search feature allows you to filter properties by
                price, location, and category helping you quickly find a place
                that fits your needs.
              </li>
            </ul>
          </div>
        </div>
        <div>
          <ul className="flex flex-col sm:items-center lg:flex-row lg:justify-center p-8 gap-8">
            <li
              ref={(el) => (boxesRef.current[1] = el)}
              className="bg-[#79679A30] text-black w-[42rem] h-[42rem] md:w-[32rem] md:h-[32rem] lg:w-[18rem] lg:h-[18rem] flex justify-center rounded-full opacity-0 transform translate-y-24 transition-all duration-1000 ease-out"
            >
              <ul className="flex flex-col gap-9 md:gap-6 lg:gap-2 items-center text-[10px] py-5 mt-16 md:mt-10 lg:mt-2">
                <li>
                  <img
                    src="/whychooseus/reliable.png"
                    width={120}
                    height={120}
                    className="flex md:hidden"
                  ></img>
                  <img
                    src="/whychooseus/reliable.png"
                    width={90}
                    height={90}
                    className="hidden md:flex lg:hidden"
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
                <li className="text-4xl md:text-2xl lg:text-base text-center px-3">
                  Our dedicated customer support team is always available to
                  assist you with any queries or issues during your flat renting
                  journey.
                </li>
              </ul>
            </li>

            <li
              ref={(el) => (boxesRef.current[2] = el)}
              className="bg-[#79679A30] text-black w-[42rem] h-[42rem] md:w-[32rem] md:h-[32rem] lg:w-[18rem] lg:h-[18rem] flex justify-center rounded-full opacity-0 transform translate-y-24 transition-all duration-1000 ease-out"
            >
              <ul className="flex flex-col gap-9 md:gap-6 lg:gap-2 items-center text-[10px] py-5 mt-16 md:mt-10 lg:mt-2">
                <li>
                  <img
                    src="/whychooseus/booking.png"
                    width={210}
                    height={210}
                    className="flex md:hidden"
                  ></img>
                  <img
                    src="/whychooseus/booking.png"
                    width={90}
                    height={90}
                    className="hidden md:flex lg:hidden"
                  ></img>
                  <img
                    src="/whychooseus/booking.png"
                    width={70}
                    height={70}
                    className="hidden lg:flex"
                  ></img>
                </li>
                <li className="text-5xl md:text-3xl lg:text-lg font-bold">
                  Booking Request
                </li>
                <li className="text-4xl md:text-2xl lg:text-base text-center px-3">
                  Tenants can easily submit booking requests directly through
                  the platform, ensuring a smooth process from inquiry to
                  securing a rental.
                </li>
              </ul>
            </li>

            <li
              ref={(el) => (boxesRef.current[3] = el)}
              className="bg-[#79679A30] text-black w-[42rem] h-[42rem] md:w-[32rem] md:h-[32rem] lg:w-[18rem] lg:h-[18rem] flex justify-center rounded-full opacity-0 transform translate-y-24 transition-all duration-1000 ease-out"
            >
              <ul className="flex flex-col gap-9 md:gap-6 lg:gap-2 items-center text-[10px] py-5 mt-16 md:mt-10 lg:mt-2">
                <li>
                  <img
                    src="/whychooseus/shifting.png"
                    width={120}
                    height={120}
                    className="flex md:hidden"
                  ></img>
                  <img
                    src="/whychooseus/shifting.png"
                    width={90}
                    height={90}
                    className="hidden md:flex lg:hidden"
                  ></img>
                  <img
                    src="/whychooseus/shifting.png"
                    width={40}
                    height={40}
                    className="hidden lg:flex"
                  ></img>
                </li>
                <li className="text-5xl md:text-3xl lg:text-lg font-bold">
                  Shifting Facility
                </li>
                <li className="text-4xl md:text-2xl lg:text-base text-center px-3">
                  We offer a hassle-free shifting service, making your move to a
                  new flat smooth and stress-free. Whether it’s packing or
                  transportation, we’ve got you covered.
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="flex justify-center">
          <div
            ref={(el) => (boxesRef.current[4] = el)}
            className="bg-[#79679A30] text-black w-[42rem] h-[42rem] md:w-[32rem] md:h-[32rem] lg:w-[18rem] lg:h-[18rem] flex justify-center rounded-full opacity-0 transform translate-y-24 transition-all duration-1000 ease-out"
          >
            <ul className="flex flex-col gap-9 md:gap-6 lg:gap-2 items-center text-[10px] py-5 mt-16 md:mt-10 lg:mt-2">
              <li>
                <img
                  src="/whychooseus/userfriendly.png"
                  width={120}
                  height={120}
                  className="flex md:hidden"
                  alt="searchicon"
                ></img>
                <img
                  src="/whychooseus/userfriendly.png"
                  width={90}
                  height={90}
                  className="hidden md:flex lg:hidden"
                ></img>
                <img
                  src="/whychooseus/userfriendly.png"
                  width={40}
                  height={40}
                  className="hidden lg:flex"
                ></img>
              </li>
              <li className="text-5xl md:text-3xl lg:text-lg font-bold">
                User Friendly
              </li>
              <li className="text-4xl md:text-2xl lg:text-base text-center px-3">
                Our platform is designed to be intuitive and easy to use,
                ensuring a seamless experience for both tenants and landlords.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;

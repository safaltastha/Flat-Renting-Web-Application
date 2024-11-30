import React from "react";
import { CiMail } from "react-icons/ci";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { TbCircleLetterC } from "react-icons/tb";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto flex flex-col   justify-center justify-items-center lg:flex-row gap-6">
        {/* 1st Column - 40% Width */}
        <div className="lg:w-[40%] px-4">
          <ul>
            <li className="flex justify-center lg:hidden">
              <img
                src="/logo/nobg.png"
                alt="Basai Sarai"
                className="w-40 h-40 "
              />
            </li>
            <li className="hidden lg:flex">
              <img
                src="/logo/nobg.png"
                alt="Basai Sarai"
                className="w-20 h-20 "
              />
            </li>
            <li>
              <p className="text-3xl  lg:text-sm  text-justify">
                Basai Sarai is a web-based platform that streamlines the rental
                process for landlords and tenants. It simplifies property
                listing, enables quick contact with potential tenants, and
                offers a user-friendly interface for searching properties based
                on location and price range.
              </p>
            </li>
          </ul>
        </div>
        {/* 2nd Column - 20% Width */}
        <div className="lg:w-[20%] px-4 ">
          <ul className="flex flex-col gap-2 ">
            <li className="font-bold text-2xl lg:text-base ">Useful Links</li>
            <li className="flex flex-col gap-2 text-2xl lg:text-base ">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/terms">Terms and Conditions</Link>
              </li>
            </li>
          </ul>
        </div>
        {/* 3rd Column - 20% Width */}
        <div className="lg:w-[20%] px-4">
          <ul className="flex flex-col gap-2">
            <li className="font-bold text-2xl lg:text-base ">Properties</li>
            <li className="flex flex-col gap-2 text-2xl lg:text-base">
              <li>
                <Link to="/">Flat</Link>
              </li>
              <li>
                <Link to="/contact">Room</Link>
              </li>
              <li>
                <Link to="/about">Office Space</Link>
              </li>
              <li>
                <Link to="/terms">Shutters</Link>
              </li>
            </li>
          </ul>
        </div>

        {/* 4th Column - 20% Width */}
        <div className="lg:w-[20%] px-4 ">
          <ul className="flex flex-col gap-2 text-2xl lg:text-base ">
            <li className="font-bold">Contact</li>
            <li className="flex flex-col gap-2">
              <li className="flex items-center gap-2">
                <span>
                  <IoLocationOutline />
                </span>
                Pokhara,Ranipuwa
              </li>
              <li className="flex items-center gap-2">
                <span>
                  <CiMail />
                </span>
                <a
                  href="mailto:basaisarai@example.com"
                  className="hover:underline"
                >
                  basaisarai@example.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>
                  <FiPhone />
                </span>
                <a href="+977 9801010101" className="hover:underline">
                  +977 9801010101
                </a>
              </li>
            </li>
          </ul>
        </div>
      </div>
      <div className=" mt-6 sm:mt-12 text-start sm:text-center px-0  sm:px-6 lg:px-8 ">
        <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-0   sm:gap-4 md:gap-12  text-xs  sm:text-sm">
          <ul className="flex flex-col sm:flex-row gap-x-1 min-[331px]:gap-x-3 text-xl lg:text-base">
            <li className="flex mb-2">
              <p className="flex items-center">
                <TbCircleLetterC />{" "}
              </p>
              <span>Copyright</span>
            </li>

            <li className="mb-2">Basai Sarai</li>
            <li className="mb-2 ">All Rights Reserved</li>
          </ul>
          <ul className="flex flex-col sm:flex-row gap-0 sm:gap-3  text-xl lg:text-base">
            <li className="mb-2">
              <Link to="#">Privacy policy</Link>
            </li>
            <li className="mb-2">
              <Link to="termsConditions">Service terms</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

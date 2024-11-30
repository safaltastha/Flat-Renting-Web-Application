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
      <div className="container max-w-[1600px] flex flex-col   justify-center justify-items-center lg:flex-row gap-6">
        {/* 1st Column - 40% Width */}
        <div className="lg:w-[40%] px-4">
          <ul>
            <li className="flex  lg:hidden">
              <img
                src="/logo/nobg.png"
                alt="Basai Sarai"
                className="w-52 h-52 "
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
              <p className="text-4xl  lg:text-sm  text-justify text-center px-4 lg:px-1 ">
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
        <div className="lg:w-[20%] px-8  lg:px-4">
          <ul className="flex flex-col gap-4 lg:gap-2 ">
            <li className="font-bold text-4xl lg:text-base ">Useful Links</li>
            <li className="flex flex-col gap-2 text-3xl lg:text-base ">
              <li>
                <Link
                  to="/"
                  className={`block   hover:text-purple-500 font-semibold
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/contactus"
                  className={`block hover:text-purple-500  font-semibold
                  }`}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutus"
                  className={`block hover:text-purple-500 font-semibold
                  }`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className={`block hover:text-purple-500 font-semibold
                  }`}
                >
                  Terms and Conditions
                </Link>
              </li>
            </li>
          </ul>
        </div>
        {/* 3rd Column - 20% Width */}
        <div className="lg:w-[20%]  px-8  lg:px-4">
          <ul className="flex flex-col gap-2">
            <li className="font-bold text-3xl lg:text-base ">Properties</li>
            <li className="flex flex-col gap-2 text-3xl lg:text-base">
              <li>
                <Link
                  to="/"
                  className={`block hover:text-purple-500 font-semibold
                  }`}
                >
                  Flat
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`block hover:text-purple-500 font-semibold
                  }`}
                >
                  Room
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`block hover:text-purple-500 font-semibold
                  }`}
                >
                  Office Space
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className={`block hover:text-purple-500 font-semibold
                  }`}
                >
                  Shutters
                </Link>
              </li>
            </li>
          </ul>
        </div>

        {/* 4th Column - 20% Width */}
        <div className="lg:w-[20%]  px-8  lg:px-4 ">
          <ul className="flex flex-col gap-2 text-3xl lg:text-base ">
            <li className="font-bold">Contact</li>
            <li className="flex flex-col gap-2">
              <li className="flex items-center gap-2">
                <span>
                  <IoLocationOutline style={{ color: "purple" }} size={20} />
                </span>
                Pokhara, Ranipuwa
              </li>

              <li className="flex items-center gap-2">
                <span>
                  <CiMail style={{ color: "purple" }} size={20} />
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
                  <FiPhone style={{ color: "purple" }} size={20} />
                </span>
                <a href="+977 9801010101" className="hover:underline">
                  +977 9801010101
                </a>
              </li>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center px-8">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-0 sm:gap-4 md:gap-12 text-xs sm:text-sm">
          <ul className="flex flex-row gap-x-1 sm:gap-x-3 text-2xl lg:text-base">
            <li className="flex items-center mb-2">
              <p className="flex items-center">
                <TbCircleLetterC />
              </p>
              <span>Copyright</span>
            </li>
            <li className="mb-2">Basai Sarai</li>
            <li className="mb-2">All Rights Reserved</li>
          </ul>
          {/* <ul className="flex flex-row gap-3 text-xl lg:text-base">
            <li className="mb-2">
              <Link to="#">Privacy policy</Link>
            </li>
            <li className="mb-2">
              <Link to="termsConditions">Service terms</Link>
            </li>
          </ul> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

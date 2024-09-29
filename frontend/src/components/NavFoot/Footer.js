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
    <div className="sm:w-full bg-[#CDC6DB] py-2 md:py-3 lg:py-10   ">
      <div className="flex justify-center  ">
        <div className=" pb-8  container max-w-[1600px] w-full px-4  ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  ">
            <div>
              <ul className="flex flex-col gap-3">
                <Link to="/">
                  <div>
                    <li className="flex items-center gap-2">
                      <img
                        src="/logo/nobg.png"
                        alt="Basai Sarai"
                        className="w-8 h-8"
                      />
                    </li>
                  </div>
                </Link>
                <li>
                  <p className="text-xs md:text-sm text-justify">
                    Basai Sarai is a web-based platform that streamlines the
                    rental process for landlords and tenants. It simplifies
                    property listing, enables quick contact with potential
                    tenants, and offers a user-friendly interface for searching
                    properties based on location and price range.
                  </p>
                </li>
              </ul>
              <div className="mt-8">
                <p className="font-semibold text-base md:text-lg">
                  Social Links
                </p>
                <ul className="flex gap-3 mt-2">
                  <li>
                    <FaTwitter className="text-[#4F0941]" />
                  </li>
                  <li>
                    <FaFacebookF className="text-[#4F0941]" />
                  </li>
                  <li>
                    <FaInstagram className="text-[#4F0941]" />
                  </li>
                  <li>
                    <FaLinkedin className="text-[#4F0941]" />
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <div className="">
                <div className="flex justify-start md:justify-center">
                  <p className="font-semibold text-base md:text-lg mb-2">
                    Useful Links
                  </p>
                </div>
                <div className="flex justify-start md:justify-center">
                  <ul className="flex  flex-col gap-2 text-xs md:text-sm">
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
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <p className="font-semibold text-base md:text-lg">Contact</p>
              <ul className="flex flex-col gap-3 font-semibold">
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
              </ul>
            </div>
          </div>

          <div className=" mt-6 sm:mt-12 text-start sm:text-center px-0  sm:px-6 lg:px-8 ">
            <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-0   sm:gap-4 md:gap-12  text-xs  sm:text-sm">
              <ul className="flex flex-col sm:flex-row gap-x-1 min-[331px]:gap-x-3 ">
                <li className="flex mb-2">
                  <p className="flex items-center">
                    <TbCircleLetterC />{" "}
                  </p>
                  <span>Copyright</span>
                </li>

                <li className="mb-2">TopAI.tools.</li>
                <li className="mb-2 ">All Rights Reserved</li>
              </ul>
              <ul className="flex flex-col sm:flex-row gap-0 sm:gap-3 ">
                <li className="mb-2">
                  <Link to="#">Privacy policy</Link>
                </li>
                <li className="mb-2">
                  <Link to="termsConditions">Service terms</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

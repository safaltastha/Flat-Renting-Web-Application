import React from "react";
import { CiMail } from "react-icons/ci";
import { FaFacebookF, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-[#cdc6db] text-black py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 sm:col-span-1 lg:col-span-4">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <img src="logo/nobg.png" alt="Logo" className="w-[20%] mb-2" />
            <p className="text-md font-semibold">
              Basai Sarai is a web-based platform that streamlines the rental
              process for landlords and tenants. It simplifies property listing,
              enables quick contact with potential tenants, and offers a
              user-friendly interface for searching properties based on location
              and price range.
            </p>
          </div>

          {/* Useful Links */}
          <div className="md:col-span-1 py-24">
            <h4 className="text-xl font-bold mb-4">Useful Links</h4>
            <ul className="flex flex-col gap-3 font-semibold">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="/about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/services" className="hover:underline">
                  Services
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="md:col-span-1 py-24 ">
            <h4 className="text-xl font-bold mb-4 ">Contact Us</h4>
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

          {/* Follow Us */}
          <div className="md:col-span-1 py-24">
            <h4 className="text-lg font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-white"
              >
                <FaFacebookF size={24} />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-white"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-white"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <p className="flex items-center gap-2 ">
            Copyright
            <span>
              <FaRegCopyright />
            </span>{" "}
            2024- BasaiSarai.com-All rights reserved{" "}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

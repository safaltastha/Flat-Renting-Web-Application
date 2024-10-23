import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Import hamburger and close icons
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-spacing-3 flex items-center justify-between px-4 h-20">
      {/* Logo */}
      <div className="py-1">
        <img
          src="/logo/logo.jpg"
          alt="Logo"
          height="170"
          width="200"
          className="flex lg:hidden"
        />
        {/* logo for large screen hidden |*/}
        <img
          src="/logo/logo.jpg"
          alt="Logo"
          height="150"
          width="170"
          className="hidden lg:flex"
        />
      </div>
      {/* Hamburger Icon */}
      <div className="block lg:hidden text-xl">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-purple-600 focus:outline-none text-4xl"
        >
          <FaBars />
        </button>
      </div>
      {/* Menu */}
      <div
        className={`text-xl lg:flex lg:items-center lg:space-x-8 ${
          isOpen
            ? "flex flex-col absolute top-0 left-0 right-0 bg-white shadow-md z-10"
            : "hidden"
        } lg:relative lg:flex-row space-y-4`}
      >
        {/* Close Icon for small screens */}
        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden absolute top-6 right-2 text-4xl text-purple-600"
          >
            <FaTimes />
          </button>
        )}

        <ul className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
          <li className="block lg:hidden py-1">
            <img src="/logo/logo.jpg" alt="Logo" height="150" width="170" />
          </li>
          <li>
            <Link to="/" className="block px-4 py-2 hover:text-purple-500">
              Home
            </Link>
          </li>
          <li className="relative group">
            <span className="block px-4 py-2 cursor-pointer hover:text-purple-500">
              Properties
            </span>
            <ul className="absolute hidden group-hover:block bg-white text-black  rounded-lg mt-2 w-32">
              <li className="p-2 hover:bg-gray-200">
                <Link to="/properties/flat">Flat</Link>
              </li>
              <li className="p-2 hover:bg-gray-200">
                <Link to="/properties/room">Room</Link>
              </li>
              <li className="p-2 hover:bg-gray-200">
                <Link to="/properties/officespace">Office space</Link>
              </li>
              <li className="p-2 hover:bg-gray-200">
                <Link to="/properties/shutters">Shutters</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/" className="block px-4 py-2 hover:text-purple-500">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/" className="block px-4 py-2 hover:text-purple-500">
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="hidden lg:block px-5 py-1 text-white bg-purple-600 border-2 border-transparent rounded-md hover:bg-white hover:border-purple-500 hover:text-black"
            >
              Login
            </Link>
            <Link
              to="/"
              className="block lg:hidden px-5 py-1 hover:text-purple-500 text-black"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="hidden lg:block px-5 py-1 text-white bg-purple-600 border-2 border-transparent rounded-lg hover:bg-white hover:border-purple-500 hover:text-black"
            >
              Sign Up
            </Link>
            <Link
              to="/"
              className="block lg:hidden px-5 py-1 hover:text-purple-500 text-black"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

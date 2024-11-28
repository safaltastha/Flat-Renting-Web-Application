import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CiSettings } from "react-icons/ci";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineUser, AiOutlineRight } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useUser } from "../../context/UserContext";

export default function Navbar() {
  const { user, auth } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showProperties, setShowProperties] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const propertiesRef = useRef(null);
  const { logout } = useUser();

  const res = Cookies.get("token");

  //TODO:  Remove this
  // useEffect(() => {
  //   const token = Cookies.get("token");
  //   if (token) {
  //     try {
  //       const decodedToken = jwtDecode(token);
  //       console.log(decodedToken); // Decode the token
  //       setUser(decodedToken); // Set user state to decoded token
  //     } catch (error) {
  //       console.error("Invalid token:", error);
  //       setUser(null);
  //     }
  //   } else {
  //     setUser(null);
  //   }
  // }, []);

  const handleLogout = () => {
    logout();
    Cookies.remove("token");
    navigate("/login");
  };

  const handleSettings = () => {
    navigate("/changepassword");
  };

  const handleProfile = () => {
    navigate("/dashboard");
    navigate("/dashboard");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handlePostPropertyClick = async (e) => {
    e.preventDefault();

    navigate("/postyourproperty");
  };

  const handlePostVehicleClick = async (e) => {
    e.preventDefault();

    navigate("/postyourvehicle");
  };

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
        <img
          src="/logo/logonobg.png"
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
            ? "flex flex-col absolute top-20 left-0 right-0 bg-white shadow-md z-10 w-1/2"
            : "hidden"
        }`}
      >
        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden absolute top-2 right-2 text-4xl text-purple-600"
          >
            <FaTimes />
          </button>
        )}

        <ul className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
          <li>
            <Link
              to="/"
              className={`block px-4 py-2 text-purple-500 font-semibold`}
            >
              Home
            </Link>
          </li>

          {/* Properties Dropdown */}
          <li className="relative" ref={propertiesRef}>
            <span
              onClick={() => setShowProperties(!showProperties)}
              className="px-4 py-2 cursor-pointer hover:text-purple-500 flex justify-between items-center"
            >
              Properties
              <AiOutlineRight
                className={`ml-2 ${
                  showProperties ? "transform rotate-90" : ""
                } lg:hidden`}
              />
            </span>

            {showProperties && (
              <ul
                className={`bg-white text-black rounded-lg mt-2 w-full lg:w-52 z-10 shadow-lg ${
                  isOpen ? "relative" : "absolute"
                }`}
                style={{ top: isOpen ? "unset" : "100%", left: 0 }}
              >
                <li className="p-2 hover:bg-gray-200">
                  <Link to="/properties/flat">Flat</Link>
                </li>
                <li className="p-2 hover:bg-gray-200">
                  <Link to="/properties/room">Room</Link>
                </li>
                <li className="p-2 hover:bg-gray-200">
                  <Link to="/properties/apartment">Apartment</Link>
                  <Link to="/properties/apartment">Apartment</Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <a
              href="/postyourproperty"
              onClick={handlePostPropertyClick}
              className="px-4 py-1 text-black lg:border-2 lg:border-purple-500 lg:hover:bg-purple-600 lg:hover:text-white transition-colors duration-200 rounded-md flex items-center gap-1"
            >
              <span className="text-sm">
                <FaPlus size={18} />
              </span>
              Post Your Property
            </a>
          </li>

          <li>
            <a
              href="/postyourvehicle"
              onClick={handlePostVehicleClick}
              className="px-4 py-1 text-black lg:border-2 lg:border-purple-500 lg:hover:bg-purple-600 lg:hover:text-white transition-colors duration-200 rounded-md flex items-center gap-1"
            >
              <span className="text-sm">
                <FaPlus size={18} />
              </span>
              Post Your Vehicle
            </a>
          </li>

          <li>
            <a
              href="/postyourvehicle"
              onClick={handlePostVehicleClick}
              className="px-4 py-1 text-black lg:border-2 lg:border-purple-500 lg:hover:bg-purple-600 lg:hover:text-white transition-colors duration-200 rounded-md flex items-center gap-1"
            >
              <span className="text-sm">
                <FaPlus size={18} />
              </span>
              Post Your Vehicle
            </a>
          </li>

          {/* User Profile Dropdown */}
          {auth.accessToken ? (
            <li className="relative" onClick={toggleDropdown}>
              {/* Use static user photo here */}
              <img
                src="/profile/profile.jpg"
                alt="User"
                className="w-8 h-8 rounded-full inline-block mt-2 cursor-pointer"
              />
              <BiChevronDown className="inline-block ml-1 mt-2" />
              {dropdownOpen && (
                <div className="absolute right-0 mt-5 w-48 text-[16px] bg-white border border-gray-300 rounded shadow-lg z-10">
                  <div className="flex flex-col">
                    <button
                      onClick={handleProfile}
                      className="w-full text-left px-4 pb-2 pt-1 hover:bg-gray-100 flex items-center"
                    >
                      <AiOutlineUser className="mr-2" />
                      My Profile
                    </button>
                    <button
                      onClick={handleSettings}
                      className="w-full text-left px-3 pb-2 flex items-center hover:bg-gray-100"
                    >
                      <CiSettings className="mr-2" />
                      Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 pb-2 hover:bg-gray-100 flex items-center"
                    >
                      <IoIosLogOut className="mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="hidden lg:block px-5 py-1 text-white bg-purple-600 border-2 border-transparent rounded-md hover:bg-white hover:border-purple-500 hover:text-black"
                >
                  Login
                </Link>
                <Link
                  to="/login"
                  className="block lg:hidden px-5 py-1 hover:text-purple-500 text-black"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="hidden lg:block px-5 py-1 text-white bg-purple-600 border-2 border-transparent rounded-lg hover:bg-white hover:border-purple-500 hover:text-black"
                >
                  Register
                </Link>
                <Link
                  to="/signup"
                  className="block lg:hidden px-5 py-1 hover:text-purple-500 text-black"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

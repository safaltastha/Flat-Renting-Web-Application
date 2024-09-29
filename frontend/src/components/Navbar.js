import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CiSettings } from "react-icons/ci";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";
import { AiOutlineRight } from "react-icons/ai"; // Import the right arrow icon
import { FaPlus } from "react-icons/fa6";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showProperties, setShowProperties] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleSettings = () => {
    navigate("/changepassword");
  };

  const handleProfile = () => {
    navigate("/dashboard");
  };

  const toggleProperties = () => {
    setShowProperties(!showProperties);
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
            ? "flex flex-col absolute top-20 left-0 right-0 bg-white shadow-md z-10 w-1/2" // Half-width menu
            : "hidden"
        } lg:relative lg:flex-row space-y-4`}
      >
        {/* Close Icon for small screens */}
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
            <Link to="/" className="block px-4 py-2 hover:text-purple-500">
              Home
            </Link>
          </li>
          <li className="relative">
            <span
              onClick={toggleProperties}
              className="block px-4 py-2 cursor-pointer hover:text-purple-500 flex justify-between items-center"
            >
              Properties
              <AiOutlineRight
                className={`ml-2 ${
                  showProperties ? "transform rotate-90" : ""
                }`}
              />
            </span>

            {showProperties && (
              <ul
                className={`bg-custom-gray lg:bg-white text-black rounded-lg mt-2 w-full z-10 shadow-lg ${
                  isOpen ? "relative" : "absolute lg:absolute"
                }`} // Absolute for lg and above, relative for small screens
                style={{ top: isOpen ? "unset" : "100%", left: 0 }} // Top adjustment for dropdown placement
              >
                <li className="p-2 hover:bg-gray-200">
                  <Link to="/properties/flat">Flat</Link>
                </li>
                <li className="p-2 hover:bg-gray-200">
                  <Link to="/properties/room">Room</Link>
                </li>
                <li className="p-2 hover:bg-gray-200">
                  <Link to="/properties/officespace">Office Space</Link>
                </li>
                <li className="p-2 hover:bg-gray-200">
                  <Link to="/properties/shutters">Shutters</Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link
              to="/contactus"
              className="block px-4 py-2 hover:text-purple-500"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link to="/" className="block px-4 py-2 hover:text-purple-500">
              About Us
            </Link>
          </li>
          <li className="">
            <Link
              to="/postyourproperty"
              className=" px-4 py-1 text-black lg:border-2 lg:border-purple-500 lg:hover:bg-purple-600 lg:hover:text-white transition-colors duration-200 rounded-md flex  items-center gap-1"
            >
              {" "}
              <span className="text-sm">
                <FaPlus />
              </span>
              Post Your Property
            </Link>
          </li>

          {/* Check if user is logged in */}
          {user ? (
            <>
              <li
                className="block cursor-pointer relative"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {/* Default User Image */}
                <img
                  src="/profile/profile.jpg"
                  alt="User"
                  className="w-8 h-8 rounded-full inline-block mt-2 "
                />
                <BiChevronDown className="inline-block ml-1 mt-2 " />
                {/* Dropdown Menu */}
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
            </>
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

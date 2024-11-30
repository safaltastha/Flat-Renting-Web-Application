"use client";
import React from "react";
import { TiLocation } from "react-icons/ti";
import { IoMail } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  // Using state for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const token = Cookies.get("token");
  let userId;
  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken.id; // Extract `id` as `userId` from the decoded token
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      firstName,
      lastName,
      message,
      userId,
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/contact",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Sending token in Authorization header
          },
          withCredentials: true, // Only set if your backend requires credentials (like cookies)
        }
      );

      if (response.status === 201) {
        setFirstName("");
        setLastName("");
        setMessage("");
        alert("Form submitted successfully!");
        navigate("/");
      } else {
        alert(`Error ho: ${response.data.error}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit the form. Please try again.");
    }
  };

  return (
    <div className="bg-[#dddcdf] min-h-screen flex items-center justify-center p-4">
      <div className="p-8 max-w-4xl w-full">
        <h1 className="text-3xl text-center font-semibold text-[#A06FFF] mb-6">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="bg-white p-8 rounded-lg shadow-md h-full md:col-span-1">
            <div className="mb-5">
              <h2 className="text-lg font-semibold mb-2 flex items-center">
                Address:
              </h2>
              <ul className="list-none p-0">
                <li className="flex place-items-center">
                  <TiLocation className="mr-2 text-3xl" />
                  <span>Srijanachowk-19, Pokhara</span>
                </li>
              </ul>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2 flex items-center">
                General enquiries:
              </h2>
              <p className="flex items-center">
                <IoMail className="mr-2" />
                basaisarai@gmail.com
              </p>
              <p className="flex items-center mt-4">
                <FaPhone className="mr-2" />
                9800000000
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2 flex items-center">
                Other enquiries:
              </h2>
              <p className="flex items-center">
                <IoMail className="mr-2" />
                mail12@gmail.com
              </p>
              <p className="flex items-center mt-4">
                <FaPhone className="mr-2" />
                9800000000
              </p>
            </div>
          </div>

          <div className="space-y-4 md:col-span-2">
            <div className="flex flex-col">
              <label className="block md:text-sm font-medium text-gray-700">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="block md:text-sm font-medium text-gray-700">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="block md:text-sm font-medium text-gray-700">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none resize-none"
                rows="6"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                className="bg-purple-600 px-4 py-2 rounded text-white hover:bg-purple-700"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button className="bg-gray-300 px-4 py-2 rounded text-black hover:bg-gray-400">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

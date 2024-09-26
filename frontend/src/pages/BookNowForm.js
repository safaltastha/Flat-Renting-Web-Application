import React from 'react';
import { RiCloseLargeFill } from 'react-icons/ri';

const BookNowForm = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#EEE5FF]">
      <div className="w-full max-w-md p-6 border border-black bg-white rounded-md shadow-lg">
        
        <div className="relative flex items-center justify-center mb-6">
          {/* Icon and Heading Container */}
          <div className="flex items-center">
            <h1 className="text-xl md:text-2xl lg:text-2xl text-center font-semibold text-purple-600 mr-4">
              {/* Heading Text */}
              Please fill this form
            </h1>
            <RiCloseLargeFill className="text-2xl text-gray300 cursor-pointer absolute right-0 top-1/1.5 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Form Fields */}
        <div className="mt-3">
          <label htmlFor="first-name" className="block text-gray-600">
            First Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="first-name"
            className="border w-full text-base md:text-lg px-3 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-0 focus:border-gray-800 mt-1"
            placeholder="John"
          />
        </div>

        <div className="mt-5">
          <label htmlFor="last-name" className="block text-gray-600">
            Last Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="last-name"
            className="border w-full text-base md:text-lg px-3 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-0 focus:border-gray-800 mt-1"
            placeholder="Doey"
          />
        </div>

        <div className="mt-5">
          <label htmlFor="email" className="block text-gray-600">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            className="border w-full text-base md:text-lg px-3 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-0 focus:border-gray-800 mt-1"
            placeholder="abc12@gmail.com"
          />
        </div>

        <div className="mt-5">
          <label htmlFor="phone-number" className="block text-gray-600">
            Phone Number<span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone-number"
            className="border w-full text-base md:text-lg px-3 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-0 focus:border-gray-800 mt-1"
            placeholder="98********"
          />
        </div>

        <div className="mt-4">
          <label className="text-gray-600">Do you want to book a vehicle?</label>
        </div>
        <div className="mt-2 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="yes"
              name="booking"
              className="form-radio h-4 w-4 text-blue-600 focus:ring-0"
            />
            <label htmlFor="yes" className="ml-2 text-gray-600">Yes</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="no"
              name="booking"
              className="form-radio h-4 w-4 text-blue-600 focus:ring-0"
            />
            <label htmlFor="no" className="ml-2 text-gray-600">No</label>
          </div>
        </div>

        <div className="mt-5 text-center">
          <button type="submit" className="border-2 border-purple-600 bg-purple-600 text-white py-2 px-6 text-lg rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600">
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookNowForm;
            
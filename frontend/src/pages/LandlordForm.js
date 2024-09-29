import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GeneralCategory from './landlord/GeneralCategory';
import LocationField from './landlord/LocationField';
import Rent from './landlord/Rent';
import DescriptionAndRules from './landlord/DescriptionAndRules';
import AudioVideo from './landlord/AudioVideo';



const LandlordForm = () => {

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  const capitalizeWords = (value) => {
    return value.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleFilesChange = (imageFiles, videoFiles) => {
    setImages(imageFiles);
    setVideos(videoFiles);
  };

 

  const handleSubmit = async (event) => {

  
    event.preventDefault();

    if (images.length === 0 || videos.length === 0) {
      alert('Please upload at least one image and one video.');
      return;
    }

    // Submit form logic here
  };

  const handleCancel = () => {
    navigate('/'); 
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-custom-gray shadow-lg rounded-lg my-12">
      <form className="space-y-6" method="post" onSubmit={handleSubmit}>
      <LocationField capitalizeWords={capitalizeWords}/>
        <GeneralCategory/>
        
        <Rent/>
        <DescriptionAndRules capitalizeWords={capitalizeWords}/>
        <div className="p-4">
          <label className="block mb-2 font-medium text-[#9747FF]">
            Facilities<span className="text-red-600 ml-1 text-[20px]">*</span>
          </label>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="electricity"
                className="text-blue-600 form-checkbox"
                
                
              />
              <span className="mr-2 text-[#777777]">Electricity</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="parking"
                className="text-blue-600 form-checkbox"
                
                
              />
              <span className="mr-2 text-[#777777]">Parking</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="wifi"
                className="text-blue-600 form-checkbox"
                
                
              />
              <span className="mr-2 text-[#777777]">WiFi</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="petAllowed"
                className="text-blue-600 form-checkbox"
                
                
              />
              <span className="mr-2 text-[#777777]">Pet Allowed</span>
            </label>

            

           
          </div>
        </div>
        <div>
          <h2 className="text-lg font-medium mb-2">Photos and Videos</h2>
          <AudioVideo/>
        </div>

        {/* <LandlordAvailability/> */}
       




        <div className="flex space-x-4 p-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-400 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#A06FFF] text-white rounded-md hover:bg-[#473965]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LandlordForm;

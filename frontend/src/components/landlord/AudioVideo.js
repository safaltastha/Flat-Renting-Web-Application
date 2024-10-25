import React, { useRef, useState, useEffect } from "react";

const AudioVideo = ({ onFilesChange }) => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (onFilesChange) {
      onFilesChange(images, videos);
    }
  }, [images, videos, onFilesChange]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const videoFiles = files.filter((file) => file.type.startsWith("video/"));

    // Create object URLs for the image files
    const imagePreviews = imageFiles.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...imageFiles]);
    setImagePreviews((prevPreviews) => [...prevPreviews, ...imagePreviews]);

    // Create object URLs for the video files
    const videoURLs = videoFiles.map((file) => URL.createObjectURL(file));
    setVideos((prevVideos) => [...prevVideos, ...videoFiles]);
    setVideoPreviews((prevPreviews) => [...prevPreviews, ...videoURLs]);
  };

  useEffect(() => {
    return () => {
      // Clean up the object URLs when the component is unmounted
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
      videoPreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews, videoPreviews]);

  return (
    <div>
      {/* Image Upload Section */}
      <div className="p-4">
        <label className="block mb-2 font-medium text-[#9747FF]">
          Upload Images
          <span className="text-red-600 ml-1 text-[20px]">*</span>
        </label>
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          accept="image/*"
          multiple
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-white file:bg-[#3B82F6] file:rounded-md file:cursor-pointer hover:file:bg-[#1D4ED8]"
        />
        <div className="mt-4 flex flex-wrap gap-4">
          {imagePreviews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`Image preview ${index}`}
              className="w-32 h-32 object-cover rounded-lg border border-gray-300"
            />
          ))}
        </div>
      </div>

      {/* Video Upload Section */}
      <div className="p-4">
        <label className="block mb-2 font-medium text-[#9747FF]">
          Upload Videos
        </label>
        <input
          type="file"
          name="video"
          onChange={handleFileChange}
          accept="video/*"
          multiple
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-white file:bg-[#3B82F6] file:rounded-md file:cursor-pointer hover:file:bg-[#1D4ED8]"
        />
        <div className="mt-4 flex flex-wrap gap-4">
          {videoPreviews.map((videoPreview, index) => (
            <video
              key={index}
              controls
              src={videoPreview}
              className="w-32 h-32 object-cover rounded-lg border border-gray-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AudioVideo;

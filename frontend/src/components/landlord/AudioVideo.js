import React, { useRef, useState, useEffect } from "react";

const AudioVideo = ({ onFilesChange }) => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const removeImage = (index) => {
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const removeVideo = (index) => {
    setVideoPreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
    setVideos((prevVideos) => prevVideos.filter((_, i) => i !== index));
  };

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
      <h2 className="font-medium text-lg mt-9">Images and Videos</h2>
      <div className="">
        {/* Image Upload Section */}
        <div className="mb-2">
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
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Image preview ${index}`}
                  className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 cursor-pointer"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Video Upload Section */}
        <div className="">
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
              <div key={index} className="relative">
                <video
                  controls
                  src={videoPreview}
                  className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                />
                <button
                  onClick={() => removeVideo(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 cursor-pointer"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioVideo;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const SavePropertyButton = ({ propertyId }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState(null);

  // Fetch saved status on mount
  useEffect(() => {
    const fetchSavedStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/save-property/${propertyId}`,
          {
            withCredentials: true, // Include credentials if necessary
          }
        );
        if (response.data.isSaved) {
          setIsSaved(true);
        }
      } catch (err) {
        console.error("Error fetching saved status:", err.message);
      }
    };

    if (propertyId) {
      fetchSavedStatus();
    }
  }, [propertyId]);

  // Handle saving the property
  const handleSaveProperty = async () => {
    console.log("Property ID:", propertyId);

    try {
      const response = await axios.post(
        `http://localhost:3001/save-property`,
        { propertyId },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        setIsSaved(true); // Mark the property as saved
        setError(null); // Clear any previous errors
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError("Property is already saved!");
      } else {
        setError("An error occurred while saving the property.");
      }
    }
  };

  return (
    <div>
      <button onClick={handleSaveProperty}>
        {isSaved ? (
          <>
            <FaHeart className="text-red-700" /> {/* Heart with red color */}
            Saved
          </>
        ) : (
          <>
            <FaRegHeart className="text-gray-500" /> {/* Outline heart */}
            Save
          </>
        )}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default SavePropertyButton;

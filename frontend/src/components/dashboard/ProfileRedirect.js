import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext"; // Assuming userContext has the logged-in user's data
import axios from "axios";

const ProfileRedirect = () => {
  const { user, setUserRole } = useUserContext(); // Assuming user contains id, role, etc.
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        console.log("Fetching user data...");

        // Log the user data (id) before making the API call
        if (user && user.id) {
          console.log("User ID from context:", user.id); // Check user id

          const response = await axios.get("http://localhost:3001/auth/role", {
            withCredentials: true,
          });

          // Log the response data after the API call
          console.log("Response data:", response.data);

          if (response.status === 200) {
            // Corrected status code
            const data = response.data;
            setUserRole(data.role); // Update context with user role

            // Redirect to the respective dashboard based on role
            if (data.role === "tenant") {
              navigate("/tenant-dashboard");
            } else if (data.role === "landlord") {
              navigate("/landlord-dashboard");
            } else if (data.role === "vehicle-supplier") {
              navigate("/vehicle-supplier-dashboard");
            }
          } else {
            console.error("Error fetching user role:", response.data.error);
          }
        } else {
          console.error("User ID is not available in context");
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    if (user) {
      // Ensure that user data is available before making API request
      fetchUserRole();
    }
  }, []); // Dependencies include user

  return null; // No need to render anything, as it's just for redirection
};

export default ProfileRedirect;

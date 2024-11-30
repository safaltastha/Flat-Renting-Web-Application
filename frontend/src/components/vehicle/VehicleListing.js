import React, { useEffect, useState } from "react";
import VehicleCard from "../vehicle/VehicleCard";
import { useLocation } from "react-router-dom";
import axios from "axios"; // Assuming you're using axios; replace if using fetch
import Cookies from "js-cookie";

const VehicleListing = () => {
  const location = useLocation();
  const [vehicles, setVehicles] = useState(location.state?.vehicle || []);

  // Fetch vehicles from backend if location.state.vehicle is not available
  useEffect(() => {
    if (!location.state?.vehicle) {
      const fetchVehicles = async () => {
        try {
            const token = Cookies.get("token");
          const response = await axios.get("http://localhost:3001/vehicle", {
            headers: {
              Authorization: `Bearer ${token}`,
               
            },
            withCredentials: true,
          }); 
          setVehicles(response.data);
        } catch (error) {
          console.error("Error fetching vehicles:", error);
        }
      };
      fetchVehicles();
    }
  }, [location.state]);

  

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Available Vehicles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))
        ) : (
          <p>No vehicles found.</p>
        )}
      </div>
    </div>
  );
};

export default VehicleListing;

// src/context/VehicleContext.js
import React, { createContext, useState, useContext } from "react";

// Create the context
const VehicleContext = createContext();

// Create a provider component
export const VehicleProvider = ({ children }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  return (
    <VehicleContext.Provider value={{ selectedVehicle, setSelectedVehicle }}>
      {children}
    </VehicleContext.Provider>
  );
};

// Custom hook to use the vehicle context
export const useVehicle = () => {
  return useContext(VehicleContext);
};

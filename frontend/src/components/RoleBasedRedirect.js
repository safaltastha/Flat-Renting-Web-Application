import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const RoleBasedRedirect = () => {
  const { user } = useUser();

  if (!user.isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return <Navigate to="/tenant-dashboard" />;

  // switch (user.role) {
  //   case "tenant":
  //     return <Navigate to="/tenant-dashboard" />;
  //   case "landlord":
  //     return <Navigate to="/landlord-dashboard" />;
  //   case "vehicleSupplier":
  //     return <Navigate to="/vehicle-supplier-dashboard" />;
  //   default:
  //     return <Navigate to="/unauthorized" />;
  // }
};

export default RoleBasedRedirect;

// src/App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import DetailedViewPage from "./components/Property/DetailedViewPage";
import HomePage from "./pages/HomePage";
import LoginForm from "./pages/form/LoginForm";
import PropertyListing from "./pages/PropertyListing";
import RegistrationForm from "./pages/form/RegisterForm";
import LandlordForm from "./pages/form/LandlordForm";
import ChangePassword from "./components/password/ChangePassword";
import Layout from "./components/Layout";
import ContactUs from "./pages/form/ContactForm";
import BookNowWithVehicleForm from "./pages/form/BookNowForm";
import Flat from "./components/Flat";

import { UserProvider, useUser } from "./context/UserContext";
import RoleBasedRedirect from "./components/RoleBasedRedirect";
import VehicleDashboard from "./components/dashboard/VehicleDashboard";
import LandlordDashboard from "./components/dashboard/LandlordDashboard";
import TenantDashboard from "./components/dashboard/TenantDashboard";
import VehicleForm from "./pages/form/VehicleForm";

import VehicleDetailPage from "./components/vehicle/VehicleDetailPage";
import VehicleListing from "./components/vehicle/VehicleListing";

import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import ForgotPassword from "./components/password/RequestPasswordReset";
import PersistLogin from "./components/PersistLogin";

const App = () => {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route element={<Layout />}>
          {/*public routes*/}
          <Route path="/signup" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          {/* <Route path="/properties/:id" element={<DetailedViewPage />} /> */}
          {/* <Route path="/bookproperty" element={<BookNowWithVehicleForm />} /> */}
          <Route path="/vehicles" element={<VehicleListing />} />
          <Route path="/vehicle/:id" element={<VehicleDetailPage />} />
          <Route path="/contactus" element={<ContactUs />} />
          {/* <Route path="/properties" element={<PropertyListing />} /> */}
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/*any logged in user can access*/}
          <Route path="/" element={<HomePage />} />
          <Route path="/changepassword" element={<ChangePassword />} />

          <Route path="/properties/flat" element={<Flat />} />

          {/* Unauthorized Page */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route element={<ProtectedRoute allowedRoles={["tenant"]} />}>
            <Route path="/properties" element={<PropertyListing />} />
            <Route path="/properties/:id" element={<DetailedViewPage />} />
            <Route path="/vehicles" element={<VehicleListing />} />
            <Route path="/vehicle/:id" element={<VehicleDetailPage />} />
            <Route path="/bookproperty" element={<BookNowWithVehicleForm />} />
          </Route>

          {/* Landlord-only routes */}
          <Route element={<ProtectedRoute allowedRoles={["landlord"]} />}>
            <Route path="/postyourproperty" element={<LandlordForm />} />
            <Route path="/landlord-dashboard" element={<LandlordDashboard />} />
          </Route>
          <Route
            element={
              <ProtectedRoute
                allowedRoles={["landlord", "tenant", "vehicleSupplier"]}
              />
            }
          >
            {/* <Route path="/dashboard" element={<RoleBasedRedirect />} /> */}
            <Route path="/dashboard" element={<TenantDashboard />} />
          </Route>

          <Route
            path="/vehicle-supplier-dashboard"
            element={<VehicleDashboard />}
          />

          {/* Vehicle-supplier-only routes */}

          <Route
            element={<ProtectedRoute allowedRoles={["vehicleSupplier"]} />}
          >
            <Route path="/postyourvehicle" element={<VehicleForm />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;

// src/App.js
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DetailedViewPage from "./components/Property/DetailedViewPage";
import Footer from "./components/NavFoot/Footer";
import Navbar from "./components/NavFoot/Navbar";
import HomePage from "./pages/HomePage";
import LoginForm from "./pages/form/LoginForm";
import PropertyListing from "./pages/PropertyListing";
import RegistrationForm from "./pages/form/RegisterForm";
import LandlordForm from "./pages/form/LandlordForm";
import ChangePaasword from "./components/ChangePassword";
import Layout from "./components/Layout";
import ContactUs from "./pages/form/ContactForm";
import BookNowWithVehicleForm from "./pages/form/BookNowForm";
import Flat from "./components/Flat";
import Test from "./components/Test";
import VehicleForm from "./pages/form/VehicleForm";
import { UserProvider } from "./context/UserContext";
import ProfileRedirect from "./components/dashboard/ProfileRedirect";
import VehicleDashboard from "./components/dashboard/VehicleDashboard";
import LandlordDashboard from "./components/dashboard/LandlordDashboard";
import TenantDashboard from "./components/dashboard/TenantDashboard";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/properties" element={<PropertyListing />} />
            <Route path="/properties/:id" element={<DetailedViewPage />} />
            <Route path="/signup" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/postyourproperty" element={<LandlordForm />} />
            <Route path="/changepassword" element={<ChangePaasword />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/booknow" element={<BookNowWithVehicleForm />} />
            <Route path="/myprofile" element={<ProfileRedirect />} />
            <Route path="/properties/flat" element={<Flat />} />
            <Route path="/test" element={<Test />} />
            <Route path="/vehicle-form" element={<VehicleForm />} />
            <Route path="/tenant-dashboard" element={<TenantDashboard />} />
            <Route path="/landlord-dashboard" element={<LandlordDashboard />} />
            <Route
              path="/vehicle-supplier-dashboard"
              element={<VehicleDashboard />}
            />
          </Route>
          {/* Add other routes here */}
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;

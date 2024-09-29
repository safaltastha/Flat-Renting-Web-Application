// src/App.js
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DetailedViewPage from "./components/Property/DetailedViewPage";
import Footer from "./components/NavFoot/Footer";
import Navbar from "./components/NavFoot/Navbar";
import HomePage from "./pages/HomePage";
import LoginForm from "./pages/LoginForm";
import PropertyListing from "./pages/PropertyListing";
import RegistrationForm from "./pages/RegisterForm";
import LandlordForm from "./pages/LandlordForm";
import ChangePaasword from "./components/ChangePassword";
import Layout from "./components/Layout";
import ContactUs from "./pages/ContactUs";
import BookNowWithVehicleForm from "./components/BookNow";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
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
          <Route path="/myprofile" element={<Dashboard />} />
        </Route>
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;

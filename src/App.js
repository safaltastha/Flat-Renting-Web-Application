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
import BookNowWithVehicleForm from "./components/BookNow";
import Dashboard from "./pages/Dashboard";
import Flat from "./components/Flat";
import AboutUs from "./pages/AboutUs";

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
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/booknow" element={<BookNowWithVehicleForm />} />
          <Route path="/myprofile" element={<Dashboard />} />
          <Route path="/properties/flat" element={<Flat />} />
        </Route>
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;

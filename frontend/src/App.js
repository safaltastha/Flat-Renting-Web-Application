// src/App.js
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DetailedViewPage from "./components/DetailedViewPage";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginForm from "./pages/LoginForm";
import PropertyListing from "./pages/PropertyListing";
import RegistrationForm from "./pages/RegisterForm";
import LandlordForm from "./pages/LandlordForm"; // Make sure to import LandlordForm if it's defined
import ChangePaasword from "./components/ChangePassword";
import Layout from "./components/Layout";
import ContactUs from "./pages/ContactUs";

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
        </Route>
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;

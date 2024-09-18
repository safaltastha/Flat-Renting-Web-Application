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

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/properties" element={<PropertyListing />} />
        <Route path="/properties/:id" element={<DetailedViewPage />} />

        {<Route path="/register" element={<RegistrationForm />} />}
        {<Route path="/login" element={<LoginForm />} />}
        {/* Other routes */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

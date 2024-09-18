// src/App.js
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DetailedViewPage from "./components/DetailedViewPage";
import Navbar from "./components/Navbar";
import LoginForm from "./pages/LoginForm";
import PropertyListing from "./pages/PropertyListing";
import RegistrationForm from "./pages/RegisterForm";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/properties" element={<PropertyListing />} />
        <Route path="/properties/:id" element={<DetailedViewPage />} />

        {<Route path="/register" element={<RegistrationForm />} />}
        {<Route path="/login" element={<LoginForm />} />}
        {/* Other routes */}
      </Routes>
    </Router>
  );
};

export default App;

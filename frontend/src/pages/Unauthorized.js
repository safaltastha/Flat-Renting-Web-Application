// src/pages/Unauthorized.js
import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">403 - Unauthorized</h1>
      <p className="text-lg mt-4">You do not have permission to access this page.</p>
      <Link to="/" className="mt-6 text-blue-600">
        Go Back to Home
      </Link>
    </div>
  );
};

export default Unauthorized;

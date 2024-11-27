import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3002/auth/reset-password", {
        email: searchParams.get("email"),
        token: searchParams.get("token"),
        newPassword,
      });
      setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 3000); // Redirect after success
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleResetPassword} className="max-w-md w-full p-6 bg-white shadow rounded">
        <h2 className="text-2xl mb-4">Reset Password</h2>
        {message && <p className="mb-4 text-center">{message}</p>}
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;

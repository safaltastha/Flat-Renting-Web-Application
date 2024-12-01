import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RequestPasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3002/auth/forgot-password",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email }), // Directly use the state variable
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset link sent to your email.");
      } else {
        setMessage(data.message || "Failed to send reset link.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/signup");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleForgotPassword}
        className="max-w-md w-full p-6 bg-white shadow rounded"
      >
        <h3 className="text-2xl mb-4">
          Enter an email to send you reset password link
        </h3>
        {message && <p className="mb-4 text-center text-red-600">{message}</p>}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className="w-full bg-red-600 text-white py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded"
          >
            Send Reset Link
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestPasswordReset;

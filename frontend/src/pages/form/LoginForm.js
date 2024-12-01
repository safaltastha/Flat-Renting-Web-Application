import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie
import { useUser } from "../../context/UserContext";
import { jwtDecode, JwtPayload } from "jwt-decode";

function Login() {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const { setAuth, setUser } = useUser();
  const { setAuth, setUser } = useUser();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[\W_]/, "Password must contain at least one special character")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    // console.log("Submitting form with values:", values);
    try {
      const response = await axios.post(
        "http://localhost:5001/auth/login",
        values,
        {
          withCredentials: true,
        }
      );

      if (response.data) {
        const token = response.data.token;
        const token = response.data.token;
        const decodedToken = jwtDecode(token);
        setAuth({
          accessToken: token,
        });
          accessToken: token,
        });
        setUser({
          id: decodedToken.id,
          role: decodedToken.role,
          email: decodedToken.email,
          name: decodedToken.name,
          phoneNumber: decodedToken.phoneNumber,
        });
        console.log(token, "login token");
        console.log(decodedToken, "decoded token");
          phoneNumber: decodedToken.phoneNumber,
        });
        console.log(token, "login token");
        console.log(decodedToken, "decoded token");

        if (rememberMe) {
          // Cookies.set("token", response.data.token, {
          //   expires: 1 / 24,
          //   path: "/",
          // });
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          Cookies.set("token", response.data.token, { path: "/" }); // Session cookie
        }
        // console.log("Token set in cookie:", Cookies.get("token"));
        navigate("/");
        resetForm();
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert("An error occurred. Please try again.");
      }
    }

    setSubmitting(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-center items-center">
              <h1 className="text-2xl font-bold text-[#A06FFF] mb-6">Login</h1>
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email <span className="ml-1 text-red-600 text-[20px]">*</span>
              </label>
              <Field
                type="email"
                name="email"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password{" "}
                <span className="ml-1 text-red-600 text-[20px]">*</span>
              </label>
              <Field
                type="password"
                name="password"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center text-sm">
                <Field
                  type="checkbox"
                  name="rememberMe"
                  className="mr-2"
                  onClick={() => setRememberMe(!rememberMe)}
                />
                Remember Me
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-[#A06FFF] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className=" w-full py-2 px-4 text-white bg-purple-600 border-2 border-transparent rounded-lg hover:bg-white hover:border-purple-500 hover:text-black"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </div>
            <div className="flex justify-center items-center mt-3">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[#A06FFF] ml-1 font-medium hover:underline"
              >
                Register
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RiArrowDownSLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      "Invalid email address"
    )
    .required("Email is required"),
    name: Yup.string()
    .matches(/^[a-z0-9]+$/, "Name must be lowercase letters and numbers only, with no spaces")
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must not exceed 50 characters")
    .required("Name is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[\W_]/, "Password must contain at least one special character")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  role: Yup.string()
    .oneOf(["tenant", "landlord", "vehicle supplier"], "Invalid role")
    .required("Role is required"),
    phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^\+977 ?\d{10}$/, 'Phone number must be in the format +977XXXXXXXXXX'),

});

const RegisterForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/register",
        values
      );
     
      resetForm();
      navigate("/login");
    } catch (error) {
      // Handle the error appropriately
      alert(
        "Failed to register user: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh] max-h-screen py-8 p-4 bg-gray-100">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "",
          phoneNumber:"",
          userPhoto:"",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-full max-w-screen-md bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl text-center font-bold text-[#A06FFF] mb-6">
              Register
            </h1>

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block md:text-sm font-medium text-gray-700"
              >
                Username{" "}
                <span className="ml-1 text-red-600 text-[20px]">*</span>
              </label>
              <Field
                type="text"
                name="name"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none"
                placeholder="johndoe"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block md:text-sm font-medium text-gray-700"
              >
                Email <span className="ml-1 text-red-600 text-[20px]">*</span>
              </label>
              <Field
                type="email"
                name="email"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none"
                placeholder="john@gmail.com"
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
                className="block md:text-sm font-medium text-gray-700"
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

            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block md:text-sm font-medium text-gray-700"
              >
                Confirm Password{" "}
                <span className="ml-1 text-red-600 text-[20px]">*</span>
              </label>
              <Field
                type="password"
                name="confirmPassword"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block md:text-sm font-medium text-gray-700"
              >
                Phone Number{" "}
                <span className="ml-1 text-red-600 text-[20px]">*</span>
              </label>
              <Field
                type="text"
                name="phoneNumber"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none"
                placeholder="+977 9800000000"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="role"
                className="block md:text-sm font-medium text-gray-700"
              >
                Role <span className="ml-1 text-red-600 text-[20px]">*</span>
              </label>
              <div className="relative">
                <Field
                  as="select"
                  name="role"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none appearance-none"
                >
                  <option value="" label="Select role" />
                  <option value="tenant" label="Tenant" />
                  <option value="landlord" label="Landlord" />
                  <option value="vehicle supplier" label="Vehicle Supplier" />
                </Field>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <RiArrowDownSLine className="h-5 w-5 text-black" />
                </div>
              </div>
              <ErrorMessage
                name="role"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="block w-full py-2 px-4 text-white bg-purple-600 border-2 border-transparent rounded-lg hover:bg-white hover:border-purple-500 hover:text-black"
              >
                Register
              </button>
            </div>

            <div className="flex justify-center items-center mt-3">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#A06FFF] ml-1 font-medium hover:underline"
              >
                Login
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;

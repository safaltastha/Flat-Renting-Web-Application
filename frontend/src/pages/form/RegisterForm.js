import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RiArrowDownSLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import PhoneNumValidation from "../../components/PhoneNumValidation"; // Adjust the path as needed

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      "Invalid email address"
    )
    .required("Email is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  address: Yup.string().required("Address is required"),
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
    .oneOf(["tenant", "landlord", "vehicleSupplier"], "Invalid role")
    .required("Role is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
});

const RegisterForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        "http://localhost:5001auth/register",
        values
      );
      resetForm();
      navigate("/login");
    } catch (error) {
      alert(
        "Failed to register user: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center   py-8 p-4 bg-gray-100">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "",
          phoneNumber: "",
          userPhoto: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="w-full max-w-screen-md bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl text-center font-bold text-[#A06FFF] mb-6">
              Register
            </h1>

            {/* Username */}
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block md:text-sm font-medium text-gray-700"
              >
                First Name{" "}
                <span className="ml-1 text-red-600 text-[20px]">*</span>
              </label>
              <Field
                type="text"
                name="firstName"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none"
                placeholder="john"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block md:text-sm font-medium text-gray-700"
              >
                Last Name{" "}
                <span className="ml-1 text-red-600 text-[20px]">*</span>
              </label>
              <Field
                type="text"
                name="lastName"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none"
                placeholder="doe"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="address"
                className="block md:text-sm font-medium text-gray-700"
              >
                Address <span className="ml-1 text-red-600 text-[20px]">*</span>
              </label>
              <Field
                type="text"
                name="address"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Email */}
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

            {/* Password */}
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

            {/* Confirm Password */}
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

            {/* Phone Number */}
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block mb-1 md:text-sm font-medium text-gray-700"
              >
                Phone Number{" "}
                <span className="ml-1  text-red-600 text-[20px]">*</span>
              </label>
              <PhoneNumValidation
                setFieldValue={setFieldValue}
                fieldName="phoneNumber"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Role */}
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
                  <option value="vehicleSupplier" label="Vehicle Supplier" />
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

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="block w-full py-2 px-4 text-white bg-purple-600 border-2 border-transparent rounded-lg hover:bg-white hover:border-purple-500 hover:text-black"
              >
                Register
              </button>
            </div>

            {/* Login Redirect */}
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

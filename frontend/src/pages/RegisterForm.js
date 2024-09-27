import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RiArrowDownSLine } from "react-icons/ri";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      "Invalid email address"
    )
    .required("Email is required"),
  name: Yup.string()
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
});

const RegisterForm = () => {
  const navigate = useNavigate();

  // const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  //   try {
  //     await axios.post("http://localhost:3001/auth/register", values);
  //     resetForm();
  //     navigate("/login");
  //   } catch (error) {
  //     alert("Failed to register user: " + error.message);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const { name, email, password, role } = values;
    

    // Save the user data to localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({ name, email, password, role })
    );

    

    // Reset form and navigate to login page
    resetForm();
    navigate("/login");
    setSubmitting(false);
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-center items-center">
              <h1 className="text-2xl font-bold text-[#A06FFF] mb-6">
                Register
              </h1>
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Name <span className="ml-1 text-red-600 text-[20px]">*</span>
              </label>
              <Field
                type="name"
                name="name"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
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
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
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
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
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
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password{" "}
                <span className="ml-1 text-red-600 text-[20px]">*</span>
              </label>
              <Field
                type="password"
                name="confirmPassword"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role <span className="ml-1 text-red-600 text-[20px]">*</span>
              </label>
              <div className="relative">
                <Field
                  as="select"
                  name="role"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500 appearance-none"
                  style={{
                    backgroundColor: "white", // Consistent background color
                  }}
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
                className="w-full bg-[#A06FFF] text-white font-bold py-2 px-4 rounded hover:bg-[#473965] transition duration-200"
              >
                Register
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;

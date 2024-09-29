import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate(); // Initialize the navigate function

  // Validation schema for form fields
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

  // Function to handle form submission
  // const handleSubmit = (values, { setSubmitting, resetForm }) => {
  //   const data = { email: values.email, password: values.password };
  //   axios
  //     .post("http://localhost:3001/auth/login", data)
  //     .then((response) => {
  //       console.log(response.data);
        
  //       resetForm();

       
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       console.error("Login error", error);
        
  //     })
  //     .finally(() => {
  //       setSubmitting(false); // Stop submission state
  //     });
  // };


  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      
      if (
        values.email === storedUser.email &&
        values.password === storedUser.password
      ) {
       
        localStorage.setItem("loggedInUser", storedUser.email);
        

        navigate("/"); 
        window.location.reload();
        resetForm();
      } else {
        alert("Invalid email or password");
      }
    } else {
      alert("No user found. Please register.");
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

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
              className="hidden lg:block w-full py-2 px-4 text-white bg-purple-600 border-2 border-transparent rounded-lg hover:bg-white hover:border-purple-500 hover:text-black"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </div>

            <div className="flex justify-center items-center mt-3">
              Don't have an account?{" "} 
              <Link to="/signup" className="text-[#A06FFF] ml-1 font-medium hover:underline">
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

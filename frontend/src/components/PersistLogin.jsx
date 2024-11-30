import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setAuth, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const rehydrateAuthState = () => {
      const token = Cookies.get("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        setAuth({ accessToken: token });
        setUser({
          id: decodedToken.id,
          role: decodedToken.role,
          email: decodedToken.email,
          firstName: decodedToken.firstName,
          lastName: decodedToken.lastName,
          address: decodedToken.address,
          phoneNumber: decodedToken.phoneNumber,
        });
      }
    };

    // Rehydrate auth state from cookie
    rehydrateAuthState();

    const checkLogin = async () => {
      if (auth?.accessToken && window.location.pathname === "/login") {
        navigate("/"); // Redirect to home if logged in and on login page
      }
      setIsLoading(false); // Stop loading after checking login state
    };

    checkLogin();
  }, [auth?.accessToken, navigate, setAuth, setUser]);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center">
          <Loader />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;

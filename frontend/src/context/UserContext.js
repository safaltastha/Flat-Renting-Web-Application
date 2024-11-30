import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const initialUser = {
    id: "",
    role: "",
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phoneNumber: "",
  };

  const initialAuth = {
    accessToken: "",
  };

  const [user, setUser] = useState(initialUser);
  const [auth, setAuth] = useState(initialAuth);

  const [isLoading, setIsLoading] = useState(false);

  const logout = () => {
    setAuth(initialAuth);
    setUser(initialUser);
  };

  const contextData = {
    user,
    setUser,
    auth,
    setAuth,
    isLoading,
    setIsLoading,
    logout,
  };

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

import React, { useState, useEffect } from "react";
import { setAuthToken } from "../utils/setAuthToken";

// ////////////////////////////////////////////////////////////////////////////////

const AuthContext = React.createContext({
  authenticated: false,
  token: "",
  login: () => {},
  logout: () => {},
});

// ////////////////////////////////////////////////////////////////////////////////

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  // If JWT token is not present, tries to login
  useEffect(() => {
    const accessToken = window.localStorage.getItem("jwtToken");
    if (accessToken) {
      console.log("Set token to header");
      console.log(`AuthContext : ${accessToken}`);
      setAuthToken(accessToken);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        token: token,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

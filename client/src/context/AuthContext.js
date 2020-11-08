import React, { useState, useEffect, useCallback } from "react";
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
  // const login = useCallback(() => {
  //   if (!authenticated) {
  //     getJWT()
  //       // Successfully logged-in
  //       .then(jwt => {
  //         setToken(jwt);
  //         setAuthenticated(true);
  //         if (document.cookie.indexOf("logged_in") === -1) {
  //           message.success("Successfully logged in with GitHub");
  //           document.cookie = `logged_in=1;max-age=86400;path=/;SameSite=Lax`;
  //         }
  //       })
  //       // Not logged-in -> move to GitHub authentication page
  //       .catch(() => {
  //         // Redirect to Agoda's GitHub OAuth Login
  //         // Show loading screen for a brief of time to allow user to recognize the page redirection
  //         const state = prepareOAuthState();
  //         setTimeout(() => {
  //           // State persist only 5 mins per login attempt
  //           document.cookie = `state=${state};max-age=300;path=/;SameSite=Lax`;
  //           window.location.replace(
  //             encodeURI(GITHUB_CALLBACK_URL + `&state=${state}`)
  //           );
  //         }, 1000);
  //       });
  //   }
  // }, [authenticated]);

  // const logout = () => {
  //   if (authenticated) {
  //     getAuthGitHubLogout()
  //       .then(() => {
  //         message.success("Successfully logged out, refreshing page");
  //         setTimeout(() => {
  //           window.location.reload();
  //         }, 1000);
  //       })
  //       .catch();
  //   }
  // };

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
        // login: login,
        // logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

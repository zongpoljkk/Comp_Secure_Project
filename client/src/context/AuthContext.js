// import React, { useState, useEffect, useCallback } from "react";
// import { Spin, message } from "antd";
// import { SyncOutlined } from "@ant-design/icons";

// import {
//   getJWT,
//   getAuthGitHubLogout,
//   prepareOAuthState,
// } from "./../../global/auth";
// import { GITHUB_CALLBACK_URL } from "../../global/const";

// ////////////////////////////////////////////////////////////////////////////////


// const AuthContext = React.createContext({
//   authenticated: false,
//   token: "",
//   login: () => {},
//   logout: () => {},
// });

// ////////////////////////////////////////////////////////////////////////////////

// const AuthProvider = (props: { children: React.ReactNode }) => {
//   const [token, setToken] = useState("");
//   const [authenticated, setAuthenticated] = useState(false);

//   const login = useCallback(() => {
//     if (!authenticated) {
//       getJWT()
//         // Successfully logged-in
//         .then(jwt => {
//           setToken(jwt);
//           setAuthenticated(true);
//           if (document.cookie.indexOf("logged_in") === -1) {
//             message.success("Successfully logged in with GitHub");
//             document.cookie = `logged_in=1;max-age=86400;path=/;SameSite=Lax`;
//           }
//         })
//         // Not logged-in -> move to GitHub authentication page
//         .catch(() => {
//           // Redirect to Agoda's GitHub OAuth Login
//           // Show loading screen for a brief of time to allow user to recognize the page redirection
//           const state = prepareOAuthState();
//           setTimeout(() => {
//             // State persist only 5 mins per login attempt
//             document.cookie = `state=${state};max-age=300;path=/;SameSite=Lax`;
//             window.location.replace(
//               encodeURI(GITHUB_CALLBACK_URL + `&state=${state}`)
//             );
//           }, 1000);
//         });
//     }
//   }, [authenticated]);

//   const logout = () => {
//     if (authenticated) {
//       getAuthGitHubLogout()
//         .then(() => {
//           message.success("Successfully logged out, refreshing page");
//           setTimeout(() => {
//             window.location.reload();
//           }, 1000);
//         })
//         .catch();
//     }
//   };

//   // If JWT token is not present, tries to login
//   useEffect(() => {
//     login();
//   }, [login]);

//   return (
//     <AuthContext.Provider
//       value={{
//         authenticated: authenticated,
//         token: token,
//         login: login,
//         logout: logout,
//       }}
//     >
//       <Spin
//         tip="Loading GitHub Profile"
//         size="large"
//         indicator={<SyncOutlined style={{ fontSize: 24 }} spin />}
//         spinning={!authenticated}
//         style={{ marginTop: 100 }}
//       >
//         {props.children}
//       </Spin>
//     </AuthContext.Provider>
//   );
// };

// export { AuthContext, AuthProvider };

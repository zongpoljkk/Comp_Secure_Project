import React, { useState, useContext, useEffect } from "react";
import { loginUser } from "../utils/action";

////////////////////////////////////////////////////////////////////////////////

export const useUserContext = () => {
  useContext(UserContext);
};

const defaultUser = {
  name: "",
  email: "",
  isLoaded: false,
};

const UserContext = React.createContext(defaultUser);

////////////////////////////////////////////////////////////////////////////////

const UserProvider = (
  props,
  value = defaultUser
) => {
//   const auth = useContext(AuthContext);
  const [user, setUser] = useState(value);

//   useEffect(() => {
//       loginUser(userData)
//         .then(setUser)
//         .catch(() => {
//           console.error("[UC] Unable to get user");
//         });
//   }, [loginUser]);


  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };


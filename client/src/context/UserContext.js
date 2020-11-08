import React, { useState, useContext, useEffect } from "react";
import { decodeToken, loginUser } from "../utils/action";

////////////////////////////////////////////////////////////////////////////////

export const useUserContext = () => {
  useContext(UserContext);
};

const defaultUser = {
  name: "",
  email: "",
  isLoaded: false,
  isModerator: false,
};

const UserContext = React.createContext(defaultUser);

////////////////////////////////////////////////////////////////////////////////

const UserProvider = (props, value = defaultUser) => {
  //   const auth = useContext(AuthContext);
  const [user, setUser] = useState({
    name: "",
    email: "",
    isLoaded: false,
    isModerator: false,
  });

  useEffect(() => {
    if (!!localStorage.getItem("jwtToken")) {
      const { name, isModerator } = decodeToken(
        localStorage.getItem("jwtToken")
      );
      setUser({
        ...user,
        name: name,
        isModerator: isModerator,
      });
    }
  }, [loginUser]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

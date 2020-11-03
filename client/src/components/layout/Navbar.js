import React, { useState, useContext, useEffect } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { Typography } from "antd";
import axios from "axios";
const Navbar = () => {
  const { Title } = Typography;
  const [user, setUser] = useContext(UserContext);
  const handleClick = (e) => {
    setMenuHighlight({
      current: e.key,
    });
  };

  const handleLocationChange = () => {
    let baseIndex = 1;
    let location = window.location.pathname.split("/");
    console.log(location);
    return location[baseIndex] === "" ? "home" : location[baseIndex];
  };

  const [menuHighlight, setMenuHighlight] = useState({
    current: handleLocationChange(),
  });

  
  useEffect(() => {
    console.log(axios.defaults.headers.common["Authorization"])
    
  }, [axios.defaults.headers.common["Authorization"]])
    

  return (
    <div>
      <Menu
        onClick={(e) => handleClick(e)}
        selectedKeys={[menuHighlight.current]}
        mode="horizontal"
      >
        <Menu.Item key="/"></Menu.Item>
        <Link to="/">Homepage</Link>
        <Menu.Item key="/">{user.name}</Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;

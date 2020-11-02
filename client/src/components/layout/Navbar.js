import React, { useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const Navbar = () => {

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


  return (
    <div>
      <Menu
        onClick={(e) => handleClick(e)}
        selectedKeys={[menuHighlight.current]}
        mode="horizontal"
      >
        <Menu.Item key="/"></Menu.Item>
        <Link to="/">Homepage</Link>
      </Menu>
    </div>
  );
};

export default Navbar;

import React, { Component, useState } from "react";
import { Menu } from "antd";

const Navbar = () => {
  const [menuClicked, setMenuClicked] = useState({
    current: "thonburian",
  });

  const handleClick = (e) => {
    console.log("click", e);
    setMenuClicked({
      current: e.key,
    });
  };

  return (
    <div>
      <Menu
        onClick={() => handleClick}
        selectedKeys={[menuClicked.current]}
        mode="horizontal"
      >
        <Menu.Item key="thonburian">Homepage</Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;

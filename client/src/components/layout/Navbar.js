import React, { useState, useContext, useEffect } from "react";
import { Menu, Button } from "antd";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { Typography } from "antd";
import { getUsername } from "../../utils/action";
const Navbar = () => {
  const [user, setUser] = useState("");
  const history = useHistory();
  const handleClick = (e) => {
    setMenuHighlight({
      current: e.key,
    });
  };

  const handleLocationChange = () => {
    let baseIndex = 1;
    let location = window.location.pathname.split("/");
    return location[baseIndex] === "" ? "home" : location[baseIndex];
  };

  const [menuHighlight, setMenuHighlight] = useState({
    current: handleLocationChange(),
  });

  const handleLogout = () => {
    history.push("/login");
    localStorage.clear();
  };

  useEffect(() => {
    if (!!localStorage.jwtToken) {
      setUser(getUsername(localStorage.jwtToken));
    } else {
      history.push("/login");
    }
  }, []);
  return (
    <div>
      <Menu
        onClick={(e) => handleClick(e)}
        selectedKeys={[menuHighlight.current]}
        mode="horizontal"
        style={{ marginBottom: "40px" }}
      >
        <Menu.Item key="/"></Menu.Item>
        <Link to="/">Homepage</Link>
        {menuHighlight.current != "login" && (
          <Menu.Item key="2">{user}</Menu.Item>
        )}
        <Button type="link" onClick={handleLogout}>
          Log out
        </Button>
      </Menu>
    </div>
  );
};

export default Navbar;

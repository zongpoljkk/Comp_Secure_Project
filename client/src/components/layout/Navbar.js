import React, { useState, useEffect } from "react";
import { Menu, Button } from "antd";
import { Link, useHistory } from "react-router-dom";
import { decodeToken } from "../../utils/action";
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
      const { name } = decodeToken(localStorage.jwtToken);
      setUser(name);
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
        <Menu.Item key={1}></Menu.Item>
        <Menu.Item key={3}>
          <Link to="/">Homepage</Link>
        </Menu.Item>
        {menuHighlight.current != "login" && (
          <Menu.Item key={2}>{user}</Menu.Item>
        )}
        <Menu.Item key={5}>
          <Button type="link" onClick={handleLogout}>
            Log out
          </Button>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;

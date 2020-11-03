import React, { useState, useContext, useEffect } from "react";
import { Menu, Button } from "antd";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { Typography } from "antd";
import { getUsername } from "../../utils/action";
const Navbar = () => {
  const { Title } = Typography;
  const [user, setUser] = useState("");
  const history = useHistory();
  const handleClick = (e) => {
    console.log(e.key);
    setMenuHighlight({
      current: e.key,
    });
  };

  const handleLocationChange = () => {
    let baseIndex = 1;
    let location = window.location.pathname.split("/");
    console.log(location);
    console.log(location[baseIndex]);

    return location[baseIndex] === "" ? "home" : location[baseIndex];
  };

  const [menuHighlight, setMenuHighlight] = useState({
    current: handleLocationChange(),
  });

  const handleLogout = () => {
    console.log("logout");
    history.push("/login");
    localStorage.clear();
  };

  useEffect(() => {
    if (!!localStorage.jwtToken) {
      setUser(getUsername(localStorage.jwtToken));
    }
  }, []);
  return (
    <div>
      <Menu
        onClick={(e) => handleClick(e)}
        selectedKeys={[menuHighlight.current]}
        mode="horizontal"
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

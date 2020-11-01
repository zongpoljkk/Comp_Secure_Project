import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";

const Landing = () => {
  return (
    <div>
      <Row>
        <Col span={12}>
          {/* <Link
            to="/register"
            style={{
              width: "140px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
            }}
          >
            Register
          </Link> */}
        </Col>
        <Col span={12}>
          {/* <Link
            to="/login"
            style={{
              width: "140px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
            }}
          >
            Log In
          </Link> */}
        </Col>
      </Row>
    </div>
  );
};

export default Landing;
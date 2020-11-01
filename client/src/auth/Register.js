import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    // this.setState({ [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: name,
      email: email,
      password: password,
      password2: password2,
    };
    console.log(newUser);
  };

  return (
    <div>
      <Row>{/* <Link to="/">Back to Home</Link> */}</Row>
      <Row>
        <Col span={24}>
          <Row>Register</Row>
          <Row>
            Already have an account?
            {/* <Link to="/login"></Link> */}
          </Row>
        </Col>
      </Row>
      <Row></Row>
    </div>
  );
};

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Row, Col } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({});

  const onNameChange = (e) => {
    setName(e.target.value)
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  };

  const onPassword2Change = (e) => {
    setPassword2(e.target.value)
  };

  const onSubmit = (e) => {
    const newUser = {
      name: name,
      email: email,
      password: password,
      password2: password2,
    };
    console.log(newUser);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Row>
        <Link to="/">Back to Home</Link>
      </Row>
      <Row>
        <Col span={24}>
          <Row>Register</Row>
          <Row>
            <Link to="/login">Already have an account?</Link>
          </Row>
        </Col>
      </Row>
      <Row>
        <Form
          {...layout}
          name="register"
          onFinish={onSubmit}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
            onChange={onNameChange}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
            onChange={onEmailChange}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            onChange={onPasswordChange}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm your Password"
            name="password2"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            onChange={onPassword2Change}
          >
            <Input.Password />
          </Form.Item>

          {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </Row>
      <Row></Row>
    </div>
  );
};

export default Register;

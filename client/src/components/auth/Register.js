import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Input, Button, Row, Col, Typography } from "antd";
import { registerUser } from "../../utils/action";

const { Title } = Typography;

const layout = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 25,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 12,
    span: 16,
  },
};

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const history = useHistory();

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onPassword2Change = (e) => {
    setPassword2(e.target.value);
  };

  const onSubmit = (e) => {
    const newUser = {
      name: name,
      email: email,
      password: password,
      password2: password2,
    };
    console.log(newUser);
    registerUser(newUser, history);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Row style={{ marginTop: "40px" }}>
        <Col span={8}></Col>
        <Col span={8}>
          <Title style={{ textAlignLast: "center" }}>Register</Title>
        </Col>
      </Row>
      <Row style={{ marginTop: "20px" , marginBottom : "10px"}}>
        <Col span={8}></Col>
        <Col span={8}>
          <Row style={{ justifyContent: "space-around" }}>
            <Link to="/">Back to Home</Link>
            <Link to="/login">Already have an account?</Link>
          </Row>
        </Col>
      </Row>
      <Row style={{ justifyContent: "center" }}>
        <Col span={7}></Col>
        <Col span={9}>
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
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Sign up
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </Col>
        <Col span={7}></Col>
      </Row>
    </div>
  );
};

export default Register;

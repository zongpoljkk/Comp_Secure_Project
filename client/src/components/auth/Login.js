import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { loginUser } from "../../utils/action";
import { UserContext } from "../../context/UserContext";
import { useHistory } from "react-router-dom";
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const onEmailChange = (e) => {
    // TODO:
    // this.setState({ [e.target.id]: e.target.value });
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    const userData = {
      email: email,
      password: password,
    };
    const decoded_jwt = await loginUser(userData, history); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
   
    setUser({
      ...user,
      name: decoded_jwt.name,
      isModerator: decoded_jwt.isModerator,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <div>
      <Link to="/">Back to home</Link>
      <div>
        <h1>Login</h1>
        <p>
          Don't have an account?
          <Link to="/register">Register</Link>
        </p>
      </div>
      <Form
        {...layout}
        name="register"
        onFinish={onSubmit}
        onFinishFailed={onFinishFailed}
      >
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

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;

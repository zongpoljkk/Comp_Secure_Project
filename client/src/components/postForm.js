import React, { useContext } from "react";
import { Form, Input, Button } from "antd";
import "antd/dist/antd.css";
import { addPost, decodeToken } from "../utils/action";
import { UserContext } from "../context/UserContext";

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
};

const PostForm = () => {
  const { user, setUser } = useContext(UserContext);
  const onFinish = (values) => {
    const { name } = decodeToken(localStorage.jwtToken);
    const request = {
      name: name,
      post: values.post.Post,
      comments: [],
    };
    addPost(request);
  };
  const checkToken = () => {
    console.log(localStorage);
    console.log(user);
    console.log(decodeToken(localStorage.jwtToken));
  };
  return (
    <Form name="nest-messages" onFinish={onFinish}>
      <Form.Item name={["post", "Post"]} label="Post">
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 1 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginLeft: "10px" }}
          onClick={checkToken}
        >
          Check Token Pap
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;

import React, { useContext } from "react";
import { Form, Input, Button } from "antd";
import "antd/dist/antd.css";
import { addPost } from "../utils/action";
import { UserContext } from "../context/UserContext";
import { getUsername } from "../utils/action";

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
};

const PostForm = () => {
  const [user, setUser] = useContext(UserContext);
  const onFinish = (values) => {
    const name = getUsername(localStorage.jwtToken);
    setUser(name);
    const request = {
      name: name,
      post: values.post.Post,
      comments: [],
    };
    addPost(request);
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
      </Form.Item>
    </Form>
  );
};

export default PostForm;

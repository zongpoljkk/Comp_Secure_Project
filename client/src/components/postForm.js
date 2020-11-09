import React, { useContext, useState } from "react";
import { Form, Input, Button } from "antd";
import "antd/dist/antd.css";
import { addPost, decodeToken } from "../utils/action";
import { UserContext } from "../context/UserContext";
import { Link, useHistory, Redirect } from "react-router-dom";

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
};

const PostForm = ({ onAddPost }) => {
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const onFinish = async (values) => {
    const { name } = decodeToken(localStorage.jwtToken);
    const request = {
      name: name,
      post: values.post.Post,
      comments: [],
    };
    setIsLoading(true);
    const status = await onAddPost(request);
    if (status == "200") {
      setIsLoading(false);
    }
  };

  return (
    <Form name="nest-messages" onFinish={onFinish}>
      <Form.Item name={["post", "Post"]} label="Post">
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 1 }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;

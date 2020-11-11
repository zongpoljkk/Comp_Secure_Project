import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import "antd/dist/antd.css";

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
};

const PostForm = ({ onAddPost }) => {
  const [isLoading, setIsLoading] = useState(false);
  const onFinish = async (values) => {
    const request = {
      post: values.post.Post,
    };
    setIsLoading(true);
    const status = await onAddPost(request);
    if (status === "200") {
      setIsLoading(false);
    }
    document.getElementById("inputPost").value = "";
  };

  return (
    <Form name="nest-messages" onFinish={onFinish}>
      <Form.Item name={["post", "Post"]} label="Post">
        <Input.TextArea id="inputPost" />
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

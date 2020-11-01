import React from "react";
import { Form, Input, Button } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
};

const PostForm = () => {
  const history = useHistory();
  const onFinish = (values) => {
    console.log("new");
    const request = {
      name: "Bosskung",
      post: values.post.Post,
      comment: [],
    };
    axios
      .post("http://localhost:5000/api/posts/newpost", {
        request,
      })
      .then((res) => history.push('/homepage'))
      .catch((err) => console.log(err));
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

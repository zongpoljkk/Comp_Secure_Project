import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import { Form, Input, InputNumber, Button } from "antd";
import "antd/dist/antd.css";
import axios from "axios";

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
};

const PostForm = () => {
  const onFinish = (values) => {
    const request = {
      name: "Bosskung",
      post: values.post.Post,
      date: new Date(),
      comment: [],
    };
    console.log(request);
    //   axios
    //     .post("localhost:5000/api/post/newpost", {
    //       request,
    //     })
    //     .then((res) => console.log(res))
    //     .catch((err) => console.log(err));
  };
  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish}>
      <Form.Item name={["post", "Post"]} label="Post">
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;

import React, { useState, Fragment, useEffect } from "react";
import { Col, Row } from "antd";
import PostForm from "../postForm";
import Posts from "../posts";
import Navbar from "../layout/Navbar";
import { addPost, getAllPosts } from "../../utils/action";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const onAddpost = async (request) => {
    const status = await addPost(request);
    return status;
  };

  return (
    <Fragment>
      <Navbar />
      <Row>
        <Col span={3}></Col>
        <Col span={18}>
          <PostForm onAddPost={onAddpost} />
          <Posts  />
        </Col>
        <Col span={3}></Col>
      </Row>
    </Fragment>
  );
};

export default HomePage;

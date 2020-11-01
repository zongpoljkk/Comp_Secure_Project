import React, { useState, Fragment, useEffect } from "react";
import { Col, Row } from "antd";
import PostForm from "../postForm";
import Posts from "../posts";

const HomePage = () => {
  // const [posts, setPosts] = useState([]);

  // useEffect(async () => {
  //   const results = await axios.get("http://localhost:5000/api/posts/allpost")
  //   console.log(results.data)
  //   setPosts(results.data)
  // }, []);

  return (
    <Fragment>
      <Row>
        <Col span={3}></Col>
        <Col span={18}>
          <PostForm />
          <Posts/>
        </Col>
        <Col span={3}></Col>
      </Row>
    </Fragment>
  );
};

export default HomePage;

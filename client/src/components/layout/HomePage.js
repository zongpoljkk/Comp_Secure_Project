import React, { useState, Fragment, useEffect } from "react";
import { Col, Row } from "antd";
import PostForm from "../postForm";
import Posts from "../posts";
import Navbar from "../layout/Navbar";

const HomePage = () => {
  return (
    <Fragment>
      <Navbar />
      <Row>
        <Col span={3}></Col>
        <Col span={18}>
          <PostForm />
          <Posts />
        </Col>
        <Col span={3}></Col>
      </Row>
    </Fragment>
  );
};

export default HomePage;

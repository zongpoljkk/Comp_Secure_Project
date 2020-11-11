import React, { useState, Fragment, useEffect } from "react";
import { Col, Row } from "antd";
import PostForm from "../postForm";
import Posts from "../posts";
import Navbar from "../layout/Navbar";
import { addPost } from "../../utils/action";

const HomePage = () => {
  const [temp, setTemp] = useState(1)
  const onAddpost = async (request) => {
    console.log("add post")
    const status = await addPost(request);
    setTemp(temp+1)
    return status;
  };

  useEffect(() => {
    console.log(`useEffect Homepage`)
   
  },[])

  return (
    <Fragment>
      <Navbar />
      <Row>
        <Col span={3}></Col>
        <Col span={18}>
          <PostForm onAddPost={onAddpost} />
          <Posts onAddPost={onAddpost}/>
        </Col>
        <Col span={3}></Col>
      </Row>
    </Fragment>
  );
};

export default HomePage;

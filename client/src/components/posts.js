import React, { createElement, useState, Fragment, useEffect } from "react";
import { Tooltip, Comment, Avatar, Form, Button, List, Input } from "antd";
import "antd/dist/antd.css";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";
import moment from "moment";
import axios from "axios";
import { getAllPosts } from "../utils/action";
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { TextArea } = Input;
  const Editor = ({ onChange, onSubmit }) => (
    <>
      <Form.Item>
        <TextArea rows={2} onChange={onChange} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" onClick={onSubmit} type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </>
  );

  const handleChange = () => {};
  const handleSubmit = () => {};

  useEffect(async () => {
    setIsLoading(true);
    // getAllPosts();
    // console.log(results)
    setPosts(await getAllPosts());
    setIsLoading(false);
  }, []);

  const renderComment = (comment) => {
    console.log(comment);
    let field = [];
    for (let i = 0; i != comment.length; i++) {
      field.push(
        <Comment
          key={i}
          id={i}
          author={<a>{comment[i].name}</a>}
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={<p>{comment[i].post}</p>}
          datetime={
            <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
              <span>{moment().fromNow()}</span>
            </Tooltip>
          }
        ></Comment>
      );
    }
    return field;
  };

  return (
    <Fragment>
      {!isLoading ? (
        posts.map((value, index) => {
          return (
            <Comment
              key={value._id}
              id={value._id}
              author={<a>{value.name}</a>}
              avatar={
                <Avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="Han Solo"
                />
              }
              content={<p>{value.post}</p>}
              datetime={
                <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
                  <span>{moment().fromNow()}</span>
                </Tooltip>
              }
            >
              {renderComment(value.comment)}
              <Editor onChange={handleChange} onSubmit={handleSubmit} />
            </Comment>
          );
        })
      ) : (
        <div></div>
      )}
    </Fragment>
  );
};

export default Posts;

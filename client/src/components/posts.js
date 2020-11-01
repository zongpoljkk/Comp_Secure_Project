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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const results = await axios.get(
        "http://localhost:5000/api/posts/allpost"
      );
      setPosts(results.data);
      setIsLoading(false);
      console.log(results.data);
    };
    fetchData();
  }, []);

  const renderComment = (comment) => {
    console.log(comment);
    let field = [];
    for (let i = 0; i != comment.length; i++) {
      field.push(
        <Comment
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

import React, { useState, Fragment, useEffect, useContext } from "react";
import { Tooltip, Comment, Avatar, Form, Button, Input } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import { getAllPosts, addComment, getUsername } from "../utils/action";
import { UserContext } from "../context/UserContext";

const { TextArea } = Input;
const Editor = ({ id, onChange, onSubmit }) => (
  <>
    <Form.Item id={id}>
      <TextArea id={id} rows={2} onChange={onChange} />
    </Form.Item>
    <Form.Item id={id}>
      <Button id={id} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState({
    id: "",
    name: user.name,
    comment: "",
  });
  const handleChange = (e) => {
    console.log(user);
    setComments({ id: e.target.id, name: user, comment: e.target.value });
  };
  const handleSubmit = () => {
    console.log(comments);
    addComment(comments);
  };

  useEffect(async () => {
    setIsLoading(true);
    setPosts(await getAllPosts());
    setIsLoading(false);
    if (!!localStorage.jwtToken) {
      console.log("have token");
      setUser(getUsername(localStorage.jwtToken));
    }
    // const name = await getUsername(localStorage.jwtToken);
    // setUser(name);
  }, []);

  const renderComment = (comment) => {
    let field = [];
    for (let i = 0; i != comment.length; i++) {
      field.push(
        <Comment
          key={`comment_${i}`}
          id={i}
          author={<a>{comment[i].name}</a>}
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={<p>{comment[i].comment}</p>}
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
              {renderComment(value.comments)}
              <Editor
                id={value._id}
                onChange={handleChange}
                onSubmit={handleSubmit}
              />
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

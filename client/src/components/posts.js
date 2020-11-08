import React, { useState, Fragment, useEffect, useContext } from "react";
import { Tooltip, Comment, Avatar, Form, Button, Input, Modal } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import {
  getAllPosts,
  addComment,
  getUsername,
  editPost,
  editComment,
} from "../utils/action";
import { UserContext } from "../context/UserContext";
import { EditOutlined } from "@ant-design/icons";
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
  const [visible, setVisible] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [editID, setEditID] = useState();
  const [shoudEditComment, setShoudEditComment] = useState(false);
  const [comments, setComments] = useState({
    id: "",
    name: user.name,
    comment: "",
  });
  const handleChange = (e) => {
    setComments({ id: e.target.id, name: user, comment: e.target.value });
  };
  const handleSubmit = () => {
    addComment(comments);
  };
  const handleEdit = (value, id, isComment) => {
    setEditValue(value);
    setEditID(id);
    setShoudEditComment(isComment);
    setVisible(true);
  };
  const handleOk = () => {
    setVisible(false);
    console.log(`Edit ${editValue}, ID ${editID}`);
    if (shoudEditComment) {
      editComment({ _id: editID, value: editValue });
    } else {
      editPost({ _id: editID, value: editValue });
    }
  };
  const handleCancel = () => {
    setVisible(false);
  };
  useEffect(async () => {
    setPosts(await getAllPosts());
    if (!!localStorage.jwtToken) {
      setUser(getUsername(localStorage.jwtToken));
    }
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
          actions={[
            <span
              key="comment-list-reply-to-0"
              onClick={() => handleEdit(comment[i].comment, comment[i]._id,true)}
            >
              Edit comment <EditOutlined />
            </span>,
          ]}
        ></Comment>
      );
    }
    return field;
  };

  return (
    <Fragment>
      {posts.map((value, index) => {
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
            actions={[
              <span
                key="comment-list-reply-to-0"
                onClick={() => handleEdit(value.post, value._id,false)}
              >
                Edit post <EditOutlined />
              </span>,
            ]}
          >
            {renderComment(value.comments)}
            <Editor
              id={value._id}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </Comment>
        );
      })}
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          bordered={false}
          placeholder="edit here"
          onChange={(e) => setEditValue(e.target.value)}
        />
      </Modal>
    </Fragment>
  );
};

export default Posts;

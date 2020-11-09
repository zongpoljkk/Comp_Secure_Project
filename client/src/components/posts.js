import React, { useState, Fragment, useEffect, useContext } from "react";
import { Tooltip, Comment, Avatar, Form, Button, Input, Modal } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import {
  getAllPosts,
  addComment,
  editPost,
  editComment,
  addPost,
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
  const { user, setUser } = useContext(UserContext);
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
    setComments({ id: e.target.id, name: user.name, comment: e.target.value });
  };

  const handleSubmit = async () => {
    const status = await addComment(comments);
  };

  const handleEdit = (value, id, isComment) => {
    setEditValue(value);
    setEditID(id);
    setShoudEditComment(isComment);
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
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
            <Tooltip>
              <span>
                {moment(comment[i].date, "YYYY MM DDT hh:mm:ss").format(
                  "DD/MM/YYYY hh:mm:ss"
                )}
              </span>
            </Tooltip>
          }
          actions={
            (user.isModerator || user.name == comment[i].name) && [
              <span
                key="comment-list-reply-to-0"
                onClick={() =>
                  handleEdit(comment[i].comment, comment[i]._id, true)
                }
              >
                Edit comment <EditOutlined />
              </span>,
            ]
          }
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
              <Tooltip>
                <span>
                  {moment(value.date, "YYYY MM DDT hh:mm:ss").format(
                    "DD/MM/YYYY hh:mm:ss"
                  )}
                </span>
              </Tooltip>
            }
            actions={
              (user.isModerator || user.name == value.name) && [
                <span
                  key="comment-list-reply-to-0"
                  onClick={() => handleEdit(value.post, value._id, false)}
                >
                  Edit post <EditOutlined />
                </span>,
              ]
            }
          >
            {renderComment(value.comments)}
            <Editor
              index={index}
              id={value._id}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </Comment>
        );
      })}
      <Modal
        title="Edit"
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

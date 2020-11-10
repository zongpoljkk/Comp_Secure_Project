import React, {
  useState,
  Fragment,
  useEffect,
  useContext,
  useMemo,
} from "react";
import {
  Tooltip,
  Comment,
  Avatar,
  Form,
  Button,
  Input,
  Modal,
  Space,
} from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import {
  getAllPosts,
  addComment,
  editPost,
  editComment,
  addPost,
  deleteComment,
  deletePost,
} from "../utils/action";
import { UserContext } from "../context/UserContext";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;
const { confirm } = Modal;

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

const Posts = ({ onAddPost }) => {
  const [posts, setPosts] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [editID, setEditID] = useState();
  const [shoudEditComment, setShoudEditComment] = useState(false);
  const [shoudDeleteComment, setShoudDeleteComment] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [deleteValue, setDeleteValue] = useState({
    owner_id: "",
    _id: "",
  });
  const [comments, setComments] = useState({
    id: "",
    name: user.name,
    email: user.email,
    comment: "",
  });


  const handleChange = (e) => {
    console.log(comments);
    setComments({ id: e.target.id, name: user.name, comment: e.target.value });
  };

  const handleSubmit = async () => {
    const status = await addComment(comments);
    setComments({ ...comments, comment: "" });
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
    setIsDelete(false);
  };

  const showDeleteConfirm = (commentID, ownerID, bool) => {
    setDeleteValue({ ...deleteValue, owner_id: ownerID, _id: commentID });
    console.log(deleteValue);
    setIsDelete(true);
    setShoudDeleteComment(bool);
  };

  const handleDelete = async (ownerId, id) => {
    if (shoudDeleteComment) {
      console.log(deleteValue);
      const status = await deleteComment(deleteValue);
      setIsDelete(!isDelete);
    } else {
      console.log("delete post");
      console.log(`_id ${id}`);
      const status = await deletePost({ _id: deleteValue.owner_id });
      setIsDelete(!isDelete);
    }
  };

  useEffect(async () => {
    console.log(user)
    // console.log(value)
    console.log(`use Effect posts []`);
    setPosts(await getAllPosts());
  }, [onAddPost, comments, isDelete]);

  const renderComment = (comment, ownerId) => {
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
                <Space>
                  Edit comment <EditOutlined />
                </Space>
              </span>,
              user.isModerator && (
                <span
                  key="comment-list-reply-to-0"
                  onClick={() => {
                    showDeleteConfirm(comment[i]._id, ownerId, true);
                  }}
                >
                  <Space>
                    Delete comment <DeleteOutlined />
                  </Space>
                </span>
              ),
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
              (user.isModerator || user.email === value.email) && [
                <span
                  key="comment-list-reply-to-0"
                  onClick={() => handleEdit(value.post, value._id, false)}
                >
                  <Space>
                    Edit post <EditOutlined />
                  </Space>
                </span>,
                user.isModerator && (
                  <span
                    key="comment-list-reply-to-0"
                    onClick={() => {
                      showDeleteConfirm(null, value._id, false);
                    }}
                  >
                    <Space>
                      Delete post <DeleteOutlined />
                    </Space>
                  </span>
                ),
              ]
            }
          >
            {renderComment(value.comments, value._id)}
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
          value={comments.comment}
          bordered={false}
          placeholder="edit here"
          onChange={(e) => setEditValue(e.target.value)}
        />
      </Modal>
      <Modal
        title="Delete"
        visible={isDelete}
        onOk={handleDelete}
        // confirmLoading={confirmLoading}
        onCancel={() => setIsDelete(false)}
      >
        <ExclamationCircleOutlined />
      </Modal>
    </Fragment>
  );
};

export default Posts;

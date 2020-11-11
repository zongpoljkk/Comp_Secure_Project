const { json } = require("body-parser");
const { request } = require("express");
const express = require("express");
const router = express.Router();

const Post = require("../../models/Post");
const User = require("../../models/User");

router.post("/newpost", (req, res) => {
  // console.log("new Post");
  // console.log(req.body);
  const newPost = new Post({
    name: req.userInfo.name,
    email: req.userInfo.email,
    post: req.body.post,
    comments: [],
  });
  newPost
    .save()
    .then((user) => res.json(user))
    .catch((err) => console.log(err));
});

router.get("/allpost", (req, res) => {
  // console.log("Allpost");
  Post.find()
    .sort({ date: "desc" })
    .then((post) => {
      res.json(post);
      // console.log(post);
    })
    .catch((err) => console.log(err));
});

router.post("/newcomment", (req, res) => {
  const newComment = {
    name: req.userInfo.name,
    email: req.userInfo.email,
    comment: req.body.comment,
  };
  // console.log(newComment);
  Post.findOneAndUpdate(
    { _id: req.body.id },
    {
      $push: {
        comments: newComment,
      },
    }
  )
    .then((comment) => {
      res.json(comment);
      return 200;
    })
    .catch((err) => console.log(err));
});

router.post("/edit-post", (req, res) => {
  // console.log(req.body);
  // const editValue = { _id : res.body._id , editValue : req.body.value}
  const ownerEmail = req.userInfo.email;
  console.log(ownerEmail);
  const filter = { _id: req.body._id, email: req.userInfo.email };
  // if(ownerEmail == Post.findOneAndUpdate){

  // }
  Post.findOneAndUpdate(filter, { post: req.body.value })
    .then((post) => {
      if (post == null) {
        res.status(403);
        res.json({
          message: "You not have permission",
        });
      } else {
        res.status(200);
        res.json(post);
      }
    })
    .catch((err) => console.log(err));

  // Post.findByIdAndUpdate({ _id: req.body._id }, { post: req.body.value })
  //   .then((post) => res.json(post))
  //   .catch((err) => console.log(err));
});

router.post("/edit-comment", (req, res) => {
  // console.log(req.userInfo);
  Post.update(
    { "comments._id": req.body._id, "comments.email": req.userInfo.email },
    {
      $set: {
        "comments.$.comment": req.body.value,
      },
    }
  )
    .then((comment) => {
      console.log(comment.nModified);
      if (comment.nModified === 1) {
        res.status(200);
        res.json({
          message: "edit comment success",
        });
      } else {
        res.status(403);
        res.json({
          message: "You not have permission",
        });
      }
    })
    .catch((err) => res.json(err));
});

router.post("/delete-post", (req, res) => {
  console.log(req.body);
  Post.deleteOne({ _id: req.body._id, email: req.userInfo.email })
    .then((deleted) => {
      // console.log(deleted)
      if (deleted.n == 1) {
        res.status(200);
        res.json({
          message: "delete post success",
        });
      } else {
        res.status(403);
        res.json({
          message: "You not have permission",
        });
      }
    })
    .catch((err) => res.json(err));
});

router.post("/delete-comment", (req, res) => {
  console.log(req.body);
  Post.updateOne(
    { _id: req.body.owner_id },
    { $pull: { comments: { _id: req.body._id, email: req.userInfo.email } } }
  )
    .then((deleted) => {
      if (deleted.nModified == 1) {
        res.status(200);
        res.json({
          "message" : "delete comment success"
        });
      } else {
        res.status(403)
        res.json({
          "message" : "You not have permission"
        })
      }
    })
    .catch((err) => res.json(err));
});

module.exports = router;

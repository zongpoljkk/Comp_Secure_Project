const { json } = require("body-parser");
const { request } = require("express");
const express = require("express");
const router = express.Router();

const Post = require("../../models/Post");

router.post("/newpost", (req, res) => {
  console.log("new Post");
  console.log(req.body);
  const newPost = new Post({
    name: req.body.name,
    email: req.body.email,
    post: req.body.post,
    comments: [],
  });
  newPost
    .save()
    .then((user) => res.json(user))
    .catch((err) => console.log(err));
});

router.get("/allpost", (req, res) => {
  console.log("Allpost");
  Post.find()
    .sort({ date: "desc" })
    .then((post) => {
      res.json(post);
      console.log(post);
    })
    .catch((err) => console.log(err));
});

router.post("/newcomment", (req, res) => {
  const newComment = { name: req.body.name, comment: req.body.comment };
  console.log(newComment);
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
  console.log(req.body);
  // const editValue = { _id : res.body._id , editValue : req.body.value}
  Post.findByIdAndUpdate({ _id: req.body._id }, { post: req.body.value })
    .then((post) => res.json(post))
    .catch((err) => console.log(err));
});

router.post("/edit-comment", (req, res) => {
  console.log(req.body);
  Post.update(
    { "comments._id": req.body._id },
    {
      $set: {
        "comments.$.comment": req.body.value,
      },
    }
  )
    .then((comment) => res.json(comment))
    .catch((err) => res.json(err));
});

router.post("/delete-post", (req, res) => {
  console.log(req.body);
  Post.deleteOne({ _id: req.body._id })
    .then((deleted) => res.json(deleted))
    .catch((err) => res.json(err));
});

router.post("/delete-comment", (req, res) => {
  console.log(req.body);
  Post.updateOne(
    { _id: req.body.owner_id },
    { $pull: { comments: { _id: req.body._id } } }
  )
    .then((deleted) => res.json(deleted))
    .catch((err) => res.json(err));
});

module.exports = router;

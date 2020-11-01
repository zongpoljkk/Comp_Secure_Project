const { json } = require("body-parser");
const express = require("express");
const router = express.Router();

const Post = require("../../models/Post");

router.post("/newpost", (req, res) => {
  console.log("new Post");
  console.log(req.body.post)
  const newPost = new Post({
    name: "Bosskung",
    post: req.body.post,
    comment: [{name : "Boom" , post : "EIEI"},{name : "Za" , post : "Kuy rai"}],
  });
  newPost
    .save()
    .then((user) => res.json(user))
    .catch((err) => console.log(err));
});

router.get("/allpost", (req, res) => {
  console.log("Allpost");
  Post.find()
    .then((post) => {
      res.json(post);
    })
    .catch((err) => console.log(err));
});

router.post("/newcomment", (req, res) => {
  console.log("new comment");
});

module.exports = router;

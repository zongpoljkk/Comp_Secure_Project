const { json } = require("body-parser");
const express = require("express");
const router = express.Router();

const Post = require("../../models/Post");

router.post("/newpost", (req, res) => {
  console.log("new Post");
  const newPost = new Post({
    name: "Bosskung",
    post: "Hello world",
    comment: [],
  });
  newPost
    .save()
    .then((user) => res.json(user))
    .catch((err) => console.log(err));
});

router.get("/allpost", (req, res) => {
  console.log("Allpost");
  return 
});

module.exports = router;

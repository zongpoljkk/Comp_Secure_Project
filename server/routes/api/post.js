const { json } = require("body-parser");
const express = require("express");
const router = express.Router();

const Post = require("../../models/Post");

router.post("/newpost", (req, res) => {
  console.log("new Post");
  console.log(req.body.post);
  const newPost = new Post({
    name: "Bosskung",
    post: req.body.post,
    comments: [
      { name: "Boom", comment: "EIEI" },
      { name: "Za", comment: "Kuy rai" },
    ],
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
  
  const newComment = { name: req.body.name, comment: req.body.comment };
  console.log(newComment)
  Post.findOneAndUpdate(
    { _id: req.body.id },
    {
      $push: {
        comments: newComment,
      },
    }
  )
    .then((comment) => res.json(comment))
    .catch((err) => console.log(err));
});

module.exports = router;

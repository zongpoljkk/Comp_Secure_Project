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
    .catch((err) => console.log("Error getting new posts"));
});

router.get("/allpost", (req, res) => {
  // console.log("Allpost");
  // console.log(req.userInfo);
  Post.find()
    .sort({ date: "desc" })
    .then((post) => {
      res.json(post);
      // console.log(post);
    })
    .catch((err) => console.log("Error getting all posts"));
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
    .catch((err) => console.log("Error creating comment"));
});

router.post("/edit-post", (req, res) => {
  // console.log(req.body);
  // const editValue = { _id : res.body._id , editValue : req.body.value}
  const ownerEmail = req.userInfo.email;
  // console.log(ownerEmail);
  const filterUser = { _id: req.body._id, email: req.userInfo.email };
  const filterModerator = { _id: req.body._id };
  const filter = req.userInfo.isModerator ? filterModerator : filterUser;
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
    .catch((err) => {
      console.log("Error editing post")
    });

  // Post.findByIdAndUpdate({ _id: req.body._id }, { post: req.body.value })
  //   .then((post) => res.json(post))
  //   .catch((err) => console.log(err));
});

router.post("/edit-comment", (req, res) => {
  // console.log(req.userInfo);
  const commentID = req.body._id
  const loginEmail = req.userInfo.email
  // console.log(loginEmail)
  Post.findOne({ "comments._id": req.body._id }).then((post) => {
    // console.log(comment)
    // console.log(post.comments)
    // console.log(commentID)
    const targetComment = post.comments.filter((comment) => {
      // console.log(comment._id)
      // console.log(commentID)
      return comment._id == commentID
    })
    // console.log(targetComment[0])
    if (targetComment[0].email == loginEmail) {
      Post.update(
        { "comments._id": req.body._id },
        {
          $set: {
            "comments.$.comment": req.body.value,
          },
        }
      ).then(() => {
        res.status(200);
        res.json({
          message: "edit comment success",
        });
      });
    } else {
      res.status(403);
      res.json({
        message: "You not have permission",
      });
    }
  });
  // Post.update(
  //   { "comments._id": req.body._id, "comments.email": req.userInfo.email },
  //   {
  //     $set: {
  //       "comments.$.comment": req.body.value,
  //     },
  //   }
  // )
  //   .then((comment) => {
  //     console.log(comment.nModified);
  //     if (comment.nModified === 1) {
  //       res.status(200);
  //       res.json({
  //         message: "edit comment success",
  //       });
  //     } else {
  //       res.status(403);
  //       res.json({
  //         message: "You not have permission",
  //       });
  //     }
  //   })
  //   .catch((err) => res.json(err));
});

router.post("/delete-post", (req, res) => {
  // console.log(req.body);
  const filterUser = { _id: req.body._id, email: req.userInfo.email };
  const filterModerator = { _id: req.body._id };
  const filter = req.userInfo.isModerator ? filterModerator : filterUser;
  Post.deleteOne(filter)
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
  // console.log(req.body);
  Post.updateOne(
    { _id: req.body.owner_id },
    { $pull: { comments: { _id: req.body._id, email: req.userInfo.email } } }
  )
    .then((deleted) => {
      if (deleted.nModified == 1) {
        res.status(200);
        res.json({
          message: "delete comment success",
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

module.exports = router;

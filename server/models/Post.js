const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Crete Schema
const PostSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    // required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  post: {
    type: String,
    required: true,
  },
  comments: [
    {
      name: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = Post = mongoose.model("post", PostSchema);

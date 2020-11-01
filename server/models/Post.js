const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Crete Schema
const PostSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  post: {
    type: String,
    required: true,
  },
  comment: [
    {
      name: {
        type: String,
        required: true,
      },
      post: {
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

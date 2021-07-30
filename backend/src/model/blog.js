const mongoose = require("mongoose");

const { Schema } = mongoose;

/**
 * blog.js
 * 
 * 用于博客和新闻的储存
 */

const blogTagSchema = new Schema({
  title: {
    type: String,
    required: true,
    default: ""
  },
  content: String,
  color: String,
  type: String
});

const blogCommentSchema = new Schema({
  author: {
    
  }
});

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    default: ""
  },
  author: {
    type: String,
    required: true,
    default: ""
  },
  content: {
    type: String,
    required: true,
    default: ""
  },
  time: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    required: true,
    default: "blog" 
  },
  tag: {
    type: [blogTagSchema],
    default: []
  },
  comment: {
    type: [blogCommentSchema],
    default: []
  }
});

module.exports = mongoose.model("User", userSchema);
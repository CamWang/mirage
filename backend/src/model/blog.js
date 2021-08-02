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
  content: {
    type: String
  },
  color: {
    type: String
  },
  type: {
    type: String
  }
});

const blogCommentSchema = new Schema({
  author: {
    type: 
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

module.exports = {
  schema: blogSchema,
  model: mongoose.model("User", blogSchema)
}
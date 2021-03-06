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
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  time: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String,
  },
  replyTo: {
    type: Schema.Types.ObjectId,
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
  created: {
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

const Blog = mongoose.model("Blog", blogSchema);

module.exports = {
  blogSchema,
  blogTagSchema,
  blogCommentSchema,
  Blog
}
const mongoose = require("mongoose");

const { Schema } = mongoose;

/**
 * problem.js
 * 
 * 用于问题的存储
 */

const problemTagSchema = new Schema({
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

const problemSchema = new Schema({
  title: {
    type: String,
    required: true,
    default: ""
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  tag: {
    type: [problemTagSchema],
    default: []
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
  timeLimit: {
    type: Number,
    default: 5000
  },
  memoryLimit: {
    type: Number,
    default: 5000
  },
  specialJudge: {
    type: String,
    default: ""
  },
  data: {
    type: String,
    default: ""
  },
  defunct: {
    type: Boolean,
    default: false
  },
  difficulty: {
    type: String,
    required: true,
    default: "easy" 
  },
});

const Problem = mongoose.model("Problem", problemSchema);

module.exports = {
  problemTagSchema,
  problemSchema,
  Problem
}
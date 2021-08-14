const mongoose = require("mongoose");

const { Schema } = mongoose;

/**
 * submission.js
 * 
 * 提交解答的实体
 */

const submissionSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  problem: {
    type: Schema.Types.ObjectId,
    ref: 'Problem',
  },
  contest: {
    type: Schema.Types.ObjectId,
    ref: 'Contest',
  },
  language: {       // defined in constant.js
    type: Number,
    min: 0,
    max: 4,
    default: 0
  },
  code: {
    type: String,
  },
  result: {         // defined in constant.js
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  testcase: {
    type: Number,
    default: 0
  },
  record: {
    type: Number,
    default: 0
  },
  cec: {
    type: Number,
    default: 0
  },
  time: {
    type: Number,
    default: 0
  },
  memory: {
    type: Number,
    default: 0
  }
});

const Submission = mongoose.model('Submission', submissionSchema);
module.exports = {
  submissionSchema,
  Submission
}
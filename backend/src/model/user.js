const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    default: "123456"
  },
  nickname: {
    type: String,
    default: ""
  },
  name: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  },
  country: {
    type: String,
    default: ""
  },
  school: {
    type: String,
    default: ""
  },
  avatar: {
    type: String,
    default: ""
  },
  role: {
    type: [String],
    default: ["default"]
  },
  defunct: {
    type: Boolean,
    default: false
  },
  rating: {
    type: [Number],
    default: [1500]
  }
});

module.exports = mongoose.model("User", userSchema);
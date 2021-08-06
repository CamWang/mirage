const mongoose = require("mongoose");
const validator = require("../util/validator");
const { role } = require('../util/constant');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {         // 用户名 英文加数字、小写
    type: String,
    required: true,
    validate: {
      validator: validator.username
    }
  },
  password: {
    type: String,
    required: true,
    default: "123456",
    validate: {
      validator: validator.password
    }
  },
  email: {
    type: String,
    validate: {
      validator: validator.email
    }
  },
  phone: {
    type: String,
    validate: {
      validator: validator.phone
    }
  },
  nickname: {
    type: String,
    minLength: 3,
    maxLength: 20
  },
  name: {
    type: String,
    minLength: 2,
    maxLength: 30
  },
  time: {
    type: Date,
    default: Date.now
  },
  country: {
    type: String,
  },
  school: {
    type: String,
  },
  avatar: {
    type: String,
  },
  role: {
    type: [String],
    default: role.default,
    enum: role.list
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

const User = mongoose.model("User", userSchema);

module.exports = {
  userSchema,
  User
}
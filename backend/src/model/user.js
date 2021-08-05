const mongoose = require("mongoose");
const validator = require("@/util/validator");
const { role } = require('@/util/constant');

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
    default: "",
    validate: {
      validator: validator.email
    }
  },
  phone: {
    type: String,
    default: "",
    validate: {
      validator: validator.phone
    }
  },
  nickname: {
    type: String,
    default: "",
    minLength: 3,
    maxLength: 20
  },
  name: {
    type: String,
    default: "",
    minLength: 2,
    maxLength: 30
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
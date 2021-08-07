/**
 * validator.js
 * 
 * 为Mongoose validation功能创建的验证器
 */

const validator = {
  username: function(v) {
    return /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(v);
  },
  password: function(v) {
    return /^(?=.*\d)[A-Za-z\d#?!@$%^&*-]{6,20}$/.test(v);
  },
  email: function(v) {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(v);
  },
  phone: function(v) {
    return /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/.test(v);
  }
}

module.exports = validator;
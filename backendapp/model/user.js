const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model('User',{
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
          if (!validator.isEmail(value))
            throw new Error("Error: Invalid email address");
        }
      },
      password: {
        type: String,
        required: true
      }
});

module.exports = User;
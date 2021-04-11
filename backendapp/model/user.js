const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model('Users', {
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
  },
  address: {
    city: {
      type: String,
      required: true
    }, state: {
      type: String,
      required: true
    }, zip: {
      type: String,
      required: true
    }
  },
  location: {
    long: {
      type: Number,
      required: true
    }, lat: {
      type: Number,
      required: true
    }
  },
});


module.exports = User;
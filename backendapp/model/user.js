const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model('Users', {
  name: {
    first: { type: String },
    last: { type: String }
  },
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
    }, lat: {
      type: Number,
    }
  },
});


module.exports = User;
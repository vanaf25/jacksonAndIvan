const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  hash: String,
  salt: String,
});

const User = mongoose.model('User', UserSchema);

exports.User = User;

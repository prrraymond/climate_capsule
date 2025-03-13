const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: String,
  dateJoined: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
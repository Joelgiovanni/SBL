const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  memberSince: { type: String },
  membershipType: { type: String },
  isAdmin: { type: Boolean }
});

module.exports = User = mongoose.model('users', UserSchema);

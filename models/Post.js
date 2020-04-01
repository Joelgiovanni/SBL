const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PostSchema = new Schema({
  author: { type: String },
  league: { type: String },
  gameTitle: { type: String },
  body: { type: String },
  date: { type: String }
});

module.exports = Post = mongoose.model('posts', PostSchema);

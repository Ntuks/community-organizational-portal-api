const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

// TODO: refine the information we are collecting here - look at linkedIn for example
const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  subtitle: String,
  claps: Number,
  image: String,
  contentBody: String,
  organizations: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organizations',
  },
});

postSchema.plugin(timestamps);

const Post = mongoose.model('Post', postSchema, 'Posts');

module.exports = Post;

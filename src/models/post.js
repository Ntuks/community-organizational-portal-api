const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

// TODO: refine the information we are collecting here - look at linkedIn for example
const postSchema = new mongoose.Schema({});

postSchema.plugin(timestamps);

const Post = mongoose.model('Post', postSchema, 'Posts');

module.exports = { Post, postSchema };

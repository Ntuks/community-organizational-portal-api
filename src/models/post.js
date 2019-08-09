import { Schema, model } from 'mongoose';
import timestamps from 'mongoose-timestamp';

// TODO: refine the information we are collecting here - look at linkedIn for example
const postSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  subtitle: String,
  claps: Number,
  image: String,
  contentBody: String,
  organizations: {
    type: Schema.Types.ObjectId,
    ref: 'Organizations',
  },
});

postSchema.plugin(timestamps);

const Post = model('Post', postSchema, 'Posts');

export default Post;

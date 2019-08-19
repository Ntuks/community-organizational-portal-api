import { Schema, model } from 'mongoose';
import timestamps from 'mongoose-timestamp';

// TODO: refine the information we are collecting here - look at linkedIn for example
const eventSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  involved: Number,
  poster: String,
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organizations',
  },
  orgManager: {
    type: Schema.Types.ObjectId,
    ref: 'Organization Managers',
  },
});

eventSchema.plugin(timestamps);

const Project = model('Project', eventSchema, 'Posts');

export default Project;
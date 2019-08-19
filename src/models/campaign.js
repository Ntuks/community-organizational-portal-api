import { Schema, model } from 'mongoose';
import timestamps from 'mongoose-timestamp';

const campaignSchema = new Schema({
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
  interested: Number,
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

campaignSchema.plugin(timestamps);

const Campaign = model('Campaign', campaignSchema, 'Posts');

export default Campaign;

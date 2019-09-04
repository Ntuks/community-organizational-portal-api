import { Schema, model } from 'mongoose';
import timestamps from 'mongoose-timestamp';

const organizationSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  description: String,
  pboNPONumber: String,
  facebookPageLink: String,
  areasOfEngagement: [String],
  tagLine: String,
  location: String,
  affiliates: [String],
  coordinates: {
    lat: String,
    lng: String,
  },
  status: {
    type: String,
    enum: ['INACTIVE', 'ACTIVE'],
    default: 'INACTIVE',
  },
  contactNo: String,
  profilePicture: String,
  orgManager: {
    type: Schema.Types.ObjectId,
    ref: 'Organization Managers',
  },
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Posts',
    },
  ],
  campaigns: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Posts',
    },
  ],
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Posts',
    },
  ],
});

organizationSchema.plugin(timestamps);

const Organization = model('Organization', organizationSchema, 'Organizations');

export default Organization;

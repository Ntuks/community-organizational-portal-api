import { Schema, model } from 'mongoose';
import timestamps from 'mongoose-timestamp';

const organizationSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  pboNPONumber: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
  },
  facebookPageLink: {
    type: String,
    default: '',
  },
  areasOfEngagement: [String],
  tagline: {
    type: String,
    default: '',
  },
  location: {
    type: String,
    default: '',
  },
  affiliates: [String],
  coordinates: {
    lat: {
      type: Number,
      default: 0,
    },
    lng: {
      type: Number,
      default: 0,
    },
  },
  status: {
    type: String,
    enum: ['INACTIVE', 'ACTIVE'],
    default: 'INACTIVE',
  },
  contactNo: {
    type: String,
    default: '',
  },
  profilePicture: {
    type: String,
    default: '',
  },
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

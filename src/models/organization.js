const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const organizationSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  description: String,
  pboNPONumber: String,
  facebookPageLink: String,
  areasOfEngagement: String,
  tagLine: String,
  location: String,
  affiliates: [String],
  status: {
    type: String,
    enum: ['INACTIVE', 'ACTIVE'],
    default: 'INACTIVE',
  },
  contactNo: String,
  profilePicture: String,
  orgManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization Managers',
  },
  posts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Posts',
  },
});

organizationSchema.plugin(timestamps);

const Organization = mongoose.model('Organization', organizationSchema, 'Organizations');

module.exports = Organization;

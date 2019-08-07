const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const orgManagerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  role: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organizations',
  },
});

orgManagerSchema.plugin(timestamps);

const OrgManagers = mongoose.model('Oranizaion Managers', orgManagerSchema, 'Organizaion Managerss');

module.exports = OrgManagers;

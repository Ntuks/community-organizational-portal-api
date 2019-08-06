const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const orgManagerSchema = new mongoose.Schema({
  role: String,
});

orgManagerSchema.plugin(timestamps);

const Developer = mongoose.model('Developer', orgManagerSchema, 'Developers');

module.exports = Developer;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  surname: {
    type: String,
    required: [true, 'Surname is required'],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Email address is required'],
    // eslint-disable-next-line no-useless-escape
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  contactNo: String,
  userType: String,
  required: true,
});

// Hashing the password before saving it to the database
userSchema.pre('save', async function(next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Validating the password
userSchema.methods.validatePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

// Generating Token
userSchema.methods.generateToken = async function() {
  const dev = this;
  const payload = {
    devId: dev._id,
    email: dev.email,
  };
  return jwt.sign(payload, process.env.APP_SECRET, {
    expiresIn: '1d',
  });
};

userSchema.plugin(timestamps);

const Developer = mongoose.model('User', userSchema, 'Users');

module.exports = Developer;

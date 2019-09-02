import { genSalt, hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Schema, model } from 'mongoose';
import timestamps from 'mongoose-timestamp';

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
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
  role: String,
  orgManager: {
    type: Schema.Types.ObjectId,
    ref: 'Organization Manager',
  },
  resetToken: String,
  resetTokenExpiry: Number,
});

// Hashing the password before saving it to the database
userSchema.pre('save', async function(next) {
  try {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Validating the password
userSchema.methods.validatePassword = async function(password) {
  return compare(password, this.password);
};

// Generating Token
userSchema.methods.generateToken = async function(orgId) {
  const user = this;
  const payload = {
    userId: user._id,
    email: user.email,
    role: user.role,
    orgManagerId: user.orgManager._id,
    orgId,
  };
  return sign(payload, process.env.APP_SECRET, {
    expiresIn: '1h',
  });
};

// Static Methods
userSchema.statics.findByLogin = async email => {
  // need to findout how these work to use them properly
};

userSchema.plugin(timestamps);

const User = model('User', userSchema, 'Users');

export default User;

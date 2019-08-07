const bcrypt = require('bcryptjs');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { User } = require('../models/index');
const mail = require('../utils/mail.js');

const setCookie = function(res, token) {
  res.cookie('token', token, {
    // Javascript shouldn't be able to access the cookie
    httpOnly: true,
    // One year cookie
    maxAge: 1000 * 60 * 24 * 7,
  });
};

const register = async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email.toLowerCase(),
    password: req.body.password,
  });

  try {
    await user.save();
  } catch (error) {
    throw new Error(error.message);
  }

  try {
    const token = await user.generateToken();
    // set the jwt as a cookie on the response
    setCookie(res, token);
  } catch (error) {
    throw new Error(error.message);
  }

  res.send(user);
};

const login = async (req, res) => {
  try {
    // check if there is a user with that email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      throw new Error('No user found with these login credentials.');
    }

    // check if the user's password is correct
    const isValid = await user.validatePassword(req.body.password);

    if (!isValid) {
      throw new Error('Your login details are incorrect.');
    }

    // create the jwt
    const token = await user.generateToken();
    // set the jwt as a cookie on the response
    setCookie(res, token);

    // return the user
    res.send(user);
  } catch (error) {
    throw new Error(error.message);
  }
};

const logout = async (req, res) => {
  res.clearCookie('token');
  res.send({ message: 'User logged out successfuly!' });
};

const resetRequest = async (req, res) => {
  try {
    // check if there is a user with that email
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error(`No user was found for the email ${req.body.email}.`);

    // set a reset token and its lifespan on that user
    const randomBytesPromsified = promisify(randomBytes);
    const resetToken = (await randomBytesPromsified(20)).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // one hour from now
    await User.findOneAndUpdate(
      { email: user.email },
      {
        $set: {
          resetToken,
          resetTokenExpiry,
        },
      },
      { new: true }
    );

    // send email to the given email address
    const subject = 'Reset Password Request';
    const emailData = {
      name: user.firstName,
      title: 'Password reset',
      description: 'You have requested a password reset, please follow the link below to reset your password.',
      link: 'NEED ONE', // TODO: put the reset page link here.
      buttonText: 'Follow this link to reset your password.',
    };
    await mail.sendMail(user.email, subject, emailData);
  } catch (error) {
    throw new Error(error.message);
  }

  res.send({ message: 'Reset Request Sent Successfully!' });
};

const resetPassword = async (req, res) => {
  // check if the passwords match
  if (req.body.password !== req.body.confirmPassword) throw new Error('Passwords Do Not Match');

  try {
    // check if the token is legit
    const user = await User.findOne({ resetToken: req.body.resetToken });

    if (!user) throw new Error('This token is invalid.');

    // and check if the token has expired
    if (!(user.resetTokenExpiry > Date.now() - 3600000)) throw new Error('This token has expired.');

    // hash the new password
    const newPassword = await bcrypt.hash(req.body.password, 10);
    // save the new password to the user and remove the old reset token fields
    const updatedUser = await User.findOneAndUpdate(
      { email: user.email },
      {
        $set: {
          password: newPassword,
          resetToken: null,
          resetTokenExpiry: null,
        },
      },
      { new: true }
    );

    // create the jwt
    const token = await updatedUser.generateToken(); // TODO: Check this - causing an error
    // set the jwt as a cookie on in the response
    setCookie(res, token);

    // return the new user
    res.send(updatedUser);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  register,
  login,
  logout,
  resetRequest,
  resetPassword,
};
